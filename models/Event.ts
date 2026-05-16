import mongoose, { Schema, Document, Model } from 'mongoose'

export interface IService {
  title: string
  description: string
  icon: string
}

export interface IGalleryItem {
  src: string
  cloudinaryId?: string
  title: string
  mediaType: 'image' | 'video'
}

export interface IStat {
  value: number
  suffix: string
  label: string
}

export interface IEvent extends Document {
  id: string
  label: string
  tagline: string
  description: string
  href: string
  heroImage: string
  cloudinaryId?: string
  color: string
  accentColor: string
  icon: string
  services: IService[]
  gallery: IGalleryItem[]
  stats: IStat[]
  isActive: boolean
  order: number
  createdAt: Date
  updatedAt: Date
}

const ServiceSchema = new Schema<IService>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  icon: { type: String, default: '✨' },
})

const GalleryItemSchema = new Schema<IGalleryItem>({
  src: { type: String, required: true },
  cloudinaryId: String,
  title: { type: String, default: '' },
  mediaType: { type: String, enum: ['image', 'video'], default: 'image' },
})

const StatSchema = new Schema<IStat>({
  value: { type: Number, required: true },
  suffix: { type: String, default: '' },
  label: { type: String, required: true },
})

const EventSchema = new Schema<IEvent>(
  {
    id: { type: String, required: true, unique: true },
    label: { type: String, required: true },
    tagline: { type: String, required: true },
    description: { type: String, required: true },
    href: { type: String, required: true },
    heroImage: { type: String, required: true },
    cloudinaryId: String,
    color: { type: String, default: '#C9A740' },
    accentColor: { type: String, default: '#C9A740' },
    icon: { type: String, default: '✨' },
    services: [ServiceSchema],
    gallery: [GalleryItemSchema],
    stats: [StatSchema],
    isActive: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
)

const Event: Model<IEvent> = mongoose.models.Event || mongoose.model<IEvent>('Event', EventSchema)
export default Event
