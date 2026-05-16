import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import connectDB from '@/lib/db'
import Testimonial from '@/models/Testimonial'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    await connectDB()
    const items = await Testimonial.find({ isActive: true }).sort({ order: 1 })
    return NextResponse.json(items)
  } catch {
    return NextResponse.json([])
  }
}

export async function POST(req: Request) {
  // const session = await getServerSession(authOptions)
  // if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  await connectDB()
  const body = await req.json()
  const item = await Testimonial.create(body)
  return NextResponse.json(item, { status: 201 })
}
