# BRAND SPEC — เงินทอง168 (drop 2026-10-22, launched 2026-10-22)

**This file is the single source for name / domain / palette / variants.**
Every fan-out agent reads it. **Do NOT re-extract the docx and do NOT
re-pick variants** — both were decided once, here, by the orchestrator.

---

## §1 — Identity, domain, assets

| key | value |
|---|---|
| Brand name (visible) | **เงินทอง168** — Thai + digits, one word, **no space** |
| `BRAND_NAME` | `เงินทอง168` (src/lib/brandProfile.ts) |
| Real URL (operator gave it explicitly) | `https://เงินทอง168.com` |
| `site:` in astro.config.mjs | **`https://xn--168-1kla9gn5n9bwg.com`** — ⚠️ **IDN, punycode REQUIRED** |
| `name` in wrangler.toml | **`xn--168-1kla9gn5n9bwg`** (= `SITE.hostname.split(".")[0]`) |
| `BRAND_FONT` | **`google-sans`** (rotated off `kanit`, which the outgoing brand shipped) |
| Outgoing brand | **พักยก168** on `pakyok168.club` — highest-risk leftovers |
| Brand before that | **สบาย168** on `xn---168-pho7byc9c.com` |

⚠️ The domain is a **Thai IDN**, unlike the outgoing round which was plain
ASCII (`pakyok168.club`). Do not type the Thai form into any file — only the
punycode form goes in `astro.config.mjs` and `wrangler.toml`. Six earlier
brands were IDNs too, so the shape is not new; the *outgoing* one was not.

⚠️ `xn--168-1kla9gn5n9bwg` collides with **no** previous Worker name. The
other punycode names in use are `xn--168-pkl3a1luf6d` (มีโชค168),
`xn--168-ell7cs5e5a5c2b0v` (ถอนชัวร์168), `xn---168-9gora7dtd1dwh`
(สบายเบท168), `xn--168-vml9awg6a2s` (รวยเทพ168), `xn---168-pho7byc9c`
(สบาย168), `xn----0wfj9hyax1e` (หวยคิง), `xn--82cx5btt7d4e` (หวยดีใจ).
`account_id` is **not** touched.

### Assets actually in this drop (mtime 2026-10-22 18:18)

| file | role |
|---|---|
| `logo.webp` | gold scales-of-justice emblem + **เงินทอง** in gloss gold + **168** in chrome silver, black outline |
| `banner1.png` | hero — gold vault room, elderly woman, white hair, dark sunglasses, red lipstick, cream/ivory satin suit, gold jewellery, fanning out US banknotes, reclining on a dark leather sofa, gold bars/ingots stacked everywhere, round brass safe door, black panther statue right, gold chandeliers |
| `banner1-mobile.png` | same hero cropped for phones — **optional, MainLayout's own pinned glob, never referenced from a page** |
| `slide1.png` | **600×480 LANDSCAPE** poster — plaque reads **แนะนำเพื่อน 0.8%** |
| `slide2.png` | **600×480 LANDSCAPE** poster — plaque reads **คืนยอดเสีย 0.3%** |

⚠️ **CORRECTION, 2026-10-22, after this spec was first written.** An earlier draft of
this table said the slides were `540×600 portrait`. **That was wrong** — it was carried
over from the *previous* round's file comments rather than measured from this drop.
Both slides in THIS drop are **600 wide × 480 tall, i.e. LANDSCAPE**, read straight from
the PNG IHDR. Consequences, all of which are load-bearing:

- the width cap is **`max-w-[600px]`**, not `max-w-[540px]`
- the `widths={[…]}` candidate list tops out at **600**, and asking for more upscales
- **no `alt` may call these images portrait**, or square — they are landscape
- every `sizes` string must be recomputed against a 600px intrinsic width

This is exactly the failure the playbook warns about: slide numbering *and geometry*
change every drop, so both have to be re-read from the bitmap rather than inherited.
| `og.png` | 1200×630, MainLayout's own glob |
| `bg.json` | `{"mode":"color","color":"#29210f"}` — **dark olive-brown page background** |

