import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import connectDB from '@/lib/db'
import TeamMember from '@/models/TeamMember'

export const dynamic = 'force-dynamic'

export async function GET() {
  await connectDB()
  const items = await TeamMember.find({ isActive: true }).sort({ order: 1 })
  return NextResponse.json(items)
}

export async function POST(req: Request) {
  // const session = await getServerSession(authOptions)
  // if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  await connectDB()
  const body = await req.json()
  const item = await TeamMember.create(body)
  return NextResponse.json(item, { status: 201 })
}
