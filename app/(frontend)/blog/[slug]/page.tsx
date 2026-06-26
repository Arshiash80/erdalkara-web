import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { RichText } from "@payloadcms/richtext-lexical/react";
import "../blog.css";
import { getPost } from "../data";
import { BlogHeader, BlogFooter, BOOKING_URL } from "../Chrome";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: "Yazı bulunamadı — Erdal Kara Hair Design" };
  return {
    title: `${post.title} — Erdal Kara Hair Design`,
    description: post.excerpt,
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

  return (
    <div className="ekBlog">
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
