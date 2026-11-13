import { useCallback, useEffect, useState, type MouseEvent } from 'react';
import { computeCardTilt } from '../utils/portfolio';

export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) {
      return undefined;
    }
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(media.matches);
    const onChange = (event: MediaQueryListEvent) => setReduced(event.matches);
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, []);

  return reduced;
}

export function useTilt3D(
  maxTiltDeg = 9,
  options: { perspectivePx?: number; translateZPx?: number; scale?: number } = {}
) {
  const prefersReducedMotion = usePrefersReducedMotion();

  const onMouseMove = useCallback(
    (event: MouseEvent<HTMLElement>) => {
      if (prefersReducedMotion) return;
      const el = event.currentTarget;
      const rect = el.getBoundingClientRect();
      const { transform } = computeCardTilt(
        event.clientX,
        event.clientY,
        rect,
        maxTiltDeg,
        options
      );
      el.style.transform = transform;
    },
    [prefersReducedMotion, maxTiltDeg, options]
  );

  const onMouseLeave = useCallback((event: MouseEvent<HTMLElement>) => {
    event.currentTarget.style.transform = '';
  }, []);

  return { onMouseMove, onMouseLeave };
}

export function useScrollReveal3D(selector = '[data-reveal-3d]') {
  useEffect(() => {
    const targets = Array.from(document.querySelectorAll<HTMLElement>(selector));
    if (targets.length === 0) return undefined;

    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

    targets.forEach((el, idx) => {
      el.classList.add('reveal-3d');
      el.style.transitionDelay = `${(idx % 4) * 65}ms`;
      const rect = el.getBoundingClientRect();
      if (reduced || rect.top <= window.innerHeight * 0.98) {
        el.classList.add('is-visible');
      }
    });

    if (
      reduced ||
      typeof window === 'undefined' ||
      !('IntersectionObserver' in window)
    ) {
      targets.forEach((el) => el.classList.add('is-visible'));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting || entry.boundingClientRect.top <= window.innerHeight) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.04, rootMargin: '0px 0px 40px 0px' }
    );

    targets.forEach((el) => {
      if (!el.classList.contains('is-visible')) {
        observer.observe(el);
      }
    });

    let rafId = 0;
    const revealVisibleOrPassed = () => {
      rafId = 0;
      const cutoff = window.innerHeight * 0.98;
      let remaining = 0;
      targets.forEach((el) => {
        if (el.classList.contains('is-visible')) return;
        if (el.getBoundingClientRect().top <= cutoff) {
          el.classList.add('is-visible');
          observer.unobserve(el);
        } else {
          remaining += 1;
        }
      });
      if (remaining === 0) {
        window.removeEventListener('scroll', onScroll);
      }
    };

    const onScroll = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(revealVisibleOrPassed);
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, [selector]);
}
