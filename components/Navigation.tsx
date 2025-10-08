"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from './ui/button';
import { ThemeSwitcher } from './ThemeSwitcher';
import { usePathname } from 'next/navigation';

interface NavItem {
  id: string;
  label: string;
  href?: string;
}

const getActiveSectionFromPath = (pathname: string): string => {
  if (pathname === '/') return 'hero';
  if (pathname === '/projects') return 'projects';
  if (pathname === '/design') return 'design';
  if (pathname === '/blog') return 'blog';
  if (pathname.startsWith('/projects/')) return 'projects';
  if (pathname.startsWith('/blog/')) return 'blog';
  if (pathname.startsWith('/design/')) return 'design';
  return '';
};

export function Navigation() {
  const [activeSection, setActiveSection] = useState('');
  const pathname = usePathname();

  useEffect(() => {
    setActiveSection(getActiveSectionFromPath(pathname));
  }, [pathname]);

  useEffect(() => {
    if (pathname !== '/') return;

    const handleScroll = () => {
      const sections = ['hero', 'about', 'services', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      setActiveSection(current || 'hero');
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);

  const scrollToSection = (sectionId: string) => {
    const isHome = window.location.pathname === '/';
    if (isHome) {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.location.href = `/#${sectionId}`;
    }
  };

  const navItems: NavItem[] = [
    { id: 'hero', href: '/', label: 'Home' },
    { id: 'about', href: '/#about', label: 'About' },
    { id: 'projects', href: '/projects', label: 'Projects' },
    { id: 'design', href: '/design', label: 'Design' },
    { id: 'services', href: '/#services', label: 'Services' },
    { id: 'blog', href: '/blog', label: 'Blog' },
    { id: 'contact', href: '/#contact', label: 'Contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="md:flex items-center space-x-8">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            
            if (item.href) {
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className={`text-sm transition-colors hover:text-theme-primary ${
                    isActive ? 'text-theme-primary font-medium' : 'text-muted-foreground'
                  }`}
                >
                  {item.label}
                </Link>
              );
            }
            
            return (
              <Link
                key={item.id}
                href={`/#${item.id}`}
                onClick={() => scrollToSection(item.id)}
                className={`text-sm transition-colors hover:text-theme-primary ${
                  isActive ? 'text-theme-primary font-medium' : 'text-muted-foreground'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center space-x-4">
          <Button
            onClick={() => scrollToSection('contact')}
            className="bg-theme-primary hover:bg-theme-secondary text-black"
          >
            Let's Talk
          </Button>
          <ThemeSwitcher />
        </div>
      </div>
    </nav>
  );
}