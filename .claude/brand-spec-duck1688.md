# BRAND SPEC — DUCK1688 (rebrand round 2026-10-10)

> Single source of truth for this rebrand. **Do NOT re-extract the docx and do
> NOT re-choose variants.** Everything you need is here.

## §1 Identity

| field | value |
|---|---|
| Brand name (visible) | `DUCK1688` — ASCII, uppercase, one word, no space/dash |
| Real domain | `https://duck16-88.com` — **note the dash between `duck16` and `88`**; the brand name has no dash. Do not "fix" either to match the other. |
| Genre | สล็อต PG / "เว็บเป็ด" — a **SLOT** site. Not a lottery site, not a casino-table site, not sport. |
| Font | `kanit` (previous round was `google-sans` — rotated) |
| Worker name | `duck16-88` |

Never type the brand name on a page: interpolate `${BRAND_NAME}` from
`src/lib/brandProfile.ts`. Never type the domain anywhere — `pageGraph()` and
`site:` derive every URL.

## §2 Palette

Artwork is **gold-on-pure-black** with an **amber duck-bill** second hue.
`bg.json` this drop is `{"mode":"color","color":"#000000"}` — the page is
**pure black**, so every card surface must be *lighter* than the page to lift.

| role | hex | may carry text? |
|---|---|---|
| gold primary (brand hue, from `logo.webp` vivid `#f3bb34`) | `#f3bb34` | ✅ 10.3:1 on raised surface |
| gold bright (gradient bright end, hover) | `#fde464` | ✅ |
| gold mid (dark gold allowed *under* ink) | `#c8901a` | ✅ 6.3:1 — and ink `#1a1203` on it = 6.4:1 |
| gold deep — **lines / aura / gradient ends ONLY** | `#8a5f08` | ❌ never |
| gold line — **lines / aura ONLY** | `#5c3f04` | ❌ never |
| amber bill (SECOND HUE) | `#f58b2a` | ✅ 7.0:1 |
| amber light | `#ffc98a` | ✅ |
| amber deep — **lines / aura ONLY** | `#a3510c` | ❌ never |
| surface raised (cards that lift) | `#1f1709` | — |
| surface mid | `#171106` | — |
| surface deep | `#0d0903` | — |
| page background (`bg.json`) | `#000000` | — |
| body copy = `BRAND_TEXT` | `#f6ecd9` | ✅ 15:1 on raised |
| muted warm secondary text | `#d8c69b` | ✅ ~11:1 |
| ink on a gold/amber fill | `#1a1203` | ✅ 10.4:1 on `#f3bb34`, 7.1:1 on `#f58b2a` |
| glows | `rgba(243,187,52,α)` · `rgba(245,139,42,α)` | — |

**Depth ladder:** `#1f1709` raised → `#171106` mid → `#0d0903` deep →
`#000000` page. Cards sit ABOVE the page, never below it (there is nothing
below pure black).

### ⚠️ Gold is NOT proof of "this round's palette"

Seven of the last eight brands had gold too. Match by **value**, never by
colour family. These are **previous brands'** golds and must be gone:
`#fbc134` `#ffe87a` `#cf9a18` `#96690a` `#6b4a05` (NAZA168) ·
`#f5c518` `#ffdd73` `#b8860f` `#8a6208` (FLASH877) ·
`#f2b705` `#ffd666` `#c08a0b` `#a8730a` (SUPERSLOTCLUB) ·
`#f2c230` `#ffe066` `#a87a08` (KINGKONG555) · `#f5b61d` `#ffd87a` (PIGPG) ·
`#edbb23` `#fad354` `#ebbb54` `#fce675` `#ab6d24` `#c08a30` (older) .

Other previous-brand values that must not survive anywhere you edit:
- NAZA168 chrome silver: `#eef2f8` `#cfd6e3` `#9aa6bb` `#3f4859`
- NAZA168 surfaces/ink/text: `#4e3406` `#432b03` `#382400` `#241700`
  `#231500` `#fdf3df` `#d9c9a6`
