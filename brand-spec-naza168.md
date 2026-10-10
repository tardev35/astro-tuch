# BRAND SPEC — NAZA168 (2026-10-10)

Scratchpad for this rebrand only. Every subagent reads THIS file for the brand
name, palette, variant picks, image roles, docx checklist and vocabulary.
**Do not re-extract the docx. Do not re-choose variants.** They are fixed here.

Previous brand (what we are rotating OFF): **FLASH877** on `flash877-slot.com`.

---

## §1 Identity

| key | value |
|---|---|
| Brand name (visible) | `NAZA168` — ASCII, uppercase, one word, no space, no hyphen, digits `168` at the end |
| Real URL (operator gave it) | `https://naza168-slot.org` — **`.org`, not `.com`**, with a hyphen before `slot` |
| `wrangler.toml` `name` | `naza168-slot` |
| Brand font | `google-sans` (rotated off FLASH877's `kanit`) |
| Brand type | **slot site** — not a lottery site. `/ตรวจหวย` and `/แนวทาง` stay parked in `src/pages-disabled/`. The word `หวย` appears nowhere. |

⚠️ Brand name and host are spelled differently on purpose (`NAZA168` vs
`naza168-slot.org`). Do not "fix" either to match the other.

⚠️ **Never type the brand name on a page.** Interpolate `${BRAND_NAME}` from
`src/lib/brandProfile.ts`. Never type the domain anywhere — `pageGraph()` and
`canonicalFor()` derive every URL from `site:`.

⚠️ A near-miss name already deployed by another brand: `naza-99` (NAZA99).
Ours is `naza168-slot` and does not collide.

---

## §2 Palette — GOLD leads, CHROME SILVER is the second hue, on DARK BROWN

The artwork is a **gold-and-chrome outer-space / astronaut** set ("นาซ่า" = NASA
pun). `bg.json` this drop is `{"mode":"color","color":"#382400"}` — a dark
roasted brown, so the page is brown-black, not red and not pure black.

`logo.webp` `vivid` is `#fdeb64 / #fbc134` (bright yellow-gold → amber gold) over
near-black. The second metal is the **chrome silver** of the `168` numerals, the
astronaut helmet and the space-station corridor. There is **no red hue this
round.**

### The ladder — use these values and no others

| role | hex | notes |
|---|---|---|
| gold bright | `#ffe87a` | gradient bright end, link hover |
| **gold brand** | `#fbc134` | THE accent. Borders, rails, body-copy `<strong>` highlights. 7.0:1 on the raised surface |
| gold mid-deep | `#cf9a18` | **the only dark gold allowed to sit under ink** — `#231500` on it is 7.0:1 |
| gold deep | `#96690a` | rails and non-text gradient ends. **Never under ink** (3.7:1 — fails AA) |
| gold deepest | `#6b4a05` | aura/shadow only, never text, never a fill behind text |
| chrome light | `#eef2f8` | bright chrome text |
| **chrome** | `#cfd6e3` | second hue. Secondary text, metal rims. 7.9:1 on raised |
| chrome muted | `#9aa6bb` | muted labels. 4.7:1 on raised — AA, but only for normal-size text |
| chrome deep | `#3f4859` | borders and aura only, never text |
| surface raised | `#4e3406` | cards that LIFT off the page |
| surface mid | `#432b03` | |
| surface deep | `#382400` | **= the page background itself** (bg.json) |
| surface deepest | `#241700` | cards that SINK into the page |
| **body text** | `#fdf3df` | `BRAND_TEXT`. 10.6:1 raised · 13.5:1 on page bg · 16.0:1 deepest |
| secondary text | `#d9c9a6` | 7.1:1 on raised |
| ink | `#231500` | the ONLY ink allowed on a gold or chrome fill |

`rgba()` glows: `rgba(251,193,52,α)` for gold, `rgba(207,214,227,α)` for chrome.

### Rules that come out of the numbers

- **Light fill ⇒ dark ink, dark fill ⇒ gold or chrome ink.** Never the reverse —
  a light ink on `#fbc134` lands near 1.2:1.
- A gold gradient that carries ink must end no darker than `#cf9a18`.
- `#9aa6bb` is the darkest chrome that may carry text, and only at normal size.
- `#96690a`, `#6b4a05`, `#3f4859` never carry text in any size.

### ⚠️ Previous brands' values — none of these may survive anywhere

Replace **by value, not by colour family.** "There is already gold here" proves
nothing: six of the last seven brands had gold.

- **FLASH877** (last round, red+gold): `#f5c518` `#ffdd73` `#b8860f` `#8a6208`
  `#ff3b14` `#8c0f0a` `#5a0603` `#7d1008` `#6d0804` `#5c0000` `#430000`
  `#2b0000` `#fdf0e2` `#f8d2bb` `#d4a894` `#2a0300` · `rgba(245,197,24,α)`
  `rgba(255,59,20,α)`
- **SUPERSLOTCLUB**: `#e8232a` `#ff5a46` `#7d0f12` `#4a0605` `#f2b705` `#ffd666`
  `#c08a0b` `#a8730a` `#f5cbb0` `#c9a898` `#fbe8d5` `#2b0a00` `#3d1709`
  `#301105` `#241000` `#180800`
- **KINGKONG555**: `#8ce023` `#5cc211` `#1a5c04` `#f2c230` `#ffe066` `#a87a08`
  `#06220a` `#14380a` `#051400` `#e9f7d6` `#0f2e05`
- **WEPLAY168**: `#a435f0` `#5b1a75` `#efe6ff` `#1e0a3c` `#0a0117` `#c9b2e8`
- **PIGPG**: `#d4200d` `#7a0505` `#f5b61d` `#ffd87a`
- **BOOM369** — currently inside `NavbarCyber.astro`: `#42fb5a` `#8dffa0`
  `#04ab3a` `#041109` `#cfe9d7` `#03150a` `#020a06` `#0b231b` `#dadcdc` ·
  `rgba(66,251,90,α)`
- **KOON234** — currently inside `AnnouncementPremium.astro`: `#cc920a`
  `#fde9a6` `#8a6204` `#07170c` `#e8f2e6` `#f7d14e` `#2fbf6a` `#020803` ·
  `rgba(204,146,10,α)` `rgba(247,209,78,α)`
- **KINGKONG555** again — currently inside `FooterStyle3.astro`: the green/gold
  set listed above, plus `#a87a08`.

Near-miss traps: ours is `#fbc134`, NOT `#f2c230` / `#f2b705` / `#f5c518` /
`#edbb23` / `#cc920a`. Ours is `#ffe87a`, NOT `#ffe066` / `#ffd666` / `#ffd87a` /
`#ffeeb4` / `#fde9a6`. Ours is `#96690a`, NOT `#a87a08` / `#a8730a` / `#a87708` /
`#8a6204` / `#8a6208`.

Semantic colours that are NOT the brand hue and must be left alone: LINE green
`#00B900`, live/success greens, real bank logo colours in `BankStrip`.

---

## §3 Variant rotation — what each family moves to

The last six rounds had settled into a two-round A/B alternation
(CyberCut+FloatingBadge+Faq3+Sumo ⇄ Premium+Neumorphism+Faq4+Sumo2), which is the
"two brands look like the same site" failure the rotation rule exists to stop.
This round deliberately **crosses the families** instead of flipping between them.

| family | FLASH877 (out) | NAZA168 (in) | why |
|---|---|---|---|
| Navbar | `NavbarStyle9` | **`NavbarCyber`** | unused for 6+ rounds; clip-path cut-corner 80px bar + slide-down panel vs Style9's gradient bar + circle-expand curtain. Space-tech shape fits the brand |
| Footer | `FooterPremium` | **`FooterStyle3`** | the only genuinely different footer *shape* in inventory — a floating card straddling the top edge (`-top-14`, `pt-64/pt-40`) instead of the `rounded-t-[3rem]`+aura slab that `FooterPremium`/`FooterPremiumSumo`/`FooterHuay`/`Footer` all share |
| Announcement | `Announcement5` | **`AnnouncementPremium`** | unused for 6+ rounds; full-pill marquee with a gradient "ประกาศ" tab |
| LatestWinners | `LatestWinners4` | **`LatestWinnersCyber`** | unused for 6+ rounds; already on `winnersFeed.ts` + `aria-label` |
| Faq | `Faq3` | **`Faq`** (the base file) | the only `Faq*` neither of the two alternating sets has touched; `<details name="faq-plain">`, no `<script>` |
| ReviewCard | `ReviewCardSumo` | **`ReviewCardSumo2`** | only two exist in the family |
| Brand font | `kanit` | **`google-sans`** | breaks the shared `/fonts/kanit-v17-*` path fingerprint |

### ContentBox shape-mix (index.astro)

| # | docx | component | shape |
|---|---|---|---|
| 1 | H1 | `ContentBoxPremium` | premium gradient slab |
| 2 | H2 | `ContentBoxTwoCyberCut` | clipped-corner two-column |
| 3 | H2 | `ContentBox` | plain always-live card — **forced carry-over, see below** |
| 4 | H3 | `ContentBoxSevenThree` | **the PLAIN SevenThree — not used in any of the last 6 rounds** |
| 5 | H3 | `ContentBoxSevenThreeNeumorphism` | soft raised 7:3 |
| 6 | H2 | `ContentBoxTwoNeumorphism` | soft two-column |
| 7 | H2 | `ContentBoxFloatingBadge` | single card under a floating title badge |
| 8 | H2 | `Faq` | accordion |

Zero overlap with FLASH877's set
`{CyberCut, TwoFloatingBadge, SevenThreeCyberCut, SevenThreeFloatingBadge, Two, Special}`.

**`ContentBox.astro` (plain) is the one deliberate reuse** and must stay: it is
the always-live box that `terms`, `privacy`, `404` and every button page render
through, so it cannot follow a rotation. The orchestrator rethemes it in P1.
`ContentBoxTwo.astro` is also reused, but only because `LoginRtpSection` wraps
it — `index.astro` does not import it directly this round.

**`ContentBoxSevenThree*` is capped at 2 per rebrand and both are spent** (#4 and
#5). No third SevenThree anywhere on the site.

**Nothing is deleted.** Every unused `Navbar*`/`Footer*`/`Announcement*`/`Faq*`/
`LatestWinners*`/`ContentBox*`/`*Huay`/`*Cyber`/`Style*` file stays on disk as
inventory for the next brand. FLASH877's gold-and-red still inside them is
expected drift, not a bug.

---

## §4 Image roles for this drop (2026-10-10)

Read off the artwork itself. `palette.json` only measured `logo.webp`,
`banner1.png`, `slide1.png`.

| file | mtime | role |
|---|---|---|
| `logo.webp` | 10-10 | navbar + footer logo |
| `banner1.png` 2244×701 | 10-10 | **hero** — `MainLayout`'s pinned glob owns it. Never referenced from a page |
| `banner1-mobile.png` | 10-10 | phone crop of banner1, `MainLayout`'s second pinned glob. Current drop, keep |
| `og.png` 1200×630 | 10-10 | `MainLayout`'s own glob |
| **`slide1.png`** 600×600 | 10-10 | **docx H3 #4 — คืนยอดเสีย 0.3%** |
| **`slide2.png`** 600×600 | 10-10 | **docx H3 #5 — แนะนำเพื่อน 0.8%** |
| `banner2.png` | **10-08** | previous brand — **do not import** |
| `banner3.png` | **09-27** | older brand — **do not import** |
| `slide3.png` `slide4.png` | **09-29** | a lottery brand's posters — **do not import** |

⚠️ **The slide→promotion pairing is INVERTED from last round.** FLASH877 had
`slide2`=0.3% and `slide1`=0.8%. This drop prints `0.3%` on **slide1** and
`0.8%` on **slide2**. The printed percentage on the artwork decides it. Both
`index.astro` and `promotion.astro` currently carry the old mapping (and
`promotion.astro`'s variables are literally named `promoCashback = slide2`) —
fix the mapping, do not carry it over.

**No current-drop article illustration exists** (`banner2+` are all stale), so
there is no single-column `ContentBox` inline illustration this round. Do not
substitute a slide for one — slides go only in a `ContentBoxSevenThree*`.

An eager import IS an emit whether or not anything renders it, so importing a
stale file ships a competitor's artwork into `dist/` and turns `verify-build` red.

### What the artwork actually shows (write alt text from this, do not copy last round's)

- **`logo.webp`** — a round medallion with a thick gold rim on a black field. In
  the middle, a chrome-and-gold astronaut helmet with a dark reflective gold
  visor. A gold rocket streaks across the upper right of the ring and a smaller
  one sits at the lower right. Across the lower half, `NAZA` in bevelled
  three-dimensional gold and, below it, `168` in chrome silver with a gold edge.
- **`banner1.png`** (wide 2244×701) — an outer-space scene inside a golden
  mechanical station corridor. Ringed planets and a blue Earth across the right,
  a crescent moon upper right. At left a slot cabinet showing three red `777`
  reels, a gold crown set with a red and a blue gem, and heaps of gold coins. A
  silver-haired woman in a black-and-gold outfit at centre-left winks and points
  at the viewer. Beside her a cute cartoon astronaut mascot in a white-and-gold
  suit with `NAZA168` on its chest, grinning, surrounded by floating
  Saturn-ringed gold coins. The `NAZA168` medallion logo sits upper right. Across
  the lower right, a black plate with a gold border reading `NAZA168 เว็บสล็อตนาซ่า`
  in three-dimensional gold, and under it `ส่งตรงจากเมกา ฐานเกมหลัก100%`.
- **`slide1.png`** (square 600×600) — the same space-station interior in gold and
  black. The `NAZA168` medallion upper left, the cartoon astronaut mascot at
  left beside a slot cabinet showing red `777`, a gold crown and gold dice at the
  right, Saturn-ringed chips and coins throughout. The silver-haired woman at
  centre-right winks and reaches a hand toward the viewer. Across the bottom
  `โปรโมชั่น` in large three-dimensional gold type, and under it `คืนยอดเสีย`
  beside an oversized `0.3%`.
- **`slide2.png`** (square 600×600) — the companion square. Same corridor, the
  `NAZA168` medallion upper left, the slot cabinet with red `777` at left,
  Saturn-ringed gold chips and coins floating, the silver-haired woman at centre
  pointing at the viewer. Across the bottom `โปรโมชั่น` in the same gold type,
  with `แนะนำเพื่อน โบนัส` beside an oversized `0.8%`.

There is **no** red velvet drape, chandelier, god of fortune, tiger in
sunglasses, panda, gift box or lightning bolt in this drop — all of that was
FLASH877. There is no jungle, waterfall or gorilla either.

---

## §5 Docx checklist — every heading, in document order

Source: `src/assets/content.txt`. The brief has a real **H2 → H3 nesting**, so
the page is NOT flattened to H2-only. The two H3s are the two promotion
sub-points nested under section 3.

| # | tag | heading | body | carried by |
|---|---|---|---|---|
| 1 | H1 | `NAZA168 เว็บสล็อตนาซ่า ส่งตรงจากเมกา ฐานเกมหลัก100%` | line 4 (1 para) | `ContentBoxPremium` |
| 2 | H2 | `NAZA168 รวมค่ายฮิตระดับประเทศ ระบบเดิมพันใหม่ล่าสุด มาตรฐานสากล` | lines 6, 7 (2 paras) | `ContentBoxTwoCyberCut` — left / right |
| 3 | H2 | `โปรโมชั่น NAZA168 เครือสล็อตฐานเว็บหลัก ครบทุกค่าย` | line 9 (1 para) | `ContentBox` |
| 4 | H3 | `โปรโมชั่น คืนยอดเสีย 0.3% เข้ายูสทุกวัน` | line 11 (1 para) | `ContentBoxSevenThree` + **slide1** |
| 5 | H3 | `โปรโมชั่น แนะนำเพื่อน รับโบนัสแชร์ลิงก์ 0.8% ไม่จำกัด` | line 13 (1 para) | `ContentBoxSevenThreeNeumorphism` + **slide2** |
| 6 | H2 | `เล่นสล็อต NAZA168 ฝากถอนเข้าบัญชีบริษัทโดยตรง ไม่ผ่านม้า` | lines 15, 16 (2 paras) | `ContentBoxTwoNeumorphism` — left / right |
| 7 | H2 | `แอดมิน NAZA168 สล็อตฐานเล่นหลักจากเมกา บริการ 24 ชั่วโมง` | lines 18, 19 (2 paras) | `ContentBoxFloatingBadge` — **one `<div>` wrapping both `<p>`** |
| 8 | H2 | `คำถามที่พบบ่อยเกี่ยวกับ NAZA168` | lines 21–26 (3 Q/A) | `Faq` + `faqs` prop |

**Final homepage inventory: `h1×1 · h2×5 · h3×2`.**

All ten brief paragraphs ship in full. Nothing merged, nothing summarised, and
the brief's own hedging clauses stay in the copy — it hedges five times
(`ควรมีข้อมูลผู้ให้บริการที่สามารถตรวจสอบได้รองรับ` ·
`ควรตรวจสอบรายชื่อเกมที่ร่วมรายการ` · `คำว่าไม่จำกัดควรระบุให้ชัด` ·
`ชื่อบัญชีบริษัทเพียงอย่างเดียวไม่สามารถรับประกันว่าธุรกรรมจะไม่มีความเสี่ยง` ·
`ไม่ควรเปิดเผยรหัสผ่าน PIN หรือ OTP`) and every one is part of its paragraph.

Title / Description — **the brief's own lines 1–2, verbatim, with the brand name
interpolated. Do not pad to 150 characters.**

- Title: `NAZA168 เว็บสล็อตนาซ่า ส่งตรงจากเมกา ฐานเกมหลัก100%`
- Description: `NAZA168 เว็บสล็อตนาซ่า ทางเข้าเล่น ส่งตรงจากเมกา รวมค่ายฮิตระดับประเทศ ระบบเดิมพันใหม่ล่าสุด มาตรฐานสากล ฐานเกมหลัก100%`

The brief has **no `SUB-PAGES (Title & Meta Description)` section**, so every
sub-page's title/description is inferred — **150–160 characters, one sentence,
and stop.** Past runs have doubled that by appending clauses.

---

## §6 Vocabulary

**Allowed — the brief's own words only:** เว็บสล็อตนาซ่า · ส่งตรงจากเมกา ·
ส่งตรงจากอเมริกา · ฐานเกมหลัก 100% · ทางเข้าเล่น · รวมค่ายฮิตระดับประเทศ ·
ระบบเดิมพันใหม่ล่าสุด · มาตรฐานสากล · เครือสล็อตฐานเว็บหลัก · สล็อตคลาสสิก ·
เกมฟรีสปิน · โบนัสตัวคูณ · เกมยอดนิยมจากค่ายที่เปิดให้บริการ · แพลตฟอร์มเดียว ·
ค้นหาเกม · ตรวจสอบเครดิต · ติดตามโปรโมชั่น · จัดหมวดหมู่เกม · ตารางจ่าย ·
ยอดเดิมพัน · คืนยอดเสีย 0.3% · เข้ายูส · รอบตัดยอด · รอบคำนวณ · ยอดที่เข้าเกณฑ์ ·
แนะนำเพื่อน 0.8% · แชร์ลิงก์ · ลิงก์แนะนำ · ฝากถอนเข้าบัญชีบริษัทโดยตรง ·
ไม่ผ่านม้า · บัญชีม้า · บัญชีปลายทาง · นิติบุคคล · หลักฐานธุรกรรม ·
แอดมิน 24 ชั่วโมง · PIN · OTP · ช่องทางติดต่อหลัก · ผู้ให้บริการที่ตรวจสอบได้

**Banned — previous brands' vocabulary, and it must not be find-and-replaced
back in.** Write from the brief, do not edit over the old sentences.

- FLASH877: เว็บตรงฐานสล็อตหลัก · ไม่ผ่านเอเย่นต์ · อัปเดตระบบเข้าเล่นใหม่ 2026 ·
  บัญชีเดียว · การันตีเว็บฐานหลัก
- SUPERSLOTCLUB: คลับคนเล่นสล็อตซุปเปอร์ · กลุ่มลับคนดังวงการสล็อตออนไลน์ · ชุมชน ·
  ดับเบิ้ลโบนัส · เครือเว็บหลัก · สล็อตเว็บหลัก
- KINGKONG555: ฐานเว็บสล็อตหลัก · เดิมพันเริ่มต้น 1 บาท · สล็อตเบทต่ำ · ทุนน้อย ·
  ช่วงเดิมพัน · ผลการหมุนเป็นแบบสุ่ม
- older: เล่นสล็อตออโต้ทุกค่าย · แตกง่าย · จ่ายไว · ไม่มีขั้นต่ำ · ค่ายตรง ·
  ส่งตรงจากเว็บแม่ · ศูนย์รวมเกมสล็อตค่ายแท้ · การันตีเว็บแท้ · รีวิวถอนจริง ·
  ถูกลิขสิทธิ์ · ไฮคลาส · VIP · บาคาร่า · รูเล็ต · ไฮโล · เสือมังกร · แบล็กแจ็ก ·
  โต๊ะสด · คาสิโนไลฟ์ · คาสิโนออนไลน์ · บอล · กีฬา · ตลาดเดิมพัน
- **every หวย word**: หวย · แทงหวย · ส่งโพย · อัตราจ่าย · งวด · ฮานอย · ลาวพัฒนา ·
  ตรวจหวย · แนวทาง

⚠️ `เครือสล็อตฐานเว็บหลัก` (section 3's title) is the **brief's own H2, verbatim
from `content.txt` line 8** — it is not the banned `เครือเว็บหลัก` /
`ฐานเว็บสล็อตหลัก`. It ships as written. The ban covers invented copy, not a
heading the brief supplies.

**Claim nothing the brief does not.** No licence, no regulator, no operator name,
no game studio, no bank name, no RTP figure, no deposit minimum, no member count,
no founding year. The only figures on the whole site are the brief's own:
`0.3%`, `0.8%`, `24 ชั่วโมง`, `100%`.

---

## §7 Standing rules every agent must still obey

These are the playbook rules that get broken most often. Nothing here replaces
`.claude/skills/rebrand-site/SKILL.md` — read it.

1. **Never delete an unused component variant.** It is inventory for the next
   brand, not dead code.
2. **Only article content may produce a heading, at any level.** Chrome —
   navbar, footer, ticker, winners feed, login box, card labels, carousel
   captions, badges — renders its label as `<p>`/`<span>` with the same classes
   and, if it named a region, an `aria-label` on the container. A second `<h1>`
   on any indexable page fails the build.
3. **No HTML comments (`<!-- -->`) in anything that renders.** Astro ships them
   verbatim to `dist/`. Strip them from every component you retheme.
   Frontmatter `//` comments are fine — they are stripped.
4. **One element per slot.** If a section needs two paragraphs in one slot, wrap
   them in a single `<div>` yourself.
5. **Body copy is `text-left text-base leading-relaxed <colour>` on the element
   carrying the slot.** No `text-sm`, no `text-lg`, no `mx-auto`/`max-w-*` on a
   paragraph in a page — the card caps its own width.
6. **Do not re-add a wrapper `<div>` inside a flattened ContentBox variant.**
   They use `isolate` on the card and `-z-10` on the decorative layers.
7. **Do not add a `<style>` block containing only
   `.font-sans { font-family: var(--font-sans) }`** — Tailwind already emits it
   and the block stamps `data-astro-cid-*` on every element.
8. **Never write `isActive` by hand in a navbar** — use `isActivePath` from
   `../lib/nav`. **Never use `define:vars`** on an indexable page. **Never render
   a feed container empty.** **Never start a timer without off-screen /
   hidden-tab / reduced-motion guards.** **Do not reintroduce Swiper.**
9. **Decorative emoji need `aria-hidden="true"` on their own element** — never
   inside the label's text, and never baked into a text prop.
10. **No `href="#"`, no `onclick=`.** Back-to-top is `<a href="#top">`.
11. **`alt` must describe the picture** — read §4. Decorative repeats get
    `alt=""` plus `aria-hidden="true"` on the wrapper.
12. **JSON-LD only via `pageGraph()`** from `src/lib/schema.ts`. Never type a
    domain, never build a URL with `+`, never add `Review`, `AggregateRating`,
    `sameAs`, `address`/`PostalAddress` or `email`.
13. **`quality={80}` stays** — `tools/avif-quality-service.mjs` rescales AVIF on
    its own. Do not hand-tune per format.
14. **Only the LCP image gets `loading="eager" fetchpriority="high"`** — that is
    `MainLayout`'s hero and nothing else. Everything else is
    `loading="lazy" fetchpriority="low" decoding="async"`.
15. **`sizes` describes how wide the image is DRAWN**, computed from the
    component that owns the column — not how big you want the file.
16. **`<strong>` must wrap a whole space-delimited chunk** of a Thai sentence.
    Thai has no inter-word space, so a highlight starting mid-word lets the
    formatter insert a line break that splits the word. The copy must read
    identically with the tags removed.
17. **DO NOT RUN `npm run build`.** The orchestrator runs it once, at the end.
18. **Do not `git commit`, `git push` or deploy.** This run stops at build +
    verify.

---

## §8 File ownership — zero overlap

### P1 shared chrome — the ORCHESTRATOR owns these. No subagent may touch them.

```
src/lib/brandProfile.ts
astro.config.mjs
wrangler.toml
public/site.webmanifest
src/layouts/MainLayout.astro
src/components/NavbarCyber.astro
src/components/FooterStyle3.astro
src/components/Navfoot.astro
src/components/ContentBox.astro
src/components/AnnouncementPremium.astro
```

`src/components/BankStrip.astro` is brand-neutral (real bank logos) — nobody
edits it.

### Agent A — Landing

```
src/pages/index.astro
src/components/ContentBoxPremium.astro
src/components/ContentBoxTwoCyberCut.astro
src/components/ContentBoxSevenThree.astro
src/components/ContentBoxSevenThreeNeumorphism.astro
src/components/ContentBoxTwoNeumorphism.astro
src/components/ContentBoxFloatingBadge.astro
src/components/Faq.astro
src/components/LatestWinnersCyber.astro
src/components/ReviewCardSumo2.astro
src/components/LoginRtpSection.astro
src/components/ContentBoxTwo.astro
```

### Agent B — Content sub-pages

```
src/pages/promotion.astro
src/pages/ทดลองเล่น.astro
src/pages/about-us.astro
```

### Agent C — Button and legal pages

```
src/pages/contact-us.astro
src/pages/ทางเข้า.astro
src/pages/login.astro
src/pages/register.astro
src/components/CtaRedirect.astro
src/pages/terms.astro
src/pages/privacy.astro
src/pages/404.astro
```

Every sub-page's `<Announcement />` import must be repointed to
`../components/AnnouncementPremium.astro` and called **bare** — the
orchestrator sets that variant's default `message` to this brand's copy in P1, so
a bare call and `index.astro` say the same thing. Do not pass a `message` prop.
