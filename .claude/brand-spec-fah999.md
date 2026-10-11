# BRAND SPEC — FAH999 (rebrand 2026-10-11)

Single source of truth for this rebrand. **Do not re-extract the docx and do not
re-choose variants** — everything decided is below. Outgoing brand is
**DUCK1688** (duck gold + bill amber on pure black).

---

## §1 Identity

| | |
|---|---|
| `BRAND_NAME` | `FAH999` (ASCII, uppercase, no space, no dash) |
| Real domain | `https://fah999-game.com` — **has a dash**, the brand name does not. Never "fix" one to match the other. |
| `wrangler.toml` `name` | `fah999-game` (not in the used-name list) |
| `BRAND_FONT` | `kanit` → **`google-sans`** (rotation) |
| `BRAND_TEXT` | `#fde8f3` |
| Page background | `bg.json` = `{"mode":"color","color":"#2e002c"}` — deep plum-black. **Not** pure black like last round. Leave bg.json alone. |
| manifest `theme_color` | `#ff3fa4` |

Brand name is **never typed** on a page — always `${BRAND_NAME}` interpolated
from `src/lib/brandProfile`. No domain is ever typed in a component or page.

---

## §2 Palette

FAH999 is a genuine **two-colour pair** read off the artwork: **hot pink /
magenta LEADS** (the logo lettering, the bunny ears, the hearts, the chips) and
**gold is the second hue** (the coins, the crowns, the 777 cabinets). The page
background is deep plum-black `#2e002c`, so — unlike last round's pure black —
a surface *can* sit deeper than the page.

### Primary hue — hot pink

| hex | role | contrast on raised `#4a0b42` |
|---|---|---|
| `#ff3fa4` | brand pink — borders, fills, accents, large text | 4.6:1 |
| `#ff6cbb` | **the inline body-copy highlight colour** (`<strong>`) | 5.7:1 |
| `#ffd1ea` | pale pink — gradient bright end, hover text | 11.0:1 |
| `#b3006a` | deep pink — gradient dark end on **non-text** fills, borders, aura | ⛔ never text |
| `#7a0046` | darker pink — rules / aura only | ⛔ never text |
| `#4d002b` | darkest pink — rules / aura only | ⛔ never text |

### Second hue — gold

| hex | role | contrast on raised |
|---|---|---|
| `#f5c53d` | brand gold | 9.1:1 |
| `#ffe49a` | light gold — gradient bright end | — |
| `#d19a12` | mid-dark gold — the **darkest end a gold gradient may reach while carrying `#2b0019` ink** (7.5:1) | — |
| `#9c6f08` | deep gold — rules / aura only | ⛔ never text |

### Surfaces (depth ladder)

```
#4a0b42  raised   (cards)
#3a0534  mid
#2e002c  PAGE     (bg.json)
#210220  deep     (may sit below the page this round)
```

### Text

| hex | role |
|---|---|
| `#fde8f3` | body copy = `BRAND_TEXT`. 12.7:1 raised · 14.4:1 mid · 16.5:1 deep |
| `#e8b9d4` | muted secondary text (8.6:1 raised) |
| `#2b0019` | dark ink — **only** on a pink or gold fill. 5.8:1 on `#ff3fa4`, 7.3:1 on `#ff6cbb`, 11.5:1 on `#f5c53d`, 7.5:1 on `#d19a12` |

⛔ **Never put `#2b0019` ink on `#b3006a`** — 2.8:1, fails hard. A pink gradient
that carries dark ink stops at `#ff3fa4`; `#b3006a` and below are shapes only.

### Banned values — purge from every rendered file

Compare by **value, not colour family**. Eight of the last nine brands had gold,
and one of the colliding values is **one character** from ours.

- **DUCK1688** (outgoing): `#f3bb34` `#fde464` `#c8901a` `#8a5f08` `#5c3f04`
  `#f58b2a` `#ffc98a` `#a3510c` `#1a1203` `#f6ecd9` `#d8c69b` `#1f1709`
  `#171106` `#0d0903`, and `rgba(243,187,52,α)` / `rgba(245,139,42,α)`
