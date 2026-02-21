import { NextResponse } from "next/server";
import {
  loginAdmin,
  type AdminCredentials,
} from "@/services/adminAuth.service";
import { AuthError } from "@/config/authTokens";
import {
  ADMIN_COOKIE_MAX_AGE,
  ADMIN_COOKIE_SAME_SITE,
  ADMIN_SESSION_COOKIE,
} from "@/constants/adminAuth.constants";

export async function POST(req: Request) {
  try {
    const { email, password }: AdminCredentials = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 400 },
      );
    }

    const { admin, token } = await loginAdmin({ email, password });

    const response = NextResponse.json(
      {
        message: "Logged in successfully",
        adminDetails: admin,
      },
      { status: 200 },
    );

    response.cookies.set({
      name: ADMIN_SESSION_COOKIE,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: ADMIN_COOKIE_SAME_SITE,
      path: "/",
      maxAge: ADMIN_COOKIE_MAX_AGE,
    });

    return response;
  } catch (err) {
    if (err instanceof AuthError) {
      return NextResponse.json(
        { message: err.message },
        { status: err.status },
      );
    }
    console.error("Server Error:", err);
    return NextResponse.json(
      { message: "Internal server error." },
      { status: 500 },
    );
  }
}
