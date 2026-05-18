"use client";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Download, ExternalLink, Calendar, ArrowRight, User } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { PageHeader } from "./PageHeader";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "./ui/accordion";
import { ScrollReveal, BounceCard } from "./react-bits";

interface TimelineItem {
  date: string;
  title: string;
  company: string;
  location: string;
  companyUrl?: string;
  logo?: string;
  description: string;
  moreDetails?: string;
  current?: boolean;
}

export function AboutSection() {
  const techSkills = [
    "React",
    "TypeScript",
    "Node.js",
    "PostgreSQL",
    "AWS",
    "Docker",
    "GraphQL",
    "Next.js",
    "Tailwind CSS",
    "MongoDB",
  ];

  const softSkills = [
    "Technical Leadership",
    "System Architecture",
    "Code Review",
    "Team Mentoring",
    "Project Planning",
    "Agile/Scrum",
  ];

  const designSkills = [
    "UI/UX Design",
    "Figma",
    "Adobe Creative Suite",
    "Prototyping",
    "User Research",
    "Design Systems",
    "Wireframing",
    "Visual Design",
  ];

  const languages = [
    "English (Fluent)",
    "Arabic (Native)",
    "German (A1)",
  ];

  const timeline: TimelineItem[] = [
    {
      date: "May 2025 - Present",
      title: "Sr. Full-Stack Engineer",
      company: "Diligent (YC W24)",
      location: "Germany",
      companyUrl: "https://www.godiligent.ai/",
      logo: "/company-logos/godiligentai_logo.jpeg",
      description: "Building Paylane - architecting and maintaining core full-stack systems serving fintech users. Improved load times by 42% through optimized API calls and front-end rendering. Designed and automated CI/CD pipelines via AWS and Docker, achieving zero-downtime deployments.",
      moreDetails: `<div>Worked on a next-generation compliance automation platform integrating AI to streamline due diligence and risk checks.</div> \n
      <ul>
        <li>Work closely with Product, Design, and Data teams to build features that streamline customer workflows and enhance insight delivery.</li>
        <li>Architect and maintain core full-stack systems serving fintech users, ensuring performance and scalability.</li>
        <li>Build and extend APIs and integrate with external data providers and third-party services.</li>
        <li>Improved load times by 42% across customer dashboards through optimized API calls and front-end rendering techniques.</li>
        <li>Designed and automated CI/CD pipelines via AWS and Docker, achieving zero-downtime deployments.</li>
        <li>Conducted code reviews and provided feedback to ensure code quality and maintainability.</li>
        <li>Led React 19 upgrade and component restructuring (250+ files) with zero downtime, improving developer productivity 30% and reducing security vulnerabilities 65%</li>
        <li>Architected an internationalization system supporting 4 languages across 180 files, eliminating 2,000+ hardcoded strings with automated validation.</li>
        <li>Reduced onboarding time by 80% through a comprehensive documentation suite and automated quality gates (ESLint, Husky, TypeScript, i18n)</li>
        <li>Built a migration automation tool, saving 100+ hours and enabling safe large-scale refactoring without breaking changes</li>
      </ul>`,
      current: true,
    },
    {
      date: "Jan 2025 - Jul 2025",
      title: "Sr. Full-Stack Engineer",
      company: "Mark Haykalah",
      location: "Saudi Arabia (Remote)",
      companyUrl: "https://mark.haykalah.com/",
      logo: "/company-logos/mark_haykalah_logo.jpeg",
      description: "Directed a distributed team delivering AI-driven digital solutions for industrial transformation. Reduced project delivery timelines by 40% via modular component libraries and agile pipelines. Drove the technical foundation for DigitalNext, a scalable e-commerce and branding platform.",
      moreDetails: `
      <ul>
        <li>Hired and directed a team of 4+ engineers delivering AI-driven digital solutions for industrial transformation.</li>
        <li>Reduced project delivery timelines by 40% via modular component libraries and agile pipelines.</li>
        <li>Oversaw product design, UX, and engineering to ensure seamless cross-platform experiences.</li>
        <li>Drove the technical foundation for NextDigital, NextStrategy, NextQuality and NextAi</li>
      </ul>`,
      current: false,
    },
    {
      date: "Mar 2021 - Nov 2024",
      title: "Sr. Frontend Engineer / Team Lead",
      company: "OLX Group",
      location: "Germany",
      companyUrl: "https://www.olxgroup.com/",
      logo: "/company-logos/olx_group_logo.jpeg",
      description: "Led the Service and Fixly teams to modernize the architecture using React 18, TypeScript, and GraphQL. Achieved 30% Time-to-Interactive improvement and 40% production-issue reduction via TDD. Mentored engineers in performance tuning, testing, and codebase scalability.",
      moreDetails: `
      <ul>
        <li>Led the Service and Fixly teams to modernize the architecture using React 18, TypeScript, and GraphQL.</li>
        <li>Achieved 30% Time-to-Interactive improvement and 40% production-issue reduction via TDD and comprehensive testing.</li>
        <li>Collaborated with backend and design teams to ship features impacting millions of users monthly.</li>
        <li>Mentored 2+ engineers in performance tuning, testing, and scalable architecture design.</li>
        <li>Played a key role in feature adoption and experimentation via A/B testing and user analytics.</li>
      </ul>`,
      current: false,
    },
    {
      date: "Jun 2018 - Jun 2020",
      title: "Sr. Frontend Engineer",
      company: "dubizzle.com",
      location: "Dubai",
      companyUrl: "https://www.dubizzle.com/",
      logo: "/company-logos/dubizzle_com_logo.jpeg",
      description: "Collaborated with product managers, designers, and software engineers to deliver robust, scalable design vision for user-facing products. Orchestrated a new approach of assessing project requirements that increased production releases by 20%. Revived graphic standards and UX language guidelines ensuring brand consistency.",
      moreDetails: `
      <ul>
        <li>Delivered high-performing UI modules and dashboards for consumer marketplace products.</li>
        <li>Partnering with design and product leads to enhanced engagement, resulting in a 20% increase in feature usage.</li>
        <li>Implemented new design system standards and accessibility guidelines.</li>
        <li>Led A/B testing initiatives and integrated data-driven UX optimization flows.</li>
        <li>Supporting the Global team to localize OLX Egypt and the Emerging markets.</li>
        <li>Assessed website performance and applied enhancements to improve conversions.</li>
        <li>Implemented a new design for the Emerging Market website ( MENA Region )</li>
        <li>Applied a new technique to support website RTL and introduced SASS instead of legacy CSS code.</li>
        <li>Created component-based UI, replacing legacy UI.</li>
        <li>Designed new payment flows and implemented them, and helped in translation and copywriting for Arabic.</li>
      </ul>`,
      current: false,
    },
    {
      date: "Jun 2015 - Jun 2018",
      title: "Frontend Engineer - UI/UX Designer",
      company: "OLX",
      location: "Dubai",
      companyUrl: "https://www.olx.com/",
      logo: "/company-logos/olx_group_logo.jpeg",
      description: "Supported the Global team to localize OLX Egypt and Emerging markets. Implemented a new design for the Emerging Market website (MENA Region). Applied new techniques to support website RTL and introduced SASS instead of legacy CSS code. Created component-based UI, replacing legacy UI.",
    },
    {
      date: "Jan 2014 - Jun 2015",
      title: "Frontend Engineer - UI/UX Designer",
      company: "dubizzle.com",
      location: "Egypt",
      companyUrl: "https://www.dubizzle.com/",
      logo: "/company-logos/dubizzle_com_logo.jpeg",
      description: "Created A/B tests and supported user testing for new features. Researched and implemented dubizzle framework UI and documentation guidelines. Supported marketing campaigns and social media by creating designs and created a WordPress blog.",
      moreDetails: `
      <ul>
        <li>Created A/B test and supported in-field user testing for the new features.</li>
        <li>Researched and implemented dubizzle framework UI and documentation guidelines.</li>
        <li>Support for marketing campaigns and social media by creating designs, and created a WordPress blog for dubizzle.</li>
      </ul>`,
      current: false,
    },
    {
      date: "Jan 2011 - May 2013",
      title: "Interactive Designer",
      company: "Benchmark Advertising",
      location: "Egypt",
      companyUrl: "http://benchmarklabs.me/",
      logo: "/company-logos/benchmark_advertising_logo.jpeg",
      description: "Designed and implemented interactive layouts for E-detailing apps and websites on different devices for pharmaceutical companies like Novartis, Pfizer. Applied best practices for Agile, Kanban, User Stories, Wireframe, and Acceptance criteria.",
      moreDetails: `
      <ul>
        <li>Designed and implemented an interactive layout for E-detailing apps and websites on different devices for pharmaceutical companies like Novartis, Pfizer, etc...</li>
        <li>Applied best practices for Agile, Kanban, User Stories, Wireframe, and Acceptance criteria.</li>
        <li>Interacting daily with back-end/Mobile developers and medical advisors.</li>
      </ul>`,
      current: false,
    },
    {
      date: "Sep 2010 - Dec 2013",
      title: "Co-Founder",
      company: "The Seven Layers",
      location: "Egypt",
      description: "Had a key role in management and planning discussions. Helped and guided the sales team for client acquisition while documenting all product knowledge. Mentored team members by sharing knowledge and insights on new technologies, ideas, and workflows.",
      moreDetails: `
      <ul>
        <li>Have a key role in management and planning discussions.</li>
        <li>Helped and guided the sales team for client acquisition while documenting all product knowledge.</li>
        <li>Mentored team members by sharing knowledge and insights on new technologies, ideas, and workflows to be up to date with the current state of design and Front-End, also giving help when needed.</li>
        <li>Mentored the team in Agile, Kanban, User stories, Wireframe, etc.</li>
      </ul>`,
      current: false,
    },
    {
      date: "Jul 2007 - Sep 2010",
      title: "UI Designer / Digital Team Lead",
      company: "Crinel",
      location: "Egypt",
      companyUrl: "https://crinel.com/",
      logo: "/company-logos/crinel_logo.jpeg",
      description: "Responsible for the design/development team on the Web/Mobile platform. Worked with stakeholders & project managers to evaluate & plan different projects. Mentored team members and advocated for best practices, standards, and performance best practices across projects.",
      moreDetails: `
      <ul>
        <li>Responsible for the design/development team on the Web/Mobile platform.</li>
        <li>Worked with stakeholders & project managers to evaluate & plan different projects.</li>
        <li>Mentored team members by sharing knowledge and insights on new technologies, ideas, and workflows to be up to date with the current state of design and Front-end.</li>
        <li>Advocated for best practices, standards, and performance best practices across projects.</li>
        <li>Helped in recruiting a digital team for the Cairo office.</li>
      </ul>`,
      current: false,
    },
    {
      date: "Jun 2006 - Jul 2007",
      title: "UI Designer",
      company: "Into-development",
      location: "Egypt",
      companyUrl: "https://idvdigital.com/",
      logo: "/company-logos/idvdigital_logo.jpeg",
      description: "Designed website layouts and implemented HTML/CSS/Javascript. Created Flash animation and wrote code with Action Script. Shot 360 photos for hotels and implemented them for 360 VR preview.",
      moreDetails: `
        <ul>
          <li>doing animation with flash and action script</li>
          <li>360 photos</li>
        </ul>
      `
    },
  ];

  const downloadResume = () => {
    const resumeUrl = "/Hany_Elsaydawy_Resume.pdf";
    window.open(resumeUrl, "_blank");
  };

  return (
    <section id="about" className="py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-1 gap-16 items-start">
          {/* Profile Image */}
          {/* <div className="relative">
            <div className="relative w-80 h-80 mx-auto lg:mx-0">
              <div className="absolute inset-0 bg-gradient-to-br from-theme-primary to-green-accent rounded-2xl blur-xl opacity-20"></div>
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face"
                alt="Hany El Saydawy"
                className="relative z-10 w-full h-full object-cover rounded-2xl border-2 border-theme-primary/20"
              />
            </div>
          </div> */}

          {/* Bio and Content */}
          <div className="space-y-1">
            {/* Page Header */}
            <PageHeader
              title="About Me"
              icon={User}
              gradient={false}
              splitColor={true}
            >
              <div className="space-y-6 text-lg text-muted-foreground leading-relaxed text-center">
                <p>
                  I'm a Senior Fullstack Engineer based in
                  Berlin, with over 20+ years of experience building scalable,
                  high-performance web applications and leading engineering
                  teams.
                </p>
                <p>
                  My expertise spans both technical development and design, with
                  deep knowledge in React, Next.js, Node.js, and AWS, combined
                  with strong UI/UX design skills. I deliver clean, maintainable
                  code and user-centered design systems across industries like
                  fintech, classifieds, and e-commerce.
                </p>
                <p>
                  When I'm not coding, you'll find me traveling, behind the lens
                  doing photography, deep into a good book, or enjoying a
                  strategic game of chess.
                </p>
              </div>
            </PageHeader>

            {/* Timeline Section */}
            <ScrollReveal direction="up" delay={0.2}>
            <div className="px-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-8">
                My Career Path
              </h2>
              <div className="space-y-8">
                {timeline.map((item, index) => (
                  <div
                    key={index}
                    className="group relative pl-8 pb-8 border-l-2 border-border last:pb-0 hover:border-theme-primary transition-colors"
                  >
                    {/* Timeline dot */}
                    <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-background border-2 border-border group-hover:border-theme-primary group-hover:bg-theme-primary transition-all" />
                    
                    {/* Current indicator */}
                    {item.current && (
                      <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-theme-primary border-2 border-theme-primary animate-pulse" />
                    )}

                    {/* Content */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        <time>{item.date}</time>
                        {item.current && (
                          <Badge variant="primary" className="text-xs">
                            Current
                          </Badge>
                        )}
                      </div>
                    
                      
                      <div className="flex items-center gap-3 flex-wrap">
                        {item.logo && (
                          <div className="flex-shrink-0 w-10 h-10 rounded-lg overflow-hidden bg-white border border-border shadow-sm">
                            <Image
                              src={item.logo}
                              alt={`${item.company} logo`}
                              width={40}
                              height={40}
                              className="w-full h-full object-contain p-1"
                              onError={(e) => {
                                e.currentTarget.style.display = 'none';
                              }}
                            />
                          </div>
                        )}
                        <div className="flex flex-col">
                          <h3 className="text-xl font-semibold text-foreground group-hover:text-theme-primary transition-colors">
                            {item.title}
                          </h3>
                          <div className="flex items-center gap-2 flex-wrap">
                            {item.companyUrl ? (
                              <a
                                href={item.companyUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-theme-primary hover:underline font-medium"
                              >
                                {item.company}
                                <ExternalLink className="h-3 w-3" />
                              </a>
                            ) : (
                              <div className="flex items-center gap-1 text-foreground font-medium">
                                {item.company}
                              </div>
                            )}
                            {item.location && (
                              <span className="text-sm text-muted-foreground">
                                • {item.location}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <p className="text-muted-foreground leading-relaxed">
                        {item.description}
                      </p>
                      
                      {/* More Details Accordion */}
                      {item.moreDetails && (
                        <Accordion type="single" collapsible className="w-full mt-2">
                          <AccordionItem value="details" className="border-none">
                            <AccordionTrigger className="text-theme-primary hover:text-theme-primary/80 py-2 text-sm font-medium">
                              Show more details
                            </AccordionTrigger>
                            <AccordionContent>
                              <div 
                                className="text-muted-foreground leading-relaxed prose prose-sm max-w-none text-base [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_li]:text-muted-foreground [&_div]:mb-3"
                                dangerouslySetInnerHTML={{ __html: item.moreDetails }}
                              />
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            </ScrollReveal>

            {/* Skills Grid */}
            <ScrollReveal direction="up" delay={0.3}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 py-8">
              <div>
                <h3 className="text-lg font-semibold mb-3 text-foreground">
                  Tech Stack
                </h3>
                <div className="flex flex-wrap gap-2">
                  {techSkills.map((skill) => (
                    <BounceCard key={skill} scale={1.1}>
                      <Badge variant="primary">
                        {skill}
                      </Badge>
                    </BounceCard>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3 text-foreground">
                  Leadership & Soft Skills
                </h3>
                <div className="flex flex-wrap gap-2">
                  {softSkills.map((skill) => (
                    <BounceCard key={skill} scale={1.1}>
                      <Badge variant="primary">
                        {skill}
                      </Badge>
                    </BounceCard>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3 text-foreground">
                  Design & UX
                </h3>
                <div className="flex flex-wrap gap-2">
                  {designSkills.map((skill) => (
                    <BounceCard key={skill} scale={1.1}>
                      <Badge variant="primary">
                        {skill}
                      </Badge>
                    </BounceCard>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3 text-foreground">
                  Languages
                </h3>
                <div className="flex flex-wrap gap-2">
                  {languages.map((language) => (
                    <BounceCard key={language} scale={1.1}>
                      <Badge variant="primary">
                        {language}
                      </Badge>
                    </BounceCard>
                  ))}
                </div>
              </div>
            </div>
            </ScrollReveal>

                  {/* More About Me Section */}
            <ScrollReveal direction="left" delay={0.2}>
            <div className="py-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-6">
                More About Me
              </h2>
              <div className="space-y-4">
                <Link
                  href="/projects"
                  className="group flex items-center gap-2 text-lg text-muted-foreground hover:text-theme-primary transition-colors"
                >
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  Check out my technical projects
                </Link>
                <Link
                  href="/design"
                  className="group flex items-center gap-2 text-lg text-muted-foreground hover:text-theme-primary transition-colors"
                >
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  View my design portfolio
                </Link>
                <Link
                  href="/blog"
                  className="group flex items-center gap-2 text-lg text-muted-foreground hover:text-theme-primary transition-colors"
                >
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  Read my technical insights
                </Link>
              </div>
            </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.3}>
            <div className="py-8">
              <Button
                onClick={downloadResume}
                variant="outline"
                size="lg"
                className="border hover:text-white transition-colors"
                style={{
                  borderColor: 'var(--theme-primary)',
                  color: 'var(--theme-primary)',
                  '--hover-bg': 'var(--theme-primary)'
                } as React.CSSProperties & { '--hover-bg': string }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--theme-primary)';
                  e.currentTarget.style.color = 'white';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                <Download className="mr-2 h-4 w-4" />
                Download Resume
              </Button>
            </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
