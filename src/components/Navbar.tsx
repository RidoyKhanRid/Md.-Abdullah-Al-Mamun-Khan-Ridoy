import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { NAV_LINKS, PROFILE_INFO } from '../data/portfolioData';

interface NavbarProps {
  activeSection: string;
}

export function BrandMark({ size = 'sm' }: { size?: 'sm' | 'md' }) {
  const boxSize = size === 'md' ? 'h-14 w-14 rounded-2xl p-1.5' : 'h-11 w-11 rounded-xl p-1';
  return (
    <span
      className={`brand-mark-float grid shrink-0 place-items-center border border-cyan-400/75 bg-[#f8fafc] shadow-[0_0_20px_rgba(34,211,238,0.42)] ${boxSize}`}
      aria-hidden="true"
    >
      <svg viewBox="0 0 100 110" className="h-full w-full overflow-visible">
        <defs>
          <linearGradient id="ridMainPurple" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#22d3ee" />
            <stop offset="50%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#4c1d95" />
          </linearGradient>
          <linearGradient id="ridPlayVibrant" x1="0%" y1="0%" x2="100%" y2="85%">
            <stop offset="0%" stopColor="#06b6d4" />
            <stop offset="50%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#5b21b6" />
          </linearGradient>
          <linearGradient id="ridDeepPlum" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#0f172a" />
            <stop offset="100%" stopColor="#1e1b4b" />
          </linearGradient>
          <filter id="ridCrownGlow" x="-25%" y="-25%" width="150%" height="150%">
            <feDropShadow dx="0" dy="0" stdDeviation="2.2" floodColor="#22d3ee" floodOpacity="0.6" />
          </filter>
        </defs>

        {/* Top Pen-Nib + Bezier Crown */}
        <g filter="url(#ridCrownGlow)">
          <line x1="33" y1="11" x2="67" y2="11" stroke="#6d28d9" strokeWidth="1.9" strokeLinecap="round" />
          <circle cx="32" cy="11" r="2.6" fill="#0891b2" />
          <circle cx="68" cy="11" r="2.6" fill="#8b5cf6" />
          <path
            d="M31 28 C34 15, 42 11, 50 11 C58 11, 66 15, 69 28"
            fill="none"
            stroke="#6d28d9"
            strokeWidth="1.8"
          />
          <rect x="47.8" y="8.8" width="4.4" height="4.4" fill="#f8fafc" stroke="#0891b2" strokeWidth="1.6" />

          {/* Center Fountain Pen Nib */}
          <polygon points="50,15 58.5,28 54.5,36 45.5,36 41.5,28" fill="url(#ridMainPurple)" />
          <polygon points="50,15 50,36 45.5,36 41.5,28" fill="#312e81" opacity="0.55" />
          <circle cx="50" cy="28.5" r="2.1" fill="#f8fafc" />
          <line x1="50" y1="15.5" x2="50" y2="26.5" stroke="#f8fafc" strokeWidth="1.15" />
          <rect x="44.5" y="37.8" width="11" height="3.2" rx="0.6" fill="url(#ridMainPurple)" />

          {/* Left Crown Wing & Arm */}
          <polygon points="34,21 41.5,25 40.5,33 34,29" fill="#312e81" />
          <path d="M30,36 L42,36 L34.5,29 L24.5,20.5 L28.5,31 Z" fill="url(#ridMainPurple)" />
          <circle cx="24" cy="20" r="2.6" fill="#0891b2" />
          <rect x="30.8" y="30" width="2.8" height="2.8" fill="#f8fafc" />
          <rect x="30" y="37.8" width="12" height="2.8" rx="0.6" fill="#4c1d95" />

          {/* Right Crown Wing & Arm */}
          <polygon points="66,21 58.5,25 59.5,33 66,29" fill="#6d28d9" />
          <path d="M70,36 L58,36 L65.5,29 L75.5,20.5 L71.5,31 Z" fill="url(#ridPlayVibrant)" />
          <circle cx="76" cy="20" r="2.6" fill="#06b6d4" />
          <rect x="66.4" y="30" width="2.8" height="2.8" fill="#f8fafc" />
          <rect x="58" y="37.8" width="12" height="2.8" rx="0.6" fill="#0891b2" />
        </g>

        {/* Bottom Stylized R + Play Triangle Monogram */}
        <path
          d="M44 45 L58 45 C66 45 71 51 71 58 C71 60 70.5 61.5 69.8 62.5 L63 58 C63.4 53.5 60 50.5 54 50.5 L44 45 Z"
          fill="url(#ridDeepPlum)"
        />
        <polygon points="50,82 59.5,77 73.5,104 61.5,104" fill="url(#ridDeepPlum)" />
        <polygon points="27,45 38.5,45 38.5,73 53,63.5 57.5,68.5 38.5,82 38.5,93.5 27,104" fill="url(#ridDeepPlum)" />
        <polygon points="36.5,47 38.5,47 38.5,58 36.5,58" fill="#f8fafc" opacity="0.7" />

        <path
          d="M41.5,45 L79.5,69 L41.5,93 Z M49.5,58.5 L49.5,79.5 L66,69 Z"
          fill="url(#ridPlayVibrant)"
          fillRule="evenodd"
        />
        <polygon points="41.5,45 79.5,69 66,69 49.5,58.5" fill="#22d3ee" opacity="0.3" />
        <polygon points="41.5,45 49.5,58.5 49.5,79.5 41.5,93" fill="#312e81" opacity="0.28" />
      </svg>
    </span>
  );
}

