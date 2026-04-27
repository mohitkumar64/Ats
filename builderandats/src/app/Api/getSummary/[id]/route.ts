import { NextRequest, NextResponse } from "next/server";
import { connectDb } from "../../../../../Lib/conntectDb";
import { ATSResponse } from "../../../../../Lib/Models/parseSchema";



export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
try {
    const {id} = await params;
  await connectDb();
  const res = await ATSResponse.findById(id);
  return NextResponse.json({data : res});     
} catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
}
 
}