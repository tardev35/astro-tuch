# BRAND SPEC — รวยแท้168 (drop 2026-10-21, second drop of the day)

Single source of truth for this rebrand. **Do not re-extract the docx and do not
re-choose variants.** Everything below was decided by the orchestrator in P0.

⚠️ **NAME COLLISION WARNING, READ FIRST.** This brand is **รวยแท้168** on
`ruaythear168-vip.net`. A *different, unrelated* client called **รวยแทร่168** also
came through this repo and owns the Worker name `ruaythear168` on
`ruaythear168.net`. The two Thai names differ by one character and the two
domains differ only by the `-vip` suffix. They are **not the same customer**.
Never reuse รวยแทร่168's copy, palette (039cfa / 0494f5 / c3ebfc / 04366b blue +
f9a826), artwork language (blue money bags), or Worker name.

---

## §1 Identity

| key | value |
|---|---|
| Brand name (visible) | **รวยแท้168** — Thai + digits, no space, one word |
| Real URL (operator-given) | **https://ruaythear168-vip.net** — ASCII, no punycode |
| `astro.config.mjs` `site:` | `https://ruaythear168-vip.net` |
| `wrangler.toml` `name` | **`ruaythear168-vip`** (first label of host; ≠ `ruaythear168`) |
| `BRAND_NAME` | `รวยแท้168` |
| `BRAND_FONT` | **`kanit`** (rotated off google-sans, which the outgoing brand used) |
| `BRAND_TEXT` | **`#4a0f0f`** |
| `iconVersion` | derived — Thai name ⇒ `iconSlug` = `"168"`. Known limitation, **do not hand-edit** |
| Contact address / email | derived from `BRAND_NAME` + `site:` — **do not hand-write** |

The outgoing brand was **สาธุ168** (`satu168.cc`), an emerald-green + olive-brass
LIGHT-theme lottery brand. Every green value below the heading "forbidden" must
be gone from every file that renders.

---

## §2 Palette — CRIMSON RED leading, ANTIQUE GOLD second, LIGHT THEME

⚠️ **`src/assets/bg.json` for this drop is `{"mode":"color","color":"#ffdbdb"}`**
— a soft blush-rose page background. This is the **third light-theme brand** in
this repo. bg.json is the only source of the page background. **Do not "fix" it
back to black because older brands were dark.**

Direction of the theme, read it all before touching a file:

```
content  — light cards #ffffff raised / #fff1ef inset + dark maroon ink #4a0f0f
chrome   — navbar / footer / ticker / winners feed / Navfoot / CtaRedirect are
           deep maroon #461212 (raised) and #280b0b (sunken), with light text
           #ffeee8 and antique gold #dcb95f / #b8862b / #96681f
page bg  — #ffdbdb (from bg.json)
```

Chrome stays dark for three reasons: (a) the `<address>` block in the footer is
pasted verbatim with `border-white/15 bg-black/20`, which is designed for a dark
footer; (b) a dark head and foot bracketing a light body is the legible frame;
(c) chrome declares all of its own text colours, so `BRAND_TEXT` never reaches it.

### The values, with measured contrast

| role | hex | where it may be used |
|---|---|---|
| page background | `#ffdbdb` | bg.json / `<style is:global>` `background-color` |
| card raised | `#ffffff` | content card surfaces |
| card inset | `#fff1ef` | inset panels, table stripes, quote blocks |
| **body ink** | `#4a0f0f` | `BRAND_TEXT`. **15.4:1** on white · **12.0:1** on `#ffdbdb` |
| **brand red** | `#c30303` | headings, borders, auras, fills. **6.3:1** on white · **4.9:1** on `#ffdbdb` · carries white text at 6.3:1 |
| **deep red** | `#8f0505` | the `<strong>` highlight colour in body copy. **9.6:1** on white. Reserve it for that one job |
| bright scarlet | `#e81313` | **gradient stop / aura / glow ONLY — never carries text, never sits behind text** |
| gold light | `#dcb95f` | chrome only. **8.2:1** on `#461212` |
| gold mid | `#b8862b` | chrome only. **4.8:1** on `#461212` |
| gold deep | `#96681f` | chrome **borders / shadows only** — 3.8:1 against `#280b0b`, too low for text |
| chrome raised | `#461212` | navbar bar, footer plate, ticker, feed rows |
| chrome sunken | `#280b0b` | secondary button fills, drawer, hamburger, CTA ink |
| chrome text | `#ffeee8` | **13.8:1** on `#461212` |

