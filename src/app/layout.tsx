import type { Metadata } from "next";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "@/app/styles/global.css";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import MetaTags from "./meta";

export const metadata: Metadata = {
  title: "Skill Sphere",
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
      <MetaTags />
      <body className="antialiased">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
