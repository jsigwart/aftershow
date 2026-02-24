'use client'

import { useState, useRef, useEffect } from 'react'
import { SetlistTrack } from '@/app/types'
import { getStreamUrl } from '@/app/lib/audius'
import { useAppStore } from '@/app/lib/store'

interface SetlistPlayerProps {
  setlist: SetlistTrack[]
  artistName: string
  isLocked: boolean
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
      // Pause current track
      audioRef.current?.pause()
      setPlaying(false)
      return
    }

    setCurrentTrackIndex(index)
    setIsLoading(true)

    // For demo, we'll use a placeholder since we don't have real Audius track IDs
    // In production, this would fetch the actual stream URL
    if (track.audius_track_id) {
      const url = await getStreamUrl(track.audius_track_id)
      setStreamUrl(url)
    } else {
      // Demo mode: show that track would play
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
        <h3 className="text-lg font-medium text-charcoal mb-4">Setlist Vault</h3>
        <div className="text-center py-8">
          <div className="text-4xl mb-4">🔒</div>
          <p className="text-charcoal-light">
            Connect your wallet and verify your ticket to unlock the setlist
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-charcoal">Setlist Vault</h3>
        <span className="text-sm text-sage-dark">{setlist.length} tracks</span>
      </div>

      <div className="space-y-2">
        {setlist.map((track, index) => (
          <button
            key={index}
            onClick={() => handlePlayTrack(index, track)}
            className={`w-full text-left p-3 rounded-lg border transition-all ${
              currentTrackIndex === index
                ? 'border-sage bg-sage/10'
                : 'border-warm-gray hover:border-sage'
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="w-6 text-center text-charcoal-light text-sm">
                {currentTrackIndex === index && isPlaying ? (
                  <span className="text-sage-dark">▶</span>
                ) : (
                  track.position
                )}
              </span>
              <div className="flex-1">
                <p className="text-charcoal">{track.title}</p>
                <p className="text-sm text-charcoal-light">{artistName}</p>
              </div>
              {isLoading && currentTrackIndex === index && (
                <span className="text-sm text-charcoal-light">Loading...</span>
              )}
            </div>
          </button>
        ))}
      </div>

      {/* Audio element for actual playback */}
      {streamUrl && (
        <audio
          ref={audioRef}
          src={streamUrl}
          onEnded={() => {
            setPlaying(false)
            // Auto-play next track
            if (currentTrackIndex !== null && currentTrackIndex < setlist.length - 1) {
              handlePlayTrack(currentTrackIndex + 1, setlist[currentTrackIndex + 1])
            }
          }}
        />
      )}

      {/* Demo mode indicator */}
      {!streamUrl && currentTrackIndex !== null && (
        <div className="mt-4 p-3 bg-sage/10 rounded-lg text-center">
          <p className="text-sm text-charcoal-light">
            Demo mode: In production, this would stream from Audius
          </p>
        </div>
      )}
    </div>
  )
}
