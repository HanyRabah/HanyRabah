import { Badge } from './ui/badge';


const techSkills = [
    'React', 'TypeScript', 'Node.js', 'Python', 'PostgreSQL', 'AWS',
    'Docker', 'GraphQL', 'Next.js', 'Tailwind CSS', 'MongoDB', 'Redis'
  ];

  const softSkills = [
    'Technical Leadership', 'System Architecture', 'Code Review',
    'Team Mentoring', 'Project Planning', 'Agile/Scrum'
  ];

  const languages = [
    'English (Fluent)', 'Arabic (Native)', 'German (Conversational)'
  ];

const TechincalSkills = () => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold mb-4 text-foreground">
          Technical Skills
        </h3>
        <div className="flex flex-wrap gap-2">
          {techSkills.map((skill) => (
            <Badge
              key={skill}
              variant="secondary"
              className="bg-theme-primary/10 text-theme-primary border-theme-primary/20"
            >
              {skill}
            </Badge>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-4 text-foreground">
          Leadership & Soft Skills
        </h3>
        <div className="flex flex-wrap gap-2">
          {softSkills.map((skill) => (
            <Badge
              key={skill}
              variant="outline"
              className="border-green-accent/50 text-green-accent"
            >
              {skill}
            </Badge>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-4 text-foreground">
          Languages
        </h3>
        <div className="flex flex-wrap gap-2">
          {languages.map((language) => (
            <Badge
              key={language}
              variant="default"
              className="bg-muted text-foreground"
            >
              {language}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TechincalSkills;