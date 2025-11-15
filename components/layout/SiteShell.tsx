"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useState, useEffect } from "react";
import {
  Home,
  Briefcase,
  PenSquare,
  Sparkles,
  BookMarked,
  ShoppingBag,
  Palette,
  Star,
  Users,
  Newspaper,
  Podcast,
  Mail,
  LayoutGrid,
  Shield,
  FileText,
  Linkedin,
  Github,
  Instagram,
  Menu,
  X,
} from "lucide-react";
import Image from "next/image";
//import { ThemeSwitcher } from "@/components/ThemeSwitcher";

const NAV_ITEMS = [
  { label: "Home", href: "/", icon: Home },
  { label: "About", href: "/about", icon: Sparkles },
  { label: "Projects", href: "/projects", icon: Briefcase },
  { label: "Design", href: "/design", icon: Palette },
  { label: "Services", href: "/services", icon: LayoutGrid },
  { label: "Blog / Writing", href: "/blog", icon: PenSquare },
  { label: "Contact", href: "/contact", icon: Mail },
];

const RESOURCE_ITEMS = [
  { label: "Reading List", href: "/reading-list", icon: BookMarked },
  { label: "Tech Essentials", href: "/tech-essentials", icon: Sparkles },
  { label: "Wallpapers", href: "/wallpapers", icon: ShoppingBag },
  { label: "Talent", href: "/talent", icon: Users },
  { label: "Investments", href: "/investments", icon: Star },
  { label: "Newsletters", href: "/newsletters", icon: Newspaper },
  { label: "Podcasts", href: "/podcasts", icon: Podcast },
];

const LEGAL_ITEMS = [
  { label: "Privacy Policy", href: "/privacy", icon: Shield },
  { label: "Terms of Service", href: "/terms", icon: FileText },
];

const SOCIAL_ITEMS = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/hanyrabah/", icon: Linkedin },
  { label: "GitHub", href: "https://github.com/HanyRabah", icon: Github },
  { label: "Email", href: "mailto:contact@hanyrabah.com", icon: Mail },
  { label: "Instagram", href: "https://www.instagram.com/hany.rabah/", icon: Instagram },
];

function classNames(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

function NavigationSection({
  title,
  items,
  activePath,
  onItemClick,
}: {
  title: string;
  items: { label: string; href: string; icon: React.ComponentType<{ className?: string }> }[];
  activePath: string;
  onItemClick?: () => void;
}) {
  return (
    <div>
      <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3">{title}</p>
      <nav className="flex flex-col gap-1">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = activePath === item.href;

          return (
            <Link
              key={item.label}
              href={item.href}
              onClick={onItemClick}
              className={classNames(
                "group flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                "hover:bg-muted hover:text-foreground",
                isActive ? "bg-muted text-foreground" : "text-muted-foreground"
              )}
              scroll={item.href.startsWith("/#") ? false : undefined}
            >
              <Icon className="h-4 w-4" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

interface SiteShellProps {
  children: React.ReactNode;
}

export function SiteShell({ children }: SiteShellProps) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const activePath = useMemo(() => {
    if (!pathname) {
      return "/";
    }

    const resourceMatch = RESOURCE_ITEMS.find((item) => pathname.startsWith(item.href));
    if (resourceMatch) {
      return resourceMatch.href;
    }

    if (pathname.startsWith("/blog")) {
      return "/blog";
    }

    if (pathname.startsWith("/projects")) {
      return "/projects";
    }

    if (pathname.startsWith("/design")) {
      return "/design";
    }

    return pathname;
  }, [pathname]);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <div className="flex min-h-screen w-full bg-background text-foreground">
      {/* Mobile Header */}
      <div className="md:!hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between border-b border-border/40 bg-background/95 backdrop-blur px-4 py-3">
        <Link href="/" onClick={closeMobileMenu}>
          <Image src="/logo.webp" alt="Logo" width={80} height={56} />
        </Link>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-lg text-foreground transition-colors hover:bg-muted"
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="md:!hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
          onClick={closeMobileMenu}
          aria-hidden="true"
        />
      )}

      {/* Mobile Sidebar */}
      <aside
        className={classNames(
          "fixed top-0 left-0 bottom-0 z-50 w-[280px] transition-transform duration-300 ease-in-out md:!hidden",
          "flex flex-col border-r border-border/40 bg-background p-6 overflow-y-auto",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-1 flex-col">
          <Link href="/" onClick={closeMobileMenu} className="group mb-8 flex items-center justify-center gap-3">
            <Image src="/logo.webp" alt="Logo" width={100} height={70} />
          </Link>

          <div className="flex flex-1 flex-col gap-10">
            <div className="space-y-8">
              <NavigationSection title="Navigate" items={NAV_ITEMS} activePath={activePath} onItemClick={closeMobileMenu} />
              <NavigationSection title="Resources" items={RESOURCE_ITEMS} activePath={activePath} onItemClick={closeMobileMenu} />
              <NavigationSection title="Legal" items={LEGAL_ITEMS} activePath={activePath} onItemClick={closeMobileMenu} />
            </div>

            <div className="mt-auto space-y-3 pb-6">
              <p className="text-xs uppercase tracking-widest text-muted-foreground">Connect</p>
              <div className="flex gap-2">
                {SOCIAL_ITEMS.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-border/40 text-muted-foreground transition-colors hover:border-theme-primary hover:text-theme-primary"
                    >
                      <Icon className="h-4 w-4" />
                    </Link>
                  );
                })}
              </div>
              <div className="text-xs pt-4 border-t border-border text-center">
                <p className="text-muted-foreground">
                  © {new Date().getFullYear()}. All rights reserved.
                </p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Desktop Sidebar */}
      <aside className="max-md:hidden lg:flex sticky top-0 h-screen w-[280px] flex-col border-r border-border/40 bg-background/80 backdrop-blur p-6">
        <Link href="/" className="group mb-4 flex items-center justify-center gap-3">
          <Image src="/logo.webp" alt="Logo" width={100} height={70} />
        </Link>

        <div className="flex flex-1 flex-col gap-10">
          <div className="space-y-8">
            <NavigationSection title="Navigate" items={NAV_ITEMS} activePath={activePath} />
            <NavigationSection title="Resources" items={RESOURCE_ITEMS} activePath={activePath} />
            <NavigationSection title="Legal" items={LEGAL_ITEMS} activePath={activePath} />
          </div>

          <div className="mt-auto space-y-3">
            <p className="text-xs uppercase tracking-widest text-muted-foreground">Connect</p>
            <div className="flex gap-2">
              {SOCIAL_ITEMS.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-border/40 text-muted-foreground transition-colors hover:border-theme-primary hover:text-theme-primary"
                  >
                    <Icon className="h-4 w-4" />
                  </Link>
                );
              })}
            </div>
            <div className="text-xs mt-24 pt-8 border-t border-border text-center">
              <p className="text-muted-foreground">
                © {new Date().getFullYear()}. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto md:mt-0 mt-[60px]">
        <div className="">
          {children}
        </div>
      </main>
    </div>
  );
}
