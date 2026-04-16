import type { Metadata } from "next";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "../globals.css";
import "lenis/dist/lenis.css";
import { Poppins, Roboto } from "next/font/google";
import Header from "@/components/Header/Header";
import Footer from "@/components/ui/Footer";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import ChatAssistantWidget from "@/components/ChatAssistant/ChatAssistantWidget";
import InitialPageLoader from "@/components/Loading/InitialPageLoader";
import JsonLd from "@/components/seo/JsonLd";
import {
  INDEXABLE_ROBOTS,
  absoluteUrl,
  buildOrganizationSchema,
  buildWebsiteSchema,
  metadataBase,
  siteConfig,
} from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase,
  applicationName: siteConfig.name,
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [...siteConfig.keywords],
  authors: [{ name: siteConfig.name, url: siteConfig.siteUrl }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  category: "education",
  classification: "Education",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.siteUrl,
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    type: "website",
    images: [
      {
        url: absoluteUrl(siteConfig.defaultOgImage),
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} preview`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [absoluteUrl(siteConfig.defaultOgImage)],
  },
  robots: INDEXABLE_ROBOTS,
  verification: {
    google: siteConfig.googleSiteVerification,
  },
  icons: {
    icon: [
      { url: "/favicon_io/favicon.ico" },
      { url: "/favicon_io/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon_io/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/favicon_io/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/favicon_io/site.webmanifest",
  appleWebApp: {
    capable: true,
    title: siteConfig.shortName,
    statusBarStyle: "default",
  },
  formatDetection: {
    address: false,
    email: false,
    telephone: false,
  },
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
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined"
        />
      </head>
      <body className={`${poppins.variable} ${roboto.variable} antialiased`}>
        <JsonLd data={[buildOrganizationSchema(), buildWebsiteSchema()]} />
        <SmoothScrollProvider>
          <InitialPageLoader />
          <Header />
          <main className="pt-[113px]">{children}</main>
          <Footer />
          <ChatAssistantWidget />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
