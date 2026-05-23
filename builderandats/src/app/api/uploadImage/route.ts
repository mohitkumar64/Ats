import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadResult = async (buffer: Buffer) => {
    return await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream({ folder: 'profile_images' }, (error, uploadResult) => {
            if (error) {
                return reject(error);
            }
            return resolve(uploadResult);
        }).end(buffer);
    });
};

export async function POST(req: NextRequest) {
    try {
        const data = await req.formData();
        const img = data.get("img") as File | null;

        if (!img) {
            return NextResponse.json(
                { message: "Missing image file" },
                { status: 400 }
            );
        }

        const byteArrayBuffer = await img.arrayBuffer();
        const buffer = Buffer.from(byteArrayBuffer);
        const cloudinaryResult: any = await uploadResult(buffer);

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
