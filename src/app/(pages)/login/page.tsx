import CommonHero from "@/components/CommonHero";
import LoginPageClient from "@/components/Login/LoginPageClient";
import { Suspense } from "react";

const LoginPage = () => {
  return (
    <Suspense>
      <CommonHero Image="/breadcrumb-whyus.png" heroHeading="Login" subHeading="LOGIN" />
      <LoginPageClient />
    </Suspense>
  );
};

export default LoginPage;
