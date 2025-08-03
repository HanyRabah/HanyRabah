import { Timeline } from './Timeline';
import { SkillTag } from './SkillTag';
import { Badge } from './BadgeComp';

export function CVContent() {
  const experienceData = [
    {
      company: "Paylane GmbH",
      location: "Germany",
      position: "Full Stack Engineer",
      period: "May 2025 – Present",
      responsibilities: [
        "Design, develop, and maintain highly scalable frontend and backend components for our platform.",
        "Work closely with Product, Design, and Data teams to build features that streamline customer workflows and enhance insight delivery.",
        "Build and extend APIs and integrate with external data providers and third-party services.",
        "Ensure end-to-end quality with automated tests and performance tuning.",
        "Own parts of the infrastructure and deployment lifecycle (CI/CD, AWS).",
        "Collaborate in code reviews, architecture decisions, and design discussions.",
        "Prioritize security, compliance, and best practices in a fintech environment.",
        "Monitor, deploy, and manage infrastructure using AWS"
      ]
    },
    {
      company: "Haykalah",
      location: "Saudi Arabia",
      position: "Remote FullStack Technical Lead",
      period: "Sep 2024 – May 2025",
      responsibilities: [
        "Led the technical direction and implementation of AI-driven solutions and website development initiatives for clients undergoing digital transformation.",
        "Collaborated closely with a cross-functional team of designers, developers, and AI specialists to deliver high-impact digital products aligned with modern UX/UI standards.",
        "Worked hand-in-hand with executive leadership to define service offerings and product strategy, translating complex business needs into scalable digital solutions.",
        "Drove the adoption of best practices in frontend architecture, CI/CD, and component-based development while mentoring the team to deliver maintainable and efficient codebases.",
        "Spearheaded the design and development of client websites powered by cutting-edge AI integrations.",
        "Defined and implemented scalable service structures that support digital transformation objectives across industries.",
        "Bridged the gap between technology and business through strategic planning and iterative product development cycles."
      ]
    },
    {
      company: "OLX",
      location: "Germany",
      position: "Sr. Frontend Engineer / Team Leader",
      period: "Mar 2021 – Sep 2024",
      responsibilities: [
        "Fixly Team: Led the team to refactor the code base while making sure to add new features",
        "Service Team: Led a team of 2 direct reports in a mission to build the best user experience, creating a panel for service providers and service seekers, managing booking dates and requests using the latest technology stack ( React, Typescript, GraphQl, Node, and Go lang )",
        "Buyer Team: ensure a smooth journey to the buyer's main touchpoints in our platform",
        "Using the latest tech stack and making sure the platform is always up-to-date and maintainable"
      ]
    },
    {
      company: "Tradeling.com",
      location: "Dubai",
      position: "Sr. Frontend Consultant",
      period: "Sep 2020 – Feb 2021",
      responsibilities: [
        "Collaborated across teams to develop user-centric dashboards, contributing to major project milestones."
      ]
    },
    {
      company: "dubizzle.com",
      location: "Dubai",
      position: "Sr. Frontend Engineer",
      period: "Jun 2018 – Jun 2020",
      responsibilities: [
        "Collaborate with product managers, designers, and software engineers to analyze business goals and customer needs, formulate solutions to deliver a robust, scalable design vision for compelling user-facing products",
        "Orchestrated a new approach to assessing project requirements and objectives that helped prioritize the development activities and increased production releases by 20%",
        "Code design and configuration to produce high-performing, scalable, and secure modules.",
        "Revived the graphic standards and UX language guidelines, ensuring brand consistency",
        "Promote a collaborative work relationship among the backend and frontend engineers and the wider organization",
        "Pairing process and continuously researching new technologies for mobile web and other platforms",
        "Actively involved in scoping and planning work to develop A/B tests that measure users' satisfaction for the new features."
      ]
    },
    {
      company: "OLX",
      location: "Dubai",
      position: "Frontend Engineer - UI/UX Designer",
      period: "Jun 2015 – Jun 2018",
      responsibilities: [
        "Supporting the Global team to localize OLX Egypt and Emerging markets.",
        "Assessed website performance and applied enhancements to improve conversions.",
        "Implemented a new design for the Emerging Market website ( MENA Region )",
        "Applied a new technique to support website RTL and introduced SASS instead of legacy CSS code.",
        "Created component-based UI, replacing legacy UI.",
        "Designed new payment flows and implemented them, and helped in translation and copywriting for Arabic."
      ]
    },
    {
      company: "dubizzle.com",
      location: "Egypt",
      position: "Frontend Engineer - UI/UX Designer",
      period: "Jan 2014 - Jun 2015",
      responsibilities: [
        "Created A/B test and supported in-field user testing for the new features.",
        "Researched and implemented dubizzle framework UI and documentation guidelines.",
        "Support for marketing campaigns and social media by creating designs, and created a WordPress blog for dubizzle."
      ]
    },
    {
      company: "Benchmark Advertising",
      location: "Egypt",
      position: "Interactive Team Lead",
      period: "Jan 2011 – May 2013",
      responsibilities: [
        "Designed and implemented an interactive layout for E-detailing apps and websites on different devices for pharmaceutical companies like Novartis, Pfizer, etc...",
        "Applied best practices for Agile, Kanban, User Stories, Wireframe, and Acceptance criteria.",
        "Interacting daily with back-end/Mobile developers and medical advisors."
      ]
    },
    {
      company: "The Seven Layers",
      location: "Egypt",
      position: "Co-Founder - Part-time",
      period: "Sep 2010 – Dec 2013",
      responsibilities: [
        "Have a key role in management and planning discussions.",
        "Helped and guided the sales team for client acquisition while documenting all product knowledge.",
        "Mentored team members by sharing knowledge and insights on new technologies, ideas, and workflows to be up to date with the current state of design and Front-End, also giving help when needed.",
        "Mentored the team in Agile, Kanban, User stories, Wireframe, etc."
      ]
    },
    {
      company: "Crinel",
      location: "Egypt",
      position: "UI Designer/ Digital Team Lead",
      period: "Jul 2007 – Sep 2010",
      responsibilities: [
        "Responsible for the design/development team on the Web/Mobile platform.",
        "Worked with stakeholders & project managers to evaluate & plan different projects.",
        "Mentored team members by sharing knowledge and insights on new technologies, ideas, and workflows to be up to date with the current state of design and Front-end.",
        "Advocated for best practices, standards, and performance best practices across projects.",
        "Helped in recruiting a digital team for the Cairo office."
      ]
    }
  ];

  const technicalSkills = {
    frameworks: ['React.js', 'Redux', 'Node.js', 'Next.js'],
    tools: ['Photoshop', 'Illustrator', 'Figma', 'Cypress', 'Jest', 'npm', 'Yarn', 'Webpack'],
    systems: ['AWS', 'Docker', 'CI/CD'],
    concepts: ['SEO', 'MVC', 'Agile Methodology', 'Analytics'],
    languages: ['HTML5', 'CSS3', 'JavaScript', 'TypeScript']
  };

  const SectionHeader = ({ children }: { children: React.ReactNode }) => (
    <div className="relative">
      <h2 className="text-primary relative">{children}</h2>
      <div className="absolute -bottom-2 left-0 w-12 h-1 bg-primary rounded-full"></div>
    </div>
  );

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-4xl mx-auto p-8 space-y-24">
        
        {/* Professional Summary Section */}
        <section id="summary" className="scroll-mt-8">
          <div className="space-y-6">
            <SectionHeader>Professional Summary</SectionHeader>
            <div className="bg-primary/5 p-6 rounded-lg border-l-4 border-primary">
              <p className="text-muted-foreground leading-relaxed">
                Senior Frontend Developer with over 10 years of experience specializing in UI/UX design, programming, and 
                platform maintenance across diverse teams. Expert in creating high-impact user interfaces and streamlined 
                user experiences, resulting in significant revenue generation. Proven ability to tackle complex projects with 
                robust problem-solving skills and a commitment to excellence.
              </p>
            </div>
          </div>
        </section>

        {/* Core Competencies Section */}
        <section id="competencies" className="scroll-mt-8">
          <div className="space-y-6">
            <SectionHeader>Core Competencies</SectionHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 hover:shadow-md transition-all">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-muted-foreground">UI/UX Design & Product Development</span>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 hover:shadow-md transition-all">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-muted-foreground">Multicultural Team Leadership</span>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 hover:shadow-md transition-all">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-muted-foreground">Full-Stack Web Technologies & Frameworks</span>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 hover:shadow-md transition-all">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-muted-foreground">Continuous Integration and Deployment</span>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 hover:shadow-md transition-all">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-muted-foreground">Performance Optimization & Scalability</span>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 hover:shadow-md transition-all">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-muted-foreground">Cross-Browser & Responsive Design</span>
              </div>
            </div>
          </div>
        </section>

        {/* Technical Skills Section */}
        <section id="skills" className="scroll-mt-8">
          <div className="space-y-6">
            <SectionHeader>Technical Skills</SectionHeader>
            <div className="space-y-6">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <div className="space-y-2">
                  <span className="text-muted-foreground">Frameworks:</span>
                  <div className="flex flex-wrap gap-2">
                    {technicalSkills.frameworks.map((skill) => (
                      <SkillTag key={skill} skill={skill} category="framework" />
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <div className="space-y-2">
                  <span className="text-muted-foreground">Tools:</span>
                  <div className="flex flex-wrap gap-2">
                    {technicalSkills.tools.map((skill) => (
                      <SkillTag key={skill} skill={skill} category="tool" />
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <div className="space-y-2">
                  <span className="text-muted-foreground">Systems:</span>
                  <div className="flex flex-wrap gap-2">
                    {technicalSkills.systems.map((skill) => (
                      <SkillTag key={skill} skill={skill} category="system" />
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <div className="space-y-2">
                  <span className="text-muted-foreground">Concepts:</span>
                  <div className="flex flex-wrap gap-2">
                    {technicalSkills.concepts.map((skill) => (
                      <SkillTag key={skill} skill={skill} category="concept" />
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <div className="space-y-2">
                  <span className="text-muted-foreground">Languages:</span>
                  <div className="flex flex-wrap gap-2">
                    {technicalSkills.languages.map((skill) => (
                      <SkillTag key={skill} skill={skill} category="language" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="scroll-mt-8">
          <div className="space-y-8">
            <SectionHeader>Experience</SectionHeader>
            <Timeline items={experienceData} />
          </div>
        </section>

        {/* Certifications Section */}
        <section id="certifications" className="scroll-mt-8">
          <div className="space-y-6">
            <SectionHeader>Certifications</SectionHeader>
            <div className="bg-muted/30 p-6 rounded-lg border-l-4 border-primary">
              <div>
                <h3 className="text-primary">2005 B.Sc. Management Information Systems, General</h3>
                <p className="text-muted-foreground">El Shorouk Academy, Cairo, Egypt</p>
              </div>
            </div>
          </div>
        </section>

        {/* Languages Section */}
        <section id="languages" className="scroll-mt-8">
          <div className="space-y-6">
            <SectionHeader>Languages</SectionHeader>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 rounded-lg bg-muted/30 hover:bg-muted/50 hover:shadow-md transition-all">
                <div className="flex items-center gap-3">
                  <span className="text-lg">🇪🇬</span>
                  <span className="text-primary">Arabic</span>
                </div>
                <Badge variant="outline" className="border-primary/30 text-primary">Native</Badge>
              </div>
              <div className="flex justify-between items-center p-4 rounded-lg bg-muted/30 hover:bg-muted/50 hover:shadow-md transition-all">
                <div className="flex items-center gap-3">
                  <span className="text-lg">🇺🇸</span>
                  <span className="text-primary">English</span>
                </div>
                <Badge variant="outline" className="border-primary/30 text-primary">Fluent</Badge>
              </div>
              <div className="flex justify-between items-center p-4 rounded-lg bg-muted/30 hover:bg-muted/50 hover:shadow-md transition-all">
                <div className="flex items-center gap-3">
                  <span className="text-lg">🇩🇪</span>
                  <span className="text-primary">German</span>
                </div>
                <Badge variant="outline" className="border-primary/30 text-primary">A1</Badge>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}