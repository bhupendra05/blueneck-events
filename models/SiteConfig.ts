import mongoose, { Schema, Document, Model } from 'mongoose'

export interface IStat {
  value: number
  suffix: string
  label: string
}

export interface IHeroSlide {
  image: string
  cloudinaryId?: string
}

export interface ISiteConfig extends Document {
  name: string
  tagline: string
  description: string
  email: string
  phone: string
  whatsapp: string
  address: string
  instagram: string
  facebook: string
  founded: number
  stats: IStat[]
  heroSlides: IHeroSlide[]
  heroTagline: string
  heroSubtitle: string
  featuredEventIds: string[]
}

const StatSchema = new Schema<IStat>({
  value: Number,
  suffix: String,
  label: String,
})

const HeroSlideSchema = new Schema<IHeroSlide>({
  image: String,
  cloudinaryId: String,
})

const SiteConfigSchema = new Schema<ISiteConfig>(
  {
    name: { type: String, default: 'Blue Neck Events' },
    tagline: { type: String, default: 'Where Moments Become Legends' },
    description: { type: String, default: '' },
    email: { type: String, default: '' },
    phone: { type: String, default: '' },
    whatsapp: { type: String, default: '' },
    address: { type: String, default: '' },
    instagram: { type: String, default: '' },
    facebook: { type: String, default: '' },
    founded: { type: Number, default: 2015 },
    stats: [StatSchema],
    heroSlides: [HeroSlideSchema],
    heroTagline: { type: String, default: 'Where Moments Become Legends' },
    heroSubtitle: { type: String, default: '' },
    featuredEventIds: [{ type: String }],
  },
  { timestamps: true }
)

const SiteConfig: Model<ISiteConfig> =
  mongoose.models.SiteConfig ||
  mongoose.model<ISiteConfig>('SiteConfig', SiteConfigSchema)
export default SiteConfig
