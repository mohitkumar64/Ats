import { NextRequest, NextResponse } from "next/server";


export function POST(req : NextRequest){
    
    const response = NextResponse.json({message : "logout"});
    response.cookies.delete("token");
    return response;
}