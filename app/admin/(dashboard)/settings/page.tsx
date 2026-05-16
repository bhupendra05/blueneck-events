'use client'

import { useEffect, useState } from 'react'
import { Loader2, Save, X, ImageIcon, Plus, Trash2, GripVertical } from 'lucide-react'
import MediaUpload from '@/components/admin/MediaUpload'

interface HeroSlide {
  image: string
  cloudinaryId?: string
  label?: string
  accent?: string
}

interface Stat {
  value: number
  suffix: string
  label: string
}

interface Config {
  name: string; tagline: string; description: string; email: string
  phone: string; whatsapp: string; address: string; instagram: string
  facebook: string; founded: number; heroTagline: string; heroSubtitle: string
  heroSlides: HeroSlide[]
  stats: Stat[]
  featuredEventIds: string[]
}

const fields: Array<{ key: keyof Config; label: string; type?: string; span?: boolean }> = [
  { key: 'name', label: 'Company Name' },
  { key: 'tagline', label: 'Brand Tagline' },
  { key: 'description', label: 'Description', span: true },
  { key: 'email', label: 'Email' },
  { key: 'phone', label: 'Phone' },
  { key: 'whatsapp', label: 'WhatsApp Number' },
  { key: 'address', label: 'Address' },
  { key: 'instagram', label: 'Instagram URL' },
  { key: 'facebook', label: 'Facebook URL' },
  { key: 'founded', label: 'Founded Year', type: 'number' },
  { key: 'heroTagline', label: 'Hero Tagline', span: true },
  { key: 'heroSubtitle', label: 'Hero Subtitle', span: true },
]

const defaultAccents = ['#C9A740', '#9B59B6', '#3498DB', '#2A6BB0']

