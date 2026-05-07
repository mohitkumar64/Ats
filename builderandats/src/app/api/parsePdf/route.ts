import { NextRequest, NextResponse } from "next/server";
import pdf from "pdf-parse/lib/pdf-parse";
import { Ai } from "@/utils/Ai";
import { ATSResponse } from "../../../../Lib/Models/parseSchema";
import { connectDb } from "../../../../Lib/conntectDb";

export async function POST(req:NextRequest) {
  try {
    await connectDb();
    const buffer = Buffer.from(await req.arrayBuffer());
    const data = await pdf(buffer);
    // console.log("Extracted PDF text:", data.text);
    const aiResponse = await Ai(data.text);
    //  console.log(aiResponse);
     const clean = aiResponse
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();
      const parsed = JSON.parse(clean);

     const res =  await ATSResponse.create({
        score: parsed.score,
        summary: parsed.summary,
        sections: parsed.sections,
      });


      console.log(res.id)
    return NextResponse.json({ id : res.id });
  } catch (err) {
    console.error("Error in parsePdf:", err);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
} 

