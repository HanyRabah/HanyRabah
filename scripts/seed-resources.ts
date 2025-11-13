import { PrismaClient, ResourceType } from '@prisma/client';

const prisma = new PrismaClient();

const sampleResources = [
  // Reading List
  {
    title: "Designing Data-Intensive Applications",
    description: "The Big Ideas Behind Reliable, Scalable, and Maintainable Systems by Martin Kleppmann",
    type: ResourceType.READING_LIST,
    url: "https://www.amazon.com/Designing-Data-Intensive-Applications-Reliable-Maintainable/dp/1449373321",
    category: "Technical Books",
    image: "https://m.media-amazon.com/images/I/51ZSpMl1-2L._SY445_SX342_.jpg",
    isAffiliate: true,
    tags: ["System Design", "Databases", "Architecture"],
    published: true,
    displayOrder: 1,
  },
  {
    title: "Clean Code",
    description: "A Handbook of Agile Software Craftsmanship by Robert C. Martin",
    type: ResourceType.READING_LIST,
    url: "https://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350882",
    category: "Technical Books",
    image: "https://m.media-amazon.com/images/I/51E2055ZGUL._SY445_SX342_.jpg",
    isAffiliate: true,
    tags: ["Clean Code", "Best Practices", "Software Engineering"],
    published: true,
    displayOrder: 2,
  },
  
  // Tech Essentials
  {
    title: "Logitech MX Master 3S",
    description: "Premium wireless mouse with ultra-fast scrolling and ergonomic design",
    type: ResourceType.TECH_ESSENTIALS,
    url: "https://www.amazon.com/Logitech-MX-Master-3S-Graphite/dp/B09HM94VDS",
    category: "Peripherals",
    image: "https://m.media-amazon.com/images/I/61ni3t1ryQL._AC_SL1500_.jpg",
    isAffiliate: true,
    tags: ["Mouse", "Productivity", "Wireless"],
    published: true,
    displayOrder: 1,
  },
  {
    title: "VS Code",
    description: "Free, powerful code editor with excellent extensions and Git integration",
    type: ResourceType.TECH_ESSENTIALS,
    url: "https://code.visualstudio.com/",
    category: "Software",
    image: "https://code.visualstudio.com/assets/images/code-stable.png",
    isAffiliate: false,
    tags: ["IDE", "Code Editor", "Free"],
    published: true,
    displayOrder: 2,
  },
  
  // Wallpapers
  {
    title: "Gradient Sunset 4K",
    description: "Beautiful gradient wallpaper pack for desktop and mobile devices",
    type: ResourceType.WALLPAPERS,
    url: "https://example.com/downloads/gradient-sunset.zip",
    category: "Abstract",
    image: "https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=800",
    isAffiliate: false,
    tags: ["4K", "Gradient", "Desktop", "Mobile"],
    published: true,
    displayOrder: 1,
  },
  {
    title: "Minimal Dark Pack",
    description: "Premium collection of minimalist dark wallpapers",
    type: ResourceType.WALLPAPERS,
    url: "",
    gumroadUrl: "https://gumroad.com/l/minimal-dark-pack",
    price: "$5",
    category: "Minimal",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800",
    isAffiliate: false,
    tags: ["Minimal", "Dark", "Premium"],
    published: true,
    displayOrder: 2,
  },
  
  // Podcasts
  {
    title: "Syntax - Tasty Web Development Treats",
    description: "A weekly podcast about web development, hosted by Wes Bos and Scott Tolinski",
    type: ResourceType.PODCAST,
    url: "https://syntax.fm/",
    category: "Web Development",
    image: "https://syntax.fm/static/logo.png",
    isAffiliate: false,
    tags: ["JavaScript", "React", "Web Dev"],
    published: true,
    displayOrder: 1,
  },
  {
    title: "The Changelog",
    description: "Conversations with the hackers, leaders, and innovators of the software world",
    type: ResourceType.PODCAST,
    url: "https://changelog.com/podcast",
    category: "Technology",
    image: "https://cdn.changelog.com/images/podcasts/podcast-original.png",
    isAffiliate: false,
    tags: ["Open Source", "Technology", "Interviews"],
    published: true,
    displayOrder: 2,
  },
  
  // Newsletters
  {
    title: "JavaScript Weekly",
    description: "A free, once–weekly email roundup of JavaScript news and articles",
    type: ResourceType.NEWSLETTER,
    url: "https://javascriptweekly.com/",
    category: "JavaScript",
    image: "https://javascriptweekly.com/images/jsw.png",
    isAffiliate: false,
    tags: ["JavaScript", "Weekly", "Free"],
    published: true,
    displayOrder: 1,
  },
  {
    title: "React Status",
    description: "A weekly roundup of the latest React and React Native links and tutorials",
    type: ResourceType.NEWSLETTER,
    url: "https://react.statuscode.com/",
    category: "React",
    image: "https://react.statuscode.com/images/react.png",
    isAffiliate: false,
    tags: ["React", "Weekly", "Free"],
    published: true,
    displayOrder: 2,
  },
  
  // Talent
  {
    title: "Kent C. Dodds",
    description: "Full stack JavaScript expert, educator, and open source contributor",
    type: ResourceType.TALENT,
    url: "https://kentcdodds.com/",
    category: "Developer",
    image: "https://kentcdodds.com/images/kent-c-dodds.jpg",
    isAffiliate: false,
    tags: ["React", "Testing", "Education"],
    published: true,
    displayOrder: 1,
  },
  
  // Investments
  {
    title: "Stripe",
    description: "Payment infrastructure for the internet - powering millions of businesses",
    type: ResourceType.INVESTMENT,
    url: "https://stripe.com/",
    category: "Fintech",
    image: "https://images.ctfassets.net/fzn2n1nzq965/3AGidihOJl4nH9D1vDjM84/9540155d584be52fc54c443b6efa4ae6/homepage.png",
    isAffiliate: false,
    tags: ["Payments", "Fintech", "SaaS"],
    published: true,
    displayOrder: 1,
  },
];

async function main() {
  console.log('🌱 Starting to seed resources...');

  for (const resource of sampleResources) {
    try {
      await prisma.resource.create({
        data: resource,
      });
      console.log(`✓ Created ${resource.type}: ${resource.title}`);
    } catch (error) {
      console.error(`✗ Failed to create ${resource.title}:`, error);
    }
  }

  console.log('✅ Seeding completed!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
