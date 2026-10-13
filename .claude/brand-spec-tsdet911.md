# BRAND SPEC — TSDET911 (rebrand 2026-10-13)

Scratchpad written by the orchestrator in Phase P0. **Every fan-out agent reads
this file and nothing else for brand identity.** Do NOT re-extract the docx and
do NOT re-pick variants — if two agents chose differently the site would ship two
brands at once.

---

## 1. Identity

| field | value |
|---|---|
| Brand name | **TSDET911** (always interpolate `${BRAND_NAME}` from `src/lib/brandProfile.ts` — never type it) |
| Real domain | **https://tsbet911-play.com** (explicit in the operator's prompt) |
| Outgoing brand | **KMD88** on `kmd88-play.com` |
| Font | `BRAND_FONT = "google-sans"` (rotated off KMD88's `kanit`) |
| `BRAND_TEXT` | `#dde8f7` |
| Page background | `#00081f` (from `src/assets/bg.json`) |
| Brand type | **MIXED CASINO + SPORTS** — บาคาร่า · ไฮโล · สล็อต · แทงบอล. NOT a lottery site. |

⚠️ **Brand name and domain do not match** (`TSDET911` vs `tsbet911-play.com`).
That is the operator's instruction, taken verbatim. Never derive one from the
other, never "correct" either, never type a URL by hand anywhere.

Three files carry the domain and the orchestrator has already set all three —
fan-out agents must not touch them: `astro.config.mjs` `site:`,
`src/pages/index.astro` schema literal (handled via `pageGraph`), and
`wrangler.toml` `name = "tsbet911-play"`.

---

## 2. Palette — ELECTRIC BLUE + CHROME SILVER ON NEAR-BLACK NAVY

Read off the artwork: the logo is **TSDET** in polished chrome-silver 3-D
lettering next to **911** in electric blue, with a blue swoosh/falcon mark to its
left. `banner1`, `slide1` and `slide2` are all the same scene — a black studio
set lit with **electric-blue light ribbons and blue lens flare**, a silver-haired
man and a silver-haired woman in black and white formalwear, blue-and-silver
casino chips, black-and-silver aces, a chrome roulette wheel. **There is no gold
anywhere in this drop.**

### Allowed values

| role | hex | notes |
|---|---|---|
| page background | `#00081f` | bg.json; nothing may sink below it |
| sunken plate | `#040e26` | |
| mid plate | `#0a1c42` | |
| raised plate | `#102a5e` | |
| **primary brand blue** | `#0360f3` | borders, accents, glows. **Never carries text.** |
| bright brand blue | `#0292fb` | borders/fills/glows. **Never carries text.** |
| deep blue | `#032dad` | plate edges, gradient ends. **Never carries text.** |
| deepest blue | `#04186e` / `#041a43` | gradient ends only. **Never carries text.** |
| **body copy** | `#dde8f7` | = `BRAND_TEXT`. 11.6:1 on `#102a5e`, 17.4:1 on the page bg |
| **the one highlight** | `#6ec8ff` | the ONLY colour a `<strong>` ever takes. 7.4:1 on `#102a5e` |
| light blue text | `#4fb4ff` | ~6:1 — links/hover only, not body prose |
| chrome silver (light) | `#cfdcec` | bright end of heading gradients |
| chrome silver (mid) | `#9db4d4` | muted secondary text, ~6:1 |
| ink on a light/blue fill | `#021026` | 6.0:1 on `#0292fb`, 9.8:1 on `#6ec8ff` |

Glow rgba: `rgba(3,96,243,α)` · `rgba(2,146,251,α)` · `rgba(110,200,255,α)`.

### Values that must be GONE from every file in your scope

KMD88 violet+gold: `#7505cc` `#b453ff` `#c07cff` `#d9b8ff` `#3a0565` `#2c0349`
`#1d0832` `#140522` `#0a0213` `#1a0526` `#ece2f8` `#bba8d4` `#e2b33f` `#ffd45e`
`#ffdf8c` `#7a5a0a`, plus `rgba(117,5,204,…)` `rgba(226,179,63,…)`
`rgba(255,212,94,…)`.

Whatever brand last owned the file you are rethemeing also left its own set
behind — **grep the file for every hex and rgba() it contains and replace them
all by VALUE, not by colour family.** Known inherited sets: `NavbarStyle7` is
DUCK1688 gold/orange (`#f3bb34` `#fde464` `#c8901a` `#f58b2a` `#ffc98a`
`#d8c69b` `#8a5f08` `#1a1203` `#0d0903`), `FooterPremium` and
`ContentBoxSevenThreeFloatingBadge` carry an older amber set (`#dfa310`
`#ffc93d` `#ffe4a3` `#ffd98a` `#f0e9dc` `#8a5c09` `#1b1307` `#070502`).

**Leave genuinely semantic colours alone**: LINE green `#00B900`, live/success
green, real bank brand colours in `BankStrip`/`banks/`.

---

## 3. Variant rotation — DECIDED, do not re-pick

| family | KMD88 (out) | TSDET911 (in) |
|---|---|---|
| Navbar | `NavbarStyle11` | **`NavbarStyle7`** |
| Footer | `FooterStyle3` | **`FooterPremium`** |
| Announcement | `Announcement5` | **`Announcement3`** |
| LatestWinners | `LatestWinnersCyber` | **`LatestWinners3`** |
| Faq | `Faq3` | **`Faq4`** |
| Review cards | `ReviewCardSumo` | **`ReviewCardSumo2`** |
| Font | `kanit` | **`google-sans`** |

ContentBox shape-mix (KMD88 ran CyberCut / TwoPremium / plain / SevenThreePremium
/ SevenThreeNeumorphism / Special / FloatingBadge — none of those shapes repeats
except the sanctioned plain box):

| § | heading | component |
|---|---|---|
| 1 | H1 | `ContentBoxPremium` |
| 2 | H2 | `ContentBoxTwoNeumorphism` |
| 3 | H2 | `ContentBox` (plain — **sanctioned carry-over**, it is the always-live box that terms/privacy/404/button pages render through and cannot follow a rotation) |
| 4 | H3 | `ContentBoxSevenThreeFloatingBadge` + **slide2** |
| 5 | H3 | `ContentBoxSevenThree` (plain) + **slide1** |
| 6 | H2 | `ContentBox3ThreeCyberCut` with `heading={false}` (intro slot + 3 step columns as `<p>` labels) |
| 7 | H2 | `ContentBoxNeumorphism` |
| 8 | H2 | `Faq4` + explicit `faqs` prop |

SevenThree family count = **2**, which is the hard cap. No third one anywhere on
the site, and no slide appears outside those two blocks.

**Unused variants are inventory for the next brand. Never delete one.**

---

## 4. Images in this drop

Current drop is dated **2026-10-13 01:45–01:46**. Anything older is a previous
brand's leftover and **must not be imported** (an eager import IS an emit, so it
ships into `dist/` whether or not it renders, and `verify-build` goes red).

