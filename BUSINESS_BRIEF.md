# Erdal Kara Hair Design — Business Brief

> Research compiled for the website rebuild. Sources: current site (erdalkara.com.tr), Instagram (@erdalkarahairdesign), Google profile, KolayRandevu, Facebook (kuaforerdalkara), owner-provided screenshots & feedback.

---

## 1. Identity

- **Business:** Erdal Kara Hair Design — men's hair salon / barber ("erkek kuaför / berber").
- **Established:** 2008 (~18 years in business).
- **Tagline (English, used on IG):** "BEST BARBER FOR MEN."
- **Positioning:** Premium men's grooming — "Hair Design," VIP services, artistry & confidence. Not a budget shop.
- **Owner:** Erdal Kara. Family-run — barbers **Erdal Kara, Can Kara, Hamza Kara**.

### Branding note — IMPORTANT
- **No official logo exists.** The circular bearded-man emblem on Instagram is just a profile picture, NOT a brand mark — do not treat it as official.
- **The brand is the name itself: "ERDAL KARA" (wordmark).** The new site should anchor on a strong typographic treatment of the name. Opportunity to design a clean custom wordmark later.

---

## 2. Location & Contact

- **Address:** Soğanlı Mah., 3. Meltem Sk. No:23/B, 16190 Osmangazi/Bursa, Turkey
- **Phone / WhatsApp:** 0532 456 74 80
- **Email:** info@erdalkara.com.tr
- **Instagram:** @erdalkarahairdesign (~1,476 followers, ~241 posts, verified ✓)
- **Facebook:** kuaforerdalkara
- **Booking platform:** KolayRandevu (kolayrandevu.com/isletme/erdal-kara-hair-design)

---

## 3. Reputation (KEY ASSET — currently buried on the old site)

- **Google:** ~4.9★ from ~1,019 reviews (per site map widget).
- **KolayRandevu:** 5★ from ~696 reviews / ~2,284 ratings.
- **Review themes:** cleanliness, on-time appointments, professionalism, warm/friendly service, strong recommendations. One review noted a repeat customer traveling from İzmir.

→ This trust signal should be front and center on the new site.

---

## 4. Services & Pricing (from KolayRandevu)

| Category | Service | Price (TL) |
|---|---|---|
| **Hair** | Child haircut | 800 |
| | Standard haircut | 800 |
| | VIP haircut | 1,000 |
| | Anatomic cut | 1,000 |
| | Long-hair models | 1,400 |
| | Special haircut (~59 min) | 1,400 |
| | Wash & blow-dry | 300–400 |
| **Beard** | Beard trim | 300 |
| | VIP beard trim | 400 |
| | Special beard design | 400 |
| **Skin & Hair Care** | Express skin care | 750 |
| | Express hair care | 750 |
| | Full skin & hair package | 1,500 |
| **Eyebrow & Waxing** | Eyebrow design | 300 |
| | Waxing | 300 |

Service categories (Turkish): saç kesimi, sakal, saç & cilt bakımı, kaş tasarımı / ağda, çocuk traşı.

---

## 5. Hours (a selling point — very long hours)

- **Mon–Sat:** 07:00 – 20:00
- **Sun:** 08:30 – 20:00

---

## 6. Current Website — Structure & Problems

**Pages:** Anasayfa (Home) · Online Randevu · Yol Tarifi (Directions) · Kurumsal (About / Gallery / Kids / Suggestions & Complaints / HR-Jobs) · Blog · Yorumlar (Reviews).

