/**
 * Project inventory; image guidance lives in docs/project-collection.md.
 * New case studies: append an object to `projects` and add its WebP preview.
 */

export type Metric = { label: string; value: string };

export type Project = {
  title: string;
  industry: string;
  url?: string;
  screenshot: string;
  description: string;
  challenge?: string;
  solution?: string;
  impact?: string;
  metrics: Metric[];
  tags: string[];
  featured?: boolean;
};

export const site = {
  name: "Usman Farooqi",
  firstName: "Usman",
  role: "Web Development Lead & Project Manager",
  location: "Lahore, Pakistan",
  email: "usmanfar2002@gmail.com",
  linkedin: "https://www.linkedin.com/in/usman-farooqi-172b14248/",
  portrait: "/hero-mascot.png",
  headline: "Hi, I'm Usman",
  bio: "A web development lead & project manager passionate about crafting bold, memorable websites",
  about: [
    "I am a Web Development Lead and Project Manager based in Lahore, Pakistan. Over the past several years, I have worked with businesses across healthcare, travel, tourism, car rental, recruitment, and local service companies.",
    "My work covers website planning, WordPress development, hosting and domain management, business email configuration, migrations, project coordination, and ongoing maintenance. More recently I have been using AI-powered tools and modern vibe-coding workflows to ship business websites and landing pages fast — without losing focus on UX and business goals.",
  ],
};

