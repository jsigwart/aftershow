'use client'

import { useAppStore } from '@/app/lib/store'
import { TicketCard } from '@/app/components/TicketCard'
import { MOCK_SHOWS } from '@/app/lib/mock-data'
import Link from 'next/link'

export default function Home() {
  const { isConnected, tickets } = useAppStore()

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 md:py-12">
      <section className="relative overflow-hidden rounded-[28px] border border-bronze-line-strong bg-[linear-gradient(180deg,rgba(22,22,22,0.95),rgba(8,8,8,0.98))] px-6 py-12 md:px-10 md:py-16 shadow-[0_30px_80px_rgba(0,0,0,0.45)]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(245,196,0,0.22),transparent_34%)]" />
        <div className="pointer-events-none absolute -right-10 top-6 h-48 w-48 rounded-full bg-gold/10 blur-3xl" />
        <div className="relative text-center">
          <span className="inline-flex items-center rounded-full border border-bronze-line-strong bg-gold/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-amber">
            Live archive demo
          </span>
          <h1 className="mt-5 text-4xl font-semibold tracking-tight text-ivory md:text-6xl">
            The show doesn&apos;t end when you leave
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-base text-smoke md:text-lg">
            Your concert ticket unlocks the setlist, fan cams, and exclusive drops from the night.
            Built on Solana. Powered by Audius.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-sm text-smoke">
            <span className="rounded-full border border-bronze-line px-3 py-1">Setlist unlocks</span>
            <span className="rounded-full border border-bronze-line px-3 py-1">Fan uploads</span>
            <span className="rounded-full border border-bronze-line px-3 py-1">Artist support</span>
          </div>
        </div>
      </section>

      {isConnected && tickets.length > 0 && (
        <section className="mt-12 mb-12">
          <div className="flex items-center justify-between mb-6 gap-4">
            <div>
              <h2 className="text-2xl font-semibold text-ivory">Your Shows</h2>
              <p className="text-smoke text-sm mt-1">Verified tickets that unlock your post-show experience.</p>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {tickets.map((ticket) => (
              <TicketCard key={ticket.nftAddress} ticket={ticket} />
            ))}
          </div>
        </section>
      )}

      {isConnected && tickets.length === 0 && (
        <section className="text-center py-12">
          <div className="card max-w-md mx-auto">
            <h2 className="text-xl font-semibold text-ivory mb-2">No tickets found</h2>
            <p className="text-smoke">
              We couldn&apos;t find any concert tickets in your wallet.
              Attend a show with NFT ticketing to unlock content here.
            </p>
          </div>
        </section>
      )}

      {!isConnected && (
        <section className="text-center py-12">
          <div className="card max-w-md mx-auto">
            <h2 className="text-xl font-semibold text-ivory mb-2">Connect your wallet</h2>
            <p className="text-smoke mb-4">
              Connect your Solana wallet to see your concert tickets and unlock exclusive content.
            </p>
            <p className="text-sm text-gold">
              Looking for your ticket from last night? Connect to find out.
            </p>
          </div>
        </section>
      )}

      <section className="mt-12">
        <div className="flex items-end justify-between mb-6 gap-4">
          <div>
            <h2 className="text-2xl font-semibold text-ivory">Recent Shows</h2>
            <p className="text-smoke text-sm mt-1">Browse recent drops and replayable nights.</p>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {MOCK_SHOWS.map((show) => (
            <Link key={show.id} href={`/show/${show.id}`}>
              <div className="card cursor-pointer transition-all hover:-translate-y-0.5 hover:border-gold hover:shadow-[0_24px_60px_rgba(0,0,0,0.45)]">
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-ivory">{show.artist_name}</h3>
                    <p className="text-smoke text-sm mt-1">{show.venue}</p>
                    <p className="text-smoke text-sm">{show.city}</p>
                    <p className="text-smoke text-sm mt-3">
                      {new Date(show.date).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="inline-flex rounded-full border border-bronze-line-strong bg-gold/10 px-3 py-1 text-xs font-medium text-gold">
                      {show.setlist.length} tracks
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-16 py-12 border-t border-bronze-line">
        <h2 className="text-2xl font-semibold text-ivory mb-8 text-center">How It Works</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            ['1', 'Attend a Show', 'Get your NFT ticket at a KYD-powered venue'],
            ['2', 'Connect Wallet', 'Your ticket unlocks the setlist and fan cams'],
            ['3', 'Relive the Night', 'Stream your setlist, watch clips, tip the artist'],
          ].map(([step, title, desc]) => (
            <div key={step} className="card text-center">
              <div className="w-12 h-12 rounded-full bg-[linear-gradient(135deg,#FFDE59,#F5C400)] text-[#1b1500] flex items-center justify-center mx-auto mb-4 font-bold shadow-[0_10px_24px_rgba(245,196,0,0.22)]">
                {step}
              </div>
              <h3 className="font-semibold text-ivory mb-2">{title}</h3>
              <p className="text-smoke text-sm">{desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
