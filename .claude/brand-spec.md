# BRAND SPEC — MGM9 (rebrand 2026-08-26)

**This file is the single source of truth for this rebrand.**
Do NOT re-extract the docx. Do NOT re-choose variants. Read this, then edit only the
files your brief assigns you.

---

## 1. Brand identity

| | |
|---|---|
| Brand name | **MGM9** |
| Real URL | `https://mgm9-vip.com` |
| Previous brand (remove every trace) | **หวยกินดี365** (also written `หวยกินดี 365`, `กินดี365`) |
| Genre | Full-service Thai casino — บาคาร่า / สล็อต / บอล / หวย |
| Mood | Electric chrome-blue neon on deep navy. Glass, ice-white glow, motion streaks. **NOT gold.** |
| Font | `google-sans` (rotated from `kanit`) |

The outgoing brand was navy **+ GOLD**. MGM9 is navy **+ ELECTRIC BLUE / ICE WHITE**.
Dropping the gold is the single most important visual change — if a component still
has amber/gold accents when you are done, the rebrand failed.

## 2. Palette — exact hex mapping

Replace **every** occurrence of a left-hand value with its right-hand value.

### Gold family → electric blue (the critical swap)

| old (gold) | new (blue) | role |
|---|---|---|
| `#f6db6b` | `#4aa4f4` | primary accent |
| `#fbe473` | `#9ad4ff` | bright accent / strong text |
| `#e9c55d` | `#4aa4f4` | primary accent (alt spelling) |
| `#fbeeb8` | `#c9e8ff` | gradient light stop |
| `#f3db5b` | `#4aa4f4` | primary accent (navbar/footer spelling) |
| `#fff3bf` | `#c9e8ff` | gradient light stop |
| `#e3c56a` | `#4aa4f4` | primary accent (Special/3Three spelling) |
| `#f7e8b4` | `#c9e8ff` | gradient light stop |
| `#f6da73` | `#9ad4ff` | bright accent |
| `#d0a63a` | `#1f74d6` | mid accent |
| `#c9a23a` | `#1f74d6` | mid accent |
| `#a37c14` | `#0b4ea8` | dark accent / gradient dark stop |
| `#7e5f1f` | `#0b4ea8` | dark accent / gradient dark stop |
| `#8a6a26` | `#0b4ea8` | dark accent |
| `#6b5316` | `#083a80` | deepest accent |
| `#5c4415` | `#083a80` | deepest accent |
| `#d4af37` | `#4aa4f4` | metallic gold |
| `#bdb08c` | `#a8c8ea` | muted gold-grey → muted blue-grey |
| `#e6dcc2` | `#dbeaff` | pale gold-grey → pale blue-grey |
| `#3a2a0c` | `#062a5e` | very dark gold-brown |
| `#241a08` | `#04203f` | very dark gold-brown |
| `#fcd34d` | `#4aa4f4` | tailwind amber-300 hex |

### Blue / surface family → MGM9 blues

| old | new | role |
|---|---|---|
| `#dce7fb` | `#d3e6ff` | body text (= `BRAND_TEXT`) |
| `#dbe4f5` | `#d3e6ff` | body text (alt spelling) |
| `#d6e2f5` | `#d3e6ff` | body text (alt spelling) |
| `#cfe4ff` / `#cfd8e6` / `#cfd8c8` / `#e4e7d8` | `#d3e6ff` | body text (alt spellings) |
| `#a9c4e8` / `#a9bda9` | `#a8c8ea` | muted text |
| `#5ec2f5` | `#5ee7ff` | cyan spark / secondary accent |
| `#1baafa` | `#5ee7ff` | cyan spark |
| `#7df3f5` | `#5ee7ff` | cyan spark |
| `#0bcacd` | `#4aa4f4` | teal → primary blue |
| `#0a7c8c` | `#0b4ea8` | dark teal |
| `#eafcff` | `#e8f5ff` | near-white |
| `#3f9ae0` / `#6fb4ff` / `#8ec5ff` | `#6fb4ff` | mid blue (keep) |
| `#1e7bf5` / `#0a6dfb` | `#1f74d6` | mid blue |
| `#0a3fa8` / `#1c47a8` / `#0534ba` / `#0a2f7a` | `#0b4ea8` | deep blue |
| `#062a6b` / `#062052` | `#062a72` | card gradient TOP |
| `#03153b` / `#031234` / `#0d1730` / `#16305e` | `#01102e` | card gradient BOTTOM |
| `#041b44` | `#021b43` | panel surface |
| `#00081f` / `#00040f` / `#010422` / `#060c1c` / `#01030a` / `#020617` / `#0b1633` / `#050d16` | `#010c26` | deepest surface |
| `#04161d` | `#010c26` | deepest surface |
| `#050403` | `#010c26` | near-black |

