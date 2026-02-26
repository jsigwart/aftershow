'use client'

import Link from 'next/link'
import { WalletButton } from './WalletButton'
import { useAppStore } from '@/app/lib/store'

export function Header() {
  const { walletAddress, isConnected } = useAppStore()

  return (
    <header className="sticky top-0 z-40 border-b border-bronze-line bg-black/70 backdrop-blur-xl">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-3 text-ivory transition-opacity hover:opacity-90">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-bronze-line-strong bg-[linear-gradient(135deg,#FFDE59,#F5C400)] text-sm font-black text-[#171200] shadow-[0_10px_25px_rgba(245,196,0,0.22)]">
            AS
          </span>
          <div>
            <div className="text-lg font-semibold tracking-tight">AfterShow</div>
            <div className="text-[11px] uppercase tracking-[0.22em] text-gold">Live archive</div>
          </div>
        </Link>
        <div className="flex items-center gap-4">
          {isConnected && walletAddress && (
            <Link
              href={`/profile/${walletAddress}`}
              className="text-sm text-smoke hover:text-ivory transition-colors"
            >
              My Profile
            </Link>
          )}
          <WalletButton />
        </div>
      </div>
    </header>
  )
}
