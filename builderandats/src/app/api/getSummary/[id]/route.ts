import { NextRequest, NextResponse } from "next/server";
import { connectDb } from "../../../../../Lib/conntectDb";
import { ATSResponse } from "../../../../../Lib/Models/parseSchema";
import { getSessionUser, unauthorizedResponse } from "../../../../../Lib/apiAuth";



export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
try {
    const user = getSessionUser(req);
    if (!user) return unauthorizedResponse();
    const {id} = await params;
  await connectDb();
  const res = await ATSResponse.findOne({ _id: id, userId: user.id });
  if (!res) {
    return NextResponse.json({ error: "Report not found" }, { status: 404 });
  }
  return NextResponse.json({data : res});     
} catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
}
 
}
