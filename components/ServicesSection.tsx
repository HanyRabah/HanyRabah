import { Card, CardContent } from './ui/card';
import { Code, Layers, Zap, BarChart3, Wrench, Goal, TestTubeIcon, VectorSquare,ZapIcon,  BriefcaseBusinessIcon, Bot, LucideIcon  } from 'lucide-react';
import { prisma } from '@/lib/prisma';

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
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-theme-primary">
            What I Offer
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            From concept to deployment, I provide comprehensive development services 
            that help businesses build robust digital solutions.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {services.map((service, index) => {
            const IconComponent = Icons[service.icon as keyof typeof Icons];

            return (
              <Card key={index} className="group border-border hover:border-theme-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-theme-primary/10">
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 rounded-lg bg-theme-primary/10 flex items-center justify-center mr-4 group-hover:bg-theme-primary/20 transition-colors">
                      <IconComponent className="w-6 h-6 text-theme-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground group-hover:text-theme-primary transition-colors">
                      {service.title}
                    </h3>
                  </div>
                  
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  
                  <ul className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm text-muted-foreground">
                        <div className="w-1.5 h-1.5 rounded-full bg-theme-primary mr-3"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}