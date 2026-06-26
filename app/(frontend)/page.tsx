import { MARKUP } from "../_design/markup";
import HomeClient from "./HomeClient";
import { getSettings } from "./settings";

// Reads the Google review link from the CMS at request time.
export const dynamic = "force-dynamic";

// Inject a "leave a Google review" CTA into the static design markup, at
// runtime (anchored on stable ids), so regenerating the design can't drop it.
// `data-en` lets the existing language toggle localize the label.
function injectReviewCtas(markup: string, reviewUrl: string): string {
  let html = markup;

  const reviewsBtn =
    `<div style="text-align:center;margin-top:clamp(36px,4vw,52px);">` +
    `<a href="${reviewUrl}" target="_blank" rel="noopener" ` +
    `style="display:inline-flex;align-items:center;gap:9px;background:var(--clay);color:#fdf8ef;` +
    `padding:14px 28px;font-size:13px;font-weight:600;letter-spacing:.06em;border-radius:999px;text-decoration:none;" ` +
    `data-en="Leave a Google review ★">Google'da değerlendirin ★</a></div>`;

  // Insert before the closing </section> of the reviews block (#yorumlar).
  const revStart = html.indexOf('id="yorumlar"');
  if (revStart !== -1) {
    const close = html.indexOf("</section>", revStart);
    if (close !== -1) {
      html = html.slice(0, close) + reviewsBtn + html.slice(close);
    }
  }

  const footerLink =
    `<div style="text-align:center;padding:0 clamp(20px,4vw,56px) 30px;">` +
    `<a href="${reviewUrl}" target="_blank" rel="noopener" ` +
    `style="display:inline-flex;align-items:center;gap:8px;font-size:13px;font-weight:600;` +
    `letter-spacing:.05em;color:var(--clay);text-decoration:none;" ` +
    `data-en="Rate us on Google ★">Bizi Google'da değerlendirin ★</a></div>`;

  // Insert just before </footer>.
  const footClose = html.lastIndexOf("</footer>");
  if (footClose !== -1) {
    html = html.slice(0, footClose) + footerLink + html.slice(footClose);
  }

  return html;
}

export default async function Home() {
  const settings = await getSettings();
  const reviewUrl = settings?.googleReviewUrl?.trim();
  const html = reviewUrl ? injectReviewCtas(MARKUP, reviewUrl) : MARKUP;

  return <HomeClient html={html} />;
}
