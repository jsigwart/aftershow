// Audius API helper functions
// Note: These should only be used server-side or via API routes
// The Audius SDK has Node.js dependencies that don't work in browser

const AUDIUS_API_BASE = 'https://discoveryprovider.audius.co/v1'

// Get API key for requests
function getApiKey() {
  return process.env.AUDIUS_API_KEY || process.env.NEXT_PUBLIC_AUDIUS_API_KEY || ''
}

// Search tracks by query
export async function searchTracks(query: string, limit = 10) {
  try {
    const params = new URLSearchParams({
      query,
      app_name: 'AfterShow',
    })

    const response = await fetch(`${AUDIUS_API_BASE}/tracks/search?${params}`)
    const data = await response.json()

    return data.data?.slice(0, limit) || []
  } catch (error) {
    console.error('Error searching tracks:', error)
    return []
  }
}

// Get track by ID
export async function getTrack(trackId: string) {
  try {
    const response = await fetch(
      `${AUDIUS_API_BASE}/tracks/${trackId}?app_name=AfterShow`
    )
    const data = await response.json()
    return data.data
  } catch (error) {
    console.error('Error getting track:', error)
    return null
  }
}

// Get stream URL for a track
export async function getStreamUrl(trackId: string) {
  try {
    // The stream URL format for Audius
    return `${AUDIUS_API_BASE}/tracks/${trackId}/stream?app_name=AfterShow`
  } catch (error) {
    console.error('Error getting stream URL:', error)
    return null
  }
}

// Get user by handle
export async function getUserByHandle(handle: string) {
  try {
    const params = new URLSearchParams({
      handle,
      app_name: 'AfterShow',
    })

    const response = await fetch(`${AUDIUS_API_BASE}/users/handle/${handle}?${params}`)
    const data = await response.json()
    return data.data
  } catch (error) {
    console.error('Error getting user:', error)
    return null
  }
}

// Get trending tracks
export async function getTrendingTracks(limit = 10) {
  try {
    const response = await fetch(
      `${AUDIUS_API_BASE}/tracks/trending?app_name=AfterShow&limit=${limit}`
    )
    const data = await response.json()
    return data.data || []
  } catch (error) {
    console.error('Error getting trending tracks:', error)
    return []
  }
}

// Get user's tracks by user ID
export async function getUserTracks(userId: string, limit = 20) {
  try {
    const response = await fetch(
      `${AUDIUS_API_BASE}/users/${userId}/tracks?app_name=AfterShow&limit=${limit}`
    )
    const data = await response.json()
    return data.data || []
  } catch (error) {
    console.error('Error getting user tracks:', error)
    return []
  }
}
