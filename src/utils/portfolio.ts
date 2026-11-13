export type VideoCategory =
  | 'all'
  | 'package'
  | 'special-package'
  | 'bulletin'
  | 'motion-ad';

export type GraphicCategory =
  | 'all-2d-3d'
  | 'graphic-design'
  | 'motion-graphic'
  | 'animation-ad';

export interface VideoWork {
  id: string;
  title: string;
  subtitle: string;
  category: Exclude<VideoCategory, 'all'>;
  categoryLabel: string;
  durationSec: number;
  timecodeLabel: string;
  format: string;
  client: string;
  channel?: string;
  year: string;
  tools: string[];
  imageUrl: string;
  fallbackImageUrl?: string;
  youtubeId?: string;
  youtubeUrl?: string;
  summary: string;
  chapters: Array<{ label: string; timeSec: number }>;
}

export interface GraphicWork {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  filterKey: Exclude<GraphicCategory, 'all-2d-3d'>;
  dimensionTag: '2D' | '3D' | '2D & 3D';
  year: string;
  dimensions: string;
  tools: string[];
  imageUrl?: string;
  accentLabel: string;
  description: string;
}

export type BrandLogoKey =
  | 'deshbarta'
  | 'jugantor'
  | 'dhakawatch24'
  | 'dhakatimes'
  | 'prabhastime'
  | 'deshtv'
  | 'perfect';

export interface CareerOffice {
  id: string;
  organization: string;
  role: string;
  period: string;
  location: string;
  department: string;
  status: 'current' | 'past';
  statusLabel: string;
  brandKey: BrandLogoKey;
  websiteUrl: string;
  websiteLabel: string;
  iconKey: 'broadcast' | 'clock' | 'camera' | 'film' | 'globe' | 'sparkles';
  highlights: string[];
}

export interface StudioHighlight {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  year: string;
  dimensions: string;
  tools: string[];
  imageUrl: string;
  accentGradient: string;
  accentShadow: string;
  description: string;
}

export interface TrainingEntry {
  id: string;
  title: string;
  institute: string;
  location: string;
  year: string;
  duration: string;
  focus: string;
}

export interface AcademicEntry {
  id: string;
  examTitle: string;
  major: string;
  institute: string;
  result: string;
  passingYear: string;
  duration: string;
}

export interface LanguageProficiency {
  language: string;
  reading: 'High' | 'Medium' | 'Low';
  writing: 'High' | 'Medium' | 'Low';
  speaking: 'High' | 'Medium' | 'Low';
  levelPercent: number;
}

export interface PersonalDetails {
  fatherName: string;
  motherName: string;
  dateOfBirth: string;
  nationality: string;
  maritalStatus: string;
  religion: string;
  presentAddress: string;
  permanentAddress: string;
}

export interface ContactFormInput {
  name: string;
  email: string;
  projectType: string;
  message: string;
}

export interface ContactValidationResult {
  valid: boolean;
  errors: Partial<Record<keyof ContactFormInput, string>>;
}

export interface SavedInquiry extends ContactFormInput {
  id: string;
  submittedAt: string;
}

export interface SparkVector {
  id: number;
  tx: string;
  ty: string;
  delayMs: number;
}

export interface TiltTransform {
  rotateX: number;
  rotateY: number;
  transform: string;
}

export function filterVideoWorks(works: VideoWork[], category: VideoCategory): VideoWork[] {
  if (category === 'all') {
    return works;
  }
  return works.filter((work) => work.category === category);
}

export function filterGraphicWorks(
  works: GraphicWork[],
  category: GraphicCategory
): GraphicWork[] {
  if (category === 'all-2d-3d') {
    return works;
  }
  return works.filter((work) => work.filterKey === category);
}

export function buildWhatsAppUrl(
  phoneDigits: string,
  projectType: string,
  message: string
): string {
  const cleanDigits = phoneDigits.replace(/[^\d]/g, '');
  const trimmedMsg = message.trim();
  const payload = trimmedMsg
    ? `[${projectType}] ${trimmedMsg}`
    : `হ্যালো Ridoy Khan Rid, আমি [${projectType}] প্রজেক্ট নিয়ে কথা বলতে চাই।`;
  return `https://wa.me/${cleanDigits}?text=${encodeURIComponent(payload)}`;
}

