'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Trash2, Plus, Loader2, Tag } from 'lucide-react'
import MediaUpload from '@/components/admin/MediaUpload'

interface GalleryItem {
  _id: string
  src: string
  category: string
  title: string
  mediaType: string
  cols: number
  rows: number
}

const CATEGORIES = ['all', 'weddings', 'corporate', 'social', 'birthdays', 'sports', 'galas', 'launches', 'concerts', 'destinations']

export default function GalleryAdmin() {
  const [items, setItems] = useState<GalleryItem[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const [form, setForm] = useState({ src: '', cloudinaryId: '', category: 'weddings', title: '', mediaType: 'image', cols: 1, rows: 1, tags: [] })
  const [uploadComplete, setUploadComplete] = useState(false)
  const [saving, setSaving] = useState(false)

  const fetchItems = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/gallery')
      const data = await res.json()
      setItems(data)
    } catch (error) {
      console.error('Fetch error:', error)
      setItems([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchItems() }, [])

  const filtered = filter === 'all' ? items : items.filter(i => i.category === filter)

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this item?')) return
    await fetch(`/api/gallery/${id}`, { method: 'DELETE' })
    fetchItems()
  }

  const handleSave = async () => {
    if (!form.src) {
      alert('Please upload an image first')
      return
    }
    setSaving(true)
    try {
      const res = await fetch('/api/gallery', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
      const data = await res.json()
      if (!res.ok) {
        alert(`Error: ${data.error || 'Failed to save'}`)
        return
      }
      setSaving(false)
      setUploadComplete(false)
      setForm({ src: '', cloudinaryId: '', category: 'weddings', title: '', mediaType: 'image', cols: 1, rows: 1, tags: [] })
      fetchItems()
      alert('Saved successfully!')
    } catch (error) {
      console.error('Save error:', error)
      alert('Failed to save. Please check console for details.')
      setSaving(false)
    }
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-white text-2xl font-bold">Gallery</h1>
          <p className="text-white/40 text-sm mt-1">{items.length} items total</p>
        </div>
      </div>

      {/* Add Form */}
      <div className="bg-[#0D0D18] border border-white/5 rounded-2xl p-6 space-y-5">
        <h2 className="text-white font-semibold">Upload New Media</h2>
        <MediaUpload
          folder="blueneck-gallery"
          label="Upload Image or Video"
          onUpload={(result) => {
            setForm(f => ({ ...f, src: result.url, cloudinaryId: result.publicId, mediaType: result.resourceType === 'video' ? 'video' : 'image' }))
            setUploadComplete(true)
          }}
        />
        <div className="space-y-4">
          <div>
            <label className="text-white/50 text-xs mb-1 block">Title</label>
            <input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="Image title" className="w-full bg-white/5 border border-white/8 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#C9A740]/50" />
          </div>
          <div>
            <label className="text-white/50 text-xs mb-1 block">Event Category</label>
            <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} className="w-full bg-[#0D0D18] border border-white/8 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#C9A740]/50">
              {CATEGORIES.filter(c => c !== 'all').map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div className="flex gap-3">
            <button onClick={handleSave} disabled={saving || !form.src} className="bg-[#C9A740] hover:bg-[#B8963A] text-black text-sm font-semibold px-5 py-2.5 rounded-xl transition-all disabled:opacity-50 flex items-center gap-2">
              {saving && <Loader2 size={14} className="animate-spin" />} Save to Gallery
            </button>
            <button onClick={() => { setUploadComplete(false); setForm({ src: '', cloudinaryId: '', category: 'weddings', title: '', mediaType: 'image', cols: 1, rows: 1, tags: [] }) }} className="text-white/50 hover:text-white text-sm px-5 py-2.5 rounded-xl border border-white/10 transition-all">Cancel</button>
          </div>
        </div>
      </div>

      {/* Category filter */}
      <div className="flex gap-2 flex-wrap">
        {CATEGORIES.map(c => (
          <button key={c} onClick={() => setFilter(c)} className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all ${filter === c ? 'bg-[#C9A740]/15 text-[#C9A740] border border-[#C9A740]/25' : 'bg-white/3 text-white/50 hover:text-white border border-white/5'}`}>
            {c}
          </button>
        ))}
      </div>

      {/* Grid */}
      {loading ? (
        <div className="flex items-center justify-center py-24"><Loader2 className="text-[#C9A740] animate-spin" size={32} /></div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {filtered.map(item => (
            <div key={item._id} className="group relative aspect-square rounded-xl overflow-hidden border border-white/5">
              <Image src={item.src} alt={item.title} fill className="object-cover" />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-3">
                <div className="flex items-center justify-between">
                  <span className="bg-[#C9A740]/20 text-[#C9A740] text-[10px] px-2 py-0.5 rounded-full flex items-center gap-1">
                    <Tag size={9} /> {item.category}
                  </span>
                  <button onClick={() => handleDelete(item._id)} className="w-7 h-7 bg-red-500/80 hover:bg-red-500 rounded-lg flex items-center justify-center transition-colors">
                    <Trash2 size={13} className="text-white" />
                  </button>
                </div>
                {item.title && <p className="text-white text-xs font-medium truncate">{item.title}</p>}
              </div>
            </div>
          ))}
        </div>
      )}
      {!loading && filtered.length === 0 && (
        <div className="text-center py-24 text-white/30">No items in this category</div>
      )}
    </div>
  )
}
