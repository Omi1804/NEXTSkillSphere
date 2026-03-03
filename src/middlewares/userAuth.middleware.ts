import { AuthError, verifyToken } from "@/config/authTokens";
import { USER_SESSION_COOKIE } from "@/constants/userAuth.constants";
import { findUserById } from "@/repositories/user.repository";
import { NextRequest } from "next/server";

export const authenticateUser = async (req: NextRequest) => {
  const token = req.cookies.get(USER_SESSION_COOKIE)?.value;

  if (!token) {
    throw new AuthError("No authentication token provided", 401);
  }

  const decode = verifyToken(token);
  const user = await findUserById(decode.id);

  if (!user) {
    throw new AuthError("User not found", 404);
  }

  return user;
};
