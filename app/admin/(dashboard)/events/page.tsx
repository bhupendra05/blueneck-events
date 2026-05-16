'use client'

import { useEffect, useState } from 'react'
import { Pencil, Loader2, X, ChevronDown, ChevronUp, Plus, Trash2 } from 'lucide-react'
import Image from 'next/image'
import MediaUpload from '@/components/admin/MediaUpload'

interface Service { title: string; description: string; icon: string }
interface Stat { value: number; suffix: string; label: string }

interface EventCategory {
  _id: string; id: string; label: string; tagline: string; description: string
  heroImage: string; cloudinaryId?: string; color: string; accentColor: string; icon: string
  services: Service[]; stats: Stat[]; isActive: boolean; order: number
}

export default function EventsAdmin() {
  const [items, setItems] = useState<EventCategory[]>([])
  const [loading, setLoading] = useState(true)
  const [editItem, setEditItem] = useState<EventCategory | null>(null)
  const [form, setForm] = useState<Partial<EventCategory>>({})
  const [saving, setSaving] = useState(false)
  const [expanded, setExpanded] = useState<string | null>(null)

  const fetch_ = async () => { setLoading(true); const r = await fetch('/api/events'); setItems(await r.json()); setLoading(false) }
  useEffect(() => { fetch_() }, [])

  const openEdit = (e: EventCategory) => {
    setEditItem(e)
    setForm({
      label: e.label, tagline: e.tagline, description: e.description,
      heroImage: e.heroImage, cloudinaryId: e.cloudinaryId,
      color: e.color, accentColor: e.accentColor, icon: e.icon, isActive: e.isActive,
      services: Array.isArray(e.services) ? e.services : [],
      stats: Array.isArray(e.stats) ? e.stats : [],
      order: e.order,
    })
  }

  const handleSave = async () => {
    if (!editItem) return
    setSaving(true)
    await fetch(`/api/events/${editItem.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
    setSaving(false); setEditItem(null); fetch_()
  }

  // Services management
  const addService = () => {
    const services = [...(form.services || []), { title: '', description: '', icon: '✨' }]
    setForm(f => ({ ...f, services }))
  }
  const updateService = (index: number, field: keyof Service, value: string) => {
    const services = (form.services || []).map((s, i) => i === index ? { ...s, [field]: value } : s)
    setForm(f => ({ ...f, services }))
  }
  const removeService = (index: number) => {
    const services = (form.services || []).filter((_, i) => i !== index)
    setForm(f => ({ ...f, services }))
  }

  // Stats management
  const addStat = () => {
    const stats = [...(form.stats || []), { value: 0, suffix: '', label: '' }]
    setForm(f => ({ ...f, stats }))
  }
  const updateStat = (index: number, field: keyof Stat, value: string | number) => {
    const stats = (form.stats || []).map((s, i) => i === index ? { ...s, [field]: value } : s)
    setForm(f => ({ ...f, stats }))
  }
  const removeStat = (index: number) => {
    const stats = (form.stats || []).filter((_, i) => i !== index)
    setForm(f => ({ ...f, stats }))
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-white text-2xl font-bold">Event Categories</h1>
        <p className="text-white/40 text-sm mt-1">Manage the 9 event types displayed on the website</p>
      </div>

      {/* Edit Panel */}
      {editItem && (
        <div className="bg-[#0D0D18] border border-[#C9A740]/20 rounded-2xl p-6 space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="text-white font-semibold">Editing: {editItem.label}</h2>
            <button onClick={() => setEditItem(null)}><X size={18} className="text-white/50 hover:text-white" /></button>
          </div>

          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[['label', 'Display Label'], ['tagline', 'Tagline'], ['icon', 'Icon (emoji)']].map(([k, l]) => (
              <div key={k}>
                <label className="text-white/50 text-xs mb-1.5 block">{l}</label>
                <input value={(form as Record<string, string>)[k] || ''} onChange={e => setForm(f => ({ ...f, [k]: e.target.value }))} className="w-full bg-white/5 border border-white/8 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#C9A740]/50" />
              </div>
            ))}
            <div>
              <label className="text-white/50 text-xs mb-1.5 block">Display Order</label>
              <input type="number" value={form.order ?? 0} onChange={e => setForm(f => ({ ...f, order: +e.target.value }))} className="w-full bg-white/5 border border-white/8 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#C9A740]/50" />
            </div>
            <div>
              <label className="text-white/50 text-xs mb-1.5 block">Status</label>
              <select value={form.isActive ? 'true' : 'false'} onChange={e => setForm(f => ({ ...f, isActive: e.target.value === 'true' }))} className="w-full bg-[#0D0D18] border border-white/8 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#C9A740]/50">
                <option value="true">Active</option>
                <option value="false">Hidden</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-white/50 text-xs mb-1.5 block">Description</label>
            <textarea value={form.description || ''} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} rows={3} className="w-full bg-white/5 border border-white/8 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#C9A740]/50 resize-none" />
          </div>

          {/* Accent Color */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-white/50 text-xs mb-1.5 block">Accent Color</label>
              <div className="flex gap-2">
                <input type="color" value={form.accentColor || '#C9A740'} onChange={e => setForm(f => ({ ...f, accentColor: e.target.value, color: e.target.value }))} className="w-10 h-10 rounded-lg border border-white/10 bg-transparent cursor-pointer" />
                <input value={form.accentColor || ''} onChange={e => setForm(f => ({ ...f, accentColor: e.target.value }))} className="flex-1 bg-white/5 border border-white/8 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-[#C9A740]/50 font-mono" />
              </div>
            </div>
          </div>

          {/* Hero Image Upload */}
          <div>
            <label className="text-white/50 text-xs mb-2 block">Hero Image</label>
            {form.heroImage && (
              <div className="relative w-48 h-28 rounded-xl overflow-hidden border border-white/10 mb-3 group">
                <Image src={form.heroImage} alt="Hero preview" fill className="object-cover" />
                <button
                  onClick={() => setForm(f => ({ ...f, heroImage: '', cloudinaryId: '' }))}
                  className="absolute top-2 right-2 w-6 h-6 bg-red-500/90 hover:bg-red-600 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X size={12} />
                </button>
              </div>
            )}
            <MediaUpload
              folder={`blueneck-events/${editItem.id}`}
              label="Upload Hero Image"
              accept="image/*"
              onUpload={(result) => {
                setForm(f => ({ ...f, heroImage: result.url, cloudinaryId: result.publicId }))
              }}
            />
          </div>

          {/* Services Editor */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-white/50 text-xs">Services ({(form.services || []).length})</label>
              <button onClick={addService} className="flex items-center gap-1 text-[#C9A740] text-xs hover:underline">
                <Plus size={12} /> Add Service
              </button>
            </div>
            <div className="space-y-2">
              {(form.services || []).map((s, i) => (
                <div key={i} className="flex gap-2 items-start bg-white/3 rounded-lg p-3 border border-white/5">
                  <div className="flex-1 grid grid-cols-[1fr_2fr_auto] gap-2">
                    <input value={s.title} onChange={e => updateService(i, 'title', e.target.value)} placeholder="Title" className="bg-white/5 border border-white/8 rounded-lg px-3 py-1.5 text-white text-xs focus:outline-none focus:border-[#C9A740]/50" />
                    <input value={s.description} onChange={e => updateService(i, 'description', e.target.value)} placeholder="Description" className="bg-white/5 border border-white/8 rounded-lg px-3 py-1.5 text-white text-xs focus:outline-none focus:border-[#C9A740]/50" />
                    <input value={s.icon} onChange={e => updateService(i, 'icon', e.target.value)} className="w-10 text-center bg-white/5 border border-white/8 rounded-lg px-1 py-1.5 text-white text-xs focus:outline-none focus:border-[#C9A740]/50" />
                  </div>
                  <button onClick={() => removeService(i)} className="w-6 h-6 bg-red-500/10 hover:bg-red-500/20 rounded flex items-center justify-center flex-shrink-0">
                    <Trash2 size={10} className="text-red-400" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Stats Editor */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-white/50 text-xs">Stats ({(form.stats || []).length})</label>
              <button onClick={addStat} className="flex items-center gap-1 text-[#C9A740] text-xs hover:underline">
                <Plus size={12} /> Add Stat
              </button>
            </div>
            <div className="space-y-2">
              {(form.stats || []).map((s, i) => (
                <div key={i} className="flex gap-2 items-center bg-white/3 rounded-lg p-3 border border-white/5">
                  <div className="flex-1 grid grid-cols-3 gap-2">
                    <input type="number" value={s.value} onChange={e => updateStat(i, 'value', +e.target.value)} placeholder="Value" className="bg-white/5 border border-white/8 rounded-lg px-3 py-1.5 text-white text-xs focus:outline-none focus:border-[#C9A740]/50" />
                    <input value={s.suffix} onChange={e => updateStat(i, 'suffix', e.target.value)} placeholder="Suffix (+)" className="bg-white/5 border border-white/8 rounded-lg px-3 py-1.5 text-white text-xs focus:outline-none focus:border-[#C9A740]/50" />
                    <input value={s.label} onChange={e => updateStat(i, 'label', e.target.value)} placeholder="Label" className="bg-white/5 border border-white/8 rounded-lg px-3 py-1.5 text-white text-xs focus:outline-none focus:border-[#C9A740]/50" />
                  </div>
                  <button onClick={() => removeStat(i)} className="w-6 h-6 bg-red-500/10 hover:bg-red-500/20 rounded flex items-center justify-center flex-shrink-0">
                    <Trash2 size={10} className="text-red-400" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-3">
            <button onClick={handleSave} disabled={saving} className="bg-[#C9A740] hover:bg-[#B8963A] text-black text-sm font-semibold px-5 py-2.5 rounded-xl transition-all disabled:opacity-50 flex items-center gap-2">{saving && <Loader2 size={14} className="animate-spin" />}Save Changes</button>
            <button onClick={() => setEditItem(null)} className="text-white/50 hover:text-white text-sm px-5 py-2.5 rounded-xl border border-white/10 transition-all">Cancel</button>
          </div>
        </div>
      )}

      {loading ? <div className="flex justify-center py-24"><Loader2 className="text-[#C9A740] animate-spin" size={32} /></div> : (
        <div className="space-y-3">
          {items.map(e => (
            <div key={e._id} className="bg-[#0D0D18] border border-white/5 rounded-2xl overflow-hidden">
              <div className="flex items-center gap-4 p-4">
                <div className="relative w-16 h-12 rounded-xl overflow-hidden flex-shrink-0">
                  {e.heroImage ? <Image src={e.heroImage} alt={e.label} fill className="object-cover" /> : <div className="w-full h-full bg-white/5 flex items-center justify-center text-white/20 text-lg">{e.icon}</div>}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{e.icon}</span>
                    <p className="text-white font-semibold text-sm">{e.label}</p>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${e.isActive ? 'bg-green-500/10 text-green-400' : 'bg-white/5 text-white/30'}`}>{e.isActive ? 'Active' : 'Hidden'}</span>
                    {(e.services?.length > 0) && <span className="text-white/20 text-xs">{e.services.length} services</span>}
                  </div>
                  <p className="text-white/40 text-xs mt-0.5 truncate">{e.tagline}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => openEdit(e)} className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 hover:bg-white/10 rounded-lg text-white/60 hover:text-white text-xs transition-all"><Pencil size={12} />Edit</button>
                  <button onClick={() => setExpanded(expanded === e.id ? null : e.id)} className="w-7 h-7 bg-white/5 hover:bg-white/10 rounded-lg flex items-center justify-center text-white/40 hover:text-white transition-all">
                    {expanded === e.id ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                  </button>
                </div>
              </div>
              {expanded === e.id && (
                <div className="px-4 pb-4 border-t border-white/5 pt-3 space-y-3">
                  <p className="text-white/50 text-sm">{e.description}</p>
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full" style={{ background: e.accentColor }} />
                    <span className="text-white/30 text-xs font-mono">{e.accentColor}</span>
                    <span className="text-white/30 text-xs">·</span>
                    <span className="text-white/30 text-xs">/{e.id}</span>
                    <span className="text-white/30 text-xs">·</span>
                    <span className="text-white/30 text-xs">Order: {e.order}</span>
                  </div>
                  {e.services?.length > 0 && (
                    <div className="space-y-1">
                      <p className="text-white/30 text-[10px] uppercase tracking-wider">Services</p>
                      {e.services.map((s, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs">
                          <span>{s.icon}</span>
                          <span className="text-white/60">{s.title}</span>
                          <span className="text-white/30">—</span>
                          <span className="text-white/40 truncate">{s.description}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  {e.stats?.length > 0 && (
                    <div className="flex gap-4">
                      {e.stats.map((s, i) => (
                        <div key={i} className="text-center">
                          <p className="text-white/60 text-sm font-bold">{s.value}{s.suffix}</p>
                          <p className="text-white/30 text-[10px]">{s.label}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
