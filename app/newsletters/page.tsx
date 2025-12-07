import { ResourcePage } from "@/components/ResourcePage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Newsletter Recommendations - Quality Content Subscriptions | Hany Rabah",
  description: "High-quality newsletters I subscribe to and recommend on technology, design, entrepreneurship, and industry insights. Curated content worth your inbox.",
  keywords: [
    "newsletter recommendations",
    "tech newsletters",
    "design newsletters",
    "startup newsletters",
    "industry insights",
    "email subscriptions",
    "curated content",
    "professional newsletters",
    "technology news",
    "design inspiration"
  ],
  openGraph: {
    title: "Newsletter Recommendations - Quality Content Subscriptions",
    description: "High-quality newsletters I subscribe to and recommend on technology, design, entrepreneurship, and industry insights. Curated content worth your inbox.",
    type: "website",
  },
};

export default function NewslettersPage() {
  return (
    <ResourcePage
      type="newsletter"
      title="Newsletter Recommendations"
      description="High-quality newsletters I subscribe to and recommend. Curated content on technology, design, entrepreneurship, and industry insights that's actually worth your inbox space."
      iconName="Newspaper"
    />
  );
}
