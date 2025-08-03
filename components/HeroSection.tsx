"use client";

import { MouseFollowAnimation } from './MouseFollowAnimation';
import { Button } from './ui/button';
import { Phone } from 'lucide-react';

export function HeroSection() {
  const scrollToProjects = () => {
    const element = document.getElementById('projects');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden">
        {/* Animated gradient background */}
        <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-br from-theme-primary/20 via-background to-green-accent/20 animate-gradient"></div>
      </div>
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="h-full w-full bg-[linear-gradient(theme-primary_1px,transparent_1px),linear-gradient(90deg,theme-primary_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      </div>

      <MouseFollowAnimation />

      <div className="relative z-20 max-w-4xl mx-auto px-6 text-center">

        <div className="mb-10">
          <h2 className="text-foreground text-xl mb-2">👋 Hi, I'm Hany El Saydawy </h2>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 pb-2 bg-gradient-to-r from-theme-accent via-theme-primary to-theme-accent bg-clip-text text-transparent">
            Technical Lead &<br />
            Fullstack Engineer
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            I craft accessible, high-performance digital products
            <br />
            turning complex problems into elegant, scalable solutions.
            <br /><br />
            <span className='text-sm font-light'>Available for freelance, contract, and consulting work</span>
            <br />
          <span className='text-sm font-light'>based in Berlin 🇩🇪</span>
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            onClick={scrollToContact}
            variant="outline"
            size="lg"
            className="border hover:text-white transition-colors"
                style={{
                  borderColor: 'var(--theme-primary)',
                  color: 'var(--theme-primary)',
                  '--hover-bg': 'var(--theme-primary)'
                } as React.CSSProperties & { '--hover-bg': string }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--theme-primary)';
                  e.currentTarget.style.color = 'white';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
          >
            <Phone className="mr-2 h-4 w-4" />
            Contact Me
          </Button>
        </div>
      </div>
    </section>
  );
}