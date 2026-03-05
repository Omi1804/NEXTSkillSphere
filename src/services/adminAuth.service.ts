import {
  createAdmin,
  findAdminByEmail,
  type AdminCreateInput,
} from "@/repositories/admin.repository";
import { createToken } from "@/config/authTokens";
import { AuthError } from "@/errors";

export type AdminCredentials = AdminCreateInput;

export async function signupAdmin(credentials: AdminCredentials) {
  const existing = await findAdminByEmail(credentials.email);

  if (existing) {
    throw new AuthError("Admin already exists!");
  }

  const admin = await createAdmin(credentials);
  const token = createToken(admin.id);

  return { admin, token };
}

export async function loginAdmin(credentials: AdminCredentials) {
  const admin = await findAdminByEmail(credentials.email);

  if (!admin || admin.password !== credentials.password) {
    throw new AuthError("Invalid credentials or user does not exist");
  }

  const token = createToken(admin.id);

  return { admin, token };
}
