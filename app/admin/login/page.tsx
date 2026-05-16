'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, Loader2, Lock, Mail } from 'lucide-react'
import SessionProvider from '@/components/admin/SessionProvider'

function LoginForm() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    })
    setLoading(false)
    if (result?.error) {
      setError('Invalid email or password')
    } else {
      router.push('/admin')
      router.refresh()
    }
  }

  return (
    <div className="min-h-screen bg-[#08080F] flex items-center justify-center px-4">
      {/* Background glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#C9A740]/5 rounded-full blur-[120px]" />
      </div>

      <div className="w-full max-w-sm relative z-10">
        {/* Logo */}
        <div className="text-center mb-10">
          <div className="inline-flex w-14 h-14 rounded-2xl bg-gradient-to-br from-[#C9A740] to-[#8B6914] items-center justify-center text-xl font-black text-black mb-4">
            BN
          </div>
          <h1 className="text-white text-2xl font-bold">Blue Neck Events</h1>
          <p className="text-white/40 text-sm mt-1">Admin Dashboard</p>
        </div>

        {/* Card */}
        <div className="bg-[#0D0D18] border border-white/5 rounded-2xl p-8 shadow-2xl">
          <h2 className="text-white font-semibold text-lg mb-6">Sign in to continue</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label className="text-white/60 text-xs font-medium mb-1.5 block">Email Address</label>
              <div className="relative">
                <Mail size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="admin@blueneckevents.com"
                  className="w-full bg-white/5 border border-white/8 rounded-xl px-4 pl-10 py-3 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-[#C9A740]/50 focus:bg-[#C9A740]/3 transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="text-white/60 text-xs font-medium mb-1.5 block">Password</label>
              <div className="relative">
                <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
                <input
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full bg-white/5 border border-white/8 rounded-xl px-4 pl-10 pr-10 py-3 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-[#C9A740]/50 focus:bg-[#C9A740]/3 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
                >
                  {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-2.5">
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#C9A740] to-[#A8832A] text-black font-semibold py-3 rounded-xl text-sm hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-50 flex items-center justify-center gap-2 mt-2"
            >
              {loading && <Loader2 size={15} className="animate-spin" />}
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
        </div>

        <p className="text-center text-white/20 text-xs mt-6">
          Blue Neck Events © {new Date().getFullYear()} — Admin Access Only
        </p>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <SessionProvider>
      <LoginForm />
    </SessionProvider>
  )
}
