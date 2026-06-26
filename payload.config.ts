import path from "path";
import { fileURLToPath } from "url";

import { buildConfig } from "payload";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { s3Storage } from "@payloadcms/storage-s3";
import { tr } from "@payloadcms/translations/languages/tr";
import { en } from "@payloadcms/translations/languages/en";
import sharp from "sharp";

import { Users } from "./payload/collections/Users";
import { Media } from "./payload/collections/Media";
import { Posts } from "./payload/collections/Posts";
import { HomePage } from "./payload/globals/HomePage";
import { SiteSettings } from "./payload/globals/SiteSettings";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

// Cloudflare R2 (S3-compatible) media storage — enabled only when configured,
// so local development works without it (falls back to local disk uploads).
const r2Enabled = Boolean(process.env.R2_BUCKET && process.env.R2_ENDPOINT);

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: "— Erdal Kara Hair Design",
    },
  },

  collections: [Users, Media, Posts],
  globals: [HomePage, SiteSettings],

  // Admin UI language (button labels, etc.). Turkish is the default when a
  // user has no saved preference / non-matching browser; English stays
  // selectable from Account → Language.
  i18n: {
    supportedLanguages: { tr, en },
    fallbackLanguage: "tr",
  },

  localization: {
    locales: [
      { label: "Türkçe", code: "tr" },
      { label: "English", code: "en" },
    ],
    defaultLocale: "tr",
    fallback: true,
  },

  editor: lexicalEditor(),

  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || "",
    },
  }),

  secret: process.env.PAYLOAD_SECRET || "",

  sharp,

  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },

  plugins: r2Enabled
    ? [
        s3Storage({
          collections: { media: true },
          bucket: process.env.R2_BUCKET as string,
          config: {
            endpoint: process.env.R2_ENDPOINT,
            region: "auto",
            forcePathStyle: true,
            credentials: {
              accessKeyId: process.env.R2_ACCESS_KEY_ID as string,
              secretAccessKey: process.env.R2_SECRET_ACCESS_KEY as string,
            },
          },
        }),
      ]
    : [],
});
