# HI59 — BRAND SPEC (rebrand 2026-10-07)

This file is the SINGLE source of truth for this rebrand's name, palette, variant
picks and docx heading checklist. Every fan-out agent reads it and **must not**
re-extract `src/assets/content.txt` or re-choose variants.

---

## 1. Identity

| field | value |
|---|---|
| Brand name (visible) | **HI59** (ASCII, all caps, no space) |
| Real domain | `https://hi59.info` |
| Previous brand | หวยดีใจ (lottery) — purge every trace |
| Brand type | **สล็อต / คาสิโนออนไลน์** — NOT a lottery site |
| `BRAND_FONT` | `kanit` → **`google-sans`** (rotated) |
| `BRAND_TEXT` | **`#0d2744`** (dark navy — body copy on the light cards) |
| wrangler `name` | `hi59` |

---

## 2. Palette — BRIGHT SKY-BLUE + GOLD VIP

Read off `src/assets/palette.json` + the artwork. The logo is a 3-D wordmark:
`HI` in sky blue, `59` in gold, inside a gold/blue swoosh ring. The hero banner
and both slides are a **bright daylight sky** with white clouds, gold coins and a
model in white-and-gold. `src/assets/bg.json` (this drop) is
`{"mode":"color","color":"#c1cce6"}` — a **pale periwinkle page background**.

**So this brand is LIGHT, not the usual dark-casino.** That is deliberate and it
is what the artwork says. The layout therefore is:

- **page background** — pale periwinkle `#c1cce6` (from `bg.json`, do not change)
- **content cards (`ContentBox*`)** — **light ice-glass**, dark navy text inside
- **chrome (navbar / footer / ticker)** — **deep ocean navy**, light text inside
  (they set their own text colours, so `BRAND_TEXT` never reaches them)

### Tokens

```
BLUE  (logo #0283e2 / #0393ec)      GOLD (logo #fdbc04 / #fecc04)
  blue-glow      #5ec2ff              gold-light     #ffe27a
  blue-bright    #18a0f0              gold-brand     #fdbc04
  blue-brand     #0a84e0              gold-deep      #c88a02
  blue-deep      #065a9c              gold-ink       #8a6102
  blue-darkest   #033f70

LIGHT CARD SURFACES                 DARK CHROME SURFACES
  card-base      #f6fbff              chrome-base    #04203f
  card-alt       #e7f2fd              chrome-deep    #02162c
  card-tint      #d3e7fa              chrome-raised  #073059
  card-border    #9ecbf2              chrome-border  #0a84e0 / #fdbc04

TEXT
  body on light card   #0d2744   <- BRAND_TEXT
  heading on light     #06355f
  muted on light       #35587d
  text on dark chrome  #e4f1fd
  muted on dark chrome #a9c9e8
```

Tailwind families, when a utility class is the right tool: **`sky-*`** for the
blue, **`amber-*`** for the gold, **`slate-*`/`blue-950`** for the dark chrome.

### Contrast rules — do not improvise around these

- Gold-filled button → ink `#04203f`. **Never white/cream text on gold.**
- Blue-filled button → gradient `#065a9c → #044b80 → #033f70` with `#eaf5ff` ink.
  `#0a84e0` is a **fill/border/glow** colour, not a background for small text.
- Link/label text on a light card → `#065a9c` (not `#0a84e0`, which is 4.0:1).
- Body text on a light card → `#0d2744`.
- `#e4f1fd` only ever sits on a dark-chrome surface.

### Old-brand colours that must reach ZERO in `dist/`

`#dc0409` `#f5363d` `#8e0206` `#f3c54e` `#edeaf0` `#0d0407` `#1d060b` `#171017`
`#c3c7d1` `#1a0505` `#3d0808` `#e0a52a` `#d9bfa2` `#fdf0dc` `#ff3b3b` `#ffd45e`
`#f7e2d6` `#2a0606` `#fbdc64` `#fdea83` `#8b0302` `#bd7c13`
…plus every `red-*` / `rose-*` Tailwind class in a rendered file.

