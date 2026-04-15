import { ADMIN_COOKIE_SAME_SITE, ADMIN_SESSION_COOKIE } from "@/constants/adminAuth.constants";
import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ message: "Admin logged out successfully" });

  response.cookies.set({
    name: ADMIN_SESSION_COOKIE,
    value: "",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: ADMIN_COOKIE_SAME_SITE,
    path: "/",
    maxAge: 0,
  });

  return response;
}
