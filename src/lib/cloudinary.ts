

import { v2 as cloudinary } from 'cloudinary'

if (!process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || !process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY || !process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET) {
  throw new Error('Please set NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME, NEXT_PUBLIC_CLOUDINARY_API_KEY, and NEXT_PUBLIC_CLOUDINARY_API_SECRET in your environment')
}

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
  secure: true,
})

export type CloudinaryUploadResult = {
  secure_url: string
  public_id: string
}

export const uploadBufferToCloudinary = async (
  buffer: Buffer,
  filename: string,
  mimeType: string,
  folder = process.env.CLOUDINARY_FOLDER || 'valourpay'
): Promise<CloudinaryUploadResult> => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        public_id: filename.replace(/\.[^.]+$/, ''),
        resource_type: 'image',
      },
      (error, result) => {
        if (error || !result) return reject(error || new Error('Cloudinary upload failed'))
        resolve({ secure_url: result.secure_url, public_id: result.public_id })
      }
    )

    uploadStream.end(buffer)
  })
}


