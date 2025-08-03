import { ContactSection } from "../ContactSection";
import { Navigation } from "../Navigation";
import SocialLinks from "../socialLinks";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Navigation />
      <SocialLinks />
      {children} 
      <ContactSection />
    </div>
  );
};

export default MainLayout;