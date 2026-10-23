// Per-brand HTML shape, derived from the brand's own domain.
//
// This repo is one template relaunched for unrelated brands, and every launch
// used to ship a byte-identical <head>: diffing two brands' built HTML came down
// to a single line (apple-mobile-web-app-title). That makes every site in the
// portfolio trivially linkable to all the others by anyone reading the source.
//
// Hand-varying the markup per brand was never going to hold — nobody would keep
// it up, and the next rebrand agent would "helpfully" tidy the head back into a
// canonical order. So the arrangement is derived from Astro.site instead: point
// the template at a new domain and it renders a differently arranged — but
// equally valid — head, with no one having to remember anything.
//
// ── INVARIANT: deterministic ────────────────────────────────────────────────
// The same domain MUST produce byte-identical output on every build. If this
// ever became random-per-build, every deploy would churn a live site's markup,
// which is worse than the footprint it set out to fix. Everything below keys
// off a hash of the hostname — never Math.random(), never Date.
//
// ── What this does NOT touch ────────────────────────────────────────────────
// Nothing here changes what a page means to a crawler. The tags that carry SEO
// weight are emitted unconditionally by MainLayout and are not selectable here:
//   charset (must stay the first tag — the spec wants it inside the first 1024
//   bytes), title, description, viewport, canonical, robots/googlebot,
//   og:title/description/image/url/type, twitter:card/title/description/image.
// Only block ORDER and genuinely redundant tags vary.

import { THAI_PROVINCES } from "./thaiProvinces";

export type HeadBlock = "icons" | "appmeta" | "og" | "twitter";

export interface BrandProfile {
  /** Order of the movable head blocks. */
  headOrder: HeadBlock[];
  /** Font files to preload, in emit order. All are @font-face'd in global.css
   *  with font-display: swap, so preloading is a performance hint only —
   *  varying which ones appear can never break text rendering. */
  fontPreloads: string[];
  /** `crossorigin` vs `crossorigin="anonymous"` — identical meaning. The old
   *  head mixed BOTH forms in three adjacent lines, which was itself a
   *  distinctive signature; now one form is used consistently per brand. */
  crossorigin: "" | "anonymous";
  /** iOS home-screen name. Redundant with the manifest's short_name. */
  showAppTitle: boolean;
  /** Legacy `rel="shortcut icon"`. Redundant with rel=icon + /favicon.ico
   *  auto-discovery; every browser in use ignores the "shortcut" keyword. */
  showShortcutIcon: boolean;
  /** twitter:url — redundant with og:url, which Twitter falls back to. */
  showTwitterUrl: boolean;
  /** og:locale — the page is already lang="th"; this is a nice-to-have. */
  showOgLocale: boolean;
}

// ── ฟอนต์ของแบรนด์ ────────────────────────────────────────────────────────
// สลับบรรทัดเดียวนี้ตอนรีแบรนด์ แล้วทั้งเว็บตามหมด (ดู SKILL.md)
//
// ทำไมต้องหมุน: ทุกแบรนด์ที่ใช้ Kanit จะ ship @font-face ที่ชี้ไป
// /fonts/kanit-v17-latin_thai-*.woff2 ชื่อไฟล์เดียวกันเป๊ะ — path ชุดนั้น
// ซ้ำกันข้ามโดเมนคือ fingerprint ที่ตรวจเจอง่ายกว่าตัวอักษรที่ตาเห็นเสียอีก
//
// ข้อแลกเปลี่ยนของสองตัวเลือกนี้ไม่เหมือนกัน:
//   kanit       — 4 ไฟล์ static น้ำหนักละไฟล์ (~29 kB) ไม่มี italic
//   google-sans — variable font แยก subset latin/thai (36 + 17 kB) ครอบคลุม
//                 400–700 ต่อเนื่องในไฟล์เดียว มี italic จริงไม่ใช่ faux
//
// ทั้งสองตัว self-host ทั้งคู่ตั้งแต่ 2026-08-25 — ไม่มี request ออกนอกโดเมนแล้ว
export type BrandFont = "kanit" | "google-sans";

