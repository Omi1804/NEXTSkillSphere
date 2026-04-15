import { MetadataRoute } from "next";

const publicRoutes = [
  "",
  "/about",
  "/services",
  "/courses",
  "/cart",
  "/wishlist",
  "/contact",
  "/login",
  "/register",
  "/privacy-policy",
  "/terms",
  "/refund-policy",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return publicRoutes.map((route) => ({
    url: `https://next-skill-sphere.vercel.app${route}`,
    lastModified: new Date(),
  }));
}
