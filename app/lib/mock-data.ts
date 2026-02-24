import { Show, MockTicket } from '@/app/types'

// Mock shows for demo purposes
export const MOCK_SHOWS: Show[] = [
  {
    id: 'show-001',
    artist_name: 'Charli XCX',
    artist_audius_handle: 'charlixcx',
    artist_audius_id: null,
    venue: 'Le Poisson Rouge',
    city: 'New York, NY',
    date: '2026-02-20',
    setlist: [
      { position: 1, title: '360', audius_track_id: null },
      { position: 2, title: 'Club Classics', audius_track_id: null },
      { position: 3, title: 'Sympathy is a Knife', audius_track_id: null },
      { position: 4, title: 'I Might Say Something Stupid', audius_track_id: null },
      { position: 5, title: 'Talk Talk', audius_track_id: null },
      { position: 6, title: 'Von Dutch', audius_track_id: null },
      { position: 7, title: 'Everything is Romantic', audius_track_id: null },
      { position: 8, title: 'Rewind', audius_track_id: null },
      { position: 9, title: 'So I', audius_track_id: null },
      { position: 10, title: 'Girl, So Confusing', audius_track_id: null },
      { position: 11, title: 'Apple', audius_track_id: null },
      { position: 12, title: 'B2b', audius_track_id: null },
      { position: 13, title: 'Mean Girls', audius_track_id: null },
      { position: 14, title: 'I Think About It All the Time', audius_track_id: null },
      { position: 15, title: '365', audius_track_id: null },
      { position: 16, title: 'Guess', audius_track_id: null },
      { position: 17, title: 'Spring Breakers', audius_track_id: null },
      { position: 18, title: 'Boom Clap', audius_track_id: null },
    ],
    nft_collection_address: 'mock_charli_nft_collection',
    artist_wallet: '8xk7jNZGRvCm4uWxSKFHdNzGQhBu5W2z1MkhKqVvmLr2',
    cover_image: null,
    created_at: '2026-02-20T00:00:00Z',
  },
  {
    id: 'show-002',
    artist_name: 'Tame Impala',
    artist_audius_handle: 'tameimpala',
    artist_audius_id: null,
    venue: 'Madison Square Garden',
    city: 'New York, NY',
    date: '2026-02-18',
    setlist: [
      { position: 1, title: 'One More Year', audius_track_id: null },
      { position: 2, title: 'Borderline', audius_track_id: null },
      { position: 3, title: 'Let It Happen', audius_track_id: null },
      { position: 4, title: 'Breathe Deeper', audius_track_id: null },
      { position: 5, title: 'The Less I Know the Better', audius_track_id: null },
      { position: 6, title: 'Elephant', audius_track_id: null },
      { position: 7, title: 'Eventually', audius_track_id: null },
      { position: 8, title: 'New Person, Same Old Mistakes', audius_track_id: null },
    ],
    nft_collection_address: 'mock_tame_nft_collection',
    artist_wallet: '7Np41oeYqPefeNQEHSv1UDhYrehxin3NStMu2Z3yGp2a',
    cover_image: null,
    created_at: '2026-02-18T00:00:00Z',
  },
]

// Mock tickets - these represent NFTs that would be in user's wallet
export const MOCK_TICKETS: MockTicket[] = [
  {
    nftAddress: 'mock_nft_001',
    showId: 'show-001',
    artistName: 'Charli XCX',
    venue: 'Le Poisson Rouge',
    date: '2026-02-20',
  },
]

// Mock artist coin balances (for demo purposes)
export const MOCK_ARTIST_COINS: Record<string, number> = {
  charlixcx: 1500,
  tameimpala: 0,
}

// Bonus tracks unlocked by Artist Coins
export const BONUS_TRACKS: Record<string, { title: string; type: string }[]> = {
  charlixcx: [
    { title: '360 (Acoustic Version)', type: 'acoustic' },
    { title: 'Club Classics (Demo)', type: 'demo' },
    { title: 'Unreleased Track 1', type: 'unreleased' },
  ],
  tameimpala: [
    { title: 'Let It Happen (Extended)', type: 'extended' },
    { title: 'Borderline (Original Version)', type: 'original' },
  ],
}

// Minimum coins required for different unlock tiers
export const COIN_THRESHOLDS = {
  bonusTracks: 100,
  superfanBadge: 1000,
}

// Get show by ID
export function getMockShowById(id: string): Show | undefined {
  return MOCK_SHOWS.find((show) => show.id === id)
}

// Get tickets for a wallet address (mocked - returns demo tickets)
export function getMockTicketsForWallet(walletAddress: string): MockTicket[] {
  // For demo, return mock tickets if any wallet is connected
  if (walletAddress) {
    return MOCK_TICKETS
  }
  return []
}

// Check if user has ticket for a show
export function hasTicketForShow(tickets: MockTicket[], showId: string): boolean {
  return tickets.some((ticket) => ticket.showId === showId)
}

// Get artist coin balance (mocked)
export function getArtistCoinBalance(artistHandle: string): number {
  return MOCK_ARTIST_COINS[artistHandle.toLowerCase()] || 0
}

// Check if user can access bonus tracks
export function canAccessBonusTracks(coinBalance: number): boolean {
  return coinBalance >= COIN_THRESHOLDS.bonusTracks
}

// Check if user is a superfan
export function isSuperfan(coinBalance: number): boolean {
  return coinBalance >= COIN_THRESHOLDS.superfanBadge
}
