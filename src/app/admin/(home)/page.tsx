'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useApproveUpload } from '@/app/shared/services';
import { useGetUploads, useRejectUpload } from '@/app/shared/services';
import { Upload, CheckCircle, XCircle, Clock, FileText } from 'lucide-react';

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

export default function AdminDashboard() {
  const rejectMutation = useRejectUpload();
  const approveMutation = useApproveUpload();

  const { data: uploads = [], isLoading } = useGetUploads();

  // Calculate stats from real data
  const totalUploads = uploads.length;

  const pendingUploads = uploads.filter(
    (upload: UploadData) => upload.status === 'pending'
  ).length;

  const approvedUploads = uploads.filter(
    (upload: UploadData) => upload.status === 'approved'
  ).length;

  const rejectedUploads = uploads.filter(
    (upload: UploadData) => upload.status === 'rejected'
  ).length;

  const stats = [
    {
      title: 'Total Requests',
      value: totalUploads.toString(),
      icon: Upload,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      link: '',
    },
    {
      title: 'Pending',
      value: pendingUploads.toString(),
      icon: Clock,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
      link: '/admin',
    },
    {
      title: 'Approved',
      value: approvedUploads.toString(),
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      link: '/admin/approved',
    },
    {
      title: 'Rejected',
      value: rejectedUploads.toString(),
      icon: XCircle,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      link: '/admin/rejected',
    },
  ];

  // Filter only pending uploads for the table
  const pendingRequests = uploads.filter(
    (upload: UploadData) => upload.status === 'pending'
  );

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

  const handleApprove = (fileId: string) => {
    approveMutation.mutate(fileId);
  };

  const handleReject = (fileId: string) => {
    rejectMutation.mutate(fileId);
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
          Admin Dashboard
        </h1>

        <p className='text-lg text-gray-600 leading-relaxed'>
          Manage upload requests and file approvals
        </p>
      </motion.header>

      {/* Stats Cards */}
      <motion.section
        className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16'
        variants={containerVariants}
        initial='hidden'
        animate='visible'
        aria-label='Upload statistics'
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

      {/* Requests Table */}
      <motion.section
        className='bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden'
        variants={itemVariants}
        initial='hidden'
        animate='visible'
        aria-label='Pending upload requests'
      >
        <header className='px-6 py-5 border-b border-gray-100'>
          <h2 className='text-xl font-semibold text-gray-900'>
            Upload Requests
          </h2>

          <p className='text-sm text-gray-600 mt-1'>
            Review and manage pending file uploads
          </p>
        </header>

        <div className='overflow-x-auto'>
          <table className='w-full' role='table'>
            <thead className='bg-gray-50'>
              <tr>
                <th
                  className='px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                  scope='col'
                >
                  File
                </th>

                <th
                  className='px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                  scope='col'
                >
                  Actions
                </th>

              </tr>
            </thead>
            <tbody className='bg-white divide-y divide-gray-100'>
              {isLoading ? (
                <tr>
                  <td colSpan={2} className='px-6 py-16 text-center'>
                    <div className='flex items-center justify-center space-x-3'>
                      <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600'></div>
                      <span className='text-gray-500 font-medium'>
                        Loading uploads...
                      </span>
                    </div>
                  </td>
                </tr>
              ) : pendingRequests.length === 0 ? (
                <tr>
                  <td colSpan={2} className='px-6 py-16 text-center'>
                    <div className='space-y-4'>
                      <FileText className='mx-auto h-12 w-12 text-gray-400' />
                      <div className='space-y-2'>
                        <h3 className='text-lg font-medium text-gray-900'>
                          No pending requests
                        </h3>
                        <p className='text-gray-500 max-w-sm mx-auto'>
                          No upload requests to review at the moment.
                        </p>
                      </div>
                    </div>
                  </td>
                </tr>
              ) : (
                pendingRequests.map((request: UploadData) => (
                  <motion.tr
                    key={request._id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className='hover:bg-gray-50'
                  >
                    <td className='px-6 py-5 whitespace-nowrap'>
                      <div className='flex items-center space-x-4'>
                        <figure
                          className='w-14 h-14 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0 cursor-pointer hover:opacity-80 transition-opacity group'
                          onClick={() =>
                            request.url && window.open(request.url, '_blank')
                          }
                          role='button'
                          tabIndex={0}
                          onKeyDown={e => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault();
                              if (request.url) {
                                window.open(request.url, '_blank');
                              }
                            }
                          }}
                          aria-label={`View full size image: ${request.originalName}`}
                        >
                          {request.mimeType.startsWith('image/') &&
                          request.url ? (
                            <Image
                              src={request.url}
                              alt={`Thumbnail of ${request.originalName}`}
                              width={56}
                              height={56}
                              className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-200'
                            />
                          ) : (
                            <div className='w-full h-full flex items-center justify-center'>
                              <span
                                className='text-xl'
                                role='img'
                                aria-label='File icon'
                              >
                                {getFileIcon(request.mimeType)}
                              </span>
                            </div>
                          )}
                        </figure>
                        <div className='space-y-1'>
                          <h3 className='text-sm font-medium text-gray-900 truncate max-w-xs'>
                            {request.originalName}
                          </h3>

                          <div className='text-sm text-gray-500 space-y-1'>
                            <p>{formatFileSize(request.size)}</p>

                            <p>{formatDate(request.uploadedAt)}</p>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className='px-6 py-5 whitespace-nowrap text-sm font-medium'>
                      <div className='flex items-center space-x-3'>
                        <button
                          onClick={() => handleApprove(request._id!)}
                          disabled={approveMutation.isPending}
                          className='inline-flex items-center justify-center w-9 h-9 md:w-auto md:h-auto md:px-4 md:py-2 border border-transparent text-xs font-medium rounded-lg text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md'
                          title={`Approve ${request.originalName}`}
                          aria-label={`Approve ${request.originalName}`}
                        >
                          <CheckCircle className='w-4 h-4 md:w-3 md:h-3 md:mr-2' />
                          <span className='hidden md:inline'>Approve</span>
                        </button>

                        <button
                          onClick={() => handleReject(request._id!)}
                          disabled={rejectMutation.isPending}
                          className='inline-flex items-center justify-center w-9 h-9 md:w-auto md:h-auto md:px-4 md:py-2 border border-transparent text-xs font-medium rounded-lg text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md'
                          title={`Reject ${request.originalName}`}
                          aria-label={`Reject ${request.originalName}`}
                        >
                          <XCircle className='w-4 h-4 md:w-3 md:h-3 md:mr-2' />
                          <span className='hidden md:inline'>Reject</span>
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>
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
            Perform bulk operations and administrative tasks
          </p>
        </header>
        <div className='flex flex-wrap gap-4'>
          <button className='inline-flex items-center px-5 py-3 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 shadow-sm hover:shadow-md'>
            <CheckCircle className='w-4 h-4 mr-2' />
            Approve All Pending
          </button>
          <button className='inline-flex items-center px-5 py-3 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all duration-200 shadow-sm hover:shadow-md'>
            <FileText className='w-4 h-4 mr-2' />
            Export Report
          </button>
          <button className='inline-flex items-center px-5 py-3 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all duration-200 shadow-sm hover:shadow-md'>
            <FileText className='w-4 h-4 mr-2' />
            View All Files
          </button>
        </div>
      </motion.section>
    </main>
  );
}
