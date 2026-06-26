import type { MetadataRoute } from "next";
import { getPayload } from "payload";
import config from "@payload-config";
import { SITE_URL } from "@/lib/site";

// Re-query Payload on each request so new/updated posts appear immediately.
export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/blog`, changeFrequency: "weekly", priority: 0.8 },
  ];

  let postRoutes: MetadataRoute.Sitemap = [];
  try {
    const payload = await getPayload({ config });
    const res = await payload.find({
      collection: "posts",
      where: { _status: { equals: "published" } },
      sort: "-publishedDate",
      depth: 0,
      limit: 1000,
      overrideAccess: false,
    });
    postRoutes = res.docs.map((d: any) => ({
      url: `${SITE_URL}/blog/${d.slug}`,
      lastModified: d.updatedAt ? new Date(d.updatedAt) : undefined,
      changeFrequency: "monthly",
      priority: 0.7,
    }));
  } catch {
    // DB unreachable at build/runtime — still emit static routes.
  }

  return [...staticRoutes, ...postRoutes];
}
