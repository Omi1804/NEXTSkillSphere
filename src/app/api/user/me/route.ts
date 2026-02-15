import { authenticateUser } from "@/lib";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const user = await authenticateUser(req);

    const userEmail = user?.email;

    const existingUser = await prisma.user.findUnique({
      where: {
        email: userEmail,
      },
    });

    if (existingUser) {
      return NextResponse.json({ user: existingUser }, { status: 200 });
    } else {
      return NextResponse.json({ message: "User expired" }, { status: 404 });
    }
  } catch (error: any) {
    if (error.message.includes("Token expired")) {
      return NextResponse.json({ message: error.message }, { status: 401 });
    }
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
