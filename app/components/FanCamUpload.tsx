'use client'

import { useRef, useState } from 'react'

interface FanCamUploadProps {
  isLocked: boolean
}

export function FanCamUpload({ isLocked }: FanCamUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [caption, setCaption] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadSuccess, setUploadSuccess] = useState(false)

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (file.size > 50 * 1024 * 1024) {
      setError('File must be under 50MB')
      return
    }

    setError(null)
    setSelectedFile(file)
  }

  const handleDemoUpload = () => {
    if (!selectedFile) return

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
          <h3 className="text-lg font-semibold text-ivory mb-2">Upload Complete!</h3>
          <p className="text-smoke text-sm">
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
      <h3 className="text-lg font-semibold text-ivory mb-4">Upload Your Clip</h3>

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
          className="w-full py-8 border-2 border-dashed border-bronze-line-strong rounded-[20px] hover:border-gold transition-colors bg-gold/5"
        >
          <div className="text-center">
            <div className="text-3xl mb-2">📹</div>
            <p className="text-ivory">Click to select a video</p>
            <p className="text-sm text-smoke mt-1">MP4, MOV up to 50MB</p>
          </div>
        </button>
      ) : (
        <div className="space-y-4">
          <div className="p-3 rounded-2xl flex items-center gap-3 border border-bronze-line bg-gold/5">
            <span className="text-2xl">🎬</span>
            <div className="flex-1 min-w-0">
              <p className="text-ivory truncate">{selectedFile.name}</p>
              <p className="text-sm text-smoke">
                {(selectedFile.size / 1024 / 1024).toFixed(1)} MB
              </p>
            </div>
            <button
              onClick={() => setSelectedFile(null)}
              className="text-smoke hover:text-ivory"
            >
              ✕
            </button>
          </div>

          <div>
            <label className="block text-sm text-ivory mb-1">
              Caption (optional)
            </label>
            <input
              type="text"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="What moment is this?"
              className="w-full px-3 py-2 rounded-2xl border border-bronze-line focus:border-gold focus:outline-none bg-night text-ivory placeholder:text-smoke"
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
        <p className="text-sm text-red-400 mt-2 text-center">{error}</p>
      )}

      <p className="text-xs text-smoke text-center mt-4">
        Only ticket holders can upload clips
      </p>
    </div>
  )
}
