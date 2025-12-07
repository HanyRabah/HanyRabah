import { Card, CardContent } from './ui/card';
import { Code, Layers, Zap, BarChart3, Wrench, Goal, TestTubeIcon, VectorSquare, ZapIcon, BriefcaseBusinessIcon, Bot, LucideIcon, CheckCircle2, ArrowRight } from 'lucide-react';
import { prisma } from '@/lib/prisma';
import { PageHeader } from './PageHeader';
import { ContactButton } from './ContactButton';

const Icons: Record<string, LucideIcon> = {
  Code,
  Layers,
  Zap,
  BarChart3,
  Wrench,
  Goal,
  VectorSquare,
  TestTubeIcon,
  ZapIcon,
  BriefcaseBusinessIcon,
  Bot,
};
async function getServices() {
  try {
    const services = await prisma.service.findMany({
      where: {
        active: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    return services;
  } catch (error) {
    console.error('Error fetching services:', error);
    return [];
  }
}


export async function ServicesSection() {
  const services = await getServices();

  return (
    <section id="services" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <PageHeader
            title="Professional Services"
            description="Comprehensive development solutions tailored to your needs. From rapid prototypes to enterprise-scale applications."
            splitColor={true}
            gradient={false}
          />
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} />
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center">
          <div className="bg-gradient-to-br from-theme-primary/10 via-theme-secondary/5 to-transparent rounded-2xl p-12 border border-theme-primary/20">
            <h3 className="text-3xl font-bold mb-4">Ready to Start Your Project?</h3>
            <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
              Let's discuss how I can help bring your ideas to life with clean, scalable, and performant solutions.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <ContactButton 
                defaultReason="PROJECT"
                size="lg"
                className="bg-theme-primary hover:bg-theme-secondary text-white"
              >
                Start a Project
                <ArrowRight className="ml-2 h-4 w-4" />
              </ContactButton>
              <ContactButton 
                defaultReason="CONSULTING"
                variant="outline"
                size="lg"
              >
                Schedule Consultation
              </ContactButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ service }: { service: any }) {
  const IconComponent = service.icon ? Icons[service.icon as keyof typeof Icons] || Code : Code;
  
  return (
    <Card 
      className="group relative overflow-hidden transition-all duration-300 hover:shadow-2xl border-border hover:border-theme-primary/50 hover:shadow-theme-primary/10 flex flex-col h-full"
    >
      {/* Gradient Background Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-theme-primary/5 via-transparent to-theme-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <CardContent className="relative p-8 flex flex-col flex-grow">
        <div className="flex-grow">
          {/* Icon & Title */}
          <div className="mb-6">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-theme-primary to-theme-secondary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
              <IconComponent className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-2 group-hover:text-theme-primary transition-colors">
              {service.title}
            </h3>
          </div>
          
          {/* Description */}
          <p className="text-muted-foreground mb-6 leading-relaxed min-h-[60px]">
            {service.description}
          </p>
          
          {/* Features List */}
          <ul className="space-y-3 mb-6">
            {service.features.slice(0, 4).map((feature: string, featureIndex: number) => (
              <li key={featureIndex} className="flex items-start text-sm">
                <CheckCircle2 className="w-5 h-5 text-theme-primary mr-3 flex-shrink-0 mt-0.5" />
                <span className="text-muted-foreground">{feature}</span>
              </li>
            ))}
            {service.features.length > 4 && (
              <li className="text-sm text-theme-primary font-medium">
                + {service.features.length - 4} more features
              </li>
            )}
          </ul>
        </div>

        {/* CTA Button - Always at bottom */}
        <div className="mt-auto pt-4 border-t border-border/50">
          <ContactButton 
            defaultReason="PROJECT"
            className="w-full"
            variant="outline"
          >
            Get Started
            <ArrowRight className="ml-2 h-4 w-4" />
          </ContactButton>
        </div>
      </CardContent>
    </Card>
  );
}