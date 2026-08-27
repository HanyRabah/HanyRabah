"use client";

import { Briefcase, Code, TrendingUp } from "lucide-react";
import Link from "next/link";

interface InfoBlock {
  id: string;
  title: string;
  content: string;
  icon: React.ComponentType<{ className?: string }>;
  link?: string;
  linkText?: string;
  highlight?: boolean;
}

export function InfoBlocks() {
  const infoBlocks: InfoBlock[] = [
    {
      id: "status",
      title: "Open to Opportunities",
      content: "Currently open to full-time Senior / Lead FE or Full-Stack roles — remote-first, based in Cairo, targeting EU / Germany / UAE / Saudi.",
      icon: Briefcase,
      link: "/contact",
      linkText: "Get in touch",
      highlight: true,
    },
    {
      id: "current",
      title: "What I'm Working On",
      content: "Founder + lead engineer at Carizmo — subscription-based mobile car-wash service, live on iOS + Android. Full monorepo: React Native, Next.js admin/landing/docs, Node.js API, WhatsApp gateway, PostgreSQL, AWS.",
      icon: Code,
      link: "https://carizmo.app",
      linkText: "See Carizmo",
    },
    {
      id: "handbook",
      title: "Engineering Lead Handbook",
      content: "Opinionated notes from 15+ years shipping — how I lead frontend and full-stack teams, review code, design APIs, run releases, and coach engineers.",
      icon: TrendingUp,
      link: "https://handbook.hanyrabah.com/",
      linkText: "Read the handbook",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-12">
      {infoBlocks.map((block) => {
        const Icon = block.icon;
        return (
          <div
            key={block.id}
            className={`p-6 rounded-2xl border transition-all duration-300 hover:shadow-lg hover:border-theme-primary/50 ${
              block.highlight 
                ? "bg-theme-primary/5 border-theme-primary/30" 
                : "bg-card/50 backdrop-blur-sm border-border/50"
            }`}
          >
            <div className="flex items-start gap-4">
              <div className={`flex h-10 w-10 items-center justify-center rounded-full flex-shrink-0 ${
                block.highlight 
                  ? "bg-theme-primary/20 text-theme-primary" 
                  : "bg-muted text-muted-foreground"
              }`}>
                <Icon className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold mb-2">{block.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                  {block.content}
                </p>
                {block.link && block.linkText && (
                  <Link
                    href={block.link}
                    target={block.link.startsWith("http") ? "_blank" : undefined}
                    rel={block.link.startsWith("http") ? "noreferrer" : undefined}
                    className="inline-flex items-center text-sm text-theme-primary hover:text-theme-primary/80 transition-colors"
                  >
                    {block.linkText} →
                  </Link>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
