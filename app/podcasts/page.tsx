import { PodcastsPage } from "@/components/PodcastsPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Podcast Recommendations - Quality Audio Content | Hany Rabah",
  description: "Exceptional podcasts I listen to and recommend on technology, entrepreneurship, design, and personal development. Quality conversations and insights.",
  keywords: [
    "podcast recommendations",
    "tech podcasts",
    "entrepreneurship podcasts",
    "design podcasts",
    "development podcasts",
    "startup podcasts",
    "business podcasts",
    "audio content",
    "professional development",
    "industry insights"
  ],
  openGraph: {
    title: "Podcast Recommendations - Quality Audio Content",
    description: "Exceptional podcasts I listen to and recommend on technology, entrepreneurship, design, and personal development. Quality conversations and insights.",
    type: "website",
  },
};

export default function Podcasts() {
  return <PodcastsPage />;
}
