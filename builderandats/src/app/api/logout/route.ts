import { NextResponse } from "next/server";


export function POST(){
    
    const response = NextResponse.json({message : "logout"});
    response.cookies.set("token", "", { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", path: "/", maxAge: 0 });
    return response;
}
