type UserWithPassword = {
  password?: string;
  [key: string]: unknown;
};

export function sanitizeUser<TUser extends UserWithPassword | null | undefined>(user: TUser) {
  if (!user) return user;

  const { password: _password, ...safeUser } = user;
  return safeUser;
}
