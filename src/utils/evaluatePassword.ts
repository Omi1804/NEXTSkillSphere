import { PasswordStrength } from "@/types/register.types";

export const strengthStyles: Record<PasswordStrength, { label: string; className: string }> = {
  weak: { label: "Weak", className: "bg-[#E53E3E]" },
  medium: { label: "Medium", className: "bg-[#F7CF1F]" },
  strong: { label: "Strong", className: "bg-[#65D56D]" },
};

export const evaluatePasswordStrength = (value: string): PasswordStrength => {
  const hasUpperCase = /[A-Z]/.test(value);
  const hasLowerCase = /[a-z]/.test(value);
  const hasNumber = /\d/.test(value);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);

  if (value.length >= 12 && hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar) {
    return "strong";
  }

  if (value.length >= 8 && hasUpperCase && hasLowerCase && (hasNumber || hasSpecialChar)) {
    return "medium";
  }

  return "weak";
};