- NAZA168 glows: `rgba(251,193,52,α)` `rgba(207,214,227,α)`
- UP555 (still inside `NavbarStyle7`): `#ebbb54` `#fce675` `#ab6d24`
  `#d5d4d3` `#f3f3f2` `#0c0502` `#130b03` `#241705` `#160d02` `#c08a30`
- GOT777 (still inside `NavbarStyle11`, not used this round): `#f5c518`
  `#ffe9a8` `#96690f` `#d21622` `#7b0304` `#0a0503` `#160b06` `#241108`
  `#ece0cb`
- older brands' reds/greens/violets: `#ff3b14` `#8c0f0a` `#5a0603` `#7d1008`
  `#5c0000` `#430000` `#2a0300` `#e8232a` `#d4200d` `#8ce023` `#a435f0`
  `#f472b6` `#14061f` `#fdf2f8`

**There is NO red and NO chrome-silver hue this round.** Semantic colours stay:
LINE green `#00B900`, "live"/success green, real bank brand colours.

## §3 Variant rotation (DECIDED — do not re-pick)

Previous brand (NAZA168) → this brand (DUCK1688):

| family | before | after |
|---|---|---|
| Navbar | `NavbarCyber` | **`NavbarStyle7`** |
| Footer | `FooterStyle3` | **`FooterPremiumSumo`** |
| Announcement | `AnnouncementPremium` | **`Announcement6`** |
| LatestWinners | `LatestWinnersCyber` | **`LatestWinners`** (base) |
| Faq | `Faq` (base) | **`Faq4`** |
| Review cards | `ReviewCardSumo2` | **`ReviewCardSumo`** |
| Brand font | `google-sans` | **`kanit`** |
| ContentBox mix | Premium · TwoCyberCut · plain · SevenThree · SevenThreeNeumorphism · TwoNeumorphism · FloatingBadge | **CyberCut · TwoPremium · plain · SevenThreePremium · SevenThreeCyberCut · Neumorphism · Special · FeatureHighlights** |

`ContentBox.astro` (plain) is the one deliberate carry-over: it is the
always-live box that `terms`/`privacy`/`404`/every button page renders through,
so it cannot follow a rotation. It is in the shared-chrome set (§5).

**Unused variants are INVENTORY. Never delete one.** Old brand colours inside a
variant nothing renders are expected drift, not a bug.

## §4 Assets — what belongs to THIS drop

Current drop = mtime `2026-10-10 17:27–17:28`:
`logo.webp` · `banner1.png` · `banner1-mobile.png` · `slide1.png` ·
`slide2.png` · `og.png` · `bg.json` · `content.txt` · `palette.json`

**STALE — previous brands' artwork, must NOT be imported anywhere**
(an eager import *is* an emit, rendered or not; `verify-build` goes red):
`banner2.png` (10-08) · `banner3.png` (09-27) · `slide3.png` / `slide4.png`
(09-29). ⇒ **There is NO current-drop article-illustration banner this round.**
Do not substitute a slide for one.

Roles:
- `banner1.png` + `banner1-mobile.png` — MainLayout's own pinned globs. Never
  referenced from a page.
- `og.png` — MainLayout owns it.
- `slide1.png` → **docx H3 #4 (คืนยอดเสีย 0.3%)**. The artwork prints `0.3%`.
- `slide2.png` → **docx H3 #5 (แนะนำเพื่อน 0.8%)**. The artwork prints `0.8%`.
  Both are 600×600 on disk → top real candidate is 600, cap at
  `max-w-[600px]`.
- Slides may appear **only** inside a `ContentBoxSevenThree*` block — 2 blocks
  max this round, which is exactly the 2 slides. Nowhere else.

### What the artwork actually shows (write `alt` from this, not from last round)

- **`logo.webp`** — a cartoon yellow duck wearing a gold crown, winking one eye,
  leaning over a nameplate; its bill is orange-amber; below it `DUCK` in bevelled
  3-D gold and `1688` in white/chrome with a gold edge, on a black plate with a
  thick gold rim.
