"use client";
import { useState } from "react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { ExternalLink, Figma, Eye } from "lucide-react";
import { ImageGallery } from "./ImageGallery";

interface DesignProject {
  id: string;
  title: string;
  description: string;
  category: string;
  images: {
    src: string;
    alt: string;
    caption?: string;
  }[];
  tags: string[];
  links: {
    figma?: string;
    prototype?: string;
    live?: string;
    github?: string;
  };
  year: string;
}

export function DesignShowcase() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const designProjects: DesignProject[] = [
    {
      id: "1",
      title: "GoDiligent Dashboard",
      description: "AI-driven fintech platform interface design focusing on data visualization and user workflow optimization for compliance teams.",
      category: "Web App",
      images: [
        { src: "/designs/diligent/01.jpg", alt: "GoDiligent Dashboard Overview", caption: "Customer Due diligent Report" },
        { src: "/designs/diligent/02.png", alt: "Analytics View", caption: "Customer Due diligent Report full view" },
        { src: "/designs/diligent/03.png", alt: "Document verification agent", caption: "Document verification agent" },
        { src: "/designs/diligent/04.png", alt: "Proof of Address", caption: "Proof of Address - Document not approved" },
        { src: "/designs/diligent/05.png", alt: "Analysis Report", caption: "Analysis Report" }
      ],
      tags: ["UI/UX", "Dashboard", "Fintech", "Data Viz"],
      links: {
        // figma: "#",
        // prototype: "#"
      },
      year: "2025"
    },
    {
      id: "2",
      title: "Mark Haykalah",
      description: "A digital transformation platform built for factories and industrial zones in Saudi Arabia",
      category: "Web Design",
      images: [
        { src: "/designs/mark/01.png", alt: "Home Screen", caption: "Hero Section showing the platform's value proposition" },
        { src: "/designs/mark/02.png", alt: "About Section", caption: "Detailed product view with reviews" },
        { src: "/designs/mark/03.png", alt: "Testimonials", caption: "Testimonials and social proof" },
      ],
      tags: ["UI/UX", "Landing Page", "SaaS"],
      links: {
        live: "https://mark.haykalah.com/"
      },
      year: "2025"
    },
    {
      id: "3",
      title: "Ready for business",
      description: "Comprehensive design system with reusable components, design tokens, and documentation for scalable product development.",
      category: "Web Design",
      images: [
        { src: "/designs/readyforbiz/01.jpg", alt: "Hero Section", caption: "Grow your business Hero" },
        { src: "/designs/readyforbiz/02.jpg", alt: "Another Option for Hero Section", caption: "Another Option for Grow your business" },
        { src: "/designs/readyforbiz/03.jpg", alt: "Email Template", caption: "Email template" },
      ],
      tags: ["UI/UX", "Email Template", "SaaS"],
      links: {
        // figma: "#",
        live: "https://readyfor.biz/"
      },
      year: "2024"
    },
    {
      id: "4",
      title: "Brandcode",
      description: "A high-converting landing page design with clear value proposition, social proof, and optimized conversion funnel.",
      category: "Web Design",
      images: [
        { src: "/designs/brandcode/01.png", alt: "Hero Section", caption: "Services Section" },
        { src: "/designs/brandcode/02.png", alt: "Features Section", caption: "Work Section" },
        { src: "/designs/brandcode/03.png", alt: "About Section", caption: "About Section" },
        { src: "/designs/brandcode/04.png", alt: "Core Values Section", caption: "Core Values Section" },
      ],
      tags: ["UI/UX", "Landing Page", "Conversion"],
      links: {
        figma: "#",
        live: "https://brandcode-d56322.webflow.io/"
      },
      year: "2024"
    },
    {
      id: "5",
      title: "Interactive Map",
      description: "Interactive map design for Saudi Arabia with detailed project information and navigation features.",
      category: "Web Design",
      images: [
        { src: "/designs/interactive-map/01.png", alt: "Homepage", caption: "Interactive Map Homepage" },
        { src: "/designs/interactive-map/02.png", alt: "Projects Details", caption: "Interactive Map Projects Details" },
        { src: "/designs/interactive-map/03.png", alt: "Navigation", caption: "Interactive Map Navigation" },
      ],
      tags: ["Interactive Map", "Saudi Arabia", "Responsive", "Animation"],
      links: {
        //figma: "#",
        live: "https://dp-interactive-map-ora.vercel.app/",
        // github: "#"
      },
      year: "2024"
    },
    {
      id: "6",
      title: "Spark",
      description: "A modern Property investment platform design with intuitive navigation and secure authentication features.",
      category: "Web Design",
      images: [
        { src: "/designs/spark/01.png", alt: "Hero Section", caption: "Hero Section" },
        { src: "/designs/spark/02.png", alt: "Features Section", caption: "Features Section" },
        { src: "/designs/spark/03.png", alt: "Tenant Section", caption: "Tenant Section" },
      ],
      tags: ["Property Investment", "Saudi Arabia", "Responsive", "Authentication"],
      links: {
        figma: "#",
        prototype: "#"
      },
      year: "2022"
    },
    {
      id: "7",
      title: "RedZone Dashboard",
      description: "Complete dashboard design for portfolio platform.",
      category: "Web App",
      images: [
        { src: "/designs/redzone-dashboard/01.png", alt: "Admin Dashboard", caption: "Admin Dashboard" },
        { src: "/designs/redzone-dashboard/02.png", alt: "Home Dashboard", caption: "Home Page Management Dashboard" },
        { src: "/designs/redzone-dashboard/03.png", alt: "Client Dashboard", caption: "Client Management Dashboard" },
      ],
      tags: ["Portfolio", "Dashboard", "Management", "Security", "Responsive"],
      links: {
        figma: "#",
        prototype: "#"
      },
      year: "2022"
    }
  ];

  const categories = ["All", "Web App", "Web Design"];

  const filteredProjects = selectedCategory === "All" 
    ? designProjects 
    : designProjects.filter(project => project.category === selectedCategory);

  return (
    <section id="design-showcase" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-theme-primary">
            Featured Design Work
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A collection of my design projects spanning web applications, mobile interfaces, 
            and design systems. Each project represents a unique challenge and creative solution.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className={`${
                selectedCategory === category
                  ? "bg-theme-primary text-black hover:bg-theme-secondary"
                  : "border-theme-primary/20 text-theme-primary hover:bg-theme-primary/10"
              }`}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group bg-card border border-border rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
            >
              {/* Project Image Gallery */}
              <div className="relative">
                <ImageGallery images={project.images} title={project.title} />
                <div className="absolute top-4 right-4 z-10">
                  <Badge variant="secondary" className="bg-black/50 text-white">
                    {project.year}
                  </Badge>
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-semibold text-foreground group-hover:text-theme-primary transition-colors">
                    {project.title}
                  </h3>
                  <Badge variant="outline" className="text-xs">
                    {project.category}
                  </Badge>
                </div>
                
                <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* Links */}
                <div className="flex space-x-3">
                  {project.links.figma && (
                    <Button size="sm" variant="outline" className="flex-1">
                      <Figma className="w-4 h-4 mr-2" />
                      Design
                    </Button>
                  )}
                  {project.links.prototype && (
                    <Button size="sm" variant="outline" className="flex-1">
                      <Eye className="w-4 h-4 mr-2" />
                      Preview
                    </Button>
                  )}
                  {project.links.live && (
                    <Button as="link" href={project.links.live} target="_blank" size="sm" variant="outline" className="flex-1">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Live
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <p className="text-muted-foreground mb-6">
            Interested in working together on your next design project?
          </p>
          <Button
            size="lg"
            className="bg-theme-primary hover:bg-theme-secondary text-black font-semibold"
            onClick={() => window.location.href = '/#contact'}
          >
            Let's Collaborate
          </Button>
        </div>
      </div>
    </section>
  );
}
