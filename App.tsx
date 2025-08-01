import { Navigation } from "./components/Navigation";
import { HeroSection } from "./components/HeroSection";
import { AboutSection } from "./components/AboutSection";
import { ProjectsSection } from "./components/ProjectsSection";
import { ServicesSection } from "./components/ServicesSection";
import { BlogSection } from "./components/BlogSection";
import { ContactSection } from "./components/ContactSection";

export default function App() {
  return (
    <div className="dark min-h-screen bg-background text-foreground">
      <Navigation />
      <main>
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <ServicesSection />
        <BlogSection />
        <ContactSection />
      </main>
    </div>
  );
}