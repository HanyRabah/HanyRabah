import Link from 'next/link'
import { Github, Linkedin, Mail, Instagram } from 'lucide-react'
import { Button } from './ui/button'

export function BlogFooter() {
  return (
    <footer className="border-t border-border/40 bg-muted/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link 
              href="/" 
              className="text-xl font-bold text-foreground hover:text-teal-primary transition-colors"
            >
              Hany Rabah
            </Link>
            <p className="text-muted-foreground mt-2 max-w-md">
              Senior Fullstack Engineer and Technical Lead crafting accessible, 
              high-performance digital products.
            </p>
            <div className="flex space-x-4 mt-4">
              <Button variant="ghost" size="sm" asChild>
                <a href="https://github.com/hanyrabah" target="_blank" rel="noopener noreferrer">
                  <Github className="w-4 h-4" />
                </a>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <a href="https://linkedin.com/in/hany-rabah" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="w-4 h-4" />
                </a>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <a href="https://instagram.com/hanyrabah" target="_blank" rel="noopener noreferrer">
                  <Instagram className="w-4 h-4" />
                </a>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <a href="mailto:contact@hanyrabah.com">
                  <Mail className="w-4 h-4" />
                </a>
              </Button>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  href="/" 
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  href="/#about" 
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link 
                  href="/#projects" 
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Projects
                </Link>
              </li>
              <li>
                <Link 
                  href="/blog" 
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link 
                  href="/#contact" 
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Blog */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Blog</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  href="/blog" 
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  All Posts
                </Link>
              </li>
              <li>
                <Link 
                  href="/blog?tag=react" 
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  React
                </Link>
              </li>
              <li>
                <Link 
                  href="/blog?tag=typescript" 
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  TypeScript
                </Link>
              </li>
              <li>
                <Link 
                  href="/blog?tag=nextjs" 
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Next.js
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border/40 mt-8 pt-8 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Hany Rabah. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