Allowed `rgba()` this round: `rgba(195,3,3,α)` · `rgba(143,5,5,α)` ·
`rgba(74,15,15,α)` · `rgba(184,134,43,α)` · `rgba(220,185,95,α)`.

### Hard contrast rules

- **Primary CTA = gold gradient `#dcb95f → #c99a3f → #b8862b` with ink `#280b0b`**
  (9.8 / 7.2 / 5.7:1 — passes at every stop). **Never flip it to white text on
  gold**, and never drag the dark end past `#b8862b`.
- A **red fill `#c30303` with white text** is 6.3:1 and is the valid secondary CTA.
- **Gold is a CHROME-ONLY colour.** On a white card `#dcb95f` is 1.9:1, `#b8862b`
  3.5:1 — none of the three may carry text on a light surface, and none of them
  may appear in any file that renders on a light card.
- **`#e81313` may never carry text and may never sit behind text.**
- `#ffdbdb` and `#fff1ef` never carry text on white; both sit happily on `#461212`.

### ⚠️ The trap this round: RED, and it is a bad one

**Red has led more brands through this repo than any other hue.** Finding "a
red" in a file proves nothing — compare by VALUE, one at a time, against the
table below. And be honest about the limit: the saturated-red field in this repo
is genuinely crowded, so this round's `#c30303` sits **16 units** from
รับตัง168's `d30304` and **10 units** from สมหวัง168's `b90203`. That is closer
than this repo normally tolerates. It is accepted deliberately, because
`#c30303` is `logo.webp`'s own measured `vivid` and the artwork is unambiguously
crimson. **The separation this round comes from the blush-rose page (`#ffdbdb`,
never used before), the antique gold value, and the full variant rotation — not
from the red.** Do not "improve" the red into some other hue to chase distance;
it would contradict the logo.

**Values that must not survive anywhere that renders** (written without `#` on
purpose, so a sweep for old hexes does not trip on this document):

- **สาธุ168 — the OUTGOING brand, highest priority:** 0b7d28 0a5f1c 0f9b35 0c3a16
  061f0c c9cb63 aeb04a 9ba03c d8ffc7 e9fbdd, plus rgba(11,125,40,α)
  rgba(10,95,28,α) rgba(12,58,22,α) rgba(174,176,74,α)
- หวยคิง (original owner of the `*Huay` files): cd9a2c fdeb7c ab7314 f5e7c8
  fcd4c3 fce2d4 0c0b0a 120a02 1c140b
- นินจา168 (original owner of **FooterCyber**): 32bcfb a9e9ff 07335f fef54b
  6b5c10 0c2a3d 071a28 030e16 041019 dceefc
- มีโชค168 (original owner of **NavbarStyle8**): fcd434 ffeaa0 f5469f ff8dc6
  8c0f52 7a5508 1a0612 f6e4ee 24101c 160a12 0b0509 d8b9c9 c89a08 e8bc1c
- หวย365: 140203 dc0203 f5282a ffc93c ffeab0 8c0402 3a0a0c c08a07 f6e7e0 1a0303
- ดวงเศรษฐี168: d9212a 8e1a16 f0c878 fff8d8 2a0608 4e2120 300605 150303
- ufalion168: d4922c fdfc71 a25b24 8c4312 d39c45 f6e3b4 33200a 1f1304 0a0601 5a3310 1a1000
- รวยเทพ168: f0bb4e ffeccb e4021b d9701a 3b1b0e 260d04 0d0501 5c2a06 fff8ec 2b1400
- มีเฮ168: fb1b32 ff8f9c 5c0410 fcd45c 6b4a08 2b0711 1a040a 0c0205 fdeaec ffe3e6 1b0308
- **รวยแทร่168 (the near-namesake — read the warning at the top):** 039cfa 0494f5
  c3ebfc 04366b f9a826 704504 e3f2fc 0b2d52 071e38 030f1d 031320 7fa8cc
