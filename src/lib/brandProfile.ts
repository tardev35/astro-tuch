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

// รอบนี้ (ZANE96 2026-10-25) หมุนออกจาก kanit ของรอบก่อน (MEXICANOSLOT)
// ไปเป็น google-sans — การสลับไปมาทุกรอบคือสิ่งที่ตัดลายนิ้วมือข้ามแบรนด์ชุดนั้น
// ลงครึ่งหนึ่ง ไม่ใช่การเลือกว่าฟอนต์ไหน "ดีกว่า" ทั้งสองตัว self-host เหมือนกัน
// ไม่มี request ออกนอกโดเมน
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
// ชื่อที่ "เห็นบนเว็บ" รอบนี้คือ ZANE96 — **ตัวละตินพิมพ์ใหญ่ + เลข เขียนติดกัน
// เป็นคำเดียว ไม่มีเว้นวรรค** บรีฟ (src/assets/content.txt) เขียน "ZANE96"
// พิมพ์ใหญ่ทุกบรรทัด และอาร์ตเวิร์กของดรอป 2026-10-25 เขียนตรงกันหมด:
// **เวิร์ดมาร์กสามมิติผิวโครเมียม "ZANE" ไล่ฟ้าอิเล็กทริก→ม่วง + "96"
// แมเจนต้า/ชมพูนีออน ตัดขอบขาว มีประกายดาวสี่แฉกประดับ**
// ⚠️ **เวิร์ดมาร์กไล่สองสี (ZANE ฟ้า-ม่วง / 96 แมเจนต้า) — นั่นคืออาร์ตเวิร์ก
// ไม่ใช่การสะกดหรือการเว้นวรรค** ข้อความบนหน้าเว็บต้องเป็น **ZANE96 พิมพ์ใหญ่
// ติดกัน** เสมอ ห้าม Zane96 / ZaNe96 / zane96 / "ZANE 96"
// ⚠️⚠️ **แกนของแบรนด์รอบนี้คือ "เว็บสล็อตออนไลน์ลิขสิทธิ์แท้" ล้วน** — บรีฟเรียก
// ตัวเองว่า "สล็อตลิขสิทธิ์แท้ในไทย เว็บตรงไม่ผ่านเอเย่นต์" และพูดถึง
// **รวมเกมสล็อตแบรนด์ดัง · ยูสใหม่เล่นง่ายไม่มีขั้นต่ำ 1 บาทก็เล่นได้ ·
// สล็อตคลาสสิก ฟรีสปิน เกมโบนัส · ค่า RTP และความผันผวน (เป็นแนวคิด ไม่มีตัวเลข) ·
// โปรโมชั่นอัปเดตใหม่ทุกสัปดาห์ · คืนยอดเสีย 0.3% · แนะนำเพื่อน 0.8% ไม่จำกัด ·
// สมัครด้วยมือถือ 3 ขั้นตอน · แอดมินออนไลน์ตลอด 24ชม.**
// 🚨🚨 **บรีฟรอบนี้ไม่พูดถึงธนาคาร วอลเลท หรือการฝากถอนเลยแม้แต่คำเดียว** (ทิศ
// เดียวกับรอบก่อน) — ห้ามเขียนหัวข้อ/ย่อหน้าเรื่องฝากถอน ทรูวอลเลท ออโต้ ที่ไหน
// ทั้งสิ้น และนั่นคือเหตุผลที่ footer รอบนี้เลือกตัวที่ **ไม่ render BankStrip**
// ⚠️⚠️ **นี่คือเว็บสล็อต ไม่ใช่เว็บหวย** → /ตรวจหวย กับ /แนวทาง ยังอยู่ใน
// src/pages-disabled/ และลิงก์ของทั้งสองไม่มีใน navbar + footer ที่ใช้งานอยู่
// — ห้ามย้ายกลับเข้า src/pages/
// ⚠️⚠️ คำของ **MEXICANOSLOT รอบก่อน (แบรนด์ขาออก เสี่ยงหลงเหลือสูงสุด)** คือ
// "MEXICANOSLOT" / "สล็อตเมกซิกัน" / "เมกซิกัน" / "เม็กซิโก" / "สดส่งตรงจาก
// เมกซิกัน" / "การันตีเว็บตรง" / "ยอดเข้าบริษัทแน่นอน" / "เว็บแท้ที่นี่ที่เดียว"
// — **ไม่มีในบรีฟรอบนี้เลยสักคำ ห้ามเขียนกลับเข้ามา**
// 🚨 **สองคู่ที่พลาดง่ายที่สุดของรอบนี้ เพราะต่างกันคำเดียว**:
//   รอบก่อน "อัปเดตใหม่**ตลอด**สัปดาห์" → รอบนี้บรีฟเขียน "อัปเดตใหม่**ทุก**สัปดาห์"
//   รอบก่อน "สมัครด้วย**ตัวเอง** 3 ขั้นตอน" → รอบนี้บรีฟเขียน "สมัครด้วย**มือถือ**"
// 🚨 **ภาษาภาพของ MEXICANOSLOT ก็ห้ามหลุดกลับมา**: ซอมเบรโร · ปอนโช/ซาราเป้ ·
// มาราคัส · กีตาร์โปร่ง · กระบองเพชร · พริกแดง · ธงชาติเม็กซิโก · อาคารอะโดบี ·
// เหรียญทอง · หนวด · fiesta
// และของก่อนหน้านั้น (okkub88): "okkub88" / "เว็บสล็อตเงินดี" / "ทางเข้าเล่นง่าย" /
// "ยูสใหม่แตกไว" / "รับโปรไม่อั้น" / "โบนัสแจกทั้งวันไม่จำกัด" /
// "ฝากถอนไม่มีขั้นต่ำ" / **"ทรูวอลเลท"** — ห้ามเช่นกัน
// (โบ๊ะบ๊ะ168): "โบ๊ะบ๊ะ" / "เกมสล็อตสนุกสุดมันส์" / "เว็บตรงแตกง่าย" / "เบทต่ำ" /
// "ไม่ทำเทิร์น" / "รวมค่ายดัง" / "ถอนได้ไม่จำกัด" / "ทรูมันนี่" — ห้ามเช่นกัน
// (หมูบิน168): "หมูบิน" / "เกมสล็อตแท้" / "เว็บตรงถูกลิขสิทธิ์" / "เชื่อถือได้" /
// "ไม่จำกัดยอด" · (สล็อต168): "ระบบสล็อตเว็บนอก" / "ทางเข้าแท้" /
// "ไม่ผ่านเอเย่นต์100%" / "ฐานเกมหลัก" — ห้ามเช่นกัน
// (รวย168): "รวย" / "แทงหวยเว็บรวย" / "หวย" / "สลาก" / "เลขเด็ด" / "งวด" /
// "บาทละ 1,000" · (มาดาม168): "มาดาม" / "เปย์แรง" / "จ่ายไม่มีอั้น" ·
// (นาซ่า168): "นาซ่า" / "เซิร์ฟไทย" / "อวกาศ" / "ไม่ผ่านม้า" — ห้ามเช่นกัน
// ⚠️ **"สล็อตคลาสสิก" กับ "เกมโบนัส" รอบนี้ใช้ได้ (บรีฟบรรทัด 6) และ "1 บาท"
// รอบนี้ก็ใช้ได้ ทั้งที่รอบก่อนห้ามไว้** — **อย่าสืบทอดข้อห้ามข้ามรอบโดยไม่เปิดบรีฟดู**
// ตัวเลขที่ใช้ได้รอบนี้มีแค่ **1 บาท · 0.3% · 0.8% · 3 ขั้นตอน · 24ชม.**
// ⚠️ **ไม่มีจำนวนเกม ไม่มีจำนวนค่าย ไม่มีตัวเลข RTP ไม่มี 100% และไม่มี
// "30 วินาที"** (RTP พูดถึงได้ในฐานะแนวคิด เพราะบรีฟบรรทัด 6 เขียนไว้เอง
// แต่ห้ามใส่ค่าเป็นตัวเลข)
// ส่วนโดเมนรอบนี้คือ **zane96.autos — ASCII ล้วน ไม่ต้องแปลง punycode**
// ⚠️⚠️ **TLD รอบนี้คือ `.autos`** (รอบก่อนเป็น .cc) ชื่อ worker จึงเป็น "zane96"
// ซึ่ง **ไม่ชนกับชื่อใดในลิสต์ของ wrangler.toml** (ไม่มีชื่อไหนขึ้นต้นด้วย z)
// ถ้า operator ไม่ได้ระบุโดเมนมาในคำสั่ง ห้ามแตะ site: เด็ดขาด — รอบนี้ operator
// ระบุมาตรงๆ ว่า real url is "https://zane96.autos"
// ค่านี้คือชื่อที่คนอ่านเห็นบนโลโก้ ไม่ใช่ host — host มาจาก site:
// ใน astro.config.mjs เท่านั้น ทั้งสองค่ามาจาก operator ตรงๆ
// รายการค่าสีและคำของทุกแบรนด์ที่ต้องกวาดออกอยู่ใน
// .claude/brand-spec-zane96.md §2 และ §5
//
// iconSlug (ด้านล่าง) รอบนี้ชื่อแบรนด์เป็นละติน+เลขล้วน [^a-z0-9] จึงไม่กินอะไรเลย
// แต่ถูก toLowerCase() ก่อน จึงได้ **"zane96"** เต็ม
// ห้ามแก้ iconVersion ด้วยมือไม่ว่ากรณีใด
// รอบนี้ slug บังเอิญเท่ากับ name ใน wrangler.toml แต่ **ที่มาคนละทางกันเสมอ**
// (slug มาจากชื่อแบรนด์ · name มาจากโดเมน) — อย่าสรุปว่าสองค่านี้เท่ากันทุกรอบ
//
// หน้าเว็บไม่พิมพ์ชื่อแบรนด์ตรงๆ เลยสักที่ แต่ interpolate ค่านี้ ค่านี้ไปโผล่ใน
// og:site_name, JSON-LD, terms/privacy และ <address>
export const BRAND_NAME = "ZANE96";

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
// ⚠️⚠️ **ZANE96 เป็นแบรนด์ "เนื้อหาสว่าง" แต่ "โครมเข้ม" — ทิศเดียวกับรอบก่อน
// แต่คนละตระกูลสีทั้งชุด** ค่านี้จึงเป็น **หมึกเข้ม** เพราะมันเป็นสีตัวอักษรบน
// "ผิวเนื้อหา" (การ์ดขาวบนพื้นเพจสว่าง) ไม่ใช่บนโครม
// เหตุผลที่พื้นเพจสว่าง: bg.json ของดรอปนี้เป็น
// {"mode":"color","color":"#f8e6f9"} = **ไลแลคอมชมพูจาง** และ bg.json คือแหล่งเดียว
// ของพื้นเพจ ⚠️ **รอบก่อน (MEXICANOSLOT) เป็น fef6fb = ขาวอมชมพูที่จางกว่านี้**
// — ให้เปิด bg.json อ่านทุกรอบ ห้ามสืบทอดค่าข้ามรอบ
// ⚠️ และหมึกรอบนี้เป็น **อินดิโกม่วงจม (B>R>G)** ต่างจากรอบก่อนที่เป็นเอสเพรสโซ
// อมแดง (R>G>B) อ่านมาจากอาร์ตเวิร์กที่เป็น **เวิร์ดมาร์กสามมิติผิวโครเมียมไล่
// ฟ้าอิเล็กทริก→ม่วง→แมเจนต้า ตัดขอบขาว บนฉากสตูดิโอขาว-ไลแลคที่มีตู้สล็อต 777
// ม่วงใส ชิปคาสิโนแมเจนต้า เชอร์รี่ชมพู เพชรม่วง และลำแสงนีออนทแยง**
//
// ทิศของธีมรอบนี้ (อ่านให้จบก่อนแตะไฟล์ไหน):
//   พื้นเพจ  — #f8e6f9 (จาก bg.json) ไลแลคอมชมพูจาง **สว่างมาก**
//   ผิวเนื้อหา — #ffffff (การ์ด) / #f6edfe (ยก ชิป) / #ece0fb (wash)
//               / #dcc6f4 (เส้นอ่อน) / #9a6fd0 (เส้นเข้ม)
//   ผิวโครม  — **#190b3d (ฐาน) / #271257 (ยก) / #100626 (ลึก) / #5b2f9e (เส้น)
//               / #f3e8ff (หมึกบนโครม) / #c0a6e8 (หมึกรองบนโครม)** ← **เข้ม**
//   ฮิวนำ    — **ไวโอเลตนีออน #7a1bd6** คู่รอง **ฟ้าอิเล็กทริก #2b3fd9**
//               และ **แมเจนต้า #c2178b** (ทั้งสามค่าถือตัวอักษรบนขาวได้)
//               ส่วน #f23bb4 #bb6dff #7aa7ff เป็น **ตกแต่งเท่านั้น**
//   หมึก     — #241046 (ค่านี้) · หมึกรอง #6b4a86 · **หัวข้อ/strong/ลิงก์ #5411c4**
//   ไฮไลต์บนโครมเข้ม — #f23bb4 (5.2:1) / #bb6dff (5.8:1) / #7aa7ff (7.6:1)
//                      / #f3e8ff (15.4:1) / #c0a6e8 (8.6:1)
// ⚠️⚠️ **โครมกับเนื้อหาอยู่คนละทิศ (โครมเข้ม เนื้อหาสว่าง)** อาร์ตเวิร์กรอบนี้เป็น
// ฉากนีออนอิ่มสีที่มีทั้งฟ้า ม่วง แมเจนต้า และเงาเข้ม โครมอินดิโกจึงทำหน้าที่เป็น
// "กรอบโปสเตอร์" ไม่ใช่แถบดำแปลกปลอม **ห้าม "แก้" ให้โครมสว่างตามพื้นเพจ**
// ⚠️⚠️ **ผลที่ตามมา: บล็อก <address> ใน footer paste verbatim ตาม SKILL.md ได้
// ตามปกติ** (border-white/15 + bg-black/20 + ตัวอักษร inherit) เพราะ footer รอบนี้
// เป็นผิวเข้ม — **ห้ามใส่เฮกซ์ของแบรนด์ลงในบล็อกนั้น**
//
// 🚨🚨 **กับดักที่แหลมที่สุดของรอบนี้: ไล่เฉดฟ้า→ม่วง→แมเจนต้าของอาร์ตเวิร์ก
// คร่อมสามตระกูลที่เป็นฮิวนำของแบรนด์ก่อนๆ พร้อมกัน**
// (ฟ้า = โบ๊ะบ๊ะ168 · ชมพู/แมเจนต้า = okkub88 · ม่วง = KMD88)
// → **"เจอฟ้า/ชมพู/ม่วง ≠ เป็นของรอบนี้"** ต้องเทียบทีละค่าให้ตรงหกหลัก
// กับ .claude/brand-spec-zane96.md §2 ห้ามตัดสินด้วยสายตา
//   ⚠️⚠️ คู่ที่ใกล้ที่สุดและต้องสงสัยว่า "พิมพ์ผิด" ก่อนเสมอ:
//     7505cc (KMD88) ↔ #7a1bd6 (ฮิวนำรอบนี้) · b453ff (KMD88) ↔ #bb6dff
//     d91a73 (okkub88) ↔ #c2178b · fb439b / fc4da1 (okkub88) ↔ #f23bb4
//     9c0f55 / 85094a (okkub88 — **ค้างอยู่ในไฟล์ตระกูล Neumorphism ทุกตัวที่รอบนี้
//       หยิบมาใช้**) ↔ #5411c4 · 60a5fa (default cyber) ↔ #7aa7ff
//     1d4fd8 (นาซ่า168) ↔ #2b3fd9
// ชมพู/แมเจนต้าของแบรนด์เก่าที่ต้องกวาดออก: ffd6fa fff4fb ffe3f5 ffe9f7 f9b2d9
//   f479b9 f4a7cf 6a0f3c 95486b 9c0f55 fb439b fc74b5 ffc2e2 d91a73 b01160 85094a
//   fd6cb2 fc7cba fc4da1 (okkub88) · fa539c c2185b 8e0f41 fb8cc0 fdc6c3 ffd1cd
//   f7bcd9 ef8dbd ffe5ff fff0f8 ffeef7 3b0b26 54123a 7a2350 ffe9f5 7a4463 (หมูบิน168)
//   · fa63b9 ffb3de (ถอนชัวร์168) · f5469f ff8dc6 8c0f52 (มีโชค168)
//   · dd1b74 a4186b 4a0d35 2d0720 (มีทรัพย์168) · f41571 ff5ca8 (PUNPRO168)
// ฟ้า/ไซแอน/น้ำเงินของแบรนด์เก่า: 00bfff 12b4ef b6e3f0 7fcbe8 4fb8ea 06283f 0b4a73
//   2a87c4 eaf7ff f0faff e4f6fb 355f7d 0f5684 1a6ea8 (โบ๊ะบ๊ะ168) · 1fd8f0 0bb6d4
//   8fd9ec 1d4fd8 143aa0 e6edf8 33455f 121722 1b2434 273449 (นาซ่า168) · 18a5e2
//   0d6b9b 0a5176 a9d7f2 111a3f 202a66 e9f1ff adc0e4 dbe6ff (ร่ำรวย168) ·
//   2cc3fc 6bdcfb (สบาย168) · 32bcfb a9e9ff (นินจา168) · 039cfa 0494f5 (รวยแทร่168)
//   · 2f9ff5 a8dcff (สบายเบท168) · 0360f3 0292fb 6ec8ff (TSDET911) ·
//   00f3ff e0ffff 60a5fa 4b5563 030712 1f2937 (default ของ variant cyber-neon/dark)
// ม่วงของแบรนด์เก่า: 7e22ce d946ef a855f7 (CEO66) · 7505cc b453ff c07cff d9b8ff
//   3a0565 (KMD88)
// 🚨 แดง/ทอง/ครีมของ **MEXICANOSLOT รอบก่อน** ที่ต้องกวาดออกให้หมด: de2b1e f2a033
//   a81410 c81e12 9d140c 6f0e08 3f130d 80453a 2b100a 431a10 1d0a06 8c3a22 fdeee2
//   e8c6ae fed7b5 fec28d f6c4a4 e2855c fde4d3 fff3ea fef6fb 117a41 2bb061 f2543f
// (เขียนเฮกซ์เก่าแบบไม่มี # เพื่อไม่ให้ sweep ที่ไล่หาสีแบรนด์เก่าสะดุดที่คอมเมนต์นี้)
//
// ⚠️ รอบนี้ **ไม่มีแดง/ทอง/เหลือง/ส้ม/ครีม/เทาเงิน เป็นสี UI เลยสักเฉด**
// — ผิวเมทัลลิกของชุดนักแสดง ไม้เชอร์รี่ และสีผิวในอาร์ตเวิร์กเป็น **วัตถุในภาพ**
// (ค่า dominant ที่ palette.json วัดได้จาก banner1 เป็นขาว fcfcfd / f5f5fa และจาก
// slide1 เป็นขาว fefefe ซึ่งคือ **ฉากสตูดิโอสว่างในภาพ ไม่ใช่พื้นเพจ** พื้นเพจมาจาก
// bg.json = #f8e6f9 เท่านั้น palette.json จัดอันดับให้ แต่ไม่ได้ตีความให้ —
// ค่าที่เอามาใช้คือ **vivid**: logo.webp ได้ 013384 021c70 020a81 (น้ำเงินลึก)
// คู่กับ fae4fe fb9ce6 (ชมพู) และ slide1.png ได้ fcd4fd fce3fd fcdbfc
// = **ไล่น้ำเงิน→ชมพูคือฮิวนำจริง** ค่าดิบพวกนั้นสุดขั้วเกินไปสำหรับ UI
// จึงแปลงเป็น #2b3fd9 / #7a1bd6 / #c2178b ตามตารางด้านบน)
// เขียวที่เป็นสีเชิงความหมายมีสองที่และ **ห้ามเปลี่ยน**: LINE green #00B900 ของปุ่ม
// LINE และเขียว success ของฟีดถอนเงิน — **สองชุดนี้ไม่ใช่สีของแบรนด์ไหน**
//
// ค่าคอนทราสต์ที่ตรวจแล้ว:
//   #241046 (ค่านี้) บนการ์ดขาว 16.8:1 · บนพื้นเพจ #f8e6f9 14.1:1 · บน #f6edfe 16.0:1
//           — **ถือตัวอักษรได้ทุกบริบทสว่าง**
//   #6b4a86 บนการ์ดขาว 7.1:1 — หมึกรอง
//   #5411c4 บนการ์ดขาว 9.3:1 · บนพื้นเพจ 7.8:1
//           — **หัวข้อ ลิงก์ และ <strong> ในเนื้อความบนผิวสว่าง**
//   #7a1bd6 7.1:1 · #2b3fd9 7.5:1 · #c2178b 5.6:1 บนการ์ดขาว — ถือตัวอักษรได้
// ⚠️⚠️ **#f23bb4 (3.5:1) #bb6dff (3.1:1) #7aa7ff #f8e6f9 #f6edfe #ece0fb #dcc6f4
//      เป็นพื้นถม/ขอบ/ออราบนผิวสว่างเท่านั้น ห้ามถือตัวอักษรบนผิวสว่างเด็ดขาด**
//      และ #9a6fd0 เป็น **เส้น/ขอบ** เท่านั้น
// ⚠️⚠️ **ขาวบนพื้นเพจ #f8e6f9 ได้แค่ 1.2:1** — ข้อความที่วางบนพื้นเพจตรงๆ โดยไม่มี
//      การ์ดรองต้องเป็นหมึกเข้มเท่านั้น
// **ปุ่ม CTA หลักคือพื้นไล่เฉด #5411c4 -> #8e14b8 -> #c2178b + หมึกขาว #ffffff**
//   คอนทราสต์ต่อ stop: 9.3:1 / 7.2:1 / 5.6:1
//   ⚠️⚠️ **ห้ามใช้ #f23bb4 #bb6dff หรือ #7aa7ff เป็น stop ของปุ่มที่ถือหมึกขาว**
//   สามค่านั้นสงวนไว้สำหรับ **ขอบ/ออรา/พื้นถม** เท่านั้น
// **ปุ่มรองคือพื้นไล่เฉดขาว #ffffff -> #ece0fb + หมึก #241046** (16.8 / 12.6:1)
// **ปุ่ม outline คือขอบ #5411c4 ตัวอักษร #5411c4 บนผิว #ffffff** (9.3:1)
// (navbar/footer/ticker ประกาศสีตัวอักษรของตัวเองไว้ครบ ค่านี้จึงไปไม่ถึงมัน)
export const BRAND_TEXT = "#241046";

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
