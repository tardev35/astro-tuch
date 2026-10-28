# brand-spec — WIN8S (2026-10-28)

Single source of truth for this rebrand round. **Every subagent reads this file
and does NOT re-extract the docx or re-choose variants.**

---

## §1 Identity

| | |
|---|---|
| Brand name | `WIN8S` — five chars, ALL CAPS latin `WIN` + digit `8` + `S`, one word. Never `Win8s`, `WIN 8S`, `win8s`, `WIN-8S` |
| Real URL | `https://win8s.cc` (operator gave it explicitly) |
| `wrangler.toml` `name` | `win8s` (= `SITE.hostname.split(".")[0]`). Checked against the whole forbidden list in wrangler.toml — **no collision** (`win-999` is a different string) |
| `iconSlug` | `win8s` (BRAND_NAME through `[^a-z0-9]`) — happens to equal the worker name this round; **that is a coincidence, the two derive from different sources** |
| Font | `BRAND_FONT = "google-sans"` — rotated off `kanit` (123BET). One line in `src/lib/brandProfile.ts`; nothing else touches fonts |
| Outgoing brand | **123BET** (`123bet-play.net`) — highest leak risk this round |

**Never type the brand name as a literal in code.** Interpolate `BRAND_NAME`
everywhere, including every `alt=`.

---

## §2 Palette — LOCKED. Do not sample from artwork, do not invent values.

🚨 **This round reverses direction from 123BET again: the WHOLE SITE IS DARK.**
Last round was light content (`#f7e4e9`) + dark chrome. **This round everything
is dark ember-black.** `src/assets/bg.json` for this drop is
`{"mode":"color","color":"#1e0101"}` = **near-black blood maroon**. bg.json is
the only source of the page background — read it, never inherit it.

⚠️ **Any light surface left from 123BET (`#fdf5f6`, `#f7e4e9`, `#f7dfe4`) on a
content card is a white hole in a black page.** Any dark ink
(`#36080f`, `#6b2b33`) is invisible on this round's surfaces.

### Surfaces
| role | hex |
|---|---|
| page background (from bg.json) | `#1e0101` |
| content card | `#2a0a04` |
| elevated / chip / inner panel | `#3b130b` |
| chrome base (navbar, footer, ticker, mobile bar) | `#250604` |
| chrome deepest | `#140302` |
| hairline / thin rule | `#5a2410` |
| decorative border / aura / glow fill | `#8a3a12` |

### Ink — contrast measured against `#1e0101` page / `#2a0a04` card
| role | hex | page | card |
|---|---|---|---|
| **body ink (= `BRAND_TEXT`)** | `#fdf0e6` | 17.7:1 | 16.4:1 |
| secondary ink | `#e0bda4` | 11.3:1 | 10.5:1 |
| **headings / links / `<strong>`** | `#f27a1a` fire orange | 7.1:1 | 6.6:1 |
| gold, secondary emphasis | `#e5a92b` | 9.5:1 | 8.8:1 |
| chrome silver | `#c9d2dc` | 13.0:1 | 12.0:1 |

🚨 **`#5a2410` and `#8a3a12` are rules / borders / aura / fills ONLY — they may
never carry text in any context.**

### Buttons
- **Primary CTA** — `bg-gradient-to-b from-[#f0a21e] via-[#f27a1a] to-[#e8620e]`
  with ink **`#1e0101`** (9.3 / 7.1 / 5.8:1 per stop — AA at every stop).
  ⚠️ **White ink fails on this gradient (2.8:1). Do not use white here.**
  ⚠️ Do not darken the end stop past `#e8620e` — below that, dark ink drops under 4.5:1.
- **Secondary** — surface `#2a0a04`, ink `#f0a21e`, border `#8a3a12`.
- **Outline** — border `#f27a1a`, ink `#f27a1a`, surface `#2a0a04`.
- Top highlight sheets capped at `white/10`.

