/**
 * Authentication utility functions
 */

/**
 * Check if an email is authorized as an admin
 * @param email - The email address to check
 * @returns true if the email is in the ADMIN_EMAILS list
 */
export function isAdmin(email: string | null | undefined): boolean {
  if (!email) return false
  
  const adminEmails = process.env.ADMIN_EMAILS?.split(',').map(e => e.trim()) || []
  
  // Fallback to hardcoded email if ADMIN_EMAILS is not set
  if (adminEmails.length === 0) {
    console.warn('ADMIN_EMAILS environment variable is not set. Using fallback.')
    return email === 'hany.rabah@gmail.com'
  }
  
  return adminEmails.includes(email)
}

/**
 * Get list of admin emails (for logging/debugging purposes)
 * @returns Array of admin email addresses
 */
export function getAdminEmails(): string[] {
  return process.env.ADMIN_EMAILS?.split(',').map(e => e.trim()) || []
}
