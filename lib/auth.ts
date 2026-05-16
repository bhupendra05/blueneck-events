import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import connectDB from './db'
import User from '@/models/User'

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null

        await connectDB()
        const user = await User.findOne({ email: credentials.email.toLowerCase() })
        if (!user) return null

        const isValid = await bcrypt.compare(credentials.password, user.password)
        if (!isValid) return null

        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
          role: user.role,
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as { role: 'admin' | 'editor' }).role
        token.id = user.id as string
      }
      return token
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.role = token.role as 'admin' | 'editor'
        session.user.id = token.id as string
      }
      return session
    },
  },
  pages: {
    signIn: '/admin/login',
    error: '/admin/login',
  },
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60, // 24 hours
  },
  secret: process.env.NEXTAUTH_SECRET,
}
