'use client'

import { useMemo, useState } from 'react'
import { FanCam } from '@/app/types'

interface FanCamGalleryProps {
  fanCams: FanCam[]
  isLocked: boolean
}

type DemoCardMeta = {
  image: string
  user: string
  duration: string
  views: string
  tag: string
}

const DEMO_CARD_META: DemoCardMeta[] = [
  {
    image: '/fancams/fancam-1.png',
    user: '@pitpixie',
    duration: '0:18',
    views: '1.4K',
    tag: 'LASER CAM',
  },
  {
    image: '/fancams/fancam-2.png',
    user: '@frontrowjules',
    duration: '0:27',
    views: '2.8K',
    tag: 'MAIN STAGE',
  },
  {
    image: '/fancams/fancam-3.png',
    user: '@nightdrive.fm',
    duration: '0:22',
    views: '962',
    tag: 'VOCAL MOMENT',
  },
  {
    image: '/fancams/fancam-4.png',
    user: '@setlistkid',
    duration: '0:14',
    views: '1.1K',
    tag: 'ENCORE',
  },
]

const MOCK_FAN_CAMS: FanCam[] = [
  {
    id: 'cam-001',
    show_id: 'show-001',
    uploader_wallet: '8xk7...mLr2',
    video_url: '',
    thumbnail_url: '/fancams/fancam-1.png',
    caption: 'Lasers hit right when the beat dropped',
    created_at: '2026-02-20T22:30:00Z',
  },
  {
    id: 'cam-002',
    show_id: 'show-001',
    uploader_wallet: '7Np4...Gp2a',
    video_url: '',
    thumbnail_url: '/fancams/fancam-2.png',
    caption: 'Wide shot from the floor during the hook',
    created_at: '2026-02-20T23:15:00Z',
  },
  {
    id: 'cam-003',
    show_id: 'show-001',
    uploader_wallet: '9Abc...Xyz1',
    video_url: '',
    thumbnail_url: '/fancams/fancam-3.png',
    caption: 'This vocal run had the whole arena screaming',
    created_at: '2026-02-21T00:05:00Z',
  },
  {
    id: 'cam-004',
    show_id: 'show-001',
    uploader_wallet: '6Lm2...Qwe9',
    video_url: '',
    thumbnail_url: '/fancams/fancam-4.png',
    caption: 'Close-up from the encore with everyone singing along',
    created_at: '2026-02-21T00:18:00Z',
  },
]

