import { NextResponse } from "next/server";
import { AppError, InternalServerError, isAppError } from "@/errors";

type ApiErrorBody = {
  message: string;
  code?: string;
};

export const buildApiError = (error: unknown): AppError => {
  if (isAppError(error)) {
    return error;
  }

  if (error instanceof Error) {
    return new InternalServerError(error.message || "Internal server error");
  }

  return new InternalServerError("Internal server error");
};

export const handleApiError = (
  error: unknown,
  fallbackMessage = "Internal server error",
) => {
  const appError = buildApiError(error);
  const body: ApiErrorBody = {
    message: appError.message || fallbackMessage,
    code: appError.code,
  };

  return NextResponse.json(body, { status: appError.status });
};