// รอบนี้ (นาซ่า168 2026-10-23) หมุนออกจาก kanit ของรอบก่อน (ร่ำรวย168)
// กลับไปเป็น google-sans เพื่อให้ชุด @font-face ไม่ซ้ำกันสองรอบติด — การสลับไปมา
// ทุกรอบคือสิ่งที่ตัดลายนิ้วมือข้ามแบรนด์ชุดนั้นลงครึ่งหนึ่ง ไม่ใช่การเลือกว่า
// ฟอนต์ไหน "ดีกว่า" ทั้งสองตัว self-host เหมือนกัน ไม่มี request ออกนอกโดเมน
// ผลข้างเคียงที่ตั้งใจ: แบรนด์นี้จะ ship @font-face + preload ชุด
// /fonts/google-sans-v70-*.woff2 และจะ **ไม่** ship ชุด
// /fonts/kanit-v17-latin_thai-*.woff2 ของรอบก่อนเลยสักไฟล์ — และต้องสลับกลับอีกรอบหน้า
// ⚠️ **นี่คือการแก้ค่าเดียวที่เกี่ยวกับฟอนต์ทั้งรีแบรนด์** ไม่มี component ไหน
// hardcode ชื่อฟอนต์แล้ว ทุกตัวอ่าน var(--font-sans) ซึ่ง MainLayout ใส่ให้บน
// <html> — ห้ามแก้ font-family ที่อื่น และห้ามเติม <link> ของ Google Fonts เอง
export const BRAND_FONT: BrandFont = "google-sans";