export function FanCamGallery({ fanCams, isLocked }: FanCamGalleryProps) {
  const [selectedCam, setSelectedCam] = useState<FanCam | null>(null)

  const displayCams = fanCams.length > 0 ? fanCams : MOCK_FAN_CAMS

  const decoratedCams = useMemo(() => {
    return displayCams.map((cam, index) => {
      const meta = DEMO_CARD_META[index % DEMO_CARD_META.length]
      return {
        ...cam,
        thumbnail_url: cam.thumbnail_url || meta.image,
        demoMeta: meta,
      }
    })
  }, [displayCams])

  if (isLocked) {
    return (
      <div className="card locked">
        <h3 className="text-lg font-semibold text-ivory mb-4">Fan Cam Gallery</h3>
        <div className="text-center py-8">
          <div className="text-4xl mb-4">🔒</div>
          <p className="text-smoke">
            Only ticket holders can view and upload fan cams
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-ivory">Fan Cam Gallery</h3>
          <p className="mt-1 text-xs uppercase tracking-[0.22em] text-gold/80">
            Sample fan-uploaded moments
          </p>
        </div>
        <span className="rounded-full border border-bronze-line-strong bg-gold/10 px-3 py-1 text-sm text-gold">
          {decoratedCams.length} clips
        </span>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {decoratedCams.map((cam) => {
          const meta = (cam as FanCam & { demoMeta: DemoCardMeta }).demoMeta
          return (
            <button
              key={cam.id}
              onClick={() => setSelectedCam(cam)}
              className="group relative overflow-hidden rounded-[22px] border border-bronze-line bg-[#0c0c0c] text-left transition-all duration-200 hover:-translate-y-1 hover:border-gold hover:shadow-[0_22px_50px_rgba(0,0,0,0.5)]"
            >
              <div className="relative aspect-[9/16] w-full overflow-hidden">
                <img
                  src={cam.thumbnail_url || meta.image}
                  alt={cam.caption}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.05),rgba(0,0,0,0.2)_40%,rgba(0,0,0,0.88))]" />
                <div className="absolute left-3 top-3 inline-flex items-center rounded-full border border-[#7c6300] bg-black/55 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-amber backdrop-blur-sm">
                  {meta.tag}
                </div>
                <div className="absolute right-3 top-3 rounded-full border border-white/15 bg-black/50 px-2 py-1 text-[11px] font-medium text-ivory backdrop-blur-sm">
                  {meta.duration}
                </div>
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <div className="mb-3 flex items-center gap-2">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/12 bg-black/45 text-lg text-ivory backdrop-blur-md transition-transform duration-200 group-hover:scale-105">
                      ▶
                    </div>
                    <div className="text-xs text-smoke">
                      Tap to preview
                    </div>
                  </div>
                  <p className="line-clamp-2 text-sm font-medium leading-5 text-ivory">
                    {cam.caption}
                  </p>
                  <div className="mt-3 flex items-center justify-between text-xs text-smoke">
                    <span>{meta.user}</span>
                    <span>{meta.views} views</span>
                  </div>
                </div>
              </div>
            </button>
          )
        })}
      </div>

      {selectedCam && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
          <div className="w-full max-w-3xl overflow-hidden rounded-[28px] border border-bronze-line-strong bg-[linear-gradient(180deg,#141414,#080808)] shadow-[0_30px_80px_rgba(0,0,0,0.65)]">
            <div className="flex items-center justify-between border-b border-bronze-line px-5 py-4">
              <div>
                <h4 className="font-semibold text-ivory">Fan Cam Preview</h4>
                <p className="mt-1 text-xs uppercase tracking-[0.18em] text-gold/80">
                  Demo thumbnail view
                </p>
              </div>
              <button
                onClick={() => setSelectedCam(null)}
                className="rounded-full border border-bronze-line px-3 py-1.5 text-sm text-smoke transition hover:border-gold hover:text-ivory"
              >
                Close
              </button>
            </div>

            <div className="grid gap-0 md:grid-cols-[1.3fr_0.9fr]">
              <div className="relative aspect-video bg-black md:aspect-auto md:min-h-[420px]">
                <img
                  src={selectedCam.thumbnail_url || '/fancams/fancam-1.png'}
                  alt={selectedCam.caption}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,222,89,0.08),transparent_30%),linear-gradient(180deg,rgba(0,0,0,0.08),rgba(0,0,0,0.5)_55%,rgba(0,0,0,0.78))]" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full border border-white/15 bg-black/45 text-3xl text-ivory backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.4)]">
                    ▶
                  </div>
                </div>
                <div className="absolute bottom-4 left-4 rounded-full border border-bronze-line-strong bg-black/55 px-3 py-1 text-xs uppercase tracking-[0.18em] text-amber backdrop-blur-sm">
                  Demo mode
                </div>
              </div>

              <div className="flex flex-col justify-between p-5">
                <div>
                  <h5 className="text-xl font-semibold text-ivory">{selectedCam.caption}</h5>
                  <p className="mt-3 text-sm leading-6 text-smoke">
                    Example fan-uploaded concert footage for the mockup app. Replace these thumbnails with your own clips later, or hook them up to real uploaded videos when you are ready.
                  </p>
                  <div className="mt-5 space-y-3 rounded-2xl border border-bronze-line bg-[linear-gradient(180deg,rgba(255,222,89,0.05),rgba(17,17,17,0.8))] p-4 text-sm">
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-smoke">Uploaded by</span>
                      <span className="font-medium text-ivory">{selectedCam.uploader_wallet}</span>
                    </div>
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-smoke">Show date</span>
                      <span className="font-medium text-ivory">
                        {new Date(selectedCam.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-smoke">Status</span>
                      <span className="rounded-full border border-bronze-line-strong bg-gold/10 px-2.5 py-1 text-xs font-medium uppercase tracking-[0.14em] text-gold">
                        Sample content
                      </span>
                    </div>
                  </div>
                </div>

                <p className="mt-5 text-xs uppercase tracking-[0.18em] text-gold/75">
                  Swap these images later with real upload thumbnails or generated fan-cam stills.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <p className="mt-4 text-center text-sm text-smoke">
        Example thumbnails make the upload area feel active, even before real users submit clips.
      </p>
    </div>
  )
}
