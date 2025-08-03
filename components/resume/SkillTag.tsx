import { 
  Code, 
  Layers, 
  Database, 
  Cloud, 
  Search, 
  Palette,
  TestTube,
  Package,
  Settings,
  Monitor
} from 'lucide-react';
import { Badge } from './BadgeComp';

interface SkillTagProps {
  skill: string;
  category: 'framework' | 'tool' | 'system' | 'concept' | 'language';
}

export function SkillTag({ skill, category }: SkillTagProps) {
  const getIcon = (skill: string, category: string) => {
    const iconMap: { [key: string]: any } = {
      // Frameworks
      'React.js': Code,
      'Redux': Layers,
      'Node.js': Database,
      'Next.js': Code,
      
      // Tools
      'Photoshop': Palette,
      'Illustrator': Palette,
      'Figma': Palette,
      'Cypress': TestTube,
      'Jest': TestTube,
      'npm': Package,
      'Yarn': Package,
      'Webpack': Settings,
      
      // Systems
      'AWS': Cloud,
      'Docker': Package,
      'CI/CD': Settings,
      
      // Concepts
      'SEO': Search,
      'MVC': Code,
      'Agile Methodology': Settings,
      'Analytics': Monitor,
      
      // Languages
      'HTML5': Code,
      'CSS3': Code,
      'JavaScript': Code,
      'TypeScript': Code,
    };

    return iconMap[skill] || Code;
  };

  const Icon = getIcon(skill, category);

  return (
    <Badge 
      variant="outline" 
      className="flex items-center gap-1.5 px-3 py-1 border-primary/20 bg-primary/5 text-primary hover:bg-primary/10 hover:border-primary/30 transition-all duration-200 hover:shadow-md hover:scale-105"
    >
      <Icon className="w-3 h-3" />
      <span>{skill}</span>
    </Badge>
  );
}