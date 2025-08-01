import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed...')

  // Clear existing data
  await prisma.analytics.deleteMany()
  await prisma.contact.deleteMany()
  await prisma.post.deleteMany()
  await prisma.project.deleteMany()
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

  console.log('✅ Database seeded successfully!')
  console.log(`📦 Created ${services.length} services`)
  console.log(`🚀 Created ${projects.length} projects`)
  console.log(`📝 Created ${posts.length} blog posts`)
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