### ⚠️ STALE — on disk, belong to previous brands, must NOT be imported anywhere

| file | mtime | whose |
|---|---|---|
| `banner2.png` | 2026-10-08 | a previous brand's article art |
| `banner3.png` | 2026-09-27 | a previous brand's article art |
| `slide3.png` | 2026-09-29 | **LOTTOPLUS** — opened and read; it is a red/white lottery poster reading `อัตราจ่าย หวย 3 ตัว 1,000` |
| `slide4.png` | 2026-09-29 | same drop as slide3 |

An eager import **is** an emit, rendered or not. Importing any of these ships a
competitor's artwork into `dist/` and turns `verify-build` red.
**`promotion.astro` currently imports slide1–slide4 — it must be cut to
slide1 + slide2 only this round.** No file is deleted; they stay as inventory.

There is therefore **no current-drop article illustration** (`banner2+`) this
round, and a `slide*` is never substituted for one — slides live only inside
`ContentBoxSevenThree*` blocks, and this round's two-block budget is used by
§4 and §5 below.

---

## §2 — Palette (measured, per-value)

⚠️ **Gold has now led two rounds running** — the outgoing brand พักยก168 was
gold + chrome and so is this artwork. That is what the logo is; it cannot be
changed. **So finding "a gold" in a file proves nothing. Compare by VALUE.**
What separates this round is in the table below and in §3's variant rotation.

### This round's values

| role | value | contrast | may hold text? |
|---|---|---|---|
| page background | `#29210f` | — | no (surface) |
| card raised | `#3d3016` | — | no |
| card mid | `#332810` | — | no |
| card inset | `#201906` | — | no (also: ink on gold fills) |
| chrome mid (nav/foot/ticker) | `#2e2512` | — | no |
| chrome sunk | `#1b1407` | — | no |
| chrome raised | `#4d3c15` | — | no |
| **gold core** — accent, border, active, icon | **`#f5ba14`** | 7.3:1 on card · 8.6:1 on chrome | **yes** |
| **gold bright** — headings + `<strong>` **only** | **`#fcee52`** | 10.7:1 on card | **yes** |
| **gold deep** — fill / border / aura | **`#b37c0b`** | 2.0:1 on card | **NO — never a glyph on a dark surface** |
| **body ink** (`BRAND_TEXT`) | **`#ecd5c4`** | 9.9:1 on card · 12.1:1 on page | **yes** |
| muted ink | `#d2b9a4` | 8.1:1 on chrome | yes |
| ink on any gold fill | `#201906` | 9.9:1 under core · 14.5:1 under bright · 4.8:1 under deep | **yes** |

Gold aura / glow in `rgba()`: **`rgba(245,186,20,…)`**.

**Primary CTA** = filled gold gradient `#fcee52 → #f5ba14 → #b37c0b` with ink
`#201906` (14.5 / 9.9 / 4.8 — passes at every stop).
**Never** a gold fill with white text.
**Secondary CTA** = outline, border `#f5ba14`, text `#fcee52`, on `#2e2512`.

### Where the values come from

`#f5ba14` and `#fcee52` are the top two **vivid** entries measured off
`logo.webp` itself (`palette.json`), i.e. the brand lettering, not the
background. `#ecd5c4` is the **highest-share** colour in `slide1.png` — the
woman's ivory satin suit and the champagne tones — which is this brand's
genuine second material.

⚠️ **The second material is WARM CREAM `#ecd5c4`, NOT chrome grey.** The "168"
numerals are chrome in the logo, but chrome-as-a-UI-colour belongs to
พักยก168 (`#e0e0df` `#c0c0bf` `#a1a09e`) and ยูฟ้า168 (`#e8ecf1` `#a8b2bf`
`#78828f` `#5a6472`). Using cream instead is one of the two things that keeps
this brand visually separable from the brand immediately before it. **Do not
introduce a grey silver ramp anywhere.**

### ⚠️ Values that must NOT survive in any file that renders

Written without `#` so a hex sweep does not trip over this list.

