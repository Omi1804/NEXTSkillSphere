import { ADMIN_SESSION_COOKIE } from "@/constants/adminAuth.constants";
import { verifyToken } from "@/config/authTokens";
import { AuthError, NotFoundError } from "@/errors";
import { NextRequest } from "next/server";
import { findAdminById } from "@/repositories/admin.repository";

export const authenticateAdmin = async (req: NextRequest) => {
  const token = req.cookies.get(ADMIN_SESSION_COOKIE)?.value;

  if (!token) {
    throw new AuthError("No authentication token provided");
  }

  const decode = verifyToken(token);
  const admin = await findAdminById(decode.id);

  if (!admin) {
    throw new NotFoundError("Admin not found");
  }

  return admin;
};
