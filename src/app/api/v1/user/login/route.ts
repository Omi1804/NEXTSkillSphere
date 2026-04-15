import {
  USER_COOKIE_MAX_AGE,
  USER_COOKIE_SAME_SITE,
  USER_SESSION_COOKIE,
} from "@/constants/userAuth.constants";
import { BadRequestError } from "@/errors";
import { handleApiError } from "@/errors/apiErrorHandler";
import { sanitizeUser } from "@/lib/sanitizeUser";
import { loginUser } from "@/services/userAuth.service";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      throw new BadRequestError("Invalid email or password");
    }

    const { user, token } = await loginUser({ email, password });

    const response = NextResponse.json({
      message: `Logged in successfully ${user.name}`,
      userDetails: sanitizeUser(user),
    });

    response.cookies.set({
      name: USER_SESSION_COOKIE,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: USER_COOKIE_SAME_SITE,
      path: "/", // browser will send this cookie only for this path and its subpaths
      maxAge: USER_COOKIE_MAX_AGE,
    });

    return response;
  } catch (error) {
    console.error("Server Error:", error);
    return handleApiError(error, "Internal server error.");
  }
}
