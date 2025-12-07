"use client";

import { ContactButton } from '@/components/ContactButton';
import { ThemedButton } from '@/components/ui/themed-button';
import { Download } from 'lucide-react';
import Link from 'next/link';

export function ProjectsCTA() {
  return (
    <div className="text-center py-16">
      <div className="max-w-3xl mx-auto">
        <h3 className="text-2xl md:text-3xl font-bold mb-6 text-foreground">
          Interested in Working Together?
        </h3>
        <p className="text-muted-foreground text-lg mb-8">
          I'm always excited to take on new challenges and collaborate on innovative projects. 
          Let's discuss how we can bring your ideas to life.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <ContactButton
            variant="default"
            size="lg"
          />
          <Link href="/Hany_Elsaydawy_full-stack_engineer.pdf" target="_blank">
            <ThemedButton
              variant="outline"
              size="lg"
            >
              <Download className="mr-2 h-4 w-4" />
              Download Resume
            </ThemedButton>
          </Link>
        </div>
      </div>
    </div>
  );
}
