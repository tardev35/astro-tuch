# Brand spec — รวยเทพ168 (drop 2026-10-20)

Single source of truth for this rebrand. **Every fan-out agent reads this file and
re-derives nothing.** Do not re-extract the docx, do not re-pick variants, do not
re-read the artwork to choose colours — it was all done once, here, by the
orchestrator.

---

## §1 Identity

| | |
|---|---|
| Brand name (visible) | **รวยเทพ168** — Thai + Arabic numerals, one word, no space, no hyphen |
| Real URL (operator-supplied) | `https://รวยเทพ168.com` |
| `site:` value in `astro.config.mjs` | **`https://xn--168-vml9awg6a2s.com`** — IDN, stored as punycode |
| `wrangler.toml` `name` | **`xn--168-vml9awg6a2s`** (host label only, no TLD) |
| `BRAND_FONT` | **`google-sans`** (rotated off `kanit`) |
| `BRAND_NAME` | `รวยเทพ168` |
| `BRAND_TEXT` | `#fff8ec` |
| Brand type | **เว็บเกมสล็อตเป็นแกน** + ยิงปลา / ไฮโล / หวยออนไลน์ เป็นหมวดเกมที่บรีฟระบุ — **ไม่ใช่เว็บหวย** |

`iconSlug` resolves to `"168"` again (`[^a-z0-9]` eats Thai), same as the last nine
rounds — `?v=` therefore does **not** change. Known limitation; **never hand-edit
`iconVersion`**.

⚠️ The outgoing brand is **มีเฮ168** on `meehay168.cc`. Sweep both strings.
⚠️ `มีโชค168` (`xn--168-pkl3a1luf6d`) is a *third*, unrelated brand that also passed
through this repo. Do not confuse any of the three.

### Why the domain is punycode and the brand name is not
`BRAND_NAME` is what a reader sees on the logo. The host comes from `site:` only.
Both values come from the operator verbatim; neither is derived from the other.
Consequence this round: `BRAND_ADDRESS.email` derives to
`<mailbox>@xn--168-vml9awg6a2s.com`. That is correct and expected on an IDN brand
(มีโชค168 and ถอนชัวร์168 shipped the same way) — **do not hand-write a prettier
email**, `verify-build.mjs` compares it against `site:`.

---

## §2 Palette — **GOLD LEADS, SCARLET IS THE SECOND HUE**, on pure black

Read off the artwork, then measured with sharp (hue-banded, saturation-weighted
peaks across `logo.webp`, `banner1.png`, `slide1.png`, `slide2.png`).

| role | hex | rule |
|---|---|---|
| **primary — ทองจักรพรรดิ** | `#f0bb4e` | headings, borders, icons, key accents |
| **gold highlight — ครีมทอง** | `#ffeccb` | secondary labels, soft highlights |
| **secondary — แดงชาด** | `#e4021b` | **FILL / BORDER / ICON ONLY — never carries text** |
| **copper — ทองแดง** | `#d9701a` | gradient stops, rules, dividers |
| surface raised (card) | `#3b1b0e` | |
| surface mid | `#260d04` | |
| surface sunken | `#0d0501` | |
| page background | `#000000` | from `bg.json` — the only source of this value |
| body copy (`BRAND_TEXT`) | `#fff8ec` | |
| ink on a solid gold **or** cream fill | `#2b1400` | the only ink allowed there |

Glow `rgba()` forms: `rgba(240,187,78,α)` · `rgba(228,2,27,α)` ·
`rgba(255,236,203,α)` · `rgba(217,112,26,α)`.

### Measured contrast (computed, not estimated)

