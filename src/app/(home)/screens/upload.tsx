'use client'

import { useState } from 'react'
import { DotLottieReact } from '@lottiefiles/dotlottie-react'

export const UploadScreen = () => {
  const [selectedFile, setSelectedFile] = useState('')

  return (
    <section className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8 place-items-center mt-20 mb-20">
      <DotLottieReact
        src="https://lottie.host/8b97be64-0170-40a7-8c7a-648e5d972a10/anobfoNSeA.lottie"
        loop
        autoplay
        // style={{ width: 140, height: 140 }}
        className="mb-4 md:mb-0"
      />

      <form
        className="flex-1 flex flex-col items-center md:items-start gap-4 w-full"
        onClick={() => document.getElementById('file-upload')?.click()}
        tabIndex={0}
        role="button"
        aria-label="Upload file area"
      >
        <input
          type="file"
          id="file-upload"
          className="hidden"
          onChange={(e) => setSelectedFile(e.target.files?.[0]?.name || '')}
        />
        <div className="w-full flex flex-col items-center md:items-start">
          <div className="text-gray-700 font-semibold text-lg mb-2 tracking-wide text-center md:text-left">
            Upload Your Wishes or Photos
          </div>
          <div className="w-full flex flex-col items-center md:items-start">
            <div className="w-full flex items-center justify-center md:justify-start">
              <span className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#f8f6f2] to-[#f3ede7] border border-gray-300 rounded-full text-gray-700 cursor-pointer hover:bg-gray-100 transition font-medium text-base shadow-sm tracking-wide">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5-5m0 0l5 5m-5-5v12"
                  />
                </svg>
                <span>Click or Drag & Drop</span>
              </span>
            </div>
            <span className="text-xs text-gray-400 mt-2 text-center md:text-left">
              Supported: JPG, PNG, PDF, etc.
            </span>
            {selectedFile && (
              <span className="text-sm text-gray-600 mt-2 truncate w-full text-center md:text-left">
                {selectedFile}
              </span>
            )}
          </div>
        </div>
      </form>
    </section>
  )
}
