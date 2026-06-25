import type { GlobalConfig } from "payload";

export const SiteSettings: GlobalConfig = {
  slug: "settings",
  label: "Site Ayarları",
  admin: { group: "İçerik" },
  access: { read: () => true },
  fields: [
    {
      type: "collapsible",
      label: "İletişim",
      fields: [
        { name: "phone", type: "text", label: "Telefon", defaultValue: "+90 532 456 74 80" },
        { name: "whatsapp", type: "text", label: "WhatsApp numarası", defaultValue: "905324567480" },
        { name: "email", type: "text", label: "E-posta", defaultValue: "info@erdalkara.com.tr" },
        {
          name: "address",
          type: "textarea",
          label: "Adres",
          localized: true,
          defaultValue: "Soğanlı Mah. 3. Meltem Sok. No:23B, Osmangazi / Bursa",
        },
      ],
    },
    {
      name: "hours",
      type: "array",
      label: "Çalışma saatleri",
      fields: [
        { name: "label", type: "text", label: "Gün(ler)", localized: true },
        { name: "value", type: "text", label: "Saat" },
      ],
    },
    {
      type: "collapsible",
      label: "Bağlantılar",
      fields: [
        {
          name: "bookingUrl",
          type: "text",
          label: "Randevu (KolayRandevu) bağlantısı",
          defaultValue: "https://www.kolayrandevu.com/kisi/erdal-kara78",
        },
        { name: "instagram", type: "text", label: "Instagram", defaultValue: "https://www.instagram.com/erdalkarahairdesign" },
        { name: "facebook", type: "text", label: "Facebook", defaultValue: "https://www.facebook.com/kuaforerdalkara" },
        { name: "googleMaps", type: "text", label: "Google Haritalar bağlantısı" },
        { name: "mapEmbedUrl", type: "textarea", label: "Harita gömme (embed) URL" },
      ],
    },
  ],
};
