import { Layers } from 'lucide-react';
import { useState } from 'react';
import { GRAPHIC_CATEGORIES, GRAPHIC_WORKS } from '../data/portfolioData';
import { useTilt3D } from '../hooks/useMotion3D';
import {
  filterGraphicWorks,
  type GraphicCategory,
  type GraphicWork,
} from '../utils/portfolio';

interface GraphicsShowcaseProps {
  onSelectGraphic: (graphic: GraphicWork) => void;
}

export function GraphicsShowcase({ onSelectGraphic }: GraphicsShowcaseProps) {
  const [selectedCategory, setSelectedCategory] = useState<GraphicCategory>('all-2d-3d');
  const [brokenImages, setBrokenImages] = useState<Record<string, boolean>>({});
  const cardTilt = useTilt3D(9, { perspectivePx: 900, translateZPx: 10, scale: 1.02 });

  const visibleGraphics = filterGraphicWorks(GRAPHIC_WORKS, selectedCategory);

  return (
    <section
      id="graphics"
      className="perspective-stage relative z-10 scroll-mt-24 overflow-hidden py-16 sm:py-20"
    >
      {/* Subtle 2D dot-matrix accent */}
      <div
        aria-hidden="true"
        className="dot-matrix animate-glow-2d pointer-events-none absolute top-14 left-3 h-32 w-20 opacity-30"
      />

      <div className="mx-auto max-w-[1140px] px-5">
        <div data-reveal-3d className="mx-auto mb-9 max-w-2xl text-center">
          <p className="font-bn text-xs font-bold tracking-[0.22em] text-violet-300 uppercase">
            ভিজ্যুয়াল আইডেন্টিটি, মোশন ও ২ডি/৩ডি অ্যাড
          </p>
          <h2 className="font-impact mt-3 text-[clamp(1.85rem,4vw,2.75rem)] leading-tight text-balance uppercase">
            GRAPHIC &amp;{' '}
            <span className="bg-gradient-to-r from-violet-400 via-cyan-300 to-emerald-300 bg-clip-text text-transparent">
              2D / 3D MOTION
            </span>
          </h2>
          <p className="font-bn mt-3 text-base text-slate-300">
            প্রোগ্রাম পোস্টার, হাই-সিটিআর থাম্বনেইল, অন-এয়ার লোয়ার-থার্ড এবং ২ডি ও ৩ডি
            কমার্শিয়াল অ্যানিমেশন অ্যাড ডিজাইন সিস্টেম। বিস্তারিত দেখতে যেকোনো কার্ডে ক্লিক করুন।
          </p>
        </div>

        {/* Interactive Filter Tabs */}
        <div
          role="group"
          aria-label="গ্রাফিক ও ২ডি/৩ডি মোশন ফিল্টার"
          className="mb-9 flex flex-wrap items-center justify-center gap-2"
        >
          {GRAPHIC_CATEGORIES.map((category) => {
            const active = selectedCategory === category.id;
            return (
              <button
                key={category.id}
                type="button"
                aria-pressed={active}
                onClick={() => setSelectedCategory(category.id)}
                className={`font-bn min-h-[42px] shrink-0 cursor-pointer rounded-xl px-4 py-2 text-sm font-semibold whitespace-nowrap transition-all duration-200 focus-visible:outline-2 focus-visible:outline-cyan-300 ${
                  active
                    ? 'bg-gradient-to-r from-violet-600 via-purple-600 to-cyan-500 text-white shadow-[0_0_20px_rgba(139,92,246,0.42)]'
                    : 'border border-violet-500/35 bg-[#111a2e]/85 text-slate-300 hover:border-cyan-400 hover:text-white'
                }`}
              >
                {category.label}
              </button>
            );
          })}
        </div>

        {/* 3-Column 2D & 3D Showcase Grid */}
        <div
          data-testid="graphics-works-grid"
          data-count={visibleGraphics.length}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {visibleGraphics.map((item, index) => {
            const isBroken = !item.imageUrl || brokenImages[item.id];
            const isAnimAd = item.filterKey === 'animation-ad';
            return (
              <div
                key={`${selectedCategory}-${item.id}`}
                style={{ animationDelay: `${index * 80}ms` }}
                className="card-enter-anim"
              >
                <button
                  type="button"
                  onClick={() => onSelectGraphic(item)}
                  onMouseMove={cardTilt.onMouseMove}
                  onMouseLeave={cardTilt.onMouseLeave}
                  aria-label={`${item.title} — গ্রাফিক্স ও অ্যানিমেশন প্রিভিউ খুলুন`}
                  className="graphic-conic-border card-3d-tilt group relative aspect-[4/5] w-full cursor-pointer overflow-hidden rounded-2xl border border-cyan-500/40 bg-[#0d1426] p-2 text-left hover:border-cyan-300 hover:shadow-[0_16px_38px_rgba(6,182,212,0.34)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300"
                >
                  <div className="relative z-10 flex h-full w-full flex-col justify-end overflow-hidden rounded-xl bg-[#070b14]">
                    {!isBroken ? (
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        referrerPolicy="no-referrer"
                        onError={() =>
                          setBrokenImages((prev) => ({ ...prev, [item.id]: true }))
                        }
                        className={`absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 ${
                          item.id === 'gfx-1' ? 'scale-[1.12]' : ''
                        } ${isAnimAd ? 'opacity-55' : ''}`}
                      />
                    ) : (
                      <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-[#16223b] to-[#070b14] p-6">
                        <Layers className="h-10 w-10 text-cyan-300" />
                      </div>
                    )}

                    {/* Dedicated 2D & 3D Geometric Motion Artwork Overlay on Animation Ad Cards */}
                    {isAnimAd && (
                      <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-x-0 top-6 flex items-center justify-center"
                      >
                        {item.dimensionTag === '3D' ? (
                          <div className="animate-float-3d relative flex h-32 w-32 items-center justify-center">
                            <div className="animate-orbit-2d absolute inset-0 rounded-full border border-dashed border-cyan-400/60" />
                            <svg
                              viewBox="0 0 100 100"
                              className="h-24 w-24 drop-shadow-[0_0_18px_rgba(34,211,238,0.75)]"
                            >
                              <polygon
                                points="50,12 85,32 85,68 50,88 15,68 15,32"
                                fill="rgba(6,182,212,0.22)"
                                stroke="#22d3ee"
                                strokeWidth="2.2"
                              />
                              <polyline
                                points="15,32 50,52 85,32"
                                fill="none"
                                stroke="#a78bfa"
                                strokeWidth="1.8"
                              />
                              <line
                                x1="50"
                                y1="52"
                                x2="50"
                                y2="88"
                                stroke="#67e8f9"
                                strokeWidth="1.8"
                              />
                            </svg>
                          </div>
                        ) : (
                          <div className="animate-float-2d relative flex h-32 w-32 items-center justify-center">
                            <div className="animate-glow-2d absolute inset-2 rounded-2xl border border-violet-400/55 bg-violet-950/35" />
                            <svg
                              viewBox="0 0 100 100"
                              className="h-24 w-24 drop-shadow-[0_0_16px_rgba(139,92,246,0.8)]"
                            >
                              <path
                                d="M18 72 C36 22, 64 22, 82 68"
                                fill="none"
                                stroke="#22d3ee"
                                strokeWidth="2.4"
                                strokeLinecap="round"
                              />
                              <circle cx="18" cy="72" r="5" fill="#67e8f9" />
                              <circle cx="50" cy="34" r="5" fill="#8b5cf6" stroke="#fff" strokeWidth="1.5" />
                              <circle cx="82" cy="68" r="5" fill="#34d399" />
                              <polygon
                                points="42,56 62,64 48,78"
                                fill="rgba(139,92,246,0.65)"
                                stroke="#f8fafc"
                                strokeWidth="1.5"
                              />
                            </svg>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Measured gradient scrim for WCAG AA text legibility */}
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-gradient-to-t from-[#050811] via-[#070b14]/65 to-transparent"
                    />

                    <div className="relative z-10 p-4">
                      <p className="text-[11px] font-bold tracking-[0.14em] text-cyan-300 uppercase">
                        {item.dimensionTag} · {item.accentLabel} · {item.year}
                      </p>
                      <h3 className="font-bn mt-1.5 text-base font-bold leading-snug text-white">
                        {item.title}
                      </h3>
                      <p className="font-bn mt-1 text-xs text-slate-300">
                        {item.subtitle}
                      </p>
                    </div>
                  </div>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
