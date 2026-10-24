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

// รอบนี้ (okkub88 2026-10-24) หมุนออกจาก kanit ของรอบก่อน (โบ๊ะบ๊ะ168)
// รอบนี้หมุนกลับไปเป็น kanit (รอบก่อน okkub88 เป็น google-sans) เพื่อให้ชุด
// @font-face ไม่ซ้ำกันสองรอบติด — การสลับไปมาทุกรอบคือสิ่งที่ตัดลายนิ้วมือข้าม
// แบรนด์ชุดนั้นลงครึ่งหนึ่ง ไม่ใช่การเลือกว่าฟอนต์ไหน "ดีกว่า" ทั้งสองตัว
// self-host เหมือนกัน ไม่มี request ออกนอกโดเมน
// ผลข้างเคียงที่ตั้งใจ: แบรนด์นี้จะ ship @font-face + preload ชุด
// /fonts/kanit-v17-latin_thai-*.woff2 และจะ **ไม่** ship ชุด
// /fonts/google-sans-v70-*.woff2 ของรอบก่อนเลยสักไฟล์ — และต้องสลับกลับอีกรอบหน้า
// ⚠️ **นี่คือการแก้ค่าเดียวที่เกี่ยวกับฟอนต์ทั้งรีแบรนด์** ไม่มี component ไหน
// hardcode ชื่อฟอนต์แล้ว ทุกตัวอ่าน var(--font-sans) ซึ่ง MainLayout ใส่ให้บน
// <html> — ห้ามแก้ font-family ที่อื่น และห้ามเติม <link> ของ Google Fonts เอง
export const BRAND_FONT: BrandFont = "kanit";