- **พักยก168 — the OUTGOING brand, highest priority:**
  `eeae12` `fded41` `9f600d` `e29f0f` `fdf051` `e0e0df` `c0c0bf` `a1a09e`
  `f4ead6` `d6c6a8` `291d0f` `3a2713` `32200f` `1f1308` `2f1e0f` `1f0f04`
  `4e2f11`
  ⚠️ `eeae12` is only **R7/G12/B2** from our `#f5ba14` and `fded41` only
  **R1/G17/B17** from our `#fcee52` — closer than usual. Every sweep must be a
  **per-value grep**, never "does it look gold".
  ⚠️ `291d0f` vs our page `#29210f` differ by **4 in green alone**. The value
  comes from `bg.json`; use ours, do not assume it is unchanged.
- **ขวัญใจ168** — `f7c92b` `ffe6a3` `f2bba5` `c98a74` `b3121b` `5a0a0e`
  `eadfce`. ⚠️ `f7c92b` currently themes **NavbarStyle10**, this round's navbar,
  and is R2/G15/B23 from our gold core.
- **ufalion168** — `d4922c` `fdfc71` `d39c45` `f6e3b4` `a25b24` `8c4312`
  `5a3310` `33200a` `1f1304` `0a0601` `1a1000` `fbf6e3`. ⚠️ `d4922c` + `0a0601`
  currently theme **FooterStyle2**, this round's footer.
- **สบาย168** — `2cc3fc` `6bdcfb` `0a7fbd` `063a57` `04293d` `0a4f74` `9ae0fa`
  `cdf2ff` `ccf7ff` `f2fbff` `dff4fd` `eafaff` `a9e3f9` `fdcb0c` `fefb6b`
  `8a6504` `0f3a4a` `06293c` `2a1f02`
- **ยูฟ้า168** — `fee45d` `e6a416` `b8780d` `7a4e05` `e8ecf1` `a8b2bf` `78828f`
  `5a6472` `15130f` `1e1a13` `0a0908` `eae3d4` `140e02` `0b0d10` `000000`
- **UFA324** — `e5a81b` `ffe08a` `bb8410` `7d5a07` `8792a0` `f0e8d4` `b9c2cc`
  `464f5a`
- **นินจา168** — `32bcfb` `a9e9ff` `fef54b` `6b5c10` `07335f` `0c2a3d` `071a28`
- **GT66B** — `fb141b` `ff5f63` `ffa0a2` `db040b` `8a0609` `3b0405` `190505`
  `fdfcfd` `b4bcc2` `eceaea` `1c0c0b` `0b0303`
- **โปรดี168** — `eb0305` `e40303` `c20305` `9b0a0c` `ff4446` `401107` `b44c06`
  `7a2f03` `f0b46a` `d9803a` `4d1c0a` `2c1004` `fff0e4` `ffd1d1` `1a0802`
- **รวยแท้168** — `c30303` `8f0505` `e81313` `dcb95f` `b8862b` `96681f`
  `ffeee8` `fff1ef` `ffdbdb`
- **สมหวัง168** — `fa0513` `ff5a5f` `ffadaf` `e3b23c` `ffe5a8` `8a6210`
  `b90203` `8c0204` `5b0203`
- **มีทรัพย์168** — `dd1b74` `a4186b` `4a0d35` `2d0720` `f7dcf6` `f0ccf5`
- **ถอนชัวร์168** — `fa63b9` `ffb3de` `ffd9ef` `ffd84d` `6d0b3f` `2a0617`
- **มีโชค168** — `fcd434` `ffeaa0` `f5469f` `ff8dc6` `8c0f52` `7a5508`
- **สาธุ168** — `0b7d28` `0a5f1c` `0f9b35` `0c3a16` `061f0c` `c9cb63` `aeb04a`
- **รวยเทพ168** — `f0bb4e` `ffeccb` `e4021b` `d9701a` `3b1b0e` `260d04` `5c2a06`
- **มีเฮ168** — `fb1b32` `ff8f9c` `5c0410` `fcd45c` `6b4a08` `2b0711`
- **รับตัง168** — `f0b429` `ffdc8c` `d30304` `ff6b6e` `a00203` `9a6c0c` `cfd9e6`
- **ดวงเศรษฐี168** — `d9212a` `8e1a16` `f0c878` `fff8d8` `2a0608` `4e2120`
- **รวยแทร่168** — `039cfa` `0494f5` `c3ebfc` `04366b` `f9a826` `704504`
- **สบายเบท168** — `2f9ff5` `a8dcff` `d6ecff` `0b3f78` `ffc82e` `5c4a16`
- **หวยคิง** — `cd9a2c` `fdeb7c` `ab7314` `f5e7c8` · **หวย365** — `dc0203`
  `f5282a` `ffc93c` `ffeab0` · **CEO66** — `7e22ce` `d946ef` `f5d0fe` `a855f7`
  `020617` and every `purple-*` `violet-*` `fuchsia-*` `indigo-*`

