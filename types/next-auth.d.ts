import NextAuth from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      email: string
      name: string
      role: 'admin' | 'editor'
    }
  }
  interface User {
    role: 'admin' | 'editor'
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    role: 'admin' | 'editor'
    id: string
  }
}
