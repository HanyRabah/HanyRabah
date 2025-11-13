import { LucideIcon } from "lucide-react";
import { ReactNode } from "react";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  description?: string;
  icon?: LucideIcon;
  icons?: LucideIcon[];
  gradient?: boolean;
  splitColor?: boolean;
  children?: ReactNode;
}

export function PageHeader({
  title,
  subtitle,
  description,
  icon: Icon,
  icons,
  gradient = true,
  splitColor = false,
  children,
}: PageHeaderProps) {
  return (
    <div className="text-center py-16 px-2">
      {/* Icons Row */}
      {icons && icons.length > 0 && (
        <div className="flex items-center justify-center gap-6 mb-8">
          {icons.map((IconComponent, index) => (
            <IconComponent
              key={index}
              className="h-12 w-12 text-theme-primary"
              strokeWidth={1.5}
            />
          ))}
        </div>
      )}

      {/* Single Icon */}
      {Icon && !icons && (
        <div className="flex items-center justify-center mb-6">
          <Icon className="h-12 w-12 text-theme-primary" strokeWidth={1.5} />
        </div>
      )}

      {/* Subtitle */}
      {subtitle && (
        <p className="text-lg text-muted-foreground mb-4 flex items-center justify-center gap-2">
          {subtitle}
        </p>
      )}

      {/* Title */}
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
        {gradient ? (
            // <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground via-theme-primary to-green-accent bg-clip-text text-transparent">
          <span className="bg-gradient-to-r from-theme-accent via-theme-primary to-theme-accent bg-clip-text text-transparent">
            {title}
          </span>
        ) : splitColor ? (
          <>
            {title.split(" ").map((word, index) => (
              <span
                key={index}
                className={
                  index === 0
                    ? "text-theme-primary"
                    : "text-foreground"
                }
              >
                {word}{" "}
              </span>
            ))}
          </>
        ) : (
          title
        )}
      </h1>

      {/* Description */}
      {description && (
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          {description}
        </p>
      )}

      {/* Custom Children */}
      {children && <div className="mt-8">{children}</div>}
    </div>
  );
}
