"use client";

import { useState, useEffect } from "react";
import { ThemedButton } from "@/components/ui/themed-button";
import { useContactDrawer } from "@/contexts/ContactDrawerContext";
import { Mail } from "lucide-react";
import { ClickSpark } from "./react-bits";

interface ContactButtonProps {
  variant?: "default" | "outline" | "ghost" | "link" | "secondary";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
  defaultReason?: string;
  children?: React.ReactNode;
  showIcon?: boolean;
}

export function ContactButton({
  variant = "default",
  size = "lg",
  className = "",
  defaultReason,
  children,
  showIcon = true,
}: ContactButtonProps) {
  const [mounted, setMounted] = useState(false);
  const { openDrawer } = useContactDrawer();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Return a placeholder button during SSR
    return (
      <ThemedButton
        variant={variant}
        size={size}
        className={className}
        disabled
      >
        {showIcon && <Mail className="mr-2 h-4 w-4" />}
        {children || "Contact Me"}
      </ThemedButton>
    );
  }

  return (
    <ClickSpark sparkColor="var(--theme-primary)">
      <ThemedButton
        variant={variant}
        size={size}
        className={className}
        onClick={() => openDrawer(defaultReason)}
      >
        {showIcon && <Mail className="mr-2 h-4 w-4" />}
        {children || "Contact Me"}
      </ThemedButton>
    </ClickSpark>
  );
}