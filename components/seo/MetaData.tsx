import Head from "next/head";
import { FC } from "react";

const SEOMetaData: FC = () => {
  return (
    <Head>
      <title>JSON to Typescript Interface Generator</title>
      <link rel="icon" type="image/png" href="/favicon.png"></link>
      <meta name="description" content="Generate TypeScript Interfaces from JSON, Paste JSON and Get Interface, Open-Source, Easy to use." />
      <meta property="og:url" content="https://json2ts.yash.cool/" />
      <meta property="og:type" content="website" />
      <meta name="keywords" content="json to typescript, open source" />
      <meta property="og:description" content="Generate Typescript Interfaces from JSON" />
      <meta property="og:image" content="https://json2ts.yash.cool/twitter-large-card.jpg" />
    </Head>
  );
};

export default SEOMetaData;
