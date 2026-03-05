type ApiErrorLike = {
  message?: string;
  error?: {
    message?: string;
  };
};

export const getClientErrorMessage = (
  error: unknown,
  fallback = "Something went wrong",
): string => {
  if (error instanceof Error) {
    return error.message || fallback;
  }

  if (typeof error === "string") {
    return error;
  }

  return fallback;
};

export const getApiErrorMessage = (
  payload: unknown,
  fallback = "Something went wrong",
): string => {
  if (!payload || typeof payload !== "object") {
    return fallback;
  }

  const value = payload as ApiErrorLike;
  return value.message || value.error?.message || fallback;
};