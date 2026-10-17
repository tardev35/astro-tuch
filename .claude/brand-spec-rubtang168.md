# BRAND SPEC — รับตัง168 (drop 2026-10-18)

Single source of truth for this rebrand. **Every subagent reads this file and
re-derives nothing.** Do not re-extract the docx. Do not re-choose variants.

---

## §1 Identity

| field | value |
|---|---|
| Brand name (visible) | `รับตัง168` — Thai script + Arabic digits, one word, no space, no hyphen |
| Real domain | `https://rubtang168.services` (operator gave it explicitly) |
| `astro.config.mjs` `site:` | `https://rubtang168.services` |
| `wrangler.toml` `name` | `rubtang168` (from the **domain**, not the brand name) |
| `BRAND_NAME` | `รับตัง168` |
| `BRAND_FONT` | `google-sans` (rotated off `kanit`) |
| `BRAND_TEXT` | `#f5ece0` |
| Brand type | **เว็บเกมสล็อตล้วน** — slot games only, positioned as the operator's service/contact channel. NOT a casino, NOT a sportsbook, NOT a lottery site. |

⚠️ Brand name is **Thai**, domain is **ASCII**. They cannot be compared
letter-for-letter and neither may be inferred from the other. Both came from the
operator directly.

`iconVersion` resolves to `168` (the `[^a-z0-9]` filter eats the Thai letters).
Non-empty, so no hash fallback. Different from last round's `168`… — note: last
round (สมหวัง168) ALSO resolved to `168`, so the icon query string does **not**
change between these two brands. The icon bytes do. Nothing to fix — do not
hand-edit `iconVersion`.

**Never type the brand name into page markup.** Interpolate `${BRAND_NAME}`.
**Never type the domain anywhere.** `pageGraph()` / `site:` derive every URL.

---

## §2 Palette — THAI GOLD LEAD, DRAGON RED PARTNER, ON RED-BLACK

Read off this drop's artwork (`logo.webp`, `banner1.png`, `slide1.png`) and the
measured values in `src/assets/palette.json`:

- **logo.webp** — the word `รับตัง` in 3-D chrome lettering with a cool
  silver-blue face and red edges, then `168` in bold vivid-red 3-D numerals.
  Behind it: a thick field of **Chinese gold coins** (the square-holed kind), a
  flowing red satin ribbon, gold rims. `palette.json` `vivid` for the logo is all
  red: `#d30304` `#bc0302` `#ac0303` `#fb061b` `#b40304`.
- **banner1.png / slide1.png** — black Thai-Chinese casino scene, a young man in
  black beside a woman with long dark hair, gold coin showers, gold/black/red
  chip stacks, ace cards, red satin, gold ornamental frames and a gold crown.
- **bg.json** — `{"mode":"color","color":"#1a0505"}` = **red-black**.

**This round GOLD leads and red partners.** That is the honest reading of the
artwork (the coin field is the largest saturated area by far) and it is what
separates this round from the previous one, which was red-dominant with gold trim.

| role | hex | allowed use |
|---|---|---|
| gold brand (primary accent) | `#f0b429` | borders, rules, fills, icons, **and text** (≈8.5:1 on raised) |
| gold bright (highlight) | `#ffdc8c` | headings, `<strong>` highlight, bright gradient stop (≈12:1) |
| gold deep | `#9a6c0c` | **lines / frames / aura / gradient ends only — never text** |
| red brand | `#d30304` | **lines / frames / aura / solid fills only — never text at any size** (2.1:1) |
| red bright | `#ff6b6e` | links, hover, large headings (≈5.4:1) |
| red deep | `#a00203` | **fills / borders only — never text** |
| red darkest | `#4a0202` | **fills / borders only — never text** |
| chrome-ice | `#cfd9e6` | secondary text, muted labels (≈10.9:1) — this round's third note, read off the silver-blue face of `รับตัง` |
| body copy (`BRAND_TEXT`) | `#f5ece0` | all prose (≈13:1 on raised, ≈13.6:1 on the page) |
| ink on a solid gold or solid red fill | `#1a0505` | the ONLY ink allowed there (9.7:1 on `#f0b429`, 13:1 on `#ffdc8c`, 6.1:1 on `#ff6b6e`) |

