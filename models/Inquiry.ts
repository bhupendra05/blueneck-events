import mongoose, { Schema, Document, Model } from 'mongoose'

export interface IInquiry extends Document {
  name: string
  email: string
  phone: string
  eventType: string
  eventDate: string
  message: string
  status: 'new' | 'read' | 'replied' | 'archived'
  source: string
}

const InquirySchema = new Schema<IInquiry>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, default: '' },
    eventType: { type: String, default: '' },
    eventDate: { type: String, default: '' },
    message: { type: String, required: true },
    status: { type: String, enum: ['new', 'read', 'replied', 'archived'], default: 'new' },
    source: { type: String, default: 'website' },
  },
  { timestamps: true }
)

const Inquiry: Model<IInquiry> =
  mongoose.models.Inquiry || mongoose.model<IInquiry>('Inquiry', InquirySchema)
export default Inquiry
