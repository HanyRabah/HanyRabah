import { ResourcePage } from "@/components/ResourcePage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Aesthetic Goods - Beautiful Design & Lifestyle Products | Hany Rabah",
  description: "Discover beautiful, well-designed products that combine form and function. From workspace essentials to lifestyle accessories that inspire creativity.",
  keywords: [
    "aesthetic goods",
    "design products",
    "beautiful products",
    "workspace essentials",
    "lifestyle accessories",
    "minimalist design",
    "functional design",
    "creative tools",
    "design inspiration",
    "curated products"
  ],
  openGraph: {
    title: "Aesthetic Goods - Beautiful Design & Lifestyle Products",
    description: "Discover beautiful, well-designed products that combine form and function. From workspace essentials to lifestyle accessories that inspire creativity.",
    type: "website",
  },
};

export default function AestheticGoodsPage() {
  return (
    <ResourcePage
      type="aesthetic_goods"
      title="Aesthetic Goods"
      description="Beautiful, well-designed products that combine form and function. From workspace essentials to lifestyle accessories that inspire creativity and enhance daily life."
      iconName="Sparkles"
    />
  );
}
