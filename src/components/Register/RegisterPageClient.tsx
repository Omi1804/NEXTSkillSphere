"use client";

import CommonHero from "@/components/CommonHero";
import {
  InfoBanner,
  PasswordStrengthIndicator,
  StatusMessage,
  SubmitButton,
  TextField,
} from "@/components/Register/RegisterModules";
import { FormValues, PasswordStrength } from "@/types/register.types";
import { evaluatePasswordStrength } from "@/utils/evaluatePassword";
import { handleSignupSubmit } from "@/utils/handleAuthSubmit";
import { useRouter } from "next/navigation";
import { startTransition, useState, type ChangeEvent, type FormEvent } from "react";

const initialFormValues: FormValues = {
  email: "",
  password: "",
  username: "",
  name: "",
};

const RegisterPageClient = () => {
  const router = useRouter();
  const [formValues, setFormValues] = useState<FormValues>(initialFormValues);
  const [passwordStrength, setPasswordStrength] = useState<PasswordStrength>("weak");
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "password") {
      setPasswordStrength(evaluatePasswordStrength(value));
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setSuccessMessage(null);
    setIsSubmitting(true);

    try {
      const result = await handleSignupSubmit({ payload: formValues });
      setSuccessMessage(result.message || "User created successfully");

      startTransition(() => {
        router.refresh();
        router.replace("/");
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  const { email, password, username, name } = formValues;

  return (
    <div>
      <CommonHero
        Image={"/breadcrumb.png"}
        heroHeading="Create an Account"
        subHeading="CREATE AN ACCOUNT"
      />
      <div className="w-full bg-transparent px-[6rem] py-[8rem]">
        <InfoBanner />
        <div className="flex my-[4rem] flex-col gap-8 lg:flex-row">
          <form className="py-4 pr-4 w-full lg:w-[35%]" onSubmit={handleSubmit}>
            <h1 className="text-3xl font-bold font-body">Account Details</h1>

            <TextField
              label="Username (required)"
              name="username"
              value={username}
              onChange={handleChange}
              autoComplete="username"
              disabled={isSubmitting}
            />
            <TextField
              label="Email Address (required)"
              name="email"
              type="email"
              value={email}
              onChange={handleChange}
              autoComplete="email"
              disabled={isSubmitting}
            />
            <div className="my-4">
              <label
                htmlFor="password"
                className="w-full font-body block text-[1rem] font-normal text-black"
              >
                Choose a Password (required)
              </label>
              <input
                id="password"
                type="password"
                name="password"
                value={password}
                required
                autoComplete="new-password"
                disabled={isSubmitting}
                className="w-full border-[1px] px-5 py-2 bg-[#fafafa] rounded-tl-3xl outline-none border-[#b71717] shadow-sm mt-2 rounded-md text-[#5c5c5c] font-body focus:shadow-lg duration-300 focus:border-[#0000002e] disabled:cursor-not-allowed"
                onChange={handleChange}
              />
              <PasswordStrengthIndicator level={passwordStrength} />
            </div>
            <p className="bg-[#fafafa] p-3 font-heading text-[#737373] font-light text-[.9rem] tracking-wide mb-4">
              {`Hint: The password should be at least twelve characters long. To make it stronger, use
              upper and lower case letters, numbers, and symbols like ! " ? $ % ^ & .`}
            </p>

            <div className="space-y-3">
              {error && <StatusMessage variant="error">{error}</StatusMessage>}
              {successMessage && <StatusMessage variant="success">{successMessage}</StatusMessage>}
            </div>

            <div className="mt-6">
              <SubmitButton loading={isSubmitting} />
            </div>
          </form>

          <div className="p-4 w-full lg:w-[65%]">
            <h1 className="text-3xl font-bold font-body">Profile Details</h1>
            <TextField
              label="Name (required)"
              name="name"
              value={name}
              onChange={handleChange}
              autoComplete="name"
              disabled={isSubmitting}
            />
            <p className="font-light italic text-[#737373] text-sm my-2">
              This field may be seen by: <span className="font-semibold">Everyone</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPageClient;
