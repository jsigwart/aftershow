'use client'

import { useState, useRef, useEffect } from 'react'
import { SetlistTrack } from '@/app/types'
import { useAppStore } from '@/app/lib/store'

interface SetlistPlayerProps {
  setlist: SetlistTrack[]
  artistName: string
  isLocked: boolean
}

const AUDIUS_API_BASE = 'https://discoveryprovider.audius.co/v1'

function getStreamUrl(trackId: string): string {
  return `${AUDIUS_API_BASE}/tracks/${trackId}/stream?app_name=AfterShow`
}

export function SetlistPlayer({ setlist, artistName, isLocked }: SetlistPlayerProps) {
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number | null>(null)
  const [streamUrl, setStreamUrl] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)
  const { isPlaying, setPlaying, setCurrentTrack } = useAppStore()

  const handlePlayTrack = async (index: number, track: SetlistTrack) => {
    if (isLocked) return

    if (currentTrackIndex === index && isPlaying) {
      audioRef.current?.pause()
      setPlaying(false)
      return
    }

    setCurrentTrackIndex(index)
    setIsLoading(true)

    if (track.audius_track_id) {
      const url = getStreamUrl(track.audius_track_id)
      setStreamUrl(url)
    } else {
      setStreamUrl(null)
    }

    setIsLoading(false)
    setCurrentTrack(track.audius_track_id || `demo-${index}`)
    setPlaying(true)
  }

  useEffect(() => {
    if (audioRef.current && streamUrl && isPlaying) {
      audioRef.current.play()
    }
  }, [streamUrl, isPlaying])

  if (isLocked) {
    return (
      <div className="card locked">
        <h3 className="text-lg font-semibold text-ivory mb-4">Setlist Vault</h3>
        <div className="text-center py-8">
          <div className="text-4xl mb-4">🔒</div>
          <p className="text-smoke">
            Connect your wallet and verify your ticket to unlock the setlist
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-ivory">Setlist Vault</h3>
        <span className="text-sm text-gold">{setlist.length} tracks</span>
      </div>

      <div className="space-y-2">
        {setlist.map((track, index) => (
          <button
            key={index}
            onClick={() => handlePlayTrack(index, track)}
            className={`w-full text-left p-3 rounded-2xl border transition-all ${
              currentTrackIndex === index
                ? 'border-gold bg-gold/10 shadow-[0_12px_30px_rgba(245,196,0,0.08)]'
                : 'border-bronze-line hover:border-gold'
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="w-6 text-center text-smoke text-sm">
                {currentTrackIndex === index && isPlaying ? (
                  <span className="text-gold">▶</span>
                ) : (
                  track.position
                )}
              </span>
              <div className="flex-1">
                <p className="text-ivory">{track.title}</p>
                <p className="text-sm text-smoke">{artistName}</p>
              </div>
              {isLoading && currentTrackIndex === index && (
                <span className="text-sm text-smoke">Loading...</span>
              )}
            </div>
          </button>
        ))}
      </div>

      {streamUrl && (
        <audio
          ref={audioRef}
          src={streamUrl}
          onEnded={() => {
            setPlaying(false)
            if (currentTrackIndex !== null && currentTrackIndex < setlist.length - 1) {
              handlePlayTrack(currentTrackIndex + 1, setlist[currentTrackIndex + 1])
            }
          }}
        />
      )}

      {!streamUrl && currentTrackIndex !== null && (
        <div className="mt-4 p-3 rounded-2xl border border-bronze-line bg-gold/10 text-center">
          <p className="text-sm text-smoke">
            Demo mode: In production, this would stream from Audius
          </p>
        </div>
      )}
    </div>
  )
}