// ── ชื่อแบรนด์ ─────────────────────────────────────────────────────────────
// สลับบรรทัดเดียวนี้ตอนรีแบรนด์ เหมือน BRAND_FONT ด้านบน (ดู SKILL.md)
//
// มีไว้เพื่อให้ไฟล์ "ถาวร" เขียนชื่อแบรนด์ได้โดยไม่ต้อง hardcode — ไฟล์อย่าง
// terms/privacy หรือ schema helper อยู่นอกสโคปที่รีแบรนด์แตะ ถ้ามันพิมพ์ชื่อ
// แบรนด์ไว้ตรงๆ มันจะกลายเป็นชื่อของแบรนด์ก่อนหน้าแบบเงียบๆ ภายในไม่กี่ชั่วโมง
// และไม่มีอะไรในบิลด์จับได้ เพราะเว็บยัง build ผ่านทั้งสองแบบ
// ชื่อที่ "เห็นบนเว็บ" รอบนี้คือ นาซ่า168 — **ภาษาไทยผสมเลข** เขียนติดกันเป็นคำเดียว
// ไม่มีเว้นวรรค โลโก้ แบนเนอร์ และสไลด์ของดรอป 2026-10-23 เขียนตรงกันหมด:
// **หมวกนักบินอวกาศสีขาว-เงินที่บังตาโค้งสะท้อนภาพโลกสีน้ำเงิน ตามด้วยคำว่า "นาซ่า"
// ตัวอักษรไทยสามมิติไล่เฉดฟ้าไซยานลงน้ำเงิน ต่อด้วยเลข "168" สีทองอำพัน**
// ⚠️⚠️ **แกนของแบรนด์รอบนี้คือ "เว็บสล็อตออนไลน์" ล้วน** — บรีฟเรียกตัวเองว่า
// "สล็อตนาซ่าเซิร์ฟไทย เล่นง่าย แบบฉบับไทย" และพูดถึง **ระบบเล่นง่าย รองรับภาษาไทย ·
// ลิขสิทธิ์แท้จากอเมริกา · ฝากถอนเข้าบริษัทตรง ไม่ผ่านม้า · ฝากถอนได้ทุกธนาคาร
// และทรูมันนี่** พร้อม **โปรโมชั่นคืนยอดเสีย 0.3% · แนะนำเพื่อน 0.8%**
// และ **ช่องทางติดต่อแอดมิน 24ชม.**
// ⚠️ **นี่ไม่ใช่เว็บหวย** → /ตรวจหวย กับ /แนวทาง อยู่ใน src/pages-disabled/ แล้ว
// และลิงก์ของมันไม่อยู่ใน navbar/footer ที่ใช้งานอยู่ — ห้ามย้ายกลับเข้า src/pages/
// ⚠️⚠️⚠️ **รีโปนี้เคยมีลูกค้าชื่อ NAZA168 (ตัวละติน) มาแล้ว — คนละเจ้ากับรอบนี้**
// worker ของเจ้านั้นคือ naza168-slot และยังมี naza-99 (NAZA99) อีกเจ้า
// ธีมของ NAZA168 เดิมคือ **ทองอวกาศ-เงินโครเมียม** ซึ่งเป็นธีมอวกาศเหมือนรอบนี้เป๊ะ
// → **ห้ามเขียน "NAZA168" ตัวละตินที่ไหนทั้งสิ้น รอบนี้คือ "นาซ่า168" ภาษาไทยเท่านั้น**
// → และนี่คือเหตุผลที่รอบนี้ **ตัดทอง/เหลือง/ส้ม/เทาเงินออกจาก UI ทั้งหมด**
// ⚠️⚠️ คำของ **ร่ำรวย168 รอบก่อน (แบรนด์ขาออก เสี่ยงหลงเหลือสูงสุด)** คือ
// "ร่ำรวย" / "จ่ายแพง" / "ปรับเรท" / "แตกหนัก" / "แตกหนักที่สุดในวงการ" /
// "เดิมพันไม่มีขั้นต่ำ" / "ทุนน้อยเล่นได้" / "ไม่อั้นจ่าย" / "ไม่อั้นถอน" /
// "ค่า RTP" / "ตารางจ่ายรางวัล" / "เพดานธุรกรรม" / "3 ขั้นตอน" —
// **ไม่มีในบรีฟรอบนี้เลยสักคำ ห้ามเขียนกลับเข้ามา**
// ตัวเลขที่ใช้ได้รอบนี้มีแค่ **0.3% · 0.8% · 24ชม.**
// ⚠️ **ไม่มี "3 ขั้นตอน" (ของร่ำรวย168) ไม่มี "1,000 เกม" และไม่มี "100%"**
// ส่วนโดเมนรอบนี้คือ นาซ่า168.com — **IDN ภาษาไทย ต้องแปลงเป็น punycode**
// เป็น xn--168-ill4dyhb9o.com (ต่างจากรอบก่อนที่เป็น ASCII ล้วน) ⚠️ TLD กลับเป็น **.com**
// ถ้า operator ไม่ได้ระบุโดเมนมาในคำสั่ง ห้ามแตะ site: เด็ดขาด — รอบนี้ operator
// ระบุมาตรงๆ ว่า real url is "https://นาซ่า168.com"
// ค่านี้คือชื่อที่คนอ่านเห็นบนโลโก้ ไม่ใช่ host — host มาจาก site:
// ใน astro.config.mjs เท่านั้น ทั้งสองค่ามาจาก operator ตรงๆ
// รายการค่าสีและคำของทุกแบรนด์ที่ต้องกวาดออกอยู่ใน
// .claude/brand-spec-naza168.md §2 และ §5
//
// iconSlug (ด้านล่าง) รอบนี้ชื่อแบรนด์เป็นไทยผสมเลข [^a-z0-9] จึงกินอักษรไทยทิ้งหมด
// เหลือ **"168"** เท่ากับสิบกว่าแบรนด์ไทยก่อนหน้า — เป็นข้อจำกัดที่รู้อยู่ของสูตร
// ไม่ใช่บั๊กที่ต้องแก้มือ ห้ามแก้ iconVersion ด้วยมือไม่ว่ากรณีใด
// สังเกตว่า slug มาจากชื่อแบรนด์ จึงไม่เท่ากับ name ใน wrangler.toml ซึ่งมาจาก
// "โดเมน" — รอบนี้คนละค่ากัน ("168" vs "xn--168-ill4dyhb9o")
//
// รอบนี้บรีฟ (src/assets/content.txt) เขียน "นาซ่า168" ตรงกับอาร์ตเวิร์กและคำสั่ง
// ของ operator ทุกจุด หน้าเว็บไม่พิมพ์ชื่อแบรนด์ตรงๆ เลยสักที่ แต่ interpolate ค่านี้
// ค่านี้ไปโผล่ใน og:site_name, JSON-LD, terms/privacy และ <address>
export const BRAND_NAME = "นาซ่า168";

