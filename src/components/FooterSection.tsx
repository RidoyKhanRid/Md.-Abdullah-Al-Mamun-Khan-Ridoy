import { ArrowUp, Mail, MessageCircle, Phone, Youtube } from 'lucide-react';
import { NAV_LINKS, PROFILE_INFO } from '../data/portfolioData';
import { BrandMark } from './Navbar';

interface FooterSectionProps {
  showBackToTop: boolean;
}

export function FooterSection({ showBackToTop }: FooterSectionProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Thank You / CTA Banner */}
      <section className="perspective-stage relative z-10 pt-4 pb-12">
        <div className="mx-auto max-w-[920px] px-5">
          <div
            data-reveal-3d
            className="thanks-sheen relative overflow-hidden rounded-2xl bg-gradient-to-r from-cyan-600 via-sky-600 to-violet-600 px-6 py-8 text-center shadow-[0_0_34px_rgba(6,182,212,0.38)]"
          >
            <h3 className="font-bn relative z-10 text-xl font-bold text-white sm:text-2xl">
              পোর্টফোলিও দেখার জন্য ধন্যবাদ! · Thanks Visit My Portfolio
            </h3>
            <p className="font-bn relative z-10 mt-1.5 text-sm text-cyan-50 sm:text-base">
              নতুন কোনো নিউজ প্যাকেজ, ডকুমেন্টারি, OVC/TVC বা ২ডি/৩ডি অ্যানিমেশন অ্যাড প্রজেক্টের
              জন্য আজই কথা বলুন।
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-cyan-500/20 bg-gradient-to-b from-[#0c1222]/80 to-[#070b14] pt-12 pb-9">
        <div className="mx-auto max-w-[1140px] px-5">
          <div
            data-reveal-3d
            className="flex flex-wrap items-start justify-between gap-8"
          >
            <div className="flex max-w-sm items-center gap-3.5">
              <BrandMark size="md" />
              <div>
                <div className="text-base font-extrabold tracking-wide text-white">
                  {PROFILE_INFO.brandName} · <span className="text-cyan-300">{PROFILE_INFO.domain}</span>
                </div>
                <p className="font-bn mt-1 text-sm text-slate-300">
                  {PROFILE_INFO.fullName} — {PROFILE_INFO.titleEn}
                </p>
                <p className="font-bn mt-0.5 text-xs text-slate-400">
                  {PROFILE_INFO.location} · {PROFILE_INFO.phone}
                </p>
              </div>
            </div>

            <nav aria-label="ফুটার লিংক" className="flex flex-wrap gap-x-5 gap-y-2">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  className="font-bn text-sm font-medium text-cyan-200 transition-colors hover:text-white"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-2.5">
              <a
                href={`https://wa.me/${PROFILE_INFO.whatsappDigits}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp-এ যোগাযোগ করুন"
                className="grid h-10 w-10 place-items-center rounded-xl border border-emerald-500/50 bg-[#111a2e] text-emerald-300 transition-all hover:-translate-y-0.5 hover:border-emerald-400 hover:text-white"
              >
                <MessageCircle className="h-4 w-4" />
              </a>
              <a
                href={`tel:${PROFILE_INFO.phone}`}
                aria-label="ফোন কল করুন"
                className="grid h-10 w-10 place-items-center rounded-xl border border-cyan-500/45 bg-[#111a2e] text-cyan-200 transition-all hover:-translate-y-0.5 hover:border-cyan-300 hover:text-white"
              >
                <Phone className="h-4 w-4" />
              </a>
              <a
                href={`mailto:${PROFILE_INFO.email}`}
                aria-label="ইমেইল পাঠান"
                className="grid h-10 w-10 place-items-center rounded-xl border border-violet-500/45 bg-[#111a2e] text-violet-200 transition-all hover:-translate-y-0.5 hover:border-violet-300 hover:text-white"
              >
                <Mail className="h-4 w-4" />
              </a>
              <a
                href="#videos"
                aria-label="ভিডিও শোরিল দেখুন"
                className="grid h-10 w-10 place-items-center rounded-xl border border-rose-500/45 bg-[#111a2e] text-rose-300 transition-all hover:-translate-y-0.5 hover:border-rose-400 hover:text-white"
              >
                <Youtube className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div className="mt-9 flex flex-wrap items-center justify-between gap-3 border-t border-slate-800 pt-5 text-xs text-slate-400">
            <p className="font-bn">
              © ২০২৬ <strong className="text-cyan-300">{PROFILE_INFO.brandName}</strong> ({PROFILE_INFO.domain}) —
              সর্বস্বত্ব সংরক্ষিত।
            </p>
            <p className="font-bn">
              {PROFILE_INFO.fullName} · {PROFILE_INFO.location}
            </p>
          </div>
        </div>
      </footer>

      {/* Back To Top */}
      <button
        type="button"
        onClick={scrollToTop}
        aria-label="উপরে ফিরে যান"
        className={`fixed right-5 bottom-5 z-40 grid h-12 w-12 cursor-pointer place-items-center rounded-2xl bg-gradient-to-br from-cyan-500 to-violet-600 text-white shadow-[0_0_22px_rgba(6,182,212,0.5)] transition-all duration-200 hover:shadow-[0_0_30px_rgba(34,211,238,0.8)] focus-visible:outline-2 focus-visible:outline-cyan-300 ${
          showBackToTop
            ? 'pointer-events-auto translate-y-0 opacity-100'
            : 'pointer-events-none translate-y-3 opacity-0'
        }`}
      >
        <ArrowUp className="h-5 w-5" />
      </button>
    </>
  );
}
