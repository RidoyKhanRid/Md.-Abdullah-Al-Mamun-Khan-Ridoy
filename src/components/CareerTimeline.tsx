import { ExternalLink } from 'lucide-react';
import type { MouseEvent, ReactElement } from 'react';
import { CAREER_OFFICES } from '../data/portfolioData';
import { useTilt3D } from '../hooks/useMotion3D';
import type { BrandLogoKey } from '../utils/portfolio';

const LOGO_UNDER_COLOR: Record<
  BrandLogoKey,
  { bar: string; glow: string }
> = {
  deshbarta: {
    bar: 'from-emerald-400 via-green-500 to-rose-500',
    glow: 'rgba(16, 185, 129, 0.72)',
  },
  jugantor: {
    bar: 'from-red-500 via-rose-500 to-amber-400',
    glow: 'rgba(239, 68, 68, 0.75)',
  },
  dhakawatch24: {
    bar: 'from-red-500 via-cyan-400 to-sky-500',
    glow: 'rgba(56, 189, 248, 0.75)',
  },
  dhakatimes: {
    bar: 'from-slate-200 via-rose-600 to-red-500',
    glow: 'rgba(225, 29, 72, 0.7)',
  },
  prabhastime: {
    bar: 'from-red-500 via-rose-500 to-amber-400',
    glow: 'rgba(239, 68, 68, 0.72)',
  },
  deshtv: {
    bar: 'from-red-500 via-teal-400 to-emerald-400',
    glow: 'rgba(20, 184, 166, 0.75)',
  },
  perfect: {
    bar: 'from-red-500 via-rose-500 to-slate-200',
    glow: 'rgba(239, 68, 68, 0.72)',
  },
};

