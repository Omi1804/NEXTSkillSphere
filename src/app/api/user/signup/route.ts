import { AuthError } from "@/config/authTokens";
import {
  USER_COOKIE_MAX_AGE,
  USER_COOKIE_SAME_SITE,
  USER_SESSION_COOKIE,
} from "@/constants/userAuth.constants";
import { signupUser } from "@/services/userAuth.service";
import { UserInput } from "@/types/userApis";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email, password, username, name }: UserInput = await req.json();

    if (!email || !password) {
      return NextResponse.json({ message: "Invalid email or password" }, { status: 400 });
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
    if (error instanceof AuthError) {
      return NextResponse.json({ message: error.message }, { status: error.status });
    }

    console.error("Server Error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