**Keep untouched:** LINE green `#00B900`, bank brand colours in
`src/assets/banks/*` and `bank-footer/*`, green "live"/success dots.

---

## 3. Variant rotation — outgoing → incoming (ZERO reuse)

| family | outgoing (หวยดีใจ) | **incoming (HI59)** |
|---|---|---|
| Navbar | `NavbarStyle8` | **`NavbarStyle6`** |
| Footer | `FooterPremium` | **`FooterStyle3`** |
| Announcement | `Announcement5` | **`Announcement2`** |
| LatestWinners | `LatestWinners3` | **`LatestWinners4`** |
| Faq | `Faq4` | **`Faq2`** |
| ContentBox mix | Premium · TwoHuay · Neumorphism · SevenThreePremium · SevenThreeHuay · TwoPremium | **CyberCut · TwoCyberCut · FloatingBadge · SevenThreeCyberCut · SevenThreeNeumorphism · TwoFloatingBadge · Special** |
| Brand font | kanit | **google-sans** |

`ContentBox.astro` (plain) is the one deliberate carry-over: `terms`, `privacy`,
`404` and every button page render through it **by rule** and cannot follow a
rotation. It is always-live and belongs to the shared-chrome step.

Everything not listed stays on disk as **inventory for the next brand** —
`Announcement5`, `Faq4`, `LatestWinners3`, `NavbarStyle8`, `FooterPremium`,
`ContentBox*Premium/Huay/Neumorphism`, every `*Cyber`, every unused `Style*`.
**Never delete an unused variant.** Previous-brand copy and colour still inside
them is expected drift, not a bug.

---

## 4. Page inventory after this rebrand

**Routed (`src/pages/`)** — 404, about-us, contact-us, index, login, privacy,
promotion, register, terms, ทดลองเล่น, ทางเข้า, robots.txt.ts

**Parked (`src/pages-disabled/`)** — ตรวจหวย, แนวทาง (**moved there this round**:
HI59 is a slot brand, not a lottery brand), plus the pre-existing
about-us (JEDI66 copy), login.redirect, register.redirect.

- `about-us.astro` stays **ON** — it is linked from the navbar and has been on
  for several brands running; Agent C rewrites its body for HI59.
- The cta toggle is **ON** (`login.astro` / `register.astro` are real button
  pages with `CtaRedirect`), so **`ทางเข้า` has no navbar entry** — the page
  stays routed and the footer still links it. Do not re-add the menu item.
- No `บทความ.astro`, no `TODO(rebrand)` placeholders anywhere this round.

---

## 5. Assets — which file plays which role

| file | mtime | role |
|---|---|---|
| `logo.webp` | **Oct 7 (this drop)** | logo — navbar + footer |
| `banner1.png` | **Oct 7** | hero; `MainLayout`'s pinned glob owns it |
| `banner1-mobile.png` | **Oct 7** | phone crop of the hero; same glob, same owner |
| `og.png` | **Oct 7** | og:image; `MainLayout` owns it |
| `slide1.png` | **Oct 7** | **คืนยอดเสีย 0.3%** promo → docx H3 #4 |
| `slide2.png` | **Oct 7** | **แนะนำเพื่อน 0.8%** promo → docx H3 #5 |
| `banner2.png` | Sep 28 | **STALE — previous brand. Do not import.** |
| `banner3.png` | Sep 27 | **STALE — do not import.** |
| `slide3.png` `slide4.png` | Sep 29 | **STALE — do not import.** |

So: **no inline article illustration this round** (no current `banner2+`), and
exactly **two** `ContentBoxSevenThree*` blocks on `index.astro`, one per slide.
`/promotion`'s image grid uses **slide1 + slide2 only**.

### What the slides actually show (write `alt` from this, do not carry over)

- **slide1.png** — square. Bright blue sky with white clouds, planets and a gold
  ringed orb behind. The HI59 wordmark top-left (sky-blue `HI`, gold `59`, gold
  swoosh). Below it the Thai word **โปรโมชั่น** in white with a gold crown, then
  a blue-and-gold plaque reading **คืนยอดเสีย 0.3%**. On the right a smiling
  woman with long blonde wavy hair in a white jacket with gold buttons, a gold
  star hairpin, resting her cheek on her hand. A gold bridge and a cloudscape
  city at the bottom.