export default function SettingsAdmin() {
  const [form, setForm] = useState<Config>({
    name: '', tagline: '', description: '', email: '', phone: '',
    whatsapp: '', address: '', instagram: '', facebook: '',
    founded: 2015, heroTagline: '', heroSubtitle: '', heroSlides: [],
    stats: [], featuredEventIds: [],
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [events, setEvents] = useState<Array<{ id: string; label: string; icon: string }>>([])

  useEffect(() => {
    fetch('/api/settings').then(r => r.json()).then(data => {
      setForm(f => ({
        ...f,
        ...data,
        heroSlides: Array.isArray(data.heroSlides) ? data.heroSlides : [],
        stats: Array.isArray(data.stats) ? data.stats : [],
        featuredEventIds: Array.isArray(data.featuredEventIds) ? data.featuredEventIds : [],
      }))
      setLoading(false)
    })
    fetch('/api/events').then(r => r.json()).then(data => {
      if (Array.isArray(data)) setEvents(data.map((e: any) => ({ id: e.id, label: e.label, icon: e.icon })))
    })
  }, [])

  const handleSave = async () => {
    setSaving(true)
    await fetch('/api/settings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    setSaving(false); setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const removeSlide = (index: number) => {
    setForm(f => ({ ...f, heroSlides: f.heroSlides.filter((_, i) => i !== index) }))
  }

  const updateSlide = (index: number, field: keyof HeroSlide, value: string) => {
    setForm(f => ({
      ...f,
      heroSlides: f.heroSlides.map((s, i) => i === index ? { ...s, [field]: value } : s),
    }))
  }

  const addStat = () => {
    setForm(f => ({ ...f, stats: [...f.stats, { value: 0, suffix: '', label: '' }] }))
  }

  const updateStat = (index: number, field: keyof Stat, value: string | number) => {
    setForm(f => ({
      ...f,
      stats: f.stats.map((s, i) => i === index ? { ...s, [field]: value } : s),
    }))
  }

  const removeStat = (index: number) => {
    setForm(f => ({ ...f, stats: f.stats.filter((_, i) => i !== index) }))
  }

  const toggleFeaturedEvent = (eventId: string) => {
    setForm(f => ({
      ...f,
      featuredEventIds: f.featuredEventIds.includes(eventId)
        ? f.featuredEventIds.filter(id => id !== eventId)
        : [...f.featuredEventIds, eventId],
    }))
  }

  if (loading) return <div className="flex justify-center py-24"><Loader2 className="text-[#C9A740] animate-spin" size={32} /></div>

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-white text-2xl font-bold">Site Settings</h1>
          <p className="text-white/40 text-sm mt-1">Manage company info, homepage content & hero images</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 bg-[#C9A740] hover:bg-[#B8963A] text-black text-sm font-semibold px-5 py-2.5 rounded-xl transition-all disabled:opacity-50"
        >
          {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
          {saved ? 'Saved!' : saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      {/* Company Information */}
      <div className="bg-[#0D0D18] border border-white/5 rounded-2xl p-6">
        <h2 className="text-white font-semibold mb-5 pb-4 border-b border-white/5">Company Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {fields.map(f => (
            <div key={f.key} className={f.span ? 'md:col-span-2' : ''}>
              <label className="text-white/50 text-xs mb-1.5 block">{f.label}</label>
              {f.key === 'description' || f.key === 'heroSubtitle' ? (
                <textarea
                  value={String(form[f.key])}
                  onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                  rows={2}
                  className="w-full bg-white/5 border border-white/8 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#C9A740]/50 resize-none transition-all"
                />
              ) : (
                <input
                  type={f.type || 'text'}
                  value={String(form[f.key])}
                  onChange={e => setForm(p => ({ ...p, [f.key]: f.type === 'number' ? +e.target.value : e.target.value }))}
                  className="w-full bg-white/5 border border-white/8 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#C9A740]/50 transition-all"
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Hero Slideshow Images */}
      <div className="bg-[#0D0D18] border border-white/5 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-5 pb-4 border-b border-white/5">
          <div>
            <h2 className="text-white font-semibold">Homepage Hero Slides</h2>
            <p className="text-white/40 text-xs mt-0.5">These images appear on the homepage hero section. Upload up to 6.</p>
          </div>
          <span className="text-white/30 text-sm">{form.heroSlides.length}/6</span>
        </div>

        {/* Existing slides with label & accent editors */}
        {form.heroSlides.length > 0 && (
          <div className="space-y-4 mb-5">
            {form.heroSlides.map((slide, i) => (
              <div key={i} className="flex gap-4 items-start bg-white/3 rounded-xl p-4 border border-white/5">
                <div className="relative w-28 h-20 rounded-lg overflow-hidden flex-shrink-0 border border-white/10">
                  <img src={slide.image} alt={`Slide ${i + 1}`} className="w-full h-full object-cover" />
                  <button
                    onClick={() => removeSlide(i)}
                    className="absolute top-1 right-1 w-5 h-5 bg-red-500/90 hover:bg-red-600 text-white rounded-full flex items-center justify-center"
                  >
                    <X size={10} />
                  </button>
                </div>
                <div className="flex-1 grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-white/40 text-[10px] mb-1 block">Slide Label</label>
                    <input
                      value={slide.label || ''}
                      onChange={e => updateSlide(i, 'label', e.target.value)}
                      placeholder="e.g. Weddings"
                      className="w-full bg-white/5 border border-white/8 rounded-lg px-3 py-1.5 text-white text-xs focus:outline-none focus:border-[#C9A740]/50"
                    />
                  </div>
                  <div>
                    <label className="text-white/40 text-[10px] mb-1 block">Accent Color</label>
                    <div className="flex gap-2">
                      <input
                        type="color"
                        value={slide.accent || defaultAccents[i % defaultAccents.length]}
                        onChange={e => updateSlide(i, 'accent', e.target.value)}
                        className="w-8 h-8 rounded border border-white/10 bg-transparent cursor-pointer"
                      />
                      <input
                        value={slide.accent || ''}
                        onChange={e => updateSlide(i, 'accent', e.target.value)}
                        placeholder="#C9A740"
                        className="flex-1 bg-white/5 border border-white/8 rounded-lg px-3 py-1.5 text-white text-xs font-mono focus:outline-none focus:border-[#C9A740]/50"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Upload area */}
        {form.heroSlides.length < 6 && (
          <MediaUpload
            folder="blueneck-events/hero"
            label="Upload Hero Slide Image"
            accept="image/*"
            onUpload={(result) => {
              setForm(f => ({
                ...f,
                heroSlides: [...f.heroSlides, {
                  image: result.url,
                  cloudinaryId: result.publicId,
                  label: '',
                  accent: defaultAccents[f.heroSlides.length % defaultAccents.length],
                }],
              }))
            }}
          />
        )}

        {form.heroSlides.length >= 6 && (
          <p className="text-white/30 text-xs text-center py-3">
            Maximum 6 slides reached. Remove a slide to upload a new one.
          </p>
        )}

        <p className="text-white/20 text-xs mt-3 flex items-center gap-1.5">
          <ImageIcon size={11} />
          After uploading, click <strong className="text-white/40">Save Changes</strong> to apply to the website.
        </p>
      </div>

      {/* Homepage Stats */}
      <div className="bg-[#0D0D18] border border-white/5 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-5 pb-4 border-b border-white/5">
          <div>
            <h2 className="text-white font-semibold">Homepage Stats</h2>
            <p className="text-white/40 text-xs mt-0.5">Stats displayed in the hero section counter</p>
          </div>
          <button onClick={addStat} className="flex items-center gap-1.5 bg-[#C9A740]/10 hover:bg-[#C9A740]/20 text-[#C9A740] text-xs font-medium px-3 py-1.5 rounded-lg border border-[#C9A740]/20 transition-all">
            <Plus size={12} /> Add Stat
          </button>
        </div>
        {form.stats.length === 0 ? (
          <p className="text-white/30 text-sm text-center py-6">No stats added yet. Click "Add Stat" to create one.</p>
        ) : (
          <div className="space-y-3">
            {form.stats.map((stat, i) => (
              <div key={i} className="flex gap-3 items-center bg-white/3 rounded-xl p-3 border border-white/5">
                <GripVertical size={14} className="text-white/20 flex-shrink-0" />
                <div className="flex-1 grid grid-cols-3 gap-3">
                  <div>
                    <label className="text-white/40 text-[10px] mb-1 block">Value</label>
                    <input
                      type="number"
                      value={stat.value}
                      onChange={e => updateStat(i, 'value', +e.target.value)}
                      className="w-full bg-white/5 border border-white/8 rounded-lg px-3 py-1.5 text-white text-xs focus:outline-none focus:border-[#C9A740]/50"
                    />
                  </div>
                  <div>
                    <label className="text-white/40 text-[10px] mb-1 block">Suffix</label>
                    <input
                      value={stat.suffix}
                      onChange={e => updateStat(i, 'suffix', e.target.value)}
                      placeholder="+"
                      className="w-full bg-white/5 border border-white/8 rounded-lg px-3 py-1.5 text-white text-xs focus:outline-none focus:border-[#C9A740]/50"
                    />
                  </div>
                  <div>
                    <label className="text-white/40 text-[10px] mb-1 block">Label</label>
                    <input
                      value={stat.label}
                      onChange={e => updateStat(i, 'label', e.target.value)}
                      placeholder="Events"
                      className="w-full bg-white/5 border border-white/8 rounded-lg px-3 py-1.5 text-white text-xs focus:outline-none focus:border-[#C9A740]/50"
                    />
                  </div>
                </div>
                <button onClick={() => removeStat(i)} className="w-7 h-7 bg-red-500/10 hover:bg-red-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Trash2 size={12} className="text-red-400" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Featured Events */}
      <div className="bg-[#0D0D18] border border-white/5 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-5 pb-4 border-b border-white/5">
          <div>
            <h2 className="text-white font-semibold">Featured Events</h2>
            <p className="text-white/40 text-xs mt-0.5">Select which events appear in the "Stories We Crafted" section on the homepage</p>
          </div>
          <span className="text-white/30 text-sm">{form.featuredEventIds.length} selected</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {events.map(e => (
            <button
              key={e.id}
              onClick={() => toggleFeaturedEvent(e.id)}
              className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-all border ${
                form.featuredEventIds.includes(e.id)
                  ? 'bg-[#C9A740]/10 text-[#C9A740] border-[#C9A740]/25'
                  : 'bg-white/3 text-white/50 border-white/5 hover:border-white/15 hover:text-white/70'
              }`}
            >
              <span className="text-base">{e.icon}</span>
              {e.label}
            </button>
          ))}
        </div>
      </div>

      {saved && (
        <div className="fixed bottom-6 right-6 bg-green-500 text-white px-5 py-3 rounded-xl shadow-lg text-sm font-medium animate-pulse">
          ✓ Settings saved successfully
        </div>
      )}
    </div>
  )
}
