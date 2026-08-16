import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary, type UploadApiResponse } from 'cloudinary';
import { Template } from "../../../../Lib/Models/templates";
import { connectDb } from "../../../../Lib/conntectDb";
import { forbiddenResponse, getSessionUser, unauthorizedResponse } from "../../../../Lib/apiAuth";

const MAX_IMAGE_BYTES = 5 * 1024 * 1024;
const MAX_HTML_BYTES = 512 * 1024;
const IMAGE_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);
const SUPPORTED_FIELDS = new Set(["summary", "phoneNumber", "location", "githubLink", "linkedinLink", "experience", "projects", "skills", "education", "certifications", "achievements"]);


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function POST(req: NextRequest) {
    try {
        const user = getSessionUser(req);
        if (!user) return unauthorizedResponse();
        if (user.role !== "admin") return forbiddenResponse();
        await connectDb();


        const data = await req.formData();

        const img = data.get("img") as File | null;
        const html = data.get("html") as string | null;
        const name = data.get("name") as string | null;
        const supportedFieldsJson = data.get("supportedFields") as string | null;

        let supportedFields: string[] | undefined = undefined;
        if (supportedFieldsJson) {
            try {
                const parsedFields: unknown = JSON.parse(supportedFieldsJson);
                if (!Array.isArray(parsedFields) || !parsedFields.every((field) => typeof field === "string" && SUPPORTED_FIELDS.has(field))) {
                    return NextResponse.json({ message: "Invalid supported fields" }, { status: 400 });
                }
                supportedFields = parsedFields;
            } catch (e) {
                console.error("Failed to parse supportedFields:", e);
            }
        }

        // validation
        if (!img || !html || !name || typeof name !== "string" || name.trim().length > 100 ||
            !IMAGE_TYPES.has(img.type) || img.size > MAX_IMAGE_BYTES || Buffer.byteLength(html, "utf8") > MAX_HTML_BYTES) {
            return NextResponse.json(
                { message: "Provide a name, valid image (PNG/JPEG/WebP up to 5 MB), and HTML under 512 KB." },
                { status: 400 }
            );
        }

        ;

        const byteArrayBuffer = await img.arrayBuffer();
        const buffer = Buffer.from(byteArrayBuffer);
        const cloudinaryResult = await uploadResult(buffer);

        await Template.create({
            name,
            html,
            img: cloudinaryResult.secure_url,
            ...(supportedFields && { supportedFields }),
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


