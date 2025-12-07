import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const designs = [
  {
    title: "GoDiligent Dashboard",
    slug: "godiligent-dashboard",
    description: "AI-driven fintech platform interface design focusing on data visualization and user workflow optimization for compliance teams.",
    category: "WEB_APP" as const,
    coverImage: "/designs/diligent/01.jpg",
    images: [
      "/designs/diligent/01.jpg",
      "/designs/diligent/02.png",
      "/designs/diligent/03.png",
      "/designs/diligent/04.png",
      "/designs/diligent/05.png"
    ],
    tags: ["UI/UX", "Dashboard", "Fintech", "Data Viz"],
    tools: ["Figma", "React", "TypeScript"],
    published: true,
    featured: true,
  },
  {
    title: "Mark Haykalah",
    slug: "mark-haykalah",
    description: "A digital transformation platform built for factories and industrial zones in Saudi Arabia",
    category: "WEB_DESIGN" as const,
    coverImage: "/designs/mark/01.png",
    images: [
      "/designs/mark/01.png",
      "/designs/mark/02.png",
      "/designs/mark/03.png"
    ],
    tags: ["UI/UX", "Landing Page", "SaaS"],
    tools: ["Figma", "Next.js"],
    projectUrl: "https://mark.haykalah.com/",
    published: true,
    featured: true,
  },
  {
    title: "Ready for Business",
    slug: "ready-for-business",
    description: "Comprehensive design system with reusable components, design tokens, and documentation for scalable product development.",
    category: "WEB_DESIGN" as const,
    coverImage: "/designs/readyforbiz/01.jpg",
    images: [
      "/designs/readyforbiz/01.jpg",
      "/designs/readyforbiz/02.jpg",
      "/designs/readyforbiz/03.jpg"
    ],
    tags: ["UI/UX", "Email Template", "SaaS"],
    tools: ["Figma"],
    projectUrl: "https://readyfor.biz/",
    published: true,
    featured: false,
  },
  {
    title: "Brandcode",
    slug: "brandcode",
    description: "A high-converting landing page design with clear value proposition, social proof, and optimized conversion funnel.",
    category: "WEB_DESIGN" as const,
    coverImage: "/designs/brandcode/01.png",
    images: [
      "/designs/brandcode/01.png",
      "/designs/brandcode/02.png",
      "/designs/brandcode/03.png",
      "/designs/brandcode/04.png"
    ],
    tags: ["UI/UX", "Landing Page", "Conversion"],
    tools: ["Figma", "Webflow"],
    projectUrl: "https://brandcode-d56322.webflow.io/",
    published: true,
    featured: false,
  },
  {
    title: "Interactive Map",
    slug: "interactive-map",
    description: "Interactive map design for Saudi Arabia with detailed project information and navigation features.",
    category: "WEB_DESIGN" as const,
    coverImage: "/designs/interactive-map/01.png",
    images: [
      "/designs/interactive-map/01.png",
      "/designs/interactive-map/02.png",
      "/designs/interactive-map/03.png"
    ],
    tags: ["Interactive Map", "Saudi Arabia", "Responsive", "Animation"],
    tools: ["Figma", "React", "Mapbox"],
    projectUrl: "https://dp-interactive-map-ora.vercel.app/",
    published: true,
    featured: true,
  },
  {
    title: "Spark",
    slug: "spark-property-investment",
    description: "A modern Property investment platform design with intuitive navigation and secure authentication features.",
    category: "WEB_DESIGN" as const,
    coverImage: "/designs/spark/01.png",
    images: [
      "/designs/spark/01.png",
      "/designs/spark/02.png",
      "/designs/spark/03.png"
    ],
    tags: ["Property Investment", "Saudi Arabia", "Responsive", "Authentication"],
    tools: ["Figma"],
    published: true,
    featured: false,
  },
  {
    title: "RedZone Dashboard",
    slug: "redzone-dashboard",
    description: "Complete dashboard design for portfolio platform.",
    category: "WEB_APP" as const,
    coverImage: "/designs/redzone-dashboard/01.png",
    images: [
      "/designs/redzone-dashboard/01.png",
      "/designs/redzone-dashboard/02.png",
      "/designs/redzone-dashboard/03.png"
    ],
    tags: ["Portfolio", "Dashboard", "Management", "Security", "Responsive"],
    tools: ["Figma"],
    published: true,
    featured: false,
  }
]

async function seedDesigns() {
  console.log('Clearing existing designs...')
  await prisma.design.deleteMany()
  console.log('Existing designs cleared.')

  console.log('\nSeeding new designs...')
  for (const design of designs) {
    const created = await prisma.design.create({
      data: design
    })
    console.log(`  ✓ Created: ${created.title}`)
  }

  console.log(`\n✅ Successfully seeded ${designs.length} designs!`)
  await prisma.$disconnect()
}

seedDesigns().catch(console.error)