- **`banner1.png`** (2244×701 wide hero) — a gold-and-black outer-space scene:
  ringed planets, a large moon, stars and a blue Earth. Left of centre a
  silver-haired woman in a gold-and-white outfit wearing a small gold crown,
  winking and pointing at the viewer. Right, an astronaut duck mascot in a
  white-and-gold space suit punching the air. Centre-top the `DUCK1688` duck
  medallion. Gold coins with duck faces float throughout. Across the lower half
  `DUCK1688 สล็อตพีจีเว็บเป็ด` in large 3-D gold and chrome type, and on a dark
  pill under it `เล่นง่าย กำไรงาม ไม่ผ่านเว็บเอเย่นต์`.
- **`slide1.png`** (600×600) — same gold/black space scene. The `DUCK1688` duck
  logo top-right, a planet and moon behind. A silver-haired woman in a
  black-and-gold outfit with a gold crown points upward at the text. Bottom
  right, a crowned duck mascot in a red-and-gold robe beside a gold slot
  cabinet showing `777`. Gold coins everywhere. Across the middle `โปรโมชั่น`
  in big 3-D gold type and under it, on a dark plate, `คืนยอดเสีย` beside an
  oversized `0.3%`.
- **`slide2.png`** (600×600) — the companion square. `DUCK1688` duck logo top
  centre-right, a crescent moon and planet upper left. A silver-haired woman in
  a black-and-gold dress with a gold crown and a bow tie points at the text with
  both hands. Bottom right, a duck mascot in black-and-gold beside a gold slot
  cabinet showing `7`. Gold coins and a `BAR` reel. Across the middle
  `โปรโมชั่น` in 3-D gold and under it, on dark plates, `แนะนำเพื่อน` and
  `โบนัส` beside an oversized `0.8%`.

## §5 Shared chrome — ORCHESTRATOR ONLY (already done before fan-out)

**Do NOT edit any of these.** If one needs a further change, report it; the
orchestrator makes it.

```
src/layouts/MainLayout.astro
src/components/NavbarStyle7.astro      (the active navbar)
src/components/FooterPremiumSumo.astro (the active footer)
src/components/BankStrip.astro         (renders inside the active footer)
src/components/Navfoot.astro           (8 pages)
src/components/ContentBox.astro        (11 pages)
src/components/Announcement6.astro     (8 pages — the active ticker)
src/components/CtaRedirect.astro       (login + register)
src/lib/brandProfile.ts
astro.config.mjs · wrangler.toml · public/site.webmanifest
```

`Announcement6`'s **default** `message` is this brand's copy, and every page
calls `<Announcement />` bare — **do not pass a `message` prop anywhere.**

## §6 docx checklist — every heading, in document order

Source: `src/assets/content.txt`. **Every paragraph ships in full** — nothing
merged, summarised or dropped. Brand name is `${BRAND_NAME}`, never typed.