- สบายเบท168: 2f9ff5 a8dcff d6ecff 0b3f78 ffc82e 5c4a16 e8f4ff 0e2238 081726 040d16 04121f
- ถอนชัวร์168: fa63b9 ffb3de ffd84d 2b0f20 1a0914 0d040a 6d0b3f 6b4708 2a0617 fdeaf5
- ขวัญใจ168: f7c92b ffe6a3 f2bba5 c98a74 b3121b 5a0a0e 8a5f12 eadfce 140c06 241509 160d06 0b0603
- รับตัง168: f0b429 ffdc8c d30304 ff6b6e a00203 4a0202 9a6c0c cfd9e6 f5ece0 2b100f 200a09 140505 1a0505
- สมหวัง168: fa0513 ffadaf ff5a5f e3b23c ffe5a8 8a6210 b90203 8c0204 5b0203 3c0303 170504 f4ecea ccb9b6 2c1413 1f0d0c 140706 290f0f
- มีทรัพย์168: dd1b74 a4186b 4a0d35 2d0720 f7dcf6 f0ccf5
- UFA324: e5a81b ffe08a bb8410 7d5a07 43300a 17130a 312713 0d0b06 140d01 8792a0 f0e8d4 b9c2cc 464f5a

**LINE green `#00B900` is a semantic brand colour of LINE, not ours — leave it
exactly as it is everywhere.**

Near-black and near-white ends of any scale are naturally crowded; `#280b0b`
and `#fff1ef` are surface tints, not identity colours, and small distances there
are unavoidable and acceptable.

---

## §3 Variant rotation — outgoing → incoming

The outgoing brand pulled the **entire `*Huay` family** off the shelf at once.
This round rotates **all of it away** and the ContentBox mix has **zero file
overlap** with the previous round.

| family | สาธุ168 (out) | รวยแท้168 (in) | owner |
|---|---|---|---|
| Navbar | `NavbarHuay` | **`NavbarStyle8`** | orchestrator (P1) |
| Footer | `FooterHuay` | **`FooterCyber`** | orchestrator (P1) |
| Announcement | `AnnouncementHuay` | **`Announcement5`** | orchestrator (P1) |
| LatestWinners | `LatestWinnersHuay` | **`LatestWinnersPremium`** | Agent A |
| Faq | `FaqHuay` | **`Faq3`** | Agent A |
| Review cards | `ReviewCardSumo` | **`ReviewCardSumo2`** | Agent A |
| ContentBox mix | Huay · FloatingBadge · TwoHuay · SevenThreeHuay · SevenThreeCyberCut · 3ThreeHuay · TwoCyberCut | **Premium · CyberCut · Special · 3ThreePremium · TwoPremium · TwoNeumorphism · SevenThreePremium · SevenThreeNeumorphism · 3Three (base)** | Agent A |
| Brand font | `google-sans` | **`kanit`** | orchestrator (P1) |

Neither `NavbarStyle8` nor `FooterCyber` has been live in the last 10 commits.
`NavbarStyle8` last shipped for **มีโชค168** (gold/fuchsia on near-black) and
`FooterCyber` last shipped for **นินจา168** (cyan/lime on near-black); both
arrive carrying those palettes and both get a full value-by-value sweep.

**Every unused sibling stays on disk as inventory. Delete nothing.**

### Lottery sub-section keeps its own set (sanctioned Phase-4.5 exception)

`/ตรวจหวย` and `/แนวทาง` keep `AnnouncementHuay`, `FaqHuay`, `LatestWinnersHuay`,
`ContentBoxNeumorphism` and `ContentBox3ThreeNeumorphism` as their intentional
sub-theme. They are **rethemed to this brand's palette** like everything else —
the exception protects the component *set*, never a stale brand name or a stale
hex.

