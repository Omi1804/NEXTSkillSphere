import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

interface UserInput {
  email: string;
  password: string;
}

//signup for the admin
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method !== "POST") {
      return res.status(405).end(); // Method Not Allowed
    }

    const { email, password }: UserInput = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const existingUser = await prisma.admins.findUnique({
      where: {
        email: email,
      },
    });

    if (existingUser) {
      return res.status(400).json({ message: "Admin already exists!" });
    }

    const newUser = await prisma.admins.create({
      data: { email, password },
    });

    if (!process.env.SECRET_KEY) {
      console.log("Secret key for token generation is missing.");
      return res.status(500).json({ message: "Internal server error." });
    }

    const token = jwt.sign({ id: newUser.id }, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    return res.status(200).json({
      message: "Admin created successfully",
      token,
      adminDetails: newUser,
    });
  } catch (err) {
    console.error("Server Error:", err);
    return res.status(500).json({ message: "Internal server error" });
  } finally {
    await prisma.$disconnect();
  }
}
