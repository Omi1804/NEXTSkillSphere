import jwt from "jsonwebtoken";
import { AuthError, InternalServerError } from "@/errors";

interface DecodedToken {
  id: string;
}

export function getSecretKey() {
  const secret = process.env.SECRET_KEY;

  if (!secret) {
    console.error("Secret key for token generation is missing.");
    throw new InternalServerError("Internal server error.");
  }

  return secret;
}

export function createToken(adminId: number | string) {
  return jwt.sign({ id: adminId }, getSecretKey(), { expiresIn: "1d" });
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, getSecretKey()) as DecodedToken;
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      throw new AuthError("Token expired! Please login again.");
    }
    throw new AuthError("Invalid or malformed token!");
  }
}