---

## §4 Lottery / preset page state — CHECKED, nothing to move

This brief is **a lottery brief end to end**, so `/ตรวจหวย` and `/แนวทาง` must
be ON. `ls` confirms both are already in `src/pages/`. The cta toggle is on, so
`/login` and `/register` are real indexed button pages and `/ทางเข้า` stays
routed but out of the navbar menu. `/about-us` and `/ทดลองเล่น` are on and carry
real articles. **No `TODO(rebrand)` placeholder exists anywhere — nothing was
scaffolded this round.** Nothing moves between `src/pages/` and
`src/pages-disabled/` this rebrand.

Navbar menu order (conversion actions straight after โปรโมชั่น):

```
หน้าแรก · โปรโมชั่น · สมัครสมาชิก · เข้าสู่ระบบ · ตรวจหวย · แนวทาง · ทดลองเล่น · เกี่ยวกับเรา · ติดต่อเรา
```

Footer directory adds `/ตรวจหวย` and `/แนวทาง`, and keeps `/ทางเข้า`.

**Affiliate link for this brand is `https://yoalink.com/l360`** — the value
already in `Navfoot.astro`, `login.astro` and `register.astro`. `NavbarStyle8`
arrives with มีโชค168's `https://yoalink.com/2u19` in its `targetUrl`; the
orchestrator fixes that in P1. **Nobody else edits a `targetUrl`.**

---

## §5 Image roles for this drop

Read off the bitmaps this round, not inherited:

| file | mtime | role |
|---|---|---|
| `logo.webp` | 10-21 17:06 | navbar / footer logo (globbed, never referenced from a page) |
| `banner1.png` | 10-21 17:03 | hero — `MainLayout`'s pinned glob only |
| `banner1-mobile.png` | 10-21 17:03 | phone crop of banner1 — `MainLayout`'s second pinned glob. **Never an article image, never the hero directly** |
| `og.png` | 10-21 17:03 | og:image — `MainLayout` owns it |
| **`slide1.png`** | 10-21 17:03 | its own plaque reads **แนะนำเพื่อน 0.8%** → pairs with the referral H3 |
| **`slide2.png`** | 10-21 17:03 | its own plaque reads **คืนยอดเสีย 0.3%** → pairs with the cashback H3 |
| `banner2.png` | **10-08** | STALE, previous brand. Do not import |
| `banner3.png` | **09-27** | STALE, previous brand. Do not import |
| `slide3.png` / `slide4.png` | **09-29** | STALE, another brand's lottery posters. Do not import |

⚠️ The uploader overwrites `slide1`/`slide2` every drop, so the numbering carries
no meaning across brands — **the plaque was re-read this round**, which is the
only reason the pairing is trustworthy.

There is **no current-drop article illustration** (no fresh `banner2+`), and a
slide is never substituted for one. An eager import IS an emit whether or not
anything renders it, so importing a stale file would ship a competitor's artwork
into `dist/` and turn `verify-build` red.

### What the artwork actually shows (write alts from this, do not inherit)

- **logo.webp** — on a transparent background: a glossy 3-D scarlet-and-gold
  swoosh mark, then the Thai word **รวยแท้** in bold 3-D glossy **crimson red**
  with a thick **gold** outline, then the numerals **168** in bold 3-D polished
  **gold**.
- **banner1.png** — a horizontal **sunlit Thai temple / Grand Palace riverside
  exterior**: many gilded chedis and prang spires, pale blue sky with white
  cloud, green foliage, water. **Left**: a young man, short black hair, in a
  **cream-and-brown embroidered Thai outfit with gold necklaces and bracelets,
  holding government lottery tickets**. **Right**: a young woman, long black
  hair with a **white flower** in it, in a **cream-and-gold patterned Thai sabai
  with gold jewellery, holding lottery tickets fanned out**. Centre: a small
  logo, then the brand name huge in 3-D red-and-gold, then a **deep-red rounded
  capsule reading ช่องทางเล่นหวย** flanked by gold laurel, then a **cream/gold
  rounded bar reading รัฐบาลไทย ลาวพัฒนา ฮานอย ระบบจริง ไม่มีโกง** with a gold
  coin icon on the left and a rising bar-chart icon on the right. Lotus leaves
  and a white lotus bottom-right.
