import { Box, RotateCcw, Sparkles } from 'lucide-react';
import { useEffect, useMemo, useRef, useState, type MouseEvent } from 'react';
import { PROFILE_INFO } from '../data/portfolioData';
import { usePrefersReducedMotion } from '../hooks/useMotion3D';
import { buildSparkVectors, computeCardTilt } from '../utils/portfolio';

const EVOLUTION_PHASES = [
  {
    id: 0,
    labelBn: 'স্টুডিও ব্রডকাস্ট পোর্ট্রেট',
    ringGradient: 'from-cyan-400 via-sky-400 to-violet-500',
  },
  {
    id: 1,
    labelBn: '২ডি মোশন ও স্ক্যান গ্রিড',
    ringGradient: 'from-emerald-400 via-cyan-400 to-teal-300',
  },
  {
    id: 2,
    labelBn: '৩ডি হলোগ্রাফিক প্রিজম ডেপথ',
    ringGradient: 'from-violet-400 via-fuchsia-400 to-cyan-300',
  },
] as const;

export function ProfileRevealStage() {
  const [replayCount, setReplayCount] = useState(1);
  const [evolutionPhase, setEvolutionPhase] = useState<0 | 1 | 2>(0);
  const [isFlipping3D, setIsFlipping3D] = useState(false);
  const [tiltTransform, setTiltTransform] = useState<string>('');
  const [isTilting, setIsTilting] = useState(false);
  const [imageError, setImageError] = useState(false);

  const flipTimerRef = useRef<number | null>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const sparks = useMemo(() => buildSparkVectors(14, 190), []);

  useEffect(() => {
    if (prefersReducedMotion) return undefined;
    const intervalId = window.setInterval(() => {
      setEvolutionPhase((prev) => ((prev + 1) % 3) as 0 | 1 | 2);
    }, 3800);
    return () => window.clearInterval(intervalId);
  }, [prefersReducedMotion]);

  const handleReplay = () => {
    setReplayCount((prev) => prev + 1);
    setEvolutionPhase(0);
  };

  const handleEvolveCycle = () => {
    setEvolutionPhase((prev) => ((prev + 1) % 3) as 0 | 1 | 2);
    setReplayCount((prev) => prev + 1);
  };

  const trigger3DFlip = () => {
    if (prefersReducedMotion) return;
    if (flipTimerRef.current) {
      window.clearTimeout(flipTimerRef.current);
    }
    setTiltTransform('');
    setIsTilting(false);
    setIsFlipping3D(false);
    window.requestAnimationFrame(() => {
      setIsFlipping3D(true);
      setEvolutionPhase((prev) => ((prev + 1) % 3) as 0 | 1 | 2);
      flipTimerRef.current = window.setTimeout(() => {
        setIsFlipping3D(false);
      }, 1180);
    });
  };

  const handlePointerMove = (event: MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || isFlipping3D) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const { transform } = computeCardTilt(event.clientX, event.clientY, rect, 18, {
      perspectivePx: 1200,
      translateZPx: 14,
      scale: 1.04,
    });
    setIsTilting(true);
    setTiltTransform(transform);
  };

  const handlePointerLeave = () => {
    setIsTilting(false);
    setTiltTransform('');
  };

  const activePhase = EVOLUTION_PHASES[evolutionPhase];

  return (
    <div
      className="portrait-3d-wrap relative flex flex-col items-center gap-5"
      data-testid="profile-reveal-stage"
      data-replay-count={replayCount}
      data-evolve-phase={evolutionPhase}
    >
      {/* Square 2D + 3D Evolving Portal Stage */}
      <div className="relative flex aspect-square w-[min(358px,76vw)] items-center justify-center">
        {/* Decorative 2D Animated Geometric Marks */}
        <span
          aria-hidden="true"
          className="animate-float-2d pointer-events-none absolute -top-4 -left-2 z-20 text-sm text-cyan-400/85 select-none sm:-left-4"
        >
          ◁
        </span>
        <span
          aria-hidden="true"
          className="animate-glow-2d pointer-events-none absolute -top-5 right-5 z-20 h-3.5 w-3.5 rounded-full border border-cyan-400/75 select-none sm:right-7"
        />
        <span
          aria-hidden="true"
          className="animate-float-2d pointer-events-none absolute top-1/2 -right-5 z-20 text-xs font-bold text-violet-400/90 select-none sm:-right-6"
        >
          ✚
        </span>
        <span
          aria-hidden="true"
          className="animate-float-2d pointer-events-none absolute -bottom-4 -left-2 z-20 text-xs font-bold text-emerald-400/85 select-none sm:-left-4"
        >
          ✕
        </span>
        <span
          aria-hidden="true"
          className="animate-glow-2d pointer-events-none absolute right-6 -bottom-4 z-20 h-4 w-4 rounded-full border border-violet-400/70 select-none sm:right-8"
        />

        {/* Dual Outer 2D Orbiting Rings */}
        <div
          aria-hidden="true"
          className="animate-orbit-2d pointer-events-none absolute -inset-3.5 rounded-full border border-dashed border-cyan-400/40"
        />
        <div
          aria-hidden="true"
          className="pp-counter-ring pointer-events-none absolute -inset-6 rounded-full border border-dotted border-violet-400/30"
        />

        {/* 3D Interactive Double-Sided Frame */}
        <div
          data-testid="portrait-3d-frame"
          data-evolve={evolutionPhase}
          onMouseMove={handlePointerMove}
          onMouseLeave={handlePointerLeave}
          onClick={trigger3DFlip}
          style={
            tiltTransform
              ? { transform: tiltTransform, animation: 'none' }
              : undefined
          }
          className={`portrait-frame relative h-full w-full cursor-pointer overflow-visible rounded-[30px] p-3.5 ${
            isFlipping3D
              ? 'portrait-flip-active'
              : !isTilting
                ? 'animate-float-3d'
                : ''
          }`}
          title="মাউস ঘুরিয়ে ৩ডি ডেপথ দেখুন বা ক্লিক করে ৩৬০° বিবর্তন ফ্লিপ করুন"
        >
          {/* Front Face */}
          <div className="portrait-face-front relative h-full w-full overflow-hidden rounded-[22px]">
            {/* Inner Corner Dot Matrix Accents */}
            <div
              aria-hidden="true"
              className="dot-matrix animate-glow-2d pointer-events-none absolute top-2 left-2 h-16 w-16 opacity-60"
            />
            <div
              aria-hidden="true"
              className="dot-matrix animate-glow-2d pointer-events-none absolute right-2 bottom-2 h-16 w-16 opacity-60"
            />

            {/* Phase 1 & 2 Viewfinder Corner Brackets (2D Motion Evolution) */}
            <div
              aria-hidden="true"
              className={`pointer-events-none absolute inset-2 z-30 transition-all duration-700 ${
                evolutionPhase === 1
                  ? 'scale-100 opacity-100'
                  : evolutionPhase === 2
                    ? 'scale-95 opacity-65'
                    : 'scale-105 opacity-25'
              }`}
            >
              <span className="absolute top-0 left-0 h-5 w-5 rounded-tl-md border-t-2 border-l-2 border-emerald-400/85" />
              <span className="absolute top-0 right-0 h-5 w-5 rounded-tr-md border-t-2 border-r-2 border-cyan-400/85" />
              <span className="absolute bottom-0 left-0 h-5 w-5 rounded-bl-md border-b-2 border-l-2 border-cyan-400/85" />
              <span className="absolute right-0 bottom-0 h-5 w-5 rounded-br-md border-r-2 border-b-2 border-violet-400/85" />
            </div>

            {/* Multi-stage Evolving 2D + 3D Portrait Container */}
            <div
              key={replayCount}
              className="pp is-playing portrait-inner-3d relative isolate h-full w-full"
            >
              {/* Dynamic Phase Radial Glow */}
              <div
                aria-hidden="true"
                className={`pp-stage-glow pointer-events-none absolute -inset-[8%] z-0 rounded-full transition-colors duration-700 ${
                  evolutionPhase === 1
                    ? 'bg-[radial-gradient(circle,rgba(16,185,129,0.36)_0%,rgba(6,182,212,0.22)_50%,transparent_72%)]'
                    : evolutionPhase === 2
                      ? 'bg-[radial-gradient(circle,rgba(168,85,247,0.38)_0%,rgba(34,211,238,0.24)_50%,transparent_72%)]'
                      : 'bg-[radial-gradient(circle,rgba(34,211,238,0.34)_0%,rgba(139,92,246,0.2)_48%,transparent_72%)]'
                }`}
              />

              {/* Continuous Spinning Conic Halo Ring */}
              <div
                aria-hidden="true"
                className="pp-halo-conic pointer-events-none absolute inset-[3.4%] z-10 rounded-full p-[3px] opacity-85"
              >
                <div className="h-full w-full rounded-full bg-[#090f1e]" />
              </div>

              {/* Rotating dashed precision orbit ring */}
              <div
                aria-hidden="true"
                className="pp-orbit-spin pointer-events-none absolute -inset-[5%] z-10"
              >
                <svg viewBox="0 0 100 100" className="h-full w-full overflow-visible">
                  <circle
                    cx="50"
                    cy="50"
                    r="49"
                    fill="none"
                    stroke={
                      evolutionPhase === 1
                        ? 'rgba(52,211,153,0.62)'
                        : evolutionPhase === 2
                          ? 'rgba(192,132,252,0.62)'
                          : 'rgba(34,211,238,0.56)'
                    }
                    strokeWidth="0.85"
                    strokeDasharray="3 6.5"
                    strokeLinecap="round"
                  />
                </svg>
              </div>

              {/* Stage 1: Circular image frame with iris clip-path wipe & evolving color grade */}
              <div className="absolute inset-[5.5%] z-20 overflow-hidden rounded-full border-2 border-cyan-300/80 bg-[#111a2e] shadow-[0_0_40px_rgba(6,182,212,0.45),inset_0_0_28px_rgba(139,92,246,0.38)]">
                {!imageError ? (
                  <div
                    className={`h-full w-full transition-all duration-700 ${
                      evolutionPhase === 1
                        ? 'scale-[1.06] brightness-105 contrast-105'
                        : evolutionPhase === 2
                          ? 'scale-[1.1] saturate-110 contrast-105'
                          : 'scale-100'
                    }`}
                  >
                    <img
                      src={PROFILE_INFO.portraitUrl}
                      alt={`${PROFILE_INFO.fullName} — ${PROFILE_INFO.titleEn}`}
                      referrerPolicy="no-referrer"
                      onError={() => setImageError(true)}
                      className="pp-frame-img h-full w-full object-cover object-[50%_12%]"
                    />
                  </div>
                ) : (
                  <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-[#16223b] to-[#070b14] p-6 text-center">
                    <span className="font-impact text-4xl text-cyan-300">RID</span>
                    <span className="font-bn mt-2 text-xs text-cyan-200/80">
                      {PROFILE_INFO.titleEn}
                    </span>
                  </div>
                )}

                {/* Continuous Diagonal Specular Glass Sheen */}
                <div
                  aria-hidden="true"
                  className="pp-glass-sheen pointer-events-none absolute -inset-y-8 -left-1/2 w-1/2"
                />

                {/* Continuous Subtle Evolving Broadcast Scanline */}
                <div
                  aria-hidden="true"
                  className={`pp-evolve-scan pointer-events-none absolute inset-x-0 top-0 h-[18%] transition-opacity duration-500 ${
                    evolutionPhase === 1 ? 'opacity-90' : 'opacity-40'
                  } bg-gradient-to-b from-transparent via-cyan-300/45 to-transparent blur-[2px]`}
                />

                {/* Subtle Studio Rim Lighting Overlay */}
                <div
                  aria-hidden="true"
                  className={`pointer-events-none absolute inset-0 rounded-full transition-all duration-700 ${
                    evolutionPhase === 2
                      ? 'bg-[radial-gradient(circle_at_30%_12%,rgba(168,85,247,0.22),transparent_58%)] shadow-[inset_0_0_28px_rgba(139,92,246,0.48)]'
                      : 'bg-[radial-gradient(circle_at_50%_10%,rgba(34,211,238,0.18),transparent_58%)] shadow-[inset_0_0_24px_rgba(30,27,75,0.45)]'
                  }`}
                />
              </div>

              {/* Stage 2: Conic cyan-violet shutter disc sweep away */}
              <div
                aria-hidden="true"
                className="pp-disc pointer-events-none absolute inset-[5.5%] z-30 rounded-full bg-[conic-gradient(from_210deg,#0891b2,#8b5cf6,#22d3ee,#10b981,#06b6d4)] shadow-[0_0_40px_rgba(6,182,212,0.55),inset_0_0_26px_rgba(0,0,0,0.45)]"
              />

              {/* Stage 3: SVG circular stroke draw */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -inset-[1.5%] z-40"
              >
                <svg
                  viewBox="0 0 100 100"
                  className="h-full w-full -rotate-90 overflow-visible"
                >
                  <defs>
                    <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#22d3ee" />
                      <stop offset="50%" stopColor="#a855f7" />
                      <stop offset="100%" stopColor="#34d399" />
                    </linearGradient>
                  </defs>
                  <circle
                    cx="50"
                    cy="50"
                    r="48"
                    fill="none"
                    stroke="rgba(34,211,238,0.2)"
                    strokeWidth="1.6"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="48"
                    fill="none"
                    stroke="url(#ringGrad)"
                    strokeWidth="2.6"
                    strokeLinecap="round"
                    className="pp-ring-draw"
                  />
                </svg>
              </div>

              {/* Stage 4: Initial horizontal scanline sweep */}
              <div
                aria-hidden="true"
                className="pp-scan pointer-events-none absolute top-[5%] right-[5%] left-[5%] z-40 h-[16%] rounded-[50%/60%] bg-gradient-to-b from-transparent via-cyan-300/85 to-transparent blur-[3px]"
              />

              {/* Stage 5: Radial burst sparks */}
              {sparks.map((spark) => (
                <span
                  key={spark.id}
                  aria-hidden="true"
                  style={
                    {
                      '--tx': spark.tx,
                      '--ty': spark.ty,
                      animationDelay: `${spark.delayMs}ms`,
                    } as React.CSSProperties
                  }
                  className="pp-spark pointer-events-none absolute top-1/2 left-1/2 z-50 -mt-1 -ml-1 h-2 w-2 rounded-full bg-cyan-200 shadow-[0_0_12px_#22d3ee,0_0_20px_rgba(139,92,246,0.85)]"
                />
              ))}
            </div>
          </div>

          {/* 3D Backplate visible mid-rotation during 360° 3D Flip */}
          <div
            aria-hidden="true"
            className="portrait-face-back absolute inset-3.5 flex flex-col items-center justify-center rounded-[22px] border border-violet-400/70 bg-gradient-to-br from-[#141b33] via-[#0c1222] to-[#08222a] p-6 text-center shadow-[inset_0_0_32px_rgba(139,92,246,0.45)]"
          >
            <span className="font-impact bg-gradient-to-r from-cyan-300 via-sky-300 to-violet-400 bg-clip-text text-4xl tracking-wider text-transparent">
              EDIT FIRST_RID
            </span>
            <span className="font-bn mt-2 text-xs font-bold tracking-widest text-cyan-200 uppercase">
              2D · 3D · Broadcast Evolution
            </span>
          </div>
        </div>
      </div>

      {/* Reveal Caption + Live Evolution Phase Readout */}
      <div
        key={`cap-${replayCount}`}
        className="pp-caption-anim is-visible text-center"
      >
        <h2 className="text-sm font-extrabold tracking-[0.14em] text-white uppercase sm:text-base">
          {PROFILE_INFO.fullName}
        </h2>
        <p className="font-bn mt-1 text-sm font-medium text-cyan-300">
          {PROFILE_INFO.titleEn} ·{' '}
          <span
            className={`bg-gradient-to-r ${activePhase.ringGradient} bg-clip-text font-bold text-transparent`}
          >
            {activePhase.labelBn}
          </span>
        </p>
      </div>

      {/* Interactive Reveal, Evolution & 3D Flip Controls */}
      <div className="flex flex-wrap items-center justify-center gap-2.5">
        <button
          type="button"
          onClick={handleReplay}
          className="font-bn group inline-flex min-h-[40px] cursor-pointer items-center gap-1.5 rounded-full border border-cyan-500/55 bg-[#111a2e]/90 px-3.5 py-2 text-xs font-bold text-cyan-100 transition-all duration-200 hover:-translate-y-0.5 hover:border-cyan-300 hover:bg-cyan-500/20 hover:shadow-[0_0_20px_rgba(34,211,238,0.45)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300 sm:text-sm"
        >
          <RotateCcw className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-rotate-180" />
          <span>রিভিল পুনরায় দেখুন</span>
        </button>

        <button
          type="button"
          onClick={handleEvolveCycle}
          data-testid="portrait-evolve-btn"
          className="font-bn group inline-flex min-h-[40px] cursor-pointer items-center gap-1.5 rounded-full border border-emerald-500/55 bg-[#0e2228]/90 px-3.5 py-2 text-xs font-bold text-emerald-100 transition-all duration-200 hover:-translate-y-0.5 hover:border-emerald-300 hover:bg-emerald-500/20 hover:shadow-[0_0_20px_rgba(16,185,129,0.45)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300 sm:text-sm"
        >
          <Sparkles className="h-3.5 w-3.5 transition-transform duration-300 group-hover:scale-125" />
          <span>বিবর্তন ধাপ</span>
        </button>

        <button
          type="button"
          onClick={trigger3DFlip}
          data-testid="portrait-3d-flip-btn"
          className="font-bn group inline-flex min-h-[40px] cursor-pointer items-center gap-1.5 rounded-full border border-violet-500/60 bg-[#141b33]/90 px-3.5 py-2 text-xs font-bold text-violet-100 transition-all duration-200 hover:-translate-y-0.5 hover:border-violet-300 hover:bg-violet-600/25 hover:shadow-[0_0_20px_rgba(139,92,246,0.5)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-300 sm:text-sm"
        >
          <Box className="h-3.5 w-3.5 transition-transform duration-300 group-hover:rotate-180" />
          <span>৩৬০° ৩ডি ফ্লিপ</span>
        </button>
      </div>
    </div>
  );
}
