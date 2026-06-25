import type { CollectionConfig } from "payload";

function slugify(input: string): string {
  const map: Record<string, string> = {
    ç: "c", ğ: "g", ı: "i", ö: "o", ş: "s", ü: "u",
    Ç: "c", Ğ: "g", İ: "i", Ö: "o", Ş: "s", Ü: "u",
  };
  return input
    .split("")
    .map((ch) => map[ch] ?? ch)
    .join("")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export const Posts: CollectionConfig = {
  slug: "posts",
  labels: { singular: "Blog Yazısı", plural: "Blog Yazıları" },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "tag", "publishedDate", "_status"],
    group: "İçerik",
  },
  access: {
    // Public can read published posts; drafts stay admin-only.
    read: ({ req: { user } }) => {
      if (user) return true;
      return { _status: { equals: "published" } };
    },
  },
  versions: {
    drafts: true,
  },
  hooks: {
    beforeValidate: [
      ({ data }) => {
        if (data && !data.slug && data.title) {
          data.slug = slugify(String(data.title));
        }
        return data;
      },
    ],
  },
  fields: [
    {
      name: "title",
      type: "text",
      label: "Başlık",
      required: true,
      localized: true,
    },
    {
      name: "slug",
      type: "text",
      label: "URL (slug)",
      unique: true,
      index: true,
      admin: {
        position: "sidebar",
        description: "Adres: /blog/<slug>. Boş bırakılırsa başlıktan üretilir.",
      },
    },
    {
      name: "publishedDate",
      type: "date",
      label: "Yayın tarihi",
      admin: {
        position: "sidebar",
        date: { pickerAppearance: "dayOnly" },
      },
    },
    {
      name: "tag",
      type: "select",
      label: "Kategori",
      options: [
        { label: "Bakım", value: "Bakım" },
        { label: "Saç", value: "Saç" },
        { label: "Sakal", value: "Sakal" },
        { label: "Cilt", value: "Cilt" },
        { label: "Çocuk", value: "Çocuk" },
        { label: "Genel", value: "Genel" },
      ],
      admin: { position: "sidebar" },
    },
    {
      name: "author",
      type: "text",
      label: "Yazar",
      defaultValue: "Erdal Kara",
      admin: { position: "sidebar" },
    },
    {
      name: "coverImage",
      type: "upload",
      relationTo: "media",
      label: "Kapak görseli",
    },
    {
      name: "excerpt",
      type: "textarea",
      label: "Özet",
      localized: true,
    },
    {
      name: "content",
      type: "richText",
      label: "İçerik",
      localized: true,
    },
  ],
};
