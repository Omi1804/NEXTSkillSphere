import RegisterPageClient from "@/components/Register/RegisterPageClient";
import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Create an account",
  description: "Create your eLearni account to enroll in courses and track your learning.",
  path: "/register",
  noIndex: true,
});

const RegisterPage = () => {
  return <RegisterPageClient />;
};

export default RegisterPage;
