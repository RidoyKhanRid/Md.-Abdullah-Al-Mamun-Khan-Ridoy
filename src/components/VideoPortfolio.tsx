import { ExternalLink, Film, Play } from 'lucide-react';
import { useState } from 'react';
import { VIDEO_CATEGORIES, VIDEO_WORKS } from '../data/portfolioData';
import { useTilt3D } from '../hooks/useMotion3D';
import { filterVideoWorks, type VideoCategory, type VideoWork } from '../utils/portfolio';

interface VideoPortfolioProps {
  onSelectVideo: (work: VideoWork) => void;
}

export function VideoPortfolio({ onSelectVideo }: VideoPortfolioProps) {
  const [selectedCategory, setSelectedCategory] = useState<VideoCategory>('all');
  const [fallbackUsed, setFallbackUsed] = useState<Record<string, boolean>>({});
  const [brokenImages, setBrokenImages] = useState<Record<string, boolean>>({});
  const cardTilt = useTilt3D(8, { perspectivePx: 900, translateZPx: 10, scale: 1.02 });

  const visibleWorks = filterVideoWorks(VIDEO_WORKS, selectedCategory);

  return (
    <section
      id="videos"
      className="perspective-stage relative z-10 scroll-mt-24 py-16 sm:py-20"
    >
      <div className="mx-auto max-w-[1140px] px-5">
        <div data-reveal-3d className="mx-auto mb-10 max-w-2xl text-center">
          <p className="font-bn text-xs font-bold tracking-[0.22em] text-cyan-300 uppercase">
            প্রকৃত ব্রডকাস্ট ইউটিউব কাজ, প্যাকেজ, বুলেটিন ও ২ডি/৩ডি অ্যাড
          </p>
          <h2 className="font-impact mt-3 text-[clamp(1.85rem,4vw,2.75rem)] leading-tight text-balance uppercase">
            VIDEO EDITING &amp;{' '}
            <span className="bg-gradient-to-r from-cyan-300 via-sky-400 to-violet-400 bg-clip-text text-transparent">
              BROADCAST PORTFOLIO
            </span>
          </h2>
          <p className="font-bn mt-3 text-base text-slate-300">
            দৈনিক দেশবার্তা, যুগান্তর, ঢাকওয়াচ২৪, ঢাকা টাইমস, প্রবাস টাইম ও দেশ টিভির প্রচারিত
            নিউজ প্যাকেজ, স্পেশাল ডকুমেন্টারি, লাইভ বুলেটিন এবং ২ডি/৩ডি অ্যানিমেশন অ্যাড।
          </p>
        </div>

        {/* Interactive Filter Tabs */}
        <div
          role="group"
          aria-label="ভিডিও কাজের ধরন ফিল্টার"
          className="mb-9 flex flex-wrap items-center justify-center gap-2"
        >
          {VIDEO_CATEGORIES.map((category) => {
            const active = selectedCategory === category.id;
            return (
              <button
                key={category.id}
                type="button"
                aria-pressed={active}
                onClick={() => setSelectedCategory(category.id)}
                className={`font-bn min-h-[42px] shrink-0 cursor-pointer rounded-xl px-4 py-2 text-sm font-semibold whitespace-nowrap transition-all duration-200 focus-visible:outline-2 focus-visible:outline-cyan-300 ${
                  active
                    ? 'bg-gradient-to-r from-cyan-500 via-sky-500 to-violet-600 text-white shadow-[0_0_20px_rgba(6,182,212,0.42)]'
                    : 'border border-cyan-500/35 bg-[#111a2e]/85 text-slate-300 hover:border-cyan-400 hover:text-white'
                }`}
              >
                {category.label}
              </button>
            );
          })}
        </div>

        {/* Works Grid with Staggered 3D Entrance & Interactive Pointer Tilt */}
        <div
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
          data-testid="video-works-grid"
          data-count={visibleWorks.length}
        >
          {visibleWorks.map((work, index) => {
            const isBroken = brokenImages[work.id];
            const activeSrc =
              fallbackUsed[work.id] && work.fallbackImageUrl
                ? work.fallbackImageUrl
                : work.imageUrl;

            return (
              <div
                key={`${selectedCategory}-${work.id}`}
                style={{ animationDelay: `${index * 65}ms` }}
                className="card-enter-anim flex"
              >
                <div
                  onMouseMove={cardTilt.onMouseMove}
                  onMouseLeave={cardTilt.onMouseLeave}
                  className="card-3d-tilt group flex w-full flex-col overflow-hidden rounded-[18px] border border-cyan-500/35 bg-gradient-to-br from-[#111a2e]/95 to-[#0a101f]/95 text-left shadow-[0_0_18px_rgba(6,182,212,0.1)] hover:border-cyan-400/80 hover:shadow-[0_16px_36px_rgba(6,182,212,0.28)]"
                >
                  <button
                    type="button"
                    onClick={() => onSelectVideo(work)}
                    aria-label={`${work.title} — ভিডিও প্লেয়ার প্রিভিউ খুলুন`}
                    className="relative aspect-video w-full cursor-pointer overflow-hidden bg-[#070b14] text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300"
                  >
                    {!isBroken ? (
                      <img
                        src={activeSrc}
                        alt={work.title}
                        referrerPolicy="no-referrer"
                        onError={() => {
                          if (!fallbackUsed[work.id] && work.fallbackImageUrl) {
                            setFallbackUsed((prev) => ({ ...prev, [work.id]: true }));
                          } else {
                            setBrokenImages((prev) => ({ ...prev, [work.id]: true }));
                          }
                        }}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-[#16223b] to-[#070b14] p-6 text-center">
                        <Film className="h-10 w-10 text-cyan-300" />
                        <span className="font-bn mt-2 text-sm font-semibold text-cyan-100">
                          {work.title}
                        </span>
                      </div>
                    )}

                    {/* Measured dark scrim for contrast */}
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-gradient-to-t from-[#070b14]/90 via-[#070b14]/25 to-transparent"
                    />

                    {/* Center Play Affordance */}
                    <span
                      aria-hidden="true"
                      className={`absolute inset-0 m-auto grid h-14 w-14 place-items-center rounded-full border text-white backdrop-blur-sm transition-transform duration-200 group-hover:scale-110 ${
                        work.youtubeId
                          ? 'border-rose-300/85 bg-rose-600/85 shadow-[0_0_22px_rgba(244,63,94,0.65)] group-hover:bg-rose-500'
                          : 'border-cyan-300/85 bg-cyan-600/75 shadow-[0_0_22px_rgba(34,211,238,0.6)] group-hover:bg-cyan-500'
                      }`}
                    >
                      <Play className="ml-0.5 h-5 w-5 fill-current" />
                    </span>

                    {/* Clean corner timecode */}
                    <span className="font-timecode absolute right-3 bottom-3 rounded-md bg-[#070b14]/85 px-2.5 py-1 text-xs font-semibold text-cyan-200">
                      {work.timecodeLabel}
                    </span>
                  </button>

                  <div className="flex flex-1 flex-col p-5">
                    <div className="font-bn flex flex-wrap items-center justify-between gap-2 text-xs font-semibold">
                      <span className="text-cyan-300">
                        {work.categoryLabel} · {work.channel || work.client}
                      </span>
                      <span className="text-slate-400">{work.year}</span>
                    </div>

                    <button
                      type="button"
                      onClick={() => onSelectVideo(work)}
                      className="font-bn mt-2 cursor-pointer text-left text-base font-bold leading-snug text-white transition-colors hover:text-cyan-200"
                    >
                      {work.title}
                    </button>

                    <p className="font-bn mt-1.5 flex-1 text-sm text-slate-300">
                      {work.subtitle}
                    </p>

                    <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-slate-700/60 pt-3 text-xs font-medium text-slate-400">
                      <span className="truncate">{work.tools.join(' / ')}</span>
                      {work.youtubeUrl ? (
                        <a
                          href={work.youtubeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex shrink-0 items-center gap-1 font-semibold text-rose-300 transition-colors hover:text-rose-200"
                        >
                          <span>YouTube</span>
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      ) : (
                        <button
                          type="button"
                          onClick={() => onSelectVideo(work)}
                          className="cursor-pointer font-semibold text-cyan-300 hover:text-cyan-200"
                        >
                          প্রিভিউ দেখুন
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
