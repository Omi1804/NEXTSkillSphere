import { NextRequest, NextResponse } from "next/server";
import { USER_SESSION_COOKIE } from "@/constants/userAuth.constants";

export default function middleware(req: NextRequest) {
  const token = req.cookies.get(USER_SESSION_COOKIE)?.value;
  if (!token) {
    return NextResponse.redirect(new URL("/", req.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/mycart", "/profile"],
};
