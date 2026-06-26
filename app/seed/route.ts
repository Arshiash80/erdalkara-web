/**
 * One-off seed endpoint (guarded by PAYLOAD_SECRET).
 * Runs inside the Next runtime so Payload + its deps load correctly.
 *
 *   curl "http://localhost:3000/seed?secret=$PAYLOAD_SECRET"
 *
 * Idempotent: media keyed by filename, posts by slug, globals overwritten.
 */
import path from "path";
import { getPayload } from "payload";
import config from "@payload-config";
import { POSTS, type Block } from "../(frontend)/blog/posts";

export const dynamic = "force-dynamic";
export const maxDuration = 120;

const assets = (f: string) => path.join(process.cwd(), "public/assets", f);

// ---- Lexical helpers (block -> editor state) ----
const txt = (text: string) => ({
  detail: 0, format: 0, mode: "normal", style: "", text, type: "text", version: 1,
});
function blockToLexical(b: Block) {
  switch (b.type) {
    case "h2":
      return { type: "heading", tag: "h2", children: [txt(b.text)], direction: "ltr", format: "", indent: 0, version: 1 };
    case "p":
      return { type: "paragraph", children: [txt(b.text)], direction: "ltr", format: "", indent: 0, version: 1, textFormat: 0, textStyle: "" };
    case "quote":
      return { type: "quote", children: [txt(b.text)], direction: "ltr", format: "", indent: 0, version: 1 };
    case "list":
      return {
        type: "list", listType: "bullet", tag: "ul", start: 1, direction: "ltr", format: "", indent: 0, version: 1,
        children: b.items.map((it, i) => ({
          type: "listitem", value: i + 1, children: [txt(it)], direction: "ltr", format: "", indent: 0, version: 1,
        })),
      };
  }
}
const toLexical = (blocks: Block[]) => ({
  root: { type: "root", children: blocks.map(blockToLexical), direction: "ltr", format: "", indent: 0, version: 1 },
});

