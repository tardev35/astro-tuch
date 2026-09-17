# BRAND SPEC — JOKERSLOTZ (read-only for subagents)

Orchestrator wrote this in Phase P0. **Do not re-extract the docx. Do not
re-choose variants.** Everything you need is here.

---

## 1. Identity

| | |
|---|---|
| Brand name | `JOKERSLOTZ` |
| Real URL | `https://joker-slotz.org` |
| Genre | Joker-themed online slots (Joker Gaming), Thai market |
| Mood | Crimson + antique gold, carnival/jester, dark luxury |
| Previous brand | `LOTTOKA` (lottery, all-`Huay` variants) — every trace must go |
| Font | `google-sans` (was `kanit`) — set in `brandProfile.ts`, do not touch elsewhere |

`BRAND_NAME`, `BRAND_FONT`, `BRAND_TEXT`, `site:`, `wrangler.toml name`,
`site.webmanifest` are **already done by the orchestrator**. Do not edit them.

---

## 2. Palette — use these hex values verbatim

Measured from `logo.webp` / `banner1.png` by the uploader (`palette.json`).

| role | hex | notes |
|---|---|---|
| **Crimson (primary)** | `#a51515` | the logo's red. The brand hue. |
| Crimson bright | `#c81e1e` | hover / active |
| Crimson deep | `#6d0d0d` | borders, pressed |
| **Gold (accent)** | `#d9b45e` | the jester hat / logo gold |
| Gold light | `#f2dc9a` | highlights, `<strong>`, active nav |
| Gold deep | `#bc9b5b` | antique edge, dividers |
| Surface (card) | `#2b0204` | dark maroon — banner1's own background |
| Surface deep | `#1c0202` | near-black maroon, page/section base |
| Body text | `#ecdfd0` | warm ivory — this is `BRAND_TEXT` |
| Muted text | `#ecdfd0` at `/70` | secondary copy |

Glow/shadow: `rgba(217,180,94,0.45)` (gold) and `rgba(165,21,21,0.45)` (crimson).

Page background is `src/assets/bg.json` → `{"mode":"color","color":"#290f0f"}`.
It came with **this** asset drop (mtime 2026-09-17). Leave it alone.

### Colours to leave untouched
LINE green `#00B900`, success/"live" greens, real bank brand colours in
`BankStrip`/`LatestWinners*` bank logos.

### Colours to hunt and kill
The outgoing brand and the untouched variants carry these — replace every one:
- rose/pink highlight `#ff9a9d` → **`#f2dc9a`** (gold)
- `#ded9da` body text → **`#ecdfd0`**
- Premium-family steel blue/navy `#ccd6e6`, `#0f1a2b`, `#141d2e`, `slate-*`,
  `#1b2436` → crimson/maroon equivalents above
- any `purple-*`, `violet-*`, `emerald-*`, `cyan-*`, `teal-*`, `indigo-*`
  Tailwind families left in a variant you newly wire in

---

## 3. Variant rotation — DECIDED, do not deviate

| family | before (LOTTOKA) | after (JOKERSLOTZ) |
|---|---|---|
| Navbar | `NavbarHuay` | **`NavbarPremium`** (orchestrator owns) |
| Footer | `FooterHuay` | **`FooterPremium`** (orchestrator owns) |
| Announcement | `AnnouncementHuay` | **`AnnouncementPremium`** (orchestrator owns the file; each page changes its own import line) |
| LatestWinners | `LatestWinnersHuay` | **`LatestWinnersPremium`** (Agent A) |
| FAQ | `Faq4` | **`Faq2`** (Agent A) |
| Grid widget | `LottoGrid` (lottery) | **`ProviderGridPremium`** (Agent A) |
| ContentBox mix | plain, `Huay`, `FloatingBadge`, `Special`, `TwoHuay`, `3ThreeHuay` | `Premium`, plain, `Neumorphism`, `CyberCut`, `SevenThreePremium`, `SevenThree`, `FeatureHighlights` |

**Unused variants are INVENTORY for the next brand. Never delete a component
file, never delete an unused import target.** `Huay` files stay on disk exactly
as they are — they are the next lottery brand's kit.

---

## 4. Docx heading checklist — every one must survive, in this order

Source: `src/assets/content.txt`. **Body text must be the full paragraph that
follows the heading — never summarised, never merged.**

