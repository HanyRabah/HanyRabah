import { WallpapersPage } from "@/components/WallpapersPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wallpapers - Free Desktop & Mobile Wallpapers | Hany Rabah",
  description: "Download beautiful, high-quality wallpapers for your desktop and mobile devices. Free wallpapers created with care for developers, designers, and tech enthusiasts.",
  keywords: [
    "wallpapers",
    "desktop wallpapers",
    "mobile wallpapers",
    "4K wallpapers",
    "HD wallpapers",
    "free wallpapers",
    "minimalist wallpapers",
    "tech wallpapers",
    "gradient wallpapers",
    "abstract wallpapers"
  ],
  openGraph: {
    title: "Wallpapers - Free Desktop & Mobile Wallpapers",
    description: "Download beautiful, high-quality wallpapers for your desktop and mobile devices.",
    type: "website",
  },
};

export default function Wallpapers() {
  return <WallpapersPage />;
}