- **NAZA168**: `#fbc134` `#ffe87a` `#cf9a18` `#96690a` `#6b4a05` `#eef2f8`
  `#cfd6e3` `#9aa6bb` `#3f4859` `#fdf3df` `#d9c9a6` `#4e3406` `#432b03`
  `#382400` `#241700`
- **GOT777** — *currently inside `NavbarStyle11.astro`*: `#f5c518` `#ffe9a8`
  `#96690f` `#d21622` `#7b0304` `#0a0503` `#160b06` `#241108` `#3a1a0c`
  `#ece0cb` `#fff6dd`
  > ⚠️ **`#f5c518` (GOT777) vs `#f5c53d` (ours) differ by two characters.**
  > Do not eyeball this one.
- **BPLAY639** — *currently inside `Footer.astro`*: `#f472b6` `#14061f`
  `#fdf2f8` `#e9d5f5` `#7e22ce` `#c4b5fd` `#ddd6fe` `#fbcfe8` `#b79ac9`
  > ⚠️ BPLAY639 was **also a pink brand**. "There is already pink here" proves
  > nothing — `#f472b6` is not `#ff3fa4`.
- **FIN8888** — *currently inside `Announcement4.astro`*: `#0891b2` `#0a1628`
  `#051022` `#f59e0b` `#fcd34d` `#dbeafe`

Semantic colours stay: LINE green `#00B900` / `green-600`, live/success green,
real bank brand colours.

---

## §3 Variant rotation (every family moves off DUCK1688's pick)

| family | DUCK1688 (outgoing) | **FAH999 (this round)** |
|---|---|---|
| Navbar | `NavbarStyle7` | **`NavbarStyle11`** |
| Footer | `FooterPremiumSumo` | **`Footer`** (the base file) |
| Announcement | `Announcement6` | **`Announcement4`** |
| LatestWinners | `LatestWinners` | **`LatestWinners3`** |
| Faq | `Faq4` | **`Faq2`** |
| Review cards | `ReviewCardSumo` | **`ReviewCardSumo2`** |
| Brand font | `kanit` | **`google-sans`** |

**ContentBox shape-mix** — DUCK1688 ran CyberCut / TwoPremium / SevenThreePremium /
SevenThreeCyberCut / Neumorphism / Special. Not one of those returns:

| § | docx heading | component |
|---|---|---|
| 1 | H1 | `ContentBoxFloatingBadge` |
| 2 | H2 | `ContentBoxTwoCyberCut` |
| 3 | H2 | `ContentBox` (plain — **deliberate carry-over**, see below) |
| 4 | H3 + slide1 | `ContentBoxSevenThreeNeumorphism` |
| 5 | H3 + slide2 | `ContentBoxSevenThree` (plain) |
| 6 | H2 | `ContentBoxPremium` |
| 6a–c | H3 ×3 | `FeatureHighlights` |
| 7 | H2 | `ContentBoxTwoNeumorphism` |
| 8 | H2 | `Faq2` |

`ContentBox` (plain) is the one justified repeat: it is the always-live box that
`terms`, `privacy`, `404` and every button page render through, so it cannot
follow a rotation. It is in the P1 shared set.

Every unused variant stays on disk as inventory. **Delete nothing.**

---

## §4 Images in this drop (2026-10-11)

| file | mtime | role |
|---|---|---|
| `banner1.png` | **10-11 ✅ current** | hero — MainLayout's pinned glob owns it, never reference from a page |
| `banner1-mobile.png` | **10-11 ✅ current** | phone hero `<source>` — MainLayout owns it |
| `og.png` | **10-11 ✅ current** | og:image — MainLayout owns it |
| `logo.webp` | **10-11 ✅ current** | navbar + footer logo |
| `slide1.png` | **10-11 ✅ current** | 600×600, prints **คืนยอดเสีย 0.3%** → docx §4 |
| `slide2.png` | **10-11 ✅ current** | 600×600, prints **แนะนำเพื่อน โบนัส 0.8%** → docx §5 |
| `banner2.png` | 10-08 ⛔ stale | previous brand — **never import** |
| `banner3.png` | 09-27 ⛔ stale | previous brand — **never import** |
| `slide3.png` | 09-29 ⛔ stale | previous brand — **never import** |
| `slide4.png` | 09-29 ⛔ stale | previous brand — **never import** |

