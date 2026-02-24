'use client'

import { useAppStore } from '@/app/lib/store'
import { TicketCard } from '@/app/components/TicketCard'
import { MOCK_SHOWS } from '@/app/lib/mock-data'
import Link from 'next/link'

export default function Home() {
  const { isConnected, tickets } = useAppStore()

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="text-center py-12">
        <h1 className="text-4xl font-medium text-charcoal mb-4">
          The show doesn&apos;t end when you leave
        </h1>
        <p className="text-charcoal-light text-lg max-w-2xl mx-auto">
          Your concert ticket unlocks the setlist, fan cams, and exclusive content from the night.
          Built on Solana. Powered by Audius.
        </p>
      </section>

      {/* Connected State - Show Tickets */}
      {isConnected && tickets.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-medium text-charcoal mb-6">Your Shows</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {tickets.map((ticket) => (
              <TicketCard key={ticket.nftAddress} ticket={ticket} />
            ))}
          </div>
        </section>
      )}

      {/* Connected but no tickets */}
      {isConnected && tickets.length === 0 && (
        <section className="text-center py-12">
          <div className="card max-w-md mx-auto">
            <h2 className="text-xl font-medium text-charcoal mb-2">No tickets found</h2>
            <p className="text-charcoal-light">
              We couldn&apos;t find any concert tickets in your wallet.
              Attend a show with NFT ticketing to unlock content here.
            </p>
          </div>
        </section>
      )}

      {/* Not Connected State */}
      {!isConnected && (
        <section className="text-center py-12">
          <div className="card max-w-md mx-auto">
            <h2 className="text-xl font-medium text-charcoal mb-2">Connect your wallet</h2>
            <p className="text-charcoal-light mb-4">
              Connect your Solana wallet to see your concert tickets and unlock exclusive content.
            </p>
            <p className="text-sm text-sage-dark">
              Looking for your ticket from last night? Connect to find out.
            </p>
          </div>
        </section>
      )}

      {/* Browse Shows (always visible) */}
      <section className="mt-12">
        <h2 className="text-2xl font-medium text-charcoal mb-6">Recent Shows</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {MOCK_SHOWS.map((show) => (
            <Link key={show.id} href={`/show/${show.id}`}>
              <div className="card hover:border-sage transition-colors cursor-pointer">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-charcoal">{show.artist_name}</h3>
                    <p className="text-charcoal-light text-sm mt-1">{show.venue}</p>
                    <p className="text-charcoal-light text-sm">{show.city}</p>
                    <p className="text-charcoal-light text-sm mt-2">
                      {new Date(show.date).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-sm text-charcoal-light">{show.setlist.length} tracks</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="mt-16 py-12 border-t border-warm-gray">
        <h2 className="text-2xl font-medium text-charcoal mb-8 text-center">How It Works</h2>
        <div className="grid gap-8 md:grid-cols-3">
          <div className="text-center">
            <div className="w-12 h-12 rounded-full bg-sage flex items-center justify-center mx-auto mb-4">
              <span className="text-xl">1</span>
            </div>
            <h3 className="font-medium text-charcoal mb-2">Attend a Show</h3>
            <p className="text-charcoal-light text-sm">
              Get your NFT ticket at a KYD-powered venue
            </p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 rounded-full bg-sage flex items-center justify-center mx-auto mb-4">
              <span className="text-xl">2</span>
            </div>
            <h3 className="font-medium text-charcoal mb-2">Connect Wallet</h3>
            <p className="text-charcoal-light text-sm">
              Your ticket unlocks the setlist and fan cams
            </p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 rounded-full bg-sage flex items-center justify-center mx-auto mb-4">
              <span className="text-xl">3</span>
            </div>
            <h3 className="font-medium text-charcoal mb-2">Relive the Night</h3>
            <p className="text-charcoal-light text-sm">
              Stream your setlist, watch clips, tip the artist
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
