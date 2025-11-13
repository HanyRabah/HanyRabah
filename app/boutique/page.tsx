import { ResourcePage } from "@/components/ResourcePage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Boutique - Premium Tech & Design Tools | Hany Rabah",
  description: "Premium tools, software, and services that I personally use and recommend for developers, designers, and entrepreneurs. Quality over quantity.",
  keywords: [
    "premium tools",
    "developer tools",
    "design software",
    "productivity tools",
    "tech recommendations",
    "professional software",
    "design tools",
    "development tools",
    "premium services",
    "quality tools"
  ],
  openGraph: {
    title: "Boutique - Premium Tech & Design Tools",
    description: "Premium tools, software, and services that I personally use and recommend for developers, designers, and entrepreneurs. Quality over quantity.",
    type: "website",
  },
};

export default function BoutiquePage() {
  return (
    <ResourcePage
      type="boutique"
      title="Boutique"
      description="Premium tools, software, and services that I personally use and recommend. Carefully selected for quality, functionality, and value for developers, designers, and entrepreneurs."
      iconName="ShoppingBag"
    />
  );
}
