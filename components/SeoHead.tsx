'use client';

import Head from 'next/head';
import { usePathname } from 'next/navigation';

/**
 * SEO component that sets dynamic title and meta tags.
 * Usage: place <SeoHead /> at the top of any page component.
 */
export default function SeoHead({
  title = 'Que Vendes',
  description = 'Plataforma para que emprendedores y negocios locales se den a conocer y vendan sus productos.',
  image,
}: {
  title?: string;
  description?: string;
  image?: string;
}) {
  const pathname = usePathname() || '/';
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const baseUrl = siteUrl.startsWith('http') ? siteUrl : `https://${siteUrl}`;
  const url = `${baseUrl}${pathname}`;

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      {image && <meta property="og:image" content={image} />}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {image && <meta name="twitter:image" content={image} />}
      <link rel="canonical" href={url} />
    </Head>
  );
}
