import test from 'node:test';
import assert from 'node:assert/strict';
import {
  CAREER_OFFICES,
  CV_ACADEMICS,
  CV_LANGUAGES,
  CV_PERSONAL_DETAILS,
  CV_TRAINING,
  PROFILE_INFO,
  SPECIAL_QUALIFICATIONS,
  STUDIO_HIGHLIGHTS,
  VIDEO_WORKS,
} from '../data/portfolioData';
import {
  buildSparkVectors,
  buildWhatsAppUrl,
  computeCardTilt,
  computeScrollProgress,
  createSavedInquiry,
  filterGraphicWorks,
  filterVideoWorks,
  formatTimecode,
  validateContactForm,
  type GraphicWork,
  type VideoWork,
} from './portfolio';

const SAMPLE_WORKS: VideoWork[] = [
  {
    id: 'w1',
    title: 'Breaking News Special',
    subtitle: 'Primetime package',
    category: 'package',
    categoryLabel: 'Package',
    durationSec: 150,
    timecodeLabel: '00:02:30:00',
    format: '4K Broadcast',
    client: 'National TV',
    year: '2026',
    tools: ['Premiere Pro'],
    imageUrl: '/img/1.jpg',
    summary: 'Summary',
    chapters: [{ label: 'Intro', timeSec: 0 }],
  },
  {
    id: 'w2',
    title: 'July Museum Documentary',
    subtitle: 'Investigative special package',
    category: 'special-package',
    categoryLabel: 'Special Package',
    durationSec: 600,
    timecodeLabel: '00:10:00:00',
    format: '4K Cinema',
    client: 'Doc Desk',
    year: '2025',
    tools: ['DaVinci Resolve'],
    imageUrl: '/img/2.jpg',
    summary: 'Summary',
    chapters: [{ label: 'Part 1', timeSec: 0 }],
  },
  {
    id: 'w3',
    title: '3D Commercial Product Ad',
    subtitle: '2D & 3D Broadcast Ad',
    category: 'motion-ad',
    categoryLabel: '২ডি ও ৩ডি অ্যাড',
    durationSec: 45,
    timecodeLabel: '00:00:45:00',
    format: '4K 60fps 3D CGI',
    client: 'Commercial Brand',
    year: '2026',
    tools: ['After Effects', 'Blender'],
    imageUrl: '/img/3.jpg',
    summary: 'Summary',
    chapters: [{ label: 'Reveal', timeSec: 0 }],
  },
];

const SAMPLE_GRAPHICS: GraphicWork[] = [
  {
    id: 'g1',
    title: 'Poster Design',
    subtitle: 'Key art',
    category: 'Key Art & Poster',
    filterKey: 'graphic-design',
    dimensionTag: '2D',
    year: '2026',
    dimensions: '2400x3200',
    tools: ['Photoshop'],
    accentLabel: 'Poster',
    description: 'Desc',
  },
  {
    id: 'g2',
    title: '3D Broadcast Ad Kit',
    subtitle: '3D motion commercial',
    category: '2D & 3D Animation Ad',
    filterKey: 'animation-ad',
    dimensionTag: '2D & 3D',
    year: '2026',
    dimensions: '3840x2160',
    tools: ['After Effects', 'Cinema 4D'],
    accentLabel: '3D Ad',
    description: 'Desc',
  },
];

test('filterVideoWorks returns all items when category is all', () => {
  const all = filterVideoWorks(SAMPLE_WORKS, 'all');
  assert.equal(all.length, 3);
});

test('filterVideoWorks filters items by merged broadcast categories accurately', () => {
  const specialDocs = filterVideoWorks(SAMPLE_WORKS, 'special-package');
  assert.equal(specialDocs.length, 1);
  assert.equal(specialDocs[0]?.id, 'w2');

  const ads = filterVideoWorks(SAMPLE_WORKS, 'motion-ad');
  assert.equal(ads.length, 1);
  assert.equal(ads[0]?.id, 'w3');
});

test('filterGraphicWorks returns all 2D & 3D items or filters by filterKey', () => {
  assert.equal(filterGraphicWorks(SAMPLE_GRAPHICS, 'all-2d-3d').length, 2);
  const onlyAd = filterGraphicWorks(SAMPLE_GRAPHICS, 'animation-ad');
  assert.equal(onlyAd.length, 1);
  assert.equal(onlyAd[0]?.id, 'g2');
});

test('buildWhatsAppUrl generates properly encoded wa.me link', () => {
  const url = buildWhatsAppUrl('+8801879772036', 'News Video Editing', 'Need prime-time cut');
  assert.ok(url.startsWith('https://wa.me/8801879772036?text='));
  assert.ok(url.includes(encodeURIComponent('[News Video Editing] Need prime-time cut')));
});

