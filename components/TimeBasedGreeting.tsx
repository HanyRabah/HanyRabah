"use client";

import { useEffect, useState } from "react";
import { Sun, Moon, Coffee, Sunset } from "lucide-react";

interface GreetingData {
  greeting: string;
  message: string;
  icon: React.ComponentType<{ className?: string }>;
  timeInfo: string;
}

export function TimeBasedGreeting() {
  const [greeting, setGreeting] = useState<GreetingData | null>(null);
  const [currentTime, setCurrentTime] = useState<string>("");

  useEffect(() => {
    const updateGreeting = () => {
      const now = new Date();
      const cairoTime = new Date(now.toLocaleString("en-US", { timeZone: "Africa/Cairo" }));
      const hour = cairoTime.getHours();
      
      // Format time
      const timeString = cairoTime.toLocaleString("en-US", {
        timeZone: "Africa/Cairo",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });
      setCurrentTime(timeString);

      let greetingData: GreetingData;

      if (hour >= 5 && hour < 12) {
        greetingData = {
          greeting: "Good Morning!",
          message: "Starting the day with fresh ideas and clean code. Perfect time for deep work and creative problem-solving.",
          icon: Coffee,
          timeInfo: "Morning in Cairo"
        };
      } else if (hour >= 12 && hour < 17) {
        greetingData = {
          greeting: "Good Afternoon!",
          message: "Peak productivity hours. Currently building, collaborating, and bringing ideas to life.",
          icon: Sun,
          timeInfo: "Afternoon in Cairo"
        };
      } else if (hour >= 17 && hour < 21) {
        greetingData = {
          greeting: "Good Evening!",
          message: "Winding down but still passionate about great design and elegant solutions. Great time to connect!",
          icon: Sunset,
          timeInfo: "Evening in Cairo"
        };
      } else {
        greetingData = {
          greeting: "Good Evening!",
          message: "Late night coding session or early morning somewhere else? I appreciate the dedication to craft.",
          icon: Moon,
          timeInfo: "Night in Cairo"
        };
      }

      setGreeting(greetingData);
    };

    updateGreeting();
    const interval = setInterval(updateGreeting, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  if (!greeting) {
    return null; // Prevent hydration mismatch
  }

  const Icon = greeting.icon;

  return (
    <div className="mb-8 p-6 bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl">
      <div className="flex items-center gap-3 mb-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-theme-primary/15 text-theme-primary">
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <h3 className="font-semibold text-lg">{greeting.greeting}</h3>
          <p className="text-sm text-muted-foreground">
            {greeting.timeInfo} • {currentTime} CET
          </p>
        </div>
      </div>
      <p className="text-muted-foreground leading-relaxed">
        {greeting.message}
      </p>
    </div>
  );
}
