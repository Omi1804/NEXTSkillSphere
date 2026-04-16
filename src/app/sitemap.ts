import { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";
import { getAllPublishedCourses } from "@/repositories/courses.repository";

const publicRoutes = [
  { path: "/", changeFrequency: "weekly" as const, priority: 1 },
  { path: "/about", changeFrequency: "monthly" as const, priority: 0.7 },
  { path: "/services", changeFrequency: "monthly" as const, priority: 0.75 },
  { path: "/courses", changeFrequency: "daily" as const, priority: 0.9 },
  { path: "/contact", changeFrequency: "monthly" as const, priority: 0.65 },
  { path: "/privacy-policy", changeFrequency: "yearly" as const, priority: 0.35 },
  { path: "/terms", changeFrequency: "yearly" as const, priority: 0.35 },
  { path: "/refund-policy", changeFrequency: "yearly" as const, priority: 0.35 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();
  const staticEntries: MetadataRoute.Sitemap = publicRoutes.map((route) => ({
    url: absoluteUrl(route.path),
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  try {
    const courses = await getAllPublishedCourses();

    return [
      ...staticEntries,
      ...courses.map((course) => ({
        url: absoluteUrl(`/courses/${course.id}`),
        lastModified: course.updatedAt ? new Date(course.updatedAt) : lastModified,
        changeFrequency: "weekly" as const,
        priority: 0.85,
      })),
    ];
  } catch (error) {
    console.error("Unable to fetch dynamic course URLs for sitemap:", error);
    return staticEntries;
  }
}
