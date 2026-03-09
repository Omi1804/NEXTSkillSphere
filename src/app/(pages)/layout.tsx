import type { Metadata } from "next";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "@/app/styles/global.css";
import { Poppins, Roboto } from "next/font/google";
import Header from "@/components/Header/Header";
import Footer from "@/components/ui/Footer";
import { MetaTags } from "./meta";

export const metadata: Metadata = {
  title: "Skill Sphere",
  description:
    "NextSkill Sphere a Robust Education and Online Learning Website featuring Online Teaching, Online Courses, Learning materials, elearning services.",
};

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-poppins",
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
  display: "swap",
  variable: "--font-roboto",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <MetaTags />
      <body className={`${poppins.variable} ${roboto.variable} antialiased`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