**Blog topics:** Damat Traşı (groom's shave), çocuk traşı, perma, sakal bakımı, saç & cilt bakımı, anatomik saç kesimi.

**Other features:** online booking links out to KolayRandevu; WhatsApp float button; job application form; feedback/complaint form; embedded Google map.

**Why it's being replaced (problems):**
- Dark, muddy, cluttered; low visual hierarchy.
- Low-contrast text over busy photos (e.g. hero "bir ortamda").
- Service cards = stock photos with text baked into the image (blurry, not editable).
- Amateur clip-art Google-review graphics.
- Repeated orange "HEMEN RANDEVU AL" bars; inconsistent fonts & buttons.
- Premium positioning NOT reflected in the cheap-looking design.

---

## 7. New Site — Confirmed Requirements

- **Multilingual from launch:** Turkish (primary/default) + English. Architecture must be extensible to more languages — build i18n in from the start, not bolted on.
- **Wordmark-driven branding** ("ERDAL KARA"), since there is no logo.
- **Premium, modern aesthetic** that matches the "best barber for men" positioning.
- **Lead with reputation** (4.9★ / 1000+ reviews) and real work photos (IG grid > current stock images).

---

## 8. Tech Stack (confirmed)

- **Framework:** Next.js (latest version).
- **Styling:** Tailwind CSS (latest).
- **CMS / admin panel:** Payload CMS (integrated into the Next.js app). Its native localization supports the TR + EN requirement.

---

## 9. Booking (confirmed)

- **Phase 1 (launch):** link out to KolayRandevu for bookings (no native system yet).
- **Phase 2 (later):** build a native booking system and integrate it into the site. Design should anticipate this — booking CTAs are first-class now, swap the destination later.

## 10. Primary Goal (owner's intent)

The site's #1 job at launch is **building a professional image / trust**. The owner wants potential customers to land on it and think *"wow, they're genuinely good at this"* — converting reputation into trust before the customer ever walks in. Design must signal premium craft & credibility above all.

---

## 11. Design Direction (confirmed)

**Aesthetic: Dark & Cinematic** — luxe, exclusive, masculine, craft-focused. Highest "wow" ceiling; the territory high-end barbers own. Principle throughout: *restraint + craft* (do less, perfectly).

**Color** — near-monochrome dark + one warm metallic:
- Base near-black `#0A0A0B` / `#121214` (true rich dark, not muddy grey)
- Text warm off-white `#EDEAE3`
- Accent **bronze/gold** `~#C9A227`, used on <10% of screen (CTAs, rating stars, hairlines, hovers). Scarcity = luxe.

**Typography:**
- Display: **high-contrast editorial serif** (Canela/Ogg feel) — for the "ERDAL KARA" wordmark + section headers. Oversized, tight tracking.
- Body: clean neutral sans (Inter/Geist) — must cover Turkish glyphs (ş ğ ı İ ç).

**Motion** — restrained, easing-quality over quantity (~600–800ms, never bouncy):
- Hero: looping cut-in-progress video clip or slow Ken-Burns; wordmark fades/rises in
- Reveal-on-scroll (fade + rise), gentle image parallax
- Count-up animation on trust stats
- Magnetic buttons, image hover zoom, slow review marquee, smooth page-transition fades

**Homepage scroll story:**
1. Hero — oversized ERDAL KARA wordmark, tagline, cinematic video/photo, CTA (Randevu Al → KolayRandevu), language toggle, 4.9★ trust line
2. Trust band — animated counters: 4.9★ · 1,000+ reviews · 18 yrs · 3 master barbers
3. Services — dark cards (haircut / beard / skin & hair care / kids), price-from, real photos (no baked-in text)
4. Work gallery — cinematic grid of real cuts (from IG), lightbox
5. Barbers / story — Erdal, Can, Hamza + "since 2008" heritage
6. Reviews — real Google reviews, marquee/cards, link out to Google
7. Visit — map, hours (highlight long hours), address, WhatsApp/call
8. Footer — wordmark, socials, language, floating "Randevu Al"

---

## 12. Open Questions (to resolve before build)
- **Scope:** premium one-pager vs. multi-page (blog, gallery, jobs/HR)?
- **Assets:** real high-res photos + any brand files available, or work from IG grid / screenshots?