- **slide1.png** — portrait **540×600**. Same couple in Thai dress in front of
  gilded temple spires, both **pointing at the viewer**. Centre: **โปรโมชั่น**
  in large 3-D gold Thai lettering on a red ribbon, below it a **black plaque
  with a gold rim reading แนะนำเพื่อน followed by a large 0.8%**. Bottom: white
  lotus flowers, gold coins, loose lottery tickets, and white-and-black lottery
  balls numbered **6** and **8**.
- **slide2.png** — portrait **540×600**. Same couple, each **holding a fan of
  lottery tickets**, temple spires and river behind. Centre: **โปรโมชั่น** in
  3-D gold on a red ribbon, below it a **black plaque with a gold rim reading
  คืนยอดเสีย followed by a large 0.3%**. Bottom: gold coins, lotus flowers,
  lottery tickets, and lottery balls numbered **6** and **3**.

⚠️ **Objects in the pictures are not brand colours.** The sky's pale blue, the
foliage green, the outfits' cream, the lotus white and the lottery balls' black
are scenery — none of them enters the UI.

⚠️ **None of this is in this drop**, and no alt or copy may mention any of it:
the previous brand's emerald "สาธุ" lettering · a cartoon pig in a burglar mask,
barn, windmill or hay bales (มีทรัพย์168) · Caishen, a gold crown, casino chips
or an ace of spades (ดวงเศรษฐี168) · a gold lion, football pitch or Champions
League trophy (ufalion168) · a 777 slot cabinet or red gift boxes (รวยเทพ168) ·
a white lace outfit with a red bow (มีเฮ168) · **blue money bags (รวยแทร่168 —
the near-namesake)** · a cartoon ninja or shuriken (นินจา168) · a white-and-ginger
cartoon cat (สบายเบท168) · pink sakura (ถอนชัวร์168) · a maneki-neko or
Singapore flag (มีโชค168) · the 龍 glyph (GT66B) · a crown on a gold lottery ball
(หวยคิง).

Both slides are **540×600 portrait** — cap each `<Picture>` at
`max-w-[540px]` and **no alt may call either image landscape or square.**

`quality={64}` for both slides (not the house 80): they are busy artwork with
heavy fine grain (gold embroidery, temple mosaic, scattered coins, loose
tickets, sparkle bokeh, 3-D gradient lettering), which is exactly the shape AVIF
handles worst and exactly what makes an AVIF come out larger than its own WebP
fallback — `verify-build.mjs` fails the build on that. **The fix is always a
LOWER quality, never a higher one.** Same number on `/promotion`.

---

## §6 Vocabulary — the brief's own words only

**Axis: an online lottery site that gathers several lottery types in one place.**
`src/assets/content.txt` names exactly four: **หวยรัฐบาลไทย** (referenced to
สลากกินแบ่งรัฐบาล) · **หวยลาวพัฒนา** · **หวยฮานอย** · **หวยหุ้นต่างประเทศ**.

