import type { Metadata } from "next";
import "../globals.css";
import { Poppins, Roboto } from "next/font/google";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "eLearni Admin",
  description: "Admin dashboard for managing eLearni courses, lessons, publishing, and assets.",
  path: "/admin",
  noIndex: true,
});

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
