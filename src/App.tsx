import { useEffect, useState } from 'react';
import { CareerTimeline } from './components/CareerTimeline';
import { ContactSection } from './components/ContactSection';
import { FooterSection } from './components/FooterSection';
import { GraphicsShowcase } from './components/GraphicsShowcase';
import { HeroSection } from './components/HeroSection';
import {
  MediaLightboxModal,
  type ActiveMediaModal,
} from './components/MediaLightboxModal';
import { Navbar } from './components/Navbar';
import { StudioShowcaseSection } from './components/StudioShowcaseSection';
import { VideoPortfolio } from './components/VideoPortfolio';
import { NAV_LINKS, TICKER_ITEMS } from './data/portfolioData';
import { useScrollReveal3D } from './hooks/useMotion3D';
import { computeScrollProgress } from './utils/portfolio';

export default function App() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState<string>('home');
  const [activeMedia, setActiveMedia] = useState<ActiveMediaModal>(null);

  useScrollReveal3D('[data-reveal-3d]');

  useEffect(() => {
    const handleScroll = () => {
      const top = window.scrollY;
      const height = document.documentElement.scrollHeight;
      const client = window.innerHeight;
      setScrollProgress(computeScrollProgress(top, height, client));

      let currentId: string = NAV_LINKS[0].id;
      for (const link of NAV_LINKS) {
        const el = document.getElementById(link.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 140) {
            currentId = link.id;
          }
        }
      }
      setActiveSection(currentId);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-clip bg-[#070b14] text-slate-50">
      {/* Scroll Progress Indicator */}
      <div
        aria-hidden="true"
        style={{ width: `${scrollProgress}%` }}
        className="fixed top-0 left-0 z-50 h-[3px] bg-gradient-to-r from-emerald-400 via-cyan-400 to-violet-500 shadow-[0_0_14px_rgba(34,211,238,0.85)] transition-[width] duration-75"
      />

      {/* Ambient Background FX (Midnight Navy + Cyan + Violet + Emerald) */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      >
        <div className="bg-grid-drift absolute -inset-[10%] opacity-40" />
        <div className="orb-float-1 absolute -top-44 -left-40 h-[560px] w-[560px] rounded-full bg-[radial-gradient(circle,rgba(6,182,212,0.26)_0%,transparent_68%)]" />
        <div className="orb-float-2 absolute top-[35%] -right-48 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.26)_0%,transparent_68%)]" />
        <div className="orb-float-3 absolute -bottom-44 left-[26%] h-[480px] w-[480px] rounded-full bg-[radial-gradient(circle,rgba(16,185,129,0.2)_0%,transparent_68%)]" />
      </div>

      {/* Top Navigation */}
      <Navbar activeSection={activeSection} />

      {/* Subtle Editorial Marquee Ribbon */}
      <div
        aria-hidden="true"
        className="ticker-wrap relative z-10 overflow-hidden border-b border-cyan-500/20 bg-gradient-to-r from-cyan-950/35 via-[#0c1222]/85 to-violet-950/35"
      >
        <div className="ticker-track flex w-max">
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, idx) => (
            <span
              key={`${item}-${idx}`}
              className="inline-flex items-center gap-3 px-6 py-2 text-xs font-semibold tracking-[0.14em] whitespace-nowrap text-cyan-200 uppercase"
            >
              <span className="text-emerald-400">·</span>
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <main>
        <HeroSection />
        <StudioShowcaseSection
          onSelectStudioMedia={(item) => setActiveMedia({ type: 'graphic', item })}
        />
        <CareerTimeline />
        <VideoPortfolio
          onSelectVideo={(item) => setActiveMedia({ type: 'video', item })}
        />
        <GraphicsShowcase
          onSelectGraphic={(item) => setActiveMedia({ type: 'graphic', item })}
        />
        <ContactSection />
      </main>

      <FooterSection showBackToTop={scrollProgress > 18} />

      {/* Interactive Showreel & Graphic Lightbox Modal */}
      <MediaLightboxModal
        media={activeMedia}
        onClose={() => setActiveMedia(null)}
      />
    </div>
  );
}
