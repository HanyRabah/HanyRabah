"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
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
}: {
  title: string;
  items: { label: string; href: string; icon: React.ComponentType<{ className?: string }> }[];
  activePath: string;
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

  return (
    <div className="flex min-h-screen w-full bg-background text-foreground">
      {/* Desktop Sidebar */}
      <aside className="sticky top-0 flex h-screen w-[280px] flex-col border-r border-border/40 bg-background/80 p-6 backdrop-blur">
        <div className="flex flex-1 flex-col">
          <Link href="/" className="group mb-4 flex items-center justify-center gap-3">
            {/* <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-theme-primary/15 text-theme-primary">
              <Sparkles className="h-5 w-5 transition-transform group-hover:rotate-6" />
            </div> */}
            {/* <div> */}
              {/* <p className="text-sm font-semibold">Hany Rabah</p>
              <p className="text-xs text-muted-foreground">Technical Lead & Fullstack Engineer</p> */}
              <Image src="/logo.webp" alt="Logo" width={100} height={70} />
            {/* </div> */}
          </Link>

          <div className="flex flex-1 flex-col gap-10">
            <div className="space-y-8">
              <NavigationSection title="Navigate" items={NAV_ITEMS} activePath={activePath} />
              <NavigationSection title="Resources" items={RESOURCE_ITEMS} activePath={activePath} />
              <NavigationSection title="Legal" items={LEGAL_ITEMS} activePath={activePath} />
            </div>

            <div className="mt-auto space-y-3">
              <p className="text-xs uppercase tracking-widest text-muted-foreground">Connect</p>
              {/* <div className="flex items-center gap-2 rounded-lg border border-border/50 bg-muted/20 px-3 py-2">
                <ThemeSwitcher />
                <span className="text-xs text-muted-foreground">Toggle theme</span>
              </div> */}
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
              {/* <p className="text-xs leading-relaxed text-muted-foreground">
                Some links are affiliate links, which means I may earn a small commission at no extra cost to you.
              </p> */}
              <div className="text-xs mt-24 pt-8 border-t border-border text-center">
          <p className="text-muted-foreground">
            © {new Date().getFullYear()}. All rights reserved.
          </p>
        </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="">
          {children}
        </div>
      </main>
    </div>
  );
}