export function computeCardTilt(
  clientX: number,
  clientY: number,
  rect: { left: number; top: number; width: number; height: number },
  maxTiltDeg = 9,
  options: { perspectivePx?: number; translateZPx?: number; scale?: number } = {}
): TiltTransform {
  const { perspectivePx = 900, translateZPx = 10, scale = 1.02 } = options;
  if (rect.width <= 0 || rect.height <= 0) {
    return {
      rotateX: 0,
      rotateY: 0,
      transform: `perspective(${perspectivePx}px) rotateX(0deg) rotateY(0deg) translateZ(0px) scale(1)`,
    };
  }
  const normalizedX = Math.max(-0.5, Math.min(0.5, (clientX - rect.left) / rect.width - 0.5));
  const normalizedY = Math.max(-0.5, Math.min(0.5, (clientY - rect.top) / rect.height - 0.5));
  const rotateY = Number((normalizedX * maxTiltDeg * 2).toFixed(2));
  const rotateX = Number((-normalizedY * maxTiltDeg * 2).toFixed(2));
  return {
    rotateX,
    rotateY,
    transform: `perspective(${perspectivePx}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(${translateZPx}px) scale(${scale})`,
  };
}

export function validateContactForm(input: ContactFormInput): ContactValidationResult {
  const errors: Partial<Record<keyof ContactFormInput, string>> = {};
  const trimmedName = input.name.trim();
  const trimmedEmail = input.email.trim();
  const trimmedProjectType = input.projectType.trim();
  const trimmedMessage = input.message.trim();

  if (trimmedName.length < 2) {
    errors.name = 'অনুগ্রহ করে আপনার পূর্ণ নাম লিখুন (কমপক্ষে ২ অক্ষর)।';
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!emailPattern.test(trimmedEmail)) {
    errors.email = 'সঠিক ইমেইল ঠিকানা প্রদান করুন।';
  }

  if (!trimmedProjectType) {
    errors.projectType = 'প্রজেক্টের ধরন নির্বাচন করুন।';
  }

  if (trimmedMessage.length < 10) {
    errors.message = 'প্রজেক্ট সম্পর্কে কমপক্ষে ১০ অক্ষরের বিবরণ লিখুন।';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

export function computeScrollProgress(
  scrollTop: number,
  scrollHeight: number,
  clientHeight: number
): number {
  const scrollable = scrollHeight - clientHeight;
  if (scrollable <= 0) {
    return 0;
  }
  const ratio = (scrollTop / scrollable) * 100;
  return Math.max(0, Math.min(100, Math.round(ratio * 10) / 10));
}

export function formatTimecode(totalSeconds: number, fps = 25): string {
  const safeSeconds = Math.max(0, Math.floor(totalSeconds));
  const hours = Math.floor(safeSeconds / 3600);
  const minutes = Math.floor((safeSeconds % 3600) / 60);
  const seconds = safeSeconds % 60;
  const frames = Math.floor((Math.max(0, totalSeconds) % 1) * fps);

  const pad = (n: number) => String(n).padStart(2, '0');
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}:${pad(frames)}`;
}

export function buildSparkVectors(count = 12, radiusPx = 195): SparkVector[] {
  const vectors: SparkVector[] = [];
  for (let i = 0; i < count; i += 1) {
    const angleRad = (i / count) * Math.PI * 2;
    const distance = radiusPx + (i % 2 === 0 ? 14 : -12);
    const tx = Math.round(Math.cos(angleRad) * distance);
    const ty = Math.round(Math.sin(angleRad) * distance);
    vectors.push({
      id: i,
      tx: `${tx}px`,
      ty: `${ty}px`,
      delayMs: 320 + i * 38,
    });
  }
  return vectors;
}

export function createSavedInquiry(
  input: ContactFormInput,
  now = new Date()
): SavedInquiry {
  return {
    id: `inq_${now.getTime()}`,
    name: input.name.trim(),
    email: input.email.trim(),
    projectType: input.projectType.trim(),
    message: input.message.trim(),
    submittedAt: now.toISOString(),
  };
}
