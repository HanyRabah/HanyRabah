import type { Metadata } from 'next'
import { PageHeader } from '@/components/PageHeader'
import { Shield } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy policy for Hany Rabah\'s portfolio website, detailing how we collect, use, and protect your personal information.',
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-12">
        <PageHeader
          title="Privacy Policy"
          icon={Shield}
          description={`Last updated: ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}`}
          gradient={false}
          splitColor={false}
        />

      <div className="prose prose-lg max-w-none dark:prose-invert">
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Introduction</h2>
          <p>
            This Privacy Policy describes how Hany Rabah ("we," "our," or "us") collects, uses, and protects 
            your personal information when you visit our portfolio website at hanyrabah.com (the "Service").
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Information We Collect</h2>
          
          <h3 className="text-xl font-medium">Personal Information</h3>
          <p>
            When you contact us through our contact form, we collect:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Your name</li>
            <li>Email address</li>
            <li>Message content</li>
            <li>Any additional information you choose to provide</li>
          </ul>

          <h3 className="text-xl font-medium">Automatically Collected Information</h3>
          <p>
            We automatically collect certain information when you visit our website:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>IP address</li>
            <li>Browser type and version</li>
            <li>Operating system</li>
            <li>Pages visited and time spent on pages</li>
            <li>Referring website</li>
            <li>Device information</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">How We Use Your Information</h2>
          <p>We use the collected information for the following purposes:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>To respond to your inquiries and provide customer support</li>
            <li>To improve our website and user experience</li>
            <li>To analyze website usage and performance</li>
            <li>To comply with legal obligations</li>
            <li>To protect against fraud and abuse</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Cookies and Tracking Technologies</h2>
          <p>
            We use cookies and similar tracking technologies to enhance your browsing experience:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li><strong>Essential Cookies:</strong> Required for basic website functionality</li>
            <li><strong>Analytics Cookies:</strong> Help us understand how visitors use our website</li>
            <li><strong>Preference Cookies:</strong> Remember your settings and preferences</li>
          </ul>
          <p>
            You can control cookie settings through your browser preferences. However, disabling certain 
            cookies may affect website functionality.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Third-Party Services</h2>
          <p>We use the following third-party services that may collect information:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li><strong>Google Analytics:</strong> For website analytics and performance monitoring</li>
            <li><strong>Vercel Analytics:</strong> For website performance and usage analytics</li>
            <li><strong>Consent Manager:</strong> For cookie consent management</li>
          </ul>
          <p>
            These services have their own privacy policies governing the use of your information.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Data Security</h2>
          <p>
            We implement appropriate technical and organizational measures to protect your personal 
            information against unauthorized access, alteration, disclosure, or destruction. However, 
            no method of transmission over the internet is 100% secure.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Data Retention</h2>
          <p>
            We retain your personal information only for as long as necessary to fulfill the purposes 
            outlined in this Privacy Policy, unless a longer retention period is required by law.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Your Rights</h2>
          <p>Depending on your location, you may have the following rights:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Access to your personal information</li>
            <li>Correction of inaccurate information</li>
            <li>Deletion of your personal information</li>
            <li>Restriction of processing</li>
            <li>Data portability</li>
            <li>Objection to processing</li>
          </ul>
          <p>
            To exercise these rights, please contact us at the information provided below.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Children's Privacy</h2>
          <p>
            Our Service is not intended for children under 13 years of age. We do not knowingly 
            collect personal information from children under 13.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Changes to This Privacy Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify you of any changes 
            by posting the new Privacy Policy on this page with an updated "Last updated" date.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Email: contact@hanyrabah.com</li>
            <li>Website: hanyrabah.com</li>
          </ul>
        </section>
      </div>
      </div>
    </div>
  )
}
