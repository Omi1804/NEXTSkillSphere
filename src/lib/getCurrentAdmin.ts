import { cookies } from "next/headers";
import { verifyToken } from "@/config/authTokens";
import { ADMIN_SESSION_COOKIE } from "@/constants/adminAuth.constants";
import { findAdminById } from "@/repositories/admin.repository";

export async function getCurrentAdmin() {
  const token = (await cookies()).get(ADMIN_SESSION_COOKIE)?.value;

  if (!token) return null;

  try {
    const decoded = verifyToken(token);
    return findAdminById(decoded.id);
  } catch {
    return null;
  }
}