Depth ramp:

| layer | hex |
|---|---|
| raised (card surface) | `#2b100f` |
| mid | `#200a09` |
| sunken | `#140505` |
| page background (`bg.json`) | `#1a0505` |

Glow / aura `rgba()` — **only these four**:
`rgba(240,180,41,α)` gold · `rgba(255,220,140,α)` bright gold ·
`rgba(211,3,4,α)` red · `rgba(255,107,110,α)` light red.

**One highlight colour for `<strong>` in body prose: `#ffdc8c`.** Reserved for
that job alone. Nothing else in prose takes a colour class.

### ⚠️ The trap this round is RED — again, and worse

The previous **three** brands were all red. "There is already red in this file"
proves nothing. **Compare value by value against the table above**, never by
colour family, never by eye.

Values belonging to OTHER brands that must not survive in any rendered file:

- **สมหวัง168** (last round, the one being replaced) — `#fa0513` `#ffadaf`
  `#ff5a5f` `#e3b23c` `#ffe5a8` `#8a6210` `#b90203` `#8c0204` `#5b0203`
  `#3c0303` `#170504` `#f4ecea` `#ccb9b6` `#2c1413` `#1f0d0c` `#140706` `#290f0f`
- **TKB55** (still inside `NavbarStyle9`, `FooterStyle2`, `Announcement5`) —
  `#fb131b` `#ff8a8f` `#ff4d55` `#e9eef4` `#aeb9c6` `#f2e4e5` `#2a0d0f`
  `#1a0708` `#0d0304` `#c40304` `#8a0206` `#53050a` `#1a0304`
- **TND168** (still inside `AnnouncementPremium`, `LatestWinnersPremium`) —
  `#dfa310` `#ffe4a3` `#ffc93d` `#8a6410`
- **GT66B** — `#fb141b` `#ff5f63` `#ffa0a2` `#db040b` `#ec151c` `#8a0609`
  `#3b0405` `#fdfcfd` `#b4bcc2` `#eceaea` `#190505` `#1c0c0b` `#130c0c` `#0b0303`
- **TSDET911 blues** — `#0360f3` `#0292fb` `#6ec8ff` `#cfdcec` `#9db4d4`
  `#dde8f7` `#102a5e` `#0a1c42` `#040e26` `#00081f` `#032dad` `#04186e` `#021026`
- Older inventory reds/golds that look close but are not ours — `#e8232a`
  `#d4200d` `#ff3b14` `#f2b705` `#ffd666` `#ffd87a` `#fad354` `#e5a81b`
  `#e2b33f` `#e5c04f` `#f41571` `#fce343`

Near-misses to be careful with: ours is `#d30304`, **not** `#d4200d`. Ours is
`#f0b429`, **not** `#e3b23c` / `#dfa310` / `#e5a81b` / `#e2b33f` / `#fad354`.
Ours is `#1a0505`, **not** `#1a0708` / `#1a0304` / `#190505`.

⚠️ **No violet, no pink, no blue, no cyan, no green, no orange** this round. The
silver-blue inside the word `รับตัง` is detail in the picture — it is pulled out
only as the muted `#cfd9e6` secondary-TEXT value, never as a system accent, never
as a gradient stop, never as a border.

Semantic colours that stay untouched everywhere: LINE green `#00B900`, real bank
brand colours in `BankStrip` / `LatestWinners*`, live/success green dots.

---

## §3 Variant rotation (before → after). Chosen here, NOT re-picked downstream.

| family | outgoing (สมหวัง168) | **this round** | owner |
|---|---|---|---|
| Navbar | `NavbarStyle7` | **`NavbarStyle9`** | P1 (orchestrator) |
| Footer | `FooterPremium` | **`FooterStyle2`** | P1 |
| Announcement | `Announcement3` | **`AnnouncementPremium`** | P1 |
| LatestWinners | `LatestWinners3` | **`LatestWinners4`** | Agent A |
| Faq | `Faq4` | **`Faq3`** | Agent A |
| Review cards | `ReviewCardSumo2` | **`ReviewCardSumo`** | Agent A |
| Brand font | `kanit` | **`google-sans`** | P1 |

