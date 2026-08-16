import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export type SessionUser = {
  id: string;
  email: string;
  role: string;
};

export function getSessionUser(req: NextRequest): SessionUser | null {
  const token = req.cookies.get("token")?.value;
  const secret = process.env.JWT_SECRET;

  if (!token || !secret) return null;

  try {
    const payload = jwt.verify(token, secret) as Partial<SessionUser>;
    if (!payload.id || !payload.email || !payload.role) return null;
    return { id: payload.id, email: payload.email, role: payload.role };
  } catch {
    return null;
  }
}

export function unauthorizedResponse() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

export function forbiddenResponse() {
  return NextResponse.json({ error: "Forbidden" }, { status: 403 });
}
