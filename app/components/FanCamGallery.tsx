'use client'

import { useState } from 'react'
import { FanCam } from '@/app/types'

interface FanCamGalleryProps {
  fanCams: FanCam[]
  isLocked: boolean
}

// Mock fan cams for demo
const MOCK_FAN_CAMS: FanCam[] = [
  {
    id: 'cam-001',
    show_id: 'show-001',
    uploader_wallet: '8xk7...mLr2',
    video_url: '',
    thumbnail_url: null,
    caption: 'That 360 opener was insane!',
    created_at: '2026-02-20T22:30:00Z',
  },
  {
    id: 'cam-002',
    show_id: 'show-001',
    uploader_wallet: '7Np4...Gp2a',
    video_url: '',
    thumbnail_url: null,
    caption: 'View from the pit during Von Dutch',
    created_at: '2026-02-20T23:15:00Z',
  },
  {
    id: 'cam-003',
    show_id: 'show-001',
    uploader_wallet: '9Abc...Xyz1',
    video_url: '',
    thumbnail_url: null,
    caption: 'Encore moment - the crowd went crazy',
    created_at: '2026-02-21T00:05:00Z',
  },
]

export function FanCamGallery({ fanCams, isLocked }: FanCamGalleryProps) {
  const [selectedCam, setSelectedCam] = useState<FanCam | null>(null)

  // Use mock data if no real fan cams
  const displayCams = fanCams.length > 0 ? fanCams : MOCK_FAN_CAMS

  if (isLocked) {
    return (
      <div className="card locked">
        <h3 className="text-lg font-medium text-charcoal mb-4">Fan Cam Gallery</h3>
        <div className="text-center py-8">
          <div className="text-4xl mb-4">🔒</div>
          <p className="text-charcoal-light">
            Only ticket holders can view and upload fan cams
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-charcoal">Fan Cam Gallery</h3>
        <span className="text-sm text-charcoal-light">{displayCams.length} clips</span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {displayCams.map((cam) => (
          <button
            key={cam.id}
            onClick={() => setSelectedCam(cam)}
            className="aspect-video bg-cream-dark rounded-lg border border-warm-gray hover:border-sage transition-colors flex items-center justify-center"
          >
            <div className="text-center p-2">
              <div className="text-2xl mb-1">🎥</div>
              <p className="text-xs text-charcoal-light line-clamp-2">{cam.caption}</p>
            </div>
          </button>
        ))}
      </div>

      {/* Modal for viewing fan cam */}
      {selectedCam && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-cream rounded-lg max-w-lg w-full p-4">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-medium text-charcoal">Fan Cam</h4>
              <button
                onClick={() => setSelectedCam(null)}
                className="text-charcoal-light hover:text-charcoal"
              >
                ✕
              </button>
            </div>
            <div className="aspect-video bg-cream-dark rounded-lg flex items-center justify-center mb-4">
              <div className="text-center">
                <div className="text-4xl mb-2">🎥</div>
                <p className="text-charcoal-light text-sm">
                  Demo mode: Video would play here
                </p>
              </div>
            </div>
            <p className="text-charcoal mb-2">{selectedCam.caption}</p>
            <div className="flex items-center justify-between text-sm text-charcoal-light">
              <span>By {selectedCam.uploader_wallet}</span>
              <span>
                {new Date(selectedCam.created_at).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
      )}

      <p className="text-sm text-center text-charcoal-light mt-4">
        Videos uploaded by fans who attended this show
      </p>
    </div>
  )
}
