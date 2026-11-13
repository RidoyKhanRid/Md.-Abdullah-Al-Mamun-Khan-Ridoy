import { ArrowRight, FileText, Play } from 'lucide-react';
import { HERO_STATS, PROFILE_INFO } from '../data/portfolioData';
import { useTilt3D } from '../hooks/useMotion3D';
import { ProfileRevealStage } from './ProfileRevealStage';

export function HeroSection() {
  const statTilt = useTilt3D(7, { perspectivePx: 900, translateZPx: 8, scale: 1.02 });

  return (
    <section
      id="home"
      className="perspective-stage relative z-10 scroll-mt-24 overflow-hidden pt-12 pb-16 sm:pt-16 sm:pb-20"
    >
      {/* Subtle 2D Dot-Matrix & Glow Corner Accents */}
      <div
        aria-hidden="true"
        className="dot-matrix animate-glow-2d pointer-events-none absolute top-8 left-4 h-24 w-24 opacity-35"
      />
      <div
        aria-hidden="true"
        className="dot-matrix animate-glow-2d pointer-events-none absolute right-6 bottom-8 h-28 w-28 opacity-40"
      />

      <div className="mx-auto max-w-[1140px] px-5">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
          {/* Left Column: Typography Hierarchy & CTAs */}
          <div className="relative order-2 lg:order-1">
            {/* Floating 3D-Shaded Triangle Accent */}
            <div
              aria-hidden="true"
              className="animate-float-3d pointer-events-none mb-4 hidden sm:inline-block"
            >
              <svg
                width="36"
                height="36"
                viewBox="0 0 42 42"
                fill="none"
                className="drop-shadow-[0_0_12px_rgba(34,211,238,0.8)]"
              >
                <defs>
                  <linearGradient id="heroTri3D" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#22d3ee" />
                    <stop offset="55%" stopColor="#8b5cf6" />
                    <stop offset="100%" stopColor="#312e81" />
                  </linearGradient>
                </defs>
                <polygon
                  points="6,36 22,5 38,31"
                  fill="url(#heroTri3D)"
                  stroke="#67e8f9"
                  strokeWidth="1.5"
                />
                <polygon points="9,35 23,30 21,8" fill="rgba(255,255,255,0.22)" />
              </svg>
            </div>

            <p className="font-bn mb-4 text-sm font-semibold tracking-wide text-cyan-300">
              {PROFILE_INFO.brandName} · {PROFILE_INFO.domain} · {PROFILE_INFO.location}
            </p>

            <h1 className="font-impact text-[clamp(2.35rem,5vw,3.75rem)] leading-[1.06] text-balance uppercase">
              <span className="block text-white">MD. ABDULLAH AL</span>
              <span className="hero-grad-text block">MAMUN KHAN RIDOY</span>
            </h1>

            <p className="font-bn mt-4 text-lg font-semibold text-violet-200 sm:text-xl">
              {PROFILE_INFO.titleBn}
            </p>

            <p className="font-bn mt-3.5 max-w-[58ch] text-base leading-relaxed text-slate-300">
              {PROFILE_INFO.heroSummary}
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3.5">
              <a
                href="#videos"
                className="font-bn inline-flex min-h-[46px] items-center gap-2.5 rounded-xl bg-gradient-to-r from-cyan-500 via-sky-500 to-violet-600 px-6 py-3 text-base font-bold text-white shadow-[0_0_24px_rgba(6,182,212,0.45)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(34,211,238,0.58)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300"
              >
                <Play className="h-4 w-4 fill-current" />
                <span>ভিডিও ও প্যাকেজ দেখুন</span>
              </a>

              <a
                href={PROFILE_INFO.cvPdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bn inline-flex min-h-[46px] items-center gap-2 rounded-xl border border-cyan-500/45 bg-[#111a2e]/90 px-5 py-3 text-base font-bold text-cyan-100 transition-all duration-200 hover:-translate-y-0.5 hover:border-cyan-300 hover:bg-[#16223b] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300"
              >
                <FileText className="h-4 w-4 text-cyan-300" />
                <span>সিভি দেখুন (PDF)</span>
              </a>

              <a
                href="#graphics"
                className="font-bn inline-flex min-h-[46px] items-center gap-2 rounded-xl border border-violet-500/45 bg-[#141b33]/90 px-5 py-3 text-base font-bold text-violet-100 transition-all duration-200 hover:-translate-y-0.5 hover:border-violet-300 hover:bg-[#1c2544] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-300"
              >
                <span>২ডি ও ৩ডি অ্যানিমেশন</span>
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Right Column: Multi-stage 2D + 3D Interactive Profile Stage */}
          <div className="order-1 flex justify-center lg:order-2">
            <ProfileRevealStage />
          </div>
        </div>

        {/* Full-width 4-column Broadcast Impact Stats below the split */}
        <div className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {HERO_STATS.map((stat, idx) => (
            <div key={stat.value} data-reveal-3d>
              <div
                onMouseMove={statTilt.onMouseMove}
                onMouseLeave={statTilt.onMouseLeave}
                className={`card-3d-tilt h-full rounded-2xl border bg-[#111a2e]/85 p-5 ${
                  idx % 2 === 0
                    ? 'border-cyan-500/35 hover:border-cyan-400/80 hover:shadow-[0_10px_26px_rgba(6,182,212,0.24)]'
                    : 'border-violet-500/35 hover:border-violet-400/80 hover:shadow-[0_10px_26px_rgba(139,92,246,0.26)]'
                }`}
              >
                <div
                  className={`font-impact text-2xl tabular-nums sm:text-3xl ${
                    idx % 2 === 0 ? 'text-cyan-300' : 'text-violet-300'
                  }`}
                >
                  {stat.value}
                </div>
                <div className="font-bn mt-1.5 text-sm font-medium text-slate-300">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