### Allowed `rgba()`
`rgba(242,122,26,α)` · `rgba(229,169,43,α)` · `rgba(138,58,18,α)` ·
`rgba(30,1,1,α)` · `rgba(20,3,2,α)`

### Semantic colours — KEEP, do not fold into the palette
- LINE green `#00B900` on the LINE button.
- The green success state in the winners feed.
Neither belongs to any brand. This round's hue is orange; there is no reason to
turn them orange.

### 🚨 123BET hexes that MUST NOT survive anywhere a page renders
Written without `#` so a sweep for leftovers does not trip on this list:
`f7e4e9` `fdf5f6` `f7dfe4` `eec3cc` `d98fa0` `330710` `1c050b` `4d0c18`
`36080f` `6b2b33` `a30d1a` `7a4a0c` `dca53a` `d2d7dd` `8a1420` `c21325`
`ef4a5e`, and `rgba(163,13,26,…)` `rgba(220,165,58,…)` `rgba(217,143,160,…)`
`rgba(54,8,15,…)`.

**Near-miss pairs — suspect a typo before believing them:**
- `dca53a` (123BET gold) / `e0b03a` `e3bb45` (TEVA69) / `e9b53c` (LOTTO189) ↔ **`#e5a92b`**
- `d2d7dd` (123BET silver) / `cfd6e3` `c3ccd6` (LOTTO189) / `d8dde6` `8f9aa8` (ZNOVA168) ↔ **`#c9d2dc`**
- `e8a000` `d4922c` `e3a712` (ZNOVA168 amber) ↔ **`#e5a92b`**
- `0e0602` `2b1608` (ZNOVA168 brown) / `1a0709` `2a0b0e` ↔ **`#140302` `#250604` `#2a0a04`**
- `c23400` (ZNOVA168) / `f2543f` `e2855c` (MEXICANOSLOT) / `ff5a5f` ↔ **`#f27a1a` `#e8620e`**
- `fdeee2` `e8fbe4` `eef7f0` ↔ **`#fdf0e6`**

### 🚨 Each newly-rotated-in file still carries its PREVIOUS owner's palette
These must be swept value-by-value in a full-file rewrite, not spot-edited:
- `NavbarStyle9` — **ZNOVA168**: dark brown `#0e0602`/`#2b1608`, amber `#e8a000`, steel `#d8dde6`/`#8f9aa8`
- `FooterStyle2` — check and sweep whatever hue it ships with
- `AnnouncementPremium` — green ink `#e8fbe4`
- `ContentBoxFloatingBadge`, `ContentBoxTwoFloatingBadge` — **forest green** `#28c437` `#116018` `#0b4a12` `#1a7d24`
- `ContentBoxSevenThreeNeumorphism`, `ContentBoxTwoNeumorphism`, `ContentBoxPremium`, `ContentBoxSevenThreePremium`, `ContentBox3ThreeCyberCut`, `ContentBoxTwoCyberCut` — sweep each
- `Faq2` — ships `bg-white` panels; must become `#2a0a04`/`#3b130b`
- `LatestWinners4` — `#fdeee2` and its own brand hue hardcoded in JSX
- `ReviewCardSumo`, `ProviderGridPremium`, `CtaRedirect`, `Navfoot` — sweep each

**Red was 123BET's lead hue and has been the lead hue of a dozen brands in this
repo.** This round's lead is **fire orange `#f27a1a` + amber gold `#e5a92b` on
near-black ember**. Orange-adjacent reds in an inventory file are *leftovers*,
not interpretation — compare all six digits, never by eye.

---

## §3 Variant rotation — 123BET → WIN8S

**Every family rotates. Nothing reuses the outgoing pick.**

