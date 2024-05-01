import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import { NextApiResponse, NextApiRequest } from "next";
const secretKey = process.env.SECRET_KEY as string;

if (!secretKey) {
  throw new Error(
    "JWT Secret Key is not defined in the environment variables."
  );
}

const prisma = new PrismaClient();

interface DecodedToken {
  id: string;
}

export const authenticateAdmin = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Authorization header missing!" });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Token missing or malformed!" });
  }

  try {
    const decoded: DecodedToken = jwt.verify(token, secretKey) as DecodedToken;

    const { id }: { id: string } = decoded;

    const existingUser = await prisma.admins.findUnique({
      where: {
        id,
      },
    });

    if (!existingUser) {
      return res.status(403).json({ message: "Admin not found!" });
    }

    req.headers.userEmail = existingUser.email;
  } catch (err) {
    return res.status(401).json({ message: "Invalid token!" });
  } finally {
    await prisma.$disconnect();
  }
};

export const authenticateUser = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Authorization header missing!" });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Token missing or malformed!" });
  }

  try {
    const decoded: DecodedToken = jwt.verify(token, secretKey) as DecodedToken;

    const { id }: { id: string } = decoded;

    // const existingUser = await Users.findOne({ _id: id });
    const existingUser = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!existingUser) {
      return res.status(403).json({ message: "User not found!" });
    }

    req.headers.userEmail = existingUser.email;
  } catch (err) {
    return res.status(401).json({ message: "Invalid token!" });
  } finally {
    await prisma.$disconnect();
  }
};