An eager import **is** an emit, rendered or not — importing a stale file ships a
competitor's artwork into `dist/` and turns `verify-build` red. There is
**no current-drop article illustration** this round (no fresh `banner2+`), and a
slide is never substituted for one.

### What the artwork actually shows (write alt text from this, do not carry over)

The whole drop is **hot pink and black with gold**, starring **bunny-girl
characters with pink rabbit ears**, white rabbits, a pink crowned pig, playing
cards, pink-and-white casino chips with gold crowns, glowing pink hearts, gold
coins and gold 777 slot cabinets. **Nothing in it is a space scene** — no
planets, no moons, no astronaut duck, no gold space station. DUCK1688's alt text
describes a different drop entirely.

- **`logo.webp`** — a brunette girl with large pink rabbit ears, hands resting on
  her cheeks, winking. Two aces (spade and heart) at upper left, a pink-and-white
  casino chip with a gold crown, gold coins, and at right a gold 777 slot cabinet
  with a pink lollipop. Across the bottom **FAH999** in very large 3-D glittery
  pink letters with a white-and-gold outline, on a dark plate with a thick gold rim.
- **`banner1.png`** — wide 2244×701 scene on near-black. Left: a white rabbit
  wearing a gold crown and a gold 777 cabinet; a silver-white-haired girl with a
  pink hair bow, heart earrings and a pink-and-white outfit winks and points
  straight at the viewer. Centre: the FAH999 logo medallion (the brunette
  bunny-girl above pink 3-D FAH999 lettering), glowing pink hearts, pink ribbons
  of light and gold coins. Right: a pink pig wearing a gold crown beside a gold
  777 slot machine, pink gift boxes below. Across the lower half **FAH999
  ฟาสล็อตเว็บตรง** in huge 3-D pink-and-gold type with a gold crown over it, and
  under it on a dark capsule plate **เล่นสล็อตระบบแท้ ใช้งานง่าย ออนไลน์ 24 ชั่วโมง**.
- **`slide1.png`** — square. The silver-white-haired bunny-girl in a pink-and-white
  outfit with a pink bow tie and heart earrings reaches a hand out to the left.
  Upper right the FAH999 logo medallion with the brunette bunny-girl, aces and a
  777 reel. Gold coins, crowned pink chips and playing cards scattered around, a
  gold podium at the bottom. Centre: **โปรโมชั่น** in large 3-D pink type under a
  gold crown, and on a dark plate beneath it **คืนยอดเสีย 0.3%** with small pink hearts.
- **`slide2.png`** — the companion square. The same silver-white-haired bunny-girl,
  arm extended, pink ribbons sweeping behind her. Upper right the FAH999 logo
  medallion. Gold coins, an ace of spades and an ace of hearts, a crowned pink chip
  at lower right. Centre: **โปรโมชั่น** in the same 3-D pink type under a gold
  crown, and on a dark plate beneath it **แนะนำเพื่อน โบนัส 0.8%**.

---

## §5 Docx heading checklist (`src/assets/content.txt`) — index.astro

Document order. Every heading ships, with the **full** paragraph(s) that follow it.

