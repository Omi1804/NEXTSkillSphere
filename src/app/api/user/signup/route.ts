import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

interface UserInput {
  username: string;
  name: string;
  email: string;
  password: string;
}

export async function POST(req: Request) {
  try {
    const { email, password, username, name }: UserInput = await req.json();

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
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists!" },
        { status: 400 },
      );
    }

    const newUser = await prisma.user.create({
      data: {
        email,
        password,
        username,
        name,
      },
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
      { message: "User created successfully", token, newUser },
      { status: 200 },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "An error occurred during signup", error },
      { status: 500 },
    );
  }
}
