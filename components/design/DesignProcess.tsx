"use client";
import { Search, Lightbulb, Palette, Code, TestTube, Rocket } from "lucide-react";

export function DesignProcess() {
  const processSteps = [
    {
      icon: Search,
      title: "Research & Discovery",
      description: "Understanding user needs, business goals, and market context through research and stakeholder interviews.",
      details: ["User interviews", "Competitive analysis", "Requirements gathering", "Persona development"]
    },
    {
      icon: Lightbulb,
      title: "Ideation & Strategy",
      description: "Brainstorming solutions, defining user journeys, and creating strategic design approaches.",
      details: ["User journey mapping", "Information architecture", "Wireframing", "Concept development"]
    },
    {
      icon: Palette,
      title: "Visual Design",
      description: "Creating high-fidelity designs with attention to typography, color, and visual hierarchy.",
      details: ["UI design", "Design systems", "Visual identity", "Responsive layouts"]
    },
    {
      icon: Code,
      title: "Prototyping",
      description: "Building interactive prototypes to validate design concepts and user flows.",
      details: ["Interactive prototypes", "Micro-interactions", "Animation design", "Usability testing"]
    },
    {
      icon: TestTube,
      title: "Testing & Iteration",
      description: "Validating designs through user testing and iterating based on feedback and data.",
      details: ["User testing", "A/B testing", "Analytics review", "Design refinement"]
    },
    {
      icon: Rocket,
      title: "Implementation",
      description: "Collaborating with developers to ensure pixel-perfect implementation and optimal user experience.",
      details: ["Developer handoff", "Design QA", "Performance optimization", "Launch support"]
    }
  ];

  return (
    <section className="py-24 px-6 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-theme-primary">
            My Design Process
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A systematic approach to creating user-centered designs that solve real problems 
            and deliver measurable results.
          </p>
        </div>

        {/* Process Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {processSteps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <div
                key={index}
                className="relative bg-background border border-border rounded-xl p-6 hover:shadow-lg transition-all duration-300 group"
              >
                {/* Step Number */}
                <div className="absolute -top-4 -left-4 w-8 h-8 bg-theme-primary text-black rounded-full flex items-center justify-center text-sm font-bold">
                  {index + 1}
                </div>

                {/* Icon */}
                <div className="mb-4">
                  <div className="w-12 h-12 bg-theme-primary/10 rounded-lg flex items-center justify-center group-hover:bg-theme-primary/20 transition-colors">
                    <IconComponent className="w-6 h-6 text-theme-primary" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold mb-3 text-foreground group-hover:text-theme-primary transition-colors">
                  {step.title}
                </h3>
                
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {step.description}
                </p>

                {/* Details */}
                <ul className="space-y-2">
                  {step.details.map((detail, detailIndex) => (
                    <li key={detailIndex} className="flex items-center text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 bg-theme-primary rounded-full mr-3 flex-shrink-0"></div>
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Bottom Section */}
        <div className="mt-16 text-center">
          <div className="bg-background border border-border rounded-xl p-8">
            <h3 className="text-2xl font-semibold mb-4 text-theme-primary">
              Ready to Start Your Project?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Let's discuss how we can bring your ideas to life with thoughtful design 
              and seamless user experiences.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => window.location.href = '/#contact'}
                className="px-6 py-3 bg-theme-primary text-black font-semibold rounded-lg hover:bg-theme-secondary transition-colors"
              >
                Start a Project
              </button>
              <button
                onClick={() => window.location.href = '/'}
                className="px-6 py-3 border border-theme-primary text-theme-primary font-semibold rounded-lg hover:bg-theme-primary/10 transition-colors"
              >
                View All Work
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
