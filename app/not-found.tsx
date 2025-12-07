import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Home, ArrowLeft, Search, Mail } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background text-foreground">
        <main className="flex items-center justify-center min-h-[calc(100vh-200px)] px-6 py-32">
          <div className="max-w-2xl mx-auto text-center">
            {/* 404 Animation/Visual */}
            <div className="mb-8">
              <div className="relative">
                <h1 className="text-8xl md:text-9xl font-bold text-theme-primary/20 select-none">
                  404
                </h1>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-theme-primary to-theme-secondary opacity-10 animate-pulse"></div>
                </div>
              </div>
            </div>

            {/* Error Message */}
            <div className="mb-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">
                Oops! Page Not Found
              </h2>
              <p className="text-lg text-muted-foreground mb-2">
                The page you're looking for seems to have wandered off into the digital void.
              </p>
              <p className="text-muted-foreground">
                Don't worry, even the best developers encounter 404s! Let's get you back on track.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <Link href="/">
                <Button 
                  size="lg"
                  className="bg-theme-primary hover:bg-theme-secondary text-white transition-colors"
                >
                  <Home className="mr-2 h-4 w-4" />
                  Back to Home
                </Button>
              </Link>
              
              <Link href="/projects">
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-theme-primary text-theme-primary hover:bg-theme-primary hover:text-white transition-colors"
                >
                  <Search className="mr-2 h-4 w-4" />
                  View Projects
                </Button>
              </Link>
              
              <Link href="/blog">
                <Button 
                  variant="ghost" 
                  size="lg"
                  className="text-theme-primary hover:bg-theme-primary hover:text-white transition-colors"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Read Blog
                </Button>
              </Link>
            </div>

            {/* Helpful Links */}
            <div className="border-t border-border pt-8">
              <h3 className="text-lg font-semibold mb-4 text-foreground">
                Popular Pages
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <Link 
                  href="/projects" 
                  className="text-theme-primary hover:text-theme-secondary transition-colors"
                >
                  Projects Portfolio
                </Link>
                <Link 
                  href="/design" 
                  className="text-theme-primary hover:text-theme-secondary transition-colors"
                >
                  Design Portfolio
                </Link>
                <Link 
                  href="/blog" 
                  className="text-theme-primary hover:text-theme-secondary transition-colors"
                >
                  Technical Blog
                </Link>
                <Link 
                  href="/resume" 
                  className="text-theme-primary hover:text-theme-secondary transition-colors"
                >
                  Resume/CV
                </Link>
              </div>
            </div>

            {/* Contact CTA */}
            <div className="mt-8 p-6 bg-theme-primary/5 rounded-lg border border-theme-primary/20">
              <p className="text-muted-foreground mb-4">
                Looking for something specific? I'd be happy to help!
              </p>
              <Link href="/#contact">
                <Button 
                  variant="outline"
                  className="border-theme-primary text-theme-primary hover:bg-theme-primary hover:text-white transition-colors"
                >
                  <Mail className="mr-2 h-4 w-4" />
                  Get in Touch
                </Button>
              </Link>
            </div>

            {/* Fun Developer Message */}
            <div className="mt-8 text-xs text-muted-foreground">
              <p>
                💡 <strong>Developer Tip:</strong> This 404 page was crafted with the same attention to detail as the rest of the portfolio.
                <br />
                Even error pages deserve good UX! 🚀
              </p>
            </div>
          </div>
        </main>
    </div>
  )
}
