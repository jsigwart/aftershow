'use client'

import Link from 'next/link'
import { WalletButton } from './WalletButton'

export function Header() {
  return (
    <header className="border-b border-warm-gray">
      <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-medium text-charcoal hover:text-sage-dark transition-colors">
          AfterShow
        </Link>
        <WalletButton />
      </div>
    </header>
  )
}