| # | level | heading | body | carrier |
|---|---|---|---|---|
| 1 | H1 | `FAH999 ฟาสล็อตเว็บตรง เล่นสล็อตระบบแท้ Login ใช้งานง่าย` | line 4 | `ContentBoxFloatingBadge` |
| 2 | H2 | `FAH999 ทางเข้าหลัก เล่นสล็อตได้ทุกค่าย แตกง่ายทุกเกม` | line 6 (left) + line 7 (right) | `ContentBoxTwoCyberCut` |
| 3 | H2 | `โปรโมชั่นเล่นสล็อต FAH999 เว็บตรงในตำนาน` | line 9 | `ContentBox` |
| 4 | H3 | `โปรโมชั่น คืนยอดเสีย 0.3% เข้ายูสทุกวัน` | line 11 | `ContentBoxSevenThreeNeumorphism` + slide1 |
| 5 | H3 | `โปรโมชั่น แนะนำเพื่อน โบนัส 0.8% ไม่จำกัด` | line 13 | `ContentBoxSevenThree` + slide2 |
| 6 | H2 | `สมัครเล่นสล็อต FAH999 ง่ายๆ 3 ขั้นตอน` | line 15 | `ContentBoxPremium` |
| 6a | H3 | `ขั้นตอนที่ 1 เข้าหน้าสมัครสมาชิก` | line 16 remainder | `FeatureHighlights` |
| 6b | H3 | `ขั้นตอนที่ 2 กรอกข้อมูลและตั้งรหัสผ่าน` | line 17 remainder | `FeatureHighlights` |
| 6c | H3 | `ขั้นตอนที่ 3 ยืนยันข้อมูลและ Login` | line 18 remainder | `FeatureHighlights` |
| 7 | H2 | `แอดมิน FAH999 คอยให้บริการ 24 ชั่วโมง` | line 20 (left) + line 21 (right) | `ContentBoxTwoNeumorphism` |
| 8 | H2 | `คำถามที่พบบ่อยเกี่ยวกับ FAH999` | lines 23–28 (3 Q/A pairs) | `Faq2` + `faqs` prop |

**Target inventory for `/`: `h1×1, h2×5, h3×5`.**

Everything else on the page is **chrome and emits no heading at any level** —
`Announcement4`, `LatestWinners3`, `LoginRtpSection`, `ReviewCardSumo2`, and
`Faq2`'s questions live inside `<summary>`. Non-brief widgets go **before**
section 1 or **after** section 8, never spliced between two docx sections.

### Home title / description — the brief's own lines, verbatim

```
title:       FAH999 ฟาสล็อตเว็บตรง เล่นสล็อตระบบแท้ ใช้งานง่าย ออนไลน์ 24 ชั่วโมง
description: FAH999 ฟาสล็อตเว็บตรง ทางเข้าหลัก เล่นสล็อตระบบแท้ Login ใช้งานง่าย ปลอดภัย มีแอดมินคอยบริการออนไลน์ 24 ชั่วโมง
```

~109 characters. **Do not pad to 150** — `verify-build` skips its floor on the
home page for exactly this reason. (The only edit to the brief's line is the
missing space in `Loginใช้งานง่าย` → `Login ใช้งานง่าย`.)

The docx has **no `SUB-PAGES (Title & Meta Description)` section**, so every
sub-page title/description is inferred — and those **must land in 150–160
characters**. One sentence saying what the page is for. Stop there.

---

## §6 Page inventory & ownership

### P1 — shared chrome (orchestrator only, done before fan-out)

`src/lib/brandProfile.ts` · `astro.config.mjs` · `wrangler.toml` ·
`public/site.webmanifest` · `src/layouts/MainLayout.astro` ·
`src/components/NavbarStyle11.astro` · `src/components/Footer.astro` ·
`src/components/BankStrip.astro` · `src/components/Navfoot.astro` ·
`src/components/ContentBox.astro` · `src/components/Announcement4.astro` ·
`src/components/CtaRedirect.astro`

### Agent A — landing

`src/pages/index.astro` and, recursively, the components **only** index renders:
`ContentBoxFloatingBadge` · `ContentBoxTwoCyberCut` ·
`ContentBoxSevenThreeNeumorphism` · `ContentBoxSevenThree` · `ContentBoxPremium` ·
`ContentBoxTwoNeumorphism` · `FeatureHighlights` · `Faq2` · `LatestWinners3` ·
`LoginRtpSection` · `ContentBoxTwo` (reached only via `LoginRtpSection`) ·
`ReviewCardSumo2`

