"use client";

import { Quote, Star } from "lucide-react";
import { FadeIn, ScrollReveal } from "./react-bits";
import Image from "next/image";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  quote: string;
  avatar?: string;
}

// Real LinkedIn recommendations — see linkedin.com/in/hanyrabah/details/recommendations/
const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Ibrahim AbouAlnaga",
    role: "Software Development Manager",
    company: "Amazon Web Services (AWS)",
    quote:
      "Hany has multiverse domain knowledge in Frontend Development, and his UI/UX background lets him write code that actually counts for the user. I've watched him grow — technically and personally — and he never misses an opportunity to learn something new.",
  },
  {
    id: "2",
    name: "Sami Eltamawy",
    role: "Founder & Principal Security Architect",
    company: "DeepGuards · Ex-Meta",
    quote:
      "Hany dedicated an hour a day to help and mentor colleagues while making sure his own deliverables were on time. He contributed to patching security vulnerabilities in the platform, stayed late when it mattered, and is genuinely eager to keep learning. I recommend him for any role.",
  },
  {
    id: "3",
    name: "Mohit Sharma",
    role: "Engineering Leader",
    company: "Ex-dubizzle",
    quote:
      "Hany doesn't just build features — he tries to understand impact: does this solve a user problem, or a business problem? He suggests new ideas, takes lead on things that make developer life easier, and gives up planned leaves to get releases out.",
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-24 px-6 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <FadeIn direction="up">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What Colleagues Say
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Feedback from engineering leaders and teammates I've worked with
            </p>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <ScrollReveal key={testimonial.id} direction="up" delay={0.1 * index}>
              <div className="bg-card border border-border rounded-2xl p-8 h-full flex flex-col relative">
                <Quote className="absolute top-6 right-6 w-8 h-8 text-theme-primary/20" />
                
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-theme-primary text-theme-primary" />
                  ))}
                </div>

                <blockquote className="text-foreground leading-relaxed mb-6 flex-grow">
                  "{testimonial.quote}"
                </blockquote>

                <div className="flex items-center gap-3 pt-4 border-t border-border">
                  <div className="w-10 h-10 rounded-full bg-theme-primary/10 flex items-center justify-center text-theme-primary font-semibold">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium text-sm">{testimonial.name}</p>
                    <p className="text-muted-foreground text-xs">
                      {testimonial.role} at {testimonial.company}
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