// ── สีตัวอักษรเริ่มต้นของทั้งเว็บ ──────────────────────────────────────────
// สลับบรรทัดเดียวนี้ตอนรีแบรนด์ เหมือนสองตัวข้างบน ใส่สีเนื้อความหลักของแบรนด์
// (ตัวเดียวกับที่ ContentBox ที่ใช้อยู่ใส่ให้ย่อหน้า) ไม่ใช่สีหัวข้อหรือสีเน้น
//
// ทำไมต้องมี: ก่อนหน้านี้ไม่มีที่ไหนในเว็บตั้ง `color` ให้ body เลย —
// global.css ตั้ง font/focus ring แต่ไม่ตั้งสี ส่วนบล็อก is:global ใน
// MainLayout ตั้งแค่ background-color ผลคือ element ไหนที่ลืมใส่คลาสสีจะตกไป
// ใช้ค่า default ของเบราว์เซอร์ = ดำ ซึ่งบนพื้นเกือบดำแปลว่า "หายไปเลย"
// ไม่ใช่ "จางลง" หน้า terms/privacy/404 เป็นไฟล์ถาวรที่ไม่มีสีของแบรนด์ไหน
// เขียนอยู่ข้างในโดยตั้งใจ จึงโดนเต็มๆ ทั้งสามหน้า (ตรวจพบ 2026-07-31)
//
// MainLayout เอาค่านี้ไปใส่เป็น inline style บน <html> ให้ทุกอย่าง inherit
// ต่อกันลงมา — คลาส text-[#...] ที่ component เขียนเองยังชนะเสมอ เพราะการ
// ประกาศตรงตัวชนะการ inherit อยู่แล้ว ค่านี้จึงเป็น "พื้น" ไม่ใช่การบังคับ
// ⚠️⚠️ **นาซ่า168 เป็นแบรนด์ "ธีมมืด" — กลับทิศจากรอบก่อน 180 องศาอีกครั้ง**
// ค่านี้จึงเป็น **หมึกสว่าง** ไม่ใช่หมึกเข้มแบบรอบก่อน เหตุผล: bg.json ของดรอปนี้เป็น
// {"mode":"color","color":"#0d1017"} = **ถ่านเกือบดำอมน้ำเงิน** และ bg.json คือแหล่ง
// เดียวของพื้นเพจ ⚠️ **รอบก่อน (ร่ำรวย168) เป็น dbe6ff = ฟ้าเพอริวิงเคิลอ่อน**
// — ให้เปิด bg.json อ่านทุกรอบ ห้ามสืบทอดค่าข้ามรอบ และ **ห้ามเผลอทำตามรอบก่อน
// แล้วได้การ์ดขาวหมึกเข้มลอยอยู่บนพื้นเกือบดำ**
//
// ทิศของธีมรอบนี้ (อ่านให้จบก่อนแตะไฟล์ไหน):
//   พื้นเพจ  — #0d1017 (จาก bg.json)
//   ผิว      — #121722 (จม) / #1b2434 (กลาง การ์ด) / #273449 (ยก ชิป) / #33455f (เส้น)
//   ฮิวนำ    — ฟ้าไซยานไฟฟ้า #1fd8f0 คู่ฟ้าลึก #0bb6d4 และน้ำแข็งอ่อน #8fd9ec
//   วัสดุที่สอง — น้ำเงินอุลตรามารีน #1d4fd8 / #143aa0 (**พื้นถม/ขอบเท่านั้น**)
//   หมึก     — #e6edf8 (ค่านี้) และหมึกรอง #9fb2cb
// ⚠️ รอบนี้โครมกับเนื้อหา **อยู่ทิศเดียวกัน (มืดทั้งคู่)** ซึ่งต่างจากรอบก่อนที่แยกทิศ
// บล็อก <address> ใน footer ยัง paste verbatim ได้เหมือนเดิม (border-white/15
// bg-black/20 + ตัวอักษร inherit) เพราะ footer รอบนี้ยังเป็นผิวเข้ม
//
// ⚠️⚠️ **ฟ้า/ไซยานเคยนำมาแล้วหกแบรนด์ในรีโปนี้ (สบาย168 · รวยแทร่168 · นินจา168 ·
// สบายเบท168 · TSDET911 · **ร่ำรวย168 รอบก่อนทันที**) จึง "เจอฟ้าที่ไหนแปลว่าเป็นของ
// รอบนี้" ใช้ไม่ได้เด็ดขาด ต้องเทียบทีละค่า** ⚠️ ค่า vivid ดิบของ logo.webp รอบนี้คือ
// 64eefc ซึ่งห่างจาก 6bdcfb ของ **สบาย168 แค่ R7/G18/B1** — รอบนี้จึง **ไม่ใช้ค่าดิบ**
// แต่เลื่อนมาที่ #1fd8f0 (ห่าง 6bdcfb R76/G4/B11 · ห่าง 2cc3fc R13/G21/B12 ·
// ห่าง 32bcfb R19/G28/B11 · ห่าง 18a5e2 ของรอบก่อน R7/G51/B14)
// ตารางค่าที่ต้องกวาดออกครบทุกแบรนด์อยู่ใน .claude/brand-spec-naza168.md §2
//
// ⚠️ รอบนี้ **ฟ้าไซยานนำ คู่น้ำเงินอุลตรามารีนเป็นวัสดุที่สอง** และ **ไม่มีทอง/เหลือง/
// ส้ม/เทาเงินเป็นสี UI เลยสักเฉด** — ทองที่เห็นในอาร์ตเวิร์ก (เลข "168" ในโลโก้และ
// แบนเนอร์) เป็น **วัตถุในภาพ ไม่ใช่สีแบรนด์** และทองเป็นฮิวที่แน่นที่สุดในรีโปนี้
// ⚠️⚠️ **สำคัญเป็นพิเศษรอบนี้: NAZA168 ตัวละติน (ลูกค้าคนละเจ้า ชื่อออกเสียงเหมือนกัน)
// ใช้ชุด "ทองอวกาศ-เงินโครเมียม" fbc134 ffe87a cf9a18 96690a d9c9a6 cfd6e3 บนธีมอวกาศ
// เหมือนกันเป๊ะ** — ถ้ารอบนี้ใช้ทอง เว็บสองเจ้าจะกลายเป็นเว็บเดียวกันทันที
// จึง **ตัดทองออกจาก UI ทั้งหมดโดยตั้งใจ**
// เขียวที่ยังเหลืออยู่มีสองที่และเป็นสีเชิงความหมายทั้งคู่: LINE green #00B900
// ของปุ่ม LINE และเขียว success ของฟีด **ห้ามเปลี่ยนสองชุดนี้ให้เป็นสีแบรนด์**
// (ชุดนักบินอวกาศสีขาว ดวงจันทร์สีเทา และสีผิวนักแสดงในอาร์ตเวิร์ก เป็นวัตถุในภาพ
// **ไม่ใช่สีแบรนด์** ห้ามดึงเข้ามาเป็นสีของ UI — โดยเฉพาะแรมป์เทาเงิน ซึ่งเป็นของ
// พักยก168 · ยูฟ้า168 · UFA324 · NAZA168 ตัวละติน ไปแล้ว)
//
// ค่าคอนทราสต์ที่ตรวจแล้ว:
//   #e6edf8 (ค่านี้) บนพื้นเพจ #0d1017 16.0:1 · บนการ์ด #1b2434 13.3:1
//           — **ถือตัวอักษรได้ทุกบริบทมืด**
//   #9fb2cb บนผิวจม #121722 8.3:1 · บนการ์ด #1b2434 7.2:1 — หมึกรอง
//   #1fd8f0 บนพื้นเพจ 10.9:1 · บนการ์ด 9.1:1 — **หัวข้อ ลิงก์ และ <strong> ในเนื้อความ**
//   #0bb6d4 บนพื้นเพจ 7.7:1 · #8fd9ec บนผิวจม 11.4:1
// ⚠️⚠️ **#1fd8f0 ได้แค่ 1.7:1 บนขาว — ห้ามถือตัวอักษรบนพื้นสว่างเด็ดขาด**
//      (รอบนี้ไม่มีผิวสว่างอยู่แล้ว แต่ห้ามเผลอสร้างขึ้นมา)
// ⚠️⚠️ **#1d4fd8 ได้แค่ 2.4:1 บนการ์ด — เป็นพื้นถม/ขอบ/ออราเท่านั้น ห้ามถือตัวอักษร**
//      เช่นเดียวกับ #143aa0 และ #33455f
// **ปุ่ม CTA หลักคือพื้นไล่เฉด #1d4fd8 -> #143aa0 + หมึกขาว** (6.6 / 9.8:1)
// **ปุ่มเน้นคือพื้นถม #1fd8f0 (หรือไล่ #8fd9ec -> #1fd8f0) + หมึก #0d1017**
// (10.9:1 บน #1fd8f0 · 12.0:1 บน #8fd9ec) **ห้ามใส่ตัวอักษรขาวบน #1fd8f0** (1.7:1)
// **ปุ่มรองคือ outline ขอบ #1fd8f0 ตัวอักษร #1fd8f0 บนผิว #121722** (10.5:1)
// (navbar/footer/ticker ประกาศสีตัวอักษรของตัวเองไว้ครบ ค่านี้จึงไปไม่ถึงมัน)
export const BRAND_TEXT = "#e6edf8";

