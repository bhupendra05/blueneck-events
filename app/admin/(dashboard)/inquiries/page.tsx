'use client'

import { useEffect, useState } from 'react'
import { Mail, Trash2, Loader2, Eye, EyeOff, Archive, ChevronDown, ChevronUp } from 'lucide-react'

interface Inquiry {
  _id: string; name: string; email: string; phone: string
  eventType: string; eventDate: string; message: string
  status: 'new' | 'read' | 'replied' | 'archived'; source: string
  createdAt: string
}

const statusColors: Record<string, string> = {
  new: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  read: 'bg-white/5 text-white/50 border-white/10',
  replied: 'bg-green-500/10 text-green-400 border-green-500/20',
  archived: 'bg-white/3 text-white/30 border-white/5',
}

export default function InquiriesAdmin() {
  const [items, setItems] = useState<Inquiry[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<string>('all')
  const [expanded, setExpanded] = useState<string | null>(null)

  const fetch_ = async () => {
    setLoading(true)
    try {
      const r = await fetch('/api/inquiries')
      setItems(await r.json())
    } catch { setItems([]) }
    finally { setLoading(false) }
  }
  useEffect(() => { fetch_() }, [])

  const updateStatus = async (id: string, status: string) => {
    await fetch(`/api/inquiries/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status }) })
    fetch_()
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this inquiry?')) return
    await fetch(`/api/inquiries/${id}`, { method: 'DELETE' }); fetch_()
  }

  const filtered = filter === 'all' ? items : items.filter(i => i.status === filter)
  const newCount = items.filter(i => i.status === 'new').length

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-white text-2xl font-bold">Inquiries</h1>
          <p className="text-white/40 text-sm mt-1">{items.length} total · {newCount} new</p>
        </div>
      </div>

      {/* Status filter */}
      <div className="flex gap-2 flex-wrap">
        {['all', 'new', 'read', 'replied', 'archived'].map(s => (
          <button key={s} onClick={() => setFilter(s)} className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all ${filter === s ? 'bg-[#C9A740]/15 text-[#C9A740] border border-[#C9A740]/25' : 'bg-white/3 text-white/50 hover:text-white border border-white/5'}`}>
            {s} {s !== 'all' && `(${items.filter(i => i.status === s).length})`}
          </button>
        ))}
      </div>

      {loading ? <div className="flex justify-center py-24"><Loader2 className="text-[#C9A740] animate-spin" size={32} /></div> : filtered.length === 0 ? (
        <div className="text-center py-24 text-white/30">No inquiries found</div>
      ) : (
        <div className="space-y-3">
          {filtered.map(inquiry => (
            <div key={inquiry._id} className="bg-[#0D0D18] border border-white/5 rounded-2xl overflow-hidden">
              <div className="flex items-center gap-4 p-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 border ${statusColors[inquiry.status]}`}>
                  <Mail size={16} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-white font-semibold text-sm">{inquiry.name}</p>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full capitalize border ${statusColors[inquiry.status]}`}>{inquiry.status}</span>
                    {inquiry.eventType && <span className="text-white/30 text-xs">· {inquiry.eventType}</span>}
                  </div>
                  <p className="text-white/40 text-xs mt-0.5">{inquiry.email} {inquiry.phone && `· ${inquiry.phone}`}</p>
                </div>
                <div className="flex items-center gap-1.5">
                  {inquiry.status === 'new' && (
                    <button onClick={() => updateStatus(inquiry._id, 'read')} className="w-7 h-7 bg-white/5 hover:bg-white/10 rounded-lg flex items-center justify-center" title="Mark as read">
                      <Eye size={13} className="text-white/60" />
                    </button>
                  )}
                  {inquiry.status !== 'replied' && (
                    <button onClick={() => updateStatus(inquiry._id, 'replied')} className="w-7 h-7 bg-green-500/10 hover:bg-green-500/20 rounded-lg flex items-center justify-center" title="Mark as replied">
                      <EyeOff size={13} className="text-green-400" />
                    </button>
                  )}
                  <button onClick={() => updateStatus(inquiry._id, 'archived')} className="w-7 h-7 bg-white/5 hover:bg-white/10 rounded-lg flex items-center justify-center" title="Archive">
                    <Archive size={13} className="text-white/40" />
                  </button>
                  <button onClick={() => handleDelete(inquiry._id)} className="w-7 h-7 bg-red-500/10 hover:bg-red-500/20 rounded-lg flex items-center justify-center" title="Delete">
                    <Trash2 size={13} className="text-red-400" />
                  </button>
                  <button onClick={() => setExpanded(expanded === inquiry._id ? null : inquiry._id)} className="w-7 h-7 bg-white/5 hover:bg-white/10 rounded-lg flex items-center justify-center">
                    {expanded === inquiry._id ? <ChevronUp size={14} className="text-white/40" /> : <ChevronDown size={14} className="text-white/40" />}
                  </button>
                </div>
              </div>
              {expanded === inquiry._id && (
                <div className="px-4 pb-4 border-t border-white/5 pt-3 space-y-2">
                  <p className="text-white/70 text-sm whitespace-pre-wrap">{inquiry.message}</p>
                  <div className="flex items-center gap-3 text-white/30 text-xs">
                    {inquiry.eventDate && <span>Date: {inquiry.eventDate}</span>}
                    {inquiry.source && <span>Source: {inquiry.source}</span>}
                    <span>{new Date(inquiry.createdAt).toLocaleString()}</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
