import { Card, CardContent } from './ui/card';
import { Code, Layers, Zap, BarChart3 } from 'lucide-react';

export function ServicesSection() {
  const services = [
    {
      icon: Code,
      title: 'Frontend Engineering',
      description: 'Modern, responsive web applications built with React, TypeScript, and cutting-edge frameworks. Focus on performance, accessibility, and exceptional user experience.',
      features: ['React & Next.js', 'TypeScript', 'Responsive Design', 'Performance Optimization']
    },
    {
      icon: Layers,
      title: 'Fullstack Development',
      description: 'End-to-end application development from database design to deployment. Scalable architectures that grow with your business needs.',
      features: ['API Development', 'Database Design', 'Cloud Architecture', 'DevOps Integration']
    },
    {
      icon: Zap,
      title: 'UX-to-Code Systems',
      description: 'Bridging the gap between design and development with component libraries, design systems, and seamless design-to-code workflows.',
      features: ['Design Systems', 'Component Libraries', 'Figma to Code', 'Style Guides']
    },
    {
      icon: BarChart3,
      title: 'Performance Auditing',
      description: 'Comprehensive analysis of your applications performance, identifying bottlenecks and implementing optimizations for better user experience.',
      features: ['Performance Analysis', 'Core Web Vitals', 'Optimization Strategy', 'Monitoring Setup']
    }
  ];

  return (
    <section id="services" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-teal-primary">
            What I Offer
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            From concept to deployment, I provide comprehensive development services 
            that help businesses build robust digital solutions.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <Card key={index} className="group border-border hover:border-teal-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-teal-primary/10">
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 rounded-lg bg-teal-primary/10 flex items-center justify-center mr-4 group-hover:bg-teal-primary/20 transition-colors">
                      <IconComponent className="w-6 h-6 text-teal-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground group-hover:text-teal-primary transition-colors">
                      {service.title}
                    </h3>
                  </div>
                  
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  
                  <ul className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm text-muted-foreground">
                        <div className="w-1.5 h-1.5 rounded-full bg-teal-primary mr-3"></div>
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