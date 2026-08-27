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
// Distilled to the lead-signalling passages of each full text.
const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Mohit Sharma",
    role: "Engineering Leader",
    company: "Ex-dubizzle",
    quote:
      "Hany doesn't just do the task — he questions it. Does this solve a user problem, or a business problem? He takes lead on the things that make developer life easier, and pushes new ideas to complement the existing business.",
  },
  {
    id: "2",
    name: "Sami Eltamawy",
    role: "Founder & Principal Security Architect",
    company: "DeepGuards · Ex-Meta",
    quote:
      "Hany was the technical mentor teammates went to when they needed to level up. He dedicated an hour a day to mentoring colleagues while still hitting his own deliverables, and joined the dubizzle security guild to patch vulnerabilities across the platform. I recommend him for any role.",
  },
  {
    id: "3",
    name: "Ibrahim AbouAlnaga",
    role: "Software Development Manager",
    company: "Amazon Web Services (AWS)",
    quote:
      "I met Hany when I joined dubizzle — from day one he was the one supporting my onboarding, and that told me everything about him. He has multiverse domain knowledge in frontend, and his UI/UX background means every piece of code he ships actually counts for the user. Teams get better around him.",
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
