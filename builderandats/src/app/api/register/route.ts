import { NextRequest, NextResponse } from "next/server";
import {User} from "../../../../Lib/Models/user"
import { UserData } from "../../../../Lib/Models/userData";

import bycrypt from "bcrypt"
import { connectDb } from "../../../../Lib/conntectDb";


export  async function POST(req : NextRequest){
    try {
    await connectDb();
    const {email, password} = await req.json();
    if (typeof email !== "string" || typeof password !== "string" ||
        !/^\S+@\S+\.\S+$/.test(email) || password.length < 8 || password.length > 128) {
        return NextResponse.json({ error: "Use a valid email and a password of 8 to 128 characters." }, { status: 400 });
    }
    const isExist = await User.findOne({email});
    if(isExist){
        console.log("error in register" , "email already exist");
        return NextResponse.json({error : "email already exist "} , {status : 404})
    }
    const saltRounds = 10;
    const hassPassword = await bycrypt.hash(password , saltRounds);

    const user = await User.create({email , password : hassPassword })
    await UserData.create({ userId: user._id, email: user.email });
        return NextResponse.json({ status: 200 }, { status: 201 });
    } catch (error) {
        console.error("Registration failed", error);
         return NextResponse.json({error : " error occuired "} , {status : 500})
    }
}
