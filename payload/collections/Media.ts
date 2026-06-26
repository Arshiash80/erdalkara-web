import type { CollectionConfig } from "payload";

export const Media: CollectionConfig = {
  slug: "media",
  labels: { singular: "Görsel", plural: "Görseller" },
  admin: {
    group: "Yönetim",
    description:
      "Siteye yüklediğiniz tüm fotoğraflar burada toplanır. Galeri ve blog kapakları buradan seçilir. Buraya bir kez yüklediğiniz fotoğrafı birden çok yerde kullanabilirsiniz.",
  },
  access: {
    read: () => true,
  },
  upload: {
    mimeTypes: ["image/*"],
  },
  fields: [
    {
      name: "alt",
      type: "text",
      label: "Alternatif metin (erişilebilirlik / SEO)",
      localized: true,
      admin: {
        description:
          "Fotoğrafı kısaca tarif eden metin (örn: 'Salon iç mekan'). Görme engelliler ve Google için; sitede görünmez ama önemlidir.",
      },
    },
  ],
};
