'use client'

import { useState, useRef } from 'react'
import { useAppStore } from '@/app/lib/store'

interface FanCamUploadProps {
  showId: string
  isLocked: boolean
}

export function FanCamUpload({ showId, isLocked }: FanCamUploadProps) {
  const { walletAddress } = useAppStore()
  const [isUploading, setIsUploading] = useState(false)
  const [uploadSuccess, setUploadSuccess] = useState(false)
  const [caption, setCaption] = useState('')
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Check file size (max 50MB for demo)
      if (file.size > 50 * 1024 * 1024) {
        setError('File size must be less than 50MB')
        return
      }
      // Check file type
      if (!file.type.startsWith('video/')) {
        setError('Please select a video file')
        return
      }
      setSelectedFile(file)
      setError(null)
    }
  }

  const handleUpload = async () => {
    if (!selectedFile || !walletAddress) return

    setIsUploading(true)
    setError(null)

    try {
      // Get presigned URL from our API
      const response = await fetch('/api/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          showId,
          fileName: selectedFile.name,
          contentType: selectedFile.type,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to get upload URL')
      }

      const { uploadUrl, fileUrl } = await response.json()

      // Upload to S3
      await fetch(uploadUrl, {
        method: 'PUT',
        body: selectedFile,
        headers: {
          'Content-Type': selectedFile.type,
        },
      })

      // Save metadata to database
      await fetch('/api/fan-cams', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          showId,
          uploaderWallet: walletAddress,
          videoUrl: fileUrl,
          caption,
        }),
      })

      setUploadSuccess(true)
      setSelectedFile(null)
      setCaption('')
    } catch (err) {
      console.error('Upload error:', err)
      setError(err instanceof Error ? err.message : 'Upload failed')
    } finally {
      setIsUploading(false)
    }
  }

  // Demo mode - simulate upload
  const handleDemoUpload = () => {
    setIsUploading(true)
    setTimeout(() => {
      setIsUploading(false)
      setUploadSuccess(true)
      setSelectedFile(null)
      setCaption('')
    }, 1500)
  }

  if (isLocked) {
    return null
  }

  if (uploadSuccess) {
    return (
      <div className="card">
        <div className="text-center py-6">
          <div className="text-4xl mb-2">✅</div>
          <h3 className="text-lg font-medium text-charcoal mb-2">Upload Complete!</h3>
          <p className="text-charcoal-light text-sm">
            Your clip has been added to the gallery
          </p>
          <button
            onClick={() => setUploadSuccess(false)}
            className="btn-soft mt-4"
          >
            Upload Another
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="card">
      <h3 className="text-lg font-medium text-charcoal mb-4">Upload Your Clip</h3>

      <input
        ref={fileInputRef}
        type="file"
        accept="video/*"
        onChange={handleFileSelect}
        className="hidden"
      />

      {!selectedFile ? (
        <button
          onClick={() => fileInputRef.current?.click()}
          className="w-full py-8 border-2 border-dashed border-warm-gray rounded-lg hover:border-sage transition-colors"
        >
          <div className="text-center">
            <div className="text-3xl mb-2">📹</div>
            <p className="text-charcoal">Click to select a video</p>
            <p className="text-sm text-charcoal-light mt-1">MP4, MOV up to 50MB</p>
          </div>
        </button>
      ) : (
        <div className="space-y-4">
          <div className="p-3 bg-cream-dark rounded-lg flex items-center gap-3">
            <span className="text-2xl">🎬</span>
            <div className="flex-1 min-w-0">
              <p className="text-charcoal truncate">{selectedFile.name}</p>
              <p className="text-sm text-charcoal-light">
                {(selectedFile.size / 1024 / 1024).toFixed(1)} MB
              </p>
            </div>
            <button
              onClick={() => setSelectedFile(null)}
              className="text-charcoal-light hover:text-charcoal"
            >
              ✕
            </button>
          </div>

          <div>
            <label className="block text-sm text-charcoal mb-1">
              Caption (optional)
            </label>
            <input
              type="text"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="What moment is this?"
              className="w-full px-3 py-2 rounded-lg border border-warm-gray focus:border-sage focus:outline-none bg-cream"
            />
          </div>

          <button
            onClick={handleDemoUpload}
            disabled={isUploading}
            className="btn-primary w-full"
          >
            {isUploading ? 'Uploading...' : 'Upload to Gallery'}
          </button>
        </div>
      )}

      {error && (
        <p className="text-sm text-red-500 mt-2 text-center">{error}</p>
      )}

      <p className="text-xs text-charcoal-light text-center mt-4">
        Only ticket holders can upload clips
      </p>
    </div>
  )
}