| # | tag | heading | body (content.txt lines) | carrier |
|---|---|---|---|---|
| 1 | H1 | `DUCK1688 สล็อตพีจีเว็บเป็ด รวมเกมเดิมพัน ค่ายหลัก` | line 4 (1 ¶) | `ContentBoxCyberCut` |
| 2 | H2 | `เว็บ DUCK1688 สล็อตเบทต่ำ ทุนน้อย แต่กำไรงาม การันตีความน่าเชื่อถือ` | lines 6, 7 (2 ¶) | `ContentBoxTwoPremium` (left=6, right=7) |
| 3 | H2 | `โปรโมชั่นเล่นสล็อต DUCK1688 เครือหลัก จัดเต็ม` | line 9 (1 ¶) | `ContentBox` (plain, always-live) |
| 4 | H3 | `โปรโมชั่น คืนยอดเสีย 0.3% เข้ายูสทุกวัน` | line 11 (1 ¶) | `ContentBoxSevenThreePremium` + **slide1** |
| 5 | H3 | `โปรโมชั่น แนะนำเพื่อน รับโบนัสแชร์ลิงก์ 0.8% ไม่จำกัด` | line 13 (1 ¶) | `ContentBoxSevenThreeCyberCut` + **slide2** |
| 6 | H2 | `สมัครเล่นสล็อต DUCK1688 ง่ายๆ 3 ขั้นตอน` | line 15 (1 ¶ intro) | `ContentBoxNeumorphism` |
| 6a | H3 | `ขั้นตอนที่ 1 เข้าหน้าสมัครสมาชิก` | line 16 (rest of the sentence) | `FeatureHighlights` item 1 |
| 6b | H3 | `ขั้นตอนที่ 2 กรอกข้อมูลและตั้งค่าบัญชี` | line 17 (rest) | `FeatureHighlights` item 2 |
| 6c | H3 | `ขั้นตอนที่ 3 ตรวจสอบและยืนยันการสมัคร` | line 18 (rest) | `FeatureHighlights` item 3 |
| 7 | H2 | `แอดมิน DUCK1688 ฐานเว็บสล็อตหลัก เปิดให้บริการ 24 ชั่วโมง` | lines 20, 21 (2 ¶) | `ContentBoxSpecial` |
| 8 | H2 | `คำถามที่พบบ่อยเกี่ยวกับ DUCK1688` | lines 23–28 (3 Q/A) | `Faq4` + `faqs` prop |

**Final homepage inventory: `h1×1` · `h2×5` · `h3×5`.**

6a–6c are the skill's **one sanctioned H3 exception**: a docx H2 whose body is
a short labelled sub-list, rendered through `FeatureHighlights` so the section
keeps a single H2 and the three steps become real H3 children. Their labels are
the docx's own words. This is the only place on the site with an `<h3>` outside
#4 and #5.

## §7 Vocabulary

Allowed — the brief's own words only: `สล็อตพีจีเว็บเป็ด`, `รวมเกมเดิมพัน`,
`ค่ายหลัก`, `เล่นง่าย`, `เบทต่ำ`, `ทุนน้อย`, `กำไรงาม`,
`การันตีความน่าเชื่อถือ`, `ปลอดภัย`, `ไม่ผ่านเว็บเอเย่นต์`, `สล็อตคลาสสิก`,
`เกมฟรีสปิน`, `โบนัสตัวคูณ`, `ฟีเจอร์พิเศษ`, `ตารางจ่าย`, `ช่วงเดิมพัน`,
`ยอดเดิมพัน`, `จัดสรรงบ`, `คืนยอดเสีย 0.3%`, `เข้ายูส`, `รอบตัดยอด`,
`รอบประจำวัน`, `ยอดที่เข้าเกณฑ์`, `แนะนำเพื่อน 0.8%`, `แชร์ลิงก์`,
`ลิงก์ส่วนตัว`, `สมัคร 3 ขั้นตอน`, `ยืนยันตัวตน`, `แอดมิน 24 ชั่วโมง`,
`ช่องทางติดต่อหลัก`, `PIN`, `OTP`, `ผลการเล่นเป็นแบบสุ่ม`.

> `ไม่ผ่านเว็บเอเย่นต์` is **this brief's own** Title/Description wording
> (lines 1–2), so it ships verbatim even though a near-identical phrase was on
> an older brand's ban list. The ban covers invented copy, not a line the brief
> supplies.

