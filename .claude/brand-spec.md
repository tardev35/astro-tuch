# BRAND SPEC — LOTTOPLUS (rebrand round 2026-09-29)

> Single source of truth for this rebrand. **Do NOT re-extract the docx and do
> NOT re-choose variants** — everything the fan-out agents need is here.
> Orchestrator wrote this in Phase P0; agents A/B/C/D read it.

---

## §1 Identity

| field | value |
|---|---|
| Brand name | **LOTTOPLUS** |
| Brand type | **เว็บหวยออนไลน์ (lottery)** — NOT a casino, NOT slots |
| Real URL (given in prompt) | `https://huay-lottoplus.com` |
| `astro.config.mjs` `site:` | `https://huay-lottoplus.com` |
| `wrangler.toml` `name` | `huay-lottoplus` |
| `BRAND_NAME` | `LOTTOPLUS` |
| `BRAND_FONT` | `kanit` (previous brand was `google-sans` — rotated) |
| `BRAND_TEXT` | `#f0e2e2` |
| Outgoing brand to erase | **WIN999** (and any older: LOTTO24, 365LOTTO, 888PARUAY, JEDI66, SUMOHENG) |

Contact address + email derive themselves from `BRAND_NAME` / `site:` via
`BRAND_ADDRESS`. **Nothing to write by hand.** Do not add `ADDRESS_OWNER` /
`ADDRESS_LINES` — the operator gave no registered address.

---

## §2 Palette — red primary, gold secondary, near-black ground

Measured from `src/assets/palette.json` + reading the artwork:
`logo.webp` vivid `#dc020e` (red block wordmark, white letters) · `banner1.png`
dominant near-black `#1b1a1b`/`#141313`/`#0c0c0c`, vivid deep reds
`#820b0c`/`#4a0303`/`#3c0202`, plus **gold** coins and a gold crown, and
red-and-white lottery balls.

**The identity colour MOVES FROM GOLD TO RED this round.** WIN999 was
gold-primary. LOTTOPLUS is **red-primary with gold as the secondary accent**.

### Canonical token set — use these exact hexes

| token | hex | role |
|---|---|---|
| red-bright | `#ff2d38` | active/hover state, highlight |
| **brand-red** | `#dc020e` | PRIMARY accent — borders, bars, glows |
| red-mid | `#a80710` | gradient middle |
| red-deep | `#6b0207` | gradient end, deep borders |
| gold-light | `#fde79a` | gradient start on gold runs |
| **gold** | `#f3c623` | SECONDARY accent (coins/crown motif) |
| gold-deep | `#8a6a0a` | gold gradient end, hairline dividers |
| ground | `#050505` | page ground (bg.json is `#000000`, unchanged) |
| card-dark | `#120b0c` | card / panel surface |
| card-warm | `#1f0a0c` | raised surface, ticker capsule |
| panel | `#2a0d0f` | secondary button surface, chips |
| **body** | `#f0e2e2` | body copy (= `BRAND_TEXT`) |
| strong | `#fff4f4` | `<strong>` highlight inside paragraphs |
| ink | `#1a0203` | dark ink, **only on gold surfaces** |
| red glow | `rgba(220,2,14,α)` | shadows |
| gold glow | `rgba(243,198,35,α)` | shadows |

Tailwind hue family, when a utility class is the right tool: **`red-*`**
(with `amber-*`/`yellow-*` only for the gold secondary). Old identity family
was `amber-*`/`yellow-*` + the gold hexes below.

### 🚨 Contrast rule — ink colour depends on the button's surface

Measured (WCAG, on the tokens above):

- ink `#1a0203` on **gold** `#f3c623` → **12.4:1** ✅ → gold buttons get dark ink
- ink `#1a0203` on **brand red** `#dc020e` → **3.85:1** ❌ → **never** dark ink on red
- `#ffffff` on **brand red** `#dc020e` → **5.17:1** ✅ → red buttons get white text
- `#f0e2e2` on **card-dark** `#120b0c` → **15.5:1** ✅ body copy

So: **gold surface → `#1a0203` ink. Red surface → white text.** A gradient that
ends in red-deep `#6b0207` must carry white text.

### Old values to eradicate (grep for these)

