'use client'

import Link from 'next/link'
import { MockTicket } from '@/app/types'

interface TicketCardProps {
  ticket: MockTicket
}

export function TicketCard({ ticket }: TicketCardProps) {
  return (
    <Link href={`/show/${ticket.showId}`}>
      <div className="card hover:border-sage transition-colors cursor-pointer">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-medium text-charcoal">{ticket.artistName}</h3>
            <p className="text-charcoal-light text-sm mt-1">{ticket.venue}</p>
            <p className="text-charcoal-light text-sm">{new Date(ticket.date).toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}</p>
          </div>
          <div className="flex flex-col items-end">
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-sage text-charcoal">
              Ticket Verified
            </span>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-warm-gray">
          <p className="text-sm text-sage-dark">Click to view your setlist and fan cams</p>
        </div>
      </div>
    </Link>
  )
}
