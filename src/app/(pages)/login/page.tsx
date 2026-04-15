import CommonHero from "@/components/CommonHero";
import LoginPageClient from "@/components/Login/LoginPageClient";

const LoginPage = () => {
  // seperate login page
  return (
    <>
      <CommonHero Image="/breadcrumb-whyus.png" heroHeading="Login" subHeading="LOGIN" />
      <LoginPageClient />
    </>
  );
};

export default LoginPage;
