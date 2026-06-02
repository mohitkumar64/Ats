import { NextRequest, NextResponse } from "next/server";
import { connectDb } from "../../../../../Lib/conntectDb";
import { Template } from "../../../../../Lib/Models/templates"
import { getCurrentUser } from "../../../../../Lib/auth";



export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
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


export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getCurrentUser();
    if (user?.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const { id } = await params;
    await connectDb();
    const template = await Template.findByIdAndDelete(id);
    if (template) {
      return NextResponse.json({ message: "Template deleted successfully" });
    } else {
      return NextResponse.json({ error: "Template not found" }, { status: 404 });
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  }

}