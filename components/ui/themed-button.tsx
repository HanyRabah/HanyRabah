"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ThemedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost" | "link" | "secondary";
  size?: "default" | "sm" | "lg" | "icon";
  children?: React.ReactNode;
  asChild?: boolean;
}

const ThemedButton = React.forwardRef<HTMLButtonElement, ThemedButtonProps>(
  ({ className, variant = "default", size = "lg", children, ...props }, ref) => {
    // Outline variant with border
    if (variant === "outline") {
      return (
        <Button
          ref={ref}
          variant="outline"
          size={size}
          className={cn(
            "border transition-colors hover:text-white",
            className
          )}
          style={
            {
              borderColor: "var(--theme-primary)",
              color: "var(--theme-primary)",
              "--hover-bg": "var(--theme-primary)",
            } as React.CSSProperties & { "--hover-bg": string }
          }
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "var(--theme-primary)";
            e.currentTarget.style.color = "white";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "transparent";
            e.currentTarget.style.color = "var(--theme-primary)";
          }}
          {...props}
        >
          {children}
        </Button>
      );
    }

    // Default/filled variant
    if (variant === "default") {
      return (
        <Button
          ref={ref}
          variant="default"
          size={size}
          className={cn(
            "transition-colors text-white",
            className
          )}
          style={
            {
              backgroundColor: "var(--theme-primary)",
              "--hover-bg": "var(--theme-secondary)",
            } as React.CSSProperties & { "--hover-bg": string }
          }
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "var(--theme-secondary)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "var(--theme-primary)";
          }}
          {...props}
        >
          {children}
        </Button>
      );
    }

    // Secondary variant (similar to default but with hover effect)
    if (variant === "secondary") {
      return (
        <Button
          ref={ref}
          variant="secondary"
          size={size}
          className={cn(
            "transition-colors hover:text-white",
            className
          )}
          style={
            {
              "--hover-bg": "var(--theme-primary)",
            } as React.CSSProperties & { "--hover-bg": string }
          }
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "var(--theme-primary)";
            e.currentTarget.style.color = "white";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "";
            e.currentTarget.style.color = "";
          }}
          {...props}
        >
          {children}
        </Button>
      );
    }

    // Ghost and link variants - minimal styling
    return (
      <Button
        ref={ref}
        variant={variant}
        size={size}
        className={cn(
          "transition-colors",
          variant === "ghost" && "hover:bg-theme-primary/10 hover:text-theme-primary",
          variant === "link" && "text-theme-primary hover:text-theme-secondary",
          className
        )}
        {...props}
      >
        {children}
      </Button>
    );
  }
);

ThemedButton.displayName = "ThemedButton";

export { ThemedButton };
