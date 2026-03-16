import {
  createAdmin,
  findAdminByEmail,
  type AdminCreateInput,
} from "@/repositories/admin.repository";
import { createToken } from "@/config/authTokens";
import { AuthError } from "@/errors";

export type AdminCredentials = AdminCreateInput;
export type AdminLoginCredentials = { email: string; password: string };

export async function signupAdmin(credentials: AdminCredentials) {
  const existing = await findAdminByEmail(credentials.email);

  if (existing) {
    throw new AuthError("Email already exists!");
  }

  const admin = await createAdmin(credentials);
  const token = createToken(admin.id);

  return { admin, token };
}

export async function loginAdmin(credentials: AdminLoginCredentials) {
  const admin = await findAdminByEmail(credentials.email);

  if (!admin || admin.password !== credentials.password) {
    throw new AuthError("Invalid credentials or user does not exist");
  }

  const token = createToken(admin.id);

  return { admin, token };
}
