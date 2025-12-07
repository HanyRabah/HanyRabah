"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { XIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SideDrawerProps {
  open: boolean;
  onClose: () => void;
  anchor?: "left" | "right" | "top" | "bottom";
  children: React.ReactNode;
  className?: string;
  width?: string | number;
  closeOnOverlayClick?: boolean;
  showCloseButton?: boolean;
}

export function SideDrawer({
  open,
  onClose,
  anchor = "right",
  children,
  className,
  width = 500,
  closeOnOverlayClick = true,
  showCloseButton = true,
}: SideDrawerProps) {
  // Lock body scroll when drawer is open
  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);

  // Handle ESC key
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [open, onClose]);

  // Animation variants based on anchor
  const getSlideVariants = () => {
    switch (anchor) {
      case "left":
        return {
          initial: { x: "-100%" },
          animate: { x: 0 },
          exit: { x: "-100%" },
        };
      case "right":
        return {
          initial: { x: "100%" },
          animate: { x: 0 },
          exit: { x: "100%" },
        };
      case "top":
        return {
          initial: { y: "-100%" },
          animate: { y: 0 },
          exit: { y: "-100%" },
        };
      case "bottom":
        return {
          initial: { y: "100%" },
          animate: { y: 0 },
          exit: { y: "100%" },
        };
      default:
        return {
          initial: { x: "100%" },
          animate: { x: 0 },
          exit: { x: "100%" },
        };
    }
  };

  // Get drawer positioning classes
  const getPositionClasses = () => {
    switch (anchor) {
      case "left":
        return "left-0 top-0 h-full";
      case "right":
        return "right-0 top-0 h-full";
      case "top":
        return "top-0 left-0 w-full";
      case "bottom":
        return "bottom-0 left-0 w-full";
      default:
        return "right-0 top-0 h-full";
    }
  };

  // Get drawer size
  const getSizeStyle = () => {
    if (anchor === "left" || anchor === "right") {
      return {
        width: typeof width === "number" ? `${width}px` : width,
        maxWidth: "100vw",
      };
    } else {
      return {
        height: typeof width === "number" ? `${width}px` : width,
        maxHeight: "100vh",
      };
    }
  };

  const slideVariants = getSlideVariants();

  return (
    <AnimatePresence>
      {open && (
        <React.Fragment key="drawer-wrapper">
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            onClick={closeOnOverlayClick ? onClose : undefined}
            className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm"
            aria-hidden="true"
          />

          {/* Drawer */}
          <motion.div
            initial={slideVariants.initial}
            animate={slideVariants.animate}
            exit={slideVariants.exit}
            transition={{
              type: "tween",
              duration: 0.3,
              ease: "easeInOut",
            }}
            style={getSizeStyle()}
            className={cn(
              "fixed z-[101] bg-background shadow-xl",
              getPositionClasses(),
              anchor === "left" && "border-r border-border",
              anchor === "right" && "border-l border-border",
              anchor === "top" && "border-b border-border",
              anchor === "bottom" && "border-t border-border",
              className
            )}
            role="dialog"
            aria-modal="true"
          >
            {/* Close button */}
            {showCloseButton && (
              <button
                onClick={onClose}
                className={cn(
                  "absolute z-10 p-2 rounded-md hover:bg-accent transition-colors",
                  anchor === "right" && "top-4 right-4",
                  anchor === "left" && "top-4 left-4",
                  anchor === "top" && "top-4 right-4",
                  anchor === "bottom" && "bottom-4 right-4"
                )}
                aria-label="Close drawer"
              >
                <XIcon className="h-5 w-5" />
              </button>
            )}

            {/* Content */}
            <div className="h-full w-full overflow-hidden">{children}</div>
          </motion.div>
        </React.Fragment>
      )}
    </AnimatePresence>
  );
}

// Helper components for drawer structure
export function DrawerHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex flex-col gap-2 border-b border-border p-6 flex-shrink-0",
        className
      )}
      {...props}
    />
  );
}

export function DrawerBody({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("flex-1 overflow-y-auto p-6", className)}
      {...props}
    />
  );
}

export function DrawerFooter({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex gap-3 border-t border-border p-6 flex-shrink-0",
        className
      )}
      {...props}
    />
  );
}
