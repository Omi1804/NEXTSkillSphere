import { AuthError } from "@/config/authTokens";
import { findUserByEmail } from "@/repositories/user.repository";

export async function getUserProfileByEmail(email?: string | null) {
  if (!email) {
    throw new AuthError("User expired", 404);
  }

  const user = await findUserByEmail(email);

  if (!user) {
    throw new AuthError("Auth expired, Please login again", 404);
  }

  return user;
}

export async function getAllCourses() {}
