'use client'

import { usePathname } from 'next/navigation'
import { SiteShell } from './layout/SiteShell'

export function ConditionalShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  
  // Don't wrap admin pages with SiteShell
  const isAdminPage = pathname?.startsWith('/admin')
  
  if (isAdminPage) {
    return <>{children}</>
  }
  
  return <SiteShell>{children}</SiteShell>
}
