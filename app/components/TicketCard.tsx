'use client'

import Link from 'next/link'
import { MockTicket } from '@/app/types'

interface TicketCardProps {
  ticket: MockTicket
}

export function TicketCard({ ticket }: TicketCardProps) {
  return (
    <Link href={`/show/${ticket.showId}`}>
      <div className="card cursor-pointer transition-all hover:-translate-y-0.5 hover:border-gold hover:shadow-[0_28px_60px_rgba(0,0,0,0.5)]">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold text-ivory">{ticket.artistName}</h3>
            <p className="text-smoke text-sm mt-1">{ticket.venue}</p>
            <p className="text-smoke text-sm">{new Date(ticket.date).toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}</p>
          </div>
          <div className="flex flex-col items-end">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gold text-[#1a1400] shadow-[0_10px_24px_rgba(245,196,0,0.2)]">
              Ticket Verified
            </span>
          </div>
        </div>
        <div className="mt-5 pt-4 border-t border-bronze-line flex items-center justify-between gap-3">
          <p className="text-sm text-gold">Click to view your setlist and fan cams</p>
          <span className="text-gold">→</span>
        </div>
      </div>
    </Link>
  )
}
