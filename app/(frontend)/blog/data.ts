import { getPayload } from "payload";
import config from "@payload-config";
import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";

export interface PostListItem {
  slug: string;
  title: string;
  excerpt: string;
  cover: string | null;
  coverAlt: string;
  tag: string;
  dateLabel: string;
  readingMinutes: number;
}

export interface PostDetail extends PostListItem {
  author: string;
  date: string;
  content: SerializedEditorState | null;
}

const trDate = (iso?: string | null) => {
  if (!iso) return "";
  try {
    return new Intl.DateTimeFormat("tr-TR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date(iso));
  } catch {
    return "";
  }
};

// Estimate reading time from the lexical content (~200 words/min).
function readingMinutes(content: unknown): number {
  let words = 0;
  const walk = (node: any) => {
    if (!node) return;
    if (typeof node.text === "string") words += node.text.trim().split(/\s+/).filter(Boolean).length;
    if (Array.isArray(node.children)) node.children.forEach(walk);
  };
  // @ts-expect-error runtime shape
  walk(content?.root);
  return Math.max(1, Math.round(words / 200));
}

const mediaUrl = (m: unknown): { url: string | null; alt: string } => {
  if (m && typeof m === "object" && "url" in m) {
    const media = m as { url?: string | null; alt?: string | null };
    return { url: media.url ?? null, alt: media.alt ?? "" };
  }
  return { url: null, alt: "" };
};

async function client() {
  return getPayload({ config });
}

export async function listPosts(): Promise<PostListItem[]> {
  const payload = await client();
  const res = await payload.find({
    collection: "posts",
    where: { _status: { equals: "published" } },
    sort: "-publishedDate",
    depth: 1,
    locale: "tr",
    limit: 100,
    overrideAccess: false,
  });
  return res.docs.map((d: any) => {
    const cover = mediaUrl(d.coverImage);
    return {
      slug: d.slug,
      title: d.title,
      excerpt: d.excerpt ?? "",
      cover: cover.url,
      coverAlt: cover.alt || d.title,
      tag: d.tag ?? "Genel",
      dateLabel: trDate(d.publishedDate),
      readingMinutes: readingMinutes(d.content),
    };
  });
}

export async function getPost(slug: string): Promise<PostDetail | null> {
  const payload = await client();
  const res = await payload.find({
    collection: "posts",
    where: { slug: { equals: slug }, _status: { equals: "published" } },
    depth: 1,
    locale: "tr",
    limit: 1,
    overrideAccess: false,
  });
  const d: any = res.docs[0];
  if (!d) return null;
  const cover = mediaUrl(d.coverImage);
  return {
    slug: d.slug,
    title: d.title,
    excerpt: d.excerpt ?? "",
    cover: cover.url,
    coverAlt: cover.alt || d.title,
    tag: d.tag ?? "Genel",
    author: d.author ?? "Erdal Kara",
    date: d.publishedDate ?? "",
    dateLabel: trDate(d.publishedDate),
    readingMinutes: readingMinutes(d.content),
    content: d.content ?? null,
  };
}
