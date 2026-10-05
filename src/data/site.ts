import cvEn from "@/assets/cv-en.pdf.asset.json";

export const identity = {
  name: "Mahfuzh Arsya",
  monogram: "MA",
  role: "Full-Stack · Motion Designer · Data Visualization",
  headline: "Bridge Your Digital",
  headlineLong:
    "Bridge Your Digital — building reliable digital systems enhanced by precise, code-driven motion and an analytical eye.",
  city: "Surabaya, ID",
  timeZone: "Asia/Jakarta",
  tzLabel: "SUB",
  status: "Open for Full-Time, Collaborations & Projects",
  email: "mahfuzharsya90@gmail.com",
  whatsapp: "6285117769013",
  whatsappDisplay: "+62 851-1776-9013",
  whatsappMessage:
    "Halo Mahfuzh, saya melihat portofolio Anda dan ingin mendiskusikan sebuah proyek atau peluang kerja sama.",
  linkedin: "https://www.linkedin.com/in/mahfuzharsya",
  behance: "https://www.behance.net/arsyamahfuzh",
  linktree: "https://linktr.ee/mahfuzharsya",
  github: "https://github.com/",
  calendar: "https://linktr.ee/mahfuzharsya",
  cv: {
    en: cvEn.url,
    id: null as string | null,
  },
};

export const whatsappLink = `https://wa.me/${identity.whatsapp}?text=${encodeURIComponent(
  identity.whatsappMessage,
)}`;

export const disciplines = [
  {
    key: "web",
    index: "01",
    label: "Web Development",
    accent: "var(--web)",
    blurb:
      "Full-stack builds and content platforms made to be maintained — landing pages, news portals and learning systems that stay fast and legible.",
    keywords: ["TypeScript", "Vue", "Python", "WordPress", "Moodle LMS"],
  },
  {
    key: "data",
    index: "02",
    label: "Data Visualization",
    accent: "var(--data)",
    blurb:
      "A data-science grounding applied to decisions: measuring what a campaign or product actually did, then designing the chart that proves it.",
    keywords: ["Python", "Data Viz", "Analytics", "SQL", "Reporting"],
  },
  {
    key: "video",
    index: "03",
    label: "Motion & Video",
    accent: "var(--video)",
    blurb:
      "Code-driven, algorithmic motion and narrative editing — event films, brand assets and social cuts graded for impact.",
    keywords: ["Premiere Pro", "After Effects", "Motion Design", "Color Grading"],
  },
] as const;

export const metrics = [
  { value: "20", suffix: "%", label: "Lift in digital performance and web quality delivered" },
  { value: "10", suffix: "+", label: "Brand, marketing and campaign design projects" },
  { value: "4", suffix: "Y", label: "Years across development, design and media teams" },
];

export const valueProps = [
  {
    index: "I",
    title: "Engineering that holds",
    body: "Typed, documented front-to-back builds — so the site you launch is still easy to extend a year later.",
  },
  {
    index: "II",
    title: "Motion with intent",
    body: "Animation treated as a formula, not decoration: every transition earns attention and guides the eye.",
  },
  {
    index: "III",
    title: "Decisions from data",
    body: "A social-science and data background means campaigns get measured, not guessed — then improved.",
  },
];

export const credibility = [
  "Awardee — Bank Indonesia Scholarship",
  "Most Active Member — GenBI UINSA",
  "Aspire Institute — Organizational Leadership",
  "Student Outbound Mobility — Besmart Surabaya",
];

export const ethos = [
  "I sit at the intersection of full-stack development and motion design, building reliable digital systems and sharpening them with precise, code-driven animation. It lets me carry a project from technical architecture all the way to how it feels to use.",
  "A data science grounding keeps me honest. I approach engineering and interface design through an analytical lens, so every line of code and every motion curve is purposeful, efficient, and solving a real problem rather than performing one.",
];

export const techMatrix = [
  { group: "Development", items: ["Full-Stack Development", "Vue.js", "WordPress", "Moodle LMS"] },
  { group: "Data", items: ["Python", "Data Visualization", "Analytics", "Reporting"] },
  {
    group: "Motion & Film",
    items: ["Adobe Premiere Pro", "After Effects", "Motion Design", "Color Grading"],
  },
  {
    group: "Design",
    items: ["Brand Identity", "Social Media Design", "Graphic Design", "Videography"],
  },
];

export const languages = [
  { name: "Bahasa Indonesia", level: "Native" },
  { name: "English", level: "Professional working" },
  { name: "日本語 / Japanese", level: "Elementary" },
];