| | card `#3b1b0e` | mid `#260d04` | sunk `#0d0501` | bg `#000000` |
|---|---|---|---|---|
| gold `#f0bb4e` | 8.84 | 10.44 | 11.47 | 11.92 |
| cream `#ffeccb` | 13.43 | 15.86 | 17.43 | 18.11 |
| **scarlet `#e4021b`** | **3.20** | **3.79** | **4.16** | **4.32** |
| copper `#d9701a` | 4.66 | 5.50 | 6.05 | 6.28 |
| text `#fff8ec` | 14.74 | 17.42 | 19.14 | 19.89 |

- ink `#2b1400` on gold `#f0bb4e` = **9.91** ✓
- text `#fff8ec` on a scarlet `#e4021b` fill = **4.60** ✓ (AA)

➡ **Scarlet fails AA on every surface. It is a fill/border/icon colour.** Headings
go gold or cream. A button whose background is scarlet takes `#fff8ec` text.
Copper at 4.66 on the card is borderline — treat it as decoration, not body text.

### The `<strong>` rule
Exactly **one** highlight colour in body prose: **`#f0bb4e`**. Reserved for that job.

### ⚠️ Do NOT prove a colour by its family — compare by value

Gold has led almost every brand through this repo and red has led three. Finding
"a gold" or "a red" in a file proves nothing.

**Golds already used (must not survive in a rendered file):** `fcd45c` (มีเฮ168,
last round) · `f9a826` `704504` (รวยแทร่168) · `fef54b` `6b5c10` (นินจา168) ·
`ffc82e` `5c4a16` (สบายเบท168) · `ffd84d` (ถอนชัวร์168) · `fcd434` `ffeaa0`
(มีโชค168) · `f7c92b` `ffe6a3` `8a5f12` (ขวัญใจ168) · `f0b429` `ffdc8c` `9a6c0c`
(รับตัง168) · `e3b23c` `ffe5a8` `8a6210` (สมหวัง168) · `e2b33f` `dfa310` `f2c230`
`e5a81b` `fad354` `f5c518` `fce343` `f3bb34` `fbe455` `f2b705`.
This round's gold is **`#f0bb4e`** (R240 G187 B78) — note it is **not** `f0b429`
(B41 vs B78) and **not** `fcd45c` (G212 vs G187).

**Reds already used:** `fb1b32` `ff8f9c` `5c0410` (มีเฮ168, last round) · `fa0513`
`ff5a5f` `ffadaf` `b90203` `8c0204` `5b0203` (สมหวัง168) · `d30304` `ff6b6e`
`a00203` `4a0202` (รับตัง168) · `b3121b` `5a0a0e` (ขวัญใจ168).
This round's red is **`#e4021b`** (R228 G2 B27) — measured straight out of
`logo.webp` (`palette.json` ranks it third in `vivid`).

**Deep ladders already used:** `2b0711 1a040a 0c0205` (มีเฮ168) ·
`2b100f 200a09 140505` (รับตัง168) · `2c1413 1f0d0c 140706 290f0f` (สมหวัง168) ·
`140c06 241509 160d06 0b0603` (ขวัญใจ168) · `0b2d52 071e38 030f1d 031320`
(รวยแทร่168). This round's raised tier `#3b1b0e` is clearly separated from all of
them. The sunken tier `#0d0501` is a near-black and sits close to several prior
near-blacks — that is unavoidable and is **not** an identity colour; separation is
enforced where it is visible, at the raised and mid tiers.

**Values that must not survive anywhere that renders** (previous brands' hexes,
written without `#` so a sweep for old colours does not stop on this line):
`fb1b32 ff8f9c 5c0410 fcd45c 6b4a08 2b0711 1a040a 0c0205 fdeaec 1b0308` (มีเฮ168)
· `039cfa 0494f5 c3ebfc 04366b f9a826 704504 e3f2fc 0b2d52 071e38 030f1d 031320`
(รวยแทร่168) · `32bcfb a9e9ff fef54b 07335f 6b5c10 dceefc` (นินจา168) ·
`2f9ff5 a8dcff ffc82e 0b3f78 e8f4ff` (สบายเบท168) · `fa63b9 ffb3de ffd84d`
(ถอนชัวร์168) · `fcd434 f5469f ff8dc6 f6e4ee` (มีโชค168) ·
`f7c92b f2bba5 c98a74 b3121b eadfce` (ขวัญใจ168) ·
`f0b429 d30304 ff6b6e cfd9e6 f5ece0` (รับตัง168) ·
`fa0513 ff5a5f ffadaf e3b23c f4ecea` (สมหวัง168) · `2563eb`.

