import { ResourcePage } from "@/components/ResourcePage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Investment Insights - Financial Resources & Tools | Hany Rabah",
  description: "Investment platforms, financial tools, and resources I use for personal finance, crypto, and long-term wealth building. Educational content and trusted platforms.",
  keywords: [
    "investment platforms",
    "financial tools",
    "crypto resources",
    "investment apps",
    "financial education",
    "wealth building",
    "personal finance",
    "investment recommendations",
    "financial planning",
    "money management"
  ],
  openGraph: {
    title: "Investment Insights - Financial Resources & Tools",
    description: "Investment platforms, financial tools, and resources I use for personal finance, crypto, and long-term wealth building. Educational content and trusted platforms.",
    type: "website",
  },
};

export default function InvestmentsPage() {
  return (
    <ResourcePage
      type="investment"
      title="Investment Insights"
      description="Investment platforms, financial tools, and educational resources I use for personal finance, crypto, and long-term wealth building. Trusted platforms and valuable insights."
      iconName="Star"
    />
  );
}
