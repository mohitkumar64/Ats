import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary, type UploadApiResponse } from 'cloudinary';
import { Template } from "../../../../Lib/Models/templates";


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function POST(req: NextRequest) {
    try {


        const data = await req.formData();

        const img = data.get("img") as File | null;
        const html = data.get("html") as string | null;
        const name = data.get("name") as string | null;

        // validation
        if (!img || !html || !name) {
            console.log(img, name);
            return NextResponse.json(
                { message: "Missing required fields" },
                { status: 400 }
            );
        }

        ;

        const byteArrayBuffer = await img.arrayBuffer();
        const buffer = Buffer.from(byteArrayBuffer);
        const cloudinaryResult = await uploadResult(buffer);

        const template = await Template.create({
            name,
            html,
            img: cloudinaryResult.secure_url,
        })



        return NextResponse.json({
            success: true,
        });

    } catch (error) {
        console.error(error);

        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}


const uploadResult = async (buffer: Buffer): Promise<UploadApiResponse> => {

    return await new Promise<UploadApiResponse>((resolve, reject) => {
        cloudinary.uploader.upload_stream({ folder: 'resumes' }, (error, uploadResult) => {
            if (error) {
                return reject(error);
            }
            if (!uploadResult) {
                return reject(new Error("Upload failed: no result returned"));
            }
            return resolve(uploadResult);
        }).end(buffer);
    });
}