⚠️ **No blue / azure / cyan, no purple, no green, no lime-yellow, no fuchsia, no
rose-gold, no silver-chrome this round.** Copper-orange **is** allowed and is new —
it is read straight off the gold gradients' shadow tone in all four bitmaps.

---

## §3 Variant rotation — before → after

Outgoing picks read from the shipped code (`git show HEAD:...`), not from a log.

| family | มีเฮ168 (out) | รวยเทพ168 (in) |
|---|---|---|
| Navbar | `NavbarStyle9` | **`NavbarPremium`** |
| Footer | `FooterStyle3` | **`Footer`** (base) |
| Announcement | `Announcement5` | **`AnnouncementPremium`** |
| LatestWinners | `LatestWinners2` | **`LatestWinners4`** |
| Faq | `Faq4` | **`Faq2`** |
| Review cards | `ReviewCardSumo2` | **`ReviewCardSumo`** (base) |
| Brand font | `kanit` | **`google-sans`** |

**ContentBox shape-mix — zero overlap with last round.**

| | out (มีเฮ168) | in (รวยเทพ168) |
|---|---|---|
| | `ContentBoxPremium` | `ContentBoxFloatingBadge` |
| | `ContentBoxCyberCut` | `ContentBoxNeumorphism` |
| | `ContentBoxTwoCyberCut` | `ContentBoxTwoPremium` |
| | `ContentBoxSevenThreeNeumorphism` | `ContentBoxSevenThreePremium` |
| | `ContentBoxSevenThreeCyberCut` | `ContentBoxSevenThree` (base) |
| | `ContentBoxSpecial` | `ContentBox` (base) |
| | `ContentBoxTwo` | `ContentBoxTwoNeumorphism` |

`NavbarPremium` was picked for the gold-luxury / Chinese-fortune read of the
artwork and has not been active in the last twelve rounds. It arrives with three
known defects that **must** be fixed before it is wired in (Phase 2 of the
playbook): it ships plain text links with **no icons**, it declares the menu
**twice** (desktop + mobile drawer), and it may hand-roll `isActive`. Hoist to one
`links` const, give every item one genre-appropriate icon as a **sibling**
`<span aria-hidden="true">`, and use `isActivePath` from `../lib/nav`.

Menu order is fixed by the playbook:
`หน้าแรก · โปรโมชั่น · สมัครสมาชิก · เข้าสู่ระบบ · <everything else>`.

**Everything not listed above stays on disk untouched as inventory for the next
brand.** Never delete an unused variant.

---

## §4 Heading checklist from the brief (`src/assets/content.txt`)

Document order. **Every line below must survive to the rendered page, in this
order, with the full paragraph that follows it in the brief.**

