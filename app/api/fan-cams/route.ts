import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabase } from '@/app/lib/supabase'

// Mock fan cams for demo when Supabase is not configured
const MOCK_FAN_CAMS = [
  {
    id: 'cam-001',
    show_id: 'show-001',
    uploader_wallet: '8xk7...mLr2',
    video_url: '',
    thumbnail_url: null,
    caption: 'That 360 opener was insane!',
    created_at: '2026-02-20T22:30:00Z',
  },
]

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

    if (!supabase) {
      // Return mock success for demo
      return NextResponse.json({
        id: `mock-${Date.now()}`,
        show_id: showId,
        uploader_wallet: uploaderWallet,
        video_url: videoUrl,
        caption: caption,
        created_at: new Date().toISOString(),
      })
    }

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

    if (!supabase) {
      // Return mock data when Supabase is not configured
      const filteredCams = showId
        ? MOCK_FAN_CAMS.filter((cam) => cam.show_id === showId)
        : MOCK_FAN_CAMS
      return NextResponse.json(filteredCams)
    }

    let query = supabase.from('fan_cams').select('*')

    if (showId) {
      query = query.eq('show_id', showId)
    }

    const { data, error } = await query.order('created_at', { ascending: false })

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(MOCK_FAN_CAMS)
    }

    return NextResponse.json(data || MOCK_FAN_CAMS)
  } catch (error) {
    console.error('Fan cam fetch error:', error)
    return NextResponse.json(MOCK_FAN_CAMS)
  }
}