### Colours that are NOT ours and must NOT be swept

- **LINE green `#00B900`** on the LINE button — LINE's own brand colour.
- **The green success state** in the winners feed (`emerald-*`, live dot,
  "สำเร็จ") — semantic, present on every brand.
- **Real bank brand colours baked into `BankStrip.astro`'s PNGs** — that file
  contains no brand colour of ours and **the sweep skips it entirely**.

### Not in this round, at all

No red · no pink/magenta · no violet/fuchsia/indigo · no blue/cyan · no green
except the two semantic sets above · no orange · no rose-gold · no grey-silver
ramp. The woman's skin tone, her ivory suit as *fabric*, the black panther
statue and the red lipstick are **objects in the picture, not brand colours**.

---

## §3 — Variant rotation (DECIDED — do not re-pick)

| family | outgoing (พักยก168) | **this round (เงินทอง168)** |
|---|---|---|
| Navbar | `NavbarStyle4Black` | **`NavbarStyle10`** |
| Footer | `FooterStyle3` | **`FooterStyle2`** |
| Announcement | `AnnouncementPremium` | **`Announcement2`** |
| LatestWinners | `LatestWinners3` | **`LatestWinners2`** |
| Faq | `Faq4` | **`Faq2`** |
| Review cards | `ReviewCardSumo2` | **`ReviewCardSumo`** (base) |
| Brand font | `kanit` | **`google-sans`** |

Shapes, so the rotation is a real change and not a recolour:
- `NavbarStyle4Black` was a full-width bar with skewed `skew-x-[-15deg]` menu
  plates and a right-hand drawer. **`NavbarStyle10` is a detached floating
  capsule** (`sticky top-2`, `rounded-[20px]`, `max-w-7xl`, not touching the
  screen edges).
- `FooterStyle3` was a floating CTA card overhanging the top edge with `pt-64`
  reserved beneath it. **`FooterStyle2` is a flat slab, four equal columns**,
  no floating card, `BankStrip` at the end of the fourth column.

### ContentBox shape-mix

Outgoing mix (**must not be reused**): `Premium` · `3ThreeNeumorphism` ·
`CyberCut` · `SevenThreePremium` · `SevenThreeCyberCut` · `TwoNeumorphism`.
Round before that (สบาย168): `Neumorphism` · `3Three` · `FloatingBadge` ·
`SevenThree` · `SevenThreeFloatingBadge` · `TwoPremium`.

**This round:**

| docx section | component |
|---|---|
| §1 H1 | `ContentBoxFloatingBadge` |
| §2 H2 (3 columns) | `ContentBox3ThreeCyberCut` |
| §3 H2 | `ContentBoxNeumorphism` |
| §4 H3 + slide2 | `ContentBoxSevenThreeNeumorphism` |
| §5 H3 + slide1 | `ContentBoxSevenThree` (base) |
| §6 H2 | `ContentBox` (base — pinned, see below) |
| §6 sub-list | `FeatureHighlights` (pinned, see below) |
| §7 H2 (2 columns) | `ContentBoxTwoCyberCut` |
| §8 FAQ | `Faq2` |