| file | mtime | role |
|---|---|---|
| `logo.webp` | 10-13 | navbar/footer logo — owned by the active chrome |
| `banner1.png` | 10-13 | hero — owned by `MainLayout`'s pinned glob, never referenced from a page |
| `banner1-mobile.png` | 10-13 | phone crop of banner1 — `MainLayout`'s second pinned glob. Never an article image, never the hero directly |
| `og.png` | 10-13 | og:image — `MainLayout` owns it |
| `slide1.png` | 10-13 | **600×600. โปรโมชั่น แนะนำเพื่อน โบนัส 0.8%** → §5 |
| `slide2.png` | 10-13 | **600×600. โปรโมชั่น คืนยอดเสีย 0.3%** → §4 |
| `banner2.png` | 10-08 | ❌ STALE — previous brand. Do not import. |
| `banner3.png` | 09-27 | ❌ STALE — previous brand. Do not import. |
| `slide3.png` `slide4.png` | 09-29 | ❌ STALE — a lottery brand's posters. Do not import. |

So there is **no current-drop article illustration** this round (no `banner2+`
goes into a single-column box), and a slide is never substituted for one.

### Alt-text source material (write from this, do not carry old alt over)

- **slide1** — square. Top left: the TSDET911 wordmark, chrome-silver **TSDET**
  with electric-blue **911** beside a blue falcon/swoosh mark. Right: a
  silver-haired young man in a black suit seated beside a silver-haired young
  woman in a white blazer. Left of centre, stacked: **โปรโมชั่น** in huge 3-D
  chrome-and-blue type, **แนะนำเพื่อน** on a black blue-edged plate, then
  **โบนัส 0.8%** in large blue numerals. Along the bottom: black-and-silver
  casino chips and a spade ace. Blue light ribbons arc behind everything on
  black.
