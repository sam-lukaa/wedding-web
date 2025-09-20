'use client';

import { motion } from 'framer-motion';
import { XCircle, FileText, CheckCircle, DownloadIcon } from 'lucide-react';
import { useGetUploads, useApproveUpload } from '@/app/shared/services';
import Image from 'next/image';
import Link from 'next/link';

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

export default function AdminRejected() {
  const approveMutation = useApproveUpload();
  const { data: uploads = [], isLoading } = useGetUploads();

  // Filter only rejected uploads
  const rejectedFiles = uploads.filter(
    (upload: UploadData) => upload.status === 'rejected'
  );

  // Generate deterministic aspect ratios for consistent layout
  const getAspectRatioForIndex = (index: number) => {
    const ratios = [
      'aspect-square',
      'aspect-[4/3]',
      'aspect-[3/2]',
      'aspect-[16/9]',
      'aspect-[5/4]',
      'aspect-[3/4]',
      'aspect-[4/5]',
      'aspect-[16/10]',
      'aspect-[2/3]',
      'aspect-[9/16]',
    ];
    return ratios[index % ratios.length];
  };

  const getFileIcon = (fileType: string) => {
    if (fileType.startsWith('image/')) return '🖼️';
    if (fileType.startsWith('video/')) return '🎥';
    if (fileType.includes('pdf')) return '📄';
    if (fileType.includes('spreadsheet') || fileType.includes('excel'))
      return '📊';
    if (fileType.includes('zip')) return '📦';
    return '📁';
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

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

  // Calculate total size of rejected files
  const totalSize = rejectedFiles.reduce(
    (sum: number, file: UploadData) => sum + file.size,
    0
  );
  const formatTotalSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const stats = [
    {
      title: 'Total Rejected',
      value: rejectedFiles.length.toString(),
      icon: XCircle,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      link: '/admin/rejected',
    },
    {
      title: 'Total Size',
      value: formatTotalSize(totalSize),
      icon: FileText,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      link: '/admin/rejected',
    },
  ];

  const handleApprove = (fileId: string) => {
    if (confirm('Are you sure you want to approve this file?')) {
      approveMutation.mutate(fileId);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <main className='max-w-7xl mx-auto pb-20 px-4'>
      {/* Header */}
      <motion.header
        className='mb-16'
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className='text-3xl md:text-4xl font-bold text-gray-900 mb-3'>
          Rejected Files
        </h1>
        <p className='text-lg text-gray-600 leading-relaxed'>
          Gallery of rejected uploads - review and approve if needed
        </p>
      </motion.header>

      {/* Stats Cards */}
      <motion.section
        className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-16'
        variants={containerVariants}
        initial='hidden'
        animate='visible'
        aria-label='Rejected files statistics'
      >
        {stats.map(stat => (
          <Link
            key={stat.title}
            href={stat.link}
            className='bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200'
          >
            <div className='flex items-center justify-between'>
              <div className='space-y-1'>
                <h3 className='text-sm font-medium text-gray-600'>
                  {stat.title}
                </h3>
                <p className='text-2xl font-bold text-gray-900'>{stat.value}</p>
              </div>
              <div
                className={`p-3 rounded-lg ${stat.bgColor}`}
                aria-hidden='true'
              >
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
            </div>
          </Link>
        ))}
      </motion.section>

      {/* Masonry Gallery */}
      <motion.section
        className='columns-2 md:columns-3 lg:columns-4 gap-2 lg:gap-4 p-4'
        variants={containerVariants}
        initial='hidden'
        animate='visible'
        aria-label='Rejected files gallery'
      >
        {isLoading ? (
          <div className='col-span-full text-center py-16'>
            <div className='flex items-center justify-center space-x-3'>
              <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600'></div>
              <span className='text-gray-500 font-medium'>
                Loading rejected files...
              </span>
            </div>
          </div>
        ) : rejectedFiles.length === 0 ? (
          <div className='col-span-full text-center py-16'>
            <div className='space-y-4'>
              <XCircle className='mx-auto h-12 w-12 text-gray-400' />
              <div className='space-y-2'>
                <h3 className='text-lg font-medium text-gray-900'>
                  No rejected files
                </h3>
                <p className='text-gray-500 max-w-sm mx-auto'>
                  No files have been rejected yet.
                </p>
              </div>
            </div>
          </div>
        ) : (
          rejectedFiles.map((file: UploadData, index: number) => (
            <motion.article
              key={file._id}
              variants={itemVariants}
              className='break-inside-avoid mb-4 group'
            >
              <div className='bg-white overflow-hidden hover:shadow-md transition-all duration-300 rounded-lg shadow-sm'>
                {/* Image Container */}
                <figure
                  className={`relative bg-gray-200 flex items-center justify-center ${getAspectRatioForIndex(index)} cursor-pointer hover:opacity-90 transition-opacity`}
                  onClick={() => file.url && window.open(file.url, '_blank')}
                  role='button'
                  tabIndex={0}
                  onKeyDown={e => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      if (file.url) {
                        window.open(file.url, '_blank');
                      }
                    }
                  }}
                  aria-label={`View full size image: ${file.originalName}`}
                >
                  {file.mimeType.startsWith('image/') && file.url ? (
                    <>
                      <Image
                        width={100}
                        height={100}
                        src={file.url}
                        alt={`${file.originalName} - Click to view full size`}
                        className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-300'
                      />
                      {/* Download button overlay */}
                      <button
                        onClick={e => {
                          e.stopPropagation();
                          downloadImage(file.url!, file.originalName);
                        }}
                        className='absolute top-3 right-3 bg-black/70 text-white p-2.5 rounded-full transition-all duration-200 hover:bg-black/80 hover:scale-110 shadow-lg'
                        title={`Download ${file.originalName}`}
                        aria-label={`Download ${file.originalName}`}
                      >
                        <DownloadIcon className='w-4 h-4' />
                      </button>
                    </>
                  ) : (
                    <div className='flex flex-col items-center justify-center space-y-2 p-4'>
                      <span
                        className='text-4xl'
                        role='img'
                        aria-label='File icon'
                      >
                        {getFileIcon(file.mimeType)}
                      </span>
                      <p className='text-sm text-gray-500 text-center'>
                        {file.originalName}
                      </p>
                    </div>
                  )}

                  {/* Approve Button - Bottom Right */}
                  <button
                    onClick={e => {
                      e.stopPropagation();
                      handleApprove(file._id);
                    }}
                    className='absolute bottom-3 right-3 w-8 h-8 bg-green-500/80 hover:bg-green-600 text-white rounded-full flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-110'
                    title={`Approve ${file.originalName}`}
                    aria-label={`Approve ${file.originalName}`}
                  >
                    <CheckCircle size='14' />
                  </button>
                </figure>

                {/* File Info */}
                <div className='p-4 space-y-2'>
                  <div className='flex items-center justify-between'>
                    <h3 className='text-sm font-medium text-gray-900 truncate max-w-xs'>
                      {file.originalName}
                    </h3>
                    <span className='text-xs text-gray-500'>
                      {formatFileSize(file.size)}
                    </span>
                  </div>
                  <div className='text-xs text-gray-500 space-y-1'>
                    <p>Uploaded: {formatDate(file.uploadedAt)}</p>
                    {file.rejectedAt && (
                      <p>Rejected: {formatDate(file.rejectedAt)}</p>
                    )}
                    {file.rejectionReason && (
                      <p className='text-red-600 font-medium'>
                        Reason: {file.rejectionReason}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </motion.article>
          ))
        )}
      </motion.section>

      {/* Quick Actions */}
      <motion.section
        className='mt-12 bg-white rounded-xl p-8 shadow-sm border border-gray-100'
        variants={itemVariants}
        initial='hidden'
        animate='visible'
        aria-label='Quick actions'
      >
        <header className='mb-6'>
          <h3 className='text-xl font-semibold text-gray-900 mb-2'>
            Quick Actions
          </h3>
          <p className='text-gray-600'>
            Manage rejected files and perform bulk operations
          </p>
        </header>
        <div className='flex flex-wrap gap-4'>
          <Link
            href='/admin'
            className='inline-flex items-center px-5 py-3 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all duration-200 shadow-sm hover:shadow-md'
          >
            <FileText className='w-4 h-4 mr-2' />
            View Pending Files
          </Link>
          <Link
            href='/admin/approved'
            className='inline-flex items-center px-5 py-3 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all duration-200 shadow-sm hover:shadow-md'
          >
            <CheckCircle className='w-4 h-4 mr-2' />
            View Approved Files
          </Link>
        </div>
      </motion.section>
    </main>
  );
}
