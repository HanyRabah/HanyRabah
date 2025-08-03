
"use client";
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Card, CardContent } from './ui/card';
import { Mail, Linkedin, Github, MapPin, Instagram } from 'lucide-react';
import { useState } from 'react';

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-theme-primary">
            Let's Work Together
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Have a project, role, or idea in mind? Reach out and let’s explore how I can help.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="border-border">
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    required
                    className="bg-background border-border focus:border-theme-primary"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your.email@example.com"
                    required
                    className="bg-background border-border focus:border-theme-primary"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project or how I can help..."
                    rows={5}
                    required
                    className="bg-background border-border focus:border-theme-primary resize-none"
                  />
                </div>
                
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full border border-theme-primary bg-transparent text-theme-primary hover:bg-theme-primary hover:text-white disabled:opacity-50"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
                
                {submitStatus === 'success' && (
                  <div className="text-green-600 text-sm mt-2">
                    ✅ Message sent successfully! I'll get back to you soon.
                  </div>
                )}
                
                {submitStatus === 'error' && (
                  <div className="text-red-600 text-sm mt-2">
                    ❌ Failed to send message. Please try again or contact me directly.
                  </div>
                )}
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-6 text-foreground">
                Get in Touch
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-lg bg-theme-primary/10 flex items-center justify-center mr-4">
                    <MapPin className="w-5 h-5 text-theme-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Location</p>
                    <p className="text-muted-foreground">🇩🇪 Berlin, Germany</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-lg bg-theme-primary/10 flex items-center justify-center mr-4">
                    <Mail className="w-5 h-5 text-theme-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Email</p>
                    <a
                      href="mailto:contact@hanyrabah.com"
                      className="text-theme-primary hover:text-theme-secondary transition-colors"
                    >
                      contact@hanyrabah.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-6 text-foreground">
                Connect with Me
              </h3>
              
              <div className="flex space-x-4">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-theme-primary text-theme-primary hover:bg-theme-primary hover:text-black"
                  asChild
                >
                  <a href="https://linkedin.com/in/hany-rabah" target="_blank" rel="noopener noreferrer">
                    <Linkedin className="w-4 h-4 mr-2" />
                    LinkedIn
                  </a>
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  className="border-theme-primary text-theme-primary hover:bg-theme-primary hover:text-black"
                  asChild
                >
                  <a href="https://github.com/hanyrabah" target="_blank" rel="noopener noreferrer">
                    <Github className="w-4 h-4 mr-2" />
                    GitHub
                  </a>
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  className="border-theme-primary text-theme-primary hover:bg-theme-primary hover:text-black"
                  asChild
                >
                  <a href="https://instagram.com/hany.rabah" target="_blank" rel="noopener noreferrer">
                    <Instagram className="w-4 h-4 mr-2" />
                    Instagram
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-24 pt-8 border-t border-border text-center">
          <p className="text-muted-foreground">
            © {new Date().getFullYear()}. All rights reserved.
          </p>
        </div>
      </div>
    </section>
  );
}