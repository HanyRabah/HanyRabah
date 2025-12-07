import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed...')

  // Clear existing data
  await prisma.analytics.deleteMany()
  await prisma.contact.deleteMany()
  await prisma.post.deleteMany()
  await prisma.project.deleteMany()
  await prisma.design.deleteMany()
  await prisma.service.deleteMany()

  // Seed Services
  console.log('📦 Seeding services...')
  const services = await Promise.all([
    prisma.service.create({
      data: {
        title: 'Web Development',
        description: 'Full-stack web applications using modern technologies like React, Next.js, Node.js, and TypeScript.',
        icon: 'Code',
        features: [
          'Responsive Design',
          'Performance Optimization',
          'SEO Implementation',
          'API Integration'
        ],
        price: '2500'
      }
    }),
    prisma.service.create({
      data: {
        title: 'Mobile App Development',
        description: 'Native and cross-platform mobile applications for iOS and Android using React Native and Flutter.',
        icon: 'Smartphone',
        features: [
          'Cross-platform Development',
          'Native Performance',
          'App Store Deployment',
          'Push Notifications'
        ],
        price: '3500'
      }
    }),
    prisma.service.create({
      data: {
        title: 'UI/UX Design',
        description: 'User-centered design solutions that combine beautiful aesthetics with intuitive functionality.',
        icon: 'Palette',
        features: [
          'User Research',
          'Wireframing & Prototyping',
          'Design Systems',
          'Usability Testing'
        ],
        price: '1500'
      }
    }),
    prisma.service.create({
      data: {
        title: 'Consulting & Strategy',
        description: 'Technical consulting and digital strategy to help businesses make informed technology decisions.',
        icon: 'Users',
        features: [
          'Technology Assessment',
          'Architecture Planning',
          'Team Training',
          'Project Management'
        ],
        price: '150'
      }
    })
  ])

  // Seed Projects
  console.log('🚀 Seeding projects...')
  const projects = await Promise.all([
    prisma.project.create({
      data: {
        title: 'E-Commerce Platform',
        slug: 'ecommerce-platform',
        description: 'A modern e-commerce platform built with Next.js, featuring real-time inventory management, payment processing, and admin dashboard.',
        content: `<h2>Project Overview</h2><p>This comprehensive e-commerce platform was built to handle high-traffic retail operations with a focus on performance and user experience.</p><h3>Key Features</h3><ul><li>Real-time inventory management</li><li>Stripe payment integration</li><li>Admin dashboard with analytics</li><li>Mobile-responsive design</li><li>SEO optimization</li></ul><h3>Technical Challenges</h3><p>The main challenge was implementing real-time inventory updates across multiple concurrent users while maintaining data consistency.</p><h3>Results</h3><p>The platform successfully handles 10,000+ daily active users with 99.9% uptime and has processed over $2M in transactions.</p>`,
        technologies: ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL', 'Stripe', 'Tailwind CSS'],
        coverImage: '/images/projects/ecommerce-platform.jpg',
        liveUrl: 'https://ecommerce-demo.vercel.app',
        githubUrl: 'https://github.com/yourusername/ecommerce-platform',
        featured: true,
        status: 'COMPLETED'
      }
    }),
    prisma.project.create({
      data: {
        title: 'Task Management App',
        slug: 'task-management-app',
        description: 'A collaborative task management application with real-time updates, team collaboration features, and advanced project tracking.',
        content: `<h2>Project Overview</h2><p>A comprehensive task management solution designed for remote teams, featuring real-time collaboration and advanced project tracking capabilities.</p><h3>Key Features</h3><ul><li>Real-time collaboration</li><li>Kanban boards and Gantt charts</li><li>Team chat integration</li><li>Time tracking</li><li>Custom workflows</li></ul><h3>Technical Implementation</h3><p>Built with React and Node.js, utilizing WebSocket connections for real-time updates and MongoDB for flexible data storage.</p><h3>Impact</h3><p>Improved team productivity by 40% and reduced project delivery time by 25% for client organizations.</p>`,
        technologies: ['React', 'Node.js', 'Socket.io', 'MongoDB', 'Express', 'Material-UI'],
        coverImage: '/images/projects/task-management.jpg',
        liveUrl: 'https://taskmanager-demo.vercel.app',
        githubUrl: 'https://github.com/yourusername/task-management',
        featured: true,
        status: 'COMPLETED'
      }
    }),
    prisma.project.create({
      data: {
        title: 'AI-Powered Analytics Dashboard',
        slug: 'ai-analytics-dashboard',
        description: 'An intelligent analytics dashboard that uses machine learning to provide predictive insights and automated reporting.',
        content: `<h2>Project Overview</h2><p>An advanced analytics platform that combines traditional business intelligence with AI-powered predictive analytics.</p><h3>Key Features</h3><ul><li>Predictive analytics using ML models</li><li>Automated report generation</li><li>Interactive data visualizations</li><li>Real-time data processing</li><li>Custom dashboard builder</li></ul><h3>Technology Stack</h3><p>Leveraged Python for ML models, React for the frontend, and Apache Kafka for real-time data streaming.</p><h3>Results</h3><p>Reduced manual reporting time by 80% and improved forecast accuracy by 35% for business stakeholders.</p>`,
        technologies: ['React', 'Python', 'TensorFlow', 'Apache Kafka', 'PostgreSQL', 'D3.js'],
        coverImage: '/images/projects/ai-dashboard.jpg',
        liveUrl: 'https://ai-dashboard-demo.vercel.app',
        githubUrl: 'https://github.com/yourusername/ai-dashboard',
        featured: false,
        status: 'COMPLETED'
      }
    }),
    prisma.project.create({
      data: {
        title: 'Social Media Platform',
        slug: 'social-media-platform',
        description: 'A modern social media platform with real-time messaging, content sharing, and community features.',
        content: `<h2>Project Overview</h2><p>A full-featured social media platform designed for niche communities, emphasizing privacy and meaningful connections.</p><h3>Key Features</h3><ul><li>Real-time messaging and notifications</li><li>Content sharing with media support</li><li>Community groups and events</li><li>Privacy-focused design</li><li>Mobile-first approach</li></ul><h3>Architecture</h3><p>Built with a microservices architecture using Docker containers and deployed on AWS with auto-scaling capabilities.</p><h3>Scale</h3><p>Successfully supports 50,000+ active users with sub-second response times and 99.95% uptime.</p>`,
        technologies: ['Vue.js', 'Node.js', 'GraphQL', 'Redis', 'AWS', 'Docker'],
        coverImage: '/images/projects/social-platform.jpg',
        liveUrl: 'https://social-demo.vercel.app',
        githubUrl: 'https://github.com/yourusername/social-platform',
        featured: true,
        status: 'IN_PROGRESS'
      }
    })
  ])

  // Seed Blog Posts
  console.log('📝 Seeding blog posts...')
  const posts = await Promise.all([
    prisma.post.create({
      data: {
        title: 'Building Scalable Web Applications with Next.js 14',
        slug: 'building-scalable-web-applications-nextjs-14',
        excerpt: 'Learn how to leverage Next.js 14\'s new features to build performant, scalable web applications that can handle millions of users.',
        content: `<h2>Introduction</h2><p>Next.js 14 introduces several groundbreaking features that make building scalable web applications easier than ever. In this comprehensive guide, we'll explore the App Router, Server Components, and performance optimizations.</p><h3>Key Features of Next.js 14</h3><ul><li><strong>App Router:</strong> A new file-system based router built on React Server Components</li><li><strong>Server Components:</strong> Render components on the server for better performance</li><li><strong>Streaming:</strong> Stream UI from the server as it's rendered</li><li><strong>Turbopack:</strong> The new Rust-based bundler for faster development</li></ul><h3>Building for Scale</h3><p>When building applications that need to scale to millions of users, consider these architectural patterns:</p><h4>1. Server-Side Rendering (SSR)</h4><p>Use SSR for dynamic content that needs to be SEO-friendly and fast to load.</p><pre><code>export default async function Page({ params }) {
  const data = await fetchData(params.id)
  return &lt;div&gt;{data.title}&lt;/div&gt;
}</code></pre><h4>2. Static Site Generation (SSG)</h4><p>Pre-render pages at build time for maximum performance.</p><h4>3. Incremental Static Regeneration (ISR)</h4><p>Update static content without rebuilding the entire site.</p><h3>Performance Optimization Tips</h3><ol><li>Use the Image component for automatic optimization</li><li>Implement proper caching strategies</li><li>Optimize your bundle size with dynamic imports</li><li>Use React Suspense for better loading states</li></ol><h3>Conclusion</h3><p>Next.js 14 provides all the tools needed to build scalable, performant web applications. By leveraging Server Components, the App Router, and proper optimization techniques, you can create applications that perform well at any scale.</p>`,
        coverImage: '/images/blog/nextjs-14-guide.jpg',
        tags: ['Next.js', 'React', 'Web Development', 'Performance'],
        published: true,
        publishedAt: new Date('2024-01-15'),
      }
    }),
    prisma.post.create({
      data: {
        title: 'The Future of TypeScript: What\'s Coming in 2024',
        slug: 'future-of-typescript-2024',
        excerpt: 'Explore the upcoming TypeScript features and improvements that will shape the development landscape in 2024 and beyond.',
        content: `<h2>TypeScript's Evolution</h2><p>TypeScript continues to evolve rapidly, with exciting features planned for 2024 that will further improve developer experience and code safety.</p><h3>Upcoming Features</h3><h4>1. Improved Type Inference</h4><p>TypeScript 5.4 and beyond will feature enhanced type inference capabilities, making it easier to work with complex generic types.</p><h4>2. Better Error Messages</h4><p>The team is working on more intuitive error messages that help developers understand and fix type errors faster.</p><h4>3. Performance Improvements</h4><p>Significant performance optimizations are coming to the TypeScript compiler, reducing build times for large projects.</p><h3>New Language Features</h3><h4>Decorators Standardization</h4><p>The long-awaited decorators feature is being standardized and will provide a clean way to add metadata and modify classes.</p><pre><code>@component
class MyComponent {
  @property
  name: string = '';
  
  @method
  render() {
    return \`Hello, \${this.name}!\`;
  }
}</code></pre><h4>Pattern Matching</h4><p>Discussions are ongoing about adding pattern matching capabilities to TypeScript, which would enable more expressive conditional logic.</p><h3>Ecosystem Growth</h3><p>The TypeScript ecosystem continues to grow with better tooling, more type definitions, and improved integration with popular frameworks.</p><h3>Best Practices for 2024</h3><ul><li>Embrace strict mode configurations</li><li>Use utility types for better code reusability</li><li>Implement proper error handling with Result types</li><li>Leverage template literal types for API design</li></ul><h3>Conclusion</h3><p>TypeScript's future looks bright with continued improvements in performance, developer experience, and language features. Stay tuned for these exciting developments!</p>`,
        coverImage: '/images/blog/typescript-future.jpg',
        tags: ['TypeScript', 'Programming', 'Developer Tools'],
        published: true,
        publishedAt: new Date('2024-01-10'),
      }
    }),
    prisma.post.create({
      data: {
        title: 'Mastering React Server Components: A Complete Guide',
        slug: 'mastering-react-server-components',
        excerpt: 'Deep dive into React Server Components, understanding when and how to use them effectively in your applications.',
        content: `<h2>Understanding Server Components</h2><p>React Server Components represent a paradigm shift in how we think about React applications, enabling us to render components on the server while maintaining interactivity where needed.</p><h3>What Are Server Components?</h3><p>Server Components are React components that run on the server and send their rendered output to the client. They have several key characteristics:</p><ul><li>They run on the server during request time</li><li>They can access server-side resources directly</li><li>They don't include JavaScript in the client bundle</li><li>They can't use browser-only APIs or event handlers</li></ul><h3>Benefits of Server Components</h3><h4>1. Reduced Bundle Size</h4><p>Server Components don't send JavaScript to the client, reducing the overall bundle size and improving load times.</p><h4>2. Direct Database Access</h4><p>You can query databases directly in Server Components without exposing sensitive data or creating API endpoints.</p><pre><code>// Server Component
async function UserProfile({ userId }) {
  const user = await db.user.findUnique({
    where: { id: userId }
  });
  
  return (
    &lt;div&gt;
      &lt;h1&gt;{user.name}&lt;/h1&gt;
      &lt;p&gt;{user.email}&lt;/p&gt;
    &lt;/div&gt;
  );
}</code></pre><h4>3. Better SEO</h4><p>Since Server Components render on the server, their content is immediately available for search engines.</p><h3>When to Use Server Components</h3><h4>Perfect for:</h4><ul><li>Data fetching and display</li><li>Static content rendering</li><li>Layout components</li><li>SEO-critical content</li></ul><h4>Not suitable for:</h4><ul><li>Interactive elements (onClick, onChange)</li><li>Browser APIs (localStorage, window)</li><li>State management (useState, useEffect)</li><li>Custom hooks</li></ul><h3>Composition Patterns</h3><h4>Server + Client Component Pattern</h4><p>Combine Server Components for data fetching with Client Components for interactivity:</p><pre><code>// Server Component
async function ProductPage({ productId }) {
  const product = await fetchProduct(productId);
  
  return (
    &lt;div&gt;
      &lt;ProductInfo product={product} /&gt;
      &lt;AddToCartButton productId={productId} /&gt;
    &lt;/div&gt;
  );
}

// Client Component
'use client';
function AddToCartButton({ productId }) {
  const handleClick = () =&gt; {
    // Interactive logic here
  };
  
  return &lt;button onClick={handleClick}&gt;Add to Cart&lt;/button&gt;;
}</code></pre><h3>Best Practices</h3><ol><li><strong>Keep Server Components Pure:</strong> Avoid side effects and mutations</li><li><strong>Minimize Client Components:</strong> Use them only when interactivity is needed</li><li><strong>Optimize Data Fetching:</strong> Fetch data as close to where it's used as possible</li><li><strong>Handle Loading States:</strong> Use Suspense boundaries for better UX</li></ol><h3>Common Pitfalls</h3><ul><li>Trying to pass functions as props to Server Components</li><li>Using browser APIs in Server Components</li><li>Not understanding the serialization boundary</li><li>Over-using Client Components</li></ul><h3>Conclusion</h3><p>React Server Components offer a powerful way to build performant, SEO-friendly applications. By understanding their capabilities and limitations, you can create better user experiences while reducing client-side complexity.</p>`,
        coverImage: '/images/blog/react-server-components.jpg',
        tags: ['React', 'Server Components', 'Performance', 'Next.js'],
        published: true,
        publishedAt: new Date('2024-01-05'),
      }
    }),
    prisma.post.create({
      data: {
        title: 'Building a Design System with Tailwind CSS and Radix UI',
        slug: 'building-design-system-tailwind-radix',
        excerpt: 'Learn how to create a scalable, maintainable design system using Tailwind CSS and Radix UI primitives.',
        content: `<h2>The Foundation of Great UX</h2><p>A well-designed system is the backbone of any successful application. By combining Tailwind CSS's utility-first approach with Radix UI's accessible primitives, we can create a robust design system that scales.</p><h3>Why This Combination Works</h3><h4>Tailwind CSS Benefits:</h4><ul><li>Utility-first approach for rapid development</li><li>Consistent spacing and color scales</li><li>Responsive design built-in</li><li>Small production bundle sizes</li></ul><h4>Radix UI Benefits:</h4><ul><li>Accessible by default</li><li>Unstyled, composable primitives</li><li>Keyboard navigation support</li><li>Focus management</li></ul><h3>Setting Up Your Design System</h3><h4>1. Configure Tailwind CSS</h4><p>Start by customizing your Tailwind configuration with your design tokens:</p><pre><code>// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          500: '#3b82f6',
          900: '#1e3a8a',
        },
        gray: {
          50: '#f9fafb',
          500: '#6b7280',
          900: '#111827',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      }
    }
  }
}</code></pre><h4>2. Create Base Components</h4><p>Build your foundational components using Radix primitives:</p><pre><code>// Button Component
import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cn } from '@/lib/utils'

const buttonVariants = {
  variant: {
    default: 'bg-primary-500 text-white hover:bg-primary-600',
    outline: 'border border-gray-300 bg-white hover:bg-gray-50',
    ghost: 'hover:bg-gray-100',
  },
  size: {
    sm: 'h-8 px-3 text-sm',
    md: 'h-10 px-4',
    lg: 'h-12 px-6 text-lg',
  }
}

export function Button({ 
  className, 
  variant = 'default', 
  size = 'md',
  asChild = false,
  ...props 
}) {
  const Comp = asChild ? Slot : 'button'
  
  return (
    &lt;Comp
      className={cn(
        'inline-flex items-center justify-center rounded-md font-medium transition-colors',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500',
        'disabled:pointer-events-none disabled:opacity-50',
        buttonVariants.variant[variant],
        buttonVariants.size[size],
        className
      )}
      {...props}
    /&gt;
  )
}</code></pre><h3>Component Architecture</h3><h4>Layer Structure:</h4><ol><li><strong>Primitives:</strong> Radix UI components</li><li><strong>Base Components:</strong> Styled primitives with variants</li><li><strong>Composite Components:</strong> Complex UI patterns</li><li><strong>Page Components:</strong> Feature-specific components</li></ol><h3>Conclusion</h3><p>By combining Tailwind CSS and Radix UI, you can create a design system that is both powerful and maintainable. This approach ensures consistency, accessibility, and scalability across your entire application.</p>`,
        coverImage: '/images/blog/design-system-guide.jpg',
        tags: ['Design System', 'Tailwind CSS', 'Radix UI', 'Frontend'],
        published: true,
        publishedAt: new Date('2023-12-28'),
      }
    })
  ])

  // Seed some sample contact entries
  // Seed Designs
  console.log('🎨 Seeding designs...')
  const designs = await Promise.all([
    prisma.design.create({
      data: {
        title: 'E-Commerce Dashboard Redesign',
        slug: 'ecommerce-dashboard-redesign',
        description: 'Complete redesign of an e-commerce admin dashboard focusing on usability and modern aesthetics.',
        content: `<h2>Project Overview</h2><p>Redesigned a complex e-commerce dashboard to improve user experience and modernize the visual design.</p><h3>Challenge</h3><p>The existing dashboard was cluttered, difficult to navigate, and didn't scale well for different screen sizes.</p><h3>Solution</h3><ul><li>Simplified navigation with clear hierarchy</li><li>Implemented data visualization for key metrics</li><li>Created responsive layouts for all devices</li><li>Designed a cohesive design system</li></ul><h3>Results</h3><p>40% reduction in task completion time and 95% positive user feedback.</p>`,
        coverImage: '/images/designs/ecommerce-dashboard.jpg',
        images: [
          '/images/designs/ecommerce-dashboard-1.jpg',
          '/images/designs/ecommerce-dashboard-2.jpg',
          '/images/designs/ecommerce-dashboard-3.jpg',
          '/images/designs/ecommerce-dashboard-4.jpg'
        ],
        tags: ['UI/UX', 'Dashboard', 'E-commerce', 'Web Design'],
        category: 'WEB_DESIGN',
        tools: ['Figma', 'Adobe XD', 'Illustrator'],
        clientName: 'ShopFlow Inc.',
        figmaUrl: 'https://figma.com/file/example',
        featured: true
      }
    }),
    prisma.design.create({
      data: {
        title: 'Mobile Banking App',
        slug: 'mobile-banking-app',
        description: 'Modern mobile banking application with focus on security and ease of use.',
        content: `<h2>Project Overview</h2><p>Designed a comprehensive mobile banking app that prioritizes security while maintaining an intuitive user experience.</p><h3>Key Features</h3><ul><li>Biometric authentication</li><li>Quick transfer functionality</li><li>Real-time transaction notifications</li><li>Budget tracking and insights</li></ul><h3>Design Approach</h3><p>Used a clean, minimalist design with clear visual hierarchy and easy-to-understand iconography.</p>`,
        coverImage: '/images/designs/banking-app.jpg',
        images: [
          '/images/designs/banking-app-1.jpg',
          '/images/designs/banking-app-2.jpg',
          '/images/designs/banking-app-3.jpg'
        ],
        tags: ['Mobile', 'Fintech', 'UI/UX', 'iOS', 'Android'],
        category: 'MOBILE_APP',
        tools: ['Figma', 'Sketch', 'Principle'],
        clientName: 'SecureBank',
        projectUrl: 'https://securebank-app.com',
        figmaUrl: 'https://figma.com/file/banking-app',
        featured: true
      }
    }),
    prisma.design.create({
      data: {
        title: 'Brand Identity - Tech Startup',
        slug: 'brand-identity-tech-startup',
        description: 'Complete brand identity design for an AI-powered tech startup.',
        content: `<h2>Project Overview</h2><p>Created a comprehensive brand identity for an innovative AI startup, including logo, color palette, typography, and brand guidelines.</p><h3>Deliverables</h3><ul><li>Logo design and variations</li><li>Brand color palette</li><li>Typography system</li><li>Brand guidelines document</li><li>Marketing materials</li></ul>`,
        coverImage: '/images/designs/brand-identity.jpg',
        images: [
          '/images/designs/brand-identity-1.jpg',
          '/images/designs/brand-identity-2.jpg',
          '/images/designs/brand-identity-3.jpg',
          '/images/designs/brand-identity-4.jpg'
        ],
        tags: ['Branding', 'Logo Design', 'Identity', 'Startup'],
        category: 'BRANDING',
        tools: ['Illustrator', 'Photoshop', 'InDesign'],
        clientName: 'AI Innovations',
        behanceUrl: 'https://behance.net/gallery/brand-identity',
        featured: false
      }
    }),
    prisma.design.create({
      data: {
        title: 'Design System - SaaS Platform',
        slug: 'design-system-saas-platform',
        description: 'Comprehensive design system for a growing SaaS platform with 50+ components.',
        content: `<h2>Project Overview</h2><p>Built a scalable design system to ensure consistency across a rapidly growing SaaS platform.</p><h3>Components</h3><ul><li>50+ reusable UI components</li><li>Design tokens for colors, spacing, typography</li><li>Accessibility guidelines</li><li>Component documentation</li></ul><h3>Impact</h3><p>Reduced design-to-development time by 60% and improved UI consistency across the platform.</p>`,
        coverImage: '/images/designs/design-system.jpg',
        images: [
          '/images/designs/design-system-1.jpg',
          '/images/designs/design-system-2.jpg',
          '/images/designs/design-system-3.jpg'
        ],
        tags: ['Design System', 'UI Components', 'SaaS', 'Documentation'],
        category: 'DESIGN_SYSTEM',
        tools: ['Figma', 'Storybook', 'Zeroheight'],
        clientName: 'CloudBase',
        figmaUrl: 'https://figma.com/file/design-system',
        projectUrl: 'https://cloudbase-design.com',
        featured: false
      }
    }),
    prisma.design.create({
      data: {
        title: 'Portfolio Website Redesign',
        slug: 'portfolio-website-redesign',
        description: 'Modern portfolio website design for a creative photographer.',
        content: `<h2>Project Overview</h2><p>Designed a stunning portfolio website that showcases photography work with a focus on visual storytelling.</p><h3>Features</h3><ul><li>Full-screen image galleries</li><li>Smooth scrolling animations</li><li>Mobile-optimized layouts</li><li>Contact form integration</li></ul>`,
        coverImage: '/images/designs/portfolio-website.jpg',
        images: [
          '/images/designs/portfolio-website-1.jpg',
          '/images/designs/portfolio-website-2.jpg'
        ],
        tags: ['Web Design', 'Portfolio', 'Photography', 'Minimalist'],
        category: 'WEB_DESIGN',
        tools: ['Figma', 'Adobe XD'],
        clientName: 'Emma Photography',
        projectUrl: 'https://emmaphoto.com',
        dribbbleUrl: 'https://dribbble.com/shots/portfolio-redesign',
        featured: false
      }
    }),
    prisma.design.create({
      data: {
        title: 'Fitness App UI/UX',
        slug: 'fitness-app-ui-ux',
        description: 'Engaging fitness tracking app with gamification elements.',
        content: `<h2>Project Overview</h2><p>Designed a motivating fitness app that uses gamification to keep users engaged with their health goals.</p><h3>Key Features</h3><ul><li>Workout tracking and planning</li><li>Achievement badges and rewards</li><li>Social challenges</li><li>Progress visualization</li></ul>`,
        coverImage: '/images/designs/fitness-app.jpg',
        images: [
          '/images/designs/fitness-app-1.jpg',
          '/images/designs/fitness-app-2.jpg',
          '/images/designs/fitness-app-3.jpg'
        ],
        tags: ['Mobile App', 'Fitness', 'Gamification', 'Health'],
        category: 'UI_UX',
        tools: ['Figma', 'Principle', 'After Effects'],
        figmaUrl: 'https://figma.com/file/fitness-app',
        featured: false
      }
    })
  ])

  console.log('📧 Seeding contact entries...')
  await Promise.all([
    prisma.contact.create({
      data: {
        name: 'John Smith',
        email: 'john.smith@example.com',
        subject: 'Web Development Project',
        message: 'Hi! I\'m interested in discussing a web development project for my startup. We need a modern e-commerce platform.',
        status: 'UNREAD'
      }
    }),
    prisma.contact.create({
      data: {
        name: 'Sarah Johnson',
        email: 'sarah.j@company.com',
        subject: 'Mobile App Development',
        message: 'We\'re looking for someone to help us build a mobile app for our business. Would love to discuss the requirements.',
        status: 'REPLIED'
      }
    })
  ])

  // Seed Audiobooks
  console.log('🎧 Seeding audiobooks...')
  const audiobooks = await Promise.all([
    // Tech & Programming
    prisma.resource.create({
      data: {
        title: 'The Pragmatic Programmer',
        description: 'Your Journey to Mastery. A timeless guide to software craftsmanship with practical advice for programmers at all levels.',
        type: 'AUDIOBOOK',
        url: 'https://www.audible.com/pd/The-Pragmatic-Programmer-Audiobook/B0833FMYH9',
        category: 'Programming',
        image: '/images/audiobooks/pragmatic-programmer.jpg',
        isAffiliate: true,
        tags: ['programming', 'software-engineering', 'best-practices', 'career'],
        narrator: 'Anna Katarina',
        audioDuration: '10h 7m',
        clickCount: 0
      }
    }),
    prisma.resource.create({
      data: {
        title: 'Clean Code',
        description: 'A Handbook of Agile Software Craftsmanship by Robert C. Martin. Learn to write code that is clean, maintainable, and professional.',
        type: 'AUDIOBOOK',
        url: 'https://www.audible.com/pd/Clean-Code-Audiobook/B08X8ZXT15',
        category: 'Programming',
        image: '/images/audiobooks/clean-code.jpg',
        isAffiliate: true,
        tags: ['clean-code', 'software-engineering', 'best-practices', 'refactoring'],
        narrator: 'Bob Welch',
        audioDuration: '12h 42m',
        clickCount: 0
      }
    }),
    prisma.resource.create({
      data: {
        title: 'The Phoenix Project',
        description: 'A Novel about IT, DevOps, and Helping Your Business Win. A gripping story that teaches DevOps principles through narrative.',
        type: 'AUDIOBOOK',
        url: 'https://www.audible.com/pd/The-Phoenix-Project-Audiobook/B00VATFAMI',
        category: 'DevOps',
        image: '/images/audiobooks/phoenix-project.jpg',
        isAffiliate: true,
        tags: ['devops', 'it-management', 'agile', 'business'],
        narrator: 'Chris Ruen',
        audioDuration: '14h 45m',
        clickCount: 0
      }
    }),

    // AI & Technology
    prisma.resource.create({
      data: {
        title: 'Life 3.0',
        description: 'Being Human in the Age of Artificial Intelligence by Max Tegmark. Explores how AI will affect crime, war, justice, jobs, and our very sense of being human.',
        type: 'AUDIOBOOK',
        url: 'https://www.audible.com/pd/Life-30-Audiobook/B0742JQF31',
        category: 'AI & Future',
        image: '/images/audiobooks/life-3.jpg',
        isAffiliate: true,
        tags: ['artificial-intelligence', 'future', 'technology', 'philosophy'],
        narrator: 'Rob Shapiro',
        audioDuration: '13h 29m',
        clickCount: 0
      }
    }),
    prisma.resource.create({
      data: {
        title: 'The Alignment Problem',
        description: 'Machine Learning and Human Values by Brian Christian. A deep dive into AI alignment and ensuring AI systems share our values.',
        type: 'AUDIOBOOK',
        url: 'https://www.audible.com/pd/The-Alignment-Problem-Audiobook/0593149580',
        category: 'AI & Future',
        image: '/images/audiobooks/alignment-problem.jpg',
        isAffiliate: true,
        tags: ['ai-safety', 'machine-learning', 'ethics', 'technology'],
        narrator: 'Brian Christian',
        audioDuration: '16h 32m',
        clickCount: 0
      }
    }),
    prisma.resource.create({
      data: {
        title: 'AI Superpowers',
        description: 'China, Silicon Valley, and the New World Order by Kai-Fu Lee. Insights into the AI race between China and the US from a leading AI expert.',
        type: 'AUDIOBOOK',
        url: 'https://www.audible.com/pd/AI-Superpowers-Audiobook/B07D5M3Q4Y',
        category: 'AI & Future',
        image: '/images/audiobooks/ai-superpowers.jpg',
        isAffiliate: true,
        tags: ['artificial-intelligence', 'china', 'silicon-valley', 'future'],
        narrator: 'Mikael Naramore',
        audioDuration: '9h 28m',
        clickCount: 0
      }
    }),

    // Personal Enhancement & Productivity
    prisma.resource.create({
      data: {
        title: 'Atomic Habits',
        description: 'An Easy & Proven Way to Build Good Habits & Break Bad Ones by James Clear. The definitive guide to habit formation and behavior change.',
        type: 'AUDIOBOOK',
        url: 'https://www.audible.com/pd/Atomic-Habits-Audiobook/1524779261',
        category: 'Self-Improvement',
        image: '/images/audiobooks/atomic-habits.jpg',
        isAffiliate: true,
        tags: ['habits', 'productivity', 'self-improvement', 'psychology'],
        narrator: 'James Clear',
        audioDuration: '5h 35m',
        clickCount: 0
      }
    }),
    prisma.resource.create({
      data: {
        title: 'Deep Work',
        description: 'Rules for Focused Success in a Distracted World by Cal Newport. Master the art of deep concentration in an age of constant distraction.',
        type: 'AUDIOBOOK',
        url: 'https://www.audible.com/pd/Deep-Work-Audiobook/B0189PVAWY',
        category: 'Productivity',
        image: '/images/audiobooks/deep-work.jpg',
        isAffiliate: true,
        tags: ['productivity', 'focus', 'career', 'self-improvement'],
        narrator: 'Jeff Bottoms',
        audioDuration: '7h 44m',
        clickCount: 0
      }
    }),
    prisma.resource.create({
      data: {
        title: 'Thinking, Fast and Slow',
        description: 'By Daniel Kahneman. A groundbreaking tour of the mind explaining the two systems that drive the way we think and make decisions.',
        type: 'AUDIOBOOK',
        url: 'https://www.audible.com/pd/Thinking-Fast-and-Slow-Audiobook/B005TKKCWC',
        category: 'Psychology',
        image: '/images/audiobooks/thinking-fast-slow.jpg',
        isAffiliate: true,
        tags: ['psychology', 'decision-making', 'behavioral-economics', 'thinking'],
        narrator: 'Patrick Egan',
        audioDuration: '20h 2m',
        clickCount: 0
      }
    }),
    prisma.resource.create({
      data: {
        title: 'The 7 Habits of Highly Effective People',
        description: 'By Stephen R. Covey. A timeless classic on personal effectiveness and leadership that has transformed millions of lives.',
        type: 'AUDIOBOOK',
        url: 'https://www.audible.com/pd/The-7-Habits-of-Highly-Effective-People-Audiobook/B002V5HAL4',
        category: 'Leadership',
        image: '/images/audiobooks/7-habits.jpg',
        isAffiliate: true,
        tags: ['leadership', 'productivity', 'self-improvement', 'business'],
        narrator: 'Stephen R. Covey',
        audioDuration: '15h 50m',
        clickCount: 0
      }
    }),

    // Tech Business & Innovation
    prisma.resource.create({
      data: {
        title: 'The Lean Startup',
        description: 'How Today\'s Entrepreneurs Use Continuous Innovation to Create Radically Successful Businesses by Eric Ries.',
        type: 'AUDIOBOOK',
        url: 'https://www.audible.com/pd/The-Lean-Startup-Audiobook/B005LXV0HI',
        category: 'Startups',
        image: '/images/audiobooks/lean-startup.jpg',
        isAffiliate: true,
        tags: ['startups', 'entrepreneurship', 'innovation', 'business'],
        narrator: 'Eric Ries',
        audioDuration: '8h 38m',
        clickCount: 0
      }
    }),
    prisma.resource.create({
      data: {
        title: 'Zero to One',
        description: 'Notes on Startups, or How to Build the Future by Peter Thiel. Unconventional wisdom on innovation and building monopolies.',
        type: 'AUDIOBOOK',
        url: 'https://www.audible.com/pd/Zero-to-One-Audiobook/B00M27LBU2',
        category: 'Startups',
        image: '/images/audiobooks/zero-to-one.jpg',
        isAffiliate: true,
        tags: ['startups', 'innovation', 'business', 'entrepreneurship'],
        narrator: 'Blake Masters',
        audioDuration: '4h 50m',
        clickCount: 0
      }
    })
  ])

  console.log('✅ Database seeded successfully!')
  console.log(`📦 Created ${services.length} services`)
  console.log(`🚀 Created ${projects.length} projects`)
  console.log(`🎨 Created ${designs.length} designs`)
  console.log(`📝 Created ${posts.length} blog posts`)
  console.log(`🎧 Created ${audiobooks.length} audiobooks`)
  console.log('📧 Created 2 contact entries')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
