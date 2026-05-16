'use client'

import { useState, useRef, DragEvent } from 'react'
import { Upload, X, Loader2, CheckCircle } from 'lucide-react'
import Image from 'next/image'

interface UploadResult {
  url: string
  publicId: string
  resourceType: string
}

interface Props {
  onUpload: (result: UploadResult) => void
  folder?: string
  accept?: string
  label?: string
}

export default function MediaUpload({ onUpload, folder = 'blueneck-events', accept = 'image/*,video/*', label = 'Upload Media' }: Props) {
  const [dragging, setDragging] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [preview, setPreview] = useState<string | null>(null)
  const [done, setDone] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFile = async (file: File) => {
    if (!file) return
    setUploading(true)
    setDone(false)

    // Preview
    if (file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onload = (e) => setPreview(e.target?.result as string)
      reader.readAsDataURL(file)
    }

    const formData = new FormData()
    formData.append('file', file)
    formData.append('folder', folder)

    try {
      const res = await fetch('/api/upload', { method: 'POST', body: formData })
      const data = await res.json()
      if (data.url) {
        onUpload(data)
        setDone(true)
      }
    } catch (err) {
      console.error('Upload error:', err)
    } finally {
      setUploading(false)
    }
  }

  const onDrop = (e: DragEvent) => {
    e.preventDefault()
    setDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) handleFile(file)
  }

  return (
    <div className="space-y-3">
      <div
        onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        onClick={() => inputRef.current?.click()}
        className={`relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-200 ${
          dragging
            ? 'border-[#C9A740] bg-[#C9A740]/5'
            : 'border-white/10 hover:border-[#C9A740]/40 hover:bg-white/2'
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          className="hidden"
          onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f) }}
        />

        {uploading ? (
          <div className="flex flex-col items-center gap-3">
            <Loader2 className="text-[#C9A740] animate-spin" size={32} />
            <p className="text-white/60 text-sm">Uploading to Cloudinary...</p>
          </div>
        ) : done ? (
          <div className="flex flex-col items-center gap-3">
            <CheckCircle className="text-green-400" size={32} />
            <p className="text-green-400 text-sm font-medium">Upload successful!</p>
            <button
              onClick={(e) => { e.stopPropagation(); setPreview(null); setDone(false) }}
              className="text-white/40 text-xs hover:text-white underline"
            >
              Upload another
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#C9A740]/10 flex items-center justify-center">
              <Upload className="text-[#C9A740]" size={20} />
            </div>
            <div>
              <p className="text-white text-sm font-medium">{label}</p>
              <p className="text-white/40 text-xs mt-1">Drag & drop or click to browse</p>
              <p className="text-white/30 text-xs mt-0.5">Images & videos supported</p>
            </div>
          </div>
        )}
      </div>

      {preview && !done && (
        <div className="relative w-32 h-24 rounded-lg overflow-hidden border border-white/10">
          <Image src={preview} alt="Preview" fill className="object-cover" />
          <button
            onClick={() => setPreview(null)}
            className="absolute top-1 right-1 w-5 h-5 bg-black/70 rounded-full flex items-center justify-center"
          >
            <X size={10} className="text-white" />
          </button>
        </div>
      )}
    </div>
  )
}
