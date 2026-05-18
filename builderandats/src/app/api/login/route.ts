import { NextRequest, NextResponse } from "next/server";
import { User } from "../../../../Lib/Models/user"
import { UserData } from "../../../../Lib/Models/userData";
import bcrypt from "bcrypt";

import jwt from "jsonwebtoken"
import { connectDb } from "../../../../Lib/conntectDb";


export async function POST(req: NextRequest) {
    try {
        connectDb();
        const { email, password } = await req.json();
        console.log("request body in login api", { email, password })
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

        const token = jwt.sign({
            email: email, id: user._id, role: user.role
        }, process.env.JWT_SECRET);

        const response = NextResponse.json(userData, { status: 200 });
        response.cookies.set("token", token);

        return response;

    } catch (error) {
        console.log("error in login", error);
        return NextResponse.json({ error: " error occuired " }, { status: 500 })
    }
}