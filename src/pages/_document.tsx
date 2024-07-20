import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"
        />
        <meta property="og:title" content="Next-Skill Sphere" />
        <meta
          property="og:description"
          content="NextSkill Sphere a Robust Education and Online Learning Website featuring Online Teaching, Online Courses, Learning materials, elearning services."
        />

        <meta
          property="og:url"
          content="https://next-skill-sphere.vercel.app/"
        />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Next Skill Sphere" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
