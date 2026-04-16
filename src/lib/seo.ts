import type { Metadata } from "next";
import type { Course } from "@/types/course.types";

const FALLBACK_SITE_URL = "https://elearni.devomini.com";
const DEFAULT_OG_IMAGE_PATH = "/favicon_io/og-cover.png";

const normalizeSiteUrl = (value?: string) => {
  if (!value) {
    return FALLBACK_SITE_URL;
  }

  const withProtocol = value.startsWith("http") ? value : `https://${value}`;
  return withProtocol.endsWith("/") ? withProtocol.slice(0, -1) : withProtocol;
};

export const siteConfig = {
  name: "eLearni",
  shortName: "eLearni",
  locale: "en_US",
  siteUrl: normalizeSiteUrl(
    process.env.NEXT_PUBLIC_SITE_URL ||
      process.env.SITE_URL ||
      process.env.VERCEL_PROJECT_PRODUCTION_URL ||
      process.env.VERCEL_URL,
  ),
  description:
    "eLearni helps ambitious learners build job-ready tech skills through expert-led online courses, practical projects, and flexible learning paths.",
  defaultOgImage: DEFAULT_OG_IMAGE_PATH,
  googleSiteVerification: "eTWlqZ5dSSO4G_6WfFaPlVYaB7S6M_0zCXTkeIrQMxg",
  keywords: [
    "eLearni",
    "online learning platform",
    "tech courses",
    "self-paced courses",
    "practical projects",
    "career upskilling",
    "digital learning",
    "course marketplace",
    "professional education",
    "learn tech online",
  ],
} as const;

export const metadataBase = new URL(siteConfig.siteUrl);

const trimSlashes = (value: string) => value.replace(/^\/+|\/+$/g, "");

export const absoluteUrl = (path = "/") => {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return new URL(normalizedPath, siteConfig.siteUrl).toString();
};

export const summarizeText = (value: string, maxLength = 160) => {
  const normalized = value.replace(/\s+/g, " ").trim();

  if (normalized.length <= maxLength) {
    return normalized;
  }

  return `${normalized.slice(0, maxLength - 1).trimEnd()}...`;
};

export const INDEXABLE_ROBOTS: NonNullable<Metadata["robots"]> = {
  index: true,
  follow: true,
  googleBot: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
  },
};

export const NOINDEX_ROBOTS: NonNullable<Metadata["robots"]> = {
  index: false,
  follow: false,
  nocache: true,
  googleBot: {
    index: false,
    follow: false,
    noimageindex: true,
    "max-image-preview": "none",
    "max-snippet": 0,
    "max-video-preview": 0,
  },
};

type CreatePageMetadataOptions = {
  title: string;
  description: string;
  path?: string;
  image?: string;
  keywords?: string[];
  noIndex?: boolean;
  openGraphType?: "website" | "article";
};

export const createPageMetadata = ({
  title,
  description,
  path = "/",
  image = siteConfig.defaultOgImage,
  keywords = [],
  noIndex = false,
  openGraphType = "website",
}: CreatePageMetadataOptions): Metadata => {
  const canonicalPath = path === "/" ? "/" : `/${trimSlashes(path)}`;
  const dedupedKeywords = Array.from(new Set([...siteConfig.keywords, ...keywords]));
  const fullTitle = title === siteConfig.name ? title : `${title} | ${siteConfig.name}`;

  return {
    title,
    description,
    keywords: dedupedKeywords,
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      title: fullTitle,
      description,
      url: absoluteUrl(canonicalPath),
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type: openGraphType,
      images: [
        {
          url: absoluteUrl(image),
          width: 1200,
          height: 630,
          alt: `${siteConfig.name} preview`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [absoluteUrl(image)],
    },
    robots: noIndex ? NOINDEX_ROBOTS : INDEXABLE_ROBOTS,
  };
};

export const buildOrganizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteConfig.name,
  url: siteConfig.siteUrl,
  description: siteConfig.description,
  logo: absoluteUrl("/favicon_io/android-chrome-512x512.png"),
});

export const buildWebsiteSchema = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: siteConfig.name,
  url: siteConfig.siteUrl,
  description: siteConfig.description,
  inLanguage: "en",
  publisher: {
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.siteUrl,
  },
});

export const buildBreadcrumbSchema = (
  items: Array<{
    name: string;
    path: string;
  }>,
) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: absoluteUrl(item.path),
  })),
});

export const buildCourseSchema = (course: Course) => ({
  "@context": "https://schema.org",
  "@type": "Course",
  name: course.title,
  description: summarizeText(course.description, 400),
  provider: {
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.siteUrl,
  },
  educator: course.instructor
    ? {
        "@type": "Person",
        name: course.instructor,
      }
    : undefined,
  courseMode: "online",
  image: course.imageLink ? absoluteUrl(course.imageLink) : absoluteUrl(DEFAULT_OG_IMAGE_PATH),
  offers: {
    "@type": "Offer",
    url: absoluteUrl(`/courses/${course.id}`),
    price: course.price,
    priceCurrency: "INR",
    availability: "https://schema.org/InStock",
    category: "Online Course",
  },
});