// ── ที่อยู่ + อีเมลติดต่อ (หน้า /contact-us และ footer) ────────────────────
// ปกติไม่ต้องแก้อะไรตรงนี้ — ทั้งที่อยู่และอีเมลมาจาก BRAND_NAME กับ site:
// เองอัตโนมัติ (ดู SKILL.md) สองบรรทัดล่างคือช่องสำหรับ "ที่อยู่จดทะเบียนจริง"
// ถ้าวันไหนมี ใส่แล้วมันชนะ
const ADDRESS_OWNER = "";
const ADDRESS_LINES: readonly string[] = [];

const CONTACT_DESKS = ["ศูนย์ประสานงานลูกค้า", "ฝ่ายบริการลูกค้า", "ศูนย์ดูแลสมาชิก", "ฝ่ายประสานงานสมาชิก", "ศูนย์บริการสมาชิก"] as const;

const CONTACT_MAILBOXES = ["support", "contact", "info", "service", "help"] as const;

function generatedAddress(brand: string): readonly string[] {
  const spot = THAI_PROVINCES[hash32(`${brand} contact-locality`) % THAI_PROVINCES.length];
  const desk = CONTACT_DESKS[hash32(`${brand} contact-desk`) % CONTACT_DESKS.length];
  return [`${desk} ${brand}`, `${spot.district} ${spot.province} ${spot.postcode}`];
}

