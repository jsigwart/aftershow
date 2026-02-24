import { sdk } from '@audius/sdk'

// Initialize Audius SDK
// Note: For client-side, we only pass apiKey
// apiSecret should only be used server-side
export const audiusSdk = sdk({
  apiKey: process.env.AUDIUS_API_KEY || process.env.NEXT_PUBLIC_AUDIUS_API_KEY,
})

// Search tracks by query
export async function searchTracks(query: string, limit = 10) {
  try {
    const response = await audiusSdk.tracks.searchTracks({ query })
    return response.data?.slice(0, limit) || []
  } catch (error) {
    console.error('Error searching tracks:', error)
    return []
  }
}

// Get track by ID
export async function getTrack(trackId: string) {
  try {
    const response = await audiusSdk.tracks.getTrack({ trackId })
    return response.data
  } catch (error) {
    console.error('Error getting track:', error)
    return null
  }
}

// Get stream URL for a track
export async function getStreamUrl(trackId: string) {
  try {
    const url = await audiusSdk.tracks.getTrackStreamUrl({ trackId })
    return url
  } catch (error) {
    console.error('Error getting stream URL:', error)
    return null
  }
}

// Get user by handle
export async function getUserByHandle(handle: string) {
  try {
    const response = await audiusSdk.users.getUserByHandle({ handle })
    return response.data
  } catch (error) {
    console.error('Error getting user:', error)
    return null
  }
}

// Get trending tracks
export async function getTrendingTracks(limit = 10) {
  try {
    const response = await audiusSdk.tracks.getTrendingTracks({})
    return response.data?.slice(0, limit) || []
  } catch (error) {
    console.error('Error getting trending tracks:', error)
    return []
  }
}

// Get user's tracks by user ID
export async function getUserTracks(userId: string, limit = 20) {
  try {
    const response = await audiusSdk.users.getUserTracks({
      id: userId,
      limit
    })
    return response.data || []
  } catch (error) {
    console.error('Error getting user tracks:', error)
    return []
  }
}
