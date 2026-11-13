import { ExternalLink, Pause, Play, RotateCcw, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useTilt3D } from '../hooks/useMotion3D';
import { formatTimecode, type GraphicWork, type VideoWork } from '../utils/portfolio';

export type ActiveMediaModal =
  | { type: 'video'; item: VideoWork }
  | { type: 'graphic'; item: GraphicWork }
  | null;

interface MediaLightboxModalProps {
  media: ActiveMediaModal;
  onClose: () => void;
}

export function MediaLightboxModal({ media, onClose }: MediaLightboxModalProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [playheadSec, setPlayheadSec] = useState(0);
  const stageTilt = useTilt3D(8, { perspectivePx: 1000, translateZPx: 10, scale: 1.015 });

  useEffect(() => {
    setPlayheadSec(0);
    setIsPlaying(true);
  }, [media]);

  useEffect(() => {
    if (!media) {
      return undefined;
    }
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [media, onClose]);

  useEffect(() => {
    if (!media || media.type !== 'video' || media.item.youtubeId || !isPlaying) {
      return undefined;
    }
    const maxDuration = media.item.durationSec;
    const timer = window.setInterval(() => {
      setPlayheadSec((prev) => (prev + 0.25 >= maxDuration ? 0 : prev + 0.25));
    }, 250);
    return () => window.clearInterval(timer);
  }, [media, isPlaying]);

  if (!media) {
    return null;
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="lightbox-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#04070e]/88 p-4 backdrop-blur-md"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="perspective-stage relative max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-cyan-500/45 bg-[#0f172a] shadow-[0_24px_70px_rgba(6,182,212,0.3)]">
        {/* Top bar */}
        <div className="flex items-start justify-between gap-4 border-b border-slate-700/65 px-6 py-4">
          <div>
            <p className="font-bn text-xs font-semibold text-cyan-300">
              {media.type === 'video'
                ? `${media.item.categoryLabel} · ${media.item.channel || media.item.client} · ${media.item.format}`
                : `${media.item.dimensionTag} · ${media.item.category} · ${media.item.dimensions}`}
            </p>
            <h3 id="lightbox-title" className="font-bn mt-1 text-xl font-bold text-white">
              {media.item.title}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="প্রিভিউ বন্ধ করুন"
            className="grid h-10 w-10 shrink-0 cursor-pointer place-items-center rounded-xl border border-cyan-500/45 bg-[#16223b] text-cyan-100 transition-colors hover:border-cyan-300 hover:text-white focus-visible:outline-2 focus-visible:outline-cyan-300"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Media Viewport */}
        {media.type === 'video' ? (
          <div className="p-6">
            {media.item.youtubeId ? (
              <>
                <div className="relative aspect-video overflow-hidden rounded-xl border border-cyan-500/40 bg-black">
                  <iframe
                    className="h-full w-full"
                    src={`https://www.youtube.com/embed/${media.item.youtubeId}?rel=0`}
                    title={media.item.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs">
                  <span className="font-bn font-semibold text-cyan-300">
                    চ্যানেল: {media.item.channel || media.item.client}
                  </span>
                  {media.item.youtubeUrl && (
                    <a
                      href={media.item.youtubeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-lg border border-rose-500/50 bg-rose-500/15 px-3 py-1.5 font-semibold text-rose-200 transition-colors hover:border-rose-400 hover:bg-rose-500/25 hover:text-white"
                    >
                      <span>Watch on YouTube</span>
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  )}
                </div>
              </>
            ) : (
              <>
                <div className="relative aspect-video overflow-hidden rounded-xl border border-cyan-500/40 bg-[#070b14]">
                  <img
                    src={media.item.imageUrl}
                    alt={media.item.title}
                    referrerPolicy="no-referrer"
                    className={`h-full w-full object-cover transition-transform duration-700 ${
                      isPlaying ? 'scale-[1.03]' : 'scale-100'
                    }`}
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-[#070b14]/90 via-transparent to-[#070b14]/30"
                  />
                  <div className="font-timecode absolute top-3 left-3 rounded-md bg-[#070b14]/80 px-2.5 py-1 text-xs text-cyan-200">
                    REC · {media.item.format}
                  </div>
                  <div className="font-timecode absolute right-3 bottom-3 rounded-md bg-[#070b14]/85 px-2.5 py-1 text-xs font-semibold text-violet-300">
                    {formatTimecode(playheadSec)} / {media.item.timecodeLabel}
                  </div>
                </div>

                {/* Interactive Editor Transport & Timeline Scrubber */}
                <div className="mt-4 rounded-xl border border-slate-700/65 bg-[#0a101f] p-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setIsPlaying((prev) => !prev)}
                      className="font-bn inline-flex min-h-[40px] cursor-pointer items-center gap-2 rounded-lg bg-cyan-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-cyan-500"
                    >
                      {isPlaying ? (
                        <>
                          <Pause className="h-4 w-4" />
                          <span>বিরতি</span>
                        </>
                      ) : (
                        <>
                          <Play className="h-4 w-4 fill-current" />
                          <span>প্লে প্রিভিউ</span>
                        </>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => setPlayheadSec(0)}
                      aria-label="টাইমলাইন শুরুতে নিন"
                      className="font-bn inline-flex min-h-[40px] cursor-pointer items-center gap-1.5 rounded-lg border border-cyan-500/40 bg-[#111a2e] px-3 py-2 text-sm font-medium text-cyan-100 hover:border-cyan-400"
                    >
                      <RotateCcw className="h-4 w-4" />
                      <span>রিসেট</span>
                    </button>
                    <div className="flex-1">
                      <label htmlFor="showreel-scrubber" className="sr-only">
                        টাইমলাইন সিক বার
                      </label>
                      <input
                        id="showreel-scrubber"
                        type="range"
                        min={0}
                        max={media.item.durationSec}
                        step={0.25}
                        value={playheadSec}
                        onChange={(e) => setPlayheadSec(Number(e.target.value))}
                        style={{
                          background: `linear-gradient(to right, #22d3ee ${(playheadSec / media.item.durationSec) * 100}%, rgba(100, 116, 139, 0.35) ${(playheadSec / media.item.durationSec) * 100}%)`,
                        }}
                        className="h-2 w-full cursor-pointer appearance-none rounded-full accent-cyan-400"
                      />
                    </div>
                  </div>

                  {/* Chapters */}
                  <div className="mt-3 flex flex-wrap gap-2">
                    {media.item.chapters.map((chap) => (
                      <button
                        key={chap.label}
                        type="button"
                        onClick={() => {
                          setPlayheadSec(chap.timeSec);
                          setIsPlaying(true);
                        }}
                        className="font-bn cursor-pointer rounded-lg border border-slate-700/70 bg-[#111a2e] px-3 py-1.5 text-xs font-medium text-cyan-200 transition-colors hover:border-cyan-400 hover:text-white"
                      >
                        {formatTimecode(chap.timeSec).slice(3, 8)} · {chap.label}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}

            <p className="font-bn mt-4 text-sm leading-relaxed text-slate-300">
              {media.item.summary}
            </p>
            <p className="font-bn mt-3 text-xs font-medium text-cyan-300">
              ক্লায়েন্ট: {media.item.client} · ব্যবহৃত সফটওয়্যার: {media.item.tools.join(', ')}
            </p>
          </div>
        ) : (
          <div className="p-6">
            <div
              onMouseMove={stageTilt.onMouseMove}
              onMouseLeave={stageTilt.onMouseLeave}
              className="card-3d-tilt relative mx-auto max-h-[55vh] overflow-hidden rounded-xl border border-cyan-500/40 bg-[#070b14]"
            >
              {media.item.imageUrl ? (
                <img
                  src={media.item.imageUrl}
                  alt={media.item.title}
                  referrerPolicy="no-referrer"
                  className="mx-auto max-h-[55vh] w-full object-contain"
                />
              ) : null}
            </div>
            <p className="font-bn mt-4 text-sm leading-relaxed text-slate-300">
              {media.item.description}
            </p>
            <p className="font-bn mt-3 text-xs font-medium text-cyan-300">
              ডাইমেনশন: {media.item.dimensionTag} · আর্ট ফরম্যাট: {media.item.dimensions} · সাল:{' '}
              {media.item.year} · সফটওয়্যার: {media.item.tools.join(', ')}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