function generatedEmail(brand: string): string {
  const box = CONTACT_MAILBOXES[hash32(`${brand} contact-mailbox`) % CONTACT_MAILBOXES.length];
  let host = "";
  try {
    host = new URL(import.meta.env.SITE ?? "").hostname.replace(/^www\./, "");
  } catch {
    host = "";
  }
  return host ? `${box}@${host}` : "";
}

export interface BrandAddress {
  readonly label: string;
  readonly lines: readonly string[];
  readonly email: string;
}

export const BRAND_ADDRESS: BrandAddress =
  ADDRESS_OWNER.trim().toUpperCase() === BRAND_NAME.trim().toUpperCase() && ADDRESS_LINES.length > 0
    ? { label: "ที่อยู่จดทะเบียนบริษัท", lines: ADDRESS_LINES, email: generatedEmail(BRAND_NAME) }
    : { label: "ที่อยู่ติดต่อ", lines: generatedAddress(BRAND_NAME), email: generatedEmail(BRAND_NAME) };

/** ต่อท้าย URL ของไอคอนเป็น ?v=... — ไม่ต้องแก้เอง มาจาก BRAND_NAME
 *
 *  ไฟล์ไอคอนใช้ path เดิมทุกแบรนด์ (/favicon.svg, /favicon.ico,
 *  /favicon-96x96.png, /apple-touch-icon.png) เปลี่ยนแต่ "ไบต์ข้างใน"
 *  ซึ่งเป็นกรณีที่เบราว์เซอร์แคชแข็งที่สุด — favicon ถูกเก็บในฐานข้อมูลแยก
 *  ของเบราว์เซอร์ที่ไม่สนใจการกด refresh ธรรมดา ผลคืออัปโลโก้ใหม่ครบทุกไฟล์
 *  แล้วแท็บยังขึ้นโลโก้แบรนด์ก่อนหน้าอยู่ดี (ผู้ใช้เจอเองรอบ MIRACLE55)
 *
 *  ของใน /_astro/* ไม่มีปัญหานี้เพราะชื่อไฟล์มี content hash — แบรนด์ใหม่ =
 *  URL ใหม่ = ไม่มีอะไรให้แคชค้าง บรรทัดนี้ให้ไอคอนได้พฤติกรรมเดียวกัน
 *
 *  ⚠️ ชื่อแบรนด์ที่เป็นภาษาไทยล้วน (เช่น "หวยเต็ง" รอบ 2026-10-01) จะถูก
 *  [^a-z0-9] กินหมดทั้งสตริง เหลือ "" แล้วตกไปใช้ fallback — ของเดิม fallback
 *  เป็นค่าคงที่ "1" ซึ่งแปลว่าทุกแบรนด์ชื่อไทยได้ ?v=1 เหมือนกันหมด = ไม่ bust
 *  แคชข้ามแบรนด์ชื่อไทยด้วยกันเลย จึง fallback เป็นแฮชของชื่อแทน ยังคงที่ต่อ
 *  แบรนด์ (ไม่ใช่ random/Date) แต่ต่างกันจริงเมื่อชื่อต่างกัน */
