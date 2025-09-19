export interface UploadedFile {
  _id?: string;
  name: string;
  originalName: string;
  size: number;
  mimeType: string;
  // Cloudinary fields
  url?: string; // Cloudinary secure URL
  publicId?: string; // Cloudinary public_id
  uploadedBy?: string;
  status: 'pending' | 'approved' | 'rejected';
  uploadedAt: Date;
  approvedAt?: Date;
  rejectedAt?: Date;
  rejectionReason?: string;
}

export interface FileUploadResponse {
  success: boolean;
  message: string;
  files?: UploadedFile[];
  error?: string;
}
