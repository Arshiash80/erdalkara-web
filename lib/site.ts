// Central site/business constants used across metadata, JSON-LD, sitemap, OG.

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://erdalkara.com.tr"
).replace(/\/$/, "");

export const SITE = {
  name: "Erdal Kara Hair Design",
  shortName: "Erdal Kara",
  url: SITE_URL,
  // Turkish (primary)
  description:
    "Bursa Osmangazi'de 2008'den beri hizmet veren usta erkek kuaförü. Saç kesimi, sakal tasarımı, cilt bakımı ve daha fazlası. 4.9★ Google puanı, 1.000+ değerlendirme.",
  descriptionEn:
    "Master men's barber in Osmangazi, Bursa since 2008. Haircuts, beard design, skin care and more. 4.9★ on Google with 1,000+ reviews.",
  locale: "tr_TR",
  altLocale: "en_US",
  keywords: [
    "Bursa erkek kuaför",
    "Bursa berber",
    "Osmangazi kuaför",
    "saç kesimi Bursa",
    "sakal tasarımı",
    "Erdal Kara Hair Design",
    "men's barber Bursa",
  ],
} as const;

export const BUSINESS = {
  legalName: "Erdal Kara Hair Design",
  telephone: "+905324567480",
  telephoneDisplay: "+90 532 456 74 80",
  email: "info@erdalkara.com.tr",
  bookingUrl: "https://www.kolayrandevu.com/kisi/erdal-kara78",
  priceRange: "₺₺",
  address: {
    street: "Soğanlı Mah. 3. Meltem Sok. No:23B",
    locality: "Osmangazi",
    region: "Bursa",
    postalCode: "16190",
    country: "TR",
  },
  geo: { lat: 40.2206, lng: 28.9637 }, // approximate (Soğanlı, Osmangazi)
  rating: { value: 4.9, count: 1019 },
  // Mon–Sat 09:00–21:00, Sun 10:00–20:00
  hours: [
    { days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], opens: "09:00", closes: "21:00" },
    { days: ["Sunday"], opens: "10:00", closes: "20:00" },
  ],
  sameAs: [
    "https://www.instagram.com/erdalkarahairdesign",
    "https://www.facebook.com/kuaforerdalkara",
  ],
  mapsUrl:
    "https://www.google.com/maps?q=Erdal+Kara+Hair+Design+So%C4%9Fanl%C4%B1+Osmangazi+Bursa",
} as const;

// JSON-LD for the salon (LocalBusiness / HairSalon).
export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "HairSalon",
    "@id": `${SITE_URL}/#business`,
    name: SITE.name,
    image: `${SITE_URL}/opengraph-image`,
    url: SITE_URL,
    telephone: BUSINESS.telephone,
    email: BUSINESS.email,
    priceRange: BUSINESS.priceRange,
    currenciesAccepted: "TRY",
    address: {
      "@type": "PostalAddress",
      streetAddress: BUSINESS.address.street,
      addressLocality: BUSINESS.address.locality,
      addressRegion: BUSINESS.address.region,
      postalCode: BUSINESS.address.postalCode,
      addressCountry: BUSINESS.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: BUSINESS.geo.lat,
      longitude: BUSINESS.geo.lng,
    },
    hasMap: BUSINESS.mapsUrl,
    openingHoursSpecification: BUSINESS.hours.map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: h.days,
      opens: h.opens,
      closes: h.closes,
    })),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: BUSINESS.rating.value,
      reviewCount: BUSINESS.rating.count,
      bestRating: 5,
    },
    sameAs: BUSINESS.sameAs,
    areaServed: { "@type": "City", name: "Bursa" },
    foundingDate: "2008",
  };
}
