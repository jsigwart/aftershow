'use client'

import { useState } from 'react'
import { useWallet, useConnection } from '@solana/wallet-adapter-react'
import { PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL } from '@solana/web3.js'

interface TipButtonProps {
  artistName: string
  artistWallet: string | null
}

const TIP_AMOUNTS = [
  { label: '0.01 SOL', value: 0.01 },
  { label: '0.05 SOL', value: 0.05 },
  { label: '0.1 SOL', value: 0.1 },
]

export function TipButton({ artistName, artistWallet }: TipButtonProps) {
  const { publicKey, sendTransaction } = useWallet()
  const { connection } = useConnection()
  const [isOpen, setIsOpen] = useState(false)
  const [isSending, setIsSending] = useState(false)
  const [txSignature, setTxSignature] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleTip = async (amount: number) => {
    if (!publicKey || !artistWallet) return

    setIsSending(true)
    setError(null)
    setTxSignature(null)

    try {
      const recipientPubKey = new PublicKey(artistWallet)
      const lamports = Math.floor(amount * LAMPORTS_PER_SOL)

      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: recipientPubKey,
          lamports,
        })
      )

      const signature = await sendTransaction(transaction, connection)

      // Wait for confirmation
      await connection.confirmTransaction(signature, 'confirmed')

      setTxSignature(signature)
      setIsSending(false)
    } catch (err) {
      console.error('Tip error:', err)
      setError(err instanceof Error ? err.message : 'Failed to send tip')
      setIsSending(false)
    }
  }

  if (!artistWallet) {
    return null
  }

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-charcoal">Support the Artist</h3>
        <span className="text-sm text-charcoal-light">via Solana Pay</span>
      </div>

      {!publicKey ? (
        <p className="text-charcoal-light text-center py-4">
          Connect your wallet to tip {artistName}
        </p>
      ) : txSignature ? (
        <div className="text-center py-4">
          <div className="text-2xl mb-2">✨</div>
          <p className="text-charcoal mb-2">Thanks for supporting {artistName}!</p>
          <a
            href={`https://explorer.solana.com/tx/${txSignature}?cluster=devnet`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-sage-dark hover:underline"
          >
            View transaction →
          </a>
        </div>
      ) : (
        <>
          {!isOpen ? (
            <button
              onClick={() => setIsOpen(true)}
              className="btn-primary w-full"
            >
              Tip {artistName}
            </button>
          ) : (
            <div className="space-y-3">
              <p className="text-sm text-charcoal-light text-center">
                Choose tip amount (devnet SOL)
              </p>
              <div className="grid grid-cols-3 gap-2">
                {TIP_AMOUNTS.map((tip) => (
                  <button
                    key={tip.value}
                    onClick={() => handleTip(tip.value)}
                    disabled={isSending}
                    className="btn-soft text-sm py-2"
                  >
                    {isSending ? '...' : tip.label}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-full text-sm text-charcoal-light hover:text-charcoal"
              >
                Cancel
              </button>
            </div>
          )}
          {error && (
            <p className="text-sm text-red-500 mt-2 text-center">{error}</p>
          )}
        </>
      )}
    </div>
  )
}
