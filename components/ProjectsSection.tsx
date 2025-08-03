import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ExternalLink, Github } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { prisma } from '@/lib/prisma';

async function getProjects() {
  try {
    const projects = await prisma.project.findMany({
      where: {
        featured: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 3,
    });
    return projects;
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
}

export async function ProjectsSection() {
  const projects = await getProjects();

  return (
    <section id="projects" className="py-24 px-6 bg-muted/20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-theme-primary">
            Latest Work
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A collection of projects that showcase my expertise in building 
            scalable, user-focused applications across various industries.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <Card key={project.id} className="group overflow-hidden border-border hover:border-theme-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-theme-primary/10">
              <div className="relative overflow-hidden">
                <ImageWithFallback
                  src={project.coverImage || ''}
                  alt={project.title}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-3 text-foreground group-hover:text-theme-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech) => (
                    <Badge key={tech} variant="secondary" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
                
                <div className="flex gap-3">
                  {project.githubUrl && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-theme-primary text-theme-primary hover:bg-theme-primary hover:text-white"
                    asChild
                  >
                    <a href={project.githubUrl || '#'} target="_blank" rel="noopener noreferrer">
                      <Github className="w-4 h-4 mr-2" />
                      Code
                    </a>
                  </Button>
                  )}
                  {project.liveUrl && (
                    <Button
                    size="sm"
                    asChild
                    className="border border-theme-primary bg-transparent text-theme-primary hover:bg-theme-primary hover:text-white"
                  >
                    <a href={project.liveUrl || '#'} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Live Demo
                    </a>
                  </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}