// ── ชื่อแบรนด์ ─────────────────────────────────────────────────────────────
// สลับบรรทัดเดียวนี้ตอนรีแบรนด์ เหมือน BRAND_FONT ด้านบน (ดู SKILL.md)
//
// มีไว้เพื่อให้ไฟล์ "ถาวร" เขียนชื่อแบรนด์ได้โดยไม่ต้อง hardcode — ไฟล์อย่าง
// terms/privacy หรือ schema helper อยู่นอกสโคปที่รีแบรนด์แตะ ถ้ามันพิมพ์ชื่อ
// แบรนด์ไว้ตรงๆ มันจะกลายเป็นชื่อของแบรนด์ก่อนหน้าแบบเงียบๆ ภายในไม่กี่ชั่วโมง
// และไม่มีอะไรในบิลด์จับได้ เพราะเว็บยัง build ผ่านทั้งสองแบบ
// ชื่อที่ "เห็นบนเว็บ" รอบนี้คือ MEXICANOSLOT — **ตัวละตินพิมพ์ใหญ่ล้วน** เขียน
// ติดกันเป็นคำเดียว ไม่มีเว้นวรรค บรีฟ (src/assets/content.txt) เขียน
// "MEXICANOSLOT" พิมพ์ใหญ่ทุกบรรทัด **กลับทิศจากรอบก่อนที่เป็นพิมพ์เล็กล้วน**
// อาร์ตเวิร์กของดรอป 2026-10-24 เขียนตรงกันหมด: **เวิร์ดมาร์กสามมิติ "MEXICANO"
// แดงสด + "SLOT" น้ำเงิน-ฟ้าไล่เฉด ตัดขอบขาวหนา คู่กับชายการ์ตูนไว้หนวดสวม
// ซอมเบรโรยกนิ้วโป้ง และธงชาติเม็กซิโกเขียว-ขาว-แดง**
// ⚠️ **เวิร์ดมาร์กบนโลโก้เขียนสองสี (MEXICANO แดง / SLOT ฟ้า) — นั่นคืออาร์ตเวิร์ก
// ไม่ใช่การสะกดหรือการเว้นวรรค** ข้อความบนหน้าเว็บต้องเป็น **MEXICANOSLOT
// พิมพ์ใหญ่ติดกัน** เสมอ ห้าม Mexicanoslot / MexicanoSlot / mexicanoslot /
// "Mexicano Slot"
// ⚠️⚠️ **แกนของแบรนด์รอบนี้คือ "เว็บสล็อตออนไลน์ธีมเม็กซิกัน" ล้วน** — บรีฟเรียก
// ตัวเองว่า "สล็อตเมกซิกัน เดิมพันออนไลน์ เว็บแท้ที่นี่ที่เดียว" และพูดถึง
// **การันตีเว็บตรง · ยอดเข้าบริษัทไม่ผ่านเอเย่นต์ · สดส่งตรงจากเมกซิกัน ·
// โปรโมชั่นอัปเดตใหม่ตลอดสัปดาห์ · คืนยอดเสีย 0.3% · แนะนำเพื่อน 0.8% ไม่จำกัด ·
// สมัครด้วยตัวเอง 3 ขั้นตอน · แอดมินออนไลน์ตลอด 24ชม.**
// 🚨🚨 **บรีฟรอบนี้ไม่พูดถึงธนาคาร วอลเลท หรือการฝากถอนเลยแม้แต่คำเดียว** —
// ห้ามเขียนหัวข้อ/ย่อหน้าเรื่องฝากถอน ทรูวอลเลท ออโต้ ที่ไหนทั้งสิ้น และนั่นคือ
// เหตุผลที่ footer รอบนี้เลือกตัวที่ **ไม่ render BankStrip**
// ⚠️⚠️ **นี่คือเว็บสล็อต ไม่ใช่เว็บหวย** (ทิศเดียวกับรอบก่อน) → /ตรวจหวย กับ
// /แนวทาง ยังอยู่ใน src/pages-disabled/ และลิงก์ของทั้งสองไม่มีใน
// navbar + footer ที่ใช้งานอยู่ — ห้ามย้ายกลับเข้า src/pages/
// ⚠️⚠️ คำของ **okkub88 รอบก่อน (แบรนด์ขาออก เสี่ยงหลงเหลือสูงสุด)** คือ
// "okkub88" / "เว็บสล็อตเงินดี" / "ทางเข้าเล่นง่าย" / "ยูสใหม่แตกไว" /
// "รับโปรไม่อั้น" / "โบนัสแจกทั้งวันไม่จำกัด" / "ฝากถอนไม่มีขั้นต่ำ" /
// **"ทรูวอลเลท"** / "ทุกธนาคารและทรูวอลเลท" —
// **ไม่มีในบรีฟรอบนี้เลยสักคำ ห้ามเขียนกลับเข้ามา**
// 🚨 **"ทรูวอลเลท" คือคำที่พลาดง่ายที่สุดของรอบนี้** เพราะมันอยู่เกือบทุกหน้าของ
// รอบก่อน และหมวด "ฝากถอน" ทั้งหมวดหายไปจากบรีฟรอบนี้
// และของก่อนหน้านั้น (โบ๊ะบ๊ะ168): "โบ๊ะบ๊ะ" / "เกมสล็อตสนุกสุดมันส์" /
// "เว็บตรงแตกง่าย" / "เบทต่ำ" / "ไม่ทำเทิร์น" / "รวมค่ายดัง" / "ถอนได้ไม่จำกัด" /
// "ทรูมันนี่" — ห้ามเช่นกัน
// (หมูบิน168): "หมูบิน" / "เกมสล็อตแท้" / "เว็บตรงถูกลิขสิทธิ์" / "เชื่อถือได้" /
// "ไม่จำกัดยอด" — ห้ามเช่นกัน
// (สล็อต168): "ระบบสล็อตเว็บนอก" / "ทางเข้าแท้" / "ไม่ผ่านเอเย่นต์100%" /
// "ฐานเกมหลัก" — ห้ามเช่นกัน
// (รวย168): "รวย" / "แทงหวยเว็บรวย" / "หวย" / "สลาก" / "เลขเด็ด" / "งวด" /
// "บาทละ 1,000" — ห้ามเช่นกัน
// (มาดาม168): "มาดาม" / "เปย์แรง" / "จ่ายไม่มีอั้น" · (นาซ่า168): "นาซ่า" /
// "เซิร์ฟไทย" / "อวกาศ" / "ไม่ผ่านม้า" — ห้ามเช่นกัน
// ⚠️ **"สล็อตคลาสสิก" และ "เกมโบนัส" รอบนี้ใช้ได้** เพราะอยู่ในบรีฟรอบนี้ตรงตัว
// (content.txt บรรทัด 4) — รอบก่อนห้ามไว้เพราะเป็นคำของโบ๊ะบ๊ะ168
// **อย่าสืบทอดข้อห้ามข้ามรอบโดยไม่เปิดบรีฟดู**
// ตัวเลขที่ใช้ได้รอบนี้มีแค่ **0.3% · 0.8% · 3 ขั้นตอน · 24ชม.**
// ⚠️ **ไม่มีจำนวนเกม ไม่มีจำนวนค่าย ไม่มีตัวเลข RTP ไม่มี 100% ไม่มี "1 บาท"
// และไม่มี "30 วินาที"**
// ส่วนโดเมนรอบนี้คือ **mexicanoslot.cc — ASCII ล้วน ไม่ต้องแปลง punycode**
// ⚠️⚠️ **TLD รอบนี้คือ `.cc`** (รอบก่อนเป็น .net) ชื่อ worker จึงเป็น "mexicanoslot"
// ซึ่ง **ไม่ชนกับชื่อใดในลิสต์ของ wrangler.toml** (ไม่มีชื่อไหนขึ้นต้น mex)
// ถ้า operator ไม่ได้ระบุโดเมนมาในคำสั่ง ห้ามแตะ site: เด็ดขาด — รอบนี้ operator
// ระบุมาตรงๆ ว่า real url is "https://mexicanoslot.cc"
// ค่านี้คือชื่อที่คนอ่านเห็นบนโลโก้ ไม่ใช่ host — host มาจาก site:
// ใน astro.config.mjs เท่านั้น ทั้งสองค่ามาจาก operator ตรงๆ
// รายการค่าสีและคำของทุกแบรนด์ที่ต้องกวาดออกอยู่ใน
// .claude/brand-spec-mexicanoslot.md §2 และ §5
//
// iconSlug (ด้านล่าง) รอบนี้ชื่อแบรนด์เป็นละติน+เลขล้วน [^a-z0-9] จึงไม่กินอะไรเลย
// แต่ถูก toLowerCase() ก่อน จึงได้ **"mexicanoslot"** เต็ม
// ห้ามแก้ iconVersion ด้วยมือไม่ว่ากรณีใด
// รอบนี้ slug บังเอิญเท่ากับ name ใน wrangler.toml แต่ **ที่มาคนละทางกันเสมอ**
// (slug มาจากชื่อแบรนด์ · name มาจากโดเมน) — อย่าสรุปว่าสองค่านี้เท่ากันทุกรอบ
//
// รอบนี้บรีฟ (src/assets/content.txt) เขียน "MEXICANOSLOT" ตรงกับอาร์ตเวิร์กและ
// คำสั่งของ operator ทุกจุด หน้าเว็บไม่พิมพ์ชื่อแบรนด์ตรงๆ เลยสักที่ แต่
// interpolate ค่านี้ ค่านี้ไปโผล่ใน og:site_name, JSON-LD, terms/privacy และ <address>
export const BRAND_NAME = "MEXICANOSLOT";

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
// ⚠️⚠️ **MEXICANOSLOT เป็นแบรนด์ "เนื้อหาสว่าง" แต่ "โครมเข้ม" — กลับทิศครึ่งหนึ่ง
// จากรอบก่อนที่สว่างทั้งหน้ารวมโครม** ค่านี้จึงยังเป็น **หมึกเข้ม** เพราะมันเป็น
// สีตัวอักษรบน "ผิวเนื้อหา" (การ์ดขาวบนพื้นเพจสว่าง) ไม่ใช่บนโครม
// เหตุผลที่พื้นเพจสว่าง: bg.json ของดรอปนี้เป็น
// {"mode":"color","color":"#fef6fb"} = **ขาวอมชมพูจาง** และ bg.json คือแหล่งเดียว
// ของพื้นเพจ ⚠️ **รอบก่อน (okkub88) เป็น ffd6fa = ชมพูบับเบิลกัมพาสเทลที่อิ่มกว่านี้มาก**
// — ให้เปิด bg.json อ่านทุกรอบ ห้ามสืบทอดค่าข้ามรอบ
// ⚠️ และหมึกรอบนี้เป็น **เอสเพรสโซอมแดง (R>G>B)** ต่างจากรอบก่อนที่เป็นเบอร์รีชมพู
// อ่านมาจากอาร์ตเวิร์กที่เป็น **เวิร์ดมาร์กสามมิติแดงสดตัดขอบขาว บนฉากกลางแจ้ง
// เม็กซิกันที่มีอาคารอะโดบีครีมและผ้าซาราเป้ลายทางแดง-เขียว**
//
// ทิศของธีมรอบนี้ (อ่านให้จบก่อนแตะไฟล์ไหน):
//   พื้นเพจ  — #fef6fb (จาก bg.json) ขาวอมชมพูจาง **สว่างมาก**
//   ผิวเนื้อหา — #ffffff (การ์ด) / #fff3ea (ยก ชิป) / #fde4d3 (wash)
//               / #f6c4a4 (เส้นอ่อน) / #e2855c (เส้นเข้ม)
//   ผิวโครม  — **#2b100a (ฐาน) / #431a10 (ยก) / #8c3a22 (เส้น) / #fdeee2 (หมึกบนโครม)
//               / #e8c6ae (หมึกรองบนโครม)** ← **เข้ม ไม่ใช่สว่างแบบรอบก่อน**
//   ฮิวนำ    — **แดงเม็กซิกัน #de2b1e** (ตกแต่งบนผิวสว่างเท่านั้น)
//               คู่ทอง #f2a033 และพีช/ฟาง #fed7b5 / #fec28d
//   หมึก     — #3f130d (ค่านี้) · หมึกรอง #80453a · **หัวข้อ/strong/ลิงก์ #a81410**
//               · เขียวเม็กซิกันแอคเซนต์ #117a41 (5.4:1 บนขาว — ถือตัวอักษรได้)
//   ไฮไลต์บนโครมเข้ม — #f2543f (แดง 5.2:1) / #f2a033 (ทอง 8.3:1) / #2bb061 (เขียว 6.3:1)
// ⚠️⚠️ **รอบนี้โครมกับเนื้อหาอยู่คนละทิศ (โครมเข้ม เนื้อหาสว่าง) — กลับทิศจากรอบก่อน
// ที่สว่างทั้งหน้า** อาร์ตเวิร์กรอบนี้เป็นฉาก fiesta อิ่มสีที่มีทั้งแดง เขียว ทอง
// และเงาเข้ม โครมเอสเพรสโซจึงทำหน้าที่เป็น "กรอบโปสเตอร์" ไม่ใช่แถบดำแปลกปลอม
// ⚠️⚠️ **ผลที่ตามมา: บล็อก <address> ใน footer กลับไป paste verbatim ตาม SKILL.md ได้
// ตามปกติ** (border-white/15 + bg-black/20 + ตัวอักษร inherit) เพราะ footer รอบนี้
// เป็นผิวเข้มอีกครั้ง — **ห้ามใส่เฮกซ์ของแบรนด์ลงในบล็อกนั้น**
// (รอบก่อนต้องเบี่ยงเพราะ footer เป็นผิวขาว ซึ่งไม่ใช่กรณีของรอบนี้)
//
// ⚠️⚠️ **ชมพูบับเบิลกัมคือฮิวนำของรอบก่อนทันที (okkub88) — รอบนี้ห้ามมีชมพู/แมเจนต้า
// เลยสักเฉด** ค่าที่ต้องกวาดออกก่อนใคร:
// ffd6fa fff4fb ffe3f5 ffe9f7 f9b2d9 f479b9 f4a7cf 6a0f3c 95486b 9c0f55 fb439b
// fc74b5 ffc2e2 d91a73 b01160 85094a fd6cb2 fc7cba fc4da1 (รอบก่อนทันที)
// และชมพูของแบรนด์เก่ากว่านั้น: fa539c c2185b 8e0f41 fb8cc0 fdc6c3 ffd1cd f7bcd9
// ef8dbd ffe5ff fff0f8 ffeef7 3b0b26 54123a 7a2350 ffe9f5 7a4463 (หมูบิน168) ·
// fa63b9 ffb3de (ถอนชัวร์168) · f5469f ff8dc6 8c0f52 (มีโชค168) ·
// dd1b74 a4186b 4a0d35 2d0720 (มีทรัพย์168) · f41571 ff5ca8 (PUNPRO168)
// ⚠️⚠️ **และฟ้า/ไซแอน/น้ำเงินของ โบ๊ะบ๊ะ168 (N-2) ก็ห้ามเช่นกัน**: 00bfff 12b4ef
// b6e3f0 7fcbe8 4fb8ea 06283f 0b4a73 2a87c4 eaf7ff f0faff e4f6fb 355f7d 0f5684
// 1a6ea8 · รวมถึง 00f3ff e0ffff 60a5fa 4b5563 030712 1f2937 (ค่า default ของ
// variant cyber-neon/dark ที่ค้างอยู่ใน Announcement*.astro ก่อน retheme)
//
// 🚨🚨 **รอบนี้ตัวนำคือ "แดง" ซึ่งเป็นฮิวของแบรนด์เก่าหลายเจ้า**
// "เจอแดง ≠ เป็นของรอบนี้" ต้องเทียบทีละค่ากับ .claude/brand-spec-mexicanoslot.md §2:
//   fb2e33 cb0b0d d81115 b00d11 8a0608 1c0607 2a0c0d 551c1e 140000 0b0000
//   f0e6e4 c9b9b7 e3d6d4 7d6f6e (สล็อต168)
//   ff2e52 e01238 c9102f (มาดาม168) · c30303 8f0505 e81313 dcb95f 280b0b (รวยแท้168)
//   d9212a 8e1a16 f0c878 fff8d8 150303 4e2120 300605 (ดวงเศรษฐี168)
//   fb141b ff5f63 (GT66B) · eb0305 2c1004 4d1c0a b44c06 f0b46a (ค้างใน NavbarStyle4)
//   ⚠️⚠️ คู่ที่ใกล้ที่สุดและต้องสงสัยว่า "พิมพ์ผิด" ก่อนเสมอ:
//     fb2e33 (สล็อต168) ↔ #de2b1e (ฮิวนำรอบนี้) — **มี 2 ตรงกลางเหมือนกัน
//       ตระกูลเดียวกัน ความอิ่มใกล้กัน ตรวจด้วยค่าเท่านั้น ห้ามตัดสินด้วยสายตา**
//     cb0b0d / b00d11 (สล็อต168) ↔ #c81e12 / #a81410 (ปุ่ม/หัวข้อรอบนี้) — ใกล้มาก
//     1c0607 / 280b0b / 2a0c0d (แดงเข้มเจ้าอื่น) ↔ #2b100a (ฐานโครมรอบนี้)
//     f0e6e4 (มุกอุ่นสล็อต168) ↔ #fdeee2 (หมึกโครมรอบนี้) — ตระกูลเดียวกัน
//     f0b46a / f0c878 (ทองเจ้าอื่น) ↔ #f2a033 (ทองรอบนี้) — **f0 ↔ f2 ต่างไบต์เดียว**
//   และทองของแบรนด์เก่าที่ห้ามเช่นกัน: ffd84d f5ba14 fcee52 b37c0b ffd94a e3a712
//   9d6f06 eeae12 fded41 9f600d e29f0f fdf051 fcd434 ffeaa0 fcd45c fdcb0c fefb6b
//   fee45d e6a416 fef54b f7c92b ffe6a3 d4922c fdfc71 e5a81b ffe08a f9a826 ffdc8c
//   f0b429 ffc82e e0bd72 f6e4b4 d4af5a eab308 f5c53d ece2cc
//   และเขียวของ สาธุ168 ที่ห้ามเช่นกัน: 0b7d28 0a5f1c 0f9b35 0c3a16 061f0c
// อ่านมาจากอาร์ตเวิร์กตรงๆ: เวิร์ดมาร์ก "MEXICANO" · เลข 0.3% / 0.8% บนสไลด์ ·
// แคปซูล "แจกโบนัสทั้งวัน" · พริก · ลายปักบนซอมเบรโร · ธงชาติ **เป็นแดงทั้งหมด**
// ส่วนกระบองเพชร ลายปอนโช และแถบธงเป็น **เขียว** และเหรียญ/ขอบแคปซูลเป็น **ทอง**
// ซึ่งคือชุดวัสดุบนอาร์ตเวิร์กเป๊ะๆ
//
// ⚠️ รอบนี้ **ไม่มีฟ้า/ไซแอน/น้ำเงิน/ม่วง/ชมพู/แมเจนต้า/เทาเงิน เป็นสี UI เลยสักเฉด**
// — ฉากกลางแจ้ง ผ้าซาราเป้ เหรียญทอง กีตาร์ และสีผิวนักแสดงในอาร์ตเวิร์กเป็น
// **วัตถุในภาพ** ส่วน **"SLOT" สีน้ำเงิน-ฟ้าในเวิร์ดมาร์กเป็นอาร์ตเวิร์กของโลโก้
// ไม่ใช่สี UI — ห้ามดึงฟ้าเข้ามาเป็นสีของเว็บเด็ดขาด** (นี่คือกับดักที่แหลมที่สุด
// ของรอบนี้ เพราะฟ้าคือฮิวของ โบ๊ะบ๊ะ168 เมื่อสองรอบก่อน)
// (ค่า dominant ที่ palette.json วัดได้จาก banner1 เป็นขาว f6fafc / fcfdfe และจาก
// slide1 เป็นขาว fcfdfd ซึ่งคือ **ฉากสว่างในภาพ ไม่ใช่พื้นเพจ** พื้นเพจมาจาก
// bg.json = #fef6fb เท่านั้น palette.json จัดอันดับให้ แต่ไม่ได้ตีความให้ —
// ค่าที่เอามาใช้คือ **vivid**: logo.webp ได้ fec28d fec592 fcbd8a **c30c0a** f9ab74
// และ slide1.png ได้ **fd0203** e30101 dc0201 fe3231 9b0403 = **แดงสดคือฮิวนำจริง**
// สองค่านั้นดิบเกินไปสำหรับ UI จึงแปลงเป็น #de2b1e / #a81410 ตามตารางด้านบน)
// เขียวที่เป็นสีเชิงความหมายมีสองที่และ **ห้ามเปลี่ยน**: LINE green #00B900 ของปุ่ม
// LINE และเขียว success ของฟีดถอนเงิน — **สองชุดนี้ไม่ใช่ #117a41 / #2bb061 ของแบรนด์**
//
// ค่าคอนทราสต์ที่ตรวจแล้ว:
//   #3f130d (ค่านี้) บนการ์ดขาว 14.9:1 · บนพื้นเพจ #fef6fb 14.4:1 · บน #fff3ea 14.0:1
//           — **ถือตัวอักษรได้ทุกบริบทสว่าง**
//   #80453a บนการ์ดขาว 6.6:1 — หมึกรอง
//   #a81410 บนการ์ดขาว 7.6:1 · บนผิวยก #fff3ea 7.2:1
//           — **หัวข้อ ลิงก์ และ <strong> ในเนื้อความบนผิวสว่าง**
//   #117a41 บนการ์ดขาว 5.4:1 — เขียวเม็กซิกันแอคเซนต์ (ป้าย/ไอคอนที่มีตัวอักษร)
// ⚠️⚠️ **#de2b1e (ขาวบนมันได้แค่ 4.7:1) #f2a033 #fed7b5 #fec28d #f6c4a4 #e2855c
//      #fde4d3 #fff3ea #fef6fb เป็นพื้นถม/ขอบ/ออราบนผิวสว่างเท่านั้น
//      ห้ามถือตัวอักษรบนผิวสว่างเด็ดขาด**
// ⚠️⚠️ **#f2543f และ #2bb061 ใช้ได้เฉพาะบนผิวโครมเข้ม (#2b100a / #431a10)
//      ห้ามเอามาวางบนการ์ดขาว** (บนขาวได้ 3.5:1 และ 2.9:1 ตามลำดับ)
// **ปุ่ม CTA หลักคือพื้นไล่เฉด #c81e12 -> #9d140c -> #6f0e08 + หมึกขาว #ffffff**
//   คอนทราสต์ต่อ stop: 5.7:1 / 8.3:1 / 11.4:1
//   ⚠️⚠️ **ห้ามใช้ #de2b1e หรือ #f2a033 เป็น stop ของปุ่มที่ถือหมึกขาว**
//   สองค่านั้นสงวนไว้สำหรับ **ขอบ/ออรา/พื้นถม** เท่านั้น
//   (brand-spec §2 ระบุข้อนี้ไว้ตรงกัน)
// **ปุ่มรองคือพื้นไล่เฉดขาว #ffffff -> #fde4d3 + หมึก #3f130d** (14.9 / 12.1:1)
// **ปุ่ม outline คือขอบ #a81410 ตัวอักษร #a81410 บนผิว #ffffff** (7.6:1)
// (navbar/footer/ticker ประกาศสีตัวอักษรของตัวเองไว้ครบ ค่านี้จึงไปไม่ถึงมัน)
export const BRAND_TEXT = "#3f130d";

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