Zero overlap with the outgoing brand's mix. The two repeats are both **pinned
and unavoidable**: `ContentBox.astro` is always-live shared chrome (terms,
privacy, 404, /promotion, /ทางเข้า, the button pages and ten pages in total
render through it), and `FeatureHighlights.astro` is the only component in the
library carrying the "one H2 + N short sub-points" shape, which this brief
genuinely has (ขั้นตอนที่ 1/2/3).

⚠️ `ContentBoxFloatingBadge` carries the `-top-6` absolute badge. Before using
it: grep out `whitespace-nowrap` on the badge, cap it (`w-[92%] max-w-2xl` +
`text-center`), and **redo the vertical-clearance arithmetic with §1's actual
long H1**, which wraps to two or three lines at mobile width. Its `pt-*` must
exceed `(line-height × wrapped lines) + padding + border − 24px`.

**Every other variant on disk stays exactly where it is — unused siblings are
inventory for the next brand, never dead code. Delete nothing.**

---

## §4 — docx heading checklist (`src/assets/content.txt`), in document order

Final target inventory for `/` : **h1 ×1 · h2 ×5 · h3 ×5**.

| # | level | heading | body | carried by |
|---|---|---|---|---|
| 1 | **H1** | `${BRAND_NAME} สล็อตเงินดี อัตราจ่ายสูง ค่ายเกมลิขสิทธิ์แท้100%` | line 4 | `ContentBoxFloatingBadge` |
| 2 | **H2** | `${BRAND_NAME} รวมเกมกว่า 1,000 เกม จากค่ายมาตรฐานสากล` | line 6, split across 3 columns | `ContentBox3ThreeCyberCut` |
| 3 | **H2** | `โปรโมชั่นสมาชิก ${BRAND_NAME} กดรับได้ไม่จำกัด` | line 8 | `ContentBoxNeumorphism` |
| 4 | **H3** | `โปรโมชั่น คืนยอดเสีย 0.3% เข้ายูสได้ทุกวัน` | line 10 left / **slide2** right | `ContentBoxSevenThreeNeumorphism` |
| 5 | **H3** | `โปรโมชั่น แนะนำเพื่อน โบนัส 0.8% ไม่จำกัด` | line 12 left / **slide1** right | `ContentBoxSevenThree` |
| 6 | **H2** | `สมัครเล่นสล็อต ${BRAND_NAME} ง่ายๆ 3 ขั้นตอน` | line 14 | `ContentBox` |
| 6a | **H3** | `ขั้นตอนที่ 1 เข้าสู่หน้าสมัครสมาชิก` | line 16 | `FeatureHighlights` item |
| 6b | **H3** | `ขั้นตอนที่ 2 กรอกข้อมูลและยืนยันบัญชี` | line 18 | `FeatureHighlights` item |
| 6c | **H3** | `ขั้นตอนที่ 3 เข้าสู่ระบบและตรวจสอบรายละเอียดเกม` | line 20 | `FeatureHighlights` item |
| 7 | **H2** | `ช่องทางติดต่อแอดมินเว็บ ${BRAND_NAME} ตลอด 24ชม.` | line 22, split in two halves | `ContentBoxTwoCyberCut` |
| 8 | **H2** | `คำถามที่พบบ่อยเกี่ยวกับ ${BRAND_NAME}` | lines 24–29 (3 Q/A) | `Faq2` + explicit `faqs` prop |

⚠️ **slide2 ↔ §4 and slide1 ↔ §5** — decided by the text printed on each
poster, both opened and read this round. The uploader renumbers the files every
drop, so an inherited pairing would caption each promotion with the other one's
poster.

⚠️ Both slides are **600×480 LANDSCAPE** (see the correction in §1) — cap at
`max-w-[600px]`, top the `widths` list out at 600, and never describe either as
portrait or square in an `alt`.

**Every brief paragraph ships in full** — nothing merged, nothing summarised,
and every hedging clause kept. This brief advertises and hedges in the same
breath (`อัตราจ่ายสูง` / `ลิขสิทธิ์แท้100%` in its own headings, answered by
`ควรตรวจสอบจากข้อมูลผู้พัฒนาและหลักฐานการอนุญาตที่เชื่อถือได้` and
`ค่า RTP เป็นค่าทางสถิติระยะยาว ไม่ใช่การรับประกันผลตอบแทนของการเล่นแต่ละครั้ง`
in its own paragraphs). Both halves are brief content; ship both.

