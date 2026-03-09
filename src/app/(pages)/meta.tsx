const SITE_URL = "https://next-skill-sphere.vercel.app/";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Skill Sphere",
  url: SITE_URL,
  description:
    "Skill Sphere is a course platform to learn modern tech skills with practical projects.",

  logo: "https://next-skill-sphere.vercel.app/favicon_io/android-chrome-192x192.png",
};

export const MetaTags = () => {
  return (
    <head>
      {/* Favicon Icons */}
      <link rel="apple-touch-icon" sizes="180x180" href="/favicon_io/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon_io/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon_io/favicon-16x16.png" />
      <link rel="manifest" href="/favicon_io/site.webmanifest" />

      {/* Og Meta tags */}
      <meta property="og:title" content="Next-Skill Sphere" />
      <meta
        property="og:description"
        content="Skill Sphere is a course platform to learn modern tech skills with practical projects."
      />
      <meta name="google-site-verification" content="eTWlqZ5dSSO4G_6WfFaPlVYaB7S6M_0zCXTkeIrQMxg" />

      <meta property="og:url" content="https://next-skill-sphere.vercel.app/" />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Skill Sphere" />
      <meta
        property="og:image"
        content="https://next-skill-sphere.vercel.app/favicon_io/og-cover.png"
      />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter Meta tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Next-Skill Sphere" />
      <meta
        name="twitter:description"
        content="NextSkill Sphere a Robust Education and Online Learning Website featuring Online Teaching, Online Courses, Learning materials, elearning services."
      />
      <meta
        name="twitter:image"
        content="https://next-skill-sphere.vercel.app/favicon_io/og-cover.png"
      />
      <meta name="twitter:site" content="@nextskillsphere" />
      <meta name="twitter:creator" content="@nextskillsphere" />

      {/* Google Icons */}

      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined"
      />

      {/* scripts */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({ organizationSchema }),
        }}
      />
    </head>
  );
};
