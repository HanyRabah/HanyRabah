
"use client";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Download } from "lucide-react";

export function AboutSection() {
  const techSkills = [
    "React",
    "TypeScript",
    "Node.js",
    "PostgreSQL",
    "AWS",
    "Docker",
    "GraphQL",
    "Next.js",
    "Tailwind CSS",
    "MongoDB",
  ];

  const softSkills = [
    "Technical Leadership",
    "System Architecture",
    "Code Review",
    "Team Mentoring",
    "Project Planning",
    "Agile/Scrum",
  ];

  const languages = [
    "English (Fluent)",
    "Arabic (Native)",
    "German (Conversational)",
  ];

  const downloadResume = () => {
    const resumeUrl = "/Hany_Elsaydawy_Aug_2025.pdf";
    window.open(resumeUrl, "_blank");
  };

  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-1 gap-16 items-start">
          {/* Profile Image */}
          {/* <div className="relative">
            <div className="relative w-80 h-80 mx-auto lg:mx-0">
              <div className="absolute inset-0 bg-gradient-to-br from-teal-primary to-green-accent rounded-2xl blur-xl opacity-20"></div>
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face"
                alt="Hany El Saydawy"
                className="relative z-10 w-full h-full object-cover rounded-2xl border-2 border-teal-primary/20"
              />
            </div>
          </div> */}

          {/* Bio and Content */}
          <div className="space-y-16">
            <div>
              <h2 className="text-center text-3xl md:text-4xl font-bold mb-6 text-teal-primary">
                About Me
              </h2>
              <div className="space-y-8 text-muted-foreground">
                <p>
                  I’m a Senior Fullstack Engineer and Technical Lead based in
                  Berlin, with over 15 years of experience building scalable,
                  high-performance web applications and leading engineering
                  teams.
                </p>
                <p>
                  My expertise lies in React, Next.js, Node.js, and AWS
                  delivering clean, maintainable code and user-centered design
                  systems across industries like fintech, classifieds, and
                  e-commerce.
                </p>
                <p>
                  Currently, I work at a fast-growing fintech startup{" "}
                  <a
                    href="https://www.godiligent.ai/"
                    className="text-teal-primary hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GoDiligent
                  </a>
                  , An AI-driven platform built to analyze complex customer data
                  and streamline due diligence for banks and fintech firms. I
                  contributed to the integration of AI agents into compliance
                  pipelines, developed interfaces to visualize risk insights,
                  and ensured the system provides full auditability for
                  enterprise-ready deployments.
                </p>
                <p>
                  I believe in mentoring, continuous learning, and building
                  bridges between design, product, and engineering.
                </p>
                <p>
                  When I’m not coding, you’ll find me traveling, behind the lens
                  doing photography, deep into a good book, or enjoying a
                  strategic game of chess.
                </p>
              </div>
            </div>

            {/* Skills Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-3 text-foreground">
                  Tech Stack
                </h3>
                <div className="flex flex-wrap gap-2">
                  {techSkills.map((skill) => (
                    <Badge
                      key={skill}
                      variant="secondary"
                      className="bg-teal-muted/20 text-teal-primary border-teal-primary/20"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3 text-foreground">
                  Leadership & Soft Skills
                </h3>
                <div className="flex flex-wrap gap-2">
                  {softSkills.map((skill) => (
                    <Badge
                      key={skill}
                      variant="secondary"
                      className="bg-green-accent/20 text-green-accent border-green-accent/20"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3 text-foreground">
                  Languages
                </h3>
                <div className="flex flex-wrap gap-2">
                  {languages.map((language) => (
                    <Badge
                      key={language}
                      variant="outline"
                      className="border-muted-foreground/20"
                    >
                      {language}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
            <div>
              <Button
                onClick={downloadResume}
                variant="outline"
                size="lg"
                className="border-teal-primary text-teal-primary hover:bg-teal-primary hover:text-white"
              >
                <Download className="mr-2 h-4 w-4" />
                Download Resume
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
