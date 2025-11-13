import { ResourcePage } from "@/components/ResourcePage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reading List - Curated Books & Articles | Hany Rabah",
  description: "Discover my carefully curated collection of books, articles, and reading materials on technology, design, entrepreneurship, and personal development.",
  keywords: [
    "reading list",
    "book recommendations",
    "tech books",
    "design books",
    "entrepreneurship books",
    "programming books",
    "software engineering books",
    "technical articles",
    "curated content",
    "Hany Rabah recommendations"
  ],
  openGraph: {
    title: "Reading List - Curated Books & Articles",
    description: "Discover my carefully curated collection of books, articles, and reading materials on technology, design, entrepreneurship, and personal development.",
    type: "website",
  },
};

export default function ReadingListPage() {
  return (
    <ResourcePage
      type="reading_list"
      title="Reading List"
      description="A carefully curated collection of books, articles, and resources that have shaped my thinking on technology, design, entrepreneurship, and life. From technical deep-dives to philosophical explorations."
      iconName="BookMarked"
    />
  );
}
