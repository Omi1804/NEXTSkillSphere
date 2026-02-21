import { AuthError, createToken } from "@/config/authTokens";
import {
  createUser,
  findUserByEmail,
  type UserCreateInput,
} from "@/repositories/user.repository";

export type UserCredentials = UserCreateInput;

export const signupUser = async (credentials: UserCredentials) => {
  const existing = await findUserByEmail(credentials.email);

  if (existing) {
    throw new AuthError("User already exists!", 400);
  }

  const user = await createUser(credentials);
  const token = createToken(user.id);

  return { user, token };
};

export const loginUser = async (credentials: {
  email: string;
  password: string;
}) => {
  const user = await findUserByEmail(credentials.email);

  if (!user || user.password !== credentials.password) {
    throw new AuthError("Invalid credentials!", 401);
  }

  const token = createToken(user.id);
  return { user, token };
};
