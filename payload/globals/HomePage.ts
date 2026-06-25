import type { GlobalConfig } from "payload";

export const HomePage: GlobalConfig = {
  slug: "home",
  label: "Ana Sayfa",
  admin: { group: "İçerik" },
  access: { read: () => true },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Hero",
          fields: [
            { name: "heroTagline", type: "textarea", label: "Slogan", localized: true },
            { name: "heroIntro", type: "textarea", label: "Giriş metni", localized: true },
            {
              name: "ratingValue",
              type: "text",
              label: "Google puanı",
              defaultValue: "4.9",
            },
            {
              name: "reviewsText",
              type: "text",
              label: "Değerlendirme metni",
              localized: true,
              defaultValue: "1.000+ Google değerlendirmesi",
            },
            { name: "yearsValue", type: "number", label: "Yıl (deneyim)", defaultValue: 17 },
          ],
        },
        {
          label: "Hikâye",
          fields: [
            { name: "storyHeading", type: "text", label: "Başlık", localized: true },
            { name: "storyBody", type: "richText", label: "Metin", localized: true },
            {
              name: "storyStats",
              type: "array",
              label: "İstatistikler",
              labels: { singular: "İstatistik", plural: "İstatistikler" },
              fields: [
                { name: "value", type: "text", label: "Değer" },
                { name: "label", type: "text", label: "Etiket", localized: true },
              ],
            },
          ],
        },
        {
          label: "Hizmetler",
          fields: [
            {
              name: "serviceGroups",
              type: "array",
              label: "Hizmet grupları",
              labels: { singular: "Grup", plural: "Gruplar" },
              fields: [
                { name: "category", type: "text", label: "Kategori", localized: true },
                {
                  name: "items",
                  type: "array",
                  label: "Hizmetler",
                  fields: [
                    { name: "name", type: "text", label: "Hizmet", localized: true },
                    { name: "price", type: "text", label: "Fiyat" },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: "Galeri",
          fields: [
            {
              name: "gallery",
              type: "array",
              label: "Galeri görselleri",
              fields: [
                { name: "image", type: "upload", relationTo: "media", label: "Görsel" },
                { name: "caption", type: "text", label: "Açıklama", localized: true },
              ],
            },
          ],
        },
        {
          label: "Yorumlar",
          fields: [
            {
              name: "reviews",
              type: "array",
              label: "Müşteri yorumları",
              fields: [
                { name: "quote", type: "textarea", label: "Yorum", localized: true },
                { name: "name", type: "text", label: "İsim" },
                { name: "source", type: "text", label: "Kaynak", defaultValue: "Google" },
              ],
            },
          ],
        },
        {
          label: "Çağrı (CTA)",
          fields: [
            { name: "ctaHeading", type: "text", label: "Başlık", localized: true },
            { name: "ctaText", type: "textarea", label: "Metin", localized: true },
          ],
        },
      ],
    },
  ],
};
