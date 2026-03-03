import { ADMIN_SESSION_COOKIE } from "@/constants/adminAuth.constants";
import { AuthError, verifyToken } from "@/config/authTokens";
import { NextRequest } from "next/server";
import { findAdminById } from "@/repositories/admin.repository";

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