| # | level | heading | body |
|---|---|---|---|
| 1 | **H1** | `${BRAND_NAME}` เกมสล็อตรวยขั้นเทพ สมัคร ฝากถอน รับโปร ในที่เดียว | line 4 |
| 2 | **H2** | `${BRAND_NAME}` เล่นสล็อต ยิงปลา ไฮโล แทงหวย ครบวงจร | line 6 |
| 3 | **H2** | โปรโมชั่น `${BRAND_NAME}` รับได้ไม่จำกัด | line 8 |
| 4 | **H3** | โปรโมชั่น คืนยอดเสีย 0.3% เข้ายูสทุกวัน | line 10 |
| 5 | **H3** | โปรโมชั่น แนะนำเพื่อน โบนัส 0.8% ไม่จำกัด | line 12 |
| 6 | **H2** | สมัครเล่นสล็อต `${BRAND_NAME}` ง่ายๆ 3 ขั้นตอน | line 14 |
| 6a | **H3** | ขั้นตอนที่ 1 เข้าสู่หน้าสมัครสมาชิก | line 16 |
| 6b | **H3** | ขั้นตอนที่ 2 กรอกข้อมูลและยืนยันการลงทะเบียน | line 18 |
| 6c | **H3** | ขั้นตอนที่ 3 เข้าสู่ระบบและศึกษารายละเอียดเกม | line 20 |
| 7 | **H2** | ช่องทางติดต่อแอดมิน `${BRAND_NAME}` ตลอด 24ชม. | line 22 |
| 8 | **H2** | คำถามที่พบบ่อยเกี่ยวกับ `${BRAND_NAME}` | lines 24–29 (3 Q/A pairs) |

**Target inventory for `/` : `h1×1, h2×5, h3×5`.**

6a–6c are the brief's own sub-point labels and go through `FeatureHighlights`,
which is the one component allowed to turn a docx sub-list into `<h3>`s.

Everything else on the page is **chrome and emits no heading at any level**:
ticker, winners feed, review cards, nav, footer. FAQ questions live inside
`<summary>`.

### Title / Description — the brief's own lines, verbatim
- Title (line 1): `รวยเทพ168 เกมสล็อตรวยขั้นเทพ สมัคร ฝากถอน รับโปร ครบในเว็บเดียว`
- Description (line 2): `รวยเทพ168 เกมสล็อตรวยขั้นเทพ สมัครเล่นสล็อต ยิงปลา ไฮโล แทงหวย พร้อมระบบฝากถอน รับโปร ครบในเว็บเดียว`

**Do not pad the home description to 150 characters.** It is the brief's own copy
and `verify-build` deliberately skips the floor on the home page. Descriptions you
*infer* for sub-pages are held to **150–160 characters** (count characters, not
bytes — Thai is 3 bytes/char).

---

## §5 Image roles for this drop

All current-drop files are dated **2026-10-20 11:03**.

| file | role |
|---|---|
| `banner1.png` | **hero** — `MainLayout`'s pinned glob owns it. Never referenced from a page. |
| `banner1-mobile.png` | mobile crop of the hero, same drop ✓ — `MainLayout`'s second pinned glob. |
| `og.png` | `og:image`, `MainLayout` owns it. |
| `logo.webp` | nav / footer logo. |
| **`slide2.png`** | → **§4**, its plaque reads **คืนยอดเสีย 0.3%** |
| **`slide1.png`** | → **§5**, its plaque reads **แนะนำเพื่อน 0.8%** |

⚠️ **Read the plaque, never trust the numbering.** The uploader overwrites both
files every drop and the pairing flips between brands. It was verified this round
by opening both bitmaps.

**Stale — must NOT be imported anywhere:**
- `banner2.png` (10-08) and `banner3.png` (09-27) — previous brands' article art.
- `slide3.png` / `slide4.png` (09-29) — **LOTTOPLUS** posters, verified by opening
  `slide3.png`. A completely different brand.

An eager import **is** an emit whether or not anything renders it, so importing any
of these ships a competitor's picture into `dist/` and turns `verify-build` red.
There is therefore **no current-drop article illustration** this round, and a
`slide*` is never substituted for one — slides are pinned to
`ContentBoxSevenThree*` blocks only.