test('computeCardTilt computes centered zero tilt and clamped corner tilts', () => {
  const rect = { left: 100, top: 200, width: 200, height: 100 };
  const center = computeCardTilt(200, 250, rect, 10);
  assert.equal(center.rotateX, 0);
  assert.equal(center.rotateY, 0);

  const topRight = computeCardTilt(300, 200, rect, 10);
  assert.equal(topRight.rotateY, 10);
  assert.equal(topRight.rotateX, 10);

  const bottomLeftClamped = computeCardTilt(0, 500, rect, 10);
  assert.equal(bottomLeftClamped.rotateY, -10);
  assert.equal(bottomLeftClamped.rotateX, -10);
  assert.ok(bottomLeftClamped.transform.includes('perspective(900px)'));
});

test('validateContactForm rejects empty or invalid inputs with field errors', () => {
  const invalid = validateContactForm({
    name: 'A',
    email: 'invalid-email',
    projectType: '',
    message: 'short',
  });
  assert.equal(invalid.valid, false);
  assert.ok(invalid.errors.name);
  assert.ok(invalid.errors.email);
  assert.ok(invalid.errors.projectType);
  assert.ok(invalid.errors.message);
});

test('validateContactForm accepts valid Bengali and English inquiry data', () => {
  const valid = validateContactForm({
    name: 'আব্দুল্লাহ মামুন',
    email: 'abdullahaalmamun09@gmail.com',
    projectType: 'News Video Editing & Package',
    message: 'আমাদের চ্যানেলের নতুন প্রাইম-টাইম বুলেটিনের জন্য প্যাকেজ এডিটিং প্রয়োজন।',
  });
  assert.equal(valid.valid, true);
  assert.deepEqual(valid.errors, {});
});

test('computeScrollProgress clamps output between 0 and 100', () => {
  assert.equal(computeScrollProgress(0, 1000, 1000), 0);
  assert.equal(computeScrollProgress(-20, 2000, 1000), 0);
  assert.equal(computeScrollProgress(500, 2000, 1000), 50);
  assert.equal(computeScrollProgress(1500, 2000, 1000), 100);
});

test('formatTimecode renders SMPTE HH:MM:SS:FF accurately', () => {
  assert.equal(formatTimecode(0, 25), '00:00:00:00');
  assert.equal(formatTimecode(134.5, 25), '00:02:14:12');
  assert.equal(formatTimecode(3661, 25), '01:01:01:00');
});

test('buildSparkVectors produces symmetric radial sparks', () => {
  const sparks = buildSparkVectors(8, 180);
  assert.equal(sparks.length, 8);
  assert.equal(sparks[0]?.ty, '0px');
  assert.ok(sparks[0]?.tx.endsWith('px'));
});

test('createSavedInquiry trims whitespace and attaches ISO timestamp', () => {
  const fixedDate = new Date('2026-11-13T10:00:00.000Z');
  const saved = createSavedInquiry(
    {
      name: '  Ridoy Khan  ',
      email: ' abdullahaalmamun09@gmail.com ',
      projectType: 'Special Documentary & Feature Cut',
      message: '  Need documentary post-production support for 20-min feature.  ',
    },
    fixedDate
  );
  assert.equal(saved.name, 'Ridoy Khan');
  assert.equal(saved.email, 'abdullahaalmamun09@gmail.com');
  assert.equal(saved.submittedAt, '2026-11-13T10:00:00.000Z');
});

test('Merged CV + HTML data includes all 9 YouTube works, 6 offices with CV dates, training, academics, and contact links', () => {
  assert.equal(PROFILE_INFO.portraitUrl, '/assets/images/ridoy_portrait_studio.jpg');
  assert.equal(PROFILE_INFO.email, 'abdullahaalmamun09@gmail.com');
  assert.equal(PROFILE_INFO.phone, '+8801879772036');
  assert.equal(STUDIO_HIGHLIGHTS.length, 3);
  assert.equal(CAREER_OFFICES.length, 6);
  assert.equal(CAREER_OFFICES[0]?.status, 'current');
  assert.equal(CAREER_OFFICES[1]?.period, 'Nov 1, 2025 – Jun 31, 2026');
  assert.equal(CAREER_OFFICES[1]?.location, 'Jamuna Future Park, Dhaka');
  assert.equal(CAREER_OFFICES[3]?.location, 'Rampura, Dhaka');
  assert.equal(CAREER_OFFICES[5]?.location, 'Mohammadpur, Dhaka');

  // 9 real YouTube works + 1 2D/3D commercial showreel = 10
  assert.equal(VIDEO_WORKS.length, 10);
  const ytWorks = VIDEO_WORKS.filter((v) => Boolean(v.youtubeId));
  assert.equal(ytWorks.length, 9);

  // CV credentials checks
  assert.ok(SPECIAL_QUALIFICATIONS.length >= 8);
  assert.equal(CV_TRAINING[0]?.institute, 'Motion Boss Bangladesh');
  assert.equal(CV_ACADEMICS.length, 3);
  assert.equal(CV_LANGUAGES.length, 3);
  assert.equal(CV_PERSONAL_DETAILS.fatherName, 'Akkaj Ali Khan');
});
