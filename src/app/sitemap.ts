import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://next-skill-sphere.vercel.app/",
      lastModified: new Date(),
    },
    {
      url: "https://next-skill-sphere.vercel.app/services",
      lastModified: new Date(),
    },
  ];
}
