import { createToken } from "@/config/authTokens";
import { AuthError, BadRequestError } from "@/errors";
import {
  createUser,
  findUserByEmail,
  updateUserPassword,
  type UserCreateInput,
} from "@/repositories/user.repository";
import {
  getPasswordValidationError,
  hashPassword,
  isPasswordHash,
  verifyPassword,
} from "@/lib/passwordSecurity";

export type UserCredentials = UserCreateInput;

export const signupUser = async (credentials: UserCredentials) => {
  const passwordError = getPasswordValidationError(credentials.password);

  if (passwordError) {
    throw new BadRequestError(passwordError);
  }

  const existing = await findUserByEmail(credentials.email);

  if (existing) {
    throw new AuthError("User already exists!");
  }

  const user = await createUser({
    ...credentials,
    password: await hashPassword(credentials.password),
  });
  const token = createToken(user.id);

  return { user, token };
};

export const loginUser = async (credentials: { email: string; password: string }) => {
  const user = await findUserByEmail(credentials.email);

  if (!user || !(await verifyPassword(credentials.password, user.password))) {
    throw new AuthError("Invalid credentials!");
  }

  if (!isPasswordHash(user.password)) {
    await updateUserPassword(user.id, await hashPassword(credentials.password));
  }

  const token = createToken(user.id);
  return { user, token };
};
