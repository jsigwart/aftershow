'use client'

import { BONUS_TRACKS, COIN_THRESHOLDS, canAccessBonusTracks, isSuperfan } from '@/app/lib/mock-data'

interface BonusTracksProps {
  artistHandle: string
  coinBalance: number
  isLocked: boolean
}

export function BonusTracks({ artistHandle, coinBalance, isLocked }: BonusTracksProps) {
  const tracks = BONUS_TRACKS[artistHandle.toLowerCase()] || []
  const hasAccess = canAccessBonusTracks(coinBalance)
  const isSuperfanUser = isSuperfan(coinBalance)

  if (isLocked) {
    return (
      <div className="card locked">
        <h3 className="text-lg font-semibold text-ivory mb-4">Bonus Tracks</h3>
        <div className="text-center py-8">
          <div className="text-4xl mb-4">🔒</div>
          <p className="text-smoke">
            Connect your wallet to check for Artist Coins
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4 gap-4">
        <h3 className="text-lg font-semibold text-ivory">Bonus Tracks</h3>
        <div className="flex items-center gap-2 flex-wrap justify-end">
          {isSuperfanUser && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-gold text-[#1a1400]">
              ⭐ Superfan
            </span>
          )}
          <span className="text-sm text-gold">
            {coinBalance.toLocaleString()} coins
          </span>
        </div>
      </div>

      {!hasAccess ? (
        <div className="text-center py-6">
          <p className="text-smoke mb-2">
            Hold at least {COIN_THRESHOLDS.bonusTracks} Artist Coins to unlock bonus tracks
          </p>
          <p className="text-sm text-smoke">
            You have {coinBalance} coins. Need {COIN_THRESHOLDS.bonusTracks - coinBalance} more.
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {tracks.map((track, index) => (
            <div
              key={index}
              className="p-3 rounded-2xl border border-bronze-line hover:border-gold transition-colors cursor-pointer bg-gold/5"
            >
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-gold/15 flex items-center justify-center text-sm">
                  🎵
                </span>
                <div className="flex-1">
                  <p className="text-ivory">{track.title}</p>
                  <p className="text-sm text-gold capitalize">{track.type}</p>
                </div>
                <span className="text-gold">▶</span>
              </div>
            </div>
          ))}
          <p className="text-sm text-center text-smoke mt-4">
            Exclusive content for Artist Coin holders
          </p>
        </div>
      )}
    </div>
  )
}
