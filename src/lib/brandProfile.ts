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

// รอบนี้ (123BET 2026-10-28) หมุนออกจาก google-sans ของรอบก่อน (ZORO365)
// กลับไปเป็น kanit — การสลับไปมาทุกรอบคือสิ่งที่ตัดลายนิ้วมือข้ามแบรนด์ชุดนั้น
// ลงครึ่งหนึ่ง ไม่ใช่การเลือกว่าฟอนต์ไหน "ดีกว่า" ทั้งสองตัว self-host เหมือนกัน
// ไม่มี request ออกนอกโดเมน
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
//
// รายละเอียดเต็มของรอบนี้ (พาเลต · variant · checklist · คำที่ห้ามใช้ ·
// ชุดเฮกซ์ของแบรนด์เก่าที่ต้องกวาดออก) อยู่ที่ .claude/brand-spec-123bet.md
// ไฟล์นี้เก็บเฉพาะสิ่งที่ "ต้องรู้ตอนแตะค่าสามตัวนี้" เท่านั้น
//
// ชื่อที่เห็นบนเว็บรอบนี้คือ 123BET — **ตัวเลข 123 ติดกับตัวละตินพิมพ์ใหญ่ BET
// เป็นคำเดียว ไม่มีเว้นวรรค ไม่มีขีดกลาง** ห้าม 123Bet / 123bet / "123 BET" /
// "123-BET"
// รอบนี้คำสั่ง operator กับบรีฟตรงกัน: src/assets/content.txt เขียนโทเค็น
// "123BET" ทุกบรรทัด และ operator สั่งมาตรงๆ ว่า rebrand to "123BET" +
// real url "https://123bet-play.net"
// → ถึงจะตรงกันก็ยัง **ห้ามพิมพ์ชื่อแบรนด์เป็นตัวอักษรตรงๆ ในโค้ด** ทุกที่ต้อง
// interpolate BRAND_NAME เหมือนเดิม
//
// ⚠️⚠️ **ชื่อแบรนด์ไม่มีขีดและไม่มีคำว่า play แต่โดเมนมีทั้งคู่**
// (123bet-play.net) สองค่านี้คนละตัวกัน และ **ที่มาคนละทางกันเสมอ**:
//   iconSlug    = "123bet"      มาจาก BRAND_NAME ผ่าน [^a-z0-9]
//   worker name = "123bet-play" มาจาก SITE.hostname.split(".")[0]
// รอบก่อนๆ (zoro365 / zoro365-slot · teva69 / teva-69) ก็ไม่ตรงกันเช่นกัน แต่
// ด้วยเหตุผลคนละอย่าง — **อย่าสรุปจากรอบใดรอบหนึ่งว่าสองค่านี้สัมพันธ์กันอย่างไร**
// ถ้า operator ไม่ได้ระบุโดเมนมาในคำสั่ง **ห้ามเดาจากชื่อแบรนด์เด็ดขาด**
// โดเมนรอบนี้เป็น **ASCII ล้วน ไม่ต้องแปลง punycode**
//
// ⚠️⚠️ **อาร์ตเวิร์กทุกใบพิมพ์คำว่า 123BET อยู่บนรูปจริง** (โลโก้ แบนเนอร์
// สไลด์ทั้งสอง) นั่นคือข้อเท็จจริงของรูป แต่เวลาเขียน alt ให้บรรยาย **รูปทรงของ
// เวิร์ดมาร์ก** แล้วอ้างชื่อด้วยค่าคงที่นี้
// อาร์ตเวิร์กของดรอป 2026-10-28: **เวิร์ดมาร์กสามมิติ ครึ่งแรกเป็นตัวเลขผิว
// แดงชาดเคลือบเงาตัดขอบทอง ครึ่งหลังเป็นตัวอักษรละตินผิวโครเมียมเงินขัดเงา
// เหนือขึ้นไปเป็นมงกุฎเงินประดับกำมะหยี่แดงและอัญมณีแดง ทั้งชุดวางบนโล่ผิว
// โครเมียมเงินที่มีเพชรแดงที่ปลายล่าง**
//
// ⚠️⚠️ **แกนของแบรนด์รอบนี้คือ "เว็บเกมคาสิโนออนไลน์"** — บรีฟเรียกตัวเองว่า
// "เจ้าของบาคาร่าสล็อต เว็บตรง ถูกลิขสิทธิ์" และระบุ **เจ็ดหมวดเกม**:
// **บาคาร่า · สล็อตออนไลน์ · ไฮโล · รูเล็ต · ยิงปลา · เดิมพันฟุตบอล · หวยออนไลน์**
// (รอบก่อนมีห้าหมวด — **ห้ามสืบทอดลิสต์ข้ามรอบ**)
// ⚠️⚠️ **"หวย" รอบนี้เป็นแค่ "หนึ่งในเจ็ดหมวดเกม" ไม่ใช่แกนของเว็บ**
// บรีฟไม่มีคำว่า สลาก / งวด / เลขเด็ด / ลอตโต้ / โพย / รอบปิดรับ เลยสักคำ
// → **/ตรวจหวย กับ /แนวทาง ยังอยู่ใน src/pages-disabled/ ต่อไป** และ
// navbar + footer ที่ใช้งานอยู่ **ต้องไม่มีลิงก์ของสองหน้านั้น**
// ⚠️⚠️ **บรีฟรอบนี้ไม่มีหมวดฝากถอน/ธนาคาร/วอลเลทเลยสักคำ** (เหมือนสามรอบก่อน)
// → **ห้าม render BankStrip** แต่ **มีหมวดโปรโมชั่นเต็มหัวข้อพร้อม H3 ย่อยสองอัน**
// **อย่าสืบทอดคำอนุญาตหรือข้อห้ามข้ามรอบโดยไม่เปิดบรีฟดู**
//
// 🚨🚨 **สามคำนี้กลับทิศจากรอบก่อน** — spec ของ ZORO365 ห้ามไว้ในฐานะคำของ TEVA69
// แต่รอบนี้ทั้งสามคำเป็น **ถ้อยคำของบรีฟเอง** (content.txt บรรทัด 1-3):
// **"ปลอดภัยในไทย" · "ถูกลิขสิทธิ์" · "เว็บตรง"** — **ห้ามลบออกเพราะไปอ่าน
// คอมเมนต์เก่าในไฟล์ inventory แล้วเข้าใจผิด**
// ❌ คำของ **ZORO365 รอบก่อนทันที (แบรนด์ขาออก เสี่ยงหลงเหลือสูงสุด)** คือ
// "ZORO365" / "เกมคาสิโนสายตรง" / "แทงได้เท่าไหร่" / "เว็บจ่ายเต็ม" / "ไม่มีโกง" /
// "ไม่ผ่านเว็บตัวแทน" — **ห้ามเขียนกลับเข้ามา**
// 🚨 **ภาษาภาพของ ZORO365 ก็ห้ามหลุดกลับมา**: ห้องสไตล์ญี่ปุ่น · กอไผ่ ·
// ดอกไม้ขาว · กิโมโนลายดอกไม้เขียว-ขาว · ดาบคาทานะ · วงพู่กันหมึกดำ-เขียว ·
// ชิปคาสิโนเขียว-ขาว · ควันเขียวเรืองแสง
// ⚠️ **ชิปคาสิโนและมงกุฎทองมีจริงในดรอปนี้ด้วย** แต่คนละชุด — รอบนี้เป็น
// **ชิปแดง-ขาว** และ **มงกุฎทองประดับอัญมณีแดงที่นางแบบสวม** ในฉาก
// **โถงวังหินอ่อนสีงาช้าง** ไม่ใช่ห้องญี่ปุ่นของรอบก่อน — บรรยายตามที่เห็นจริง
// ❌ ชื่อและคำของแบรนด์เก่ากว่านั้นที่ห้ามหลุดเช่นกัน (ลิสต์เต็มใน brand-spec §5):
// TEVA69 · LOTTO189 · ZANE96 · ZNOVA168 · MEXICANOSLOT · okkub88 · JEDI66 ·
// KINGKONG555 · สาธุ168 · 888PARUAY · KOON234 · รวยเทพ168 (เจ้าของเดิมของ
// NavbarPremium) · โบ๊ะบ๊ะ168 · หมูบิน168 · สล็อต168 · นาซ่า168 · มาดาม168 ·
// เงินทอง168
// 🚨🚨 **LOTTO189 ใกล้ตัวที่สุดรอบนี้** เพราะเป็นแบรนด์ แดง/ทอง/ขาวชมพู
// ตระกูลสีเดียวกับรอบนี้เป๊ะ — **ห้ามตัดสินด้วยสายตา ต้องเทียบให้ตรงหกหลัก**
// ตัวเลขที่ใช้ได้รอบนี้มีแค่ **0.3% · 0.8% · 3 ขั้นตอน · 24 ชั่วโมง**
// ⚠️ **ไม่มีจำนวนสมาชิก ไม่มีปีก่อตั้ง ไม่มี 100% ไม่มีค่า RTP เป็นตัวเลข
// ไม่มีจำนวนค่าย/เกม และไม่มียอดขั้นต่ำเป็นตัวเลข**
//
// หน้าเว็บไม่พิมพ์ชื่อแบรนด์ตรงๆ เลยสักที่ แต่ interpolate ค่านี้ ค่านี้ไปโผล่ใน
// og:site_name, JSON-LD, terms/privacy และ <address>
export const BRAND_NAME = "123BET";