- **slide2.png** — square. Same sky set. The woman is on the **left** in a white
  gold-trimmed dress, reaching her right hand toward the viewer. The HI59
  wordmark is top-right, below it **โปรโมชั่น**, a blue ribbon reading
  **แนะนำเพื่อน**, and a large gold **0.8%**. A white gift box with gold ribbon
  and piles of gold coins sit at the lower right.
- **banner1.png** — wide. Daylight sky, planets and orbital rings, gold coins
  with crown motifs floating. HI59 wordmark centred top. Headline in blue and
  gold Thai type: **HI59 สล็อตไฮคลาส / เล่นง่ายสไตล์VIP** with a gold crown, and
  under it a white gold-edged pill reading **รวมค่ายพรีเมียม ยอดเข้าบริษัทตรง**.
  A smiling woman with long blonde hair in a white gold-buttoned blazer stands
  on the right, right arm extended toward the viewer.
- **logo.webp** — the HI59 wordmark alone on transparent: `HI` in glossy sky-blue
  3-D letters, `59` in glossy gold, wrapped by a gold arc above and a blue arc
  below forming a ring.

---

## 6. docx heading checklist — `src/assets/content.txt`

Document order. **Every one must survive, with its full paragraph text.**
Source line numbers are given so no agent needs to re-read the brief for index.

```
1  H1  HI59 สล็อตไฮคลาส เว็บตรง ลิขสิทธิ์แท้ เล่นง่ายสไตล์VIP          body: line 4            (1 para)
2  H2  HI59 รวมค่ายเกมพรีเมียม ส่งตรงจากเว็บแม่ ปลอดภัย100%            body: lines 6, 7        (2 paras)
3  H2  โปรโมชั่นเล่นสล็อต HI59 โบนัสสูง ให้เยอะกว่าใคร                  body: line 9            (1 para)
4  H3  คืนยอดเสีย โบนัส 0.3%                                           body: line 11           (1 para)
5  H3  แนะนำเพื่อน โบนัส 0.8%                                          body: line 13           (1 para)
6  H2  เว็บ HI59 ฝากถอนได้ทุกช่องทาง ยอดเข้าบริษัทตรง ไม่ผ่านม้า        body: lines 15, 16      (2 paras)
7  H2  ติดต่อแอดมิน HI59 เว็บหลักได้ 24 ชั่วโมง                         body: lines 18, 19      (2 paras)
8  H2  คำถามที่พบบ่อยเกี่ยวกับ HI59                                     body: lines 21–26       (3 Q/A)
```

**Final heading inventory for `index.astro`: `h1×1 · h2×5 · h3×2`.**

