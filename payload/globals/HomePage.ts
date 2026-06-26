import type { GlobalConfig } from "payload";

// Owner-facing CMS: every field has a plain-Turkish description telling the
// owner WHAT it changes and WHERE it appears on the site. Localized fields
// (slogan, metinler, hizmet adları vb.) have a TR/EN switch at the top of the
// page — Türkçe ana dil, İngilizce ikinci dil.

export const HomePage: GlobalConfig = {
  slug: "home",
  label: "Ana Sayfa",
  admin: {
    group: "İçerik",
    description:
      "Sitenin ana (giriş) sayfasının içeriği. Buradaki alanları değiştirip 'Kaydet' deyince site birkaç saniye içinde güncellenir. Sayfayı yenileyerek (F5) değişikliği görebilirsiniz. Sağ üstteki TR / EN düğmesiyle Türkçe ve İngilizce metinleri ayrı ayrı girebilirsiniz.",
  },
  access: { read: () => true },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Hero",
          description:
            "Sayfanın en üstü — ziyaretçinin ilk gördüğü bölüm (büyük başlık, slogan ve Google puanı).",
          fields: [
            {
              name: "heroTagline",
              type: "textarea",
              label: "Slogan",
              localized: true,
              admin: {
                description:
                  "En üstteki büyük italik cümle. Örn: 'Saç kesmiyoruz; stil ve sakin bir özgüven tasarlıyoruz.'",
              },
            },
            {
              name: "heroIntro",
              type: "textarea",
              label: "Giriş metni",
              localized: true,
              admin: {
                description:
                  "Sloganın hemen altındaki kısa tanıtım paragrafı.",
              },
            },
            {
              name: "ratingValue",
              type: "text",
              label: "Google puanı",
              defaultValue: "4.9",
              admin: {
                description:
                  "Sayfada birçok yerde görünen yıldız puanı (örn: 4.9). Sadece sayı yazın.",
              },
            },
            {
              name: "reviewsText",
              type: "text",
              label: "Değerlendirme metni",
              localized: true,
              defaultValue: "1.000+ Google değerlendirmesi",
              admin: {
                description:
                  "Puanın yanındaki yazı. Örn: '1.000+ Google değerlendirmesi'. (Hero ve Yorumlar bölümünde görünür.)",
              },
            },
            {
              name: "yearsValue",
              type: "number",
              label: "Yıl (deneyim)",
              defaultValue: 17,
              admin: {
                description:
                  "Hero görselinin köşesindeki yıl rozeti (örn: 17 yıllık usta işi). Sadece sayı.",
              },
            },
          ],
        },
        {
          label: "Hikâye",
          description: "Ana sayfadaki 'Hikâye' bölümü — salonu anlatan metin ve küçük istatistikler.",
          fields: [
            {
              name: "storyHeading",
              type: "text",
              label: "Başlık",
              localized: true,
              admin: { description: "Hikâye bölümünün büyük başlığı." },
            },
            {
              name: "storyBody",
              type: "richText",
              label: "Metin",
              localized: true,
              admin: {
                description:
                  "Hikâye bölümünün paragrafları. Her satır ayrı bir paragraf olur.",
              },
            },
            {
              name: "storyStats",
              type: "array",
              label: "İstatistikler",
              labels: { singular: "İstatistik", plural: "İstatistikler" },
              admin: {
                description:
                  "Metnin altındaki küçük rakam kutuları (örn: '15+' / 'Belge & ödül').",
              },
              fields: [
                {
                  name: "value",
                  type: "text",
                  label: "Değer",
                  admin: { description: "Büyük yazı (örn: 15+, Aile)." },
                },
                {
                  name: "label",
                  type: "text",
                  label: "Etiket",
                  localized: true,
                  admin: { description: "Altındaki küçük açıklama (örn: 'Belge & ödül')." },
                },
              ],
            },
          ],
        },
        {
          label: "Hizmetler",
          description:
            "Ana sayfadaki 'Hizmetler & Fiyatlar' bölümü. Her grup bir kart olur (örn: Saç, Sakal, Bakım).",
          fields: [
            {
              name: "serviceGroups",
              type: "array",
              label: "Hizmet grupları",
              labels: { singular: "Grup", plural: "Gruplar" },
              admin: {
                description:
                  "Her grup ekranda ayrı bir kart (sütun) olarak görünür. Sıralarını sürükleyerek değiştirebilirsiniz.",
              },
              fields: [
                {
                  name: "category",
                  type: "text",
                  label: "Kategori",
                  localized: true,
                  admin: { description: "Kartın başlığı (örn: Saç, Sakal & Tıraş, Bakım)." },
                },
                {
                  name: "items",
                  type: "array",
                  label: "Hizmetler",
                  admin: { description: "Bu kartın içindeki hizmet + fiyat satırları." },
                  fields: [
                    {
                      name: "name",
                      type: "text",
                      label: "Hizmet",
                      localized: true,
                      admin: { description: "Hizmet adı (örn: Saç Kesimi)." },
                    },
                    {
                      name: "price",
                      type: "text",
                      label: "Fiyat",
                      admin: {
                        description:
                          "Fiyat — para birimiyle birlikte yazın (örn: ₺450). Çevrilmez, her dilde aynı görünür.",
                      },
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: "Galeri",
          description:
            "Ana sayfadaki fotoğraf galerisi. Ziyaretçi bir fotoğrafa tıklayınca büyür.",
          fields: [
            {
              name: "gallery",
              type: "array",
              label: "Galeri görselleri",
              admin: {
                description:
                  "Galeride gösterilecek fotoğraflar. Sırayı sürükleyerek değiştirebilirsiniz. Yatay (geniş) fotoğraflar daha iyi durur.",
              },
              fields: [
                {
                  name: "image",
                  type: "upload",
                  relationTo: "media",
                  label: "Görsel",
                  admin: {
                    description:
                      "Fotoğrafı buraya yükleyin ya da daha önce yüklediğiniz bir görseli seçin.",
                  },
                },
                {
                  name: "caption",
                  type: "text",
                  label: "Açıklama",
                  localized: true,
                  admin: {
                    description: "Fotoğrafın üzerinde görünen küçük yazı (örn: 'Salon Atmosferi').",
                  },
                },
              ],
            },
          ],
        },
        {
          label: "Yorumlar",
          description:
            "Ana sayfadaki müşteri yorumları bölümü. Buraya elle eklediğiniz seçme yorumlar gösterilir.",
          fields: [
            {
              name: "reviews",
              type: "array",
              label: "Müşteri yorumları",
              admin: {
                description:
                  "Her biri ayrı bir yorum kartı olur. Google'dan beğendiğiniz yorumları buraya kopyalayabilirsiniz.",
              },
              fields: [
                {
                  name: "quote",
                  type: "textarea",
                  label: "Yorum",
                  localized: true,
                  admin: { description: "Müşterinin yazdığı yorum metni." },
                },
                {
                  name: "name",
                  type: "text",
                  label: "İsim",
                  admin: {
                    description:
                      "Müşterinin adı (örn: Mehmet A.). Baş harfleri otomatik olarak yuvarlak rozette gösterilir.",
                  },
                },
                {
                  name: "source",
                  type: "text",
                  label: "Kaynak",
                  defaultValue: "Google",
                  admin: { description: "Yorumun kaynağı (örn: Google). İsmin altında küçük yazar." },
                },
              ],
            },
          ],
        },
        {
          label: "Çağrı (CTA)",
          description:
            "Sayfanın en altındaki büyük 'randevu al' çağrısı bölümü.",
          fields: [
            {
              name: "ctaHeading",
              type: "text",
              label: "Başlık",
              localized: true,
              admin: { description: "En alttaki büyük başlık (örn: 'Bu imzayı taşı.')." },
            },
            {
              name: "ctaText",
              type: "textarea",
              label: "Metin",
              localized: true,
              admin: { description: "Başlığın altındaki kısa cümle." },
            },
          ],
        },
      ],
    },
  ],
};
