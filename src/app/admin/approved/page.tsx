'use client'

import { motion } from 'framer-motion'
import { Trash2, CheckCircle, FileText } from 'lucide-react'

export default function AdminApproved() {
  // Mock data - replace with actual data from your backend
  const approvedFiles = [
    {
      id: 1,
      fileName: 'wedding_ceremony_1.jpg',
      fileSize: '2.4 MB',
      uploadedAt: '2024-01-15 14:30',
      approvedAt: '2024-01-15 15:00',
      fileType: 'image/jpeg',
    },
    {
      id: 2,
      fileName: 'reception_photos_1.jpg',
      fileSize: '3.1 MB',
      uploadedAt: '2024-01-15 13:15',
      approvedAt: '2024-01-15 14:45',
      fileType: 'image/jpeg',
    },
    {
      id: 3,
      fileName: 'couple_portrait.jpg',
      fileSize: '1.8 MB',
      uploadedAt: '2024-01-15 12:45',
      approvedAt: '2024-01-15 13:30',
      fileType: 'image/jpeg',
    },
    {
      id: 4,
      fileName: 'decorations_setup.jpg',
      fileSize: '2.7 MB',
      uploadedAt: '2024-01-15 11:20',
      approvedAt: '2024-01-15 12:00',
      fileType: 'image/jpeg',
    },
    {
      id: 5,
      fileName: 'guest_photos_1.jpg',
      fileSize: '4.2 MB',
      uploadedAt: '2024-01-15 10:30',
      approvedAt: '2024-01-15 11:15',
      fileType: 'image/jpeg',
    },
    {
      id: 6,
      fileName: 'venue_overview.jpg',
      fileSize: '3.5 MB',
      uploadedAt: '2024-01-15 09:45',
      approvedAt: '2024-01-15 10:30',
      fileType: 'image/jpeg',
    },
    {
      id: 7,
      fileName: 'cake_reveal.jpg',
      fileSize: '2.1 MB',
      uploadedAt: '2024-01-15 08:30',
      approvedAt: '2024-01-15 09:15',
      fileType: 'image/jpeg',
    },
    {
      id: 8,
      fileName: 'first_dance.jpg',
      fileSize: '3.8 MB',
      uploadedAt: '2024-01-15 07:15',
      approvedAt: '2024-01-15 08:00',
      fileType: 'image/jpeg',
    },
  ]

  // Generate random aspect ratios for dynamic masonry layout
  const getRandomAspectRatio = () => {
    const ratios = [
      '1/1',
      '4/3',
      '3/2',
      '16/9',
      '5/4',
      '3/4',
      '4/5',
      '16/10',
      '2/3',
      '9/16',
    ]
    return ratios[Math.floor(Math.random() * ratios.length)]
  }

  const stats = [
    {
      title: 'Total Approved',
      value: approvedFiles.length.toString(),
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      title: 'Total Size',
      value: '24.2 MB',
      icon: FileText,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
  ]

  const handleDelete = (id: number) => {
    console.log('Deleted approved file:', id)
    // Add your deletion logic here
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <main className="max-w-7xl mx-auto pb-20 px-4">
      {/* Header */}
      <motion.header
        className="mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
          Approved Files
        </h1>
        <p className="text-gray-600">Gallery of approved uploads</p>
      </motion.header>

      {/* Stats Cards */}
      <motion.div
        className="grid grid-cols-2 gap-6 mb-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {stats.map((stat) => (
          <motion.div
            key={stat.title}
            variants={itemVariants}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  {stat.title}
                </p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Masonry Gallery */}
      <motion.div
        className="columns-2 md:columns-3 lg:columns-4 gap-1 lg:gap-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {approvedFiles.map((file) => (
          <motion.div
            key={file.id}
            variants={itemVariants}
            className="break-inside-avoid mb-2 group"
          >
            <div className="bg-white overflow-hidden hover:shadow-md transition-shadow">
              {/* Image Container */}
              <div
                className="relative bg-gray-200 flex items-center justify-center"
                style={{ aspectRatio: getRandomAspectRatio() }}
              >
                <div className="text-center p-4">
                  <div className="text-4xl mb-2">🖼️</div>
                  <p className="text-sm text-gray-500">{file.fileName}</p>
                </div>

                {/* Delete Button - Bottom Right */}
                <button
                  onClick={() => {
                    if (
                      confirm(
                        `Are you sure you want to delete "${file.fileName}"?`,
                      )
                    ) {
                      handleDelete(file.id)
                    }
                  }}
                  className="absolute bottom-2 right-2 w-8 h-8 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center shadow-lg transition-colors duration-200"
                  title="Delete file"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {/* File Info */}
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium text-gray-900 truncate">
                    {file.fileName}
                  </h3>
                  <span className="text-xs text-gray-500">{file.fileSize}</span>
                </div>

                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>Uploaded {file.uploadedAt}</span>
                  <span>Approved {file.approvedAt}</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Empty State */}
      {approvedFiles.length === 0 && (
        <motion.div
          className="text-center py-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <CheckCircle className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">
            No approved files
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            No files have been approved yet.
          </p>
        </motion.div>
      )}

      {/* Quick Actions */}
      <motion.div
        className="mt-8 bg-white rounded-xl p-6 shadow-sm border border-gray-100"
        variants={itemVariants}
        initial="hidden"
        animate="visible"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Quick Actions
        </h3>
        <div className="flex flex-wrap gap-3">
          <button className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors">
            <FileText className="w-4 h-4 mr-2" />
            Export Gallery
          </button>
          <button className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors">
            <CheckCircle className="w-4 h-4 mr-2" />
            View All Files
          </button>
        </div>
      </motion.div>
    </main>
  )
}
