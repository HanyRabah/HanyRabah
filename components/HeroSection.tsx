"use client";

import { MouseFollowAnimation } from './MouseFollowAnimation';
import { Button } from './ui/button';
import { ArrowRight, Download, Phone } from 'lucide-react';

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
        <div className="absolute inset-0 bg-gradient-to-br from-teal-primary/20 via-background to-green-accent/20 animate-gradient"></div>
      </div>
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="h-full w-full bg-[linear-gradient(rgba(94,234,212,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(94,234,212,0.1)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      </div>

      <MouseFollowAnimation />

      <div className="relative z-20 max-w-4xl mx-auto px-6 text-center">

        <div className="mb-10">
          <h2 className="text-foreground text-xl mb-2">👋 Hi, I'm </h2>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 pb-2 bg-gradient-to-r from-teal-secondary via-teal-primary to-green-accent bg-clip-text text-transparent">
            Hany El Saydawy
          </h1>
          {/* <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 pb-2 bg-gradient-to-r from-foreground via-teal-primary to-green-accent bg-clip-text text-transparent">
            Technical Lead &<br />
            Fullstack Engineer
          </h1> */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            I build accessible, high-performance digital products that scale.
            <br />
            Transforming complex problems into elegant solutions.
            <br /><br />
            
            I'm based in Berlin, Germany.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          {/* <Button
            onClick={scrollToProjects}
            size="lg"
            className="bg-teal-primary hover:bg-teal-secondary text-black group"
          >
            View My Work
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button> */}
          <Button
            onClick={scrollToContact}
            variant="outline"
            size="lg"
            className="border-teal-primary text-teal-primary hover:bg-teal-primary hover:text-white"
          >
            <Phone className="mr-2 h-4 w-4" />
            Contact Me
          </Button>
        </div>
      </div>
    </section>
  );
}