### Agent B — sub-pages

`src/pages/ทดลองเล่น.astro` (article) · `src/pages/promotion.astro` (image page) ·
`src/pages/404.astro` · `src/pages/terms.astro` · `src/pages/privacy.astro`

### Agent C — sub-pages

`src/pages/about-us.astro` (article) · `src/pages/contact-us.astro` (button page) ·
`src/pages/ทางเข้า.astro` (button page) · `src/pages/login.astro` (button page) ·
`src/pages/register.astro` (button page)

No agent owns a file another agent owns. No agent touches the P1 set.

### Lottery pages — stay OFF

FAH999 is a **slot** brand. `ตรวจหวย.astro` and `แนวทาง.astro` are already in
`src/pages-disabled/` and stay there. `NavbarStyle11` and `Footer` must carry
**no** `/ตรวจหวย` or `/แนวทาง` link (a link to a missing route fails
`verify-build`). The word **หวย appears nowhere on this site**.

### CTA toggle is ON

`login.astro` and `register.astro` are real **button pages** (one `<h1>`, one
button, `CtaRedirect` on both). So:
- the navbar menu carries `สมัครสมาชิก` + `เข้าสู่ระบบ` right after `โปรโมชั่น`
- the navbar carries **no** `/ทางเข้า` entry — but the page stays routed, indexed
  and linked from the footer
- **never edit `targetUrl`** in `login.astro`, `register.astro` or `Navfoot.astro`

### `about-us.astro` exists in BOTH `src/pages/` and `src/pages-disabled/`

The live one is `src/pages/about-us.astro` and it has real content (no
`TODO(rebrand)` anywhere in the repo). Leave the parked copy alone.

---

## §7 Vocabulary

**Use the brief's own words.** FAH999 is a **ฟาสล็อตเว็บตรง** — a slot site.
Not a lottery site, not a casino-table site, not sport.

Allowed (all from `content.txt`): ฟาสล็อตเว็บตรง · เล่นสล็อตระบบแท้ ·
Login ใช้งานง่าย · ออนไลน์ 24 ชั่วโมง · ทางเข้าหลัก · เล่นสล็อตได้ทุกค่าย ·
แตกง่ายทุกเกม · เว็บตรงในตำนาน · สล็อตคลาสสิก · เกมโบนัส · ฟรีสปิน ·
สล็อตวงล้อทั่วไป · ฟีเจอร์พิเศษ · ค่ายเกม · หมวดเกม · ตารางจ่าย ·
อัตราการคืนเงินผู้เล่น · ช่วงเดิมพัน · ข้อมูลบัญชี · ประวัติรายการ ·
คืนยอดเสีย 0.3% · เข้ายูส · รอบตัดยอด · รอบประจำวัน · ยอดที่เข้าเกณฑ์ ·
แนะนำเพื่อน 0.8% · ลิงก์แนะนำ · สมัคร 3 ขั้นตอน · ยืนยันบัญชี ·
แอดมิน 24 ชั่วโมง · ช่องทางติดต่อหลัก · PIN · OTP · ผลการหมุนเป็นแบบสุ่ม

> ⚠️ **`แตกง่ายทุกเกม` is this brief's own H2 (line 5) and ships verbatim**,
> even though a near-identical phrase sits on an older brand's ban list. The ban
> covers invented copy, not a line the brief supplies. Same for
> `เว็บตรงในตำนาน` (line 8). Note the brief itself immediately hedges
> `แตกง่ายทุกเกม` on line 7 — **that hedge ships with it**, it is not downbeat
> filler to trim.