- **slide2** — the companion square, same wordmark top left, same couple (here
  both facing forward, the woman in a black-and-silver jacket). Stacked at the
  left: **โปรโมชั่น**, **คืนยอดเสีย** on a black blue-edged plate, then
  **0.3%** in very large 3-D chrome-blue numerals. Bottom: a blue-and-black chip
  carrying the falcon mark, more chips, and a chrome roulette wheel rim.
- **banner1** (MainLayout's, for reference only) — wide black scene, the couple
  at the left, blue-rimmed chips and a spade ace at the far left, a chrome
  roulette wheel bottom right, and at the right the TSDET911 wordmark above
  **TSDET911 เว็บพนันลิขสิทธิ์ไทยแท้ / เดิมพันได้ 24 ชั่วโมง ผ่านเซิร์ฟไทย**.

---

## 5. The docx heading checklist — ALL EIGHT, IN THIS ORDER

Source: `src/assets/content.txt`. Line numbers are that file's.

```
 1  H1  TSDET911 เว็บพนันลิขสิทธิ์ไทยแท้ ผ่านเซิร์ฟไทย 100%            body: line 4   (1 para)
 2  H2  ทางเข้าเดิมพัน TSDET911 บาคาร่า ไฮโล สล็อต แทงบอล ไม่มีขั้นต่ำ   body: lines 6,7 (2 paras)
 3  H2  โปรโมชั่นเดิมพัน TSDET911 เว็บพนันคาสิโนเซิร์ฟไทยแท้             body: line 9   (1 para)
 4  H3  โปรโมชั่น คืนยอดเสีย 0.3% เข้ายูสทุกวัน                          body: line 11  (1 para)
 5  H3  โปรโมชั่น แนะนำเพื่อน โบนัส 0.8% ไม่จำกัด                        body: line 13  (1 para)
 6  H2  สมัครเล่น TSDET911 คาสิโน 3 ขั้นตอน                             body: line 15 intro + lines 16,17,18 (3 steps)
 7  H2  แอดมิน TSDET911 เปิดบริการ 24 ชั่วโมง                            body: lines 20,21 (2 paras)
 8  H2  คำถามที่พบบ่อยเกี่ยวกับ TSDET911                                 body: lines 23–28 (3 Q/A pairs)
```

**Final home-page heading inventory: `h1 × 1`, `h2 × 5`, `h3 × 2`.**

The brief has a real H2 → H3 nesting (sections 4 and 5 sit under section 3), so
the page is NOT flattened to H2-only. **There is no `FeatureHighlights` H3
exception this round** — section 6's three steps are rendered as `<p>` column
labels inside `ContentBox3ThreeCyberCut` (`heading={false}`), so they add no
heading at any level and the printed `h3` count stays at exactly 2.

Every paragraph ships in full. Nothing merged, nothing summarised, no hedge
clause trimmed. The brief hedges five times and every one of them stays in its
paragraph:
- *ส่วนการกล่าวอ้างว่าเป็นเว็บลิขสิทธิ์ไทยแท้และใช้เซิร์ฟเวอร์ในประเทศไทย 100% ควรมีข้อมูลใบอนุญาต…*
- *การเดิมพันทุกประเภทมีความเสี่ยงและไม่มีระบบใดรับประกันว่าจะได้รับกำไร*
- *ควรตรวจสอบว่าโปรโมชั่นครอบคลุมบาคาร่า ไฮโล สล็อต หรือแทงบอลประเภทใดบ้าง*
- *ส่วนคำว่าไม่จำกัดควรระบุให้ชัด…*
- *ไม่ควรเปิดเผยรหัสผ่าน PIN หรือ OTP ให้บุคคลอื่น…*

---

## 6. Title / Description

Home page (`index.astro` and `MainLayout`'s defaults), taken from the brief's own
lines 1–2 **verbatim** — not padded toward 150 characters, because
`verify-build` deliberately skips its 150-char floor on the home page:

```
title:       TSDET911 เว็บพนันลิขสิทธิ์ไทยแท้ เดิมพันได้ 24 ชั่วโมง ผ่านเซิร์ฟไทย
description: TSDET911 เว็บพนันลิขสิทธิ์ไทยแท้ ทางเข้าเดิมพัน บาคาร่า ไฮโล สล็อต แทงบอล ไม่มีขั้นต่ำ เปิดระบบเข้าเล่นได้ 24 ชั่วโมง ผ่านเซิร์ฟไทย100%
```

(the brand name is interpolated, not typed).

**The brief has NO `SUB-PAGES (Title & Meta Description)` section**, so every
sub-page's title and description is yours to infer — and must land in the
**150–160 character** band, counted in *characters* (`wc -m`), never bytes.
One sentence saying what the page is for, then stop.

---

## 7. Vocabulary — the brief's own words only

Allowed: เว็บพนันลิขสิทธิ์ไทยแท้ · ผ่านเซิร์ฟไทย 100% · ทางเข้าเดิมพัน ·
บาคาร่า · ไฮโล · สล็อต · แทงบอล · ไม่มีขั้นต่ำ · หมวดเกม · แพลตฟอร์มเดียว ·
เกมไพ่ · ลูกเต๋า · เกมวงล้อทั่วไป · ฟีเจอร์โบนัส · รายการแข่งขัน · อัตราต่อรอง ·
ตารางจ่าย · กติกา · เงื่อนไขการตัดสินผล · ยอดเดิมพัน · บัญชีเดียว ·
24 ชั่วโมง · โบนัสคืนยอดเสีย 0.3% · เข้ายูสทุกวัน · รอบประจำวัน · เวลาตัดยอด ·
ยอดที่เข้าเกณฑ์ · แนะนำเพื่อน · โบนัส 0.8% · ไม่จำกัด · ลิงก์แนะนำ ·
สมัครเล่น 3 ขั้นตอน · ยืนยันบัญชี · รหัสผ่าน · PIN · OTP · แอดมิน ·
หมายเลขรายการ · คู่แข่งขัน.

❌ **Gone from every file**: KMD88's framing (เว็บลิขสิทธิ์ไทยแท้ *คาสิโนรวมเกม*,
ระบบเดิมพันออนไลน์ ออโต้ทุกประเภท, ฝากถอนเข้าบริษัทเจ้าของโดยตรง, บัญชีบริษัท,
นิติบุคคล, บอลออนไลน์, ฟรีสปิน), and every older brand's (แตกง่าย, เว็บตรง,
ไม่ผ่านเอเย่นต์, จ่ายไว, ค่ายตรง, VIP, คาสิโนไลฟ์สด, รูเล็ต, เสือมังกร, ยิงปลา,
ทุนน้อย, เบทต่ำ).

