import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabase } from '@/app/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { showId, uploaderWallet, videoUrl, caption } = body

    if (!showId || !uploaderWallet || !videoUrl) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const supabase = createServerSupabase()

    const { data, error } = await supabase
      .from('fan_cams')
      .insert({
        show_id: showId,
        uploader_wallet: uploaderWallet,
        video_url: videoUrl,
        caption: caption || null,
      })
      .select()
      .single()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Failed to save fan cam' },
        { status: 500 }
      )
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Fan cam save error:', error)
    return NextResponse.json(
      { error: 'Failed to save fan cam' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const showId = searchParams.get('showId')

    const supabase = createServerSupabase()

    let query = supabase.from('fan_cams').select('*')

    if (showId) {
      query = query.eq('show_id', showId)
    }

    const { data, error } = await query.order('created_at', { ascending: false })

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Failed to fetch fan cams' },
        { status: 500 }
      )
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Fan cam fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch fan cams' },
      { status: 500 }
    )
  }
}