export function Navbar({ activeSection }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLinkClick = () => {
    setMobileOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-cyan-500/20 bg-[#070b14]/90 backdrop-blur-md">
      <div className="mx-auto flex h-[76px] max-w-[1140px] items-center justify-between gap-4 px-5">
        {/* Zone 1: Single-line Brand */}
        <a
          href="#home"
          className="flex shrink-0 items-center gap-3 whitespace-nowrap text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-400"
        >
          <BrandMark />
          <span className="text-base font-extrabold tracking-wide whitespace-nowrap">
            {PROFILE_INFO.brandName}
          </span>
        </a>

        {/* Zone 2: Concise single-line Bengali links */}
        <nav
          aria-label="প্রধান নেভিগেশন"
          className="hidden items-center gap-0.5 lg:flex"
        >
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={`#${link.id}`}
                aria-current={isActive ? 'page' : undefined}
                className={`font-bn relative shrink-0 rounded-lg px-2.5 py-2 text-[14px] font-semibold whitespace-nowrap transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-cyan-400 ${
                  isActive
                    ? 'bg-cyan-500/15 text-white'
                    : 'text-slate-300 hover:bg-cyan-500/10 hover:text-white'
                }`}
              >
                {link.label}
                <span
                  aria-hidden="true"
                  className={`absolute bottom-1 left-1/2 h-0.5 -translate-x-1/2 rounded-full bg-gradient-to-r from-cyan-400 to-violet-400 transition-all duration-200 ${
                    isActive ? 'w-3/5 opacity-100' : 'w-0 opacity-0'
                  }`}
                />
              </a>
            );
          })}
        </nav>

        {/* Zone 3: Primary CTA + mobile toggle */}
        <div className="flex shrink-0 items-center gap-3">
          <a
            href="#contact"
            className="font-bn hidden shrink-0 items-center justify-center rounded-xl bg-gradient-to-r from-cyan-500 via-sky-500 to-violet-600 px-5 py-2.5 text-sm font-bold whitespace-nowrap text-white shadow-[0_0_18px_rgba(6,182,212,0.42)] transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-[0_0_26px_rgba(34,211,238,0.68)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300 sm:inline-flex"
          >
            কাজের প্রস্তাব দিন
          </a>

          <button
            type="button"
            aria-label={mobileOpen ? 'মেনু বন্ধ করুন' : 'নেভিগেশন মেনু খুলুন'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav-drawer"
            onClick={() => setMobileOpen((prev) => !prev)}
            className="grid h-11 w-11 place-items-center rounded-xl border border-cyan-500/45 bg-[#111a2e] text-cyan-100 transition-colors hover:border-cyan-400 lg:hidden"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <nav
          id="mobile-nav-drawer"
          aria-label="মোবাইল নেভিগেশন"
          className="border-t border-cyan-500/25 bg-[#070b14]/98 px-5 py-4 backdrop-blur-lg lg:hidden"
        >
          <div className="flex flex-col gap-1.5">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={handleLinkClick}
                  className={`font-bn rounded-xl px-4 py-3 text-base font-semibold transition-colors ${
                    isActive
                      ? 'bg-cyan-500/20 text-white'
                      : 'text-slate-300 hover:bg-cyan-500/10 hover:text-white'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
            <a
              href="#contact"
              onClick={handleLinkClick}
              className="font-bn mt-2 inline-flex min-h-[44px] items-center justify-center rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 px-5 py-3 text-base font-bold text-white"
            >
              কাজের প্রস্তাব দিন
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
