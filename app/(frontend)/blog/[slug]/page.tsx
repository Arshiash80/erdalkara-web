import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { RichText } from "@payloadcms/richtext-lexical/react";
import "../blog.css";
import { getPost } from "../data";
import { BlogHeader, BlogFooter, BOOKING_URL } from "../Chrome";
import { SITE, SITE_URL } from "@/lib/site";

export const dynamic = "force-dynamic";

// Media urls are served relatively (/api/media/file/...); make absolute for OG.
const absUrl = (u: string | null) =>
  !u ? undefined : u.startsWith("http") ? u : `${SITE_URL}${u}`;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: "Yazı bulunamadı" };

  const cover = absUrl(post.cover);
  const images = cover ? [{ url: cover, alt: post.coverAlt }] : undefined;
  const canonical = `/blog/${post.slug}`;

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      url: canonical,
      publishedTime: post.date || undefined,
      authors: [post.author],
      section: post.tag,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: cover ? [cover] : undefined,
    },
  };
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const cover = absUrl(post.cover);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: cover ? [cover] : undefined,
    datePublished: post.date || undefined,
    author: { "@type": "Person", name: post.author },
    publisher: {
      "@type": "Organization",
      name: SITE.name,
      url: SITE_URL,
    },
    mainEntityOfPage: `${SITE_URL}/blog/${post.slug}`,
    inLanguage: "tr-TR",
  };

  return (
    <div className="ekBlog">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogHeader />

      <main className="ekbWrap">
        <article className="ekbArticle">
          <Link href="/blog" className="ekbBack">
            ← Tüm yazılar
          </Link>

          <header className="ekbArticleHead">
            <span className="ekbTagPill" style={{ margin: "0 auto" }}>
              {post.tag}
            </span>
            <h1>{post.title}</h1>
            <div className="ekbArticleMeta">
              <span>{post.author}</span>
              <span className="ekbDot" />
              <time dateTime={post.date}>{post.dateLabel}</time>
              <span className="ekbDot" />
              <span>{post.readingMinutes} dk okuma</span>
            </div>
          </header>

          {post.cover && (
            <div className="ekbCover">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={post.cover} alt={post.coverAlt} />
            </div>
          )}

          <div className="ekbProse">
            {post.content && <RichText data={post.content} />}
          </div>

          <aside className="ekbCta">
            <h3>Sıra sizde</h3>
            <p>Bursa&apos;nın en sevilen erkek kuaföründe yerinizi ayırtın.</p>
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener"
              className="ekbBtn"
            >
              Randevu Al →
            </a>
          </aside>
        </article>
      </main>

      <BlogFooter />
    </div>
  );
}
