import { ObjectId } from 'mongodb';
import { getDb } from '@/lib/mongodb';
import { NextRequest, NextResponse } from 'next/server';
import { UploadedFile, FileUploadResponse } from '@/lib/models/File';
import { uploadBufferToCloudinary } from '@/lib/cloudinary';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const files = formData.getAll('files') as File[];

    if (!files || files.length === 0) {
      return NextResponse.json<FileUploadResponse>(
        {
          success: false,
          message: 'No files provided',
          error: 'No files in request',
        },
        { status: 400 }
      );
    }

    const db = await getDb();
    const uploadedFiles: UploadedFile[] = [];

    // Define DB typing for the files collection (no _id on insert)
    type DbFile = Omit<UploadedFile, '_id'>;
    const filesCollection = db.collection<DbFile>('files');

    for (const file of files) {
      if (!file || file.size === 0) continue;

      // Generate unique filename
      const timestamp = Date.now();
      const randomString = Math.random().toString(36).substring(2, 15);
      const fileExtension = file.name.split('.').pop() || '';
      const fileName = `${timestamp}_${randomString}.${fileExtension}`;

      // Convert file to buffer
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Upload to Cloudinary
      const cloudinaryResult = await uploadBufferToCloudinary(
        buffer,
        fileName,
        file.type
      );

      // Create file record with Cloudinary URL/publicId
      const fileRecord: UploadedFile = {
        name: fileName,
        originalName: file.name,
        size: file.size,
        mimeType: file.type,
        url: cloudinaryResult.secure_url,
        publicId: cloudinaryResult.public_id,
        uploadedBy: 'user-id', // TODO: Get from auth
        status: 'pending',
        uploadedAt: new Date(),
      };

      // Save to MongoDB (no binary data) with proper typing
      const insertDoc: DbFile = {
        name: fileRecord.name,
        originalName: fileRecord.originalName,
        size: fileRecord.size,
        mimeType: fileRecord.mimeType,
        url: fileRecord.url,
        publicId: fileRecord.publicId,
        uploadedBy: fileRecord.uploadedBy,
        status: fileRecord.status,
        uploadedAt: fileRecord.uploadedAt,
        approvedAt: fileRecord.approvedAt,
        rejectedAt: fileRecord.rejectedAt,
        rejectionReason: fileRecord.rejectionReason,
      };
      const result = await filesCollection.insertOne(insertDoc);
      fileRecord._id = result.insertedId.toString();
      uploadedFiles.push(fileRecord as UploadedFile);
    }

    return NextResponse.json<FileUploadResponse>({
      success: true,
      message: `Successfully uploaded ${uploadedFiles.length} file(s)`,
      files: uploadedFiles,
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json<FileUploadResponse>(
      {
        success: false,
        message: 'Upload failed',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const status = searchParams.get('status');
    const limit = parseInt(searchParams.get('limit') || '50');
    const skip = parseInt(searchParams.get('skip') || '0');

    const db = await getDb();

    // If ID is provided, return the specific file metadata
    if (id) {
      if (!ObjectId.isValid(id)) {
        return new NextResponse('Invalid file ID', { status: 400 });
      }

      const file = await db
        .collection('files')
        .findOne({ _id: new ObjectId(id) });

      if (!file) {
        return new NextResponse('File not found', { status: 404 });
      }

      // Return JSON with Cloudinary URL
      return NextResponse.json({
        success: true,
        file: { ...file, _id: file._id.toString() },
      });
    }

    // Otherwise, return list of files
    const filter: { status?: string } = {};
    if (status) {
      filter.status = status;
    }

    const files = await db
      .collection('files')
      .find(filter)
      .sort({ uploadedAt: -1 })
      .skip(skip)
      .limit(limit)
      .toArray();

    const filesWithoutData = files.map(file => ({
      ...file,
      _id: file._id.toString(),
    }));

    const total = await db.collection('files').countDocuments(filter);

    return NextResponse.json({
      success: true,
      files: filesWithoutData,
      pagination: {
        total,
        limit,
        skip,
        hasMore: skip + limit < total,
      },
    });
  } catch (error) {
    console.error('Get files error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch files',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          message: 'File ID is required',
          error: 'Missing file ID',
        },
        { status: 400 }
      );
    }

    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid file ID',
          error: 'Invalid ObjectId format',
        },
        { status: 400 }
      );
    }

    const body = await request.json();
    const { status } = body;

    if (!status || !['pending', 'approved', 'rejected'].includes(status)) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid status',
          error: 'Status must be pending, approved, or rejected',
        },
        { status: 400 }
      );
    }

    const db = await getDb();
    const updateData: { status: string; approvedAt?: Date; rejectedAt?: Date } =
      { status };

    if (status === 'approved') {
      updateData.approvedAt = new Date();
    } else if (status === 'rejected') {
      updateData.rejectedAt = new Date();
    }

    const result = await db
      .collection('files')
      .updateOne({ _id: new ObjectId(id) }, { $set: updateData });

    if (result.matchedCount === 0) {
      return NextResponse.json(
        {
          success: false,
          message: 'File not found',
          error: 'No file found with the provided ID',
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `File ${status} successfully`,
      updated: result.modifiedCount > 0,
    });
  } catch (error) {
    console.error('Update file error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to update file',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
