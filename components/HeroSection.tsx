"use client";

import { ContactButton } from "./ContactButton";
import { ThemedButton } from "./ui/themed-button";
import { Download } from "lucide-react";
import { TypingAnimation, FadeIn, AnimatedBackground, FloatingElement } from "./react-bits";

export function HeroSection() {

  const downloadResume = () => {
    const resumeUrl = "/Hany_Elsaydawy_Resume.pdf";
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

      <div className="relative z-20 max-w-4xl mx-auto px-6 text-center">
        <div className="mb-10">
          <FadeIn delay={0.1} direction="down">
            <h2 className="text-foreground text-xl mb-2">
              👋 Hi, I'm Hany El Saydawy{" "}
            </h2>
          </FadeIn>
          
          <FadeIn delay={0.3} direction="up">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 pb-2 bg-gradient-to-r from-theme-accent via-theme-primary to-theme-accent bg-clip-text text-transparent">
              <TypingAnimation 
                text={["A Fullstack Engineer", "Frontend Developer", "Team Lead", "A UI/UX Designer", "A Problem Solver"]}
                duration={80}
                delay={800}
                loop={true}
                pauseDuration={3000}
              />
            </h1>
          </FadeIn>
          
          <FadeIn delay={0.5} direction="up">
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              I craft accessible, high-performance digital products
              <br />
              turning complex problems into elegant, scalable solutions.
              <br />
              <br />
              <span className="text-sm font-light">
                Available for freelance, contract, and consulting work
              </span>
              <br />
              <span className="text-sm font-light">based in Berlin 🇩🇪</span>
            </p>
          </FadeIn>
        </div>

        <FadeIn delay={0.7} direction="up">
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <ContactButton 
              variant="outline"
              size="lg"
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
    </section>
  );
}
