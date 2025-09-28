'use client'

import { signIn, getSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Chrome, Shield, User } from 'lucide-react'

export default function AdminLogin() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  useEffect(() => {
    // Check if user is already authenticated
    const checkAuth = async () => {
      const session = await getSession()
      if (session?.user?.email === 'hany.rabah@gmail.com') {
        router.push('/admin/dashboard')
      }
    }
    checkAuth()
  }, [router])

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true)
      setError('')
      
      const result = await signIn('google', {
        callbackUrl: '/admin/dashboard',
        redirect: false,
      })

      if (result?.error) {
        setError('Access denied. Only authorized users can access the admin dashboard.')
      }
    } catch (error) {
      setError('An error occurred during sign in. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="border-border/50 shadow-2xl">
          <CardHeader className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 bg-theme-primary/10 rounded-full flex items-center justify-center">
              <Shield className="w-8 h-8 text-theme-primary" />
            </div>
            <div>
              <CardTitle className="text-2xl font-bold">Admin Dashboard</CardTitle>
              <CardDescription className="text-muted-foreground">
                Sign in to manage your portfolio content
              </CardDescription>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {error && (
              <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm">
                {error}
              </div>
            )}
            
            <div className="space-y-4">
              <Button
                onClick={handleGoogleSignIn}
                disabled={isLoading}
                className="w-full h-12 bg-theme-primary hover:bg-theme-secondary text-white transition-colors"
                size="lg"
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Signing in...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Chrome className="w-5 h-5" />
                    <span>Continue with Google</span>
                  </div>
                )}
              </Button>
            </div>
            
            <div className="text-center space-y-2">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <User className="w-4 h-4" />
                <span>Authorized access only</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            Need help? Contact{' '}
            <a 
              href="mailto:hany.rabah@gmail.com" 
              className="text-theme-primary hover:text-theme-secondary transition-colors"
            >
              hany.rabah@gmail.com
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
