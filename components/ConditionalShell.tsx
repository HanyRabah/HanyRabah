'use client'

import { usePathname } from 'next/navigation'
import { SiteShell } from './layout/SiteShell'
import { Shield, FileText } from 'lucide-react'

export function ConditionalShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  
  // Don't wrap admin pages with SiteShell
  const isAdminPage = pathname?.startsWith('/admin')
  
  if (isAdminPage) {
    return <>{children}</>
  }
  
  return <SiteShell>{children}<Footer /></SiteShell>
}

// const LEGAL_ITEMS = [
//   { label: "Privacy Policy", href: "/privacy", icon: Shield },
//   { label: "Terms of Service", href: "/terms", icon: FileText },
// ];


const Footer = () => {
  return (
    <footer>
      <a href="/privacy" title="Legal" />
      <a href="/terms" title="Terms" />
    </footer>
  )
}