export async function GET(req: Request) {
  const secret = new URL(req.url).searchParams.get("secret");
  if (!process.env.PAYLOAD_SECRET || secret !== process.env.PAYLOAD_SECRET) {
    return Response.json({ error: "unauthorized" }, { status: 401 });
  }

  const payload = await getPayload({ config });
  const log: string[] = [];

  // ---- Media ----
  const files: [string, string][] = [
    ["interior-1.jpg", "Erdal Kara salon iç mekan"],
    ["interior-2.jpg", "Salon atmosferi"],
    ["storefront-1.jpg", "Soğanlı, Osmangazi dükkan"],
    ["storefront-2.jpg", "Dükkan dış görünüm"],
    ["tools-roll.jpg", "Ustanın aletleri"],
    ["certificates.jpg", "Ustalık belgeleri"],
    ["terrace.jpg", "Salon terası"],
  ];
  const mediaId: Record<string, number | string> = {};
  for (const [file, alt] of files) {
    const existing = await payload.find({ collection: "media", where: { filename: { equals: file } }, limit: 1 });
    if (existing.docs.length) {
      mediaId[file] = existing.docs[0].id;
      log.push(`media exists: ${file}`);
    } else {
      const doc = await payload.create({ collection: "media", data: { alt }, filePath: assets(file) });
      mediaId[file] = doc.id;
      log.push(`media created: ${file}`);
    }
  }
  const coverFor = (cover: string) => mediaId[cover.replace(/^\/assets\//, "")];

  // ---- Posts ----
  for (const p of POSTS) {
    const data: Record<string, unknown> = {
      title: p.title,
      slug: p.slug,
      excerpt: p.excerpt,
      tag: p.tag,
      author: p.author,
      publishedDate: p.date,
      coverImage: coverFor(p.cover),
      content: toLexical(p.body),
      _status: "published",
    };
    const existing = await payload.find({ collection: "posts", where: { slug: { equals: p.slug } }, limit: 1, locale: "tr" });
    if (existing.docs.length) {
      await payload.update({ collection: "posts", id: existing.docs[0].id, data, locale: "tr" });
      log.push(`post updated: ${p.slug}`);
    } else {
      await payload.create({ collection: "posts", data, locale: "tr" });
      log.push(`post created: ${p.slug}`);
    }
  }

  // ---- Home global ----
  await payload.updateGlobal({
    slug: "home",
    locale: "tr",
    data: {
      heroTagline: "Saç kesmiyoruz; stil ve sakin bir özgüven tasarlıyoruz.",
      heroIntro:
        "2008'den bu yana Bursa'da usta berberlerden oluşan bir aile. Sakin, özenli ve her seferinde dikkatle tamamlanan bir iş.",
      ratingValue: "4.9",
      reviewsText: "1.000+ Google değerlendirmesi",
      yearsValue: 17,
      storyHeading: "Babadan ustaya geçen bir zanaat.",
      storyBody: toLexical([
        { type: "p", text: "2008'den bu yana Erdal Kara Hair Design, Bursa'nın en saygın erkek bakım adreslerinden biri. Hassasiyet, hijyen ve kusursuz bir bitiş takıntısı üzerine kurulu, aileden bir işletme." },
        { type: "p", text: "Klasik makas işinden modern fade kesimlere, ustura tıraşından kraliyet bakımına kadar her koltukta, görünümünüzü bir imza gibi gören belgeli bir usta berber çalışır." },
      ]),
      storyStats: [
        { value: "15+", label: "Belge & ödül" },
        { value: "Aile", label: "İşletmesi" },
      ],
      serviceGroups: [
        { category: "Saç", items: [
          { name: "Saç Kesimi", price: "₺450" },
          { name: "Saç + Sakal", price: "₺650" },
          { name: "Çocuk Kesimi", price: "₺350" },
        ]},
        { category: "Sakal & Tıraş", items: [
          { name: "Sakal Tasarımı", price: "₺250" },
          { name: "Ustura / Sıcak Havlu", price: "₺350" },
          { name: "Burun / Kulak Ağda", price: "₺120" },
        ]},
        { category: "Bakım", items: [
          { name: "Saç Bakımı & Keratin", price: "₺900" },
          { name: "Cilt Bakımı / Maske", price: "₺400" },
          { name: "Kaş Tasarımı", price: "₺120" },
        ]},
      ],
      gallery: [
        { image: mediaId["interior-2.jpg"], caption: "Salon Atmosferi" },
        { image: mediaId["tools-roll.jpg"], caption: "Ustanın Aletleri" },
        { image: mediaId["certificates.jpg"], caption: "Ustalık Belgeleri" },
        { image: mediaId["storefront-1.jpg"], caption: "Soğanlı, Osmangazi" },
      ],
      reviews: [
        { quote: "Bursa'da gittiğim en profesyonel kuaför. Erdal usta işini sanata dönüştürüyor.", name: "Mehmet A.", source: "Google" },
        { quote: "Yıllardır başka yere gitmiyorum. Hijyen, ilgi ve sonuç kusursuz.", name: "Kerem T.", source: "Google" },
        { quote: "Sakal tasarımında üzerine yok. Mekânın atmosferi de ayrı güzel.", name: "Burak Ş.", source: "Google" },
      ],
      ctaHeading: "Sıra sizde",
      ctaText: "Bursa'nın en sevilen erkek kuaföründe yerinizi ayırtın.",
    },
  });
  log.push("home global set");

  // ---- Settings ----
  await payload.updateGlobal({
    slug: "settings",
    locale: "tr",
    data: {
      phone: "+90 532 456 74 80",
      whatsapp: "905324567480",
      email: "info@erdalkara.com.tr",
      address: "Soğanlı Mah. 3. Meltem Sok. No:23B, Osmangazi / Bursa",
      hours: [
        { label: "Pazartesi – Cumartesi", value: "09:00 – 21:00" },
        { label: "Pazar", value: "10:00 – 20:00" },
      ],
      bookingUrl: "https://www.kolayrandevu.com/kisi/erdal-kara78",
      instagram: "https://www.instagram.com/erdalkarahairdesign",
      facebook: "https://www.facebook.com/kuaforerdalkara",
      googleMaps: "https://www.google.com/maps?q=Erdal+Kara+Hair+Design+So%C4%9Fanl%C4%B1+Osmangazi+Bursa",
      mapEmbedUrl: "https://www.google.com/maps?q=So%C4%9Fanl%C4%B1%20Mah.%203.%20Meltem%20Sok.%20No%3A23B%20Osmangazi%20Bursa&output=embed",
    },
  });
  log.push("settings global set");

  return Response.json({ ok: true, log });
}
