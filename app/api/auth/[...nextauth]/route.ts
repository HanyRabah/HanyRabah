import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import type { NextAuthOptions } from 'next-auth'

// Debug: Check if environment variables are loaded
console.log('GOOGLE_CLIENT_ID exists:', !!process.env.GOOGLE_CLIENT_ID)
console.log('GOOGLE_CLIENT_SECRET exists:', !!process.env.GOOGLE_CLIENT_SECRET)

const authOptions: NextAuthOptions = {
  debug: process.env.NODE_ENV === 'development',
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      // Only allow hany.rabah@gmail.com to sign in
      if (user.email === 'hany.rabah@gmail.com') {
        return true
      }
      return false
    },
    async session({ session, token }) {
      // Add admin role to session
      if (session.user?.email === 'hany.rabah@gmail.com') {
        session.user = {
          ...session.user,
          role: 'admin'
        }
      }
      return session
    },
    async jwt({ token, user }) {
      if (user && user.email === 'hany.rabah@gmail.com') {
        token.role = 'admin'
      }
      return token
    },
  },
  pages: {
    signIn: '/admin/login',
    error: '/admin/login',
  },
  session: {
    strategy: 'jwt',
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
