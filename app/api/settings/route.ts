import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import connectDB from '@/lib/db'
import SiteConfig from '@/models/SiteConfig'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    await connectDB()
    let config = await SiteConfig.findOne()
    if (!config) {
      config = await SiteConfig.create({})
    }
    return NextResponse.json(config)
  } catch {
    return NextResponse.json({})
  }
}

export async function PUT(req: Request) {
  // const session = await getServerSession(authOptions)
  // if (!session || session.user.role !== 'admin')
  //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  await connectDB()
  const body = await req.json()
  let config = await SiteConfig.findOne()
  if (!config) {
    config = await SiteConfig.create(body)
  } else {
    config = await SiteConfig.findOneAndUpdate({}, body, { new: true })
  }
  return NextResponse.json(config)
}
