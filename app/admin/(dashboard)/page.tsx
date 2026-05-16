'use client'

import { useEffect, useState } from 'react'
import { CalendarDays, ImageIcon, Star, Users, TrendingUp, ExternalLink, RefreshCw } from 'lucide-react'
import Link from 'next/link'

interface Stats {
  events: number
  gallery: number
  testimonials: number
  team: number
}

function StatCard({ label, value, icon: Icon, href, color }: { label: string; value: number; icon: React.ElementType; href: string; color: string }) {
  return (
    <Link href={href} className="group block">
      <div className="bg-[#0D0D18] border border-white/5 rounded-2xl p-6 hover:border-white/10 transition-all duration-200 hover:bg-[#111120]">
        <div className="flex items-center justify-between mb-4">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center`} style={{ background: `${color}15` }}>
            <Icon size={18} style={{ color }} />
          </div>
          <ExternalLink size={14} className="text-white/20 group-hover:text-white/50 transition-colors" />
        </div>
        <p className="text-3xl font-bold text-white mb-1">{value}</p>
        <p className="text-white/50 text-sm">{label}</p>
      </div>
    </Link>
  )
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({ events: 0, gallery: 0, testimonials: 0, team: 0 })
  const [seeding, setSeeding] = useState(false)
  const [seedMsg, setSeedMsg] = useState('')
  const [loading, setLoading] = useState(true)

  const fetchStats = async () => {
    setLoading(true)
    try {
      const [events, gallery, testimonials, team] = await Promise.all([
        fetch('/api/events').then(r => r.json()),
        fetch('/api/gallery').then(r => r.json()),
        fetch('/api/testimonials').then(r => r.json()),
        fetch('/api/team').then(r => r.json()),
      ])
      setStats({
        events: events.length,
        gallery: gallery.length,
        testimonials: testimonials.length,
        team: team.length,
      })
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchStats() }, [])

  const handleSeed = async () => {
    setSeeding(true)
    setSeedMsg('')
    try {
      const res = await fetch('/api/seed', { method: 'POST' })
      const data = await res.json()
      setSeedMsg(data.message)
      fetchStats()
    } catch {
      setSeedMsg('Seed failed')
    } finally {
      setSeeding(false)
    }
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-white text-2xl font-bold">Dashboard</h1>
          <p className="text-white/40 text-sm mt-1">Welcome back — Blue Neck Events</p>
        </div>
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-2 text-sm text-white/50 hover:text-[#C9A740] transition-colors border border-white/10 hover:border-[#C9A740]/30 rounded-xl px-4 py-2"
        >
          <ExternalLink size={14} />
          View Site
        </Link>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Event Categories" value={stats.events} icon={CalendarDays} href="/admin/events" color="#C9A740" />
        <StatCard label="Gallery Items" value={stats.gallery} icon={ImageIcon} href="/admin/gallery" color="#3B82F6" />
        <StatCard label="Testimonials" value={stats.testimonials} icon={Star} href="/admin/testimonials" color="#8B5CF6" />
        <StatCard label="Team Members" value={stats.team} icon={Users} href="/admin/team" color="#10B981" />
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Seed DB */}
        <div className="bg-[#0D0D18] border border-white/5 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 rounded-xl bg-[#C9A740]/10 flex items-center justify-center">
              <RefreshCw size={16} className="text-[#C9A740]" />
            </div>
            <div>
              <p className="text-white text-sm font-semibold">Seed Database</p>
              <p className="text-white/40 text-xs">Populate with default data</p>
            </div>
          </div>
          <p className="text-white/50 text-sm mb-4">
            Run this once to fill the database with all 9 event categories, gallery images, testimonials, team members, and create the admin user.
          </p>
          {seedMsg && (
            <div className="bg-green-500/10 border border-green-500/20 rounded-lg px-4 py-2.5 mb-4">
              <p className="text-green-400 text-sm">{seedMsg}</p>
            </div>
          )}
          <button
            onClick={handleSeed}
            disabled={seeding}
            className="w-full bg-[#C9A740]/10 hover:bg-[#C9A740]/20 border border-[#C9A740]/20 hover:border-[#C9A740]/40 text-[#C9A740] text-sm font-medium py-2.5 rounded-xl transition-all disabled:opacity-50"
          >
            {seeding ? 'Seeding...' : 'Seed Database Now'}
          </button>
        </div>

        {/* Quick nav */}
        <div className="bg-[#0D0D18] border border-white/5 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 rounded-xl bg-blue-500/10 flex items-center justify-center">
              <TrendingUp size={16} className="text-blue-400" />
            </div>
            <div>
              <p className="text-white text-sm font-semibold">Quick Actions</p>
              <p className="text-white/40 text-xs">Jump to common tasks</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {[
              { label: 'Add Gallery', href: '/admin/gallery' },
              { label: 'Add Testimonial', href: '/admin/testimonials' },
              { label: 'Edit Events', href: '/admin/events' },
              { label: 'Site Settings', href: '/admin/settings' },
            ].map(item => (
              <Link
                key={item.href}
                href={item.href}
                className="bg-white/3 hover:bg-white/6 border border-white/5 hover:border-white/10 rounded-xl px-4 py-3 text-white/60 hover:text-white text-sm transition-all text-center"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
