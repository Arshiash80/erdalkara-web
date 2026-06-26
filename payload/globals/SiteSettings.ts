import type { GlobalConfig } from "payload";

export const SiteSettings: GlobalConfig = {
  slug: "settings",
  label: "Site Ayarları",
  admin: {
    group: "İçerik",
    description:
      "İletişim bilgileri, çalışma saatleri ve sosyal medya bağlantıları. Buradaki bilgiler sitenin İLETİŞİM bölümünde ve en alttaki (footer) her sayfada görünür. Değiştirip 'Kaydet' deyince site güncellenir.",
  },
  access: { read: () => true },
  fields: [
    {
      type: "collapsible",
      label: "İletişim",
      admin: { description: "Telefon, WhatsApp, e-posta ve adres." },
      fields: [
        {
          name: "phone",
          type: "text",
          label: "Telefon",
          defaultValue: "+90 532 456 74 80",
          admin: {
            description:
              "Görünen telefon numarası. Ziyaretçi tıklayınca arama başlar. (İletişim bölümü + footer)",
          },
        },
        {
          name: "whatsapp",
          type: "text",
          label: "WhatsApp numarası",
          defaultValue: "905324567480",
          admin: {
            description:
              "WhatsApp düğmesi için numara. Sadece rakam, başında ülke kodu (90), boşluk/işaret yok. Örn: 905324567480",
          },
        },
        {
          name: "email",
          type: "text",
          label: "E-posta",
          defaultValue: "info@erdalkara.com.tr",
          admin: { description: "İletişim e-posta adresi." },
        },
        {
          name: "address",
          type: "textarea",
          label: "Adres",
          localized: true,
          defaultValue: "Soğanlı Mah. 3. Meltem Sok. No:23B, Osmangazi / Bursa",
          admin: { description: "Açık adres. İletişim bölümünde ve footer'da görünür." },
        },
      ],
    },
    {
      name: "hours",
      type: "array",
      label: "Çalışma saatleri",
      admin: {
        description:
          "Her satır bir gün aralığı. Sıraları sürükleyerek değiştirebilirsiniz. (İletişim bölümünde görünür.)",
      },
      fields: [
        {
          name: "label",
          type: "text",
          label: "Gün(ler)",
          localized: true,
          admin: { description: "Gün aralığı (örn: Pazartesi – Cumartesi)." },
        },
        {
          name: "value",
          type: "text",
          label: "Saat",
          admin: { description: "Açık olduğu saatler (örn: 09:00 – 21:00)." },
        },
      ],
    },
    {
      type: "collapsible",
      label: "Bağlantılar",
      admin: { description: "Randevu, sosyal medya, harita ve Google değerlendirme bağlantıları." },
      fields: [
        {
          name: "bookingUrl",
          type: "text",
          label: "Randevu (KolayRandevu) bağlantısı",
          defaultValue: "https://www.kolayrandevu.com/kisi/erdal-kara78",
          admin: {
            description:
              "Sitedeki tüm 'Randevu Al' düğmeleri bu adrese gider. Tam bağlantıyı (https:// ile) yapıştırın.",
          },
        },
        {
          name: "instagram",
          type: "text",
          label: "Instagram",
          defaultValue: "https://www.instagram.com/erdalkarahairdesign",
          admin: { description: "Instagram sayfanızın tam bağlantısı." },
        },
        {
          name: "facebook",
          type: "text",
          label: "Facebook",
          defaultValue: "https://www.facebook.com/kuaforerdalkara",
          admin: { description: "Facebook sayfanızın tam bağlantısı." },
        },
        {
          name: "googleMaps",
          type: "text",
          label: "Google Haritalar bağlantısı",
          admin: { description: "'Yol Tarifi' düğmesi bu adrese gider (Google Haritalar bağlantısı)." },
        },
        {
          name: "googleReviewUrl",
          type: "text",
          label: "Google değerlendirme (yorum bırakma) bağlantısı",
          admin: {
            description:
              "Müşterilerin Google'da yorum bırakması için bağlantı. Sitede 'Google'da değerlendirin' düğmesi olarak görünür. Boş bırakılırsa bu düğmeler gizlenir.",
          },
        },
        {
          name: "mapEmbedUrl",
          type: "textarea",
          label: "Harita gömme (embed) URL",
          admin: {
            description:
              "İletişim bölümündeki gömülü harita. Teknik bir alandır; emin değilseniz dokunmayın.",
          },
        },
      ],
    },
  ],
};