Words the brief actually uses, and the only ones available: หวยออนไลน์ ·
ช่องทางเล่นหวย · ระบบจริงจากเว็บแม่ · บริษัทแม่ · รอบเปิดรับ · รอบปิดรับ ·
รอบประกาศผล · อัตราจ่าย · แหล่งอ้างอิงผลรางวัล · ตารางอัตราจ่าย · เลข 2 ตัว ·
เลข 3 ตัว · สองตัวบน · สองตัวล่าง · สามตัวตรง · สามตัวโต๊ด · เลขอั้น ·
การจำกัดยอดรับ · วงเงินจ่ายสูงสุด · ฐานเงินเดิมพัน · บิลหวย · หมายเลขรายการ ·
ฝากถอน · ธนาคาร · วอลเลท · ยอดขั้นต่ำ · ระยะเวลาดำเนินการ · ชื่อบัญชีปลายทาง ·
บัญชีแอบอ้าง · คืนยอดเสีย 0.3% · แนะนำเพื่อน 0.8% · โบนัส · เครดิต · ยอดเสีย ·
รอบรับเครดิต · ลิงก์แนะนำ · เชื่อมโยงบัญชี · ไม่จำกัดยูส · เจ้าหน้าที่ · แอดมิน ·
24ชม. · เว็บไซต์ทางการ · ประกาศล่าสุด · รหัสผ่าน · รหัส OTP · หลักฐานที่เชื่อถือได้.

⚠️ **Forbidden — none of these appears in this brief even once, and none may be
added back:** สล็อต · ไฮโล · ยิงปลา · บอล/ฟุตบอล · ราคาต่อรอง · บาคาร่า ·
คาสิโนสด · รูเล็ต · เว็บตรง · ไม่ผ่านเอเย่นต์ · ระบบดูแลการเงิน ·
ฝากถอนทุกช่องทาง · ปลอดภัยไม่ผ่านม้า · บัญชีม้า · RTP · ค่ายเกม · มงกุฎ ·
หวยคิง · เศรษฐีพนันมือ1 · สูตร · เทคนิค · ยูฟ่า · แทงบอล · ค่าน้ำ.

**The brief names NO game studio, NO bank, NO wallet provider, NO operator and
NO licence.** Nothing on any page may claim a licence number, a regulator, a
legal-entity name, a founding year, a member count, an RTP figure or a deposit
minimum. **The only figures available this round are the brief's own: 2 ตัว 100 ·
3 ตัว 1,000 · 0.3% · 0.8% · 24ชม.**

⚠️ **This brief advertises and hedges in the same breath.** Its headings say
จ่ายสูงไม่อั้น, ไม่มีโกง and รับได้ไม่จำกัดยูส, while its own paragraphs answer
that ข้อมูลเกี่ยวกับบริษัทแม่…ควรตรวจสอบจากหลักฐานที่เชื่อถือได้, that
ผลรางวัลไม่สามารถคาดการณ์หรือรับประกันได้, and that
เครดิตคืนยอดเสียไม่ได้รับประกันผลตอบแทนจากการเดิมพันครั้งต่อไป. **Both halves
ship exactly as written.** The advertising words appear ONLY inside headings the
brief itself wrote them into and are never expanded into new claims; **every
hedging clause ships in full** — it is brief content, not downbeat filler to trim.

**The brand name is never typed on a page.** Interpolate `${BRAND_NAME}`
everywhere, including inside `alt` text. No domain is written out anywhere, and
no URL is ever built with `+`.

---

## §7 The docx heading checklist — document order, all 11

From `src/assets/content.txt`. **Every one of these must survive, in this order,
with the full paragraph that follows it.** Nothing merged, nothing summarised.

```
 1  H1  รวยแท้168 ช่องทางเล่นหวยออนไลน์ ระบบจริงจากเว็บแม่ ไม่มีประวัติโกง          (line 4)
 2  H2  รวยแท้168 ช่องทางเล่นหวยออนไลน์ รัฐบาลไทย ลาวพัฒนา ฮานอย หุ้นต่างประเทศ   (line 6)
 3  H2  อัตราจ่าย หวย รวยแท้168 จ่ายสูงไม่อั้น                                     (line 8)
 4  H3    อัตราจ่าย หวย 2 ตัว 100                                                 (line 10)
 5  H3    อัตราจ่าย หวย 3 ตัว 1,000                                               (line 12)
 6  H2  โปรโมชั่นแทงหวย รวยแท้168 รับได้ไม่จำกัดยูส                                (line 14)
 7  H3    โปรโมชั่น คืนยอดเสีย 0.3% เข้ายูสทุกวัน                                  (line 16)
 8  H3    โปรโมชั่น แนะนำเพื่อน โบนัส 0.8% ไม่จำกัด                                (line 18)
 9  H2  รวยแท้168 รองรับการฝากถอนวอลเลทและธนาคารชั้นนำ                            (line 20)
10  H2  ช่องทางติดต่อแอดมิน รวยแท้168 ตลอด 24ชม.                                  (line 22)
11  H2  คำถามที่พบบ่อยเกี่ยวกับ รวยแท้168                                          (lines 24-29)
```

