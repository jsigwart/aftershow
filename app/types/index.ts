// Show/Concert types
export interface Show {
  id: string
  artist_name: string
  artist_audius_handle: string | null
  artist_audius_id: string | null
  venue: string
  city: string
  date: string
  setlist: SetlistTrack[]
  nft_collection_address: string | null
  artist_wallet: string | null
  cover_image: string | null
  created_at: string
}

export interface SetlistTrack {
  position: number
  title: string
  audius_track_id: string | null
}

// Fan cam types
export interface FanCam {
  id: string
  show_id: string
  uploader_wallet: string
  video_url: string
  thumbnail_url: string | null
  caption: string | null
  created_at: string
}

// Ticket/NFT types (for demo, we mock this)
export interface MockTicket {
  nftAddress: string
  showId: string
  artistName: string
  venue: string
  date: string
}

// User state
export interface UserState {
  walletAddress: string | null
  tickets: MockTicket[]
  artistCoins: Record<string, number> // artist handle -> coin balance
  isConnected: boolean
}

// Audius track type (simplified)
export interface AudiusTrack {
  id: string
  title: string
  user: {
    id: string
    handle: string
    name: string
  }
  artwork?: {
    '150x150': string
    '480x480': string
    '1000x1000': string
  }
  duration: number
  playCount: number
}
