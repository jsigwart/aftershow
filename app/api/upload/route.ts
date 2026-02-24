import { NextRequest, NextResponse } from 'next/server'
import { getPresignedUploadUrl } from '@/app/lib/s3'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { showId, fileName, contentType } = body

    if (!showId || !fileName || !contentType) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const { uploadUrl, fileUrl } = await getPresignedUploadUrl(
      showId,
      fileName,
      contentType
    )

    return NextResponse.json({ uploadUrl, fileUrl })
  } catch (error) {
    console.error('Upload URL error:', error)
    return NextResponse.json(
      { error: 'Failed to generate upload URL' },
      { status: 500 }
    )
  }
}
