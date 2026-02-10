import type { Metadata } from "next";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "@/app/styles/global.css";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";

export const metadata: Metadata = {
  title: "Next-Skill Sphere",
  description:
    "NextSkill Sphere a Robust Education and Online Learning Website featuring Online Teaching, Online Courses, Learning materials, elearning services.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"
        />
        <meta property="og:title" content="Next-Skill Sphere" />
        <meta
          property="og:description"
          content="NextSkill Sphere a Robust Education and Online Learning Website featuring Online Teaching, Online Courses, Learning materials, elearning services."
        />

        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
        />

        <meta
          property="og:url"
          content="https://next-skill-sphere.vercel.app/"
        />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Next Skill Sphere" />
      </head>
      <body className="antialiased">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
