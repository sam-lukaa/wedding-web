'use client';

import { Mansory } from '@/components/UI/mansory';
import { useGetUploads } from '../shared/services';

interface UploadData {
  _id: string;
  name: string;
  size: number;
  url?: string;
  mimeType: string;
  publicId?: string;
  uploadedBy?: string;
  originalName: string;
  status: 'pending' | 'approved' | 'rejected';
  uploadedAt: Date;
  approvedAt?: Date;
  rejectedAt?: Date;
  rejectionReason?: string;
}

export default function AlbumPage() {
  const { data: allUploads = [], isLoading } = useGetUploads();

  // Filter only approved files for the album
  const approvedFiles = allUploads.filter(
    (upload: UploadData) => upload.status === 'approved'
  );

  return (
    <main className='page-container'>
      <header className='page-header'>
        <h1 className='page-title'>PHOTOS ALBUM</h1>
        <p className='page-description'>
          Our precious moments captured in time
        </p>
      </header>

      {isLoading ? (
        <div className='flex items-center justify-center py-16'>
          <div className='flex items-center space-x-3'>
            <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600'></div>
            <span className='text-gray-500 font-medium'>Loading photos...</span>
          </div>
        </div>
      ) : approvedFiles.length === 0 ? (
        <div className='text-center py-16'>
          <div className='space-y-4'>
            <div className='text-6xl'>📸</div>
            <div className='space-y-2'>
              <h3 className='text-lg font-medium text-gray-900'>
                No photos yet
              </h3>
              <p className='text-gray-500 max-w-sm mx-auto'>
                Approved photos will appear here once they&apos;re uploaded and
                approved.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <Mansory data={approvedFiles} />
      )}
    </main>
  );
}
