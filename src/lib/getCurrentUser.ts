import { cookies } from "next/headers";
import { verifyToken } from "@/config/authTokens";
import { findUserById } from "@/repositories/user.repository";
import { USER_SESSION_COOKIE } from "@/constants/userAuth.constants";

export async function getCurrentUser() {
  const token = (await cookies()).get(USER_SESSION_COOKIE)?.value;

  if (!token) return null;

  try {
    const decoded = verifyToken(token);
    const user = await findUserById(decoded.id);
    return user;
  } catch {
    return null;
  }
}
