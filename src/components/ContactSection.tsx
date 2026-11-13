import {
  Briefcase,
  Check,
  Copy,
  ExternalLink,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
} from 'lucide-react';
import { useState, type FormEvent } from 'react';
import { PROFILE_INFO } from '../data/portfolioData';
import { useTilt3D } from '../hooks/useMotion3D';
import { buildWhatsAppUrl } from '../utils/portfolio';

export function ContactSection() {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [waProjectType, setWaProjectType] = useState<string>('News Video Editing');
  const [waMessage, setWaMessage] = useState<string>('');
  const [waReadyUrl, setWaReadyUrl] = useState<string | null>(null);

  const cardTilt = useTilt3D(5, { perspectivePx: 900, translateZPx: 8, scale: 1.015 });

  const handleCopy = async (key: string, value: string) => {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      // Clipboard API fallback
    }
    setCopiedKey(key);
    window.setTimeout(() => setCopiedKey(null), 2200);
  };

  const handleWhatsAppPrepare = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const url = buildWhatsAppUrl(PROFILE_INFO.whatsappDigits, waProjectType, waMessage);
    setWaReadyUrl(url);
  };

  const handleSampleWhatsApp = () => {
    const sampleText =
      'হ্যালো Ridoy, আমরা প্রাইম-টাইম নিউজ প্যাকেজ এবং ২ডি/৩ডি ব্রডকাস্ট গ্রাফিক্স নিয়ে কাজ করতে আগ্রহী।';
    setWaProjectType('News Video Editing');
    setWaMessage(sampleText);
    setWaReadyUrl(
      buildWhatsAppUrl(PROFILE_INFO.whatsappDigits, 'News Video Editing', sampleText)
    );
  };

  const liveWaUrl = buildWhatsAppUrl(PROFILE_INFO.whatsappDigits, waProjectType, waMessage);

  return (
    <section
      id="contact"
      className="perspective-stage relative z-10 scroll-mt-24 py-16 sm:py-20"
    >
      <div className="mx-auto max-w-[1140px] px-5">
        <div data-reveal-3d className="mx-auto mb-12 max-w-2xl text-center">
          <p className="font-bn text-xs font-bold tracking-[0.22em] text-cyan-300 uppercase">
            সরাসরি WhatsApp · ফেসবুক · ফোন ও ইমেইল
          </p>
          <h2 className="font-impact mt-3 text-[clamp(1.85rem,4vw,2.75rem)] leading-tight text-balance uppercase">
            LET&apos;S EDIT{' '}
            <span className="bg-gradient-to-r from-emerald-300 via-cyan-300 to-violet-400 bg-clip-text text-transparent">
              TOGETHER
            </span>
          </h2>
          <p className="font-bn mt-3 text-base text-slate-300">
            নিউজ প্যাকেজ, ডকুমেন্টারি, ২ডি ও ৩ডি অ্যানিমেশন অ্যাড অথবা টিভি ও ডিজিটাল
            নিউজরুম প্রজেক্টের জন্য নিচের যেকোনো মাধ্যমে সরাসরি যোগাযোগ করুন।
          </p>
        </div>

        {/* 3-Column Balanced Direct Contact Cards (No Extra Form) */}
        <div className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Card 1: Availability, Location & CV Specialty */}
          <div
            data-reveal-3d
            onMouseMove={cardTilt.onMouseMove}
            onMouseLeave={cardTilt.onMouseLeave}
            className="card-3d-tilt flex flex-col justify-between rounded-2xl border border-cyan-500/40 bg-gradient-to-br from-[#111a2e]/95 to-[#0a101f]/95 p-6 shadow-[0_0_22px_rgba(6,182,212,0.12)] hover:border-cyan-400/80"
          >
            <div>
              <span className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.16em] text-emerald-300 uppercase">
                <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.95)]" />
                Available for Projects
              </span>

              <h3 className="font-bn mt-3 text-xl font-bold text-white">
                চলুন প্রজেক্ট নিয়ে কথা বলি
              </h3>
              <p className="font-bn mt-2 text-sm leading-relaxed text-slate-300">
                {PROFILE_INFO.availability}। দ্রুত ডেলিভারি ও প্রাইম-টাইম ব্রডকাস্ট মানের
                নিশ্চয়তায় সরাসরি WhatsApp বা ফোনে যোগাযোগ করুন।
              </p>

              <div className="mt-5 space-y-3 border-t border-slate-700/60 pt-4 text-xs sm:text-sm">
                <div className="flex items-start gap-2.5 text-slate-200">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-cyan-300" />
                  <div>
                    <span className="font-bn block font-semibold text-white">
                      {PROFILE_INFO.location}
                    </span>
                    <span className="block text-xs text-slate-400">
                      স্থায়ী: {PROFILE_INFO.permanentLocation}
                    </span>
                  </div>
                </div>
                <div className="flex items-start gap-2.5 text-slate-200">
                  <Briefcase className="mt-0.5 h-4 w-4 shrink-0 text-violet-300" />
                  <span className="font-bn text-slate-300">
                    রিমোট ও অন-সাইট নিউজরুম কলাবোরেশন
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-5 flex items-center justify-between border-t border-slate-700/60 pt-4 text-xs">
              <span className="font-semibold text-cyan-300">{PROFILE_INFO.domain}</span>
              <button
                type="button"
                onClick={handleSampleWhatsApp}
                className="font-bn cursor-pointer font-semibold text-emerald-300 underline hover:text-white"
              >
                স্যাম্পল WhatsApp বার্তা ↗
              </button>
            </div>
          </div>

          {/* Card 2: Click to WhatsApp Interactive Card */}
          <div
            data-reveal-3d
            onMouseMove={cardTilt.onMouseMove}
            onMouseLeave={cardTilt.onMouseLeave}
            className="card-3d-tilt flex flex-col justify-between rounded-2xl border border-emerald-400/55 bg-gradient-to-br from-[#0c2627]/95 via-[#0f1c2e]/95 to-[#0b1120]/95 p-6 shadow-[0_0_26px_rgba(16,185,129,0.18)]"
          >
            <div className="flex items-center gap-3">
              <div className="animate-float-2d relative flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-green-600 text-white shadow-[0_0_20px_rgba(16,185,129,0.55)]">
                <MessageCircle className="h-6 w-6" />
              </div>
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-base font-bold text-white">Click to WhatsApp</h3>
                  <span className="inline-flex items-center gap-1 rounded-full border border-emerald-400/50 bg-emerald-950/90 px-2 py-0.5 text-[10px] font-bold text-emerald-300">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    Active
                  </span>
                </div>
                <p className="truncate text-xs font-semibold text-emerald-300">
                  {PROFILE_INFO.shortName} · {PROFILE_INFO.phone}
                </p>
              </div>
            </div>

            <form onSubmit={handleWhatsAppPrepare} className="mt-5 space-y-3">
              <select
                aria-label="WhatsApp Project Type"
                value={waProjectType}
                onChange={(e) => setWaProjectType(e.target.value)}
                className="w-full rounded-xl border border-emerald-500/40 bg-[#070b14]/90 px-3.5 py-2.5 text-xs font-medium text-slate-100 focus:border-emerald-400 focus:outline-none sm:text-sm"
              >
                <option value="News Video Editing">Project: News Video Editing</option>
                <option value="2D/3D Motion Graphics">Project: 2D/3D Motion Graphics</option>
                <option value="Intro / Outro / News BG">Project: Intro / Outro / News BG</option>
                <option value="Documentary & Special Package">
                  Project: Documentary &amp; Special Package
                </option>
              </select>

              <div className="flex items-center gap-2 rounded-xl border border-emerald-500/55 bg-[#070b14]/90 p-1.5 focus-within:border-emerald-400">
                <input
                  type="text"
                  value={waMessage}
                  onChange={(e) => setWaMessage(e.target.value)}
                  placeholder="Ridoy Khan Rid-কে বার্তা লিখুন..."
                  aria-label="WhatsApp বার্তা"
                  className="font-bn min-w-0 flex-1 bg-transparent px-2.5 py-2 text-xs text-white placeholder-slate-400 focus:outline-none sm:text-sm"
                />
                <a
                  href={liveWaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bn inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-gradient-to-r from-emerald-500 to-green-600 px-3.5 py-2 text-xs font-bold text-white shadow-[0_0_14px_rgba(16,185,129,0.45)] transition-transform hover:scale-[1.03] sm:text-sm"
                >
                  <span>Send</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            </form>

            {waReadyUrl ? (
              <p className="font-bn mt-3 text-xs text-emerald-300">
                বার্তা প্রস্তুত —{' '}
                <a
                  href={waReadyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-white underline"
                >
                  WhatsApp-এ খুলুন ↗
                </a>
              </p>
            ) : (
              <p className="font-bn mt-3 text-xs text-slate-400">
                মেসেজ লিখে Send-এ ক্লিক করলে সরাসরি WhatsApp চ্যাট খুলবে।
              </p>
            )}
          </div>

          {/* Card 3: Direct Email, Phone & Facebook Profile */}
          <div
            data-reveal-3d
            onMouseMove={cardTilt.onMouseMove}
            onMouseLeave={cardTilt.onMouseLeave}
            className="card-3d-tilt flex flex-col justify-between gap-3.5 rounded-2xl border border-violet-500/40 bg-gradient-to-br from-[#141b33]/95 to-[#0a101f]/95 p-6 shadow-[0_0_22px_rgba(139,92,246,0.14)] hover:border-violet-400/80 md:col-span-2 lg:col-span-1"
          >
            <div className="space-y-3">
              <h3 className="font-bn text-base font-bold text-white">
                ডাইরেক্ট ইমেইল, ফোন ও সোশ্যাল
              </h3>

              {/* Email Copy */}
              <div className="rounded-xl border border-slate-700/65 bg-[#070b14]/85 p-3">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 shrink-0 text-cyan-300" />
                    <span className="font-bn text-[11px] font-semibold tracking-wide text-slate-400">
                      ইমেইল ঠিকানা
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopy('email', PROFILE_INFO.email)}
                    aria-label="ইমেইল ঠিকানা কপি করুন"
                    className="font-bn inline-flex shrink-0 cursor-pointer items-center gap-1 rounded-lg border border-cyan-500/45 bg-[#111a2e] px-2.5 py-1 text-[11px] font-semibold text-cyan-200 hover:border-cyan-300 hover:text-white"
                  >
                    {copiedKey === 'email' ? (
                      <>
                        <Check className="h-3 w-3 text-emerald-400" />
                        <span>কপি</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3 w-3" />
                        <span>কপি</span>
                      </>
                    )}
                  </button>
                </div>
                <div className="mt-2 space-y-0.5 pl-6">
                  <a
                    href={`mailto:${PROFILE_INFO.email}`}
                    className="block break-all text-xs font-semibold text-slate-100 hover:text-white"
                  >
                    {PROFILE_INFO.email}
                  </a>
                  <a
                    href={`mailto:${PROFILE_INFO.secondaryEmail}`}
                    className="block break-all text-[11px] text-slate-400 hover:text-slate-200"
                  >
                    {PROFILE_INFO.secondaryEmail}
                  </a>
                </div>
              </div>

              {/* Phone Copy */}
              <div className="flex items-center justify-between gap-2 rounded-xl border border-slate-700/65 bg-[#070b14]/85 p-3">
                <div className="flex min-w-0 items-center gap-2.5">
                  <Phone className="h-4 w-4 shrink-0 text-violet-300" />
                  <a
                    href={`tel:${PROFILE_INFO.phone}`}
                    className="truncate text-xs font-semibold text-slate-100 hover:text-white"
                  >
                    {PROFILE_INFO.phone}
                  </a>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy('phone', PROFILE_INFO.phone)}
                  aria-label="ফোন নম্বর কপি করুন"
                  className="font-bn inline-flex shrink-0 cursor-pointer items-center gap-1 rounded-lg border border-violet-500/45 bg-[#111a2e] px-2.5 py-1.5 text-[11px] font-semibold text-violet-200 hover:border-violet-300 hover:text-white"
                >
                  {copiedKey === 'phone' ? (
                    <>
                      <Check className="h-3 w-3 text-emerald-400" />
                      <span>কপি</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3 w-3" />
                      <span>কপি</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Direct Clickable Facebook Profile Card */}
            <a
              href={PROFILE_INFO.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-xl border border-sky-500/45 bg-[#091326] p-3 shadow-[0_0_16px_rgba(14,165,233,0.16)] transition-all duration-200 hover:-translate-y-0.5 hover:border-sky-400 hover:bg-[#10203b]"
            >
              <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full border-2 border-sky-400 bg-white">
                <img
                  src={PROFILE_INFO.portraitUrl}
                  alt="Facebook Profile — MD. Abdullah Al Mamun Khan Ridoy"
                  className="h-full w-full object-cover object-top"
                />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-blue-600 text-[10px] font-black text-white">
                    f
                  </span>
                  <span className="text-xs font-bold text-white">Facebook Profile</span>
                </div>
                <p className="truncate text-[11px] text-sky-300">
                  {PROFILE_INFO.fullName} ↗
                </p>
              </div>
              <ExternalLink className="h-4 w-4 shrink-0 text-sky-300" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
