import { Helmet } from "react-helmet-async";

/*
  =======================================
  SEO COMPONENT – 2026 READY
  =======================================
*/

type SEOProps = {
  title: string;
  description: string;
  keywords?: string;
};

export default function SEO({
  title,
  description,
  keywords,
}: SEOProps) {
  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content="Premass Overseas Services" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />

      {/* Mobile */}
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Helmet>
  );
}