**Target inventory for `dist/index.html`: `h1 ×1, h2 ×6, h3 ×4`.** The brief has
a real H2→H3 nesting this round, so the page is NOT flattened to H2-only — but
there are exactly four H3s and all four are the brief's own.

There is **no bullet-style sub-list anywhere in this brief**, so
`FeatureHighlights` is not used and no heading is invented.

### Slot map for `src/pages/index.astro` (Agent A)

| § | tag | component | image |
|---|---|---|---|
| 1 | h1 | `ContentBoxPremium` | — |
| 2 | h2 | `ContentBox3ThreePremium` (paragraph split across 3 columns, no column labels) | — |
| 3 | h2 | `ContentBoxCyberCut` | — |
| 4+5 | h3 ×2 | `ContentBoxTwoPremium` — one H3 per column | — |
| 6 | h2 | `ContentBoxSpecial` | — |
| 7 | h3 | `ContentBoxSevenThreePremium` | **slide2** (คืนยอดเสีย 0.3%) |
| 8 | h3 | `ContentBoxSevenThreeNeumorphism` | **slide1** (แนะนำเพื่อน 0.8%) |
| 9 | h2 | `ContentBoxTwoNeumorphism` | — |
| 10 | h2 | `ContentBox3Three` (base) | — |
| 11 | h2 | `Faq3` + explicit `faqs` prop | — |

Exactly **two** `ContentBoxSevenThree*` blocks — the family's hard per-rebrand
cap, and the only place a `slide*` image is ever allowed.

Non-brief widgets, placed before §1 and after §11 only, never spliced between
two content sections: `Announcement5` and `LatestWinnersPremium` at the top,
`ReviewCardSumo2` and `Navfoot` at the bottom.

**Deliberately absent** (named without `.astro` so a bare-filename "is it live?"
grep stays accurate): `ProviderGrid`, `ProviderGridPremium`, `BankStrip` (as a
page-level widget — `FooterCyber` still imports it), `GameRankingBoard`,
`SmoothCarousel`, `LoginRtpSection`, `FeaturedGames`, `PopularGamesStrip`,
`LottoGrid`, `FeatureHighlights` — each would have to invent a studio, bank,
market or RTP figure the brief never writes.

---

## §8 House rules that bite on this template

Non-negotiable, all enforced by `tools/verify-build.mjs` or by a past bug:

1. **Only article content may produce a heading.** Chrome — navbar, footer,
   ticker, winners feed, review cards, card/column labels — renders its label as
   `<p>`/`<span>` with the same classes, plus `aria-label` on the section. A
   second `<h1>` on any indexable page fails the build.
2. **No HTML comments (`<!-- -->`) in anything that renders.** Astro ships them
   verbatim to production. Strip them from every component you retheme. Put
   notes in the frontmatter instead. `{/* … */}` beside a tag inside a ternary
   branch is a build error.
3. **Body copy is `text-left text-base leading-relaxed <colour>` on the element
   carrying the slot.** No `text-sm`, no `text-lg`, no `mx-auto max-w-*` on a
   paragraph in a page — the card caps its own width already.
4. **Do not re-add a wrapper `<div>` inside a flattened `ContentBox*`.** All 25
   were flattened; decorative layers use `isolate` on the card + `-z-10` on the
   layer.
5. **`*FloatingBadge` variants** — if one is used, check the title badge has a
   width cap (not `whitespace-nowrap`) and do the vertical arithmetic for a
   wrapped two-line title against the card's `pt-*`.
