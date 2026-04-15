import {
  createAdmin,
  findAdminByEmail,
  updateUserPassword,
  type AdminCreateInput,
} from "@/repositories/admin.repository";
import { createToken } from "@/config/authTokens";
import { AuthError, BadRequestError } from "@/errors";
import {
  getPasswordValidationError,
  hashPassword,
  isPasswordHash,
  verifyPassword,
} from "@/lib/passwordSecurity";

export type AdminCredentials = AdminCreateInput;
export type AdminLoginCredentials = { email: string; password: string };

export async function signupAdmin(credentials: AdminCredentials) {
  const passwordError = getPasswordValidationError(credentials.password);

  if (passwordError) {
    throw new BadRequestError(passwordError);
  }

  const existing = await findAdminByEmail(credentials.email);

  if (existing) {
    throw new AuthError("Email already exists!");
  }

  const admin = await createAdmin({
    ...credentials,
    password: await hashPassword(credentials.password),
  });
  const token = createToken(admin.id);

  return { admin, token };
}

export async function loginAdmin(credentials: AdminLoginCredentials) {
  const admin = await findAdminByEmail(credentials.email);

  if (!admin || !(await verifyPassword(credentials.password, admin.password))) {
    throw new AuthError("Invalid credentials or Admin does not exist");
  }

  if (!isPasswordHash(admin.password)) {
    await updateUserPassword(admin.id, await hashPassword(credentials.password));
  }

  const token = createToken(admin.id);

  return { admin, token };
}