// ── สีตัวอักษรเริ่มต้นของทั้งเว็บ ──────────────────────────────────────────
// สลับบรรทัดเดียวนี้ตอนรีแบรนด์ เหมือนสองตัวข้างบน ใส่สีเนื้อความหลักของแบรนด์
// (ตัวเดียวกับที่ ContentBox ที่ใช้อยู่ใส่ให้ย่อหน้า) ไม่ใช่สีหัวข้อหรือสีเน้น
//
// ทำไมต้องมี: ไม่มีที่ไหนในเว็บตั้งสีตัวอักษรให้ body เลย — global.css ตั้ง
// font/focus ring แต่ไม่ตั้งสี ส่วนบล็อก is:global ใน MainLayout ตั้งแค่
// background-color ผลคือ element ไหนที่ลืมใส่คลาสสีจะตกไปใช้ค่า default ของ
// เบราว์เซอร์ หน้า terms/privacy/404 เป็นไฟล์ถาวรที่ไม่มีสีของแบรนด์ไหนเขียนอยู่
// ข้างในโดยตั้งใจ จึงพึ่งบรรทัดนี้ทั้งหมด
// MainLayout เอาค่านี้ไปใส่เป็น inline style บน <html> ให้ทุกอย่าง inherit
// ต่อกันลงมา — คลาส text-[#...] ที่ component เขียนเองยังชนะเสมอ เพราะการ
// ประกาศตรงตัวชนะการ inherit อยู่แล้ว ค่านี้จึงเป็น "พื้น" ไม่ใช่การบังคับ
//
// 🚨🚨 **123BET กลับทิศ 180° จากรอบก่อน: รอบนี้ "เนื้อหาสว่าง + โครมเข้ม"**
// รอบก่อน (ZORO365) **มืดทั้งเว็บ** ค่านี้จึงเป็นหมึกสว่าง
// **รอบนี้เนื้อหาเป็นผิวสว่าง** ค่านี้จึงเป็น **หมึกเข้ม**
// เหตุผล: bg.json ของดรอปนี้เป็น mode color + color **#f7e4e9**
// = **ชมพูบลัชจาง** และ bg.json คือแหล่งเดียวของพื้นเพจ
// ⚠️ **รอบก่อนเป็น 002908 = เขียวป่าจมเกือบดำ ซึ่งเป็นคนละปลายของสเกลความสว่าง**
// — ให้เปิด bg.json อ่านทุกรอบ **ห้ามสืบทอดค่าข้ามรอบ**
// ⚠️⚠️ **ห้ามคงผิวเข้ม 073c1a / 031b09 / 002908 ของรอบก่อนไว้แม้แต่ที่เดียว** —
// บนธีมสว่างรอบนี้ = หลุมดำกลางหน้าสว่าง
//
// ทิศของธีมรอบนี้ (อ่านให้จบก่อนแตะไฟล์ไหน):
//   พื้นเพจ   — **#f7e4e9 (จาก bg.json) ชมพูบลัชจาง**
//   ผิวเนื้อหา — **#fdf5f6 (การ์ด) / #f7dfe4 (ชั้นยก ชิป) / #eec3cc (เส้นบาง)
//               / #d98fa0 (ขอบตกแต่ง ออรา)**
//   ผิวโครม   — **#330710 (ฐาน navbar footer) / #1c050b (ลึกสุด) / #4d0c18 (ชั้นยก)**
//   ฮิวนำ     — **แดงชาด #a30d1a** คู่ **เงินโครเมียม #d2d7dd** และ
//               **ทองอำพัน #dca53a** (สองตัวหลังใช้บนผิวโครมเข้ม)
//   หมึก      — **#36080f (ค่านี้)** · หมึกรอง **#6b2b33** · ทองเข้ม **#7a4a0c**
//   ⚠️ **#eec3cc (1.5:1) #d98fa0 (2.3:1) #ef4a5e เป็นเส้น/ออรา/พื้นถมเท่านั้น
//       ห้ามถือตัวอักษรทุกบริบท**
//
// ค่าคอนทราสต์ที่ตรวจแล้ว (เทียบบนการ์ด #fdf5f6 และบนพื้นเพจ #f7e4e9):
//   #36080f (ค่านี้) บนการ์ด 16.3:1 · บนพื้นเพจ 14.4:1 — **ถือตัวอักษรได้ทุกบริบท**
//   #6b2b33 บนการ์ด 9.7:1 · บนพื้นเพจ 8.5:1 — หมึกรอง
//   #a30d1a บนการ์ด 7.4:1 · บนพื้นเพจ 6.6:1 — **หัวข้อ ลิงก์ และ strong**
//   #7a4a0c บนการ์ด 7.0:1 · บนพื้นเพจ 6.1:1 — ทองเข้ม เน้นรอง
// บนผิวโครม #330710: #fdf5f6 16.6:1 · #d2d7dd 12.3:1 · #dca53a 8.1:1
// **ปุ่ม CTA หลักคือพื้นไล่เฉด #8a1420 -> #a30d1a -> #c21325 + หมึกขาว #ffffff**
//   คอนทราสต์ต่อ stop: 9.5:1 / 8.0:1 / 6.2:1 — ผ่าน AA ทุก stop
//   ⚠️⚠️ **ห้ามลากปลายเฉดสว่างกว่า #c21325** (เกินกว่านั้นขาวตกต่ำกว่า 4.5:1)
// **ปุ่มรองคือพื้นไล่เฉด #fdf5f6 -> #f7dfe4 + หมึก #a30d1a + ขอบ #d98fa0**
// **ปุ่ม outline คือขอบ #a30d1a ตัวอักษร #a30d1a บนผิว #fdf5f6**
// ⚠️⚠️ **ผลที่ตามมา: บล็อก address ใน footer ยัง paste verbatim ตาม SKILL.md ได้
// ตามปกติ** (border-white/15 + bg-black/20 + ตัวอักษร inherit) เพราะ **footer
// รอบนี้เป็นผิวเข้ม** — **ห้ามใส่เฮกซ์ของแบรนด์ลงในบล็อกนั้น**
//
// 🚨🚨 **กับดักที่แหลมที่สุดของรอบนี้: spec ของสามรอบก่อนเขียนไว้ทุกไฟล์ว่า
// "รอบนี้ไม่มีแดงเป็นสี UI เลยสักเฉด" — รอบนี้กลับทิศเต็มๆ แดงชาดคือฮิวนำ**
// คอมเมนต์เก่าในไฟล์ inventory ที่ห้ามแดงไว้ **เป็นของรอบก่อน ไม่ใช่ของรอบนี้**
// → ที่ห้ามคือ **ค่าเฮกซ์ของแบรนด์เก่าแบบตรงหกหลัก** ไม่ใช่ "สีแดง" ในฐานะตระกูลสี
// 🚨🚨 และเพราะรอบนี้เป็นแบรนด์ แดง/ทอง/ขาวชมพู **LOTTO189 จึงเป็นแบรนด์ที่
// ใกล้ตัวที่สุด** (ตระกูลสีเดียวกันเป๊ะ) → **"เจอแดง ไม่ได้แปลว่าเป็นของรอบนี้"**
// ต้องเทียบทีละค่าให้ตรงหกหลักกับ .claude/brand-spec-123bet.md §2 ห้ามใช้สายตา
//   ⚠️⚠️ คู่ที่ใกล้ที่สุดและต้องสงสัยว่า "พิมพ์ผิด" ก่อนเสมอ:
//     a81410 (MEXICANOSLOT) / c1071b b00718 (LOTTO189) / a00203 b00d11 ↔ #a30d1a
//     c20305 c9102f / c81e12 (MEXICANOSLOT) / c23400 (ZNOVA168) ↔ #c21325
//     7e1221 8a0412 (LOTTO189) / 8a0608 8e1a16 ↔ #8a1420
//     3d0d16 25090f 24060c (LOTTO189) / 2a0b0e 1a0709 ↔ #36080f #330710 #1c050b
//     6e3b44 (LOTTO189) / 7a4463 / 80453a (MEXICANOSLOT) ↔ #6b2b33
//     7a3a0c 6a4a30 (ZNOVA168) / 9f600d b07d08 ↔ #7a4a0c
//     e0b03a e3bb45 (TEVA69) / e9b53c (LOTTO189) / e3a712 d4922c ↔ #dca53a
//     cfd6e3 c3ccd6 (LOTTO189) / c6cfd2 (TEVA69) / d8dde6 e8eaee ↔ #d2d7dd
//     fef6fb (MEXICANOSLOT) / fff4fb fff0f8 ffeef7 / fdc6c3 ↔ #fdf5f6
//     ffe4e6 ffd4d7 ffeaea f5b9bd f0bcbc (LOTTO189) ↔ #f7e4e9 #f7dfe4
//     f7bcd9 ef8dbd / e2855c (MEXICANOSLOT) / f4a7cf ↔ #eec3cc #d98fa0
//     ff5a5f ff5f63 / f2543f (MEXICANOSLOT) / ff2e52 fb1b32 ↔ #ef4a5e
// 🚨🚨 ชุดเฮกซ์เต็มของทุกแบรนด์ที่ต้องกวาดออกอยู่ใน
//   .claude/brand-spec-123bet.md §2 — **ไม่ซ้ำลงที่นี่โดยตั้งใจ** ลิสต์เดียว
//   ที่อัปเดตที่เดียวย่อมไม่มีทางหลุดกันเอง ตัวที่เสี่ยงสูงสุดสามอันดับแรกคือ
//   **ZORO365 (ขาออกทันที) · LOTTO189 (ตระกูลสีเดียวกัน) · MEXICANOSLOT (แดง/ทอง)**
//   และสองไฟล์ที่หยิบมาใช้รอบนี้ยังมีสีเจ้าของเดิมติดมาเต็มไฟล์:
//   **LatestWinners2 (ชมพู/แมเจนต้า okkub88)** และ
//   **ContentBox3ThreePremium (ฟ้า 0f5684 / 12b4ef)**
// (เขียนเฮกซ์เก่าแบบไม่มี # เพื่อไม่ให้ sweep ที่ไล่หาสีแบรนด์เก่าสะดุดที่คอมเมนต์นี้)
//
// เขียวที่เป็นสีเชิงความหมายมีสองที่และ **ห้ามเปลี่ยน**:
// LINE green #00B900 ของปุ่ม LINE และเขียว success ของฟีดถอนเงิน
// — **สองชุดนี้ไม่ใช่สีของแบรนด์ไหน และรอบนี้แบรนด์เป็นแดง จึงไม่มีเหตุผลใดๆ
// ที่จะเปลี่ยนมันเป็นแดงตามพาเลต**
// (navbar/footer/ticker ประกาศสีตัวอักษรของตัวเองไว้ครบ ค่านี้จึงไปไม่ถึงมัน)
export const BRAND_TEXT = "#36080f";

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
