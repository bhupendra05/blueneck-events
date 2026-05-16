import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import connectDB from '@/lib/db'
import Event from '@/models/Event'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    await connectDB()
    const events = await Event.find({ isActive: true }).sort({ order: 1 })
    return NextResponse.json(events)
  } catch {
    return NextResponse.json([])
  }
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    await connectDB()
    const body = await req.json()
    const event = await Event.create(body)
    return NextResponse.json(event, { status: 201 })
  } catch (error) {
    console.error('Events POST error:', error)
    return NextResponse.json({ error: 'Failed to create event' }, { status: 500 })
  }
}
