import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary, type UploadApiResponse } from 'cloudinary';
import { getSessionUser, unauthorizedResponse } from "../../../../Lib/apiAuth";

const MAX_IMAGE_BYTES = 2 * 1024 * 1024;
const IMAGE_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadResult = async (buffer: Buffer): Promise<UploadApiResponse> => {
    return await new Promise<UploadApiResponse>((resolve, reject) => {
        cloudinary.uploader.upload_stream({ folder: 'profile_images' }, (error, uploadResult) => {
            if (error) {
                return reject(error);
            }
            if (!uploadResult) return reject(new Error("Upload failed"));
            return resolve(uploadResult);
        }).end(buffer);
    });
};

export async function POST(req: NextRequest) {
    try {
        if (!getSessionUser(req)) return unauthorizedResponse();
        const data = await req.formData();
        const img = data.get("img") as File | null;

        if (!img || !IMAGE_TYPES.has(img.type) || img.size > MAX_IMAGE_BYTES) {
            return NextResponse.json(
                { message: "Upload a PNG, JPEG, or WebP image smaller than 2 MB" },
                { status: 400 }
            );
        }

        const byteArrayBuffer = await img.arrayBuffer();
        const buffer = Buffer.from(byteArrayBuffer);
        const cloudinaryResult = await uploadResult(buffer);

        return NextResponse.json({
            success: true,
            url: cloudinaryResult.secure_url,
        });

    } catch (error) {
        console.error("Upload error:", error);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}
