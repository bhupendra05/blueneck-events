import mongoose, { Schema, Document, Model } from 'mongoose'

export interface IGallery extends Document {
  src: string
  cloudinaryId: string
  category: string
  title: string
  mediaType: 'image' | 'video'
  cols: number
  rows: number
  tags: string[]
  isActive: boolean
  createdAt: Date
}

const GallerySchema = new Schema<IGallery>(
  {
    src: { type: String, required: true },
    cloudinaryId: { type: String, default: '' },
    category: { type: String, required: true, default: 'general' },
    title: { type: String, default: '' },
    mediaType: { type: String, enum: ['image', 'video'], default: 'image' },
    cols: { type: Number, default: 1 },
    rows: { type: Number, default: 1 },
    tags: [{ type: String }],
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
)

const Gallery: Model<IGallery> =
  mongoose.models.Gallery || mongoose.model<IGallery>('Gallery', GallerySchema)
export default Gallery