const iconSlug = BRAND_NAME.toLowerCase().replace(/[^a-z0-9]/g, "");
export const iconVersion = iconSlug || `b${hash32(BRAND_NAME).toString(36)}`;

const KANIT_STACK = '"Kanit", ui-sans-serif, system-ui, sans-serif';
const GOOGLE_SANS_STACK = '"Google Sans", ui-sans-serif, system-ui, sans-serif';

/** ค่าที่จะใส่เป็น --font-sans บน <html> */
export const fontStack = BRAND_FONT === "google-sans" ? GOOGLE_SANS_STACK : KANIT_STACK;

/** ยังชื่อเดิมเพื่อไม่ให้ต้องไล่แก้ที่เรียกใช้ แต่ตอนนี้แปลว่า "แบรนด์นี้ใช้
 *  Google Sans" เฉยๆ ไฟล์อยู่ใน public/fonts/ เหมือน Kanit ไม่ได้ยิงออก CDN */
export const usesGoogleFonts = BRAND_FONT === "google-sans";

const GS_LATIN = "/fonts/google-sans-v70-latin-wght.woff2";
const GS_THAI = "/fonts/google-sans-v70-thai-wght.woff2";

const FONT_REGULAR = "/fonts/kanit-v17-latin_thai-regular.woff2";
const FONT_500 = "/fonts/kanit-v17-latin_thai-500.woff2";
const FONT_600 = "/fonts/kanit-v17-latin_thai-600.woff2";
const FONT_700 = "/fonts/kanit-v17-latin_thai-700.woff2";

const HEAD_BLOCKS: HeadBlock[] = ["icons", "appmeta", "og", "twitter"];

const AI_CRAWLERS = ["GPTBot", "CCBot", "Google-Extended", "Anthropic-ai"];

/** FNV-1a plus an avalanche finalizer. Small, dependency-free, and stable
 *  across Node versions — which is what matters here; nothing security-related
 *  depends on it.
 *
 *  The finalizer is not optional. Raw FNV-1a has famously weak low bits, and
 *  every call site below takes `% 2` or `% 4` — i.e. reads exactly those bits.
 *  Without it, two similar hostnames collide: `fakebrand-alpha.com` and
 *  `fakebrand-bravo.com` produced a byte-identical head, which would have
 *  defeated the entire point of this module. Verified after adding it. */
function hash32(input: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  // lowbias32 finalizer — spreads entropy into the low bits.
  h ^= h >>> 16;
  h = Math.imul(h, 0x7feb352d);
  h ^= h >>> 15;
  h = Math.imul(h, 0x846ca68b);
  h ^= h >>> 16;
  return h >>> 0;
}

/** The seed is the bare hostname, so `example.com` and `www.example.com` are
 *  the same brand and cannot disagree about their own markup. */
function seedKey(site: URL | string | undefined): string {
  const raw = typeof site === "string" ? site : (site?.href ?? "");
  try {
    return new URL(raw).hostname.replace(/^www\./i, "").toLowerCase();
  } catch {
    // No `site:` configured (rare, but `astro dev` before a domain is set).
    // Any stable fallback will do — it just has to not throw.
    return raw.toLowerCase() || "localhost";
  }
}

const pick = (key: string, salt: string, n: number) => hash32(`${key} ${salt}`) % n;
const flag = (key: string, salt: string) => pick(key, salt, 2) === 1;

