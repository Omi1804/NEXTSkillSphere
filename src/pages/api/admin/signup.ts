import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { connectToDb } from "@/lib";
import { Admins, Courses } from "@/models";

interface UserInput {
  email: string;
  password: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).end(); // Method Not Allowed
  }

  await connectToDb();

  const { email, password }: UserInput = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Invalid email or password" });
  }

  const existingUser = await Admins.findOne({ email });

  if (existingUser) {
    return res.status(400).json({ message: "Admin already exists!" });
  }

  const newUser = await Admins.create({ email, password }); // Ensure password is hashed before saving

  if (!process.env.SECRET_KEY) {
    console.log("Secret key for token generation is missing.");
    return res.status(500).json({ message: "Internal server error." });
  }

  const token = jwt.sign({ id: newUser._id }, process.env.SECRET_KEY, {
    expiresIn: "1d",
  });

  return res.status(200).json({ message: "Admin created successfully", token });
}