| family | 123BET (out) | WIN8S (in) |
|---|---|---|
| Navbar | `NavbarPremium` | **`NavbarStyle9`** |
| Footer | `FooterPremiumSumo` | **`FooterStyle2`** |
| Announcement | `Announcement5` | **`AnnouncementPremium`** |
| Faq | `Faq4` | **`Faq2`** |
| LatestWinners | `LatestWinners2` | **`LatestWinners4`** |
| Review cards | `ReviewCardSumo2` | **`ReviewCardSumo`** |
| Provider grid | `ProviderGrid` | **`ProviderGridPremium`** |
| ContentBox shape mix | CyberCut · Two · base · SevenThree · SevenThreeCyberCut · 3ThreePremium · Special | **Premium · TwoNeumorphism · FloatingBadge · SevenThreePremium · SevenThreeNeumorphism · 3ThreeCyberCut · TwoCyberCut** |
| Font | `kanit` | **`google-sans`** |

Why these two for the chrome:
- **`NavbarStyle9`** is already in the right shape for this playbook: one `links`
  const shared by desktop + drawer, icons as sibling `<span aria-hidden="true">`,
  `isActivePath` imported from `../lib/nav`, correct menu order, 7 items, no
  `/ตรวจหวย`, no `/แนวทาง`, no `/ทางเข้า`. Shape differs from `NavbarPremium`
  (85 px gradient bar capped at `max-w-[1600px]` vs. a full-width rounded-bottom
  bar).
