import type { Metadata } from "next";
import "../globals.css";
import "../_design/design.css";
import "../overrides.css";
import { SITE, SITE_URL, localBusinessJsonLd } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Erdal Kara Hair Design — Bursa Erkek Kuaförü",
    template: "%s — Erdal Kara Hair Design",
  },
  description: SITE.description,
  keywords: [...SITE.keywords],
  applicationName: SITE.name,
  authors: [{ name: SITE.name }],
  creator: SITE.name,
  publisher: SITE.name,
  alternates: {
    canonical: "/",
    languages: {
      "tr-TR": "/",
      "en-US": "/",
      "x-default": "/",
    },
  },
  openGraph: {
    type: "website",
    siteName: SITE.name,
    title: "Erdal Kara Hair Design — Bursa Erkek Kuaförü",
    description: SITE.description,
    url: SITE_URL,
    locale: SITE.locale,
    alternateLocale: [SITE.altLocale],
  },
  twitter: {
    card: "summary_large_image",
    title: "Erdal Kara Hair Design — Bursa Erkek Kuaförü",
    description: SITE.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  category: "Beauty & Personal Care",
  formatDetection: { telephone: true, address: true, email: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,300;0,6..72,400;0,6..72,500;0,6..72,600;1,6..72,300;1,6..72,400;1,6..72,500&family=Hanken+Grotesk:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {children}
        <script
          type="application/ld+json"
          // Structured data for the salon (LocalBusiness / HairSalon).
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessJsonLd()),
          }}
        />
      </body>
    </html>
  );
}
