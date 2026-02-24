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
        <h3 className="text-lg font-medium text-charcoal mb-4">Bonus Tracks</h3>
        <div className="text-center py-8">
          <div className="text-4xl mb-4">🔒</div>
          <p className="text-charcoal-light">
            Connect your wallet to check for Artist Coins
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-charcoal">Bonus Tracks</h3>
        <div className="flex items-center gap-2">
          {isSuperfanUser && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-tan text-charcoal">
              ⭐ Superfan
            </span>
          )}
          <span className="text-sm text-sage-dark">
            {coinBalance.toLocaleString()} coins
          </span>
        </div>
      </div>

      {!hasAccess ? (
        <div className="text-center py-6">
          <p className="text-charcoal-light mb-2">
            Hold at least {COIN_THRESHOLDS.bonusTracks} Artist Coins to unlock bonus tracks
          </p>
          <p className="text-sm text-charcoal-light">
            You have {coinBalance} coins. Need {COIN_THRESHOLDS.bonusTracks - coinBalance} more.
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {tracks.map((track, index) => (
            <div
              key={index}
              className="p-3 rounded-lg border border-warm-gray hover:border-tan transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-tan/20 flex items-center justify-center text-sm">
                  🎵
                </span>
                <div className="flex-1">
                  <p className="text-charcoal">{track.title}</p>
                  <p className="text-sm text-tan-dark capitalize">{track.type}</p>
                </div>
                <span className="text-sage-dark">▶</span>
              </div>
            </div>
          ))}
          <p className="text-sm text-center text-charcoal-light mt-4">
            Exclusive content for Artist Coin holders
          </p>
        </div>
      )}
    </div>
  )
}