ContentBox shape-mix on `index.astro` — **every slot changes**:

| § | heading | outgoing | **this round** |
|---|---|---|---|
| 1 | H1 | `ContentBoxPremium` | **`ContentBoxFloatingBadge`** |
| 2 | H2 | `ContentBoxTwoNeumorphism` | **`ContentBoxTwoCyberCut`** |
| 3 | H2 + slide1 | `ContentBoxSevenThreeCyberCut` | **`ContentBoxSevenThreePremium`** |
| 4 | H3 | `ContentBox` (plain) | **`ContentBox` (plain)** — sanctioned carry-over, see below |
| 5 | H3 | `ContentBoxNeumorphism` | **`ContentBoxCyberCut`** |
| 6 | H2 (3 steps) | `ContentBox3ThreePremium` | **`ContentBox3ThreeNeumorphism`** |
| 7 | H2 | `ContentBoxTwoFloatingBadge` | **`ContentBoxTwoPremium`** |

**Plain `ContentBox` is the one sanctioned carry-over.** It is the always-live box
that `terms`, `privacy`, `404`, `/promotion` and every button page render through,
so it cannot follow a rotation. It lives in the P1 shared set.

No two adjacent sections share a suffix. The only `Neumorphism` file used
(`ContentBox3ThreeNeumorphism`) was NOT used last round.

**Everything not listed stays on disk untouched as inventory for the next brand.
Delete nothing.** Old brands' hues inside unused siblings are expected drift.

---

## §4 Asset roles for THIS drop

Files written by this drop (mtime 2026-10-18): `logo.webp`, `banner1.png`,
`banner1-mobile.png`, `slide1.png`, `og.png`, `bg.json`, `palette.json`,
`content.txt`, `content.docx`.

