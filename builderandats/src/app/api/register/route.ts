import { NextRequest, NextResponse } from "next/server";
import {User} from "../../../../Lib/Models/user"
import { UserData } from "../../../../Lib/Models/userData";

import bycrypt from "bcrypt"
import { connectDb } from "../../../../Lib/conntectDb";


export  async function POST(req : NextRequest){
    try {
    connectDb();
    const {email, password} = await req.json();
    const isExist = await User.findOne({email});
    if(isExist){
        console.log("error in register" , "email already exist");
        return NextResponse.json({error : "email already exist "} , {status : 404})
    }
    const saltRounds = 10;
    const hassPassword = await bycrypt.hash(password , saltRounds);

    const user = await User.create({email , password : hassPassword })
    await UserData.create({ userId: user._id, email: user.email });
        console.log("user is registred")
        return NextResponse.json({status : 200});
    } catch (error) {
        console.log("error in register" , error);
         return NextResponse.json({error : " error occuired "} , {status : 500})
    }
}