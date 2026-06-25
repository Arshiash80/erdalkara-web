import Link from "next/link";
import type { Metadata } from "next";
import "./blog.css";
import { getAllPosts } from "./posts";
import { BlogHeader, BlogFooter } from "./Chrome";

export const metadata: Metadata = {
  title: "Blog — Erdal Kara Hair Design",
  description:
    "Saç, sakal ve cilt bakımı üzerine ipuçları, rehberler ve Erdal Kara Hair Design'dan notlar.",
};

function Meta({
  dateLabel,
  readingMinutes,
}: {
  dateLabel: string;
  readingMinutes: number;
}) {
  return (
    <div className="ekbMeta">
      <span>{dateLabel}</span>
      <span className="ekbDot" />
      <span>{readingMinutes} dk okuma</span>
    </div>
  );
}

export default function BlogIndex() {
  const posts = getAllPosts();
  const [featured, ...rest] = posts;

  return (
    <div className="ekBlog">
      <BlogHeader />

      <main className="ekbWrap">
        <section className="ekbIntro">
          <div className="ekbEyebrow">Günlük</div>
          <h1 className="ekbTitle">Blog</h1>
          <p className="ekbLede">
            Saç, sakal ve cilt bakımı üzerine rehberler, ipuçları ve
            salonumuzdan notlar.
          </p>
        </section>

        {featured && (
          <Link
            href={`/blog/${featured.slug}`}
            className="ekbFeatured"
            aria-label={featured.title}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="img" src={featured.cover} alt={featured.title} />
            <div className="body">
              <span className="ekbTagPill">{featured.tag}</span>
              <h2>{featured.title}</h2>
              <p style={{ color: "var(--muted)", margin: "0 0 22px" }}>
                {featured.excerpt}
              </p>
              <Meta
                dateLabel={featured.dateLabel}
                readingMinutes={featured.readingMinutes}
              />
            </div>
          </Link>
        )}

        <section className="ekbGrid">
          {rest.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="ekbCard"
              aria-label={post.title}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="img" src={post.cover} alt={post.title} />
              <div className="body">
                <span className="ekbTagPill">{post.tag}</span>
                <h3>{post.title}</h3>
                <p>{post.excerpt}</p>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Meta
                    dateLabel={post.dateLabel}
                    readingMinutes={post.readingMinutes}
                  />
                  <span className="ekbReadmore">Oku →</span>
                </div>
              </div>
            </Link>
          ))}
        </section>
      </main>

      <BlogFooter />
    </div>
  );
}
