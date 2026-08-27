"use client";

import { ContactButton } from "./ContactButton";
import { ThemedButton } from "./ui/themed-button";
import { Download } from "lucide-react";
import { TypingAnimation, FadeIn, AnimatedBackground, FloatingElement } from "./react-bits";
import Image from "next/image";

export function HeroSection() {

  const downloadResume = () => {
    const resumeUrl = "/Hany_Elsaydawy_full-stack_engineer.pdf";
    window.open(resumeUrl, "_blank");
  };

  return (
    <section
      id="hero"
      className="min-h-[calc(75vh)] flex items-center justify-center relative overflow-hidden"
    >
      {/* Animated gradient background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-br from-theme-primary/20 via-background to-green-accent/20 animate-gradient"></div>
      </div>

      {/* Animated dot pattern */}
      <AnimatedBackground variant="dots" opacity={0.05} />

      {/* Floating decorative elements */}
      <FloatingElement className="absolute top-20 left-10 w-3 h-3 rounded-full bg-theme-primary/30" duration={4} />
      <FloatingElement className="absolute top-40 right-20 w-2 h-2 rounded-full bg-theme-secondary/30" duration={5} delay={1} />
      <FloatingElement className="absolute bottom-32 left-1/4 w-4 h-4 rounded-full bg-theme-accent/20" duration={6} delay={2} />

      <div className="relative z-20 max-w-5xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center gap-12">
          {/* Headshot */}
          <FadeIn delay={0.1} direction="up" className="flex-shrink-0">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-theme-primary to-theme-secondary rounded-full blur-xl opacity-30"></div>
              <div className="relative w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-background shadow-2xl">
                <Image
                  src="/headshot.jpg"
                  alt="Hany Rabah - Senior Fullstack Engineer"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </FadeIn>

          {/* Content */}
          <div className="text-center md:text-left">
            <FadeIn delay={0.2} direction="down">
              <h2 className="text-foreground text-xl mb-2">
                👋 Hi, I'm Hany Rabah{" "}
              </h2>
            </FadeIn>
            
            <FadeIn delay={0.3} direction="up">
              {/* Static H1 for SEO - full text always in DOM */}
              <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4 pb-2">
                <span className="sr-only">Senior Fullstack Engineer & Team Lead</span>
                <span aria-hidden="true" className="bg-gradient-to-r from-theme-accent via-theme-primary to-theme-accent bg-clip-text text-transparent">
                  <TypingAnimation 
                    text={["Senior Fullstack Engineer", "Technical Team Lead", "Frontend Architect", "Fullstack Developer"]}
                    duration={80}
                    delay={500}
                    loop={true}
                    pauseDuration={3000}
                  />
                </span>
              </h1>
            </FadeIn>
            
            <FadeIn delay={0.5} direction="up">
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed mb-6">
                15+ years building scalable fintech and marketplace platforms.
                Led teams at <strong className="text-foreground">OLX Group</strong> and <strong className="text-foreground">Diligent (YC W24)</strong>.
                React, Next.js, Node.js, AWS specialist.
              </p>
              <p className="text-sm text-muted-foreground mb-8">
                <span className="inline-flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  Open to full-time senior engineering roles • Based in Cairo 🇪🇬 · Open to remote
                </span>
              </p>
            </FadeIn>

            <FadeIn delay={0.7} direction="up">
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start items-center">
                <ContactButton 
                  variant="outline"
                  size="lg"
                  defaultReason="WORK"
                />

                <ThemedButton
                  onClick={downloadResume}
                  variant="secondary"
                  size="lg"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download Resume
                </ThemedButton>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