function OfficeBrandPlaque({ brandKey }: { brandKey: BrandLogoKey }) {
  const accent = LOGO_UNDER_COLOR[brandKey];

  let plaque: ReactElement;
  switch (brandKey) {
    case 'deshbarta':
      plaque = (
        <div className="flex h-14 min-w-[168px] items-center justify-center overflow-hidden rounded-xl border border-emerald-400/70 bg-[#0d4d26] px-3 shadow-[0_0_20px_rgba(16,185,129,0.3)]">
          <svg
            viewBox="0 0 300 88"
            className="h-11 w-40"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-label="Daily Deshbarta Logo"
          >
            <polygon points="222,13 248,5 258,13 232,22" fill="#22c55e" />
            <polygon points="246,20 258,13 256,23" fill="#ef4444" />
            <text
              x="150"
              y="52"
              textAnchor="middle"
              fontFamily="'Hind Siliguri', sans-serif"
              fontSize="40"
              fontWeight="800"
              fill="#ffffff"
              letterSpacing="1"
            >
              দেশবার্তা
            </text>
            <text
              x="22"
              y="76"
              textAnchor="start"
              fontFamily="'Plus Jakarta Sans', sans-serif"
              fontSize="12.5"
              fontWeight="600"
              fill="#e2e8f0"
            >
              Daily Deshbarta
            </text>
            <text
              x="278"
              y="76"
              textAnchor="end"
              fontFamily="'Hind Siliguri', sans-serif"
              fontSize="12.5"
              fontWeight="500"
              fill="#e2e8f0"
            >
              দেশের খবর প্রবাসের খবর
            </text>
          </svg>
        </div>
      );
      break;
    case 'jugantor':
      plaque = (
        <div className="flex h-14 min-w-[168px] items-center justify-center overflow-hidden rounded-xl border border-red-400/75 bg-[#a80000] px-2.5 shadow-[0_0_20px_rgba(239,68,68,0.32)]">
          <img
            src="/assets/logos/jugantor.jpg"
            alt="দৈনিক যুগান্তর লোগো"
            className="h-10 w-auto max-w-[152px] object-contain"
          />
        </div>
      );
      break;
    case 'dhakawatch24':
      plaque = (
        <div className="flex h-14 min-w-[168px] items-center justify-center overflow-hidden rounded-xl border border-cyan-400/65 bg-white px-2.5 shadow-[0_0_20px_rgba(56,189,248,0.28)]">
          <svg
            viewBox="0 0 300 86"
            className="h-11 w-40"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-label="dhakawatch24.com Logo"
          >
            <g
              transform="translate(150, 42)"
              textAnchor="middle"
              fontFamily="'Plus Jakarta Sans', 'Inter', sans-serif"
              fontWeight="900"
            >
              <text x="0" y="0" fontSize="34" letterSpacing="-1">
                <tspan fill="#ff0000">dhaka</tspan>
                <tspan fill="#00a8cc">watch</tspan>
              </text>
              <text
                x="0"
                y="16"
                fontSize="34"
                letterSpacing="-1"
                opacity="0.18"
                transform="scale(1, -0.5) translate(0, -30)"
              >
                <tspan fill="#ff0000">dhaka</tspan>
                <tspan fill="#00a8cc">watch</tspan>
              </text>
              <text
                x="62"
                y="27"
                fontSize="21"
                fontWeight="800"
                fill="#374151"
                letterSpacing="-0.5"
              >
                24.com
              </text>
            </g>
          </svg>
        </div>
      );
      break;
    case 'dhakatimes':
      plaque = (
        <div className="flex h-14 min-w-[168px] items-center justify-center overflow-hidden rounded-xl border border-rose-500/65 bg-white px-2.5 shadow-[0_0_18px_rgba(225,29,72,0.26)]">
          <svg
            viewBox="0 0 300 86"
            className="h-11 w-40"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-label="Dhakatimes24.com Logo"
          >
            <text
              x="150"
              y="47"
              textAnchor="middle"
              fontFamily="'Hind Siliguri', sans-serif"
              fontSize="36"
              fontWeight="800"
            >
              <tspan fill="#0f172a">ঢাকা </tspan>
              <tspan fill="#991b1b">টাইমস</tspan>
            </text>
            <line x1="22" y1="54" x2="278" y2="54" stroke="#0f172a" strokeWidth="2.5" />
            <text
              x="150"
              y="74"
              textAnchor="middle"
              fontFamily="'Plus Jakarta Sans', sans-serif"
              fontSize="16"
              fontWeight="800"
              letterSpacing="2"
              fill="#0f172a"
            >
              Dhakatimes24.com
            </text>
          </svg>
        </div>
      );
      break;
    case 'prabhastime':
      plaque = (
        <div className="flex h-14 min-w-[168px] items-center justify-center overflow-hidden rounded-xl border border-red-400/70 bg-[#b91c1c] px-2.5 shadow-[0_0_18px_rgba(239,68,68,0.3)]">
          <svg
            viewBox="0 0 300 86"
            className="h-11 w-40"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-label="Probash Time Logo"
          >
            <g
              transform="translate(150, 54)"
              textAnchor="middle"
              fontFamily="'Plus Jakarta Sans', 'Inter', sans-serif"
              fontWeight="900"
            >
              <text
                x="0"
                y="0"
                fontSize="34"
                stroke="#ffffff"
                strokeWidth="4"
                paintOrder="stroke"
                letterSpacing="-0.5"
              >
                <tspan fill="#111827">Probash </tspan>
                <tspan fill="#dc2626">Time</tspan>
              </text>
            </g>
            <circle cx="260" cy="22" r="5" fill="#16a34a" stroke="#ffffff" strokeWidth="1.4" />
            <circle cx="260" cy="22" r="2.2" fill="#ef4444" />
          </svg>
        </div>
      );
      break;
    case 'deshtv':
      plaque = (
        <div className="flex h-14 min-w-[168px] items-center justify-center overflow-hidden rounded-xl border border-teal-400/65 bg-white px-2.5 shadow-[0_0_20px_rgba(20,184,166,0.28)]">
          <img
            src="/assets/logos/deshtv.jpg"
            alt="দেশ টিভি (desh.tv) লোগো"
            className="h-11 w-auto max-w-[152px] object-contain"
          />
        </div>
      );
      break;
    case 'perfect':
      plaque = (
        <div className="flex h-14 min-w-[168px] items-center justify-center overflow-hidden rounded-xl border border-red-400/65 bg-white px-2.5 shadow-[0_0_18px_rgba(239,68,68,0.26)]">
          <svg
            viewBox="0 0 300 86"
            className="h-11 w-40"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-label="PERFECT Logo"
          >
            <g transform="translate(56, 48)">
              <path
                d="M-10 -12 L-10 -26 C-10 -29 -5 -29 -5 -26 L-5 -13"
                fill="none"
                stroke="#ef4444"
                strokeWidth="4.4"
                strokeLinecap="round"
              />
              <path
                d="M-2 -15 L-2 -30 C-2 -33 3 -33 3 -30 L3 -15"
                fill="none"
                stroke="#ef4444"
                strokeWidth="4.4"
                strokeLinecap="round"
              />
              <path
                d="M6 -12 L11 -25 C12 -28 17 -26 16 -23 L10 -10"
                fill="none"
                stroke="#ef4444"
                strokeWidth="4.4"
                strokeLinecap="round"
              />
              <circle cx="2" cy="4" r="14" fill="none" stroke="#ef4444" strokeWidth="5" />
              <path
                d="M-3 -3 H4 C7 -3 9 -1 9 2.5 C9 6 7 8 4 8 H0 V13 H-3 V-3 Z M0 0 V5.5 H3.8 C5.5 5.5 6.3 4.5 6.3 2.5 C6.3 0.8 5.5 0 3.8 0 H0 Z"
                fill="#111827"
              />
            </g>
            <text
              x="180"
              y="54"
              textAnchor="middle"
              fontFamily="'Plus Jakarta Sans', 'Inter', sans-serif"
              fontSize="29"
              fontWeight="900"
              fontStyle="italic"
              fill="#111827"
              letterSpacing="1"
            >
              PERFECT
            </text>
          </svg>
        </div>
      );
      break;
  }

  return (
    <div className="relative flex flex-col items-center">
      {plaque}
      {/* Vivid Colored Glow Bar Directly Under Every Office Logo */}
      <span
        aria-hidden="true"
        style={{ boxShadow: `0 0 14px ${accent.glow}` }}
        className={`mt-2 h-1.5 w-[88%] rounded-full bg-gradient-to-r ${accent.bar}`}
      />
    </div>
  );
}

