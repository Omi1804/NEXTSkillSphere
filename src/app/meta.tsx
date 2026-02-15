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

const MetaTags = () => {
  return (
    <head>
      {/* Favicon Icons */}
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/favicon_io/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon_io/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon_io/favicon-16x16.png"
      />
      <link rel="manifest" href="/favicon_io/site.webmanifest" />

      {/* Og Meta tags */}
      <meta property="og:title" content="Next-Skill Sphere" />
      <meta
        property="og:description"
        content="NextSkill Sphere a Robust Education and Online Learning Website featuring Online Teaching, Online Courses, Learning materials, elearning services."
      />
      <meta
        name="google-site-verification"
        content="eTWlqZ5dSSO4G_6WfFaPlVYaB7S6M_0zCXTkeIrQMxg"
      />

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

      {/* Google Fonts */}
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"
      />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
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

export default MetaTags;
