import { NextRequest, NextResponse } from "next/server";
import { connectDb } from "../../../../Lib/conntectDb";
import {Template} from '../../../../Lib/Models/templates'
import { template } from "handlebars";

export async function GET(req:NextRequest){
    try{
      await  connectDb();
        const templates = await Template.find();
        return NextResponse.json({templates} , {status : 200})

    }
    catch(err){
        console.log("error in template get route :---\n" , err);
        return NextResponse.json({error : "error incounter"} , {status : 500})
    }
}