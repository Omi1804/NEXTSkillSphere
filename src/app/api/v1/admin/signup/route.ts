import { NextResponse } from "next/server";
import { signupAdmin, type AdminCredentials } from "@/services/adminAuth.service";
import { BadRequestError } from "@/errors";
import {
  ADMIN_COOKIE_MAX_AGE,
  ADMIN_COOKIE_SAME_SITE,
  ADMIN_SESSION_COOKIE,
} from "@/constants/adminAuth.constants";
import { handleApiError } from "@/errors/apiErrorHandler";

export async function POST(req: Request) {
  try {
    const { email, password, name }: AdminCredentials = await req.json();

    if (!email || !password || !name) {
      throw new BadRequestError("Invalid email, password, or name");
    }

    const { admin, token } = await signupAdmin({ email, password, name });

    const response = NextResponse.json(
      {
        message: "Admin created successfully",
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
    console.error("Server Error:", err);
    return handleApiError(err, "Internal server error");
  }
}
