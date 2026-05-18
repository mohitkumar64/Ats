import { NextRequest, NextResponse } from "next/server";
import { connectDb } from "../../../../../Lib/conntectDb";
import { Template } from "../../../../../Lib/Models/templates"



export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;
    await connectDb();
    const template = await Template.findById(id);

    return NextResponse.json(template);
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  }

}