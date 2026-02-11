import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 400 },
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        email,
        password,
      },
      include: {
        courses: true,
      },
    });

    if (!existingUser || existingUser.password !== password) {
      // Ensure to use hashed password comparison in real app
      return NextResponse.json(
        { message: "Invalid credentials or user does not exist" },
        { status: 401 },
      );
    }

    if (!process.env.SECRET_KEY) {
      console.log("Secret key for token generation is missing.");
      return NextResponse.json(
        { message: "Internal server error." },
        { status: 500 },
      );
    }

    const token = jwt.sign({ id: existingUser.id }, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    return NextResponse.json({
      message: `Logged in successfully ${existingUser.name}`,
      token,
      userDetails: existingUser,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Invalid credentials or user does not exist" },
      { status: 404 },
    );
  }
}
