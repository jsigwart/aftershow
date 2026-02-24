import { create } from 'zustand'
import { MockTicket } from '@/app/types'
import { getMockTicketsForWallet, MOCK_ARTIST_COINS } from './mock-data'

interface AppState {
  // Wallet state
  walletAddress: string | null
  isConnected: boolean

  // User assets
  tickets: MockTicket[]
  artistCoins: Record<string, number>

  // Current playback
  currentTrackId: string | null
  isPlaying: boolean

  // Actions
  setWalletAddress: (address: string | null) => void
  setConnected: (connected: boolean) => void
  loadUserAssets: (walletAddress: string) => void
  setCurrentTrack: (trackId: string | null) => void
  setPlaying: (playing: boolean) => void
  disconnect: () => void
}

export const useAppStore = create<AppState>((set) => ({
  // Initial state
  walletAddress: null,
  isConnected: false,
  tickets: [],
  artistCoins: {},
  currentTrackId: null,
  isPlaying: false,

  // Actions
  setWalletAddress: (address) => set({ walletAddress: address }),

  setConnected: (connected) => set({ isConnected: connected }),

  loadUserAssets: (walletAddress) => {
    // Load mock tickets and artist coins for demo
    const tickets = getMockTicketsForWallet(walletAddress)
    set({
      tickets,
      artistCoins: MOCK_ARTIST_COINS,
    })
  },

  setCurrentTrack: (trackId) => set({ currentTrackId: trackId }),

  setPlaying: (playing) => set({ isPlaying: playing }),

  disconnect: () => set({
    walletAddress: null,
    isConnected: false,
    tickets: [],
    artistCoins: {},
    currentTrackId: null,
    isPlaying: false,
  }),
}))
