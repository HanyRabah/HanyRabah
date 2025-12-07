import { ResourcePage } from "@/components/ResourcePage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Talent Network - Exceptional Professionals | Hany Rabah",
  description: "Connect with exceptional developers, designers, and digital professionals I've worked with and recommend. Quality talent for your next project.",
  keywords: [
    "talent network",
    "freelance developers",
    "freelance designers",
    "remote talent",
    "professional network",
    "recommended professionals",
    "quality talent",
    "vetted professionals",
    "tech talent",
    "design talent"
  ],
  openGraph: {
    title: "Talent Network - Exceptional Professionals",
    description: "Connect with exceptional developers, designers, and digital professionals I've worked with and recommend. Quality talent for your next project.",
    type: "website",
  },
};

export default function TalentPage() {
  return (
    <ResourcePage
      type="talent"
      title="Talent Network"
      description="Exceptional developers, designers, and digital professionals I've worked with and recommend. Quality talent for your next project, vetted through real collaboration."
      iconName="Users"
    />
  );
}
