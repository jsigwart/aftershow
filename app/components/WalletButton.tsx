'use client'

import { useWallet } from '@solana/wallet-adapter-react'
import { useWalletModal } from '@solana/wallet-adapter-react-ui'
import { useEffect } from 'react'
import { useAppStore } from '@/app/lib/store'

export function WalletButton() {
  const { publicKey, connected, disconnect } = useWallet()
  const { setVisible } = useWalletModal()
  const { setWalletAddress, setConnected, loadUserAssets, disconnect: storeDisconnect } = useAppStore()

  useEffect(() => {
    if (connected && publicKey) {
      const address = publicKey.toBase58()
      setWalletAddress(address)
      setConnected(true)
      loadUserAssets(address)
    } else {
      setWalletAddress(null)
      setConnected(false)
    }
  }, [connected, publicKey, setWalletAddress, setConnected, loadUserAssets])

  const handleClick = () => {
    if (connected) {
      disconnect()
      storeDisconnect()
    } else {
      setVisible(true)
    }
  }

  const truncateAddress = (address: string) => {
    return `${address.slice(0, 4)}...${address.slice(-4)}`
  }

  return (
    <button
      onClick={handleClick}
      className={connected ? 'btn-soft flex items-center gap-2 font-medium' : 'btn-primary flex items-center gap-2'}
    >
      {connected && publicKey ? (
        <>
          <span className="w-2.5 h-2.5 bg-gold rounded-full shadow-[0_0_18px_rgba(245,196,0,0.6)]"></span>
          <span>{truncateAddress(publicKey.toBase58())}</span>
        </>
      ) : (
        'Connect Wallet'
      )}
    </button>
  )
}