❌ **No หวย / โพย / เลขเด็ด / งวด / แนวทาง / ตรวจหวย / 3 ตัว / 2 ตัว anywhere.**
This is a casino+sports brand; `/ตรวจหวย` and `/แนวทาง` stay parked in
`src/pages-disabled/` and no navbar or footer may link them.

❌ **Claim nothing the brief does not**: no licence number, no regulator, no
operator name, no game studio, no bank, no RTP figure, no deposit minimum, no
member count, no founding year, no server location. The only figures on the whole
site are the brief's own three: **0.3%**, **0.8%**, **24 ชั่วโมง**.

---

## 8. Page ownership map (P1 / P2 split)

**P1 — SHARED CHROME, owned by the orchestrator. No fan-out agent may edit any
of these:**

```
src/lib/brandProfile.ts        astro.config.mjs       wrangler.toml
public/site.webmanifest        src/layouts/MainLayout.astro
src/components/NavbarStyle7.astro      (active navbar)
src/components/FooterPremium.astro     (active footer)
src/components/Navfoot.astro           (8 pages)
src/components/ContentBox.astro        (11 pages)
src/components/Announcement3.astro     (all 8 ticker pages)
src/components/CtaRedirect.astro       (login + register)
```

**Agent A — landing:** `src/pages/index.astro` plus, recursively, the components
only index renders: `ContentBoxPremium`, `ContentBoxTwoNeumorphism`,
`ContentBoxSevenThreeFloatingBadge`, `ContentBoxSevenThree`,
`ContentBox3ThreeCyberCut`, `ContentBoxNeumorphism`, `Faq4`, `LatestWinners3`,
`LoginRtpSection` → `ContentBoxTwo`, `ReviewCardSumo2`.

