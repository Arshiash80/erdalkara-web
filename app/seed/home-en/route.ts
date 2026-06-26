/**
 * Non-destructive English fill for the `home` global. Writes ONLY the `en`
 * locale of localized fields, reusing existing array row ids so Turkish values
 * (and any owner edits) are preserved. English strings come from the original
 * approved design.
 *
 *   curl "http://localhost:3000/seed/home-en?secret=$PAYLOAD_SECRET"
 */
import { getPayload } from "payload";
import config from "@payload-config";

export const dynamic = "force-dynamic";

const lex = (paras: string[]) => ({
  root: {
    type: "root",
    direction: "ltr",
    format: "",
    indent: 0,
    version: 1,
    children: paras.map((t) => ({
      type: "paragraph",
      direction: "ltr",
      format: "",
      indent: 0,
      version: 1,
      textFormat: 0,
      textStyle: "",
      children: [{ detail: 0, format: 0, mode: "normal", style: "", text: t, type: "text", version: 1 }],
    })),
  },
});

// English mirrors of the seeded Turkish content, in the same order.
const EN = {
  heroTagline: "We don't just cut hair — we shape style and quiet confidence.",
  heroIntro:
    "A family of master barbers in Bursa since 2008. Calm, careful, and finished with care — every single time.",
  reviewsText: "1,000+ Google reviews",
  storyHeading: "A craft passed down, perfected every day.",
  storyBody: lex([
    "Since 2008, Erdal Kara Hair Design has been one of Bursa's most trusted men's grooming houses — a family-run salon built on precision, hygiene and a calm attention to the finish.",
    "From classic scissor work to modern fades and hot-towel shaves, every chair is run by a certified master barber who treats your look as a signature.",
  ]),
  storyStats: ["Certificates & awards", "Family-run salon"],
  serviceGroups: [
    { category: "Hair", items: ["Haircut", "Hair + Beard", "Kids cut"] },
    { category: "Beard & Shave", items: ["Beard design", "Hot-towel shave", "Nose / ear wax"] },
    { category: "Care", items: ["Hair care & keratin", "Skin care / mask", "Eyebrow design"] },
  ],
  gallery: ["The Salon", "The Tools", "Certificates", "Soğanlı, Osmangazi"],
  reviews: [
    "The most professional barber I've been to in Bursa. Erdal turns his work into art.",
    "Years now and I won't go anywhere else. Hygiene, attention and the result — flawless.",
    "Unmatched on beard design, and the atmosphere is calm and welcoming.",
  ],
  ctaHeading: "Wear the name.",
  ctaText: "Reserve your chair at Bursa's calm, careful men's grooming house.",
};

export async function GET(req: Request) {
  const secret = new URL(req.url).searchParams.get("secret");
  if (!process.env.PAYLOAD_SECRET || secret !== process.env.PAYLOAD_SECRET) {
    return Response.json({ error: "unauthorized" }, { status: 401 });
  }

  const payload = await getPayload({ config });
  const cur: any = await payload.findGlobal({ slug: "home", depth: 0, locale: "tr" });

  // Map English onto existing rows by index, carrying row ids + non-localized values.
  const serviceGroups = (cur.serviceGroups ?? []).map((g: any, i: number) => ({
    id: g.id,
    category: EN.serviceGroups[i]?.category ?? g.category,
    items: (g.items ?? []).map((it: any, j: number) => ({
      id: it.id,
      name: EN.serviceGroups[i]?.items[j] ?? it.name,
      price: it.price,
    })),
  }));
  const gallery = (cur.gallery ?? []).map((row: any, i: number) => ({
    id: row.id,
    image: typeof row.image === "object" ? row.image?.id : row.image,
    caption: EN.gallery[i] ?? row.caption,
  }));
  const reviews = (cur.reviews ?? []).map((row: any, i: number) => ({
    id: row.id,
    quote: EN.reviews[i] ?? row.quote,
    name: row.name,
    source: row.source,
  }));
  const storyStats = (cur.storyStats ?? []).map((row: any, i: number) => ({
    id: row.id,
    value: row.value,
    label: EN.storyStats[i] ?? row.label,
  }));

  await payload.updateGlobal({
    slug: "home",
    locale: "en",
    data: {
      heroTagline: EN.heroTagline,
      heroIntro: EN.heroIntro,
      reviewsText: EN.reviewsText,
      storyHeading: EN.storyHeading,
      storyBody: EN.storyBody,
      storyStats,
      serviceGroups,
      gallery,
      reviews,
      ctaHeading: EN.ctaHeading,
      ctaText: EN.ctaText,
    },
  });

  return Response.json({ ok: true, locale: "en", groups: serviceGroups.length, gallery: gallery.length, reviews: reviews.length });
}
