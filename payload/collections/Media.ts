import type { CollectionConfig } from "payload";

export const Media: CollectionConfig = {
  slug: "media",
  labels: { singular: "Görsel", plural: "Görseller" },
  admin: { group: "Yönetim" },
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
    },
  ],
};
