import { NextRequest, NextResponse } from "next/server";
import { connectDb } from "../../../../Lib/conntectDb";
import { Template } from '../../../../Lib/Models/templates'


export async function GET(req: NextRequest) {
    try {
        await connectDb();
        const templates = await Template.find();
        console.log("templates", templates)
        return NextResponse.json({ success: true, templates }, { status: 200 })

    }
    catch (err) {
        console.log("error in template get route :---\n", err);
        return NextResponse.json({ error: "error incounter" }, { status: 500 })
    }
}