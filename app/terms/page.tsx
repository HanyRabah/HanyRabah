import type { Metadata } from 'next'
import { PageHeader } from '@/components/PageHeader'
import { FileText } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms of service for Hany Rabah\'s portfolio website, outlining the rules and regulations for using our website.',
}

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-12">
        <PageHeader
          title="Terms of Service"
          icon={FileText}
          description={`Last updated: ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}`}
          gradient={false}
          splitColor={false}
        />

      <div className="prose prose-lg max-w-none dark:prose-invert">
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Introduction</h2>
          <p>
            Welcome to Hany Rabah's portfolio website ("we," "our," or "us"). These Terms of Service 
            ("Terms") govern your use of our website located at hanyrabah.com (the "Service") 
            operated by Hany Rabah.
          </p>
          <p>
            By accessing or using our Service, you agree to be bound by these Terms. If you disagree 
            with any part of these terms, then you may not access the Service.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Acceptance of Terms</h2>
          <p>
            By accessing and using this website, you accept and agree to be bound by the terms and 
            provision of this agreement. If you do not agree to abide by the above, please do not 
            use this service.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Use License</h2>
          <p>
            Permission is granted to temporarily download one copy of the materials on this website 
            for personal, non-commercial transitory viewing only. This is the grant of a license, 
            not a transfer of title, and under this license you may not:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Modify or copy the materials</li>
            <li>Use the materials for any commercial purpose or for any public display</li>
            <li>Attempt to reverse engineer any software contained on the website</li>
            <li>Remove any copyright or other proprietary notations from the materials</li>
          </ul>
          <p>
            This license shall automatically terminate if you violate any of these restrictions and 
            may be terminated by us at any time.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Intellectual Property Rights</h2>
          <p>
            The Service and its original content, features, and functionality are and will remain 
            the exclusive property of Hany Rabah and its licensors. The Service is protected by 
            copyright, trademark, and other laws. Our trademarks and trade dress may not be used 
            in connection with any product or service without our prior written consent.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">User Content</h2>
          <p>
            Our Service may allow you to post, link, store, share and otherwise make available 
            certain information, text, graphics, videos, or other material ("Content"). You are 
            responsible for the Content that you post to the Service, including its legality, 
            reliability, and appropriateness.
          </p>
          <p>
            By posting Content to the Service, you grant us the right and license to use, modify, 
            publicly perform, publicly display, reproduce, and distribute such Content on and 
            through the Service.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Prohibited Uses</h2>
          <p>You may not use our Service:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>For any unlawful purpose or to solicit others to perform unlawful acts</li>
            <li>To violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances</li>
            <li>To infringe upon or violate our intellectual property rights or the intellectual property rights of others</li>
            <li>To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</li>
            <li>To submit false or misleading information</li>
            <li>To upload or transmit viruses or any other type of malicious code</li>
            <li>To collect or track the personal information of others</li>
            <li>To spam, phish, pharm, pretext, spider, crawl, or scrape</li>
            <li>For any obscene or immoral purpose</li>
            <li>To interfere with or circumvent the security features of the Service</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Disclaimer</h2>
          <p>
            The information on this website is provided on an "as is" basis. To the fullest extent 
            permitted by law, this Company:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Excludes all representations and warranties relating to this website and its contents</li>
            <li>Excludes all liability for damages arising out of or in connection with your use of this website</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Limitation of Liability</h2>
          <p>
            In no event shall Hany Rabah, nor its directors, employees, partners, agents, suppliers, 
            or affiliates, be liable for any indirect, incidental, special, consequential, or punitive 
            damages, including without limitation, loss of profits, data, use, goodwill, or other 
            intangible losses, resulting from your use of the Service.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Governing Law</h2>
          <p>
            These Terms shall be interpreted and governed by the laws of Germany, without regard to 
            its conflict of law provisions. Our failure to enforce any right or provision of these 
            Terms will not be considered a waiver of those rights.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Changes to Terms</h2>
          <p>
            We reserve the right, at our sole discretion, to modify or replace these Terms at any 
            time. If a revision is material, we will try to provide at least 30 days notice prior 
            to any new terms taking effect.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Contact Information</h2>
          <p>
            If you have any questions about these Terms of Service, please contact us:
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
