
"use client";
import { useState, useEffect } from 'react';
import { Button } from './ui/button';

export function Navigation() {
  const [activeSection, setActiveSection] = useState('');
  //check if page not home
  const isHome = window.location.pathname === '/';
  // then change links to got to page with section
 
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'projects', 'services', 'blog', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      setActiveSection(current || '');
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    if (isHome) {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.location.href = `/#${sectionId}`;
    }
  };

  const navItems = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'services', label: 'Services' },
    { id: 'blog', label: 'Blog' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* <button
          onClick={() => scrollToSection('hero')}
          className="text-2xl font-semibold text-teal-primary hover:text-teal-secondary transition-colors"
        >
          Hany
        </button> */}
        
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`text-sm transition-colors hover:text-teal-primary ${
                activeSection === item.id ? 'text-teal-primary' : 'text-muted-foreground'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <Button
          onClick={() => scrollToSection('contact')}
          className="bg-teal-primary hover:bg-teal-secondary text-black"
        >
          Let's Talk
        </Button>
      </div>
    </nav>
  );
}