import { NextRequest, NextResponse } from "next/server";
import pdf from "pdf-parse/lib/pdf-parse";

export async function POST(req:NextRequest) {
  try {
    const buffer = Buffer.from(await req.arrayBuffer());
    const data = await pdf(buffer);

    return NextResponse.json({ text: data.text });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}