import Head from "next/head";
import { FC } from "react";

const SEOMetaData: FC = () => {
  return (
    <Head>
      <title>JSON to TypeScript Interface Generator</title>
      <link rel="icon" type="image/png" href="/favicon.png" />
      <link rel="canonical" href="https://json2ts.vercel.app/" />
      <meta name="description" content="Generate TypeScript Interfaces from JSON. Paste JSON and get interfaces instantly. Open-source and easy to use." />
      <meta name="keywords" content="json to typescript, json to ts, typescript interface generator, open source" />
      <meta property="og:title" content="JSON to TypeScript Interface Generator" />
      <meta property="og:description" content="Generate TypeScript Interfaces from JSON instantly. Open-source and easy to use." />
      <meta property="og:url" content="https://json2ts.vercel.app/" />
      <meta property="og:type" content="website" />
      <meta property="og:image" content="https://json2ts.vercel.app/twitter-large-card.jpg" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="JSON to TypeScript Interface Generator" />
      <meta name="twitter:description" content="Generate TypeScript Interfaces from JSON instantly. Open-source and easy to use." />
      <meta name="twitter:image" content="https://json2ts.vercel.app/twitter-large-card.jpg" />
    </Head>
  );
};

export default SEOMetaData;