**Only article content may produce a heading.** Ticker, winners feed, review
ledger, Navfoot, card labels, carousel captions — all render their label as
`<p>`/`<span>` with an `aria-label` on the section, never a heading tag.

---

## §5 — Vocabulary: this brief's own words only

**Axis: an ONLINE SLOT SITE.** The brief calls itself
`สล็อตเงินดี อัตราจ่ายสูง ค่ายเกมลิขสิทธิ์แท้100%`.

Allowed (all traced to `content.txt`): สล็อต · สล็อตออนไลน์ · เกมสล็อต ·
เงินดี · อัตราจ่ายสูง · อัตราจ่าย · ค่ายเกม · ค่ายมาตรฐานสากล · ค่ายผู้พัฒนา ·
ลิขสิทธิ์แท้100% · สถานะลิขสิทธิ์ · ลิขสิทธิ์เกม · หลักฐานการอนุญาต ·
มากกว่า 1,000 เกม · สล็อตคลาสสิก · เกมแนวผจญภัย · ฟีเจอร์โบนัส ·
สัญลักษณ์พิเศษ · ตารางจ่ายรางวัล · ค่า RTP · ผลรางวัล · กติกา ·
เงื่อนไขการเดิมพัน · โปรโมชั่น · คืนยอดเสีย 0.3% · แนะนำเพื่อน 0.8% ·
กดรับได้ไม่จำกัด · เครดิต · ยอดเสีย · รอบสรุปยอด · ลิงก์แนะนำ ·
เชื่อมโยงบัญชี · รอบจ่ายเครดิต · สมัครสมาชิก · เข้าสู่ระบบ · ยืนยันบัญชี ·
คุณสมบัติผู้สมัคร · อายุที่กฎหมายอนุญาต · เงื่อนไขการใช้บริการ ·
นโยบายความเป็นส่วนตัว · ข้อมูลส่วนบุคคล · รหัสผ่าน · รหัส OTP · แอดมิน ·
เจ้าหน้าที่ · 24ชม. · ช่องทางติดต่อ · เว็บไซต์ทางการ · ประกาศล่าสุด ·
บัญชีแอบอ้าง · ฝากถอน · หมายเลขรายการ · หลักฐาน · ธุรกรรม.

⚠️ **This brief names NO game studio, NO bank, NO wallet, NO operator and NO
regulator** — it says `ค่ายมาตรฐานสากล` and stops there. So no studio name goes
on any page, and nothing claims a legal-entity name, a founding year, a member
count, a concrete RTP figure or a deposit minimum. **The only figures allowed
are the brief's own: 1,000 เกม · 0.3% · 0.8% · 24ชม. · 3 ขั้นตอน · 100%.**

⚠️ Words belonging to OTHER brands — **must not appear anywhere**:
- **พักยก168 (outgoing, highest risk)** — `เจ้าดัง` · `ไม่ผ่านม้า` ·
  `บัญชีม้า` · `ค่ายแท้` · `เดิมพันค่ายแท้` · `ถูกลิขสิทธิ์100%` ·
  `ทดลองเล่นฟรี` · `โหมดทดลองเล่น` · `เว็บสล็อตเจ้าดัง`
  ⚠️ **None of these are in this brief.** `ทดลองเล่น` survives only as the
  **route name** `/ทดลองเล่น`, which is a page that exists; it is not a claim
  this brand's copy may make about its games.
- **สบาย168** — `เบทต่ำ` · `สบายเป๋า` · `ทุนน้อย` · `เล่นง่าย` ·
  `ยอดเข้าบริษัทโดยตรง` · `ปรับระดับการเดิมพัน` · `ยอดเดิมพันขั้นต่ำ` · `งบประมาณ`
- **ยูฟ้า168** — `ฐานหลักเว็บพนันออนไลน์` · `แทงบอล` · `ฟุตบอล` · `ราคาต่อรอง` ·
  `ค่าน้ำ` · `บาคาร่า` · `เกมไพ่` · `เว็บตรง100%` · `ไม่มีขั้นต่ำ`