export const navLinks = [
  { href: "#about", label: "About" },
  { href: "#clients", label: "Customers" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
] as const;

export const stats = [
  { value: "20+", label: "WordPress sites" },
  { value: "10+", label: "AI-built sites" },
  { value: "15+", label: "Sites delivered" },
  { value: "3+", label: "Years experience" },
  { value: "5+", label: "Industries served" },
  { value: "Intl", label: "Clients worldwide" },
] as const;

export const industries = [
  { name: "Healthcare & MedTech", mark: "H" },
  { name: "Travel & Hospitality", mark: "T" },
  { name: "Car Rental Systems", mark: "C" },
  { name: "Automotive Marketplaces", mark: "A" },
  { name: "Digital Agencies", mark: "D" },
  { name: "Professional Services", mark: "P" },
] as const;

export const services = [
  {
    index: "01",
    title: "Business Websites",
    body: "Corporate portals with responsive design, speed optimization, and SEO foundations built for real operators.",
  },
  {
    index: "02",
    title: "Landing Pages",
    body: "Conversion-focused pages that load fast, capture leads, and are ready for iteration and A/B testing.",
  },
  {
    index: "03",
    title: "WordPress Development",
    body: "Elementor Pro, WooCommerce, plugin management, and custom blocks for sites that stay easy to run.",
  },
  {
    index: "04",
    title: "Website Management",
    body: "cPanel, domains, DNS, business email, migrations, launches, and the unglamorous work that keeps a site alive.",
  },
  {
    index: "05",
    title: "AI-Powered Builds",
    body: "Google AI Studio, Antigravity, Hostinger Horizons, and vibe-coding workflows to ship production sites faster.",
  },
  {
    index: "06",
    title: "Project Coordination",
    body: "Client communication, team coordination, planning, and delivery from first brief to successful handoff.",
  },
  {
    index: "07",
    title: "Custom-Coded Websites",
    body: "Bespoke websites built around your business, with tailored interfaces, responsive layouts, and the functionality your project needs.",
  },
  {
    index: "08",
    title: "Chatbots & Conversational AI",
    body: "Custom chatbots that answer common questions, guide visitors, and capture enquiries — integrated into your website for a more helpful customer experience.",
  },
] as const;

export const experience = [
  {
    period: "2024 – Present",
    company: "Arrowhead Digital Marketing",
    role: "Web Development Lead & Project Manager",
    points: [
      "Leading client communication and project execution.",
      "Building and maintaining WordPress websites.",
      "Coordinating software development initiatives.",
      "Managing hosting, domains, and website infrastructure.",
      "Leading the YalaRide portal development project.",
    ],
  },
  {
    period: "2023 – 2024",
    company: "Go-Jetter Travel & Tours",
    role: "WordPress Developer & Project Coordinator",
    points: [
      "Coordinated mobile app development projects.",
      "Managed hosting and deployment processes.",
      "Improved user experience and website structure.",
    ],
  },
  {
    period: "2024 – 2025",
    company: "Atlanta Car Rental LLC",
    role: "Sales Team Leader & Website Development",
    points: [
      "Improved booking conversion processes.",
      "Coordinated digital growth initiatives.",
      "Led remote sales teams.",
    ],
  },
  {
    period: "2024",
    company: "Priceless Car Rental USA",
    role: "Virtual Marketing Assistant",
    points: [
      "Website management and competitive analysis.",
      "Marketplace research and keyword tracking.",
      "Booking visibility improvements.",
    ],
  },
] as const;

export const projects: Project[] = [
  { title: "Grow Dental Supply", industry: "Dental Supplies / E-Commerce", url: "https://growdentalsupply.com/", screenshot: "/screenshots/grow-dental.png", description: "A dental supply storefront bringing instruments, clinical materials and specialist collections together in one clear shopping experience.", metrics: [], tags: ["E-Commerce", "Healthcare", "Web Development"] },
  { title: "Al-Awan Furniture", industry: "Furniture / Interiors", url: "https://al-awanfurniture.com/", screenshot: "/screenshots/al-awan.png", description: "A visual showcase for custom furniture in the UAE, connecting bespoke interiors, service collections and customer enquiries.", metrics: [], tags: ["Custom Furniture", "Service Website", "Web Development"] },
  { title: "Dubai TV Repair", industry: "Home Services / Electronics", url: "https://dubaitvrepair.com/", screenshot: "/screenshots/dubai-tv.png", description: "A service website helping customers explore television repairs and request doorstep support across Dubai, Sharjah and Ajman.", metrics: [], tags: ["Local Services", "Lead Generation", "Web Development"] },
  {
    title: "Arrowhead DigiTech",
    industry: "Digital Marketing Agency",
    url: "https://arrowheaddigitech.com",
    screenshot: "/screenshots/arrowhead.png",
    description:
      "A comprehensive digital agency website built with a focus on high-converting service landing pages and seamless appointment scheduling workflows.",
    challenge:
      "The digital growth agency required a high-converting web platform to establish authority and capture inbound leads.",
    solution:
      "Managed Next.js platform design and development, overseeing full project delivery.",
    impact:
      "Increased inbound lead conversion rates from 1.2% to 4.8% and established a premium visual system.",
    metrics: [
      { label: "Conversion rate", value: "4.8x" },
      { label: "Inbound leads", value: "+220%" },
    ],
    tags: ["Web Development Lead", "Digital Services"],
    featured: true,
  },
  {
    title: "Novamed Aesthetics",
    industry: "Healthcare & Aesthetics",
    url: "https://www.novamedaesthetics.com.au/",
    screenshot: "/screenshots/novamed-aesthetics.png",
    description:
      "A custom Next.js website built for an aesthetics clinic, tailored to a premium patient experience.",
    metrics: [],
    tags: ["Next.js", "Healthcare", "Aesthetics"],
    featured: true,
  },
  {
    title: "America Needs Nurses",
    industry: "Healthcare Recruitment",
    url: "https://americaneedsnurses.com",
    screenshot: "/screenshots/america-nurses.png",
    description:
      "Healthcare platform connecting nursing professionals with medical facilities, with secure application forms and an accessible UI.",
    challenge:
      "Fragmented applicant tracking and manual placements delayed nurse staffing while organic traffic lagged in a competitive sector.",
    solution:
      "Directed custom recruitment portal development, structured automatic ATS syncs, and coordinated the local SEO roadmap.",
    impact:
      "Accelerated placement velocity by 30% and increased organic search lead impressions by 250% within 6 months.",
    metrics: [
      { label: "Lead growth", value: "+250%" },
      { label: "Placement velocity", value: "−30%" },
    ],
    tags: ["Project Management", "WordPress", "Healthcare"],
    featured: true,
  },
  {
    title: "Atlanta Car Rental",
    industry: "Car Rental Systems",
    url: "https://atlantacar.ae",
    screenshot: "/screenshots/atlanta-car.png",
    description:
      "A robust automotive rental portal with real-time fleet management, booking engines, and secure payment processing.",
    challenge:
      "A crowded regional travel market demanded a high-end booking platform with a lower lead cost than aggregate sites.",
    solution:
      "Managed website operations, improved booking conversion processes, and coordinated digital growth initiatives.",
    impact: "Boosted direct bookings by 180% and reduced lead acquisition cost by 45%.",
    metrics: [
      { label: "Direct bookings", value: "+180%" },
      { label: "CPA reduction", value: "−45%" },
    ],
    tags: ["Website Development", "Car Rental"],
    featured: true,
  },
  {
    title: "YalaRide",
    industry: "Transportation & Rideshare",
    url: "https://yalaride.com",
    screenshot: "/screenshots/yalaride.png",
    description:
      "I managed the overall project, conducted the initial research, and led the software team to build this ridesharing platform from the ground up.",
    challenge:
      "Scaling demand across regional hubs created a massive onboarding bottleneck for driver credentials.",
    solution: "Led the YalaRide portal development project, overseeing web platform delivery.",
    impact: "Helped secure 10,000+ driver sign-ups and cut screening onboarding time in half.",
    metrics: [
      { label: "Driver sign-ups", value: "10K+" },
      { label: "Onboarding time", value: "−50%" },
    ],
    tags: ["Project Management", "Car Rental"],
    featured: true,
  },
  {
    title: "Tight and Tone Wellness Center",
    industry: "Healthcare & Wellness",
    url: "https://tightandtonewellnesscenter.com",
    screenshot: "/screenshots/tight-and-tone.png",
    description:
      "A wellness and healthcare center website with service browsing, booking features, and a tranquil design aesthetic.",
    metrics: [],
    tags: ["Healthcare", "Wellness"],
    featured: true,
  },
  {
    title: "Priceless GA & Priceless Car Rental USA",
    industry: "Car Rental Systems",
    url: "https://pricelessga.com",
    screenshot: "/screenshots/priceless.png",
    description:
      "A large-scale car rental franchise website with reservation logic, location finders, and dynamic pricing.",
    challenge:
      "Needed comprehensive website management and competitive analysis to improve marketplace visibility.",
    solution:
      "Executed marketplace research, competitive analysis, and ongoing website management.",
    impact: "Improved booking visibility and streamlined digital operations.",
    metrics: [
      { label: "Visibility", value: "Improved" },
      { label: "Operations", value: "Streamlined" },
    ],
    tags: ["Website Management", "Car Rental"],
  },
  {
    title: "Go-Jetter Travel & Tours",
    industry: "Travel & Tourism",
    url: "https://go-jetter.com",
    screenshot: "/screenshots/go-jetter.png",
    description:
      "Travel agency website with dynamic itinerary displays, custom booking inquiries, and high-performance visual storytelling.",
    challenge:
      "Complex custom tour bookings required extensive manual sales support, limiting booking volume.",
    solution:
      "Developed and maintained travel websites, coordinating mobile app integrations and managing hosting.",
    impact: "Improved user experience and structured the website for scalable booking operations.",
    metrics: [
      { label: "User experience", value: "Improved" },
      { label: "Hosting", value: "Managed" },
    ],
    tags: ["WordPress Developer", "Travel & Tourism"],
  },
  {
    title: "Halal Musafir",
    industry: "Travel & Tourism",
    url: "https://halalmusafir.com",
    screenshot: "/screenshots/halal-musafir.png",
    description:
      "A specialized travel portal for halal-friendly tours, with tailored itineraries, accommodation booking, and cultural guidance.",
    metrics: [],
    tags: ["Travel & Tourism", "Halal Travel"],
  },
  {
    title: "Georgia Needs Nurses",
    industry: "Healthcare Recruitment",
    url: "https://georgianeedsnurses.com",
    screenshot: "/screenshots/georgia-nurses.png",
    description:
      "A localized recruitment platform for healthcare professionals in Georgia, matching nurses with medical facilities.",
    challenge:
      "Needed a regional variant of the main recruitment platform to target the Georgian market specifically.",
    solution: "Deployed a customized regional platform with localized SEO and synchronized job feeds.",
    impact: "Established a dedicated regional presence and increased localized application rates.",
    metrics: [
      { label: "Local reach", value: "Expanded" },
      { label: "Applications", value: "Increased" },
    ],
    tags: ["Web Development", "Localization", "Healthcare"],
  },
  {
    title: "Ihawa Travel",
    industry: "Travel & Tourism",
    screenshot: "/screenshots/ihawa.png",
    description: "Custom travel booking hub and structured content portal.",
    challenge:
      "Capturing search market share for custom global travel destinations without high ad spending.",
    solution:
      "Managed structured content hub development, mapped search keywords, and optimized booking engine flows.",
    impact:
      "Attained top 3 rankings for 40+ high-intent search queries, bringing in consistent monthly bookings organically.",
    metrics: [
      { label: "Search ranking", value: "Top 3" },
      { label: "Organic bookings", value: "+140%" },
    ],
    tags: ["SEO Strategy", "Travel & Tourism"],
  },
  {
    title: "Rizitech LLC",
    industry: "Tech / IT Services",
    url: "https://rizitech.com",
    screenshot: "/screenshots/rizitech.png",
    description:
      "A sleek IT services portal showcasing technical expertise, scalable solutions, and client support modules.",
    metrics: [],
    tags: ["Tech/IT Services", "Web Development"],
  },
  {
    title: "Qari Mobiles",
    industry: "E-Commerce / Mobile Services",
    screenshot: "/screenshots/qari-mobiles.png",
    description: "Mobile sales and services landing platform preview.",
    metrics: [],
    tags: ["E-Commerce", "Landing Page"],
  },
];

export const mosaicProjects = projects.filter((project) => project.featured);

export const mosaicLayouts = [
  "md:col-span-2 md:row-span-2 min-h-[220px] md:min-h-[420px]",
  "min-h-[180px] md:min-h-[200px]",
  "min-h-[180px] md:min-h-[200px]",
  "md:col-span-2 min-h-[180px] md:min-h-[200px]",
  "min-h-[180px] md:min-h-[200px]",
  "min-h-[180px] md:min-h-[200px]",
] as const;
