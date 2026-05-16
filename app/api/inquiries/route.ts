import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import connectDB from '@/lib/db'
import Inquiry from '@/models/Inquiry'

export const dynamic = 'force-dynamic'

export async function GET() {
  await connectDB()
  const items = await Inquiry.find().sort({ createdAt: -1 })
  return NextResponse.json(items)
}

export async function POST(req: Request) {
  await connectDB()
  const body = await req.json()
  const item = await Inquiry.create(body)
  return NextResponse.json(item, { status: 201 })
}
