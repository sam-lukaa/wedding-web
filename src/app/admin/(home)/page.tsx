'use client'

import { motion } from 'framer-motion'
import { Upload, CheckCircle, XCircle, Clock, FileText } from 'lucide-react'

export default function AdminDashboard() {
  // Mock data - replace with actual data from your backend
  const stats = [
    {
      title: 'Total Requests',
      value: '24',
      icon: Upload,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Pending',
      value: '8',
      icon: Clock,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
    },
    {
      title: 'Approved',
      value: '12',
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      title: 'Rejected',
      value: '4',
      icon: XCircle,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
    },
  ]

  const requests = [
    {
      id: 1,
      fileName: 'wedding_photo_1.jpg',
      fileSize: '2.4 MB',
      uploadedBy: 'Sarah Johnson',
      uploadedAt: '2024-01-15 14:30',
      status: 'pending',
      fileType: 'image/jpeg',
    },
    {
      id: 2,
      fileName: 'ceremony_video.mp4',
      fileSize: '45.2 MB',
      uploadedBy: 'Mike Chen',
      uploadedAt: '2024-01-15 13:15',
      status: 'approved',
      fileType: 'video/mp4',
    },
    {
      id: 3,
      fileName: 'reception_photos.zip',
      fileSize: '128.7 MB',
      uploadedBy: 'Emily Davis',
      uploadedAt: '2024-01-15 12:45',
      status: 'rejected',
      fileType: 'application/zip',
    },
    {
      id: 4,
      fileName: 'guest_list.xlsx',
      fileSize: '1.2 MB',
      uploadedBy: 'David Wilson',
      uploadedAt: '2024-01-15 11:20',
      status: 'pending',
      fileType:
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    },
    {
      id: 5,
      fileName: 'decorations.pdf',
      fileSize: '3.8 MB',
      uploadedBy: 'Lisa Brown',
      uploadedAt: '2024-01-15 10:30',
      status: 'approved',
      fileType: 'application/pdf',
    },
  ]

  const getFileIcon = (fileType: string) => {
    if (fileType.startsWith('image/')) return '🖼️'
    if (fileType.startsWith('video/')) return '🎥'
    if (fileType.includes('pdf')) return '📄'
    if (fileType.includes('spreadsheet') || fileType.includes('excel'))
      return '📊'
    if (fileType.includes('zip')) return '📦'
    return '📁'
  }

  const handleApprove = (id: number) => {
    console.log('Approved request:', id)
    // Add your approval logic here
  }

  const handleReject = (id: number) => {
    console.log('Rejected request:', id)
    // Add your rejection logic here
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
          Admin Dashboard
        </h1>
        <p className="text-gray-600">
          Manage upload requests and file approvals
        </p>
      </motion.header>

      {/* Stats Cards */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
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

      {/* Requests Table */}
      <motion.div
        className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
        variants={itemVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900">
            Upload Requests
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  File
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {requests
                .filter((request) => request.status === 'pending')
                .map((request) => (
                  <motion.tr
                    key={request.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="hover:bg-gray-50"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span className="text-2xl mr-3">
                          {getFileIcon(request.fileType)}
                        </span>
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {request.fileName}
                          </div>
                          <div className="text-sm text-gray-500">
                            {request.fileSize}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleApprove(request.id)}
                          className="inline-flex items-center justify-center w-8 h-8 md:w-auto md:h-auto md:px-3 md:py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
                          title="Approve"
                        >
                          <CheckCircle className="w-4 h-4 md:w-3 md:h-3 md:mr-1" />
                          <span className="hidden md:inline">Approve</span>
                        </button>
                        <button
                          onClick={() => handleReject(request.id)}
                          className="inline-flex items-center justify-center w-8 h-8 md:w-auto md:h-auto md:px-3 md:py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
                          title="Reject"
                        >
                          <XCircle className="w-4 h-4 md:w-3 md:h-3 md:mr-1" />
                          <span className="hidden md:inline">Reject</span>
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {requests.length === 0 && (
          <div className="text-center py-12">
            <FileText className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              No requests
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              No upload requests to review at the moment.
            </p>
          </div>
        )}
      </motion.div>

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
          <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">
            <CheckCircle className="w-4 h-4 mr-2" />
            Approve All Pending
          </button>
          <button className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors">
            <FileText className="w-4 h-4 mr-2" />
            Export Report
          </button>
          <button className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors">
            <FileText className="w-4 h-4 mr-2" />
            View All Files
          </button>
        </div>
      </motion.div>
    </main>
  )
}
