import { NextResponse } from "next/server";
import { loginAdmin, type AdminCredentials } from "@/services/adminAuth.service";
import { BadRequestError } from "@/errors";
import {
  ADMIN_COOKIE_MAX_AGE,
  ADMIN_COOKIE_SAME_SITE,
  ADMIN_SESSION_COOKIE,
} from "@/constants/adminAuth.constants";
import { handleApiError } from "@/errors/apiErrorHandler";
import { sanitizeUser } from "@/lib/sanitizeUser";

export async function POST(req: Request) {
  try {
    const { email, password }: AdminCredentials = await req.json();

    if (!email || !password) {
      throw new BadRequestError("Invalid email or password");
    }

    const { admin, token } = await loginAdmin({ email, password });

    const response = NextResponse.json(
      {
        message: "Logged in successfully",
        adminDetails: sanitizeUser(admin),
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
    return handleApiError(err, "Internal server error.");
  }
}
