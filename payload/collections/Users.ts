import type { CollectionConfig } from "payload";

export const Users: CollectionConfig = {
  slug: "users",
  auth: true,
  admin: {
    useAsTitle: "email",
    group: "Yönetim",
    description:
      "Yönetim paneline giriş yapabilen kişiler. Yeni kişi eklemek ya da şifre değiştirmek için buradan yönetebilirsiniz.",
  },
  fields: [
    {
      name: "name",
      type: "text",
      label: "İsim",
      admin: { description: "Kişinin adı (panelde görünür)." },
    },
  ],
};
