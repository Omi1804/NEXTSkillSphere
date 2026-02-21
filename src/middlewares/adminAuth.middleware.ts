import { ADMIN_SESSION_COOKIE } from "@/constants/adminAuth.constants";
import { AuthError } from "@/config/authTokens";
import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { findAdminById } from "@/repositories/admin.repository";

const secretKey = process.env.SECRET_KEY as string;

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

export const authenticateAdmin = async (req: NextRequest) => {
  const token = req.cookies.get(ADMIN_SESSION_COOKIE)?.value;

  if (!token) {
    throw new AuthError("No authentication token provided", 401);
  }

  const decode = verifyToken(token);
  const admin = await findAdminById(decode.id);

  if (!admin) {
    throw new AuthError("Admin not found", 404);
  }

  return admin;
};
