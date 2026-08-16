import { NextRequest, NextResponse } from "next/server";
import { connectDb } from "../../../../Lib/conntectDb";
import { Template } from '../../../../Lib/Models/templates'
import { getSessionUser, unauthorizedResponse } from "../../../../Lib/apiAuth";


export async function GET(req: NextRequest) {
    try {
        if (!getSessionUser(req)) return unauthorizedResponse();
        await connectDb();
        const templates = await Template.find();
        // console.log("templates", templates)
        return NextResponse.json({ success: true, templates }, { status: 200 })

    }
    catch (err) {
        console.log("error in template get route :---\n", err);
        return NextResponse.json({ error: "error incounter" }, { status: 500 })
    }
}
