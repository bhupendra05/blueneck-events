import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import connectDB from '@/lib/db'
import Gallery from '@/models/Gallery'

export const dynamic = 'force-dynamic'

export async function GET(req: Request) {
  try {
    await connectDB()
    const { searchParams } = new URL(req.url)
    const category = searchParams.get('category')
    const filter = category && category !== 'all' ? { category, isActive: true } : { isActive: true }
    const items = await Gallery.find(filter).sort({ createdAt: -1 })
    return NextResponse.json(items)
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
    const item = await Gallery.create(body)
    return NextResponse.json(item, { status: 201 })
  } catch (error) {
    console.error('Gallery POST error:', error)
    return NextResponse.json({ error: 'Failed to create gallery item' }, { status: 500 })
  }
}
