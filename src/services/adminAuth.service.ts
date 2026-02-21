import {
  createAdmin,
  findAdminByEmail,
  type AdminCreateInput,
} from "@/repositories/admin.repository";
import { AuthError, createToken } from "@/config/authTokens";

export type AdminCredentials = AdminCreateInput;

export async function signupAdmin(credentials: AdminCredentials) {
  const existing = await findAdminByEmail(credentials.email);

  if (existing) {
    throw new AuthError("Admin already exists!", 400);
  }

  const admin = await createAdmin(credentials);
  const token = createToken(admin.id);

  return { admin, token };
}

export async function loginAdmin(credentials: AdminCredentials) {
  const admin = await findAdminByEmail(credentials.email);

  if (!admin || admin.password !== credentials.password) {
    throw new AuthError("Invalid credentials or user does not exist", 401);
  }

  const token = createToken(admin.id);

  return { admin, token };
}
