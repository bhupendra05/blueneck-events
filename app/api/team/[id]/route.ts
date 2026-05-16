import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import connectDB from '@/lib/db'
import TeamMember from '@/models/TeamMember'

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  await connectDB()
  const body = await req.json()
  const item = await TeamMember.findByIdAndUpdate(params.id, body, { new: true })
  return NextResponse.json(item)
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session || session.user.role !== 'admin')
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  await connectDB()
  await TeamMember.findByIdAndDelete(params.id)
  return NextResponse.json({ success: true })
}
