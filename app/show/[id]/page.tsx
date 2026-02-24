'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import { useAppStore } from '@/app/lib/store'
import { getMockShowById, hasTicketForShow, getArtistCoinBalance } from '@/app/lib/mock-data'
import { SetlistPlayer } from '@/app/components/SetlistPlayer'
import { BonusTracks } from '@/app/components/BonusTracks'
import { FanCamGallery } from '@/app/components/FanCamGallery'
import { FanCamUpload } from '@/app/components/FanCamUpload'
import { TipButton } from '@/app/components/TipButton'

export default function ShowPage() {
  const params = useParams()
  const showId = params.id as string
  const { isConnected, tickets } = useAppStore()

  const show = getMockShowById(showId)

  if (!show) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="card text-center py-12">
          <h1 className="text-2xl font-medium text-charcoal mb-4">Show Not Found</h1>
          <p className="text-charcoal-light mb-6">
            We couldn&apos;t find this show in our database.
          </p>
          <Link href="/" className="btn-primary">
            Back to Home
          </Link>
        </div>
      </div>
    )
  }

  const hasTicket = isConnected && hasTicketForShow(tickets, showId)
  const artistHandle = show.artist_audius_handle || ''
  const coinBalance = isConnected ? getArtistCoinBalance(artistHandle) : 0

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Back Link */}
      <Link
        href="/"
        className="inline-flex items-center text-charcoal-light hover:text-charcoal mb-6"
      >
        ← Back to shows
      </Link>

      {/* Show Header */}
      <div className="card mb-8">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-medium text-charcoal mb-2">
              {show.artist_name}
            </h1>
            <p className="text-charcoal-light">{show.venue}</p>
            <p className="text-charcoal-light">{show.city}</p>
            <p className="text-charcoal-light mt-2">
              {new Date(show.date).toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </div>
          <div className="flex flex-col gap-2 items-end">
            {hasTicket ? (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-sage text-charcoal">
                ✓ Ticket Verified
              </span>
            ) : isConnected ? (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-cream-dark text-charcoal-light">
                No ticket found
              </span>
            ) : (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-cream-dark text-charcoal-light">
                Connect wallet to verify
              </span>
            )}
            {isConnected && coinBalance > 0 && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-tan/20 text-tan-dark">
                {coinBalance.toLocaleString()} Artist Coins
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Left Column - Setlist */}
        <div className="md:col-span-2 space-y-6">
          <SetlistPlayer
            setlist={show.setlist}
            artistName={show.artist_name}
            isLocked={!hasTicket}
          />

          <FanCamGallery fanCams={[]} isLocked={!hasTicket} />
        </div>

        {/* Right Column - Bonus & Actions */}
        <div className="space-y-6">
          <BonusTracks
            artistHandle={artistHandle}
            coinBalance={coinBalance}
            isLocked={!isConnected}
          />

          <TipButton
            artistName={show.artist_name}
            artistWallet={show.artist_wallet}
          />

          <FanCamUpload showId={showId} isLocked={!hasTicket} />
        </div>
      </div>

      {/* Demo Notice */}
      <div className="mt-8 p-4 bg-sage/10 rounded-lg text-center">
        <p className="text-sm text-charcoal-light">
          <strong>Demo Mode:</strong> In production, ticket verification checks for KYD NFTs in your wallet.
          Artist Coin balances would be fetched from Audius.
        </p>
      </div>
    </div>
  )
}
