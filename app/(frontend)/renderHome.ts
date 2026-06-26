/**
 * Renders the homepage from the `home` + `settings` globals by transforming the
 * approved static design (MARKUP) at request time. Untouched markup stays byte
 * identical; only CMS-backed regions are regenerated. Bilingual TR/EN is kept
 * via the design's `data-en` toggle (TR in innerHTML, EN in the data-en attr).
 *
 * Every transform is anchored on stable substrings of MARKUP (a fixed constant),
 * so a miss simply leaves that region static — it can never break the layout.
 */
import { MARKUP } from "../_design/markup";

/* ---------- helpers ---------- */
type Maybe = string | null | undefined;
type Loc = { tr?: Maybe; en?: Maybe } | Maybe;

const isObj = (v: unknown): v is { tr?: Maybe; en?: Maybe } =>
  typeof v === "object" && v !== null;

// Turkish / English getters for (possibly) localized fields fetched w/ locale:"all".
const T = (v: Loc): string => (isObj(v) ? v.tr ?? v.en ?? "" : v ?? "");
const E = (v: Loc): string => (isObj(v) ? v.en ?? v.tr ?? "" : v ?? "");

// text-node escaping (keep quotes); attribute escaping (also quotes)
const tx = (s: Maybe) =>
  String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const attr = (s: Maybe) => tx(s).replace(/"/g, "&quot;");

const digits = (s: Maybe) => String(s ?? "").replace(/[^\d]/g, "");

const initials = (name: Maybe) =>
  String(name ?? "")
    .trim()
    .split(/\s+/)
    .map((w) => w[0] ?? "")
    .join("")
    .slice(0, 2)
    .toLocaleUpperCase("tr-TR");

// Replace the content between two stable anchors. No-op if either is missing.
function splice(html: string, start: string, end: string, middle: string): string {
  const i = html.indexOf(start);
  if (i < 0) return html;
  const s = i + start.length;
  const e = html.indexOf(end, s);
  if (e < 0) return html;
  return html.slice(0, s) + middle + html.slice(e);
}

const collectText = (n: any): string => {
  if (n == null) return "";
  if (typeof n.text === "string") return n.text;
  return Array.isArray(n.children) ? n.children.map(collectText).join("") : "";
};
const lexToParas = (state: any): string => {
  const ch = state?.root?.children;
  if (!Array.isArray(ch)) return "";
  return ch
    .map((n) => {
      const t = collectText(n).trim();
      return t
        ? `<p style="color:var(--muted);font-size:clamp(15px,1.1vw,18px);margin:0 0 22px;max-width:52ch;">${tx(t)}</p>`
        : "";
    })
    .join("");
};

/* ---------- section renderers ---------- */
function renderServices(groups: any[]): string {
  const num = (i: number) => String(i + 1).padStart(2, "0");
  return groups
    .map(
      (g, i) => `
        <div data-rev style="background:var(--surface);border:1px solid var(--line);border-radius:8px;padding:clamp(28px,3vw,42px);">
          <div style="display:flex;align-items:center;gap:10px;margin-bottom:26px;"><span style="font-family:var(--serif);font-size:18px;color:var(--clay);">${num(i)}</span><span style="font-size:12px;font-weight:600;letter-spacing:.14em;color:var(--ink);text-transform:uppercase;" data-en="${attr(E(g.category))}">${tx(T(g.category))}</span></div>
          <div style="display:flex;flex-direction:column;gap:20px;">
            ${(g.items ?? [])
              .map(
                (it: any) =>
                  `<div style="display:flex;align-items:baseline;gap:12px;"><span style="font-size:18px;" data-en="${attr(E(it.name))}">${tx(T(it.name))}</span><span style="flex:1;border-bottom:1px dotted var(--faint);transform:translateY(-4px);"></span><span style="font-family:var(--serif);font-size:21px;color:var(--clay);">${tx(it.price)}</span></div>`,
              )
              .join("\n            ")}
          </div>
        </div>`,
    )
    .join("\n");
}

function renderGallery(items: any[]): string {
  const spans = [7, 5, 4, 8, 4, 5, 7];
  const ars = ["16/11", "4/4.5", "4/5", "16/8", "4/3.6", "16/10", "16/9"];
  return items
    .map((it, i) => {
      const url = it?.image?.url ?? "";
      const span = spans[i % spans.length];
      const ar = ars[i % ars.length];
      return `<div data-rev data-lb="${attr(url)}" style="grid-column:span ${span};aspect-ratio:${ar};position:relative;overflow:hidden;border-radius:6px;background:#efe6d6;cursor:pointer;">
        <img src="${attr(url)}" alt="${attr(T(it.caption))}" style="width:100%;height:100%;object-fit:cover;transition:transform .8s cubic-bezier(.2,.7,.2,1);" loading="lazy">
        <span style="position:absolute;left:16px;bottom:13px;font-size:11px;font-weight:600;letter-spacing:.08em;color:#fff;text-shadow:0 1px 8px rgba(0,0,0,.7);" data-en="${attr(E(it.caption))}">${tx(T(it.caption))}</span>
      </div>`;
    })
    .join("\n      ");
}

function renderReviews(items: any[]): string {
  return items
    .map(
      (r) => `<div data-rev data-card style="background:var(--surface);border:1px solid var(--line);border-radius:8px;padding:clamp(28px,3vw,40px);display:flex;flex-direction:column;gap:20px;transition:transform .4s cubic-bezier(.2,.7,.2,1),box-shadow .4s,border-color .4s;">
          <div style="display:flex;justify-content:space-between;align-items:flex-start;"><span style="font-family:var(--serif);font-size:54px;line-height:.6;color:var(--clay);">“</span><span style="color:var(--clay);font-size:13px;letter-spacing:2px;">★★★★★</span></div>
          <p style="font-family:var(--serif);font-size:clamp(18px,1.4vw,22px);line-height:1.46;margin:0;flex:1;" data-en="${attr(E(r.quote))}">${tx(T(r.quote))}</p>
          <div style="display:flex;align-items:center;gap:12px;padding-top:16px;border-top:1px solid var(--line);"><span style="width:34px;height:34px;border-radius:50%;background:var(--clay);display:flex;align-items:center;justify-content:center;font-size:13px;color:#fdf8ef;font-weight:600;">${tx(initials(r.name))}</span><div><div style="font-size:14px;color:var(--ink);">${tx(r.name)}</div><div style="font-size:11px;letter-spacing:.04em;color:var(--faint);">${tx(r.source || "Google")}</div></div></div>
        </div>`,
    )
    .join("\n        ");
}

function renderStats(stats: any[]): string {
  return stats
    .map(
      (s) =>
        `<div><div style="font-family:var(--serif);font-size:38px;font-weight:500;line-height:1;color:var(--clay);">${tx(s.value)}</div><div style="font-size:12px;font-weight:500;letter-spacing:.08em;color:var(--muted);text-transform:uppercase;margin-top:9px;" data-en="${attr(E(s.label))}">${tx(T(s.label))}</div></div>`,
    )
    .join("\n          ");
}

/* ---------- main ---------- */
export function renderHome(home: any, settings: any): string {
  let h = MARKUP;

  /* --- array sections --- */
  if (home?.serviceGroups?.length) {
    h = splice(
      h,
      `repeat(auto-fit,minmax(300px,1fr));gap:18px;">`,
      `<div data-rev style="margin-top:40px;display:flex;justify-content:center;">`,
      `\n${renderServices(home.serviceGroups)}\n      </div>\n      `,
    );
  }
  if (home?.gallery?.length) {
    h = splice(
      h,
      `grid-auto-rows:minmax(120px,auto);">`,
      `</section>\n\n  <!-- YORUMLAR -->`,
      `\n      ${renderGallery(home.gallery)}\n    </div>\n  `,
    );
  }
  if (home?.reviews?.length) {
    h = splice(
      h,
      `repeat(auto-fit,minmax(290px,1fr));gap:18px;">`,
      `</section>\n\n  <!-- ILETISIM -->`,
      `\n        ${renderReviews(home.reviews)}\n      </div>\n    </div>\n  `,
    );
  }

  /* --- story body + stats --- */
  if (home?.storyBody) {
    const story = `<div data-rev data-en="${attr(lexToParas(home.storyBody.en ?? home.storyBody))}">${lexToParas(home.storyBody.tr ?? home.storyBody)}</div>`;
    h = splice(
      h,
      `her gün incelen bir zanaat.</span></h2>`,
      `<div data-rev style="display:flex;gap:44px;flex-wrap:wrap;">`,
      `\n        ${story}\n        `,
    );
  }
  if (home?.storyStats?.length) {
    h = splice(
      h,
      `<div data-rev style="display:flex;gap:44px;flex-wrap:wrap;">`,
      `</div>\n      <div class="ekStoryImgs"`,
      `\n          ${renderStats(home.storyStats)}\n        </div>\n      `,
    );
  }

  /* --- hero + CTA text ---
     TR node is always replaced. The EN attr is replaced ONLY when the CMS has
     a distinct English value, so we never overwrite the design's baked-in
     English with a Turkish fallback. */
  const pairs: [string, string][] = [];
  const trEn = (
    field: any,
    trAnchor: string,
    enAnchor: string,
  ) => {
    if (!field) return;
    pairs.push([trAnchor, tx(T(field))]);
    if (field?.en) pairs.push([enAnchor, attr(field.en)]);
  };
  trEn(
    home?.heroTagline,
    "Saç kesmiyoruz; stil ve sakin bir özgüven tasarlıyoruz.",
    "We don't just cut hair — we shape style and quiet confidence.",
  );
  trEn(
    home?.heroIntro,
    "2008'den bu yana Bursa'da usta berberlerden oluşan bir aile. Sakin, özenli ve her seferinde dikkatle tamamlanan bir iş.",
    "A family of master barbers in Bursa since 2008. Calm, careful, and finished with care — every single time.",
  );
  trEn(home?.ctaHeading, "Bu imzayı taşı.", "Wear the name.");
  trEn(
    home?.ctaText,
    "Bursa'nın sakin ve özenli erkek berber salonunda yerini ayırt.",
    "Reserve your chair at Bursa's calm, careful men's grooming house.",
  );
  // Story heading (runs after the story-body splice, which anchors on it).
  trEn(
    home?.storyHeading,
    `Babadan ustaya geçen,<br><span style="font-style:italic;color:var(--clay);">her gün incelen bir zanaat.</span>`,
    "A craft passed down,<br>perfected every day.",
  );
  for (const [from, to] of pairs) if (to) h = h.split(from).join(to);

  /* --- reviews subtitle ("1.000+ Google değerlendirmesi") --- */
  if (home?.reviewsText) {
    const block = `<span style="color:var(--ink);font-weight:600;">1.000+</span> <span data-en="Google reviews">Google değerlendirmesi</span>`;
    const en = home.reviewsText.en ? attr(home.reviewsText.en) : "Google reviews";
    h = h.split(block).join(`<span data-en="${en}">${tx(T(home.reviewsText))}</span>`);
  }

  /* --- rating + years --- */
  if (home?.ratingValue) h = h.split(">4.9<").join(`>${tx(home.ratingValue)}<`);
  if (home?.yearsValue) h = h.replace(`>17<span style="color:var(--clay);">`, `>${tx(String(home.yearsValue))}<span style="color:var(--clay);">`);

  /* --- settings: links, contact, hours --- */
  const s = settings ?? {};
  const book = T(s.bookingUrl);
  if (book) h = h.split("https://www.kolayrandevu.com/kisi/erdal-kara78").join(attr(book));

  const wa = digits(s.whatsapp) || digits(s.phone);
  if (wa) {
    h = h.split("https://wa.me/905324567480").join(`https://wa.me/${wa}`);
    h = h.split("tel:+905324567480").join(`tel:+${wa}`);
  }
  if (T(s.phone)) h = h.split("+90 532 456 74 80").join(tx(T(s.phone)));
  if (T(s.instagram)) h = h.split("https://www.instagram.com/kuaforerdalkara").join(attr(T(s.instagram)));
  if (T(s.googleMaps))
    h = h.split("https://www.google.com/maps?q=Erdal+Kara+Hair+Design+So%C4%9Fanl%C4%B1+Osmangazi+Bursa").join(attr(T(s.googleMaps)));
  if (T(s.mapEmbedUrl))
    h = h.split("https://www.google.com/maps?q=So%C4%9Fanl%C4%B1%20Mah.%203.%20Meltem%20Sok.%20No%3A23B%20Osmangazi%20Bursa&output=embed").join(attr(T(s.mapEmbedUrl)));

  // working hours (contact card)
  if (Array.isArray(s.hours) && s.hours.length) {
    const rows = s.hours
      .map((r: any, i: number) =>
        i === 0
          ? `${tx(T(r.label))}&nbsp;&nbsp;${tx(r.value)}`
          : `<span style="color:var(--muted);">${tx(T(r.label))}&nbsp;&nbsp;${tx(r.value)}</span>`,
      )
      .join("<br>");
    h = splice(
      h,
      `<div style="font-size:16px;color:var(--ink);">`,
      `</div>\n            </div>\n          </div>\n          <div style="display:flex;gap:12px;flex-wrap:wrap;margin-top:4px;">`,
      rows,
    );
  }

  return h;
}
