import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { connectToDb } from "@/lib";
import { Admins, Courses } from "@/models";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).end(); // Method Not Allowed
  }

  await connectToDb();

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Invalid email or password" });
  }

  const existingUser = await Admins.findOne({ email });

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

  const token = jwt.sign({ id: existingUser._id }, process.env.SECRET_KEY, {
    expiresIn: "1h",
  });

  return res.status(200).json({ message: "Logged in successfully", token });
}
