'use client'

import { useState } from 'react'
import Image from 'next/image'
import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import { useUpload } from '../../shared/services';
import { UploadIcon, XIcon } from 'lucide-react';

interface FileWithPreview {
  file: File;
  preview: string;
  id: string;
}

export const UploadScreen = () => {
  const { mutate, isPending } = useUpload()
  const [files, setFiles] = useState<FileWithPreview[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files || []);
    
    const newFiles: FileWithPreview[] = selectedFiles.map(file => ({
      file,
      preview: URL.createObjectURL(file),
      id: Math.random().toString(36).substr(2, 9)
    }));
    
    setFiles(prev => [...prev, ...newFiles]);
  };

  const removeFile = (id: string) => {
    setFiles(prev => {
      const fileToRemove = prev.find(f => f.id === id);

      if (fileToRemove) {
        URL.revokeObjectURL(fileToRemove.preview);
      }

      return prev.filter(f => f.id !== id);
    });
  };

  const handleUpload = async () => {
    if (files.length === 0) return;
    

    mutate(files.map(file => file.file), {
      onSuccess: () => { 
        setFiles([])
      }
    });
   
  };

  return (
    <section className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8 place-items-center mt-20 mb-20">
      <DotLottieReact
        src="https://lottie.host/8b97be64-0170-40a7-8c7a-648e5d972a10/anobfoNSeA.lottie"
        loop
        autoplay
        className="mb-4 md:mb-0"
      />

      <article className="flex-1 flex flex-col items-center md:items-start gap-4 w-full">
        <button
          className="w-full flex flex-col items-center md:items-start cursor-pointer"
          onClick={() => document.getElementById('file-upload')?.click()}
          aria-label="Upload file area"
        >
          <input
            multiple
            type="file"
            id="file-upload"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
          
          <h2 className="text-gray-700 font-semibold text-lg mb-2 tracking-wide text-center md:text-left">
            Upload Your Wishes or Photos
          </h2>

          <figure className="w-full flex items-center justify-center md:justify-start">
            <span className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#f8f6f2] to-[#f3ede7] border border-gray-300 rounded-full text-gray-700 cursor-pointer hover:bg-gray-100 transition font-medium text-base shadow-sm tracking-wide">
             <UploadIcon size='14' />
              <span>Click to upload</span>
            </span>
          </figure>

          <p className="text-xs text-gray-400 mt-2 text-center md:text-left">
            Supported: JPG, JPEG, PNG, etc.
          </p>
        </button>

        {/* File Preview Grid */}
        {files.length > 0 && (
          <section className="w-full mt-4">
            <h3 className="text-sm text-gray-600 mb-3 font-medium">
              Selected Files ({files.length})
            </h3>
            
            <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 max-h-[31.25rem] overflow-y-auto">
              {files.map((fileWithPreview) => (
                <li key={fileWithPreview.id} className="relative group">
                  <figure className="max-lg:size-32 lg:aspect-square rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
                    <Image
                        fill
                        unoptimized
                        className="object-cover"
                        src={fileWithPreview.preview}
                        alt={fileWithPreview.file.name}
                      />
                  </figure>

                  <button
                    onClick={() => removeFile(fileWithPreview.id)}
                    className="absolute top-0 -right-2 w-6 h-6 bg-red-500/80 text-white rounded-full flex items-center justify-center text-xs"
                    aria-label={`Remove ${fileWithPreview.file.name}`}
                  >
                    <XIcon size='14' />
                  </button>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Upload Button */}
        {files.length > 0 && (
          <button
            disabled={isPending}
            onClick={handleUpload}
            className="w-full mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition flex items-center justify-center gap-2"
          >
            {isPending ? (
              <>
                <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Uploading...
              </>
            ) : (
              <>
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                Upload {files.length} file{files.length > 1 ? 's' : ''}
              </>
            )}
          </button>
        )}
      </article>
    </section>
  )
}
