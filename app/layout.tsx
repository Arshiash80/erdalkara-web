import type { Metadata } from "next";
import "./globals.css";
import "./_design/design.css";
import "./overrides.css";

export const metadata: Metadata = {
  title: "Erdal Kara Hair Design — Bursa Erkek Kuaförü",
  description:
    "2008'den bu yana Bursa Osmangazi'de usta berberlerden oluşan bir aile. Saç kesimi, sakal tasarımı, cilt bakımı ve daha fazlası. 4.9★ Google puanı.",
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
      <body>{children}</body>
    </html>
  );
}
