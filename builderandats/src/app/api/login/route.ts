import { NextRequest, NextResponse } from "next/server";
import { User } from "../../../../Lib/Models/user"
import { UserData } from "../../../../Lib/Models/userData";
import bcrypt from "bcrypt";

import jwt from "jsonwebtoken"
import { connectDb } from "../../../../Lib/conntectDb";


export async function POST(req: NextRequest) {
    try {
        await connectDb();
        const { email, password } = await req.json();
        if (typeof email !== "string" || typeof password !== "string") {
            return NextResponse.json({ error: "Invalid credentials" }, { status: 400 });
        }
        const user = await User.findOne({ email });
        if (!user || !user.password) {
            return NextResponse.json({ error: " cerendtials are wrong  " }, { status: 404 });
        }

        const res = await bcrypt.compare(password, user.password);
        if (!res) {
            return NextResponse.json({ error: " cerendtials are wrong  " }, { status: 404 });
        }

        if (!process.env.JWT_SECRET) {
            return NextResponse.json({ error: " server error  " }, { status: 500 });
        }

        const userData = await UserData.findOne({ userId: user._id });

        if (!userData) {
            return NextResponse.json({ error: "User profile not found" }, { status: 404 });
        }

        const token = jwt.sign({
            email: user.email, id: user._id.toString(), role: userData.role
        }, process.env.JWT_SECRET, { expiresIn: "7d" });

        const response = NextResponse.json(userData, { status: 200 });
        response.cookies.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
            maxAge: 60 * 60 * 24 * 7,
        });

        return response;

    } catch (error) {
        console.error("Login failed", error);
        return NextResponse.json({ error: " error occuired " }, { status: 500 })
    }
}
