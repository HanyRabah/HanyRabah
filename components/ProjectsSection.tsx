import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ExternalLink, Github } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function ProjectsSection() {
  const projects = [
    {
      id: 1,
      title: 'FinanceFlow',
      description: 'A comprehensive financial management platform with real-time analytics, automated reporting, and multi-currency support. Built for enterprise clients handling complex financial workflows.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
      tech: ['React', 'Node.js', 'PostgreSQL', 'AWS', 'TypeScript'],
      github: '#',
      live: '#'
    },
    {
      id: 2,
      title: 'CollabHub',
      description: 'A modern team collaboration tool with real-time messaging, project management, and integrated video calls. Supports teams from 5 to 500+ members with enterprise-grade security.',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop',
      tech: ['Next.js', 'Socket.io', 'MongoDB', 'Docker', 'Redis'],
      github: '#',
      live: '#'
    },
    {
      id: 3,
      title: 'DataViz Pro',
      description: 'An advanced data visualization platform that transforms complex datasets into interactive dashboards. Features custom chart types, real-time updates, and seamless API integrations.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
      tech: ['React', 'D3.js', 'Python', 'FastAPI', 'Elasticsearch'],
      github: '#',
      live: '#'
    },
    {
      id: 4,
      title: 'EcoTracker',
      description: 'A sustainability tracking application that helps companies monitor their carbon footprint, set environmental goals, and generate comprehensive ESG reports for stakeholders.',
      image: 'https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=600&h=400&fit=crop',
      tech: ['Vue.js', 'Laravel', 'MySQL', 'Chart.js', 'AWS Lambda'],
      github: '#',
      live: '#'
    }
  ];

  return (
    <section id="projects" className="py-24 px-6 bg-muted/20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-teal-primary">
            Selected Work
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A collection of projects that showcase my expertise in building 
            scalable, user-focused applications across various industries.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <Card key={project.id} className="group overflow-hidden border-border hover:border-teal-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-teal-primary/10">
              <div className="relative overflow-hidden">
                <ImageWithFallback
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-3 text-foreground group-hover:text-teal-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((tech) => (
                    <Badge key={tech} variant="secondary" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
                
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-teal-primary text-teal-primary hover:bg-teal-primary hover:text-black"
                    asChild
                  >
                    <a href={project.github} target="_blank" rel="noopener noreferrer">
                      <Github className="w-4 h-4 mr-2" />
                      Code
                    </a>
                  </Button>
                  <Button
                    size="sm"
                    className="bg-teal-primary hover:bg-teal-secondary text-black"
                    asChild
                  >
                    <a href={project.live} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Live Demo
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}