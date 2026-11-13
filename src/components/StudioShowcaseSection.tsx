import { Maximize2 } from 'lucide-react';
import type { MouseEvent } from 'react';
import { STUDIO_HIGHLIGHTS } from '../data/portfolioData';
import { useTilt3D } from '../hooks/useMotion3D';
import type { GraphicWork, StudioHighlight } from '../utils/portfolio';

interface StudioShowcaseSectionProps {
  onSelectStudioMedia: (item: GraphicWork) => void;
}

function toLightboxGraphic(item: StudioHighlight): GraphicWork {
  return {
    id: item.id,
    title: item.title,
    subtitle: item.subtitle,
    category: item.category,
    filterKey: 'graphic-design',
    dimensionTag: '2D & 3D',
    year: item.year,
    dimensions: item.dimensions,
    tools: item.tools,
    imageUrl: item.imageUrl,
    accentLabel: item.category,
    description: item.description,
  };
}

export function StudioShowcaseSection({
  onSelectStudioMedia,
}: StudioShowcaseSectionProps) {
  const cardTilt = useTilt3D(8, { perspectivePx: 1000, translateZPx: 10, scale: 1.015 });

  const handleCardMove = (event: MouseEvent<HTMLButtonElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty('--mx', `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty('--my', `${event.clientY - rect.top}px`);
    cardTilt.onMouseMove(event);
  };

  return (
    <section
      id="studio"
      className="perspective-stage relative z-10 scroll-mt-24 py-14 sm:py-18"
    >
      <div className="mx-auto max-w-[1140px] px-5">
        <div data-reveal-3d className="mx-auto mb-11 max-w-2xl text-center">
          <p className="font-bn text-xs font-bold tracking-[0.22em] text-cyan-300 uppercase">
            এডিটিং স্টুডিও ও ক্রিয়েটিভ পরিচিতি
          </p>
          <h2 className="font-impact mt-3 text-[clamp(1.85rem,4vw,2.75rem)] leading-tight text-balance uppercase">
            EDITING SUITE &amp;{' '}
            <span className="bg-gradient-to-r from-cyan-300 via-sky-400 to-violet-400 bg-clip-text text-transparent">
              CREATOR SPACE
            </span>
          </h2>
          <p className="font-bn mt-3 text-base text-slate-300">
            নিজস্ব ব্রডকাস্ট এডিটিং ওয়ার্কস্টেশন, Adobe After Effects ও Premiere Pro ওয়ার্কফ্লো
            এবং ২০২০ থেকে চলমান মোশন ডিজাইন ও ভিডিও এডিটিং যাত্রা।
          </p>
        </div>

        <div
          className="grid grid-cols-1 gap-6 md:grid-cols-3"
          data-testid="studio-highlights-grid"
        >
          {STUDIO_HIGHLIGHTS.map((item) => (
            <div key={item.id} data-reveal-3d className="h-full">
              <button
                type="button"
                onClick={() => onSelectStudioMedia(toLightboxGraphic(item))}
                onMouseMove={handleCardMove}
                onMouseLeave={cardTilt.onMouseLeave}
                aria-label={`${item.title} — ফুল প্রিভিউ দেখুন`}
                className="card-3d-tilt group relative flex h-full w-full cursor-pointer flex-col overflow-hidden rounded-[20px] border border-cyan-500/35 bg-gradient-to-br from-[#111a2e] to-[#0a101f] text-left shadow-[0_0_20px_rgba(6,182,212,0.12)] hover:border-cyan-400/85 hover:shadow-[0_14px_34px_rgba(6,182,212,0.28)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300"
              >
                {/* Media Frame */}
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#070b14]">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0a101f] via-transparent to-transparent opacity-80"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute top-3 right-3 grid h-9 w-9 place-items-center rounded-xl border border-cyan-400/50 bg-[#070b14]/80 text-cyan-200 opacity-0 backdrop-blur-sm transition-opacity duration-200 group-hover:opacity-100"
                  >
                    <Maximize2 className="h-4 w-4" />
                  </span>
                </div>

                {/* Colored Glow Strip Separating Image & Copy */}
                <div
                  aria-hidden="true"
                  style={{ boxShadow: `0 0 16px ${item.accentShadow}` }}
                  className={`h-1 w-full bg-gradient-to-r ${item.accentGradient}`}
                />

                {/* Copy */}
                <div className="flex flex-1 flex-col justify-between p-5">
                  <div>
                    <p className="text-[11px] font-bold tracking-[0.14em] text-cyan-300 uppercase">
                      {item.category} · {item.year}
                    </p>
                    <h3 className="font-bn mt-1.5 text-lg font-bold leading-snug text-white">
                      {item.title}
                    </h3>
                    <p className="font-bn mt-2 text-sm leading-relaxed text-slate-300">
                      {item.description}
                    </p>
                  </div>

                  <p className="mt-4 border-t border-slate-700/60 pt-3 text-xs font-medium text-violet-300">
                    {item.tools.join(' · ')}
                  </p>
                </div>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
