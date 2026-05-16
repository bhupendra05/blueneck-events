import mongoose, { Schema, Document, Model } from 'mongoose'

export interface ITestimonial extends Document {
  name: string
  event: string
  quote: string
  rating: number
  image: string
  cloudinaryId?: string
  videoUrl?: string
  isActive: boolean
  order: number
  createdAt: Date
}

const TestimonialSchema = new Schema<ITestimonial>(
  {
    name: { type: String, required: true },
    event: { type: String, required: true },
    quote: { type: String, required: true },
    rating: { type: Number, min: 1, max: 5, default: 5 },
    image: { type: String, default: '' },
    cloudinaryId: String,
    videoUrl: { type: String, default: '' },
    isActive: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
)

const Testimonial: Model<ITestimonial> =
  mongoose.models.Testimonial ||
  mongoose.model<ITestimonial>('Testimonial', TestimonialSchema)
export default Testimonial
