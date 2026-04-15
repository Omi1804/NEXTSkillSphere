import bcrypt from "bcryptjs";

const PASSWORD_SALT_ROUNDS = 12;
const MIN_PASSWORD_LENGTH = 12;
const BCRYPT_HASH_PATTERN = /^\$2[aby]\$\d{2}\$/;

export function isPasswordHash(password: string) {
  return BCRYPT_HASH_PATTERN.test(password);
}

export async function hashPassword(password: string) {
  return bcrypt.hash(password, PASSWORD_SALT_ROUNDS);
}

export async function verifyPassword(password: string, storedPassword: string) {
  if (isPasswordHash(storedPassword)) {
    return bcrypt.compare(password, storedPassword);
  }

  return password === storedPassword;
}

export function getPasswordValidationError(password: string) {
  if (password.length < MIN_PASSWORD_LENGTH) {
    return `Password must be at least ${MIN_PASSWORD_LENGTH} characters long.`;
  }

  if (!/[A-Z]/.test(password) || !/[a-z]/.test(password) || !/[0-9]/.test(password)) {
    return "Password must include uppercase, lowercase, and numeric characters.";
  }

  return null;
}
