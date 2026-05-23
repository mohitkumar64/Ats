import { NextRequest, NextResponse } from "next/server";
import { connectDb } from "../../../../Lib/conntectDb";
import { UserData } from "../../../../Lib/Models/userData";
import jwt from "jsonwebtoken";

export async function GET(req: NextRequest) {
    try {
        await connectDb();
        const token = req.cookies.get("token")?.value;
        if (!token) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string };
        const userData = await UserData.findOne({ userId: decoded.id });

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
        const token = req.cookies.get("token")?.value;
        if (!token) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string };
        const body = await req.json();

        // Update UserData associated with the token's userId
        const updatedData = await UserData.findOneAndUpdate(
            { userId: decoded.id },
            { $set: body },
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
