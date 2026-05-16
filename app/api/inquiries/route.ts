import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import connectDB from '@/lib/db'
import Inquiry from '@/models/Inquiry'

export const dynamic = 'force-dynamic'

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    await connectDB()
    const items = await Inquiry.find().sort({ createdAt: -1 })
    return NextResponse.json(items)
  } catch {
    return NextResponse.json([])
  }
}

export async function POST(req: Request) {
  try {
    await connectDB()
    const body = await req.json()
    const item = await Inquiry.create(body)
    return NextResponse.json(item, { status: 201 })
  } catch (error) {
    console.error('Inquiry POST error:', error)
    return NextResponse.json({ error: 'Failed to submit inquiry' }, { status: 500 })
  }
}
