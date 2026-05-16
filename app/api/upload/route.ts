import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export const dynamic = 'force-dynamic'

export async function POST(req: Request) {
  const formData = await req.formData()
  const file = formData.get('file') as File
  const folder = (formData.get('folder') as string) || 'blueneck-events'

  if (!file) return NextResponse.json({ error: 'No file provided' }, { status: 400 })

  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  const result = await new Promise<{ secure_url: string; public_id: string; resource_type: string }>(
    (resolve, reject) => {
      const resourceType = file.type.startsWith('video/') ? 'video' : 'image'
      cloudinary.uploader
        .upload_stream(
          {
            folder,
            resource_type: resourceType,
            transformation:
              resourceType === 'image'
                ? [{ quality: 'auto', fetch_format: 'auto' }]
                : undefined,
          },
          (error, result) => {
            if (error || !result) return reject(error)
            resolve(result as { secure_url: string; public_id: string; resource_type: string })
          }
        )
        .end(buffer)
    }
  )

  return NextResponse.json({
    url: result.secure_url,
    publicId: result.public_id,
    resourceType: result.resource_type,
  })
}
