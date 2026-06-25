import Link from "next/link";

const BOOKING_URL = "https://www.kolayrandevu.com/kisi/erdal-kara78";

export function BlogHeader() {
  return (
    <header className="ekbHeader">
      <div className="ekbHeaderInner">
        <Link href="/" className="ekbWordmark" aria-label="Erdal Kara Hair Design">
          <span className="name">Erdal Kara</span>
          <span className="tag">Hair Design</span>
        </Link>
        <div className="ekbHeaderActions">
          <Link href="/" className="ekbNavlink">
            Anasayfa
          </Link>
          <Link href="/blog" className="ekbNavlink">
            Blog
          </Link>
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener"
            className="ekbBtn"
          >
            Randevu Al
          </a>
        </div>
      </div>
    </header>
  );
}

export function BlogFooter() {
  return (
    <footer className="ekbFooter">
      <div className="ekbFooterInner">
        <span>© 2026 Erdal Kara Hair Design — Bursa</span>
        <span>Soğanlı Mah. 3. Meltem Sok. No:23B, Osmangazi / Bursa</span>
      </div>
    </footer>
  );
}

export { BOOKING_URL };
