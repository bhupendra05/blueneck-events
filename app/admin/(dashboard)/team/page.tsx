'use client'

import { useEffect, useState } from 'react'
import { Plus, Pencil, Trash2, Loader2, X } from 'lucide-react'
import Image from 'next/image'
import MediaUpload from '@/components/admin/MediaUpload'

interface TeamMember { _id: string; name: string; role: string; image: string; cloudinaryId?: string; bio: string; order: number }
const empty = { name: '', role: '', image: '', cloudinaryId: '', bio: '', order: 0 }

export default function TeamAdmin() {
  const [items, setItems] = useState<TeamMember[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState(empty)
  const [editId, setEditId] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)

  const fetch_ = async () => { setLoading(true); const r = await fetch('/api/team'); setItems(await r.json()); setLoading(false) }
  useEffect(() => { fetch_() }, [])

  const openAdd = () => { setForm(empty); setEditId(null); setShowForm(true) }
  const openEdit = (m: TeamMember) => { setForm({ name: m.name, role: m.role, image: m.image, cloudinaryId: m.cloudinaryId || '', bio: m.bio, order: m.order }); setEditId(m._id); setShowForm(true) }

  const handleSave = async () => {
    setSaving(true)
    if (editId) {
      await fetch(`/api/team/${editId}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
    } else {
      await fetch('/api/team', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
    }
    setSaving(false); setShowForm(false); fetch_()
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this team member?')) return
    await fetch(`/api/team/${id}`, { method: 'DELETE' }); fetch_()
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-white text-2xl font-bold">Team Members</h1><p className="text-white/40 text-sm mt-1">{items.length} members</p></div>
        <button onClick={openAdd} className="flex items-center gap-2 bg-[#C9A740] hover:bg-[#B8963A] text-black text-sm font-semibold px-4 py-2.5 rounded-xl transition-all"><Plus size={16} /> Add Member</button>
      </div>

      {showForm && (
        <div className="bg-[#0D0D18] border border-[#C9A740]/20 rounded-2xl p-6 space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="text-white font-semibold">{editId ? 'Edit' : 'Add'} Team Member</h2>
            <button onClick={() => setShowForm(false)}><X size={18} className="text-white/50 hover:text-white" /></button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[['name', 'Full Name'], ['role', 'Role / Title'], ['order', 'Display Order']].map(([k, l]) => (
              <div key={k}>
                <label className="text-white/50 text-xs mb-1.5 block">{l}</label>
                <input type={k === 'order' ? 'number' : 'text'} value={(form as Record<string, string | number>)[k] as string} onChange={e => setForm(f => ({ ...f, [k]: k === 'order' ? +e.target.value : e.target.value }))} className="w-full bg-white/5 border border-white/8 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#C9A740]/50" />
              </div>
            ))}
          </div>
          <div>
            <label className="text-white/50 text-xs mb-1.5 block">Bio</label>
            <textarea value={form.bio} onChange={e => setForm(f => ({ ...f, bio: e.target.value }))} rows={2} className="w-full bg-white/5 border border-white/8 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#C9A740]/50 resize-none" />
          </div>
          <div>
            <label className="text-white/50 text-xs mb-2 block">Photo</label>
            {form.image && (
              <div className="relative w-16 h-16 rounded-xl overflow-hidden border border-white/10 mb-3 group">
                <Image src={form.image} alt="Team member photo preview" fill className="object-cover" />
                <button
                  onClick={() => setForm(f => ({ ...f, image: '', cloudinaryId: '' }))}
                  className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                >
                  <X size={14} className="text-white" />
                </button>
              </div>
            )}
            <MediaUpload
              folder="blueneck-events/team"
              label="Upload Team Member Photo"
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

      {loading ? <div className="flex justify-center py-24"><Loader2 className="text-[#C9A740] animate-spin" size={32} /></div> : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map(m => (
            <div key={m._id} className="bg-[#0D0D18] border border-white/5 rounded-2xl p-5">
              <div className="flex items-start justify-between mb-4">
                <div className="relative w-14 h-14 rounded-xl overflow-hidden border border-white/10">
                  {m.image ? <Image src={m.image} alt={m.name} fill className="object-cover" /> : <div className="w-full h-full bg-white/5 flex items-center justify-center text-white/20 text-xl">{m.name[0]}</div>}
                </div>
                <div className="flex gap-2">
                  <button onClick={() => openEdit(m)} className="w-8 h-8 bg-white/5 hover:bg-white/10 rounded-lg flex items-center justify-center"><Pencil size={13} className="text-white/60" /></button>
                  <button onClick={() => handleDelete(m._id)} className="w-8 h-8 bg-red-500/10 hover:bg-red-500/20 rounded-lg flex items-center justify-center"><Trash2 size={13} className="text-red-400" /></button>
                </div>
              </div>
              <p className="text-white font-semibold text-sm">{m.name}</p>
              <p className="text-[#C9A740] text-xs mt-0.5">{m.role}</p>
              <p className="text-white/40 text-xs mt-2 line-clamp-2">{m.bio}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