The brief has a genuine H2 → H3 nesting (sections 4 and 5 are the two bonus
sub-points under section 3's โปรโมชั่น H2), so the page is **not** flattened to
H2-only. Those two H3s are the only H3s allowed anywhere on the page —
`FeatureHighlights.astro` must stay unused for that reason.

### Title / Description (home) — the brief's own lines, VERBATIM, not padded

```
Title       : HI59 สล็อตไฮคลาส เล่นง่ายสไตล์VIP รวมค่ายพรีเมียม ยอดเข้าบริษัทตรง
Description : HI59 สล็อตไฮคลาส เว็บตรง ลิขสิทธิ์แท้ เล่นง่ายสไตล์VIP รวมค่ายเกมพรีเมียม ส่งตรงจากเว็บแม่ ฝากถอนได้ทุกช่องทาง ยอดเข้าบริษัทตรง ปลอดภัย100%
```

Sub-page titles/descriptions are **inferred** (the brief has no `SUB-PAGES`
section), so they are held to **150–160 characters** (characters, not bytes).

---

## 7. Vocabulary — this is a SLOT brand

Words the copy may use, all from the brief: สล็อต, ไฮคลาส, VIP, เว็บตรง,
ลิขสิทธิ์แท้, ค่ายเกมพรีเมียม, ส่งตรงจากเว็บแม่, วงล้อ, ฟรีสปิน, ตัวคูณ,
ฟีเจอร์โบนัส, เกมเปิดใหม่, บัญชีเดียว, เครดิต, โปรโมชั่น, คืนยอดเสีย 0.3%,
แนะนำเพื่อน 0.8%, ฝากถอน, ยอดเข้าบริษัทตรง, ไม่ผ่านบัญชีม้า, Login, แอดมิน
24 ชั่วโมง, PIN, OTP, ประวัติรายการ.

**Banned — the previous brand's lottery vocabulary:** หวย, แทงหวย, ส่งโพย, โพย,
เลข 2 ตัว, เลข 3 ตัว, เลขเด็ด, แนวทาง, หวยลาว, หวยฮานอย, หวยออมสิน, ธ.ก.ส.,
อัตราจ่าย, เรทจ่าย, ไม่อั้นจ่าย, ไม่มีลบโพย, งวด, ผลรางวัล.

**Ship the brief's own hedging — it is part of the copy, not downbeat filler.**
The brief repeatedly qualifies its own marketing claims (เว็บตรง/ลิขสิทธิ์แท้
ควรมีข้อมูลผู้ให้บริการที่ตรวจสอบได้ · "ปลอดภัย 100%" ไม่ควรใช้เป็นการรับประกัน
โดยไม่มีหลักฐาน · "โบนัสสูง ให้เยอะกว่าใคร" ควรมีข้อมูลเปรียบเทียบรองรับ ·
"ฝากถอนได้ทุกช่องทาง" ควรหมายถึงเฉพาะช่องทางที่ระบบรองรับจริง · "ไม่ผ่านบัญชีม้า"
ควรมีข้อมูลนิติบุคคลรองรับ). Those sentences ship.

**Claim nothing the brief does not state** — no licence number, no regulator, no
operator name, no bank, no RTP figure, no member count, no founding year, no
minimum deposit. The only figures on the site are the brief's own: **0.3%**,
**0.8%**, **100%**, **24 ชั่วโมง**.

---

## 8. Non-negotiables every agent inherits (from the playbook)

1. **Never delete an unused component variant.** It is inventory.
2. **Only article content may produce a heading.** Chrome — ticker, winners
   feed, card labels, column labels, login box, carousel captions, footer
   columns — renders its label as `<p>`/`<span>` with the same classes, plus an
   `aria-label` on the `<section>` when that label named the region.
3. **No HTML comments (`<!-- -->`) in any rendered file.** Astro ships them.
   Strip them while rethemeing. Notes go in the frontmatter (`//`).
4. **One element per slot.** Multiple blocks get wrapped in one `<div>`.
5. **Body copy is `text-left text-base leading-relaxed`** on the slot-carrying
   element; no `mx-auto` / `max-w-*` on page-level `<p>`.
6. **Do not re-add slot wrapper `<div>`s** — the `ContentBox*` family is already
   flattened (`isolate` on the card + `-z-10` on decorative layers).
7. **`isActivePath` from `src/lib/nav`** — never hand-write `isActive`.
8. **No `define:vars`, no attribute-less `<script>`, no `href="#"`, no
   `onclick=`.** Back-to-top is `<a href="#top">`.
9. **Decorative emoji live in their own `<span aria-hidden="true">`**, a sibling
   of the label — never inside its text, never baked into a text prop.
10. **`alt` describes the picture** (see §5), never `"banner"` / `"ภาพที่ 3"`.
11. **JSON-LD only via `pageGraph()`** from `src/lib/schema.ts`. Never type a
    domain, never build a URL with `+`, never add `Review` / `AggregateRating` /
    `sameAs` / `address` / `email`.
12. **`<Image>`/`<Picture>` always get `widths` + `sizes`** describing how wide
    the image is *drawn*. Only the hero is `loading="eager" fetchpriority="high"`.
13. **Do NOT run `npm run build`.** The orchestrator owns the single build.