- **โปรดี168** — `สล็อตแท้โปรเด็ด` · `ค่ายตรงมาแรง` · `อัปเดตก่อนสิ้นปี` ·
  `ปี 2026`
- **มีทรัพย์168** — `ระบบดูแลการเงิน` · `ฝากถอนทุกช่องทาง` · `ปลอดภัยไม่ผ่านม้า`
- **ถอนชัวร์168** — `ถอนง่าย` · `ไม่มีรีวิวเสีย`
- **ดวงเศรษฐี168** — `เศรษฐีพนันมือ1` · `ผู้สอน` · `บทเรียน` · `หลักสูตร` ·
  `สูตร` · `เทคนิค`
- **มีโชค168** — `PG SOFT` · `JOKER` · `JILI` · `นำเข้าตรงจากสิงคโปร์`
- **รวยแท้168** — `บริษัทแม่` · `เว็บแม่`
- **Lottery brands** — `หวย` · `ตรวจหวย` · `แนวทาง` · `สลาก` · `เลขเด็ด` ·
  `2 ตัว 100` · `3 ตัว 1,000` · `แทงหวย` · `หวยรัฐบาลไทย` · `หวยฮานอย` ·
  `หวยลาว` · `ลาวพัฒนา` · `หวยหุ้นต่างประเทศ`
- Also absent from this brief and not to be added: `คาสิโน` · `ยิงปลา` ·
  `ไฮโล` · `เว็บตรง`
- Leftovers in navbar/footer inventory `alt=` and logo fallbacks: `CEO66` ·
  `JEDI66` · `SUMOHENG` · `BRAVO168` · `LAPDEE88` · `LOTTOPLUS`

⚠️ **This is NOT a lottery brand.** `ตรวจหวย.astro` and `แนวทาง.astro` are
already parked in `src/pages-disabled/` and **stay there**. No navbar or footer
may link `/ตรวจหวย` or `/แนวทาง` — `verify-build` goes red on an `href` to a
route that does not exist, and chrome renders on every page.

---

## §6 — Page ownership for the parallel fan-out

### P1 — shared chrome, done by the ORCHESTRATOR before fan-out. Nobody else touches these.

`src/lib/brandProfile.ts` · `astro.config.mjs` · `wrangler.toml` ·
`src/layouts/MainLayout.astro` · `src/components/NavbarStyle10.astro` ·
`src/components/FooterStyle2.astro` · `src/components/Navfoot.astro` ·
`src/components/ContentBox.astro` · `src/components/Announcement2.astro` ·
`src/components/CtaRedirect.astro` · `public/site.webmanifest`

`BankStrip.astro` is rendered (FooterStyle2 imports it) but carries **no brand
colour of ours and must never carry one** — the sweep skips it.

### Agent A — Landing

Owns `src/pages/index.astro` and the components **only** index renders:
`ContentBoxFloatingBadge` · `ContentBox3ThreeCyberCut` · `ContentBoxNeumorphism`
· `ContentBoxSevenThreeNeumorphism` · `ContentBoxSevenThree` ·
`FeatureHighlights` · `ContentBoxTwoCyberCut` · `Faq2` · `LatestWinners2` ·
`ReviewCardSumo`.

### Agent B — Sub-pages, set 1

`src/pages/about-us.astro` · `src/pages/promotion.astro` ·
`src/pages/contact-us.astro` · `src/pages/ทางเข้า.astro`

### Agent C — Sub-pages, set 2

`src/pages/ทดลองเล่น.astro` · `src/pages/login.astro` ·
`src/pages/register.astro` · `src/pages/terms.astro` ·
`src/pages/privacy.astro` · `src/pages/404.astro`

Nothing in `src/pages-disabled/` is touched by anyone, including the parked
duplicate `src/pages-disabled/about-us.astro` (a very old JEDI66 copy — Astro
never reads that folder).

**No agent runs `npm run build`.** The single build is the orchestrator's,
in Phase 5.