Banned (previous brands' invented copy): `เว็บสล็อตนาซ่า`, `ส่งตรงจากเมกา`,
`ส่งตรงจากอเมริกา`, `ฐานเกมหลัก 100%`, `ไม่ผ่านม้า`, `บัญชีม้า`,
`เครือสล็อตฐานเว็บหลัก`, `เว็บตรงฐานสล็อตหลัก`, `อัปเดตระบบเข้าเล่นใหม่ 2026`,
`คลับคนเล่นสล็อตซุปเปอร์`, `ดับเบิ้ลโบนัส`, `แตกง่าย`, `จ่ายไว`,
`ไม่มีขั้นต่ำ`, `ค่ายตรง`, `ส่งตรงจากเว็บแม่`, `การันตีเว็บแท้`, `รีวิวถอนจริง`,
`ถูกลิขสิทธิ์`, `ไฮคลาส`, `VIP`, `บาคาร่า`, `รูเล็ต`, `ไฮโล`, `เสือมังกร`,
`แบล็กแจ็ก`, `โต๊ะสด`, `คาสิโนไลฟ์`, `คาสิโนออนไลน์`, `บอล`, `กีฬา`,
`ตลาดเดิมพัน`, `หวย` (any form).

Claim nothing the brief does not: no licence, regulator, operator name, studio
name, bank, RTP figure, deposit minimum, member count or founding year. The
only figures on this site are `0.3%`, `0.8%`, `3 ขั้นตอน` and `24 ชั่วโมง`.
Ship the brief's own hedging clauses in full — it hedges five times and each
one is part of its paragraph, not trimmable filler.

## §8 Home page title / description (brief verbatim, do NOT pad)

```
title:       DUCK1688 สล็อตพีจีเว็บเป็ด เล่นง่าย กำไรงาม ไม่ผ่านเว็บเอเย่นต์
description: DUCK1688 สล็อตพีจีเว็บเป็ด รวมเกมเดิมพัน ค่ายหลัก เล่นง่าย เบทต่ำ ทุนน้อย แต่กำไรงาม การันตีความน่าเชื่อถือ ปลอดภัย ไม่ผ่านเว็บเอเย่นต์
```

(~134 characters — under 150 on purpose. `verify-build` skips its 150-char
floor on the home page for exactly this reason. **Do not top it up.**)

The brief has **no `SUB-PAGES` section**, so every other page's title and
description are inferred — those must be **150–160 characters** (count
characters, not bytes; Thai is 3 bytes/char so `wc -c` lies).

## §9 Page state this round

- `/ตรวจหวย` and `/แนวทาง` stay **parked** in `src/pages-disabled/` — DUCK1688
  is a slot brand. No link to either may exist in the active navbar or footer.
- `about-us.astro` is **ON** (lives in `src/pages/`) and is in scope.
  (A dormant JEDI66 copy also sits in `src/pages-disabled/` — inventory, leave
  it alone.)
- `บทความ.astro` does not exist. Do not create it.
- cta toggle is **ON**: `login.astro` / `register.astro` are real **button
  pages** (one `<h1>`, one button, `const targetUrl`). `/ทางเข้า` is routed and
  indexed but correctly absent from the navbar menu.
- `terms.astro` / `privacy.astro` ship on every brand, are brand-neutral via
  `BRAND_NAME`, and must keep rendering through `ContentBox.astro`.

## §10 House rules that bite on this template

- Only **article content** may produce a heading. Chrome (ticker, winners feed,
  nav, footer, card labels, widget titles) uses `<p>`/`<span>` + `aria-label`.
- No HTML comments (`<!-- -->`) in anything that renders — Astro ships them.
  Strip them from every component you retheme.
- Paragraph house style: `text-left text-base leading-relaxed <colour>` on the
  element carrying the slot. No `text-sm`, no `text-lg`, no `mx-auto
  max-w-*` on a `<p>` in a page.
- Single-slot `ContentBox*` are already flattened (`isolate` on the card,
  `-z-10` on decorative layers, slot is a direct child). Do not re-add a
  wrapper `<div>`.
- One element per slot. Two paragraphs → wrap them in one `<div>`.
- `isActivePath` from `src/lib/nav` — never hand-write `isActive`.
- No `define:vars`, no `href="#"`, no `onclick=`, no Swiper.
- Decorative emoji live in their own `<span aria-hidden="true">`, a **sibling**
  of the label — never inside its text.
- `alt` describes the picture (see §4), never `"banner"` / a counter.
- JSON-LD only via `pageGraph()`. No `Review`, `AggregateRating`, `sameAs`,
  `address`/`PostalAddress`, or `email` in the graph.
- `quality={80}` stays as-is; `tools/avif-quality-service.mjs` rescales AVIF.
- **Do NOT run `npm run build`.** The orchestrator runs the single build.
