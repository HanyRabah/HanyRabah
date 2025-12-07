"use client";
import { Button } from "../ui/button";
import { ArrowDown, Palette, Figma, Layers } from "lucide-react";
import { PageHeader } from "../PageHeader";

export function DesignHeroSection() {
  const scrollToShowcase = () => {
    const element = document.getElementById('design-showcase');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="px-6 pt-20">
      <div className="max-w-4xl mx-auto">
        <PageHeader
          title="Design Portfolio"
          icons={[Palette, Figma, Layers]}
          description="Where technical expertise meets creative vision. Explore my journey in crafting user-centered designs and intuitive digital experiences."
          gradient={false}
          splitColor={true}
        >
          <p className="text-lg text-muted-foreground mb-8">
            From wireframes to high-fidelity prototypes, I bridge the gap between 
            design and development to create solutions that are both beautiful and functional.
          </p>

          <Button
            onClick={scrollToShowcase}
            size="lg"
            className="bg-theme-primary hover:bg-theme-secondary text-black font-semibold px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105"
          >
            Explore My Work
            <ArrowDown className="ml-2 h-5 w-5" />
          </Button>
        </PageHeader>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-theme-primary/10 to-theme-primary/5 rounded-xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
            <div className="relative bg-card border border-border rounded-xl p-6 hover:border-theme-primary/50 transition-all duration-300">
              <div className="text-4xl font-bold bg-gradient-to-r from-theme-primary to-theme-accent bg-clip-text text-transparent mb-2">
                5+
              </div>
              <div className="text-sm font-medium text-muted-foreground">Years of Design</div>
            </div>
          </div>
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-theme-primary/10 to-theme-primary/5 rounded-xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
            <div className="relative bg-card border border-border rounded-xl p-6 hover:border-theme-primary/50 transition-all duration-300">
              <div className="text-4xl font-bold bg-gradient-to-r from-theme-primary to-theme-accent bg-clip-text text-transparent mb-2">
                20+
              </div>
              <div className="text-sm font-medium text-muted-foreground">Design Projects</div>
            </div>
          </div>
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-theme-primary/10 to-theme-primary/5 rounded-xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
            <div className="relative bg-card border border-border rounded-xl p-6 hover:border-theme-primary/50 transition-all duration-300">
              <div className="text-4xl font-bold bg-gradient-to-r from-theme-primary to-theme-accent bg-clip-text text-transparent mb-2">
                100%
              </div>
              <div className="text-sm font-medium text-muted-foreground">User-Centered</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
