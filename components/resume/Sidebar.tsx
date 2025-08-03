import { useState, useEffect } from 'react';
import { Mail, Phone, Linkedin, Globe } from 'lucide-react';
import { Logo } from './Logo';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export function Sidebar({ activeSection, onSectionChange }: SidebarProps) {
  const sections = [
    { id: 'summary', label: 'Professional Summary' },
    { id: 'competencies', label: 'Core Competencies' },
    { id: 'skills', label: 'Technical Skills' },
    { id: 'experience', label: 'Experience' },
    { id: 'certifications', label: 'Certifications' },
    { id: 'languages', label: 'Languages' }
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
    onSectionChange(sectionId);
  };

  return (
    <div className="w-72 bg-card border-r border-border h-screen sticky top-0 overflow-y-auto relative">
      <div className="relative z-10 p-6">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Logo size={48} />
            <div>
              <h1 className="text-primary mb-1">Hany El Saydawy</h1>
              <p className="text-sm text-muted-foreground">Sr. Frontend Engineer</p>
            </div>
          </div>
          
          <div className="space-y-1 text-sm mb-4">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Mail className="w-3 h-3 text-primary" />
              <span>Hany.rabah@gmail.com</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Phone className="w-3 h-3 text-primary" />
              <span>(+49)15114316821</span>
            </div>
            <p className="text-muted-foreground">B.Sc. Management information systems</p>
            
            <div className="flex gap-2 mt-2">
              <a href="#" className="text-primary hover:text-primary/80 transition-colors flex items-center gap-1">
                <Linkedin className="w-3 h-3" />
                LinkedIn
              </a>
              <span className="text-muted-foreground">-</span>
              <a href="#" className="text-primary hover:text-primary/80 transition-colors flex items-center gap-1">
                <Globe className="w-3 h-3" />
                Website
              </a>
            </div>
          </div>
        </div>

        <nav className="space-y-2">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className={`w-full text-left px-3 py-2 rounded-lg transition-all duration-200 ${
                activeSection === section.id
                  ? 'bg-primary text-primary-foreground shadow-lg'
                  : 'text-muted-foreground hover:text-foreground hover:bg-accent hover:shadow-md'
              }`}
            >
              {section.label}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}