'use client'

import { useEffect, useState } from 'react'
import { Plus, Pencil, Trash2, Star, Loader2, X } from 'lucide-react'
import Image from 'next/image'
import MediaUpload from '@/components/admin/MediaUpload'

interface Testimonial { _id: string; name: string; event: string; quote: string; rating: number; image: string; cloudinaryId?: string; videoUrl?: string; isActive: boolean }

const empty = { name: '', event: '', quote: '', rating: 5, image: '', cloudinaryId: '', videoUrl: '', isActive: true }

export default function TestimonialsAdmin() {
  const [items, setItems] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState<typeof empty>(empty)
  const [editId, setEditId] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)

  const fetch_ = async () => { setLoading(true); const r = await fetch('/api/testimonials'); setItems(await r.json()); setLoading(false) }
  useEffect(() => { fetch_() }, [])

  const openAdd = () => { setForm(empty); setEditId(null); setShowForm(true) }
  const openEdit = (t: Testimonial) => { setForm({ name: t.name, event: t.event, quote: t.quote, rating: t.rating, image: t.image, cloudinaryId: t.cloudinaryId || '', videoUrl: t.videoUrl || '', isActive: t.isActive }); setEditId(t._id); setShowForm(true) }

  const handleSave = async () => {
    setSaving(true)
    if (editId) {
      await fetch(`/api/testimonials/${editId}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
    } else {
      await fetch('/api/testimonials', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
    }
    setSaving(false); setShowForm(false); fetch_()
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this testimonial?')) return
    await fetch(`/api/testimonials/${id}`, { method: 'DELETE' }); fetch_()
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-white text-2xl font-bold">Testimonials</h1><p className="text-white/40 text-sm mt-1">{items.length} reviews</p></div>
        <button onClick={openAdd} className="flex items-center gap-2 bg-[#C9A740] hover:bg-[#B8963A] text-black text-sm font-semibold px-4 py-2.5 rounded-xl transition-all"><Plus size={16} /> Add Review</button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-[#0D0D18] border border-[#C9A740]/20 rounded-2xl p-6 space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="text-white font-semibold">{editId ? 'Edit' : 'Add'} Testimonial</h2>
            <button onClick={() => setShowForm(false)}><X size={18} className="text-white/50 hover:text-white" /></button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[['name', 'Client Name', 'text'], ['event', 'Event (e.g. Wedding — Mumbai)', 'text'], ['videoUrl', 'Video URL (optional)', 'text']].map(([key, label, type]) => (
              <div key={key}>
                <label className="text-white/50 text-xs mb-1.5 block">{label}</label>
                <input type={type} value={(form as Record<string, string | number | boolean>)[key] as string} onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))} className="w-full bg-white/5 border border-white/8 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#C9A740]/50" />
              </div>
            ))}
            <div>
              <label className="text-white/50 text-xs mb-1.5 block">Rating</label>
              <div className="flex gap-1">
                {[1,2,3,4,5].map(n => (
                  <button key={n} type="button" onClick={() => setForm(f => ({ ...f, rating: n }))}>
                    <Star size={22} className={n <= form.rating ? 'text-[#C9A740] fill-[#C9A740]' : 'text-white/20'} />
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div>
            <label className="text-white/50 text-xs mb-1.5 block">Review Quote</label>
            <textarea value={form.quote} onChange={e => setForm(f => ({ ...f, quote: e.target.value }))} rows={3} className="w-full bg-white/5 border border-white/8 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#C9A740]/50 resize-none" />
          </div>
          <div>
            <label className="text-white/50 text-xs mb-2 block">Client Avatar</label>
            {form.image && (
              <div className="relative w-16 h-16 rounded-full overflow-hidden border border-white/10 mb-3 group">
                <Image src={form.image} alt="Client photo preview" fill className="object-cover" />
                <button
                  onClick={() => setForm(f => ({ ...f, image: '', cloudinaryId: '' }))}
                  className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                >
                  <X size={14} className="text-white" />
                </button>
              </div>
            )}
            <MediaUpload
              folder="blueneck-events/testimonials"
              label="Upload Client Photo"
              accept="image/*"
              onUpload={(result) => {
                setForm(f => ({ ...f, image: result.url, cloudinaryId: result.publicId }))
              }}
            />
          </div>
          <div className="flex gap-3">
            <button onClick={handleSave} disabled={saving} className="bg-[#C9A740] hover:bg-[#B8963A] text-black text-sm font-semibold px-5 py-2.5 rounded-xl transition-all disabled:opacity-50 flex items-center gap-2">{saving && <Loader2 size={14} className="animate-spin" />}Save</button>
            <button onClick={() => setShowForm(false)} className="text-white/50 hover:text-white text-sm px-5 py-2.5 rounded-xl border border-white/10 transition-all">Cancel</button>
          </div>
        </div>
      )}

      {/* Cards */}
      {loading ? <div className="flex justify-center py-24"><Loader2 className="text-[#C9A740] animate-spin" size={32} /></div> : (
        <div className="grid gap-4">
          {items.map(t => (
            <div key={t._id} className="bg-[#0D0D18] border border-white/5 rounded-2xl p-5 flex gap-4">
              {t.image && <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0 border border-white/10"><Image src={t.image} alt={t.name} fill className="object-cover" /></div>}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-white font-semibold text-sm">{t.name}</p>
                    <p className="text-white/40 text-xs">{t.event}</p>
                    <div className="flex gap-0.5 mt-1">{[1,2,3,4,5].map(n => <Star key={n} size={12} className={n <= t.rating ? 'text-[#C9A740] fill-[#C9A740]' : 'text-white/15'} />)}</div>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <button onClick={() => openEdit(t)} className="w-8 h-8 bg-white/5 hover:bg-white/10 rounded-lg flex items-center justify-center transition-colors"><Pencil size={13} className="text-white/60" /></button>
                    <button onClick={() => handleDelete(t._id)} className="w-8 h-8 bg-red-500/10 hover:bg-red-500/20 rounded-lg flex items-center justify-center transition-colors"><Trash2 size={13} className="text-red-400" /></button>
                  </div>
                </div>
                <p className="text-white/60 text-sm mt-2 line-clamp-2">{t.quote}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
