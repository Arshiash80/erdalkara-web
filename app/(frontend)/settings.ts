import { getPayload } from "payload";
import config from "@payload-config";

export interface SiteSettings {
  googleReviewUrl?: string | null;
  bookingUrl?: string | null;
  instagram?: string | null;
  facebook?: string | null;
  googleMaps?: string | null;
}

// Reads the `settings` global (Turkish). Returns null if the DB is
// unreachable so callers can degrade gracefully.
export async function getSettings(): Promise<SiteSettings | null> {
  try {
    const payload = await getPayload({ config });
    const doc = (await payload.findGlobal({
      slug: "settings",
      locale: "tr",
      depth: 0,
    })) as SiteSettings;
    return doc;
  } catch {
    return null;
  }
}
