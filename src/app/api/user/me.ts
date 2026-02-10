import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { authenticateUser } from "@/lib";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }
  try {
    await authenticateUser(req, res);

    const { userEmail }: any = req.headers;

    const existingUser = await prisma.user.findUnique({
      where: {
        email: userEmail,
      },
    });

    if (existingUser) {
      res.status(200).json({ user: existingUser });
    } else {
      res.status(404).json({ message: "User expired" });
    }
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
}
