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
    description:
      "Blog yazıları (site üzerindeki /blog sayfasında listelenir). Yeni yazı için sağ üstten 'Oluştur'. Yazıyı sitede yayınlamak için sağdaki durumu 'Yayınla' yapın — 'Taslak' yazılar sitede görünmez.",
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
      admin: { description: "Yazının başlığı. Blog listesinde ve yazının en üstünde görünür." },
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
        description: "Yazının tarihi. Blog en yeniden eskiye doğru sıralanır.",
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
      admin: {
        position: "sidebar",
        description: "Yazının konusu. Kart üzerinde küçük etiket olarak görünür.",
      },
    },
    {
      name: "author",
      type: "text",
      label: "Yazar",
      defaultValue: "Erdal Kara",
      admin: { position: "sidebar", description: "Yazının altında görünen yazar adı." },
    },
    {
      name: "coverImage",
      type: "upload",
      relationTo: "media",
      label: "Kapak görseli",
      admin: {
        description:
          "Yazının büyük kapak fotoğrafı. Blog listesinde ve yazının başında görünür. Yatay (geniş) fotoğraf önerilir.",
      },
    },
    {
      name: "excerpt",
      type: "textarea",
      label: "Özet",
      localized: true,
      admin: {
        description:
          "1–2 cümlelik kısa özet. Blog listesinde başlığın altında ve Google sonuçlarında görünür.",
      },
    },
    {
      name: "content",
      type: "richText",
      label: "İçerik",
      localized: true,
      admin: {
        description:
          "Yazının tam metni. Başlık, kalın, liste vb. biçimlendirmeyi araç çubuğundan ekleyebilirsiniz.",
      },
    },
  ],
};