### Artwork description (for `alt` text — written from this drop's bitmaps)
Deep black scene. The logo is **รวย in gold 3-D lettering, เทพ in pearl-white, 168
in glossy scarlet**, beside a **laughing Chinese god-of-wealth (Caishen) mascot in
a gold-and-red winged cap**, on a gold swoosh ringed by gold sparkles.
The banner adds a **gold crown**, **falling gold coins**, **red-and-white poker
chips**, **playing cards (ace of hearts)**, a **slot cabinet showing 777**, **red
hearts**, **red gift boxes**, and a **silver-blonde woman in a red-and-white outfit
with a heart choker, reaching toward the viewer**. Headline reads
**เกมสล็อตรวยขั้นเทพ** over a plaque reading **สมัคร ฝากถอน รับโปร ครบในเว็บเดียว**.

⚠️ There is **no** white/blush-pink scene, no blue lace, no blue bows, no ninja,
no shuriken, no white cat, no sakura, no maneki-neko, no Chinese square-hole coin,
no Singapore flag, no dragon glyph, no duck, no tiger head, no lottery poster.
Those belong to earlier brands.

---

## §6 Vocabulary — the brief's own words only

This brand is **เกมสล็อตเป็นแกน** and the brief explicitly also names
**ยิงปลา · ไฮโล · หวยออนไลน์ / แทงหวย** as game categories. Those words **are**
allowed this round (unlike the last round, where they were banned) because the
brief uses them.

Allowed, all traceable to `content.txt`: สล็อต, ยิงปลา, ไฮโล, หวยออนไลน์, แทงหวย,
กติกา, อัตราจ่าย, อัตราเดิมพัน, เงื่อนไขการเดิมพัน, ข้อมูลผู้ให้บริการ, โปรโมชั่น,
คืนยอดเสีย 0.3%, แนะนำเพื่อน 0.8%, โบนัส, เครดิต, ยอดเสีย, รอบเวลารับเครดิต,
ลิงก์แนะนำ, เชื่อมโยงบัญชี, สมัครสมาชิก, เข้าสู่ระบบ, ลงทะเบียน, ฝากถอน,
ข้อมูลส่วนบุคคล, รหัสผ่าน, รหัส OTP, เจ้าหน้าที่, แอดมิน, 24ชม., ช่องทางทางการ.

⚠️ **Banned — previous brands' phrases that must not survive:**
- มีเฮ168 (last round): `เกมสล็อตเจนซี`, `ระบบเข้าทางคนรุ่นใหม่`, `ใส่ใจทุกค่ายเกม`,
  `เดิมพันง่าย ไม่มีขั้นต่ำ`, `วอลเลทและธนาคารชั้นนำ`
- รวยแทร่168: `สล็อตรวมเกมกำไรงาม`, `เล่นง่ายทุกค่าย`, `ได้เงินสูงทุกรอบ`, `ทุนน้อยก็เล่นได้`
- นินจา168: `สล็อตโปรแรงโบนัส0.8%ทุกวัน`, `แค่แนะนำง่ายๆ รับได้ไม่อั้น`
- ถอนชัวร์168: `ถอนง่าย`, `ไม่มีรีวิวเสีย`, `หลักแสนยูสต่อวัน`, `การันตีเว็บแท้`
- สบายเบท168: `เว็บสล็อตทางการ`, `ผู้ให้บริการฐานเกมหลัก`, `เว็บแท้อันดับ1`, `เว็บแท้100%`
- มีโชค168: `เว็บสล็อตลิขสิทธิ์แท้`, `นำเข้าตรงจากสิงคโปร์`, `PG SOFT`, `JOKER`, `JILI`

⚠️ **This brief names NO game studio whatsoever.** No studio name appears anywhere
on the site. Nothing claims a licence number, a regulator, a legal-entity name, a
named bank, an RTP figure, a deposit minimum, a member count or a founding year.
No `เว็บตรง`, no `ไม่ผ่านเอเย่นต์`, no `คาสิโน`, no `บาคาร่า`, no sports/บอล/กีฬา.

**The only figures allowed on the site are the brief's own: `0.3%`, `0.8%`,
`24ชม.`, `3 ขั้นตอน`.**

