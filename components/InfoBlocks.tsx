"use client";

import { useEffect, useState } from "react";
import { 
  MapPin, 
  Briefcase, 
  Code, 
  TrendingUp
} from "lucide-react";
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
  const [currentTime, setCurrentTime] = useState<string>("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const updateTime = () => {
      const cairoTime = new Date().toLocaleString("en-US", {
        timeZone: "Africa/Cairo",
        weekday: "long",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
      setCurrentTime(cairoTime);
    };

    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  const infoBlocks: InfoBlock[] = [
    {
      id: "location",
      title: "Currently in Cairo",
      content: mounted ? `${currentTime} (EET)` : "Loading time...",
      icon: MapPin,
      highlight: true,
    },
    {
      id: "status",
      title: "Open to Opportunities",
      content: "Currently open to full-time senior engineering roles and technical leadership positions. Let's build something impactful together.",
      icon: Briefcase,
      link: "/contact",
      linkText: "Get in touch",
    },
    {
      id: "current",
      title: "What I'm Working On",
      content: "Building Paylane at Diligent (YC W24) - scalable payment infrastructure with React, Node.js, and AWS. Led React 19 migration across 250+ files.",
      icon: Code,
      link: "/work",
      linkText: "View work",
    },
    {
      id: "growth",
      title: "15+ Years Growing",
      content: "From junior developer to technical lead, constantly evolving with technology and leading teams to success.",
      icon: TrendingUp,
      link: "/about",
      linkText: "My journey",
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
