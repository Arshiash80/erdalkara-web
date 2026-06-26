import { getPayload } from "payload";
import config from "@payload-config";
import HomeClient from "./HomeClient";
import { renderHome } from "./renderHome";

// Renders the homepage from the `home` + `settings` globals at request time.
export const dynamic = "force-dynamic";

// Fetch both globals with every locale (TR + EN) so the design's language
// toggle keeps working, and depth:1 so gallery uploads resolve to URLs.
async function getHomeData() {
  try {
    const payload = await getPayload({ config });
    const [home, settings] = await Promise.all([
      payload.findGlobal({ slug: "home", locale: "all", depth: 1 }),
      payload.findGlobal({ slug: "settings", locale: "all", depth: 0 }),
    ]);
    return { home, settings };
  } catch {
    return { home: null, settings: null };
  }
}

// Inject a "leave a Google review" CTA into the design markup, anchored on
// stable ids. `data-en` lets the existing language toggle localize the label.
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
  const { home, settings } = await getHomeData();

  let html = renderHome(home, settings);

  const reviewUrl =
    typeof settings?.googleReviewUrl === "string"
      ? settings.googleReviewUrl.trim()
      : "";
  if (reviewUrl) html = injectReviewCtas(html, reviewUrl);

  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: html }} />
      <HomeClient />
    </>
  );
}
