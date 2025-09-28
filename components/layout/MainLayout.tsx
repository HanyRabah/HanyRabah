import { ContactSection } from "../ContactSection";
import { Navigation } from "../Navigation";
import SocialLinks from "../socialLinks";

const MainLayout = ({ children, withoutContact = false }: { children: React.ReactNode, withoutContact?: boolean }) => {
  return (
    <div>
      <Navigation />
      <SocialLinks />
      {children} 
      {!withoutContact && <ContactSection />}
    </div>
  );
};

export default MainLayout;