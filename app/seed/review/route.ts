/**
 * Non-destructive one-field update: sets settings.googleReviewUrl only.
 * Merges with the existing global so nothing else is touched.
 *
 *   curl "http://localhost:3000/seed/review?secret=$PAYLOAD_SECRET"
 */
import { getPayload } from "payload";
import config from "@payload-config";

export const dynamic = "force-dynamic";

const REVIEW_URL =
  "https://search.google.com/local/writereview?placeid=ChIJe81oxQk-yhQRG1QqTQzlHqY";

export async function GET(req: Request) {
  const secret = new URL(req.url).searchParams.get("secret");
  if (!process.env.PAYLOAD_SECRET || secret !== process.env.PAYLOAD_SECRET) {
    return Response.json({ error: "unauthorized" }, { status: 401 });
  }

  const payload = await getPayload({ config });
  const existing = await payload.findGlobal({ slug: "settings", locale: "tr" });

  await payload.updateGlobal({
    slug: "settings",
    locale: "tr",
    data: { ...existing, googleReviewUrl: REVIEW_URL },
  });

  return Response.json({ ok: true, googleReviewUrl: REVIEW_URL });
}
