import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { connectToDb } from "@/lib";
import { Users } from "@/models";

interface UserInput {
  username: string;
  name: string;
  email: string;
  password: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  try {
    await connectToDb();
    const { email, password, username, name }: UserInput = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const existingUser = await Users.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists!" });
    }

    const newUser = await Users.create({ email, password, username, name });

    if (!process.env.SECRET_KEY) {
      console.log("Secret key for token generation is missing.");
      return res.status(500).json({ message: "Internal server error." });
    }

    const token = jwt.sign({ id: newUser._id }, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    return res
      .status(200)
      .json({ message: "User created successfully", token, newUser });
  } catch (error) {
    console.log(error);
    return res
      .status(404)
      .json({ message: "Invalid credentials or user does not exist" });
  }
}
