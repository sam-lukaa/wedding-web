'use client'

import { axios } from "@/lib/axios"
import { toast } from "react-toastify"
import { UploadedFile } from "@/lib/models/File"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

interface FileUploadResponse {
  message: string
  success: boolean
  files: UploadedFile[]
}


export const useUpload = () => {
   return  useMutation({
    mutationFn: async (files: File[]) => {
       const formData = new FormData()
       
      files.forEach(file => {
        formData.append('files', file)
      })
       
      const response = await axios.post<FileUploadResponse>('/upload', formData)
      
       return response
     },

    onError: (error) => {
      console.log(error)
     },
    
     onSuccess: (data) => {
       console.log('Uploaded files: ', data)
       
      toast.success('Thanks for sharing your memories with us!')
    }
  })
}

export const useGetUploads = () => { 
  return useQuery({
    queryKey: ['uploads'],

    queryFn: async () => {
      const response = await axios.get('/upload')
      
      return response.data.files || [] as UploadedFile[]
    }
  })
}

export const useRejectUpload = () => { 
const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (fileId: string) => {
      const response = await axios.patch(`/upload?id=${fileId}`, { status: 'rejected' })
      return response.data
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['uploads'] })
      toast.success('File rejected successfully!')
    },

    onError: (error) => {
      console.error('Error rejecting file:', error)
      toast.error('Failed to reject file')
    }
  })
}

export const useApproveUpload = () => { 
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (fileId: string) => {
      const response = await axios.patch(`/upload?id=${fileId}`, { status: 'approved' })
      return response.data
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['uploads'] })
      toast.success('File approved successfully!')
    },
    
    onError: (error) => {
      console.error('Error approving file:', error)
      toast.error('Failed to approve file')
    }
  })
}