6. **Behaviour lives in `src/lib/`.** Import `isActivePath` from `../lib/nav` —
   never hand-write `isActive`. Never use `define:vars` on an indexable page.
   Never render a feed container empty and fill it from JS. `winnersFeed.ts`
   drives every `LatestWinners*`; keep the `data-winner-*` hooks and keep the
   first rows coming from `brandPick`/`brandFlag`, never `Math.random()`.
7. **JSON-LD only via `pageGraph()`** from `src/lib/schema.ts`. Never type a
   domain, never build a URL with `+`, never add `Review`, `AggregateRating`,
   `sameAs`, `address`/`PostalAddress` or an `email`.
8. **Accessibility, all build errors:** decorative emoji in an
   `aria-hidden="true"` span that is a *sibling* of the label, never inside its
   text · no `href="#"`, no `onclick=` (back-to-top is `href="#top"`) · `alt`
   describes the picture · FAQ accordions are `<details>`/`<summary>` ·
   a widget whose title is a `<p>` needs `aria-label` on its `<section>`.
9. **Meta descriptions: 150–160 characters** for anything you write yourself
   (count characters, not bytes — Thai is 3 bytes/char). The home page is
   exempt from the 150 floor because its description is the brief's own line.
10. **`/contact-us`, `/ทางเข้า` and `/promotion` have NO `<h2>` and no article
    prose.** They are button/image pages. If the page you inherit has headings
    and paragraphs, **delete them** — that is a fix, not a scope overrun.
11. **`terms.astro` / `privacy.astro`** render through **`ContentBox.astro`**
    specifically (never this round's rotated variant) and **nothing inside those
    boxes may name a colour**.
12. Images: `<Picture>`/`<Image>` always get `widths` + `sizes` describing how
    wide the image is **drawn**. One `quality` number for both formats —
    `tools/avif-quality-service.mjs` rescales the AVIF side. Only the LCP image
    gets `loading="eager" fetchpriority="high"`.
13. **`src/styles/_sources.generated.css` is generated** — it will show up in
    `git status` and that diff is correct. Do not edit it.
14. **Never delete an unused component variant.** It is next brand's inventory.

---

## §9 File ownership for the fan-out — zero overlap

### P1, orchestrator only. **Nobody else may edit these:**

```
src/lib/brandProfile.ts
astro.config.mjs
wrangler.toml
public/site.webmanifest
src/layouts/MainLayout.astro
src/components/NavbarStyle8.astro
src/components/FooterCyber.astro
src/components/Navfoot.astro
src/components/ContentBox.astro
src/components/Announcement5.astro
src/components/CtaRedirect.astro
```

### Agent A — Landing

Owns `src/pages/index.astro` and the components only index renders:
`ContentBoxPremium`, `ContentBoxCyberCut`, `ContentBoxSpecial`,
`ContentBox3ThreePremium`, `ContentBox3Three`, `ContentBoxTwoPremium`,
`ContentBoxTwoNeumorphism`, `ContentBoxSevenThreePremium`,
`ContentBoxSevenThreeNeumorphism`, `Faq3`, `LatestWinnersPremium`,
`ReviewCardSumo2`.

### Agent B — lottery sub-section

Owns `src/pages/ตรวจหวย.astro`, `src/pages/แนวทาง.astro` and the components only
those two render: `AnnouncementHuay`, `FaqHuay`, `LatestWinnersHuay`,
`ContentBoxNeumorphism`, `ContentBox3ThreeNeumorphism`.

### Agent C — long-form sub-pages

Owns `src/pages/about-us.astro`, `src/pages/ทดลองเล่น.astro`,
`src/pages/terms.astro`, `src/pages/privacy.astro`, `src/pages/404.astro`.

### Agent D — button + image pages

Owns `src/pages/promotion.astro`, `src/pages/contact-us.astro`,
`src/pages/ทางเข้า.astro`, `src/pages/login.astro`, `src/pages/register.astro`.

**No agent runs `npm run build`.** The single build belongs to the orchestrator
in Phase 5.
