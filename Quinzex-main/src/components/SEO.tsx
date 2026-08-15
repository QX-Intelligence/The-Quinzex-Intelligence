import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  type?: string;
  url?: string;
  image?: string;
  jsonLd?: Record<string, any> | Record<string, any>[];
}

const SEO: React.FC<SEOProps> = ({
  title = "Quinzex Intelligence | Premium Digital Solutions & Innovation",
  description = "Quinzex Intelligence is a premium freelancing collective delivering high-impact, intelligent digital solutions. We build next-generation web experiences with precision and innovation.",
  keywords = "quinzex, digital solutions, web development, web apps, react, nextjs, freelancing, premium web design",
  type = "website",
  url = "https://www.quinzexintelligence.com",
  image = "https://www.quinzexintelligence.com/favicon.png",
  jsonLd
}) => {
  const fullTitle = title === "Quinzex Intelligence | Premium Digital Solutions & Innovation" 
    ? title 
    : `${title} | Quinzex Intelligence`;

  return (
    <Helmet>
      {/* Standard Metadata */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Conditional JSON-LD */}
      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
