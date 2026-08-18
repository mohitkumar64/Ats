import { NextRequest, NextResponse } from "next/server";
import pdf from "pdf-parse/lib/pdf-parse";
import { Ai } from "@/utils/nvim";
import { ATSResponse } from "../../../../Lib/Models/parseSchema";
import { connectDb } from "../../../../Lib/conntectDb";
import { getSessionUser, unauthorizedResponse } from "../../../../Lib/apiAuth";

const MAX_PDF_BYTES = 5 * 1024 * 1024;

export async function POST(req: NextRequest) {
  try {
    const user = getSessionUser(req);
    if (!user) return unauthorizedResponse();

    const contentType = req.headers.get("content-type") || "";
    const contentLength = Number(req.headers.get("content-length") || 0);
    if (!contentType.includes("application/pdf") || contentLength > MAX_PDF_BYTES) {
      return NextResponse.json({ error: "Upload a PDF smaller than 5 MB." }, { status: 400 });
    }

    await connectDb();
    const buffer = Buffer.from(await req.arrayBuffer());
    if (buffer.length === 0 || buffer.length > MAX_PDF_BYTES) {
      return NextResponse.json({ error: "Upload a PDF smaller than 5 MB." }, { status: 400 });
    }
    const data = await pdf(buffer);
    if (!data.text.trim()) {
      return NextResponse.json({ error: "The PDF contains no readable text." }, { status: 400 });
    }

    const aiResponse = await Ai(data.text)
    if (typeof aiResponse !== "string") {
      throw new Error("AI analysis failed");
    }

    // const clean = aiResponse
    //   .replace(/```json/g, "")
    //   .replace(/```/g, "")
    //   .trim();
    const clean = aiResponse.trim()
      .replace(/^```json\s*/i, "")
      .replace(/\s*```$/, "");

    // console.log(clean)
    const parsed = JSON.parse(clean);

    const res = await ATSResponse.create({
      userId: user.id,
      score: parsed.score,
      summary: parsed.summary,
      sections: parsed.sections,
    });


    return NextResponse.json({ id: res.id });
  } catch (err) {
    console.error("Error in parsePdf:", err);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}