### Green family (ContentBoxSpecial / ContentBox3ThreeFloatingBadge only)

| old | new |
|---|---|
| `#2a9d5c` / `#1c6b3f` | `#1f74d6` |
| `#0d3a22` | `#062a72` |
| `#082013` / `#03130a` / `#020c06` | `#010c26` |

### Purple / grey strays

| old | new |
|---|---|
| `#4e1c80` | `#0b4ea8` |

### rgba() glow values

| old | new |
|---|---|
| `rgba(246,219,107, …)` | `rgba(74,164,244, …)` |
| `rgba(233,197,93, …)` | `rgba(74,164,244, …)` |
| `rgba(227,197,106, …)` | `rgba(74,164,244, …)` |
| `rgba(2,10,30, …)` / `rgba(2,12,6, …)` | `rgba(1,12,38, …)` |

### Tailwind utility classes

- `amber-*` / `yellow-*` → `sky-*` (same shade number)
- `emerald-*` / `green-*` → `sky-*` (same shade number) — **except** real semantic
  "live/online/success" dots, which stay green
- `purple-*` / `violet-*` / `fuchsia-*` / `rose-*` / `red-*` → `sky-*` / `blue-*`
- existing `blue-*` / `sky-*` / `cyan-*` may stay, but re-check the shade reads as
  electric blue, not muddy

### DO NOT CHANGE (semantic, not brand)

- LINE green `#00B900`
- real bank brand colours in `src/assets/banks/`, `src/assets/bank-footer/`
- genuine success/live-indicator greens (`#16a34a`, `bg-green-500` pulse dots)
- neutral greys used for disabled/secondary UI (`#9ca3af`, `#4b5563`)

## 3. Quick reference — the MGM9 palette

```
accent      #4aa4f4   electric blue      (was gold #f6db6b)
accentLite  #9ad4ff   ice blue           (was #fbe473)
accentPale  #c9e8ff   near-white blue    (was #fbeeb8)
accentMid   #1f74d6
accentDark  #0b4ea8
cyan        #5ee7ff   secondary spark
text        #d3e6ff   body copy  (= BRAND_TEXT)
textMuted   #a8c8ea
surfaceTop  #062a72   card gradient top
surfaceBot  #01102e   card gradient bottom
panel       #021b43
deepest     #010c26
glow        rgba(74,164,244,0.25)
```

## 4. Variant rotation (ALREADY DECIDED — do not re-choose)

| family | outgoing (หวยกินดี365) | **MGM9** |
|---|---|---|
| Navbar | `NavbarStyle9` | **`NavbarStyle6`** |
| Footer | `FooterStyle2` | **`FooterStyle3`** |
| Announcement (all non-lottery pages) | `AnnouncementPremium` | **`AnnouncementCyber`** |
| LatestWinners | `LatestWinners2` | **`LatestWinnersCyber`** |
| Faq | `Faq2` | **`Faq4`** |
| Font | `kanit` | **`google-sans`** |
| ContentBox mix | Neumorphism / TwoFloatingBadge / SevenThreeCyberCut / Premium / SevenThreeFloatingBadge / CyberCut | **ContentBox (plain) / ContentBoxTwoPremium / ContentBoxFloatingBadge / ContentBoxSevenThreePremium / ContentBoxSevenThreeNeumorphism / ContentBoxSpecial / ContentBoxTwoNeumorphism** |
| Game widget | `LottoGrid` | **`ProviderGridPremium`** |

Lottery pages keep `AnnouncementHuay` + the `Huay` red/gold theme **on purpose**
(sanctioned Phase 4.5 exception). Only their brand name changes.

## 5. Numbered docx heading checklist (document order — ALL must survive)

Source: `src/assets/content.txt`.

