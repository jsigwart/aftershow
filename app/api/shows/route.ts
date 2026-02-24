import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabase } from '@/app/lib/supabase'
import { MOCK_SHOWS } from '@/app/lib/mock-data'

export async function GET(request: NextRequest) {
  try {
    const supabase = createServerSupabase()

    if (!supabase) {
      // Return mock data when Supabase is not configured
      return NextResponse.json(MOCK_SHOWS)
    }

    const { data, error } = await supabase
      .from('shows')
      .select('*')
      .order('date', { ascending: false })

    if (error) {
      // Fall back to mock data if Supabase query fails
      console.error('Supabase error:', error)
      return NextResponse.json(MOCK_SHOWS)
    }

    // If no data in database, return mock data
    if (!data || data.length === 0) {
      return NextResponse.json(MOCK_SHOWS)
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Shows fetch error:', error)
    // Fall back to mock data
    return NextResponse.json(MOCK_SHOWS)
  }
}
