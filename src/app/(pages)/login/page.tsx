import CommonHero from "@/components/CommonHero";
import LoginPageClient from "@/components/Login/LoginPageClient";
import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import { Suspense } from "react";

export const metadata: Metadata = createPageMetadata({
  title: "Login",
  description: "Sign in to your eLearni account to continue your learning journey.",
  path: "/login",
  noIndex: true,
});

const LoginPage = () => {
  return (
    <Suspense>
      <CommonHero Image="/breadcrumb-whyus.png" heroHeading="Login" subHeading="LOGIN" />
      <LoginPageClient />
    </Suspense>
  );
};

export default LoginPage;
