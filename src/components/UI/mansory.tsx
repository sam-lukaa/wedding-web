'use client';

import { UploadedFile } from '@/lib/models/File';
import { DownloadIcon } from 'lucide-react';
import Image from 'next/image';

type MansoryProps = {
  data?: UploadedFile[];

  children?: React.ReactNode;
  images?: {
    label: string;
    aspectRatio: string;
  }[];
};

// Function to get random aspect ratio

// Generate album images with automated aspect ratios

export const Mansory = ({ data, children }: MansoryProps) => {
  const getAspectRatioForIndex = (index: number) => {
    return aspectRatios[index % aspectRatios.length];
  };

  // Resolve image src: prefer Cloudinary URL
  const getImageSrc = (file: UploadedFile | null) => {
    if (file && file.url) return file.url;

    return null;
  };

  // Download image function
  const downloadImage = async (url: string, filename: string) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  // Avoid console logs that can differ between server and client

  // Only render if there are actual uploaded files
  if (!data || data.length === 0) {
    return null;
  }

  const albumImages = data.map((file, index) => ({
    id: file._id || `file-${index}`,
    label: file.originalName,
    aspectRatio: getAspectRatioForIndex(index),
    file: file,
    src: getImageSrc(file),
  }));

  return (
    <section
      className='columns-2 lg:columns-3 xl:columns-4 gap-2 p-4'
      aria-label='Photo gallery'
    >
      {albumImages.map(image => (
        <article
          key={image.id}
          className='break-inside-avoid mb-2 group relative'
        >
          <figure
            className={`bg-gray-200 overflow-hidden ${image.aspectRatio} flex items-center justify-center relative cursor-pointer hover:opacity-90 transition-all duration-300 rounded-lg shadow-sm hover:shadow-md`}
            onClick={() => image.src && window.open(image.src, '_blank')}
            role='button'
            tabIndex={0}
            onKeyDown={e => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                image.src && window.open(image.src, '_blank');
              }
            }}
            aria-label={`View full size image: ${image.label}`}
          >
            {image.file && image.src ? (
              <>
                <Image
                  width={100}
                  height={100}
                  src={image.src}
                  alt={`${image.label} - Click to view full size`}
                  className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-300'
                />
                {/* Download button overlay */}
                <button
                  onClick={e => {
                    e.stopPropagation();
                    downloadImage(image.src!, image.file!.originalName);
                  }}
                  className='absolute top-3 right-3 bg-black/70 text-white p-2.5 rounded-full transition-all duration-200 hover:bg-black/80 hover:scale-110 shadow-lg'
                  title={`Download ${image.file!.originalName}`}
                  aria-label={`Download ${image.file!.originalName}`}
                >
                  <DownloadIcon className='w-4 h-4' />
                </button>
              </>
            ) : (
              <div className='flex flex-col items-center justify-center space-y-2 p-4'>
                <span
                  className='text-gray-400 text-2xl'
                  role='img'
                  aria-label='Placeholder'
                >
                  {image.label}
                </span>
                <p className='text-xs text-gray-500 text-center'>
                  No image available
                </p>
              </div>
            )}
          </figure>

          {children && <div className='mt-2'>{children}</div>}
        </article>
      ))}
    </section>
  );
};

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
];