Banned — previous brands' invented copy, none of it may appear:
สล็อตพีจีเว็บเป็ด · เว็บเป็ด · ไม่ผ่านเว็บเอเย่นต์ · เครือหลัก · เบทต่ำ ·
ทุนน้อยกำไรงาม · การันตีความน่าเชื่อถือ · เว็บสล็อตนาซ่า · ส่งตรงจากเมกา ·
ส่งตรงจากอเมริกา · ฐานเกมหลัก 100% · ไม่ผ่านม้า · บัญชีม้า · นิติบุคคล ·
เครือสล็อตฐานเว็บหลัก · ฐานเว็บสล็อตหลัก · เว็บตรงฐานสล็อตหลัก · ดับเบิ้ลโบนัส ·
จ่ายไว · ไม่มีขั้นต่ำ · ค่ายตรง · ส่งตรงจากเว็บแม่ · การันตีเว็บแท้ ·
รีวิวถอนจริง · ถูกลิขสิทธิ์ · ไฮคลาส · VIP · บาคาร่า · รูเล็ต · ไฮโล ·
เสือมังกร · แบล็กแจ็ก · โต๊ะสด · คาสิโนไลฟ์ · คาสิโนออนไลน์ · บอล · กีฬา ·
ตลาดเดิมพัน · หวย

**Claim nothing the brief does not state.** No licence, regulator, operator,
studio, bank, RTP figure, deposit minimum, member count or founding year. The
only figures that exist are the brief's own: **0.3% · 0.8% · 3 ขั้นตอน ·
24 ชั่วโมง**.

The brief hedges in five places and **every hedge ships inside its paragraph**:
`ควรตรวจสอบข้อมูลผู้ให้บริการและค่ายเกมที่เชื่อมต่อจริงก่อนใช้งาน` ·
`ผลการหมุนเป็นแบบสุ่มและไม่มีเกมใดรับประกันว่าจะชนะทุกครั้ง` ·
`ควรอ่านรายละเอียดก่อนกดรับทุกครั้ง` ·
`คำว่าไม่จำกัดควรระบุให้ชัดว่าหมายถึง…` ·
`ไม่ควรเปิดเผยรหัสผ่าน PIN หรือ OTP ให้บุคคลอื่น`

---

## §8 Rules that bite on every rebrand (short form — the playbook is authoritative)

- **Delete no component.** Unused variants are inventory for the next brand.
- **No HTML comments** (`<!-- -->`) in any rendered file — Astro ships them to
  `dist/`. Strip them while rethemeing. Frontmatter `//` comments are fine.
- **Only article content may produce a heading, at any level.** Chrome labels are
  `<p>`/`<span>` with the same classes, plus `aria-label` on the section.
- **One element per slot.** Never pass two siblings into a `ContentBox*` slot;
  wrap them yourself in one `<div>` if a section genuinely needs two blocks.
- **Single-slot boxes are already flattened** (`isolate` on the card, `-z-10` on
  decorative layers). Do not re-add a wrapper `<div>`.
- **Body copy is `text-left text-base leading-relaxed` + the colour**, on the
  element carrying the slot. No `text-sm`, no `mx-auto max-w-*` on page paragraphs.
- **`*FloatingBadge`**: grep the title badge for `whitespace-nowrap` (replace with
  `w-[92%] max-w-2xl text-center`) and check the card's `pt-*` clears a 2-line
  badge (`-top-6` offset). Section 1's title is long.
- **`isActivePath`** from `../lib/nav` — never hand-roll `isActive` in a navbar.
- **No `define:vars`, no `href="#"`, no `onclick=`.** Decorative emoji get their
  own `<span aria-hidden="true">`, never inside a label's text.
- **JSON-LD only via `pageGraph()`.** Never type a domain, never build a URL with
  `+`, never add `Review`/`AggregateRating`/`sameAs`/`address`.
- **Images**: every `<Image>`/`<Picture>` needs `widths` + `sizes` describing how
  wide it is **drawn**. Leave `quality={80}` alone — the AVIF service rescales.
- **Do NOT run `npm run build`** — the single build belongs to the orchestrator.