| file | role |
|---|---|
| `logo.webp` | navbar + footer logo (via each component's own pinned glob) |
| `banner1.png` | **hero**, owned by `MainLayout`'s pinned glob. Never referenced from a page. |
| `banner1-mobile.png` | phone crop of the hero, same `<picture>`. Owned by `MainLayout`. Never an article image. |
| `og.png` | `og:image`, owned by `MainLayout`. |
| `slide1.png` | **the only usable slide.** 600×600 square, split into two side-by-side panels in ONE image: left panel prints `โปรโมชั่น` in large 3-D gold over a plaque reading `คืนยอดเสีย` with `0.3%` below it; right panel prints `โปรโมชั่น` over a plaque reading `แนะนำเพื่อน` / `โบนัส` with `0.8%` below it. Both panels carry the `รับตัง168` logo above the models' heads. ⚠️ Corrected 2026-10-18: an earlier draft of this row said the `0.3%`/`0.8%` numerals were **vivid red**. They are not — in the actual bitmap they read light on a gold outline. Describe their **position**, not a colour. Open the file before writing any `alt`; do not take this table's word for a colour. |

**STALE — on disk, inventory, must NOT be imported by anything:**
`banner2.png` (10-08, a different brand's wordmark printed on it),
`banner3.png` (09-27), `slide2.png` (10-13, carries the previous brand's
`龍GT66B` wordmark), `slide3.png` / `slide4.png` (09-29).
An eager import **is** an emit even when nothing renders it, so importing one
ships a competitor's artwork into `dist/` and turns `verify-build` red.
**Do not delete them.**

Consequences:
- There is **no article-illustration image** this round (`banner2+` are all stale).
- Exactly **one** `ContentBoxSevenThree*` block on `index.astro`, carrying
  `slide1`. Because the single picture states BOTH offers, it pairs with the
  docx's H2 promotion **overview** (§3 below), never with either H3 under it.
- `/promotion`'s grid is **one centred image**, not a two-column grid.

---

## §5 The docx checklist — every heading, in document order

Source: `src/assets/content.txt`. Final inventory for `index.astro`:
**h1 ×1 · h2 ×5 · h3 ×2.**

| # | level | heading text (brand interpolated) | body lines in content.txt |
|---|---|---|---|
| 1 | H1 | `${BRAND_NAME} ช่องทางรับบริการจาก ผู้ให้บริการเว็บตรง ลิขสิทธิ์แท้` | 4 |
| 2 | H2 | `${BRAND_NAME} ฐานหลักเกมสล็อต เข้าเล่น ฝากถอน ติดต่อ รับโปรโมชั่น ได้ 24 ชั่วโมง` | 6 |
| 3 | H2 | `โปรโมชั่นเดิมพัน ${BRAND_NAME} จากผู้ให้บริการเว็บเกมสล็อตแท้ 100%` | 8 (+ slide1 in the right column) |
| 4 | H3 | `โปรโมชั่น คืนยอดเสีย 0.3% เข้ายูสทุกวัน` | 10 |
| 5 | H3 | `โปรโมชั่น แนะนำเพื่อน โบนัส 0.8% ไม่จำกัด` | 12 |
| 6 | H2 | `สมัครเล่นสล็อต ${BRAND_NAME} ง่ายๆ 3 ขั้นตอน` | 14 intro **+ 18 caution**, steps 15 / 16 / 17 |
| 7 | H2 | `ช่องทางติดต่อแอดมิน ${BRAND_NAME} ทาง LINE OFFICIAL 24ชม.` | 20 |
| 8 | H2 | `คำถามที่พบบ่อยเกี่ยวกับ${BRAND_NAME}` | 22–27 (3 Q/A pairs) |

⚠️ **Line 18 is new this round** and has no counterpart in the previous brief:
`ควรใช้ข้อมูลของตนเองเท่านั้น เก็บรหัสผ่านไว้เป็นความลับ และไม่ส่งรหัสยืนยันหรือข้อมูลสำคัญให้บุคคลอื่น`
It belongs to section 6 and must ship. Fold it into section 6's intro paragraph
as a second sentence (one element per slot — do not add a sibling `<p>`).

The brief has a real **H2 → H3 nesting**, so the page is NOT flattened to H2-only.
The two H3s are the docx's own. No component may add a heading: printed `h3` count
must be exactly 2, `h2` exactly 5, `h1` exactly 1.

**`FeatureHighlights` is banned this round** — its items render as `<h3>` and would
add headings the brief does not have.

The brief hedges repeatedly (`ควรตรวจสอบ…`, `อาจขึ้นอยู่กับ…`, `ไม่ได้เป็นการรับประกัน…`).
**Every hedging clause ships** — none of it is trimmed as downbeat filler. Every
paragraph ships in full: nothing merged, nothing summarised.

### `<strong>` rule
Each `<strong>` wraps a whole **space-delimited** chunk of the brief's own
sentence. Thai has no inter-word space, so a highlight opening or closing
mid-word lets the formatter break the line inside the tag. Copy must read
identically with the tags removed. No two `<strong>` elements adjacent.
Colour: `#ffdc8c`, and nothing else.

---

## §6 Title / description

Home page, from `content.txt` lines 1–2, **verbatim** with the brand interpolated,
**not padded to 150**:

- title: `รับตัง168 ช่องทางรับบริการจาก ฐานหลักเกมสล็อตออนไลน์`
- description: `รับตัง168 ช่องทางรับบริการจาก ผู้ให้บริการเว็บตรง ลิขสิทธิ์แท้ ฐานหลักเกมสล็อตออนไลน์100% เข้าเล่น ฝากถอน ติดต่อ รับโปรโมชั่น จากเจ้าหน้าที่ได้ 24 ชั่วโมง`

The brief has **no `SUB-PAGES` section**, so every sub-page title/description is
inferred. Those must be **150–160 characters** (characters, not bytes — count with
`node -e "console.log([...s].length)"`, never `wc -c`/`wc -m`). One sentence saying
what the page is for; stop there. No `&` in a description string (Astro serialises
it to `&#38;` and the gate counts 5 characters).

---

## §7 Vocabulary — the brief's own words only

**Allowed, because the brief says them:** ช่องทางรับบริการ · ผู้ให้บริการเว็บตรง ·
ลิขสิทธิ์แท้ · ฐานหลักเกมสล็อตออนไลน์ 100% · เกมสล็อตออนไลน์ · เข้าเล่น · ฝากถอน ·
ติดต่อ · รับโปรโมชั่น · เจ้าหน้าที่ · 24 ชั่วโมง · อ่านเงื่อนไขก่อนดำเนินการ ·
ขอคำแนะนำเกี่ยวกับขั้นตอนการใช้งาน · ตรวจสอบรายละเอียดบริการ · ข้อกำหนดของเว็บไซต์ ·
คืนยอดเสีย 0.3% · แนะนำเพื่อน โบนัส 0.8% ไม่จำกัด · ประเภทบัญชี · ยอดเดิมพัน ·
ระยะเวลาของแคมเปญ · อัตราที่ได้รับ · วิธีรับสิทธิ์ · เงื่อนไขการใช้งาน · ยอดโบนัส ·
การถอนเงิน · ช่วงเวลาสรุปยอด · ข้อกำหนดการใช้เครดิต · ไม่ได้เป็นการรับประกันผล ·
ผู้แนะนำ · หลักเกณฑ์การคำนวณโบนัส · ประกาศโปรโมชั่นฉบับล่าสุด · สมัครสมาชิก ·
ช่องทางทางการ · กรอกข้อมูลให้ถูกต้อง · รหัสผ่าน · รหัสยืนยัน · OTP · PIN ·
LINE Official · บัญชีที่แอบอ้าง · หลักฐานรายการ · เวลาตอบกลับ

**Banned — the brief says none of these, and earlier brands did:**
บาคาร่า · ไฮโล · ยิงปลา · บอล / บอลออนไลน์ / แทงบอล / กีฬา · อัตราต่อรอง ·
รายการแข่งขัน · คาสิโน · หวย / ตรวจหวย / แนวทาง / เลขเด็ด · เซิร์ฟเวอร์ต่างประเทศ ·
ยอดเข้าบริษัทโดยตรง · ฝากถอนทุกธนาคาร · ไม่มีขั้นต่ำ · จ่ายจริง · แตกง่าย ·
ไม่บิดยูส · บัญชีม้า · ค่ายระดับเอเชีย · การันตีเว็บแท้

**Never claim** a licence number, a regulator, a legal-entity name, a game studio
name, a bank name in visible text, an RTP figure, a deposit minimum, a member
count, a founding year or a server location. **The only figures on the site are
the brief's three: `0.3%`, `0.8%`, `24 ชั่วโมง`.**

---

## §8 Page inventory and brand type

Slot brand ⇒ the lottery pages stay **OFF**. `ตรวจหวย.astro` and `แนวทาง.astro`
are already parked in `src/pages-disabled/` — leave them there, and make sure no
active navbar / footer links to `/ตรวจหวย` or `/แนวทาง` (a dead `href` fails the
build).

Routes that must exist: `/`, `/promotion`, `/register`, `/login`, `/ทดลองเล่น`,
`/ทางเข้า`, `/about-us`, `/contact-us`, `/terms`, `/privacy`, `/404`.

`src/pages-disabled/about-us.astro` is a parked duplicate. The routed file is
`src/pages/about-us.astro`. Do not edit or delete the parked copy.

`/login` and `/register` are **button pages** (cta toggle ON): `const targetUrl`
in frontmatter, one `<h1>`, one button, `CtaRedirect` on click. **Never edit
`targetUrl`.** `/ทางเข้า` is therefore absent from the navbar by design, but still
routed, still indexed, and still linked from the footer.

Heading inventory per page:

| page | h1 | h2 | h3 |
|---|---|---|---|
| `/` | 1 | 5 | 2 |
| `/promotion` | 1 | **0** | 0 |
| `/contact-us` | 1 | **0** | 0 |
| `/ทางเข้า` | 1 | **0** | 0 |
| `/login`, `/register` | 1 | **0** | 0 |
| `/about-us`, `/ทดลองเล่น` | 1 | its own article's | — |
| `/terms`, `/privacy` | 1 | its own sections' | — |

---

## §9 Hard rules that bite on this template

- **Chrome never takes a heading tag, at any level.** Navbar, footer, ticker,
  winners feed, login/RTP widget, review cards, carousel captions, card labels —
  all `<p>`/`<span>` with the same classes, plus `aria-label` on the `<section>`.
  Only docx-driven content produces `<h1>`/`<h2>`/`<h3>`.
- **No HTML comments (`<!-- … -->`) in anything that renders.** Astro ships them
  verbatim. Strip them while rethemeing. `grep -c '<!--' dist/index.html` → 0.
  Frontmatter `//` comments are fine — they are stripped.
- **No `define:vars`**, no attribute-less `<script>` on an indexable page.
- **No `href="#"`, no `onclick=`.** Back-to-top is `<a href="#top">`.
- **Decorative emoji live in their own `<span aria-hidden="true">`**, a sibling of
  the label, never inside its text. Never put an emoji in a text prop.
- **`alt` describes the picture**, never a counter. Decorative repeats get
  `alt=""` **and** `aria-hidden="true"` on the wrapper.
- **FAQ accordions are `<details>`/`<summary>`.** No scripts, no `max-height`.
- **Behaviour stays in `src/lib/`** — `isActivePath` from `../lib/nav`,
  `winnersFeed.ts`, `liveCounter.ts`. Never hand-roll `isActive`. Never
  server-render an empty feed container.
- **Keep `BRAND_TEXT` as an inline `color:` on `<html>`** in `MainLayout`.
- **JSON-LD only via `pageGraph()`.** No hand-written URLs, no `+` concatenation,
  no `Review` / `AggregateRating` / `sameAs` / `address` / `PostalAddress` /
  `email` nodes.
- **Contact address**: visible text only, derived from `BRAND_NAME`. Rendered in
  exactly two places — `/contact-us` and the **active footer**. Paste the footer
  `<address>` block verbatim from the playbook; **do not theme it**, do not put a
  hex in it, keep `not-italic`, label is a `<p>`/`<span>` not a heading.
- **Body copy is `text-left text-base leading-relaxed`** on the slot-bearing
  element. Headings may centre, but centre them on the heading, not the card. No
  `mx-auto max-w-*` on a page-level `<p>`.
- **One element per slot.** Wrap multiples yourself in a single `<div>`.
- **Single-slot `ContentBox*` variants are already flattened** (card has
  `isolate`, decorative layers have `-z-10`, no content wrapper). Keep them that
  way; do not re-add a wrapper `<div>`.
- **`quality={80}` only** — `tools/avif-quality-service.mjs` rescales AVIF on its
  own. Never hand-tune per format.
- **Do not add a `<style>` block containing only `.font-sans { font-family: var(--font-sans) }`.**
- **Do not edit `src/styles/_sources.generated.css`** — the build rewrites it.
- **Do not run `npm run build`** (subagents). The orchestrator runs it once.

---

## §10 File ownership — nobody crosses these lines

### P1 — shared chrome (orchestrator, done BEFORE fan-out)
`src/lib/brandProfile.ts` · `astro.config.mjs` · `wrangler.toml` ·
`public/site.webmanifest` · `src/layouts/MainLayout.astro` ·
`src/components/NavbarStyle9.astro` · `src/components/FooterStyle2.astro` ·
`src/components/Navfoot.astro` · `src/components/ContentBox.astro` ·
`src/components/AnnouncementPremium.astro` · `src/components/CtaRedirect.astro` ·
`src/components/BankStrip.astro`

### Agent A — landing page
`src/pages/index.astro` · `ContentBoxFloatingBadge` · `ContentBoxTwoCyberCut` ·
`ContentBoxSevenThreePremium` · `ContentBoxCyberCut` ·
`ContentBox3ThreeNeumorphism` · `ContentBoxTwoPremium` · `Faq3` ·
`LatestWinners4` · `LoginRtpSection` · `ContentBoxTwo` · `ReviewCardSumo`

### Agent B — content sub-pages
`src/pages/promotion.astro` · `src/pages/about-us.astro` ·
`src/pages/ทดลองเล่น.astro`

### Agent C — button + permanent pages
`src/pages/contact-us.astro` · `src/pages/ทางเข้า.astro` ·
`src/pages/login.astro` · `src/pages/register.astro` · `src/pages/terms.astro` ·
`src/pages/privacy.astro` · `src/pages/404.astro`
