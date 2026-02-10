import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

//login for user
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).end(); // Method Not Allowed
  }

  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Invalid email or password" });
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
      return res
        .status(401)
        .json({ message: "Invalid credentials or user does not exist" });
    }

    if (!process.env.SECRET_KEY) {
      console.log("Secret key for token generation is missing.");
      return res.status(500).json({ message: "Internal server error." });
    }

    const token = jwt.sign({ id: existingUser.id }, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    return res.status(200).json({
      message: `Logged in successfully ${existingUser.name}`,
      token,
      userDetails: existingUser,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(404)
      .json({ message: "Invalid credentials or user does not exist" });
  } finally {
    await prisma.$disconnect();
  }
}