/** Seeded Fisher–Yates. Same key + salt always yields the same permutation. */
function shuffle<T>(items: readonly T[], key: string, salt: string): T[] {
  const out = items.slice();
  for (let i = out.length - 1; i > 0; i--) {
    const j = hash32(`${key} ${salt} ${i}`) % (i + 1);
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

/** Deterministically reorder any list for this brand. Used for the JSON-LD
 *  blocks on the homepage, where order carries no meaning to a parser. */
export function orderForBrand<T>(items: readonly T[], site: URL | string | undefined, salt = "order"): T[] {
  return shuffle(items, seedKey(site), salt);
}

/** Pick one of `n` options for this brand, and a coin flip. Exported for
 *  src/lib/schema.ts, which needs the same per-brand variation for JSON-LD
 *  `@id` fragments — if every brand anchored its nodes at `#website`/`#org`,
 *  the structured data would become the cross-portfolio signature that
 *  everything else in this file exists to avoid.
 *
 *  These take the site, not the hash key, so hash32/seedKey stay private and
 *  there is exactly one place that decides what a brand's seed is. */
export function brandPick(site: URL | string | undefined, salt: string, n: number): number {
  return pick(seedKey(site), salt, n);
}

export function brandFlag(site: URL | string | undefined, salt: string): boolean {
  return flag(seedKey(site), salt);
}

export function brandProfile(site: URL | string | undefined): BrandProfile {
  const key = seedKey(site);

  // Preload only the weights the pages actually draw with.
  //
  // 600 used to be in here unconditionally, and it was measured to be dead
  // weight: `font-semibold` is used ZERO times across every rendered component,
  // so all 29,628 bytes of kanit-600 were fetched at the highest priority the
  // browser has — competing directly with the LCP image — for a face nothing
  // ever painted. That is also the "preloaded but not used" warning in
  // Lighthouse. 400 and 700 are the two that matter: 400 is body copy, and 700
  // is what `font-bold` AND `font-black` both resolve to (there is no 800/900
  // @font-face, so CSS font matching falls to 700 rather than synthesising).
  //
  // 500 stays as the optional extra because it IS drawn (`font-medium`), just
  // rarely — so it is worth varying rather than mandating. This does narrow the
  // per-brand permutation count (2 orders × 4 insert positions instead of
  // 6 × 5); the head-block order and the other flags still carry the bulk of
  // the variation, and preloading a file the page never uses is not a footprint
  // trick worth paying for.
  //
  // A Google Sans brand preloads its two normal-style subsets instead. Both are
  // always drawn (latin for the brand name, thai for everything else), and the
  // two italic files are deliberately absent: `italic` appears on a handful of
  // latin words and is not worth the highest-priority fetch.
  const fonts = usesGoogleFonts ? shuffle([GS_LATIN, GS_THAI], key, "fonts") : shuffle([FONT_REGULAR, FONT_700], key, "fonts");
  if (!usesGoogleFonts && flag(key, "font-500")) {
    fonts.splice(pick(key, "font-500-at", fonts.length + 1), 0, FONT_500);
  }

  return {
    headOrder: shuffle(HEAD_BLOCKS, key, "head"),
    fontPreloads: fonts,
    crossorigin: flag(key, "crossorigin") ? "anonymous" : "",
    showAppTitle: flag(key, "app-title"),
    showShortcutIcon: flag(key, "shortcut-icon"),
    showTwitterUrl: flag(key, "twitter-url"),
    showOgLocale: flag(key, "og-locale"),
  };
}

/** robots.txt, assembled per brand.
 *
 * The old `public/robots.txt` was byte-identical across every brand except the
 * Sitemap line — the same four AI crawlers, in the same order, with the same
 * spacing. One grep matched the whole portfolio. The policy is unchanged (those
 * crawlers are still blocked, everything else is still allowed); only the
 * arrangement moves.
 *
 * Sitemap URL points at `/sitemap-index.xml`, the index the integration writes,
 * not at the `/sitemap-0.xml` shard directly. The old comment here kept the
 * shard so that "nothing already submitted to Search Console changes meaning" —
 * but every brand launches on a brand-new domain with a fresh Search Console
 * property, so there is nothing carried over for it to protect. Naming the
 * index is what survives the day a brand crosses 45,000 URLs and the
 * integration starts emitting a second shard.
 */
export function buildRobotsTxt(site: URL | string | undefined): string {
  const key = seedKey(site);

  // "Allow: /" and a bare "Disallow:" are the same instruction to a crawler.
  const openBlock = `User-agent: *\n${flag(key, "robots-allow") ? "Allow: /" : "Disallow:"}`;
  const botBlocks = shuffle(AI_CRAWLERS, key, "robots-bots").map((bot) => `User-agent: ${bot}\nDisallow: /`);

  const sitemapLine = site ? `Sitemap: ${new URL("/sitemap-index.xml", typeof site === "string" ? site : site.href).href}` : "";

  const body = [openBlock, ...botBlocks];
  if (sitemapLine) {
    // Both placements are valid — Sitemap is a group-independent directive.
    if (flag(key, "robots-sitemap-top")) body.unshift(sitemapLine);
    else body.push(sitemapLine);
  }

  return body.join("\n\n") + "\n";
}
