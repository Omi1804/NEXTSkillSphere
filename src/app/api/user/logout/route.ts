import {
  USER_COOKIE_SAME_SITE,
  USER_SESSION_COOKIE,
} from "@/constants/userAuth.constants";
import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ message: "Logged out successfully" });

  response.cookies.set({
    name: USER_SESSION_COOKIE,
    value: "",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: USER_COOKIE_SAME_SITE,
    path: "/",
    maxAge: 0,
  });

  return response;
}