const BENGALI_NUMBERS = ['০১', '০২', '০৩', '০৪', '০৫', '০৬', '০৭'] as const;

export function CareerTimeline() {
  const cardTilt = useTilt3D(5, { perspectivePx: 1000, translateZPx: 8, scale: 1.01 });

  const handleCardMove = (event: MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = `${event.clientX - rect.left}px`;
    const y = `${event.clientY - rect.top}px`;
    event.currentTarget.style.setProperty('--mx', x);
    event.currentTarget.style.setProperty('--my', y);
    cardTilt.onMouseMove(event);
  };

  return (
    <section
      id="experience"
      className="perspective-stage relative z-10 scroll-mt-24 py-16 sm:py-20"
    >
      <div className="mx-auto max-w-[1140px] px-5">
        <div data-reveal-3d className="mx-auto mb-12 max-w-2xl text-center">
          <p className="font-bn text-xs font-bold tracking-[0.22em] text-cyan-300 uppercase">
            সিভি কর্ম-ইতিহাস · ৬টি প্রতিষ্ঠান (Running &amp; Previous)
          </p>
          <h2 className="font-impact mt-3 text-[clamp(1.85rem,4vw,2.75rem)] leading-tight text-balance uppercase">
            RUNNING &amp; PREVIOUS{' '}
            <span className="bg-gradient-to-r from-emerald-300 via-cyan-300 to-violet-400 bg-clip-text text-transparent">
              OFFICES
            </span>
          </h2>
          <p className="font-bn mt-3 text-base text-slate-300">
            বর্তমান কর্মস্থল দৈনিক দেশবার্তাসহ সিভি অনুযায়ী ২০২০–২০২৬ পর্যন্ত দেশের শীর্ষস্থানীয়
            সংবাদমাধ্যম, টেলিভিশন ও কর্পোরেট মাল্টিমিডিয়া বিভাগে কাজের বিস্তারিত বিবরণ।
          </p>
        </div>

        {/* Vertical Timeline */}
        <div
          className="relative flex flex-col gap-6"
          data-testid="office-cards-list"
        >
          {/* Glowing vertical rail */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-4 bottom-4 left-5 w-0.5 bg-gradient-to-b from-emerald-400/70 via-cyan-400/75 to-violet-500/70 shadow-[0_0_12px_rgba(34,211,238,0.55)] sm:left-6"
          />
          <div
            aria-hidden="true"
            className="timeline-runner pointer-events-none absolute top-0 left-[18px] h-14 w-1.5 rounded-full bg-gradient-to-b from-cyan-300 to-transparent blur-[2px] sm:left-[22px]"
          />

          {CAREER_OFFICES.map((office, index) => (
            <article
              key={office.id}
              data-reveal-3d
              data-testid="office-card"
              className="relative grid grid-cols-[40px_1fr] gap-3 sm:grid-cols-[52px_1fr] sm:gap-5"
            >
              {/* Timeline Node */}
              <div className="flex justify-center pt-7" aria-hidden="true">
                <span
                  className={`h-3.5 w-3.5 rounded-full ${
                    office.status === 'current'
                      ? 'bg-emerald-400 shadow-[0_0_0_5px_rgba(16,185,129,0.24),0_0_18px_rgba(52,211,153,0.95)]'
                      : 'bg-cyan-400 shadow-[0_0_0_5px_rgba(34,211,238,0.16),0_0_14px_rgba(34,211,238,0.75)]'
                  }`}
                />
              </div>

              {/* Office Card with Spotlight + Interactive 3D Tilt */}
              <div
                onMouseMove={handleCardMove}
                onMouseLeave={cardTilt.onMouseLeave}
                className={`card-3d-tilt group relative min-w-0 overflow-hidden rounded-[18px] border p-5 sm:p-6 ${
                  office.status === 'current'
                    ? 'border-emerald-400/65 shadow-[0_0_24px_rgba(16,185,129,0.2)] hover:border-emerald-300/95 hover:shadow-[0_0_30px_rgba(16,185,129,0.35)]'
                    : 'border-cyan-500/35 shadow-[0_0_18px_rgba(6,182,212,0.12)] hover:border-cyan-400/80 hover:shadow-[0_0_28px_rgba(34,211,238,0.28)]'
                }`}
                style={{
                  backgroundImage:
                    office.status === 'current'
                      ? 'radial-gradient(560px circle at var(--mx, 50%) var(--my, 0%), rgba(16,185,129,0.14), transparent 44%), linear-gradient(160deg, rgba(13,34,42,0.95), rgba(11,17,32,0.98))'
                      : 'radial-gradient(560px circle at var(--mx, 50%) var(--my, 0%), rgba(34,211,238,0.12), transparent 44%), linear-gradient(160deg, rgba(17,26,46,0.95), rgba(10,16,31,0.98))',
                }}
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="flex flex-wrap items-center gap-4">
                    <a
                      href={office.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${office.organization} ওয়েবসাইট দেখুন (${office.websiteLabel})`}
                      className="inline-block transition-transform duration-300 group-hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300"
                    >
                      <OfficeBrandPlaque brandKey={office.brandKey} />
                    </a>
                    <div>
                      <p
                        className={`font-bn text-xs font-semibold tracking-wide uppercase ${
                          office.status === 'current'
                            ? 'text-emerald-300'
                            : 'text-cyan-300'
                        }`}
                      >
                        {BENGALI_NUMBERS[index] ?? index + 1}. {office.period} · {office.statusLabel}
                      </p>
                      <h3 className="font-bn mt-0.5 text-lg font-bold text-white sm:text-xl">
                        {office.organization}
                      </h3>
                      <p className="font-bn text-sm font-bold tracking-wide text-violet-300 uppercase">
                        Designation: {office.role}
                      </p>
                    </div>
                  </div>

                  {/* Clickable Official Website Link */}
                  <a
                    href={office.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[38px] shrink-0 items-center gap-1.5 rounded-xl border border-cyan-400/40 bg-[#070b14]/85 px-3.5 py-1.5 text-xs font-semibold text-cyan-100 transition-all duration-200 hover:-translate-y-0.5 hover:border-cyan-300 hover:bg-cyan-500/20 hover:text-white focus-visible:outline-2 focus-visible:outline-cyan-300"
                  >
                    <span>{office.websiteLabel}</span>
                    <ExternalLink className="h-3.5 w-3.5 text-cyan-300" />
                  </a>
                </div>

                {/* Clean unboxed metadata row */}
                <div className="font-bn mt-3.5 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs font-medium text-slate-400">
                  <span>{office.department}</span>
                  <span aria-hidden="true">·</span>
                  <span>{office.location}</span>
                </div>

                <ul className="mt-4 grid gap-2.5">
                  {office.highlights.map((item) => (
                    <li
                      key={item}
                      className="font-bn relative pl-5 text-sm leading-relaxed text-slate-300"
                    >
                      <span
                        aria-hidden="true"
                        className={`absolute top-2 left-0 h-2 w-2 rotate-45 rounded-[2px] ${
                          office.status === 'current'
                            ? 'bg-gradient-to-br from-emerald-300 to-emerald-500 shadow-[0_0_8px_rgba(52,211,153,0.8)]'
                            : 'bg-gradient-to-br from-cyan-300 to-violet-400 shadow-[0_0_8px_rgba(34,211,238,0.75)]'
                        }`}
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
