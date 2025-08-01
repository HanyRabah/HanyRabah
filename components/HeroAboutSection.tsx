"use client";

import TechincalSkills from './TechincalSkills';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ArrowRight, Download } from 'lucide-react';
import { MouseFollowAnimation } from './MouseFollowAnimation';

export function HeroAboutSection() {
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

      {/* Interactive mouse animation */}
      <MouseFollowAnimation />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center min-h-[80vh]">
          {/* Left Column - Name and Title */}
          <div className="space-y-8">
            <div>
              <p className="text-teal-primary text-lg mb-2">Hi, I'm Hany</p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground via-teal-primary to-green-accent bg-clip-text text-transparent">
                Technical Lead & <br />
                Fullstack Engineer
              </h1>
              {/* <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed mb-8">
                I build accessible, high-performance digital products that scale.
                Transforming complex problems into elegant solutions.
              </p> */}
                <p>
                  I'm a Senior Fullstack Engineer and Technical Lead based in Berlin, 
                  with over 8 years of experience building scalable web applications 
                  and leading development teams. I specialize in React, Node.js, and 
                  cloud architecture, with a passion for creating exceptional user experiences.
                </p>
                <p>
                  Currently, I lead a team of developers at a fast-growing fintech startup, 
                  where I've architected systems that handle millions of transactions daily. 
                  I believe in writing clean, maintainable code and fostering a collaborative 
                  team environment.
                </p>
                <p>
                  When I'm not coding, you'll find me exploring Berlin's tech scene, 
                  contributing to open-source projects, or sharing knowledge through 
                  technical writing and mentoring.
                </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={scrollToProjects}
                size="lg"
                className="bg-teal-primary hover:bg-teal-secondary text-black group"
              >
                View My Work
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button
                onClick={scrollToContact}
                variant="outline"
                size="lg"
                className="border-teal-primary text-teal-primary hover:bg-teal-primary hover:text-black"
              >
                <Download className="mr-2 h-4 w-4" />
                Download CV
              </Button>
            </div>
          </div>

          {/* Right Column - About Content */}
          {/* <div className="space-y-8">
            <TechincalSkills />
          </div> */}
        </div>
      </div>
    </section>
  );
}
