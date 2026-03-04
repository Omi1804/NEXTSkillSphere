import { ChangeEvent, ReactNode } from "react";

export type PasswordStrength = "weak" | "medium" | "strong";

export type FormValues = {
  email: string;
  password: string;
  username: string;
  name: string;
};

export type StatusMessageProps = {
  variant: "error" | "success";
  children: ReactNode;
};

export type TextFieldProps = {
  label: string;
  name: keyof FormValues;
  type?: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  autoComplete?: string;
  disabled?: boolean;
};
