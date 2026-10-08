/** Accurate project inventory shared by collections and detail views. */
export type ProjectCategory = 'vibe' | 'wordpress' | 'shopify' | 'managed' | 'motion';
export type Project = {
 id: string; category: ProjectCategory; title: string; industry: string; url?: string;
 screenshot?: string; previewLabel?: string; description: string; platform: string;
 role: string; responsibilities: string[]; tags: string[];
};
export const site = {
 name: "Usman Farooqi", firstName: "Usman",
 role: "Web Developer · Vibe Coding Creator · Project Manager",
 location: "Lahore, Pakistan", email: "usmanfar2002@gmail.com",
 linkedin: "https://www.linkedin.com/in/usman-farooqi-172b14248/",
 portrait: "/hero-mascot.png", headline: "Hi, I'm Usman",
 bio: "I turn ideas into digital experiences — from WordPress and Shopify websites to vibe-coded applications, creative visuals, and thoughtfully managed digital products.",
 about: [
  "I'm Usman, a web developer and project manager who enjoys bringing ideas to life.",
  "I build WordPress websites, Shopify stores, and custom digital experiences through vibe coding and AI-assisted development. My work also includes interactive portfolios, graphic design, UGC creatives, and AI-generated videos.",
  "For larger software products, I take care of planning, architecture coordination, development teams, and delivery.",
  "I'm also exploring how AI automations can help businesses simplify everyday processes."
 ]
};
export const collections = [
 {id:'vibe', title:'Crafted with Vibe Coding', accent:'Custom experiences.', description:'Personally created through AI-assisted development, from business websites to custom dashboards.'},
 {id:'wordpress', title:'Built with WordPress', accent:'Made for everyday use.', description:'Business websites, travel experiences and stores built to be easy to manage.'},
 {id:'shopify', title:'Commerce, Reimagined', accent:'Stores with purpose.', description:'Shopify storefronts that bring products, browsing and shopping together.'},
 {id:'managed', title:"Projects I've Led", accent:'People. Plans. Delivery.', description:'Applications delivered with development teams. My contribution: technical project management.'},
 {id:'motion', title:'Portfolios in Motion', accent:'Stories you can explore.', description:'Interactive portfolios with cinematic scrolling, 2D/3D visuals and responsive motion.'}
] as const;
export const services = [
  {
    "index": "01",
    "title": "WordPress Development",
    "body": "Professional business websites, landing pages, WooCommerce stores, redesigns, and ongoing website management."
  },
  {
    "index": "02",
    "title": "Shopify Development",
    "body": "Customized online storefronts, organized product experiences, responsive eCommerce layouts, and store management."
  },
  {
    "index": "03",
    "title": "Vibe Coding & Custom Websites",
    "body": "Modern Next.js and React websites, interactive interfaces, dashboards, and web applications built through AI-assisted coding."
  },
  {
    "index": "04",
    "title": "Creative Portfolios & Motion Websites",
    "body": "Personal portfolios and immersive digital experiences featuring 2D/3D visuals, interactive elements, and cinematic scroll animations."
  },
  {
    "index": "05",
    "title": "Project Management",
    "body": "Turning client requirements into structured development plans, coordinating developers, reviewing functionality, and guiding products from concept to delivery."
  },
  {
    "index": "06",
    "title": "Graphic Design & UGC Content",
    "body": "Creative designs, advertising visuals, promotional content, UGC-style ads, and engaging marketing assets."
  },
  {
    "index": "07",
    "title": "AI Video Generation",
    "body": "Creative AI-generated videos, animated storytelling, promotional scenes, and marketing-focused visual content."
  },
  {
    "index": "08",
    "title": "AI Automations & Chatbots",
    "body": "Exploring practical business automations, lead-handling workflows, chatbots, and voice-enabled digital experiences based on individual business requirements."
  }
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
  {
    "id": "grow-dental",
    "category": "vibe",
    "title": "Grow Dental Supply",
    "industry": "Dental supplies / eCommerce",
    "platform": "Next.js + Supabase",
    "role": "Vibe Coding Creator",
    "description": "A dental eCommerce storefront with a custom dashboard for products and orders.",
    "responsibilities": [
      "Personally created the storefront through Vibe Coding.",
      "Built a custom admin dashboard for product and order management."
    ],
    "tags": [
      "Next.js",
      "Supabase",
      "Vibe Coding"
    ],
    "url": "https://growdentalsupply.com/",
    "screenshot": "/assets/grow-dental.webp"
  },
  {
    "id": "al-awan",
    "category": "vibe",
    "title": "Al-Awan Furniture",
    "industry": "Furniture / interiors",
    "platform": "Next.js",
    "role": "Vibe Coding Creator",
    "description": "A furniture business website designed for enquiries and Google Ads lead generation.",
    "responsibilities": [
      "Personally built the website through Vibe Coding.",
      "Created a conversion-focused layout for furniture enquiries."
    ],
    "tags": [
      "Next.js",
      "Vibe Coding",
      "Lead generation"
    ],
    "url": "https://al-awanfurniture.com/",
    "screenshot": "/assets/al-awan.webp"
  },
  {
    "id": "dubai-tv",
    "category": "vibe",
    "title": "Dubai TV Repair",
    "industry": "Local repair services",
    "platform": "Next.js",
    "role": "Vibe Coding Creator",
    "description": "A service website connecting Google Ads visitors with calls, WhatsApp and repair enquiries.",
    "responsibilities": [
      "Personally created the website through Vibe Coding.",
      "Integrated call, WhatsApp and enquiry paths."
    ],
    "tags": [
      "Next.js",
      "Vibe Coding",
      "Lead generation"
    ],
    "url": "https://dubaitvrepair.com/",
    "screenshot": "/assets/dubai-tv.webp"
  },
  {
    "id": "arrowhead",
    "category": "vibe",
    "title": "Arrowhead DigiTech",
    "industry": "Digital agency",
    "platform": "Next.js / React",
    "role": "Vibe Coding Creator",
    "description": "An agency website with content and lead management, plus a voice-enabled chatbot.",
    "responsibilities": [
      "Personally created the website through Vibe Coding.",
      "Built admin workflows for blogs, images and leads.",
      "Integrated a chatbot with voice interaction and lead capture.",
      "Set up email notifications for enquiries."
    ],
    "tags": [
      "Next.js / React",
      "Vibe Coding",
      "Admin dashboard"
    ],
    "url": "https://arrowheaddigitech.com",
    "screenshot": "/assets/arrowhead.webp"
  },
  {
    "id": "novamed",
    "category": "vibe",
    "title": "Novamed Aesthetics",
    "industry": "Australian aesthetics",
    "platform": "Next.js",
    "role": "Vibe Coding Creator",
    "description": "An Australian aesthetics website created through a custom workflow and deployed through a WordPress-based setup.",
    "responsibilities": [
      "Personally created the Next.js experience through Vibe Coding.",
      "Deployed through a WordPress-based setup."
    ],
    "tags": [
      "Next.js",
      "Vibe Coding",
      "Healthcare"
    ],
    "url": "https://www.novamedaesthetics.com.au/",
    "screenshot": "/assets/novamed-aesthetics.webp"
  },
  {
    "id": "georgia",
    "category": "vibe",
    "title": "Georgia Needs Nurses",
    "industry": "Healthcare recruitment",
    "platform": "Next.js",
    "role": "Vibe Coding Creator",
    "description": "A healthcare recruitment website with a clear regional focus.",
    "responsibilities": [
      "Personally created the recruitment-related website through Vibe Coding."
    ],
    "tags": [
      "Next.js",
      "Vibe Coding",
      "Recruitment"
    ],
    "url": "https://georgianeedsnurses.com",
    "screenshot": "/assets/georgia-nurses.webp"
  },
  {
    "id": "atlanta-car",
    "category": "wordpress",
    "title": "Atlanta Car Rental",
    "industry": "Car rental",
    "platform": "WordPress",
    "role": "WordPress Developer",
    "description": "A WordPress car rental website with clear fleet browsing and customer enquiry journeys.",
    "responsibilities": [
      "WordPress website development and management."
    ],
    "tags": [
      "WordPress",
      "Car rental"
    ],
    "url": "https://atlantacar.ae",
    "screenshot": "/assets/atlanta-car.webp"
  },
  {
    "id": "tight-tone",
    "category": "wordpress",
    "title": "Tight and Tone Wellness Center",
    "industry": "Healthcare / wellness",
    "platform": "WordPress",
    "role": "WordPress Developer",
    "description": "A wellness website presenting treatments, services and customer enquiries.",
    "responsibilities": [
      "WordPress website development and management."
    ],
    "tags": [
      "WordPress",
      "Healthcare / wellness"
    ],
    "url": "https://tightandtonewellnesscenter.com",
    "screenshot": "/assets/tight-and-tone.webp"
  },
  {
    "id": "priceless",
    "category": "wordpress",
    "title": "Priceless GA",
    "industry": "Car rental",
    "platform": "WordPress",
    "role": "WordPress Developer",
    "description": "A car rental website supported through WordPress development and ongoing website management.",
    "responsibilities": [
      "WordPress website development and management."
    ],
    "tags": [
      "WordPress",
      "Car rental"
    ],
    "url": "https://pricelessga.com",
    "screenshot": "/assets/priceless.webp"
  },
  {
    "id": "go-jetter",
    "category": "wordpress",
    "title": "Go-Jetter Travel & Tours",
    "industry": "Travel / tourism",
    "platform": "WordPress",
    "role": "WordPress Developer",
    "description": "A travel website bringing destinations, tour information and booking enquiries together.",
    "responsibilities": [
      "WordPress website development and management."
    ],
    "tags": [
      "WordPress",
      "Travel / tourism"
    ],
    "url": "https://go-jetter.com",
    "screenshot": "/assets/go-jetter.webp"
  },
  {
    "id": "halal-musafir",
    "category": "wordpress",
    "title": "Halal Musafir",
    "industry": "Travel / tourism",
    "platform": "WordPress",
    "role": "WordPress Developer",
    "description": "A WordPress travel experience for halal-friendly trips and tailored itineraries.",
    "responsibilities": [
      "WordPress website development and management."
    ],
    "tags": [
      "WordPress",
      "Travel / tourism"
    ],
    "url": "https://halalmusafir.com",
    "screenshot": "/assets/halal-musafir.webp"
  },
  {
    "id": "ihawa",
    "category": "wordpress",
    "title": "Ihawa Travel",
    "industry": "Travel / tourism",
    "platform": "WordPress",
    "role": "WordPress Developer",
    "description": "A travel booking hub and structured content portal built with WordPress.",
    "responsibilities": [
      "WordPress website development and management."
    ],
    "tags": [
      "WordPress",
      "Travel / tourism"
    ],
    "screenshot": "/assets/ihawa.webp"
  },
  {
    "id": "rizitech",
    "category": "wordpress",
    "title": "Rizitech LLC",
    "industry": "Technology / IT services",
    "platform": "WordPress",
    "role": "WordPress Developer",
    "description": "A WordPress business website presenting IT services and company expertise.",
    "responsibilities": [
      "WordPress website development and management."
    ],
    "tags": [
      "WordPress",
      "Technology / IT services"
    ],
    "url": "https://rizitech.com",
    "screenshot": "/assets/rizitech.webp"
  },
  {
    "id": "qari",
    "category": "shopify",
    "title": "Qari Mobiles",
    "industry": "eCommerce",
    "platform": "Shopify",
    "role": "Shopify Developer",
    "description": "A Shopify storefront with organized products and a responsive shopping experience.",
    "responsibilities": [
      "Shopify storefront development and store presentation."
    ],
    "tags": [
      "Shopify",
      "eCommerce"
    ],
    "screenshot": "/assets/qari-mobiles.webp"
  },
  {
    "id": "salaar",
    "category": "wordpress",
    "title": "Salaar Centre",
    "industry": "eCommerce",
    "platform": "WordPress / WooCommerce",
    "role": "WordPress Developer",
    "description": "A WooCommerce storefront for home appliances, with product browsing and customer enquiries.",
    "responsibilities": [
      "WordPress and WooCommerce storefront development and store presentation."
    ],
    "tags": [
      "WordPress",
      "WooCommerce",
      "eCommerce"
    ],
    "url": "https://salaarcentre.com",
    "screenshot": "/assets/salaar-centre.webp"
  },
  {
    "id": "lahore",
    "category": "shopify",
    "title": "Lahore Centre",
    "industry": "eCommerce",
    "platform": "Shopify",
    "role": "Shopify Developer",
    "description": "A Shopify storefront with organized products and a responsive shopping experience.",
    "responsibilities": [
      "Shopify storefront development and store presentation."
    ],
    "tags": [
      "Shopify",
      "eCommerce"
    ],
    "url": "https://lahorecentre.com",
    "screenshot": "/assets/lahore-centre.webp"
  },
  {
    "id": "america",
    "category": "managed",
    "title": "America Needs Nurses",
    "industry": "Healthcare recruitment",
    "platform": "MERN · VPS · Firebase / AWS",
    "role": "Technical Project Manager",
    "description": "A recruitment platform delivered with a development team; mobile application development is ongoing.",
    "responsibilities": [
      "Gathered requirements and coordinated architecture planning.",
      "Managed developers, reviews and delivery.",
      "Coordinated VPS deployment and Firebase / AWS services.",
      "Currently managing development of the mobile application.",
      "The MERN application was coded by the development team."
    ],
    "tags": [
      "MERN",
      "Technical PM",
      "Mobile application"
    ],
    "url": "https://americaneedsnurses.com",
    "screenshot": "/assets/america-nurses.webp"
  },
  {
    "id": "yalaride",
    "category": "managed",
    "title": "YalaRide",
    "industry": "Transportation / rideshare",
    "platform": "MERN · iOS / Android",
    "role": "Technical Project Manager",
    "description": "A web and mobile platform guided from product research through Version 1 delivery.",
    "responsibilities": [
      "Gathered requirements and researched the product.",
      "Planned and coordinated architecture with developers.",
      "Oversaw development feature by feature.",
      "Managed developer coordination and Version 1 delivery.",
      "The applications were coded by the development team."
    ],
    "tags": [
      "MERN",
      "iOS / Android",
      "Technical PM"
    ],
    "url": "https://yalaride.com",
    "screenshot": "/assets/yalaride.webp"
  },
  {
    "id": "go-jetter-app",
    "category": "managed",
    "title": "Go-Jetter Application",
    "industry": "Travel / mobile application",
    "url": "https://go-jetter.com",
    "screenshot": "/assets/go-jetter.webp",
    "previewLabel": "Go-Jetter website preview · application screenshots pending",
    "platform": "Flutter · Stripe",
    "role": "Technical Project Manager",
    "description": "A Flutter travel application delivered with developers, connecting Stripe payments with a dashboard for activities, tours and booking operations.",
    "responsibilities": [
      "Managed application development and coordinated delivery with the developers.",
      "Oversaw the dashboard for activity management, tours and booking workflows.",
      "Coordinated Stripe payment gateway integration."
    ],
    "tags": [
      "Flutter",
      "Stripe",
      "Project Management"
    ]
  },
  {
    "id": "usman-portfolio",
    "screenshot": "/assets/usman-portfolio.webp",
    "category": "motion",
    "title": "Usman Farooqi — Personal Portfolio",
    "industry": "Interactive portfolio",
    "platform": "Next.js · GSAP · Three.js",
    "role": "Vibe Coding Creator",
    "description": "A cinematic personal portfolio built through vibe coding, featuring interactive storytelling, refined motion, and immersive digital experiences.",
    "responsibilities": [
      "Personally created the portfolio through Vibe Coding.",
      "Developed cinematic scrolling, interactive sections and 2D/3D visuals.",
      "Adapted the experience for desktop, tablet and mobile."
    ],
    "tags": [
      "Vibe Coding",
      "2D / 3D",
      "Cinematic motion"
    ],
    "url": "https://usman-farooqi.vercel.app"
  },
  {
    "id": "sameer-majeed",
    "category": "motion",
    "title": "Sameer Majeed",
    "industry": "Finance / personal portfolio",
    "url": "https://sameer-majeed.vercel.app",
    "description": "A personal portfolio presenting financial expertise, professional credentials and a career journey through a cinematic door-opening introduction.",
    "platform": "Vibe Coding · AI-assisted development",
    "role": "Vibe Coding Creator",
    "responsibilities": [
      "Created the website through Vibe Coding.",
      "Presented the brand, services and work through a tailored website experience."
    ],
    "tags": [
      "Portfolio",
      "Vibe Coding",
      "Interactive design"
    ],
    "screenshot": "/assets/sameer-majeed.webp"
  },
  {
    "id": "waseeq-nauman",
    "category": "motion",
    "title": "Waseeq Nauman",
    "industry": "Leadership / personal portfolio",
    "url": "https://waseeq-nauman.vercel.app",
    "description": "A personal brand portfolio connecting growth strategy, leadership and selected work through interactive scene-based storytelling.",
    "platform": "Vibe Coding · AI-assisted development",
    "role": "Vibe Coding Creator",
    "responsibilities": [
      "Created the website through Vibe Coding.",
      "Presented the brand, services and work through a tailored website experience."
    ],
    "tags": [
      "Portfolio",
      "Vibe Coding",
      "Interactive design"
    ],
    "screenshot": "/assets/waseeq-nauman.webp"
  },
  {
    "id": "mohammed-rizwan",
    "category": "motion",
    "title": "Mohammed Rizwan",
    "industry": "Personal portfolio",
    "url": "https://mohammed-rizwan-portfolio.vercel.app/",
    "description": "A cinematic personal portfolio tracing Mohammed Rizwan’s life, business ventures and leadership through a chapter-based journey.",
    "platform": "Vibe Coding · AI-assisted development",
    "role": "Vibe Coding Creator",
    "responsibilities": [
      "Created the website through Vibe Coding.",
      "Presented the brand, services and work through a tailored website experience."
    ],
    "tags": [
      "Portfolio",
      "Vibe Coding",
      "Interactive design"
    ],
    "screenshot": "/assets/mohammed-rizwan.webp"
  },
  {
    "id": "mohammed-kashan",
    "category": "motion",
    "title": "Mohammed Kashan",
    "industry": "Creative / personal portfolio",
    "url": "https://mohammed-kashan.vercel.app",
    "description": "A bold creative portfolio showcasing graphic design, video editing and social media work across a horizontal brand collection.",
    "platform": "Vibe Coding · AI-assisted development",
    "role": "Vibe Coding Creator",
    "responsibilities": [
      "Created the website through Vibe Coding.",
      "Presented the brand, services and work through a tailored website experience."
    ],
    "tags": [
      "Portfolio",
      "Vibe Coding",
      "Interactive design"
    ],
    "screenshot": "/assets/mohammed-kashan.webp"
  },
  {
    "id": "arrowhead-portfolio",
    "category": "vibe",
    "title": "Arrowhead DigiTech — Portfolio",
    "industry": "Agency / digital portfolio",
    "url": "https://arrowheaddigitech-portfolio.com",
    "description": "An agency portfolio bringing digital products, technology services and selected collaborations together in an immersive branded experience.",
    "platform": "Vibe Coding · AI-assisted development",
    "role": "Vibe Coding Creator",
    "responsibilities": [
      "Created the website through Vibe Coding.",
      "Presented the brand, services and work through a tailored website experience."
    ],
    "tags": [
      "Vibe Coding",
      "Agency portfolio"
    ],
    "screenshot": "/assets/arrowhead-portfolio.webp"
  },
  {
    "id": "royal-tech-labs",
    "category": "vibe",
    "title": "RoyalTechLabs",
    "industry": "Electronics / repair services",
    "url": "https://royaltechlabs.com",
    "description": "A doorstep TV repair website with interactive fault diagnostics, service coverage and direct call, WhatsApp and callback journeys.",
    "platform": "Vibe Coding · AI-assisted development",
    "role": "Vibe Coding Creator",
    "responsibilities": [
      "Created the website through Vibe Coding.",
      "Presented the brand, services and work through a tailored website experience."
    ],
    "tags": [
      "Vibe Coding",
      "Service website"
    ],
    "screenshot": "/assets/royal-tech-labs.webp"
  },
  {
    "id": "oj-properties",
    "category": "vibe",
    "title": "OJ Properties & Developers",
    "industry": "Real estate / property services",
    "url": "https://oj-properties.com",
    "description": "A real estate website presenting Islamabad property services, investment advisory and a scroll-led property consultation journey.",
    "platform": "Vibe Coding · AI-assisted development",
    "role": "Vibe Coding Creator",
    "responsibilities": [
      "Created the website through Vibe Coding.",
      "Presented the brand, services and work through a tailored website experience."
    ],
    "tags": [
      "Vibe Coding",
      "Real estate"
    ],
    "screenshot": "/assets/oj-properties.webp"
  }
];

export const projectImage = (project: Project) => project.screenshot;
