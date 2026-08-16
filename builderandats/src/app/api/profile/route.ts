import { NextRequest, NextResponse } from "next/server";
import { connectDb } from "../../../../Lib/conntectDb";
import { UserData } from "../../../../Lib/Models/userData";
import { getSessionUser, unauthorizedResponse } from "../../../../Lib/apiAuth";

const PROFILE_FIELDS = new Set([
    "name", "phone", "bio", "professionalTitle", "location", "profileImage",
    "portfolioWebsite", "githubUrl", "linkedinUrl", "twitterUrl", "education",
    "skills", "experience", "certifications", "achievements", "research",
]);

export async function GET(req: NextRequest) {
    try {
        await connectDb();
        const user = getSessionUser(req);
        if (!user) return unauthorizedResponse();
        const userData = await UserData.findOne({ userId: user.id });

        if (!userData) {
            return NextResponse.json({ error: "User profile not found" }, { status: 404 });
        }

        return NextResponse.json(userData, { status: 200 });
    } catch (error) {
        console.error("Error fetching profile:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

export async function PUT(req: NextRequest) {
    try {
        await connectDb();
        const user = getSessionUser(req);
        if (!user) return unauthorizedResponse();
        const body: unknown = await req.json();
        if (!body || typeof body !== "object" || Array.isArray(body)) {
            return NextResponse.json({ error: "Invalid profile data" }, { status: 400 });
        }
        const update = Object.fromEntries(
            Object.entries(body).filter(([field]) => PROFILE_FIELDS.has(field))
        );
        if (Object.keys(update).length === 0) {
            return NextResponse.json({ error: "No editable fields provided" }, { status: 400 });
        }

        // Update UserData associated with the token's userId
        const updatedData = await UserData.findOneAndUpdate(
            { userId: user.id },
            { $set: update },
            { new: true, runValidators: true }
        );

        if (!updatedData) {
            return NextResponse.json({ error: "User profile not found" }, { status: 404 });
        }

        return NextResponse.json(updatedData, { status: 200 });
    } catch (error) {
        console.error("Error updating profile:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
