import {
  USER_COOKIE_MAX_AGE,
  USER_COOKIE_SAME_SITE,
  USER_SESSION_COOKIE,
} from "@/constants/userAuth.constants";
import { BadRequestError } from "@/errors";
import { handleApiError } from "@/errors/apiErrorHandler";
import { signupUser } from "@/services/userAuth.service";
import { UserInput } from "@/types/userApis";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email, password, username, name }: UserInput = await req.json();

    if (!email || !password) {
      throw new BadRequestError("Invalid email or password");
    }

    const { user, token } = await signupUser({
      email,
      password,
      username,
      name,
    });

    const response = NextResponse.json(
      { message: "User created successfully", user },
      { status: 200 },
    );

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
    return handleApiError(error, "Internal server error");
  }
}
