'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut, useSession } from 'next-auth/react'
import {
  LayoutDashboard, CalendarDays, ImageIcon, Star,
  Users, Settings, LogOut, Menu, X, ChevronRight, Mail,
} from 'lucide-react'

const navItems = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { label: 'Events', href: '/admin/events', icon: CalendarDays },
  { label: 'Gallery', href: '/admin/gallery', icon: ImageIcon },
  { label: 'Testimonials', href: '/admin/testimonials', icon: Star },
  { label: 'Team', href: '/admin/team', icon: Users },
  { label: 'Inquiries', href: '/admin/inquiries', icon: Mail },
  { label: 'Settings', href: '/admin/settings', icon: Settings },
]

export default function AdminSidebar() {
  const pathname = usePathname()
  const { data: session } = useSession()
  const [mobileOpen, setMobileOpen] = useState(false)

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="px-6 py-5 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#C9A740] to-[#8B6914] flex items-center justify-center text-xs font-black text-black">BN</div>
          <div>
            <p className="text-white font-bold text-sm leading-none">Blue Neck</p>
            <p className="text-white/40 text-[10px] mt-0.5">Admin Panel</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== '/admin' && pathname.startsWith(item.href))
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group ${
                isActive
                  ? 'bg-[#C9A740]/10 text-[#C9A740] border border-[#C9A740]/20'
                  : 'text-white/50 hover:text-white hover:bg-white/5'
              }`}
            >
              <div className="flex items-center gap-3">
                <item.icon size={16} className={isActive ? 'text-[#C9A740]' : ''} />
                {item.label}
              </div>
              {isActive && <ChevronRight size={14} className="text-[#C9A740]" />}
            </Link>
          )
        })}
      </nav>

      {/* User + Logout */}
      <div className="px-3 py-4 border-t border-white/5 space-y-2">
        {session?.user && (
          <div className="px-3 py-2.5 rounded-lg bg-white/3">
            <p className="text-white text-xs font-semibold truncate">{session.user.name}</p>
            <p className="text-white/40 text-[10px] capitalize">{session.user.role}</p>
          </div>
        )}
        <button
          onClick={() => signOut({ callbackUrl: '/admin/login' })}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-white/50 hover:text-red-400 hover:bg-red-500/10 transition-all w-full"
        >
          <LogOut size={16} />
          Sign Out
        </button>
      </div>
    </div>
  )

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 w-9 h-9 bg-[#0D0D18] border border-white/10 rounded-lg flex items-center justify-center text-white"
      >
        {mobileOpen ? <X size={16} /> : <Menu size={16} />}
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/60 z-30 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar — desktop */}
      <aside className="hidden lg:flex flex-col w-56 min-h-screen bg-[#0D0D18] border-r border-white/5">
        <SidebarContent />
      </aside>

      {/* Sidebar — mobile */}
      <aside
        className={`lg:hidden fixed top-0 left-0 z-40 flex flex-col w-56 h-full bg-[#0D0D18] border-r border-white/5 transition-transform duration-300 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <SidebarContent />
      </aside>
    </>
  )
}