- **`FooterStyle2`** neither imports nor renders `BankStrip` — this round's brief
  has **no deposit / bank / wallet section at all**, so a footer that drags a
  bank strip in would invent a category. It also carries no lottery links.
  (`Footer`, `FooterStyle3`, `FooterPremium` all import `BankStrip`; `FooterCyber`
  was ZORO365's; `FooterHuay` is the lottery theme.)

🚫 **Do not delete any unused variant.** They are the next brand's inventory.

❌ **Not used this round:** `BankStrip`, `FeatureHighlights`, `SmoothCarousel`,
`LottoGrid`, `LoginRtpSection`, `GameRankingBoard`, `FeaturedGames`,
`PopularGamesStrip`, `ContentBoxSpecial`, and the whole `*Huay` family — the
brief has no section that fits any of them.

---

## §4 Docx heading checklist — `src/assets/content.txt`, document order

Target inventory for `/` (home): **h1 ×1 · h2 ×5 · h3 ×2**

| # | level | heading (brand name interpolated) | body | slot |
|---|---|---|---|---|
| 1 | **H1** | `WIN8S คาสิโนเล่นบาคาร่า ทางเข้าเล่น เกมเดิมพันสด ทุกค่ายดัง` | line 4 | `ContentBoxPremium` |
| 2 | **H2** | `การันตี WIN8S ลิขสิทธิ์แท้จากเมกา เล่นง่าย ไม่หักเปอร์เซ็นต์ เซิร์ฟนอก ปลอดภัย100%` | line 6, split across two halves without dropping a sentence | `ContentBoxTwoNeumorphism`, then `ProviderGridPremium` immediately after |
| 3 | **H2** | `โปรโมชั่นคาสิโนเว็บ WIN8S โบนัสไม่อั้น` | line 8 | `ContentBoxFloatingBadge` |
| 4 | **H3** | `โปรโมชั่น คืนยอดเสีย 0.3% เข้ายูสได้ทุกวัน` | line 10 | `ContentBoxSevenThreePremium` + **`slide1.png`** in the right slot |
| 5 | **H3** | `โปรโมชั่น แนะนำเพื่อน โบนัส 0.8% ไม่จำกัด` | line 12 | `ContentBoxSevenThreeNeumorphism` + **`slide2.png`** in the right slot |
| 6 | **H2** | `สมัครเล่น WIN8S บาคาร่า สล็อต ครบ` | line 14 → default slot; lines 15–20 → left / center / right | `ContentBox3ThreeCyberCut` |
| 7 | **H2** | `แอดมิน WIN8S ออนไลน์ตลอด 24ชม.` | line 22, split across two halves | `ContentBoxTwoCyberCut` |
| 8 | **H2** | `คำถามที่พบบ่อยเกี่ยวกับ WIN8S` | lines 24–29, three Q/A pairs | `Faq2` + explicit `faqs` prop + explicit `as="h2"` |

**Heading-leak guards:**
- Lines 15 / 17 / 19 (`ขั้นตอนที่ 1/2/3`) have **no `H` prefix** → they go into
  `titleleft`/`titlecenter`/`titleright` with **no `heading` prop** so they render as `<p>`.
- Do **not** pass `titleright` to `ContentBoxTwo*` or either `SevenThree*` — the
  image column and the right half must not produce a heading.
- `Faq2` questions are `<summary>` content, not headings.
- Chrome (`AnnouncementPremium`, `ProviderGridPremium`, `LatestWinners4`,
  `ReviewCardSumo`, `Navfoot`, navbar, footer) renders its labels as
  `<p>`/`<span>` with `aria-label` on the `<section>`. **Never promote one to an
  `<h2>` to "give the section a name".**
- Before finishing, `grep -n '<h[1-6]' ` every component the page renders and
  confirm each hit is interpolated from a prop.

---

## §5 Copy rules

**This round's claims, in the brief's own words** — ship both halves, the
advertising line *and* the caveat sentence that follows it. Never expand an ad
claim into a new one; never drop a caveat for sounding negative.

Brief's own vocabulary: `คาสิโนเล่นบาคาร่า` · `ทางเข้าเล่น` · `เกมเดิมพันสด` ·
`ทุกค่ายดัง` · `ลิขสิทธิ์แท้จากเมกา` · `เล่นง่าย` · `ไม่หักเปอร์เซ็นต์` ·
`เซิร์ฟนอก` · `ปลอดภัย100%` · `โบนัสไม่อั้น` · `คืนยอดเสีย 0.3%` ·
`แนะนำเพื่อน 0.8%` · `แอดมินออนไลน์ตลอด 24ชม.`

🚨 **Three reversals from last round — these ARE this round's brief wording and
must NOT be stripped because an old comment in an inventory file bans them:**
- **`เซิร์ฟนอก`** — was banned as TEVA69's word; it is in this brief's lines 2 and 5.
- **`ปลอดภัย100%`** — last round's spec said "no `100%` anywhere"; this brief writes it.
- **`ลิขสิทธิ์แท้จากเมกา` / สหรัฐอเมริกา** — new this round.

🚨 **GAME CATEGORIES ARE THREE THIS ROUND, NOT SEVEN.** The brief says
**บาคาร่าออนไลน์ · คาสิโนสด · สล็อต** (lines 4, 13, 25). Last round had seven.
❌ **`ไฮโล` · `รูเล็ต` · `ยิงปลา` · `เดิมพันฟุตบอล`/`บอล` · `หวย`/`หวยออนไลน์`
do NOT appear in this brief and must not appear anywhere on the site.**
Do not inherit a category list across rounds.

🚨 **No lottery content at all** — no `สลาก` · `งวด` · `เลขเด็ด` · `ลอตโต้` ·
`โพย` · `รอบปิดรับ` · `สองตัวบน-ล่าง` · `สามตัวตรง-โต๊ด`.
→ `/ตรวจหวย` and `/แนวทาง` **stay in `src/pages-disabled/`**, and the active
navbar + footer must carry no link to either.

🚨 **No deposit / bank / wallet category** — the brief contains no such word.
No `ฝากถอน` · `ออโต้` · `ทรูวอลเลท` · `ทรูมันนี่` · `ทุกธนาคาร` · `ไม่มีขั้นต่ำ`.
(`ไม่มีขั้นต่ำ` was *123BET's* phrase, not this brief's.)

**Numbers allowed on the site — only the brief's own:**
`0.3%` · `0.8%` · `100%` · `3 ขั้นตอน` · `24ชม.`/`24 ชั่วโมง`.
❌ No member counts, no founding year, no RTP value, no provider/game counts, no
minimum-deposit figure, no `1 บาท`.

### ❌ Previous brands' words — must not appear anywhere rendered
- **123BET (outgoing — highest risk):** `123BET` · `เจ้าของบาคาร่าสล็อต` ·
  `เว็บตรง` · `ถูกลิขสิทธิ์` · `เซิร์ฟแท้` · `ปลอดภัยในไทย` · `ครบทุกค่าย` ·
  `ไม่มีขั้นต่ำ` · `อัปเดตใหม่ตลอดสัปดาห์`
- **ZORO365:** `ZORO365` · `เกมคาสิโนสายตรง` · `แทงได้เท่าไหร่` · `เว็บจ่ายเต็ม` ·
  `ไม่มีโกง` · `ไม่ผ่านเว็บตัวแทน`
- **TEVA69** · **LOTTO189** (`แนะนำเว็บหวยลอตโต้`, `แทงหวยจ่ายสด`, `อัตราจ่าย 2 ตัว 100`)
  · **ZANE96** (`เว็บตรงไม่ผ่านเอเย่นต์`) · **ZNOVA168** (`ฟรีสปิน`, `ค่า RTP`,
  `สล็อต1บาททรูวอลเลท` — **owner of `NavbarStyle9`**) · **MEXICANOSLOT**
  (`การันตีเว็บตรง`) · **okkub88** (`ยูสใหม่แตกไว`, `ทรูวอลเลท`) · **รวยเทพ168** ·
  **JEDI66** · **KINGKONG555** · **สาธุ168** · **888PARUAY** · **KOON234** ·
  **โบ๊ะบ๊ะ168** · **หมูบิน168** · **สล็อต168** · **นาซ่า168** · **มาดาม168** ·
  **เงินทอง168** — plus `เว็บตรงแตกง่าย` · `เบทต่ำ` · `ไม่ทำเทิร์น` ·
  `ไม่ผ่านเอเย่นต์100%` · `เซิร์ฟไทย`

### Meta descriptions
- **Home:** `description` = **brief line 2, verbatim, 135 characters.** Do not pad
  it to 150. `verify-build` exempts the home page's lower bound for exactly this.
- **Home `title`:** brief line 1, verbatim (65 characters).
- **Home `<h1>`:** brief line 3 — which **differs from line 1**; use line 3, do not copy the title.
- **Every other page:** write **150–160 CHARACTERS** (not bytes — Thai is 3
  bytes/char, so `wc -c` lies). Measure with
  `node -e "console.log([...s].length)"`. Count fresh — `WIN8S` is 5 chars where
  `123BET` was 6, so every inherited string is now one char short.
- Never put `&` in a description: Astro serialises it as `&#38;` and the gate
  counts 5 characters.

### Markup hygiene
- **No HTML comments (`<!-- … -->`) in anything that renders.** Astro ships them
  verbatim to production. Strip them from every file you rewrite. Notes go in
  frontmatter (`//`), which *is* stripped.
- `<strong>` must wrap a whole **space-delimited run** — Thai has no inter-word
  spaces, so opening or closing mid-run breaks the line inside a word. Reading
  the copy with the tags removed must reproduce the brief exactly.
- Paragraphs in a page must not carry their own colour/size classes and must not
  carry `mx-auto` / `max-w-*` — the card already caps width and sets ink.

---

## §6 Images — this drop

| file | mtime | role |
|---|---|---|
| `banner1.png` 2243×701 | **2026-10-28 ✅ this drop** | hero — pinned by `MainLayout`'s named glob. Do not reference it from a page |
| `banner1-mobile.png` 1080×1080 | **2026-10-28 ✅** | phone hero `<source>`, same glob. **Never** article art, never a `ContentBox` |
| `og.png` 1200×630 | **2026-10-28 ✅** | `og:image`, `MainLayout`'s glob |
| `slide1.png` 375×600 | **2026-10-28 ✅** | poster printed **`โปรโมชั่น / คืนยอดเสีย / 0.3%`** → checklist §4 |
| `slide2.png` 375×600 | **2026-10-28 ✅** | poster printed **`โปรโมชั่น / แนะนำเพื่อน / 0.8%`** → checklist §5 |
| `banner2.png`, `banner3.png` | 2026-10-23 ❌ | **another brand's artwork — never import** |
| `slide3.png`, `slide4.png` | 2026-09-29 ❌ | **another brand's artwork — never import** |

🚨 **The slide↔content pairing is FLIPPED from last round** (123BET had
slide1 = แนะนำเพื่อน). The uploader overwrites both files on every drop, so a
file number means nothing across brands. **The text printed on the bitmap
decides** — both were opened and read this round.

⚠️ An eager `import` **emits** the file into `dist/` whether or not anything
renders it, and `tools/verify-build.mjs` fails the build on an emitted image no
version of which is used. Importing a stale file ships another client's artwork.
**Do not delete the stale files** — they are inventory. Just never import them.

- Both slides cap at **375 px**; no `widths` candidate may exceed 375 (upscaling).
- `quality={64}` on both slides, one value for avif+webp
  (`tools/avif-quality-service.mjs` scales avif to ×0.65 by itself).
- The LCP element is the hero in `MainLayout`. **No image on any other page gets
  `loading="eager"` or `fetchpriority="high"`.**
- `/promotion` keeps a two-cell grid (two current slides), ordered
  **คืนยอดเสีย 0.3% first, then แนะนำเพื่อน 0.8%** — brief order, not file order.

### Artwork description for `alt` — read from THIS drop's bitmaps
Scene: a **bright ivory-white Japanese interior** with **pink and white cherry
blossom (sakura) branches**, shoji-style panels and gold filigree arches. A
long-haired woman in a **red-and-black floral kimono with gold embroidery**,
wearing **red and white sakura hair ornaments with gold tassels**. The wordmark
is **3-D, the `WIN8` half in fiery orange-gold with black outlines and bright
specular highlights, the `S` in polished chrome silver**, over **black
brush-stroke splashes and gold paint sweeps**. Below it, **3-D gold Thai
lettering with red-brown outlines**, then a **black capsule bar with a gold
filigree border and white text**. Stacked **black-and-gold casino chips** and
**two ace playing cards** at the edges. The emblem at the upper right is a
**crest on a dark shield with a gold crown, a torii gate and a dragon**.
`slide1` adds a **red-and-white sakura parasol**; `slide2` adds a **red-and-white
folding fan**; neither has the parasol and the fan together.

⚠️ **The artwork prints a wordmark.** Describe the *shape* of the wordmark and
name the brand via `${BRAND_NAME}` — **never type the brand letters into an `alt`.**
The hero `alt` renders on every page, so it is the widest leak surface on the site.

❌ **123BET / previous artwork language that is NOT in this drop:** ivory marble
palace hall with columns and arches · woman in a red-and-white gold-embroidered
**ball gown** · gold crown set with red gems worn on the head · **red velvet**
cushions and drapes · **red-and-white** casino chips · silver crown on the
emblem · chrome-silver shield with a red diamond.
❌ Older: Japanese room with **bamboo** and white flowers, **green-and-white**
kimono, katana, green ink brush ring, green chips (ZORO365) · cream office with
tall windows, white suit, laptop (TEVA69) · lottery balls and slips, gold pen
(LOTTO189) · lilac 777 slot cabinet, magenta chips, pink cherries (ZANE96) ·
spiked silver armour, red ribbons, TrueMoney logo (ZNOVA168) · sombrero, poncho,
maracas, cactus, Mexican flag (MEXICANOSLOT) · laughing Chinese fortune god,
gold ingots (รวยเทพ168) · round pink cartoon face (okkub88) · blue cartoon
clouds (โบ๊ะบ๊ะ168) · winged piglet (หมูบิน168) · astronaut (นาซ่า168).

⚠️ **Cherry blossom, a kimono, casino chips, a gold crown and ace cards have all
appeared in previous drops in different colours.** Describe *this* bitmap:
sakura is **pink-and-white on an ivory room**, the kimono is **red-black-gold**,
the chips are **black-and-gold**, the crown is **on the emblem, not on a head**.

---

## §7 Page roster + ownership

`/ตรวจหวย` and `/แนวทาง` stay **parked** in `src/pages-disabled/` (no lottery
content in the brief). `src/pages-disabled/about-us.astro` is an older parked
copy — Astro never routes it; leave it alone.

### P1 — shared chrome (orchestrator only, before fan-out)
Computed this round as the active layout + its navbar/footer + every component
imported by **two or more** files under `src/pages/`:

`src/layouts/MainLayout.astro` · `src/components/NavbarStyle9.astro` ·
`src/components/FooterStyle2.astro` · `src/components/Navfoot.astro` ·
`src/components/ContentBox.astro` · `src/components/AnnouncementPremium.astro` ·
`src/components/CtaRedirect.astro`
plus the three config one-liners: `astro.config.mjs` `site:`, `wrangler.toml`
`name`, `src/lib/brandProfile.ts` (`BRAND_FONT` / `BRAND_NAME` / `BRAND_TEXT`),
and `public/site.webmanifest`.

### Agent A — landing
`src/pages/index.astro` and the components only index renders:
`ContentBoxPremium` · `ContentBoxTwoNeumorphism` · `ContentBoxFloatingBadge` ·
`ContentBoxSevenThreePremium` · `ContentBoxSevenThreeNeumorphism` ·
`ContentBox3ThreeCyberCut` · `ContentBoxTwoCyberCut` · `ProviderGridPremium` ·
`Faq2` · `LatestWinners4` · `ReviewCardSumo`

### Agent B — content sub-pages
`src/pages/promotion.astro` · `src/pages/ทดลองเล่น.astro` · `src/pages/about-us.astro`

### Agent C — button + permanent pages
`src/pages/contact-us.astro` · `src/pages/ทางเข้า.astro` · `src/pages/login.astro` ·
`src/pages/register.astro` · `src/pages/terms.astro` · `src/pages/privacy.astro` ·
`src/pages/404.astro`

**No two agents may touch the same file. Nobody but the orchestrator touches the
P1 set. Nobody runs `npm run build`.**

### Body shape per page (Phase 4.5 rules — these are not suggestions)
- `/contact-us` → `h1×1, h2×0, h3×0`: title, LINE image, `BRAND_ADDRESS` block +
  `mailto:`, button row. **No headings, no explanatory prose.**
- `/ทางเข้า` → `h1×1, h2×0, h3×0`: title + the two-button grid. **Nothing else.**
- `/promotion` → `h1×1, h2×0, h3×0`: title, **one ~4-line intro paragraph**,
  the two-slide grid, one CTA. **No section headings.**
- `/login`, `/register` → `h1×1, h2×0, h3×0`: title + one button.
  **Never edit `targetUrl`.** Rewrite title + description (150–160 chars) — these
  are indexed button pages now, not redirect stubs. `CtaRedirect` is P1's.
- `/about-us`, `/ทดลองเล่น` → real articles; headings come from their own body.
- `/terms`, `/privacy`, `/404` → brand-neutral by construction. They render through
  **`ContentBox.astro`** (never this round's rotated variant) and **nothing inside
  those boxes may name a colour**. Only check that they still build and that
  `privacy` still describes a static site with no analytics/pixel/form.

The brief has **no `SUB-PAGES` section**, so every sub-page title/description is
inferred — write them fresh at 150–160 characters each.
