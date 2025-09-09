'use client'

type MansoryProps = {
  images?: {
    label: string
    aspectRatio: string
  }[]
  children?: React.ReactNode
}

// Function to get random aspect ratio

// Generate album images with automated aspect ratios

export const Mansory = ({ children }: MansoryProps) => {
  const getRandomAspectRatio = () => {
    return aspectRatios[Math.floor(Math.random() * aspectRatios.length)]
  }

  const albumImages = Array.from({ length: 24 }, (_, index) => ({
    label: `Photo ${index + 1}`,
    aspectRatio: getRandomAspectRatio(),
  }))

  return (
    <section className="columns-2 lg:columns-3 xl:columns-4 gap-1">
      {albumImages.map((image, index) => (
        <figure key={index} className="break-inside-avoid mb-1">
          <div
            className={`bg-gray-200 overflow-hidden ${image.aspectRatio} flex items-center justify-center`}
          >
            <span className="text-gray-400 text-xl">{image.label}</span>
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
