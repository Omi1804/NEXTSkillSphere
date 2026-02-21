import jwt from "jsonwebtoken";

export class AuthError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "AuthError";
    this.status = status;
  }
}

export function getSecretKey() {
  const secret = process.env.SECRET_KEY;

  if (!secret) {
    console.error("Secret key for token generation is missing.");
    throw new AuthError("Internal server error.", 500);
  }

  return secret;
}

export function createToken(adminId: number | string) {
  return jwt.sign({ id: adminId }, getSecretKey(), { expiresIn: "1d" });
}