**Agent B — sub-pages:** `src/pages/about-us.astro`,
`src/pages/promotion.astro`, `src/pages/ทดลองเล่น.astro`.

**Agent C — sub-pages:** `src/pages/contact-us.astro`,
`src/pages/ทางเข้า.astro`, `src/pages/login.astro`,
`src/pages/register.astro`, `src/pages/terms.astro`,
`src/pages/privacy.astro`, `src/pages/404.astro`.

Every agent swaps its pages' `Announcement5` import for `Announcement3` and
calls `<Announcement />` **bare** — the orchestrator sets Announcement3's default
message to this brand's copy, and an override on one page is exactly how two
pages end up saying different things.

---

## 9. Page-shape rules that bite this round

- `/contact-us`, `/ทางเข้า`, `/login`, `/register` are **button pages**: one
  `<h1>` from `ContentBox as="h1"`, then the buttons. **No `<h2>`, no prose.**
  Delete any headings/paragraphs you inherit — that is a fix, not scope creep.
- `/promotion` is an **image page**: one `<h1>`, **one** intro paragraph of about
  four lines, the `slide*` grid, one CTA. **No `<h2>`.** Delete inherited prose
  down to the single intro.
  ⚠️ Its hardcoded `slide1..4` imports are a live stale-asset hazard this round:
  **slide3/slide4 are a previous brand's posters.** The grid must show only
  slide1 and slide2.
- `/about-us` and `/ทดลองเล่น` **are** articles — their headings come from their
  own body, not from the docx checklist, and they are not part of the home page's
  `h2 × 5`.
- `terms.astro` / `privacy.astro` render through **`ContentBox.astro`
  specifically**, never this round's rotated variant, and **nothing inside those
  boxes may name a colour** — the box sets the text colour and the paragraphs
  inherit it. `privacy.astro` must keep describing what the build actually does:
  static, no analytics, no pixel, no cookie banner, no form that posts anywhere.
- `register.astro` / `login.astro`: **never edit `targetUrl`** and never touch its
  `rel="nofollow sponsored"`. Restyle the button only. Their descriptions are
  load-bearing now (indexed) — 150–160 characters.
- `/ทางเข้า` is deliberately **absent from the navbar** while the login/register
  toggles are on. Do not re-add it; do not delete the page.
