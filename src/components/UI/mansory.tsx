'use client'

import { UploadedFile } from "@/lib/models/File"
import { DownloadIcon } from "lucide-react"
import Image from "next/image"

type MansoryProps = {
  data?: UploadedFile[]
  
  children?: React.ReactNode
  images?: {
    label: string
    aspectRatio: string
  }[]
}

// Function to get random aspect ratio

// Generate album images with automated aspect ratios

export const Mansory = ({ data, children }: MansoryProps) => {
  const getAspectRatioForIndex = (index: number) => {
    return aspectRatios[index % aspectRatios.length]
  }

  // Resolve image src: prefer Cloudinary URL
  const getImageSrc = (file: UploadedFile | null) => {
    if (file && file.url) return file.url

    return null
  }

  // Download image function
  const downloadImage = async (url: string, filename: string) => {
    try {
      const response = await fetch(url)
      const blob = await response.blob()
      const downloadUrl = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = downloadUrl
      link.download = filename
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(downloadUrl)
    } catch (error) {
      console.error('Download failed:', error)
    }
  }

  // Avoid console logs that can differ between server and client

  // Only render if there are actual uploaded files
  if (!data || data.length === 0) {
    return null
  }

  const albumImages = data.map((file, index) => ({
    id: file._id || `file-${index}`,
    label: file.originalName,
    aspectRatio: getAspectRatioForIndex(index),
    file: file,
    src: getImageSrc(file)
  }))

  return (
    <section className="columns-2 lg:columns-3 xl:columns-4 gap-1">
      {albumImages.map((image) => (
        <figure key={image.id} className="break-inside-avoid mb-1 group relative">
          <div
            className={`bg-gray-200 overflow-hidden ${image.aspectRatio} flex items-center justify-center relative`}
          >
            {image.file && image.src ? (
              <>
                <Image
                  width={100}
                  height={100}
                  src={image.src}
                  alt={image.label}
                  className="w-full h-full object-cover"
                />
                {/* Download button overlay */}
                <button
                  onClick={() => downloadImage(image.src!, image.file!.originalName)}
                  className="absolute top-2 right-2 bg-black/70 text-white p-2 rounded-full transition-opacity duration-200"
                  title={`Download ${image.file!.originalName}`}
                >
                 <DownloadIcon />
                </button>
              </>
            ) : (
              <span className="text-gray-400 text-xl">{image.label}</span>
            )}
          </div>

          {children}
        </figure>
      ))}
    </section>
  )
}

// Predefined aspect ratios for variety
const aspectRatios = [
  'aspect-square',
  'aspect-[4/5]',
  'aspect-[3/4]',
  'aspect-[5/4]',
  'aspect-[4/3]',
  'aspect-[3/5]',
  'aspect-[5/3]',
  'aspect-[2/3]',
  'aspect-[3/2]',
]
