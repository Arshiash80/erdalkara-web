import type { CollectionConfig } from "payload";

export const Users: CollectionConfig = {
  slug: "users",
  auth: true,
  admin: {
    useAsTitle: "email",
    group: "Yönetim",
  },
  fields: [
    {
      name: "name",
      type: "text",
      label: "İsim",
    },
  ],
};