| # | level | heading | body paragraphs (content.txt lines) |
|---|---|---|---|
| 1 | **H1** | MGM9 เล่นบาคาร่าออนไลน์บนเว็บ คาสิโนเกมครบวงจร | 4 |
| 2 | **H2** | MGM9 เปิดบริการ บาคาร่า สล็อต บอล หวย ไม่อั้นจ่าย ไม่มีขั้นต่ำ | 6, 7 |
| 3 | **H2** | MGM9 ฝากถอนวอลเลท รองรับทุกธนาคาร โปรโมชั่นครบทุกรูปแบบ | 9 |
| 4 | **H3** | โปรโมชั่นแนะนำเพื่อน โบนัส 0.8% | 11 |
| 5 | **H3** | โปรโมชั่นคืนยอดเสีย โบนัส 0.3% | 13 |
| 6 | **H2** | สมัคร MGM9 ด้วย 3 ขั้นตอนง่าย ๆ | 15, (16/17/18 = 3 steps), 19 |
| 7 | **H2** | แอดมิน MGM9 ให้บริการออนไลน์ตลอด 24 ชั่วโมง | 21, 22 |
| 8 | **H2** | คำถามที่พบบ่อยเกี่ยวกับ MGM9 | FAQ pairs on lines 24–29 |

The docx has a **real H1→H2→H3 hierarchy** (items 4 and 5 are sub-points of item 3),
so the page keeps that hierarchy. `h1×1, h2×5, h3×2` on `/`.

Home page Title / Description come from the brief **verbatim** (do not pad):

- Title: `MGM9 เล่นบาคาร่า สล็อต บอล หวย ไม่อั้นจ่าย ไม่มีขั้นต่ำ`
- Description: `MGM9 คาสิโนเกมครบวงจร เล่นบาคาร่า สล็อต บอล หวย ครบทุกรูปแบบเกม ไม่อั้นจ่าย ไม่มีขั้นต่ำ สมัครรับโปรโมชั่นได้ตลอดทั้งวัน`

There is **no `SUB-PAGES` section** in the brief — every sub-page's title/description
is yours to write, at **150–160 characters** (characters, not bytes).

## 6. Image assets — roles are fixed

| file | mtime | role |
|---|---|---|
| `banner1.png` | 2026-08-26 ✅ current | hero — handled by `MainLayout` glob, nothing to do but the `alt` |
| `banner1-mobile.png` | 2026-08-26 ✅ current | phone crop of the hero — `MainLayout` only |
| `slide1.png` | 2026-08-26 ✅ current | **โปรโมชั่นแนะนำเพื่อน 0.8%** artwork → SevenThree block for heading #4 |
| `slide2.png` | 2026-08-26 ✅ current | **โปรโมชั่นคืนยอดเสีย 0.3%** artwork → SevenThree block for heading #5 |
| `banner2.png` | 2026-08-20 ⛔ STALE | previous brand — **do not use anywhere** |
| `banner3.png` | 2026-08-11 ⛔ STALE | previous brand — **do not use anywhere** |
| `slide3.png` / `slide4.png` | 2026-08-13 ⛔ STALE | previous brand — **do not use on index**; `/promotion` already imports them, see the promotion note below |
| `og.png` | 2026-08-26 ✅ current | og:image, handled by `MainLayout` |

**What slide1 actually shows** (for `alt`): deep blue casino scene, `MGM9` logo top
centre, a blue banner reading `โปรโมชั่น`, huge white text `แนะนำเพื่อน` above
`0.8%`, a woman in a white-and-red cheongsam pointing at the number, playing cards,
blue poker chips and a roulette wheel around her, three small blue chips along the
bottom reading `ชวนเพื่อนง่าย รับโบนัสทันที` / `รับโบนัส จากยอดเล่นเพื่อน` /
`ปลอดภัย มั่นคง 100%`.

**What slide2 actually shows** (for `alt`): same deep blue casino scene, `MGM9` logo
top centre, blue banner reading `โปรโมชั่น`, huge white text `คืนยอดเสีย` above
`0.3%`, a woman in a white-and-red cheongsam pointing at the number, playing cards,
a roulette wheel, slot reels and blue chips around her, three small blue chips along
the bottom reading `คืนยอดเสีย ทุกวัน` / `มั่นคง ปลอดภัย` / `ฝาก-ถอน ออโต้ 24 ชม.`.

