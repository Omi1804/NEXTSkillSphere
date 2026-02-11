import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

interface UserInput {
  email: string;
  password: string;
}

//signup for the admin
export async function POST(req: Request) {
  try {
    const { email, password }: UserInput = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 400 },
      );
    }

    const existingUser = await prisma.admins.findUnique({
      where: {
        email: email,
      },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "Admin already exists!" },
        { status: 400 },
      );
    }

    const newUser = await prisma.admins.create({
      data: { email, password },
    });

    if (!process.env.SECRET_KEY) {
      console.log("Secret key for token generation is missing.");
      return NextResponse.json(
        { message: "Internal server error." },
        { status: 500 },
      );
    }

    const token = jwt.sign({ id: newUser.id }, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    return NextResponse.json(
      {
        message: "Admin created successfully",
        token,
        adminDetails: newUser,
      },
      { status: 200 },
    );
  } catch (err) {
    console.error("Server Error:", err);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
