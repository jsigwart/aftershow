'use client'

import { useWallet } from '@solana/wallet-adapter-react'
import { useWalletModal } from '@solana/wallet-adapter-react-ui'
import { useEffect } from 'react'
import { useAppStore } from '@/app/lib/store'

export function WalletButton() {
  const { publicKey, connected, disconnect } = useWallet()
  const { setVisible } = useWalletModal()
  const { setWalletAddress, setConnected, loadUserAssets, disconnect: storeDisconnect } = useAppStore()

  // Sync wallet state with app store
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
      className="btn-soft flex items-center gap-2"
    >
      {connected && publicKey ? (
        <>
          <span className="w-2 h-2 bg-sage rounded-full"></span>
          <span>{truncateAddress(publicKey.toBase58())}</span>
        </>
      ) : (
        'Connect Wallet'
      )}
    </button>
  )
}
