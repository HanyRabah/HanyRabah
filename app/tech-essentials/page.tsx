import { TechEssentialsPage } from "@/components/TechEssentialsPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tech Essentials - Curated Tech Products & Software | Hany Rabah",
  description: "Discover carefully curated tech products, software tools, and gadgets that enhance productivity and creativity. Recommendations for developers, designers, and tech enthusiasts.",
  keywords: [
    "tech essentials",
    "tech products",
    "software recommendations",
    "developer tools",
    "productivity gadgets",
    "tech gear",
    "coding tools",
    "design software",
    "tech accessories",
    "developer recommendations"
  ],
  openGraph: {
    title: "Tech Essentials - Curated Tech Products & Software",
    description: "Discover carefully curated tech products, software tools, and gadgets that enhance productivity and creativity.",
    type: "website",
  },
};

export default function TechEssentials() {
  return <TechEssentialsPage />;
}