**What banner1 shows** (for the hero `alt`, already the orchestrator's job): wide deep
blue casino banner, `MGM9` chrome logo top centre, a glowing blue plaque reading
`MGM9 เล่นบาคาร่า สล็อต บอล หวย` over `ไม่อั้นจ่าย ไม่มีขั้นต่ำ`, three aces and blue
poker chips at left, a baccarat table below, a footballer and ball centre, lottery
tickets and lottery balls right of centre, a slot machine showing 777 at top right,
and a woman in a red-and-white cheongsam with an `MGM9` badge at right.

## 7. Rules that trip people up on this repo

Read `.claude/skills/rebrand-site/SKILL.md` for the full set. The ones that bite:

1. **Unused component variants are INVENTORY — never delete one.** Not dead code.
2. **Only article content may produce a heading.** Chrome (navbar, footer, ticker,
   winners feed, provider grid, card labels, badges) renders its label as `<p>` or
   `<span>` with the same classes, plus `aria-label` on the section. A second `<h1>`
   anywhere fails the build.
3. **No HTML comments (`<!-- … -->`) in anything that renders.** Astro ships them
   verbatim into `dist/`. Strip them while rethemeing. Frontmatter `//` comments are
   fine — they are stripped.
4. **Body copy is `text-left text-base leading-relaxed <colour>`.** Never `text-sm`,
   never `text-lg`, never `mx-auto max-w-4xl` on a `<p>` in a page.
5. **One element per slot.** `<p slot="left">…</p>` or `<div slot="left">…</div>` —
   never two siblings into one slot.
6. **Do not re-add wrapper `<div>`s inside ContentBox variants** — they were
   deliberately flattened (`isolate` on the card + `-z-10` on decorative layers).
7. **Never write `isActive` by hand in a navbar** — import `isActivePath` from
   `../lib/nav`.
8. **Never use `define:vars`** on an indexable page. Fails the build.
9. **Decorative emoji need `aria-hidden="true"` on their own element**, never inside
   a text node, never baked into a text prop.
10. **No `href="#"`, no `onclick=`.** Back-to-top is `<a href="#top">`.
11. **`alt` must describe the picture** — for a promo banner the alt is the text
    printed on it (see §6 above).
12. **JSON-LD only via `pageGraph()`** from `src/lib/schema.ts`. Never type a domain,
    never build a URL with `+`. Never add `Review`, `AggregateRating`, `sameAs`, or
    `address`/`PostalAddress`.
13. **Contact address/email come from `BRAND_ADDRESS`** in `src/lib/brandProfile.ts`.
    Never retype the lines. Never put them in structured data.
14. **`<Image>`/`<Picture>` need `widths` + `sizes`** describing how wide the image is
    *drawn*. Only the LCP image gets `loading="eager" fetchpriority="high"`.
15. **DO NOT run `npm run build`.** The orchestrator runs the single build in Phase 5.

## 8. Menu order (active navbar — orchestrator owns this file)

```
หน้าแรก · โปรโมชั่น · สมัครสมาชิก · เข้าสู่ระบบ · <everything else>
```

Every menu item gets exactly one icon, rendered as a sibling
`<span aria-hidden="true">`, never inside the label text.

## 9. Page inventory & routing decisions (already made)

| route | state | owner |
|---|---|---|
| `/` | active | Agent A |
| `/about-us` | **stays ON** — full rebrand (note: a stale JEDI66 copy sits in `src/pages-disabled/`; leave it parked) | Agent B |
| `/ทดลองเล่น` | active | Agent B |
| `/promotion` | active — **image page, ~4 lines of prose, zero `<h2>`** | Agent B |
| `/contact-us` | active — **button page, zero `<h2>`** | Agent B |
| `/ทางเข้า` | active — **button page, zero `<h2>`** | Agent C |
| `/login`, `/register` | active **button pages** (cta toggle ON) — zero `<h2>`, never edit `targetUrl` | Agent C |
| `/terms`, `/privacy` | permanent, brand-neutral via `BRAND_NAME` — render through `ContentBox.astro` | Agent C |
| `/404` | permanent | Agent C |
| `/ตรวจหวย`, `/แนวทาง` | **stay ON** — MGM9 sells หวย as a headline category (title, H1 game list, FAQ, and the hero artwork all feature it). Keep the `Huay` red/gold theme + `AnnouncementHuay`; change brand name only. | Agent C |

Because `/login` and `/register` are ON, `/ทางเข้า` has **no navbar menu entry** by
design. The page stays routed and indexed.
