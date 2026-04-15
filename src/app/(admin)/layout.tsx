import type { Metadata } from "next";
import "../globals.css";
import { Poppins, Roboto } from "next/font/google";

export const metadata: Metadata = {
  title: "Skill Sphere Admin",
  description: "Course management dashboard for Skill Sphere.",
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

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined"
        />
      </head>
      <body className={`${poppins.variable} ${roboto.variable} antialiased`}>{children}</body>
    </html>
  );
}