export const chronology = [
  {
    year: "2025 — Now",
    role: "Video Editor & Graphic Designer",
    org: "Worthydays",
    impact:
      "Delivered 10+ branding and marketing design projects, plus edits crafted to hold attention and carry the brand's identity.",
  },
  {
    year: "2025 — 2026",
    role: "Video Editor",
    org: "YPS Nailus Sa'adah",
    impact:
      "Turned raw footage into event, promotional and educational films — color grading, sound, motion graphics and visual effects.",
  },
  {
    year: "2024 — 2025",
    role: "Social Media Graphic Designer",
    org: "Kelana Jiwa . Co",
    impact: "Instagram content aligned to brand strategy, lifting audience interaction by 10%.",
  },
  {
    year: "2023 — 2024",
    role: "Creative Specialist & Podcaster",
    org: "GenBI UINSA",
    impact:
      "Ran LinkedIn, Instagram, TikTok and YouTube for the Bank Indonesia scholarship community — 20% performance gain, named Most Active Member.",
  },
  {
    year: "2022 — 2024",
    role: "WordPress Developer & Senior Graphic Designer",
    org: "UKM Pengembangan Intelektual UINSA",
    impact:
      "Built landing pages and news sites and led the visual identity, raising site quality and information delivery by 20%.",
  },
  {
    year: "2024",
    role: "Donor Relations Officer",
    org: "Yayasan Dana Sosial Al Falah",
    impact:
      "Managed donation records and archives while supporting campaigns as designer, videographer and editor.",
  },
  {
    year: "2021 — 2022",
    role: "Graphic Web Designer & Developer",
    org: "PUSTIPD, UIN Sunan Ampel Surabaya",
    impact:
      "Developed and maintained the campus Moodle learning platform for a university-scale student audience.",
  },
];

export const education = [
  {
    year: "2021 — 2026",
    role: "S.Sos, Social Sciences",
    org: "UIN Sunan Ampel Surabaya",
  },
  {
    year: "2023 — 2024",
    role: "Organizational Leadership",
    org: "Aspire Institute",
  },
];

export const webProjects = [
  {
    no: "001",
    name: "IMM UINSA Website",
    category: "Organization Portal",
    stack: "WordPress · CSS Editing · Photo & Structure",
    year: "2023",
    description:
      "Helped edit the CSS styling, uploaded member photos and updated the organizational structure for the IMM UINSA campus chapter.",
    demo: "https://linktr.ee/mahfuzharsya",
    github: null as string | null,
  },
  {
    no: "002",
    name: "UKPI News & Landing Pages",
    category: "Content Platform",
    stack: "WordPress · Elementor · Custom Theming · SEO",
    year: "2024",
    description:
      "Built and maintained the UKPI UINSA Surabaya website using WordPress with Elementor — articles, announcements and organizational content.",
    demo: "https://linktr.ee/mahfuzharsya",
    github: null as string | null,
  },
  {
    no: "003",
    name: "SAILS — Campus Moodle LMS",
    category: "Learning Platform",
    stack: "Moodle · PHP · UI/UX Configuration",
    year: "2022",
    description:
      "Developed and maintained the official UIN Sunan Ampel Surabaya e-learning platform (SAILS) built on Moodle for university-wide use.",
    demo: "https://linktr.ee/mahfuzharsya",
    github: null as string | null,
  },
];

export const studies = [
  {
    no: "001",
    title: "Social Media Performance Lift",
    objective:
      "Track engagement across LinkedIn, Instagram, TikTok and YouTube to steer content strategy for GenBI.",
    metric: "+20% performance · +10% interaction",
    stack: "Analytics · Data Visualization · Content Strategy",
    series: [
      { x: "W1", a: 42, b: 40 },
      { x: "W2", a: 48, b: 42 },
      { x: "W3", a: 55, b: 44 },
      { x: "W4", a: 61, b: 46 },
      { x: "W5", a: 72, b: 48 },
      { x: "W6", a: 84, b: 50 },
    ],
  },
  {
    no: "002",
    title: "Web Quality & Information Delivery",
    objective:
      "Measure the quality of information delivered through organisational web channels after redevelopment.",
    metric: "+20% site value & delivery quality",
    stack: "Python · Data Visualization · Reporting",
    series: [
      { x: "Q1", a: 30, b: 29 },
      { x: "Q2", a: 46, b: 38 },
      { x: "Q3", a: 58, b: 44 },
      { x: "Q4", a: 71, b: 52 },
      { x: "Q5", a: 78, b: 58 },
      { x: "Q6", a: 88, b: 64 },
    ],
  },
];

export const reels = [
  {
    no: "001",
    title: "Event Coverage / YPS Nailus Sa'adah",
    role: "Video Editor & Colorist",
    duration: "02:14",
    credits: ["Edit Mahfuzh Arsya", "Color Mahfuzh Arsya", "Prod. YPS Nailus Sa'adah"],
    src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
  },
  {
    no: "002",
    title: "Brand Assets / Worthydays",
    role: "Editor & Motion Designer",
    duration: "01:48",
    credits: ["Edit Mahfuzh Arsya", "Motion Mahfuzh Arsya", "Prod. Worthydays"],
    src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
  },
];
