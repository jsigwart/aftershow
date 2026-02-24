'use client'

import Link from 'next/link'
import { WalletButton } from './WalletButton'
import { useAppStore } from '@/app/lib/store'

export function Header() {
  const { walletAddress, isConnected } = useAppStore()

  return (
    <header className="border-b border-warm-gray">
      <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-medium text-charcoal hover:text-sage-dark transition-colors">
          AfterShow
        </Link>
        <div className="flex items-center gap-4">
          {isConnected && walletAddress && (
            <Link
              href={`/profile/${walletAddress}`}
              className="text-sm text-charcoal-light hover:text-charcoal transition-colors"
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
