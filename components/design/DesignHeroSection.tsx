"use client";
import { Button } from "../ui/button";
import { ArrowDown, Palette, Figma, Layers } from "lucide-react";

export function DesignHeroSection() {
  const scrollToShowcase = () => {
    const element = document.getElementById('design-showcase');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 pt-20">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-theme-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-theme-secondary/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Icon Grid */}
        <div className="flex justify-center items-center space-x-8 mb-8 opacity-60">
          <Palette className="w-8 h-8 text-theme-primary" />
          <Figma className="w-8 h-8 text-theme-primary" />
          <Layers className="w-8 h-8 text-theme-primary" />
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
          <span className="bg-gradient-to-r from-theme-primary to-theme-secondary bg-clip-text text-transparent">
            Design
          </span>{" "}
          <span className="text-foreground">Portfolio</span>
        </h1>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
          Where technical expertise meets creative vision. Explore my journey in 
          crafting user-centered designs and intuitive digital experiences.
        </p>

        {/* Description */}
        <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
          From wireframes to high-fidelity prototypes, I bridge the gap between 
          design and development to create solutions that are both beautiful and functional.
        </p>

        {/* CTA Button */}
        <Button
          onClick={scrollToShowcase}
          size="lg"
          className="bg-theme-primary hover:bg-theme-secondary text-black font-semibold px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105"
        >
          Explore My Work
          <ArrowDown className="ml-2 h-5 w-5" />
        </Button>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 mt-16 pt-16 border-t border-border/50">
          <div className="text-center">
            <div className="text-3xl font-bold text-theme-primary mb-2">5+</div>
            <div className="text-sm text-muted-foreground">Years of Design</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-theme-primary mb-2">20+</div>
            <div className="text-sm text-muted-foreground">Design Projects</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-theme-primary mb-2">100%</div>
            <div className="text-sm text-muted-foreground">User-Centered</div>
          </div>
        </div>
      </div>
    </section>
  );
}
