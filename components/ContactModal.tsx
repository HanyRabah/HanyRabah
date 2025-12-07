"use client";

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ThemedButton } from '@/components/ui/themed-button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Mail, CheckCircle2, AlertCircle } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultReason?: string;
}

const CONTACT_REASONS = [
  { value: 'PROJECT', label: 'Project Inquiry' },
  { value: 'WORK', label: 'Work Opportunity' },
  { value: 'CONSULTING', label: 'Consulting' },
  { value: 'READING_LIST', label: 'Reading List Suggestion' },
  { value: 'TECH_ESSENTIALS', label: 'Tech Essentials Suggestion' },
  { value: 'WALLPAPERS', label: 'Wallpapers Request' },
  { value: 'PODCAST', label: 'Podcast Topic' },
  { value: 'COLLABORATION', label: 'Collaboration' },
  { value: 'OTHER', label: 'Other' },
];

export function ContactModal({ isOpen, onClose, defaultReason }: ContactModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    reason: defaultReason || '',
    message: '',
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
        setFormData({ name: '', email: '', reason: '', message: '' });
        
        // Close modal after 2 seconds on success
        setTimeout(() => {
          onClose();
          setSubmitStatus('idle');
        }, 2000);
      } else {
        const data = await response.json();
        console.error('Error:', data.error);
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleReasonChange = (value: string) => {
    setFormData({
      ...formData,
      reason: value,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        className="contact-modal-content flex flex-col h-screen w-[25vw] min-w-[400px] max-w-none rounded-none border-l p-0 overflow-hidden z-[100]"
      >
        <div className="bg-background border-b border-border p-6 flex-shrink-0">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-2xl">
              <Mail className="h-6 w-6 text-theme-primary" />
              Get in Touch
            </DialogTitle>
            <DialogDescription>
              Have a project, role, or idea in mind? Fill out the form below and I'll get back to you soon.
            </DialogDescription>
          </DialogHeader>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 p-6 flex-1 overflow-y-auto">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-2">
              Name <span className="text-destructive">*</span>
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

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email <span className="text-destructive">*</span>
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

          {/* Contact Reason */}
          <div>
            <label htmlFor="reason" className="block text-sm font-medium mb-2">
              What are you contacting me about? <span className="text-destructive">*</span>
            </label>
            <Select
              value={formData.reason}
              onValueChange={handleReasonChange}
            >
              <SelectTrigger className="bg-background border-border focus:border-theme-primary">
                <SelectValue placeholder="Select a reason" />
              </SelectTrigger>
              <SelectContent className="z-[150]">
                {CONTACT_REASONS.map((reason) => (
                  <SelectItem key={reason.value} value={reason.value}>
                    {reason.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Message */}
          <div>
            <label htmlFor="message" className="block text-sm font-medium mb-2">
              Message <span className="text-destructive">*</span>
            </label>
            <Textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell me about your project, opportunity, or idea..."
              required
              rows={5}
              className="bg-background border-border focus:border-theme-primary resize-none"
            />
          </div>

          {/* Status Messages */}
          {submitStatus === 'success' && (
            <div className="flex items-center gap-2 p-3 bg-green-500/10 border border-green-500/20 rounded-lg text-green-600 dark:text-green-400">
              <CheckCircle2 className="h-5 w-5" />
              <p className="text-sm font-medium">
                Message sent successfully! I'll get back to you soon.
              </p>
            </div>
          )}

          {submitStatus === 'error' && (
            <div className="flex items-center gap-2 p-3 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive">
              <AlertCircle className="h-5 w-5" />
              <p className="text-sm font-medium">
                Failed to send message. Please try again.
              </p>
            </div>
          )}

          {/* Submit Button */}
          <div className="flex gap-3 pt-2">
            <ThemedButton
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
              disabled={isSubmitting}
            >
              Cancel
            </ThemedButton>
            <ThemedButton
              type="submit"
              variant="default"
              disabled={isSubmitting || !formData.reason}
              className="flex-1"
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </ThemedButton>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