| # | lvl | heading | body |
|---|---|---|---|
| 1 | H1 | JOKERSLOTZ ทางเข้าสำรอง โจ๊กเกอร์สล็อตอันดับ 1 ในไทย | content.txt L4 |
| 2 | H2 | ลิ้งก์ทางเข้าสำรอง JOKERSLOTZ ใช้ยูสใหม่ ปลอดภัยขึ้น100% | L6 |
| 3 | H2 | โปรสล็อต JOKERSLOTZ มาแรง สมาชิกกดรับทุกวัน | L8 |
| 4 | H3 | โปรโมชั่น แนะนำเพื่อน 0.8% | L10 |
| 5 | H3 | โปรโมชั่น คืนยอดเสีย 0.3% | L12 |
| 6 | H2 | สมัคร JOKERSLOTZ บนทางเข้าใหม่ 3 ขั้นตอน | L14 + 3 steps L15–17 |
| 7 | H2 | ติดต่อแอดมิน JOKERSLOTZ ได้ 24 ชั่วโมง | L19 |
| 8 | H2 | คำถามที่พบบ่อย (FAQ) | Q1–Q3, L21–26 |

The docx has a **genuine H1→H2→H3 hierarchy** (#4 and #5 are real H3 sub-points
of #3). Do **not** flatten to H2-only.

**Target inventory for `/` (index): `h1×1, h2×5, h3×5`.**
The five H3 = #4, #5, plus the three signup steps under #6 rendered by
`FeatureHighlights` (its `title` renders as `<h3>` — the playbook's sanctioned
sub-point component). `Faq2` takes a dynamic `as` tag and renders its questions
inside `<summary>`, contributing no heading of its own.

### Home page title / meta — use VERBATIM, do not pad
```
Title:       ทางเข้าสำรอง JOKERSLOTZ โจ๊กเกอร์สล็อตอันดับ 1 ในไทย
Description: JOKERSLOTZ ทางเข้าสำรอง ล่าสุด เว็บโจ๊กเกอร์สล็อตอันดับ 1 ในไทย สมัครสมาชิกรับ User เข้าเล่น ลิ้งก์ใหม่ได้ทันที
```
A brief-supplied description is used at whatever length it arrives. Do not top
it up to 150 characters.

---

## 5. Images — which file goes where

`src/assets` holds stale art from earlier clients. **This drop is mtime
2026-09-17.** Anything older is another brand's and must stay unimported.

| file | mtime | role |
|---|---|---|
| `banner1.png` | 09-17 ✅ | hero — `MainLayout`'s pinned glob. No page references it. |
| `banner1-mobile.png` | 09-17 ✅ | phone crop of the hero, same glob. Not article art. |
| `slide1.png` | 09-17 ✅ | **"โปรโมชั่น แนะนำเพื่อน 0.8%"** → docx H3 #4 |
| `slide2.png` | 09-17 ✅ | **"โปรโมชั่น คืนยอดเสีย 0.3%"** → docx H3 #5 |
| `og.png` | 09-17 ✅ | og:image, handled by `MainLayout`. Leave. |
| `banner2.png` | 08-20 ❌ | STALE — previous client. Do not import. |
| `banner3.png` | 08-11 ❌ | STALE. Do not import. |
| `slide3.png` | 08-13 ❌ | STALE. Do not import. |
| `slide4.png` | 08-13 ❌ | STALE. Do not import. |

**slide1 and slide2 map 1:1 onto docx H3 #4 and #5** — the artwork literally
prints those two offers. They go in the **two** `ContentBoxSevenThree*` blocks
on the index (the playbook's hard cap is 2 per rebrand; this uses exactly 2).
A slide may appear **only** inside a `ContentBoxSevenThree*`.

No `banner2/3/4` illustration is used this round — all are stale.

`/promotion`'s image grid uses **slide1 and slide2 only** (slide3/4 are stale;
if the page currently imports them, drop those imports).

### alt text
The alt **is the text printed on the image**. Read the file with `Read` before
writing alt. Describe the jester, the crimson/gold artwork, and quote the offer.

---

## 6. Rules that fail the build if you break them

`npm run build` runs `tools/verify-build.mjs` as `postbuild`. These are ERRORS:

- **One `<h1>` per page.** Chrome (navbar, footer, ticker, winners feed,
  provider grid, card labels, badges) may **never** take a heading tag at any
  level — render those labels as `<p>`/`<span>` with the same classes and put
  an `aria-label` on the `<section>`.
- **Every `<h1>/<h2>/<h3>` must trace to the docx.** A stray heading is as much
  a defect as a missing one.
- **No off-domain URLs.** Never type a domain. Never build a URL with `+`.
  All JSON-LD comes from `pageGraph()` in `src/lib/schema.ts`.
- **No `href="#"`, no `onclick=`.** Back-to-top is `<a href="#top">`.
- **Every image needs a real descriptive `alt`.** Decorative repeats get
  `alt=""` **and** `aria-hidden="true"` on the wrapper.
- **Decorative emoji need `aria-hidden="true"` on their own element** —
  a sibling `<span>`, never inside the label's text.
- **No `<script define:vars>` / attribute-less `<script>`** on an indexable page.
- **No HTML comments** (`<!-- -->`) in anything that renders — Astro ships them
  verbatim. Strip them from every component you rewrite. Use frontmatter `//`
  comments instead.
- **Meta description ≤ 200 chars** (aim 150–160 for ones you write yourself;
  count characters, not bytes — Thai is 3 bytes/char).
- **No `Review`, `AggregateRating`, `sameAs`, `address`/`PostalAddress`** in
  JSON-LD.
- **No `Math.random()` / `Date.now()` in frontmatter** — builds must be
  deterministic. Use `brandPick`/`brandFlag`.
- **AVIF must not outweigh its WebP sibling** — handled by the image service;
  just don't raise `quality`.
- FAQ accordions are `<details>`/`<summary>`, no `<script>`.

### House style for body copy
- Slot-carrying element: `text-left text-base leading-relaxed text-[#ecdfd0]`.
  No `text-sm`, no `text-lg` for prose.
- Headings may be centered, but put `text-center` on the heading itself, never
  on the card/`<section>` (it inherits into the slot).
- **Never** add `mx-auto max-w-4xl` to a `<p>` in a page — the card already caps
  width.
- Pass exactly **one** element per slot.
- Don't re-add a wrapper `<div>` inside a `ContentBox*` — all 25 are flattened
  (`isolate` on the card + `-z-10` on decorative layers). Keep it that way.
- `<strong>` must wrap a whole space-delimited chunk of the brief's sentence —
  Thai has no inter-word spaces, so a mid-word highlight lets the formatter
  break the line inside the tag. Copy must read identically with tags removed.
  Highlight colour: `#f2dc9a`.

### Behaviour lives in `src/lib/`, never inline
- Navbars: `import { isActivePath } from "../lib/nav"` — never hand-write it.
- Winners feed: `src/lib/winnersFeed.ts`, server-render the first rows, keep the
  `data-winner-*` hooks and the `data-*` config attributes.
- Counters: `src/lib/liveCounter.ts`.
- Do not reintroduce Swiper — `SmoothCarousel` is CSS-only now.

### Images in markup
Always tell Astro the drawn size: `widths={[...]}` + `sizes="..."` describing
how wide it is **drawn**. Only the LCP image gets
`loading="eager" fetchpriority="high"`.

### Structured data
```ts
const graph = pageGraph(Astro, { name, description, breadcrumb, faqs });
```
`breadcrumb` on every page **except** the homepage. `faqs` only if the page
renders an FAQ — the same array the component gets.

---

## 7. Site-wide decisions already made (context, not your job)

- **Lottery pages OFF.** `ตรวจหวย.astro` and `แนวทาง.astro` moved to
  `src/pages-disabled/` — JOKERSLOTZ is a slot brand. `NavbarPremium` and
  `FooterPremium` carry no links to them.
- **cta toggles ON.** `login.astro` and `register.astro` are real button pages
  with a `targetUrl` affiliate link. `/ทางเข้า` stays routed and indexed but has
  no menu entry, by design.
- **`about-us` stays ON** and is fully rebranded (it is linked from both navbar
  and footer).
- `terms.astro` / `privacy.astro` need no edits — they read `BRAND_NAME`.
- `BRAND_ADDRESS` derives itself from `BRAND_NAME`. Never hand-write it, never
  put it in JSON-LD.

---

## 8. Final reminders

- **Do NOT run `npm run build`.** The orchestrator runs the single build.
- **Do NOT delete any component file.**
- **Only touch the files on your own list.**
- When rewriting a component, do a full-file `Write` rather than many small
  edits, and strip its HTML comments in the same pass.
