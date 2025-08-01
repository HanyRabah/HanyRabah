import { ImageWithFallback } from './figma/ImageWithFallback';
import { Badge } from './ui/badge';

export function AboutSection() {
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

  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-1 gap-16 items-start">
          {/* Profile Image */}
          {/* <div className="relative">
            <div className="relative w-80 h-80 mx-auto lg:mx-0">
              <div className="absolute inset-0 bg-gradient-to-br from-teal-primary to-green-accent rounded-2xl blur-xl opacity-20"></div>
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face"
                alt="Hany El Saydawy"
                className="relative z-10 w-full h-full object-cover rounded-2xl border-2 border-teal-primary/20"
              />
            </div>
          </div> */}

          {/* Bio and Content */}
          <div className="space-y-16">
            <div>
              <h2 className="text-center text-3xl md:text-4xl font-bold mb-6 text-teal-primary">
                About Me
              </h2>
              <div className="space-y-8 text-muted-foreground">
                <p>
                  I'm a Senior Fullstack Engineer and Technical Lead based in Berlin, 
                  with over 10 years of experience building scalable web applications 
                  and leading development teams. I specialize in React, Node.js, and Next.js, 
                  with a passion for creating exceptional user experiences.
                </p>
                <p>
                  Currently, I work at a fast-growing fintech startup <a href="https://www.godiligent.ai/" className="text-teal-primary hover:underline" target="_blank" rel="noopener noreferrer">GoDiligent</a>, 
                  where I've architected systems that handle millions of transactions daily. 
                  I believe in writing clean, maintainable code and fostering a culture of 
                  continuous learning and collaboration.
                </p>
                <p>
                When I’m not coding, you’ll find me behind the lens doing photography, deep 
                into a good book, or enjoying a strategic game of chess.
                </p>
              </div>
            </div>

            {/* Skills Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-3 text-foreground">Tech Stack</h3>
                <div className="flex flex-wrap gap-2">
                  {techSkills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="bg-teal-muted/20 text-teal-primary border-teal-primary/20">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3 text-foreground">Leadership & Soft Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {softSkills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="bg-green-accent/20 text-green-accent border-green-accent/20">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3 text-foreground">Languages</h3>
                <div className="flex flex-wrap gap-2">
                  {languages.map((language) => (
                    <Badge key={language} variant="outline" className="border-muted-foreground/20">
                      {language}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}