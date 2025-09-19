'use client'

import { axios } from "@/lib/axios"
import { toast } from "react-toastify"
import { UploadedFile } from "@/lib/models/File"
import { useMutation, useQuery } from "@tanstack/react-query"

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