import jwt from "jsonwebtoken";
import { prisma } from "./prisma";

const secretKey = process.env.SECRET_KEY as string;
if (!secretKey) {
  throw new Error(
    "JWT Secret Key is not defined in the environment variables.",
  );
}

interface DecodedToken {
  id: string;
}

const verifyToken = (token: string): DecodedToken => {
  try {
    return jwt.verify(token, secretKey) as DecodedToken;
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      throw new Error("Token expired! Please login again.");
    }
    throw new Error("Invalid or malformed token!");
  }
};

export const authenticateAdmin = async (req: Request) => {
  const authHeader = req.headers.get("authorization");

  if (!authHeader) {
    throw new Error("Authorization header missing!");
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    throw new Error("Token missing or malformed!");
  }

  const decoded = verifyToken(token);

  const admin = await prisma.admins.findUnique({
    where: {
      id: decoded.id,
    },
  });

  if (!admin) {
    throw new Error("Admin not found!");
  }

  return admin;
};

export const authenticateUser = async (req: Request) => {
  const authHeader = req.headers.get("authorization");

  if (!authHeader) {
    throw new Error("Authorization header missing!");
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    throw new Error("Token missing or malformed!");
  }

  const decoded = verifyToken(token);

  // const existingUser = await Users.findOne({ _id: id });
  const existingUser = await prisma.user.findUnique({
    where: {
      id: decoded.id,
    },
  });

  if (!existingUser) {
    throw new Error("User not found!");
  }

  return existingUser;
};
