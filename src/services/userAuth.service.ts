import { createToken } from "@/config/authTokens";
import { AuthError } from "@/errors";
import { createUser, findUserByEmail, type UserCreateInput } from "@/repositories/user.repository";

export type UserCredentials = UserCreateInput;

export const signupUser = async (credentials: UserCredentials) => {
  const existing = await findUserByEmail(credentials.email);

  if (existing) {
    throw new AuthError("User already exists!");
  }

  const user = await createUser(credentials);
  const token = createToken(user.id);

  return { user, token };
};

export const loginUser = async (credentials: { email: string; password: string }) => {
  const user = await findUserByEmail(credentials.email);

  // password comparison should be done using hashed passwords in a real application
  if (!user || user.password !== credentials.password) {
    throw new AuthError("Invalid credentials!");
  }

  const token = createToken(user.id);
  return { user, token };
};
