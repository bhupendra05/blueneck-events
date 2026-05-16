import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import connectDB from '@/lib/db'
import Event from '@/models/Event'

export async function GET(_: Request, { params }: { params: { id: string } }) {
  await connectDB()
  const event = await Event.findOne({ id: params.id })
  if (!event) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(event)
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  await connectDB()
  const body = await req.json()
  const event = await Event.findOneAndUpdate({ id: params.id }, body, { new: true })
  return NextResponse.json(event)
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session || session.user.role !== 'admin')
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  await connectDB()
  await Event.findOneAndDelete({ id: params.id })
  return NextResponse.json({ success: true })
}
