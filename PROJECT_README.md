# Portfolio Website

A modern, full-stack portfolio website built with Next.js 14, TypeScript, and Tailwind CSS. Features a comprehensive theme system, content management with Prisma and PostgreSQL, email integration with Resend, and comprehensive SEO optimization.

## 🌟 Features

- ⚡ **Next.js 14** with App Router and TypeScript
- 🎨 **Dynamic Theme System** with multiple color schemes and dark/light mode
- 📊 **Prisma ORM** with PostgreSQL database
- 📧 **Email Integration** with Resend for contact forms and auto-replies
- 📈 **Analytics** with Google Analytics and Vercel Analytics
- 🔍 **SEO Optimized** with meta tags, sitemap, and structured data
- 📝 **Blog System** with markdown support
- 💼 **Project Showcase** with detailed pages
- 📱 **Responsive Design** with Tailwind CSS
- 🚀 **Vercel Deployment** ready

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI, Lucide Icons
- **Theme System**: Custom context with localStorage persistence

### Backend
- **Database**: PostgreSQL (Neon)
- **ORM**: Prisma
- **Email Service**: Resend
- **File Storage**: Vercel Blob

### DevOps & Analytics
- **Deployment**: Vercel
- **Analytics**: Google Analytics, Vercel Analytics
- **Performance**: Vercel Speed Insights
- **Testing**: Playwright, Cypress, Jest

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- PostgreSQL database (recommend Neon)
- Resend account for email functionality

### Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd portfolio
   npm install
   ```

2. **Environment Setup**:
   ```bash
   cp .env.example .env
   ```
   
   Configure your environment variables:
   ```env
   # Database
   DATABASE_URL="your-postgresql-connection-string"
   
   # Analytics
   GOOGLE_ANALYTICS_ID="your-ga-measurement-id"
   
   # Email (Resend)
   RESEND_API_KEY="your-resend-api-key"
   SENDER_EMAIL="your-verified-email@yourdomain.com"
   RECIPIENT_EMAIL="your-email@example.com"
   
   # Storage
   BLOB_READ_WRITE_TOKEN="your-vercel-blob-token"
   ```

3. **Database Setup**:
   ```bash
   npx prisma generate
   npx prisma db push
   ```

4. **Development Server**:
   ```bash
   npm run dev
   ```

5. **Open [http://localhost:3000](http://localhost:3000)**

## 📁 Project Structure

```
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   ├── contact/       # Contact form handling
│   │   └── ...           # Other API endpoints
│   ├── blog/              # Blog pages
│   ├── projects/          # Project showcase pages
│   ├── resume/            # Resume/CV page
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── layout/           # Layout components
│   ├── resume/           # Resume-specific components
│   └── ...               # Feature components
├── contexts/             # React contexts
│   └── ThemeContext.tsx  # Theme management
├── lib/                  # Utility functions
│   ├── email.ts          # Email functionality
│   ├── prisma.ts         # Database client
│   └── utils.ts          # Helper utilities
├── prisma/               # Database schema and migrations
├── types/                # TypeScript type definitions
└── public/               # Static assets
```

## 🎨 Theme System

The portfolio features a comprehensive theme system with:

- **5 Color Schemes**: Teal, Purple, Blue, Orange, Green
- **Light/Dark Mode**: Automatic system detection with manual toggle
- **Dynamic CSS Variables**: Real-time theme switching
- **Persistent Storage**: User preferences saved in localStorage
- **Tailwind Integration**: Custom theme classes for seamless styling

### Theme Usage
```tsx
import { useTheme } from '@/contexts/ThemeContext'

function MyComponent() {
  const { colorTheme, mode, setColorTheme, toggleMode } = useTheme()
  
  return (
    <div className="bg-theme-primary text-theme-secondary">
      <button onClick={toggleMode}>Toggle Mode</button>
    </div>
  )
}
```

## 📧 Email System

Integrated email functionality using Resend:

- **Contact Form**: Automatic email notifications
- **Auto-Reply**: Professional response to form submissions
- **HTML Templates**: Styled email templates
- **Error Handling**: Comprehensive error logging and fallbacks

### Email Configuration
1. Set up a domain with Resend
2. Verify your sending domain
3. Configure environment variables
4. Test with the included `test-email.js` script

## 🗄️ Database Schema

The application includes models for:

- **Contact**: Contact form submissions
- **Post**: Blog posts with tags and publishing status
- **Project**: Portfolio projects with technologies and links
- **Service**: Service offerings and descriptions
- **Analytics**: Basic page visit tracking

## 📱 Responsive Design

- **Mobile-First**: Optimized for all device sizes
- **Touch-Friendly**: Accessible touch targets
- **Performance**: Optimized images and lazy loading
- **Accessibility**: WCAG compliant with proper ARIA labels

## 🔍 SEO Features

- **Dynamic Meta Tags**: Page-specific SEO optimization
- **Structured Data**: JSON-LD markup for rich snippets
- **Sitemap Generation**: Automatic XML sitemap
- **Open Graph**: Social media sharing optimization
- **Performance**: Core Web Vitals optimization

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect Repository**:
   ```bash
   vercel --prod
   ```

2. **Environment Variables**: Set up all required environment variables in Vercel dashboard

3. **Domain Configuration**: Configure custom domain and SSL

### Manual Deployment

1. **Build the application**:
   ```bash
   npm run build
   ```

2. **Start production server**:
   ```bash
   npm start
   ```

## 🧪 Testing

Run the test suite:
```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Email functionality
node test-email.js
```

## 📊 Performance

- **Lighthouse Score**: 95+ across all metrics
- **Core Web Vitals**: Optimized for LCP, FID, and CLS
- **Bundle Size**: Optimized with tree shaking and code splitting
- **Image Optimization**: Next.js Image component with WebP support

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

MIT License - feel free to use this template for your own portfolio!

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- UI components from [Radix UI](https://radix-ui.com/)
- Icons from [Lucide](https://lucide.dev/)
- Email service by [Resend](https://resend.com/)
- Database hosted on [Neon](https://neon.tech/)
- Deployed on [Vercel](https://vercel.com/)