### The brief advertises and hedges in the same breath — ship both halves
Its headings say `รวยขั้นเทพ` and `รับได้ไม่จำกัด` while its own paragraphs answer
that `เกมเหล่านี้มีความเสี่ยงต่อการสูญเสียเงิน`,
`ไม่มีรูปแบบใดรับประกันผลกำไรจากการเดิมพัน` and
`เครดิตคืนยอดเสียไม่ได้หมายความว่าจะได้รับเงินคืนจากทุกการเดิมพัน`.
Advertising words appear **only** inside the headings the brief wrote them into and
are never expanded into new claims. **Every hedging clause ships in full** — it is
brief content, not filler to trim.

---

## §7 Lottery pages + preset pages — the state to hold

`ตรวจหวย.astro` and `แนวทาง.astro` are **parked in `src/pages-disabled/` and stay
there.** The prompt does not contain `เว็บหวย`, and the brand bills itself as
`เกมสล็อต` — หวยออนไลน์ is one of four game categories it lists, not the site's
subject.

➡ **No `/ตรวจหวย` or `/แนวทาง` link may appear in the active navbar or the active
footer.** `Footer.astro` (this round's pick) already has none; verify.

Routes that must exist after the build: `/`, `/about-us`, `/contact-us`,
`/promotion`, `/login`, `/register`, `/terms`, `/privacy`, `/ทดลองเล่น`,
`/ทางเข้า`, `/404`.

- `login.astro` / `register.astro` are **cta button pages** (toggle is ON). One
  `<h1>`, one button, **never an `<h2>`**, and `targetUrl` is
  `https://yoalink.com/l360` — **never edit it**.
- Because the cta toggle is on, `/ทางเข้า` has **no navbar menu entry** by design.
  The page stays routed. Do not re-add the link.
- `src/pages-disabled/about-us.astro` is a parked older copy. The live one is
  `src/pages/about-us.astro`. **Do not touch or delete the parked copy.**
- No `TODO(rebrand)` placeholders exist this round.

---

## §8 Hard rules every agent must hold

1. **Never delete an unused component variant.** It is inventory for the next brand.
2. **Do not run `npm run build`.** The orchestrator runs it once, at the end.
3. **No HTML comments (`<!-- -->`)** in anything that renders — Astro ships them
   verbatim. Strip them from every component you retheme. Frontmatter `//` comments
   are fine (they are stripped).
4. **Chrome may never take a heading tag at any level.** Widget titles are `<p>` or
   `<span>` with the same classes + `aria-label` on the section.
5. **Body copy is `text-left text-base leading-relaxed`** and inherits its colour
   from the card. No `text-sm`/`text-lg` for prose, no `mx-auto max-w-*` on a `<p>`.
6. **One element per slot.** Wrap multiple blocks in one `<div>` yourself.
7. **Never type a domain and never build a URL with `+`.** Use `pageGraph`/`abs`.
8. **Never add `Review`, `AggregateRating`, `sameAs`, `address`/`PostalAddress` or
   `email` to JSON-LD.**
9. **Decorative emoji need `aria-hidden="true"` on their own element** — never
   inside the text of a label, never baked into a text prop.
10. **No `href="#"`, no `onclick=`, no `define:vars`, no re-inlining `src/lib/`
    logic** (`nav.ts`, `liveCounter.ts`, `winnersFeed.ts`), **no Swiper**.
11. **`alt` describes the picture** — for a promo poster, the alt *is* the text
    printed on it. Decorative repeats get `alt=""` + `aria-hidden` on the wrapper.
12. **Image `quality` is one number for both formats** —
    `tools/avif-quality-service.mjs` rescales AVIF ×0.65 on its own. The two slides
    keep **`quality={64}`**: they are busy, grainy artwork and 80 produces AVIF
    larger than its own WebP fallback, which fails the build. The fix is always a
    *lower* number.
13. **Keep the `?v=` on icon links** and the `color:` in `MainLayout`'s `<html>`
    style attribute.