WIN999 gold set: `#fcc403` `#fdda04` `#e0a800` `#8a6502` `#fff0a8` `#120d02`
`#e9e4d6` `#fffbea` `#100d05` `#101010` `#191712` `#0a0803` `#c2c8d0`
`rgba(252,196,3,*)` `rgba(253,218,4,*)` `rgba(233,228,214,*)` `rgba(16,13,5,*)`
`rgba(74,52,2,*)` `rgba(3,2,0,*)`

LOTTO24 / older red-gold set (present in the Huay-family files and in
NavbarHuay/FooterHuay/AnnouncementHuay/ContentBoxHuay, which this brand
adopts — these are the *previous* brand's reds, not ours): `#dc2626`
`#fc2b2c` `#b40102` `#fde68a` `#fbbf24` `#a16207` `#e0a010` `#15060a`
`#1c0607` `#2a0405` `#f6e2e2` `#e0c4c4` `#240808` `#a87d0c` `#fcdc2b`
`#cf1111` `#e8e4c6` `#140404` `#fadc64` `#fdf3b4` `#e0b03a` `#e01f26`
`#f0ddc4` `#2a0b0e` `#9c6a12` `rgba(251,191,36,*)` `rgba(220,38,38,*)`
`rgba(6,1,2,*)` `rgba(10,1,1,*)`

**Keep untouched:** LINE green `#00B900`/`#009900`, bank-logo colours
(`BankStrip` is brand-neutral by design — do not theme it), green
"live"/success dots that mean status rather than brand.

---

## §3 Variant rotation — before → after

Read from `git show HEAD:src/layouts/MainLayout.astro` and
`git show HEAD:src/pages/index.astro`.

| family | WIN999 (outgoing) | **LOTTOPLUS (this round)** | why |
|---|---|---|---|
| Navbar | `NavbarPremium` | **`NavbarHuay`** | lottery-genre icons already; red/gold shell fits the artwork |
| Footer | `FooterPremium` | **`FooterHuay`** | it is the only footer that carries `/ตรวจหวย` + `/แนวทาง` shortcuts, which this brand needs |
| Announcement | `AnnouncementPremium` | **`AnnouncementHuay`** | one ticker sitewide, lottery wording |
| LatestWinners | `LatestWinnersPremium` | **`LatestWinners4`** | different feed shape; `LatestWinnersHuay` is reserved for `/ตรวจหวย` |
| Faq | `Faq3` | **`Faq2`** | `FaqHuay` is reserved for `/ตรวจหวย` |
| ContentBox mix | Premium + FloatingBadge + TwoPremium + TwoFloatingBadge + 3ThreePremium + SevenThreePremium + SevenThreeFloatingBadge | **CyberCut + TwoCyberCut + SevenThreeCyberCut + Neumorphism + TwoNeumorphism + SevenThreeNeumorphism + Special + plain ContentBox** | fully different shape-mix; zero file reuse from last round except plain `ContentBox`, which is pinned live by terms/privacy and never rotates |
| Review cards | `ReviewCardSumo2` | **`ReviewCardSumo`** | rotated |
| Brand font | `google-sans` | **`kanit`** | breaks the shared `google-sans-v70-*.woff2` path set |

Dropped this round, **all files stay on disk as inventory**: every `*Premium`
and `*FloatingBadge` ContentBox, `AnnouncementPremium`, `LatestWinnersPremium`,
`Faq3`, `NavbarPremium`, `FooterPremium`, `ProviderGrid*`, `FeaturedGames`,
`PopularGamesStrip`, `GameRankingBoard`, `SmoothCarousel`, `BankStrip` is
still used by the footer. **Never delete an unused variant** — it is inventory
for the next brand.

---

## §4 Vocabulary — this is a LOTTERY site

Allowed and expected: หวย · แทงหวย · ส่งโพย · โพย · รอบหวย · อัตราจ่าย ·
เลข 2 ตัว / 3 ตัว · หวยรัฐบาลไทย · หวยลาวพัฒนา · หวยฮานอย · หวยหุ้น ·
ตรวจผลหวย · ตรวจหวย · คืนยอดเสีย · แนะนำเพื่อน · บัญชีบริษัท · ไม่ผ่านตัวแทน

**Forbidden — the previous brand was a casino and every one of these is wrong
now:** คาสิโน · บาคาร่า · สล็อต · เกมไพ่ · ค่ายเกม · RTP · ผู้ให้บริการเกม ·
เดิมพันกีฬา/บอล · เว็บตรง (as a claim) · ใบอนุญาต.

Figures the brief names, and the ONLY ones that may appear: **2 ตัว 100** ·
**3 ตัว 1,000** · **คืนยอดเสีย 0.3%** · **แนะนำเพื่อน 0.8%** · **24 ชั่วโมง**.
No bank name, no minimum deposit, no licence number, no provider name — the
brief names none.

The brief also carries two explicit hedges that must survive in the copy: the
“ปลอดภัย 100%” claim needs verifiable measures behind it, and payout rates
depend on lottery type / bet form / round, so the number the system shows at
โพย-confirm time is authoritative. Do not drop these.

---

## §5 Home page title / description — verbatim from the brief

```
title       LOTTOPLUS หวยออนไลน์ไม่ผ่านแอป แทงหวย ตรวจผล ฝากถอนปลอดภัย100%
description LOTTOPLUS หวยออนไลน์ไม่ผ่านแอป สมัครเข้าแทงหวย รัฐบาลไทย ลาวพัฒนา ฮานอย หวยหุ้น ตรวจผล ฝากถอนปลอดภัย100%
```

The brief supplied both → **used verbatim, not padded**. `verify-build` exempts
the home page from the 150-char floor for exactly this reason.

Sub-page `title`/`description`: the brief has **no `SUB-PAGES` section**, so
each page's are yours to infer — **150–160 characters, counted as CHARACTERS
not bytes**, one sentence saying what the page is for. Do not append clause
after clause.

---

## §6 docx heading checklist — `src/pages/index.astro`, in document order

Source: `src/assets/content.txt`. Every heading survives, in this order, with
the FULL paragraph text that follows it. Nothing merged, nothing summarised.

| # | level | heading | paragraphs | carrier |
|---|---|---|---|---|
| 1 | H1 | LOTTOPLUS หวยออนไลน์ไม่ผ่านแอป แทงหวย ตรวจผล ฝากถอน ปลอดภัย100% | txt L4 + L5 (2 ย่อหน้า) | `ContentBoxCyberCut as="h1"` |
| 2 | H2 | เข้าแทงหวย LOTTOPLUS รัฐบาลไทย ลาวพัฒนา ฮานอย หวยหุ้น ครบทุกแนว | L7 + L8 | `ContentBoxTwoCyberCut` (one per column) |
| 3 | H2 | โปรโมชั่นและอัตราจ่าย หวย LOTTOPLUS สุดพิเศษ | L10 | `ContentBoxNeumorphism as="h2"` |
| 4 | H3 | อัตราจ่าย หวย 2ตัว100 | L12 | `ContentBoxSevenThreeCyberCut as="h3"` **+ slide1** |
| 5 | H3 | อัตราจ่าย หวย 3ตัว1,000 | L14 | `ContentBoxSpecial as="h3"` |
| 6 | H3 | คืนยอดเสีย โบนัส 0.3% | L16 | `ContentBox as="h3"` (plain — shared file, USE it, do not EDIT it) |
| 7 | H3 | แนะนำเพื่อน โบนัส 0.8% | L18 | `ContentBoxSevenThreeNeumorphism as="h3"` **+ slide4** |
| 8 | H2 | สมัครแทงหวย LOTTOPLUS เข้าบัญชีบริษัทตรง ไม่ผ่านตัวแทน | L20 + L21 | `ContentBoxTwoNeumorphism` |
| 9 | H2 | ติดต่อสอบถามแอดมินผู้ให้บริการ LOTTOPLUS ได้ 24 ชั่วโมง | L23 + L24 | `ContentBoxCyberCut as="h2"` + LINE / สมัคร buttons |
| 10 | H2 | คำถามที่พบบ่อยเกี่ยวกับ LOTTOPLUS | 3 Q/A pairs, L26–L31 | `Faq2 as="h2"` + `faqs` prop |

**Final heading inventory for `/`: `h1×1`, `h2×5`, `h3×4`.**
The docx has a genuine H2→H3 nesting, so the page is **not** flattened to
H2-only — the four H3s are real docx headings and stay H3.

FAQ array (verbatim from the brief, L26–L31) must be passed as the `faqs` prop
to **both** `<Faq2>` and `pageGraph`'s `faqs:` — never the component's own
defaults.

Non-docx widgets go **before** section 1 or **after** section 10, never spliced
between docx sections: `LatestWinners4` right after the ticker;
`LoginRtpSection` + `ReviewCardSumo` after the FAQ.

### Chrome may not take a heading tag — at any level

Only the ten rows above may emit `<h1>/<h2>/<h3>`. `LatestWinners4`,
`LoginRtpSection`, `ReviewCardSumo`, `Navfoot`, navbar, footer, ticker render
their labels as `<p>`/`<span>` with the same classes, plus `aria-label` on the
`<section>` where the label named the region. `grep -n '<h[1-6]'` every
component you touch and downgrade hardcoded ones **inside the component**,
keeping the classes.

---

## §7 Image roles for THIS drop (all files dated 2026-09-29 22:06–22:07)

| file | mtime | role |
|---|---|---|
| `logo.webp` | 09-29 | logo — red block, white `LOTTOPLUS` wordmark |
| `banner1.png` | 09-29 | **hero**, owned by `MainLayout`'s pinned glob. Never reference from a page. |
| `banner1-mobile.png` | 09-29 | current (same mtime as banner1) → optional phone `<source>`, owned by `MainLayout`. Never put in a ContentBox. |
| `og.png` | 09-29 | og:image, owned by `MainLayout`. |
| `slide1.png` | 09-29 | **USED** — "โปรโมชั่นและอัตราจ่าย / อัตราจ่าย หวย **2ตัว100**" → checklist #4 |
| `slide2.png` | 09-29 | unused — reads "3ตัว1,000"; SevenThree cap of 2 already spent |
| `slide3.png` | 09-29 | unused — pixel-for-pixel the same offer as slide2 |
| `slide4.png` | 09-29 | **USED** — "แนะนำเพื่อน โบนัส **0.8%**" → checklist #7 |
| `banner2.png` | **09-28** | **STALE** — predates this drop (WIN999/LOTTO24 artwork). Do not import. |
| `banner3.png` | **09-27** | **STALE** — do not import. |

Hard rules restated: `slide*` may appear **ONLY** inside a
`ContentBoxSevenThree*` block — never a plain `ContentBox`, never a bare
`<img>`, never a grid. `ContentBoxSevenThree*` is capped at **2 per rebrand**,
and both are spent (#4 and #7). `/promotion` is the one exception: it has its
own hardcoded `slide1-4` image grid, which stays.

### Alt text for slide1 / slide4 — write it from THIS artwork

Both slides are 600×600, so **600 is the top candidate width**. What is
actually drawn (read them, don't copy the previous round's text — those were
black-and-gold WIN999 posters and these are not):

- white/grey studio ground with red and gold ribbon swooshes
- left: a woman with long dark hair in a white-and-black dress holding a strip
  of Thai lottery tickets; right: a young man in a black suit over a white
  shirt, pointing, also holding lottery tickets
- top centre: the `LOTTOPLUS` wordmark in white on a red block
- big red Thai type "โปรโมชั่น" / "และอัตราจ่าย" with a white outline
- slide1: a red pill reading "อัตราจ่าย หวย" above a huge black-and-red
  **`2ตัว100`**
- slide4: a red pill reading "แนะนำเพื่อน โบนัส" above a huge gold **`0.8%`**
- scattered red-and-white numbered lottery balls (6, 9, 3, 7) and stacks of
  gold coins

---

## §8 Page roster + lottery/preset decisions (already actioned by orchestrator)

**LOTTOPLUS is a lottery brand**, so per the Phase 4.5 trigger:

- `ตรวจหวย.astro` and `แนวทาง.astro` are **MOVED from `src/pages-disabled/`
  into `src/pages/`** → routes `/ตรวจหวย` and `/แนวทาง` ship.
- Their menu links are added to **`NavbarHuay`** (single `menu` array feeding
  both desktop and mobile) and to **`FooterHuay`**'s `shortcuts` — done by the
  orchestrator in P1. Agents must not edit those two files.
- **Huay-theme exception does NOT apply as an exception this round.** The rule
  exists to stop a *casino* brand's hue being forced onto the lottery
  sub-section. LOTTOPLUS's own palette IS red/gold, so those pages are
  rethemed to §2 like every other page — they are currently on **LOTTO24's**
  reds, which must go.
- `about-us.astro` is present in `src/pages/` with real (WIN999) content and
  is linked from the active navbar → **kept ON and fully rebranded**.
  (A stale `src/pages-disabled/about-us.astro` from JEDI66 also exists; that is
  pre-existing inventory — leave it alone.)
- `login.astro` / `register.astro` are **button pages** (cta toggle ON):
  `const targetUrl` in frontmatter, `CtaRedirect` rendered. Never edit
  `targetUrl`, never add an `<h2>`, never write an article.
- `ทางเข้า.astro` stays routed and indexed but has **no navbar entry** (by
  design, because the cta toggle is on). Do not re-add it to the menu.
- `terms.astro` / `privacy.astro` ship always, are brand-neutral via
  `BRAND_NAME`, render through plain `ContentBox`, and **nothing inside them
  may name a colour**.

### Body-less pages — `h1×1`, `h2×0`, `h3×0` each

- **`/contact-us`** — title, LINE image, `BRAND_ADDRESS` block + `mailto:`,
  then the สมัคร / เข้าสู่ระบบ / LINE button row. **No headings, no prose.**
- **`/ทางเข้า`** — title, then the two-column เข้าสู่ระบบ / สมัครสมาชิก grid.
  **No headings, no prose.**
- **`/promotion`** — title, **one intro paragraph of ~4 lines and that is the
  whole prose budget**, the `slide*` image grid, one `สมัครสมาชิก LOTTOPLUS`
  button. **No section headings.** If the inherited page has `<h2>`s and
  several paragraphs, delete them down to the one intro — that is a fix.

---

## §9 House style — non-negotiable

- Slot-carrying element: `text-left text-base leading-relaxed <colour>`.
  No `text-sm`, no `text-lg` for body prose.
- **Never** `mx-auto max-w-4xl` / `max-w-5xl` on a `<p>` in a page — the card
  already caps its width.
- Headings may be centred, but put `text-center` on the header/heading itself,
  never on the card or `<section>` (it inherits into the slot).
- **One element per slot.** Wrap multiple blocks in one `<div>` yourself.
- Single-slot ContentBox variants are **already flattened** (`isolate` on the
  card, `-z-10` on decorative layers). Do **not** re-add a `relative z-10`
  wrapper `<div>`.
- When hoisting a text colour onto a card, **replace** the card's existing
  colour class — do not add a second one of equal specificity.
- **No HTML comments (`<!-- … -->`)** in any page or rendered component —
  Astro ships them verbatim. Strip existing ones from every file you retheme.
  Put notes in the frontmatter (`//`), which is stripped.
- **No `<style>` block containing only `.font-sans { font-family: var(--font-sans) }`**
  — it makes Astro stamp `data-astro-cid-*` onto every element.
- `<strong>` highlights wrap a **whole space-delimited chunk** of the brief's
  sentence; the copy must read identically with the tags removed. One
  highlight colour only: `#fff4f4` against body `#f0e2e2`.

### Accessibility — these are build ERRORS in `tools/verify-build.mjs`

- Decorative emoji live in their own `<span aria-hidden="true">`, **sibling**
  of the label, never inside its text. No emoji baked into a text prop
  (the ticker prints its message twice).
- No `href="#"`, no `onclick=`. Back-to-top is `<a href="#top">`.
- `alt` describes the picture. Decorative repeats: `alt=""` + `aria-hidden`.
- FAQ accordions are `<details>`/`<summary>` with no `<script>`.
- A widget whose title is a `<p>` needs `aria-label` on its `<section>`.
  **Do not promote that `<p>` to an `h2`.**
- Exactly one `<h1>` per indexable page.

### Behaviour lives in `src/lib/` — do not move it back inline

- Navbars: `const isActive = (path) => isActivePath(currentPath, path);`
  importing `isActivePath` from `../lib/nav`. Never hand-roll it.
- `LatestWinners*`: rows are **server-rendered** from `brandPick`/`brandFlag`
  (never `Math.random()` in frontmatter — the build must be deterministic), and
  `src/lib/winnersFeed.ts` drives the rotation via `data-*` attributes. Keep
  every `data-winner-*` hook and every `data-interval`/`data-max-rows`/
  `data-amount-*`/`data-pending-*`/`data-user-*`/`data-insert`/
  `data-big-win-above` attribute; put this brand's wording and classes in them.
  Restyle the row markup freely. **No `define:vars`, no `is:inline`.**
- `GameRankingBoard` → `src/lib/liveCounter.ts`. Do not reintroduce Swiper.

### Images

- `<Picture>`/`<Image>` always get `widths` + `sizes`; `sizes` describes how
  wide the image is **drawn**. Slides are 600 px square → top candidate 600.
- `quality={80}` is correct; `tools/avif-quality-service.mjs` rescales AVIF to
  0.65× automatically. Do not hand-tune per format.
- Only the hero gets `loading="eager" fetchpriority="high"`. Everything else
  `loading="lazy" fetchpriority="low" decoding="async"`.
- `{/* comment */}` must never sit next to a tag inside a ternary branch —
  it makes the branch two expressions and the build fails. Notes go in
  frontmatter.

### Structured data

One `pageGraph(Astro, {...})` call in frontmatter, rendered as
`<script type="application/ld+json" set:html={graph} />`. `description` must be
the **same string** passed to `MainLayout`'s `description=`. Every page except
`/` passes a `breadcrumb`. **Never type a domain, never build a URL with `+`.**
Never add `Review`, `AggregateRating`, `sameAs`, `address`/`PostalAddress`, or
an `email:`.

---

## §10 File ownership — ZERO overlap

### P1 shared chrome — ORCHESTRATOR ONLY. No agent may touch these.

```
src/layouts/MainLayout.astro
src/components/NavbarHuay.astro
src/components/FooterHuay.astro
src/components/Navfoot.astro
src/components/ContentBox.astro
src/components/AnnouncementHuay.astro
src/components/ContentBoxHuay.astro
src/components/CtaRedirect.astro
src/lib/brandProfile.ts
astro.config.mjs
wrangler.toml
public/site.webmanifest
.claude/brand-spec.md
```

`src/components/BankStrip.astro` is brand-neutral (bank logos) — **nobody
themes it.**

### Agent A — Landing

Owns: `src/pages/index.astro`, `ContentBoxCyberCut`, `ContentBoxTwoCyberCut`,
`ContentBoxSevenThreeCyberCut`, `ContentBoxNeumorphism`,
`ContentBoxTwoNeumorphism`, `ContentBoxSevenThreeNeumorphism`,
`ContentBoxSpecial`, `Faq2`, `LatestWinners4`, `LoginRtpSection`,
`ContentBoxTwo` (nested inside `LoginRtpSection`), `ReviewCardSumo`.

### Agent B — Articles

Owns: `src/pages/ทดลองเล่น.astro`, `src/pages/about-us.astro`,
`src/pages/404.astro`.

### Agent C — Lottery pages

Owns: `src/pages/ตรวจหวย.astro`, `src/pages/แนวทาง.astro`,
`LatestWinnersHuay`, `FaqHuay`.
(`ContentBoxHuay` is in the P1 shared set because both pages import it —
Agent C **uses** it and must not edit it.)

### Agent D — Button / legal / promo pages

Owns: `src/pages/promotion.astro`, `src/pages/contact-us.astro`,
`src/pages/ทางเข้า.astro`, `src/pages/login.astro`,
`src/pages/register.astro`, `src/pages/terms.astro`,
`src/pages/privacy.astro`.

### Rules for every agent

1. Edit **only** the files in your own list. Everything else is "do NOT touch".
2. Unused component variants are **inventory** — never delete one.
3. Read this spec for name/palette/variants. **Do not re-extract the docx and
   do not re-choose variants.**
4. **Do NOT run `npm run build`** (or `npm run dev`, or `npm run verify`).
   The single build belongs to the orchestrator in Phase 5. A mid-flight build
   wastes the most expensive step and cannot see the other agents' edits.
5. Do not `git commit`, `git push`, or deploy.
6. If you find you need a change inside the P1 shared set, **report it back**
   instead of editing — the orchestrator applies it.
