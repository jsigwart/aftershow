'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import { MOCK_TICKETS, MOCK_SHOWS, MOCK_ARTIST_COINS, isSuperfan } from '@/app/lib/mock-data'
import { useAppStore } from '@/app/lib/store'

export default function ProfilePage() {
  const params = useParams()
  const walletAddress = params.wallet as string
  const { walletAddress: currentWallet } = useAppStore()

  // For demo, we show mock data for any wallet address
  const isOwnProfile = currentWallet?.toLowerCase() === walletAddress.toLowerCase()

  // Get user's tickets (mock)
  const userTickets = MOCK_TICKETS

  // Get shows for tickets
  const userShows = userTickets.map((ticket) => {
    return MOCK_SHOWS.find((show) => show.id === ticket.showId)
  }).filter(Boolean)

  // Count total shows and superfan badges
  const totalShows = userShows.length
  const superfanCount = Object.values(MOCK_ARTIST_COINS).filter(
    (balance) => isSuperfan(balance)
  ).length

  const truncateAddress = (address: string) => {
    if (address.length > 12) {
      return `${address.slice(0, 6)}...${address.slice(-4)}`
    }
    return address
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Profile Header */}
      <div className="card mb-8">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-medium text-charcoal mb-1">
              {truncateAddress(walletAddress)}
            </h1>
            <p className="text-charcoal-light">
              {isOwnProfile ? 'Your AfterShow Profile' : 'AfterShow Profile'}
            </p>
          </div>
          <div className="flex gap-2">
            {superfanCount > 0 && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-tan/20 text-tan-dark">
                {superfanCount} Superfan Badge{superfanCount > 1 ? 's' : ''}
              </span>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-warm-gray">
          <div className="text-center">
            <p className="text-2xl font-medium text-charcoal">{totalShows}</p>
            <p className="text-sm text-charcoal-light">Shows Attended</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-medium text-charcoal">{superfanCount}</p>
            <p className="text-sm text-charcoal-light">Superfan Badges</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-medium text-charcoal">
              {Object.keys(MOCK_ARTIST_COINS).length}
            </p>
            <p className="text-sm text-charcoal-light">Artist Coins Held</p>
          </div>
        </div>
      </div>

      {/* Shows Section */}
      <section className="mb-8">
        <h2 className="text-xl font-medium text-charcoal mb-4">Shows Attended</h2>
        {userShows.length > 0 ? (
          <div className="space-y-4">
            {userShows.map((show) => (
              <Link key={show!.id} href={`/show/${show!.id}`}>
                <div className="card hover:border-sage transition-colors cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-medium text-charcoal">
                        {show!.artist_name}
                      </h3>
                      <p className="text-charcoal-light text-sm">
                        {show!.venue} • {show!.city}
                      </p>
                      <p className="text-charcoal-light text-sm">
                        {new Date(show!.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-sage text-charcoal">
                        Attended
                      </span>
                      {MOCK_ARTIST_COINS[show!.artist_audius_handle?.toLowerCase() || ''] > 0 && (
                        <span className="text-sm text-tan-dark">
                          {MOCK_ARTIST_COINS[show!.artist_audius_handle?.toLowerCase() || ''].toLocaleString()} coins
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="card text-center py-8">
            <p className="text-charcoal-light">No shows attended yet</p>
          </div>
        )}
      </section>

      {/* Artist Coins Section */}
      <section>
        <h2 className="text-xl font-medium text-charcoal mb-4">Artist Coins</h2>
        <div className="card">
          <div className="space-y-3">
            {Object.entries(MOCK_ARTIST_COINS).map(([handle, balance]) => (
              <div
                key={handle}
                className="flex items-center justify-between py-2 border-b border-warm-gray last:border-0"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-sage/20 flex items-center justify-center">
                    <span className="text-lg">🎵</span>
                  </div>
                  <div>
                    <p className="font-medium text-charcoal">@{handle}</p>
                    {isSuperfan(balance) && (
                      <span className="text-xs text-tan-dark">Superfan</span>
                    )}
                  </div>
                </div>
                <span className="text-charcoal">{balance.toLocaleString()} coins</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Share Section */}
      <div className="mt-8 text-center">
        <p className="text-sm text-charcoal-light mb-2">Share your profile</p>
        <code className="text-xs bg-cream-dark px-3 py-1 rounded">
          aftershow.xyz/profile/{truncateAddress(walletAddress)}
        </code>
      </div>
    </div>
  )
}
