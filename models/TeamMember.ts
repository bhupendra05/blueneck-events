import mongoose, { Schema, Document, Model } from 'mongoose'

export interface ITeamMember extends Document {
  name: string
  role: string
  image: string
  cloudinaryId?: string
  bio: string
  order: number
  isActive: boolean
  createdAt: Date
}

const TeamMemberSchema = new Schema<ITeamMember>(
  {
    name: { type: String, required: true },
    role: { type: String, required: true },
    image: { type: String, default: '' },
    cloudinaryId: String,
    bio: { type: String, default: '' },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
)

const TeamMember: Model<ITeamMember> =
  mongoose.models.TeamMember ||
  mongoose.model<ITeamMember>('TeamMember', TeamMemberSchema)
export default TeamMember
