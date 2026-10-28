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

// รอบนี้ (LOTTOPLUS 2026-10-28) หมุนออกจาก google-sans ของรอบก่อน (WIN8S) ไปเป็น
// kanit — การสลับไปมาทุกรอบคือสิ่งที่ตัดลายนิ้วมือข้ามแบรนด์ชุดนั้นลง
// ครึ่งหนึ่ง ไม่ใช่การเลือกว่าฟอนต์ไหน "ดีกว่า" ทั้งสองตัว self-host เหมือนกัน
// ไม่มี request ออกนอกโดเมน
// ผลข้างเคียงที่ตั้งใจ: แบรนด์นี้จะ ship @font-face + preload ชุด
// /fonts/kanit-v17-latin_thai-*.woff2 และจะ **ไม่** ship ชุด
// /fonts/google-sans-v70-*.woff2 ของรอบก่อนเลยสักไฟล์ — และต้องสลับกลับอีกรอบหน้า
// (รอบก่อน WIN8S = google-sans · รอบนี้ LOTTOPLUS = kanit)
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
// ชุดเฮกซ์ของแบรนด์เก่าที่ต้องกวาดออก) อยู่ที่ .claude/brand-spec-lottoplus.md
// ไฟล์นี้เก็บเฉพาะสิ่งที่ "ต้องรู้ตอนแตะค่าสามตัวนี้" เท่านั้น
//
// ชื่อที่เห็นบนเว็บรอบนี้คือ LOTTOPLUS — **ตัวละตินพิมพ์ใหญ่ LOTTO ติด PLUS
// เป็นคำเดียว เก้าเคอแรกเตอร์ ไม่มีเว้นวรรค ไม่มีขีดกลาง** ห้าม LottoPlus /
// lottoplus / "LOTTO PLUS" / "LOTTO-PLUS"
// รอบนี้คำสั่ง operator กับบรีฟตรงกัน: src/assets/content.txt เขียนโทเค็น
// "LOTTOPLUS" ทุกบรรทัด และ operator สั่งมาตรงๆ ว่า rebrand to "LOTTOPLUS" +
// real url "https://huay-lottoplus.co"
// → ถึงจะตรงกันก็ยัง **ห้ามพิมพ์ชื่อแบรนด์เป็นตัวอักษรตรงๆ ในโค้ด** ทุกที่ต้อง
// interpolate BRAND_NAME เหมือนเดิม
// ⚠️ บรีฟเขียนชื่อไทยคู่กันว่า **หวยพลัสลอตโต้** — นั่นเป็นคำในเนื้อหา ไม่ใช่
// ค่าของ BRAND_NAME ห้ามเอามาใส่ตรงนี้
//
// ⚠️⚠️ **รอบนี้ iconSlug กับ worker name ไม่ตรงกัน** (รอบก่อน WIN8S ดันตรงกัน
// พอดีซึ่งเป็นเรื่องบังเอิญ — อย่าสรุปจากรอบนั้นว่าสองค่านี้ผูกกัน):
//   iconSlug    = "lottoplus"      มาจาก BRAND_NAME ผ่าน [^a-z0-9]
//   worker name = "huay-lottoplus" มาจาก SITE.hostname.split(".")[0]
// **ที่มาคนละทางกันเสมอ** — name มาจากโดเมน ไม่เคยมาจากชื่อแบรนด์
// ถ้า operator ไม่ได้ระบุโดเมนมาในคำสั่ง **ห้ามเดาจากชื่อแบรนด์เด็ดขาด**
// โดเมนรอบนี้เป็น **ASCII ล้วน ไม่ต้องแปลง punycode** และ **TLD เป็น `.co`**
// (ไม่ใช่ `.com` — ต่างกันหนึ่งตัวอักษรและ site: ต้องตรงเป๊ะ)
//
// ⚠️⚠️ **อาร์ตเวิร์กทุกใบพิมพ์คำว่า LOTTOPLUS อยู่บนรูปจริง** (โลโก้ แบนเนอร์
// สไลด์ทั้งสอง og) นั่นคือข้อเท็จจริงของรูป แต่เวลาเขียน alt ให้บรรยาย
// **รูปทรงของเวิร์ดมาร์ก** แล้วอ้างชื่อด้วยค่าคงที่นี้
// อาร์ตเวิร์กของดรอป 2026-10-28: **เวิร์ดมาร์กสามมิติสองบรรทัด บรรทัดบนเป็นผิว
// โครเมียมเงินขัดเงาตัดขอบเข้ม โดยตัว O ตัวที่สองถูกแทนด้วยใบโคลเวอร์สี่แฉก
// สีเขียวมรกต บรรทัดล่างเป็นผิวเขียวมรกตไล่เงา วางอยู่ในวงรีแถบโครเมียม-เขียว
// ที่พันรอบเป็นวงโคจรพร้อมประกายแสง** ฉากของแบนเนอร์คือ **ห้องโทนขาวงาช้าง
// มีหญิงสาวในชุดไทยสีเขียวมรกตปักทอง เครื่องประดับทองและมรกต ดอกลีลาวดีขาว
// ยอดปรางค์ทอง และลูกบอลหวยเขียว-ขาวที่มีตัวเลข**
//
// ⚠️⚠️ **แกนของแบรนด์รอบนี้คือ "เว็บหวยออนไลน์" (lottery)** — บรีฟเรียกตัวเองว่า
// "หวยพลัสลอตโต้ ทางเข้าเว็บแม่ แทงหวยออนไลน์" และระบุ **สี่ประเภทหวยเท่านั้น**:
// **หวยรัฐบาลไทย · หวยลาว · หวยฮานอย · หวยหุ้น**
// 🚨🚨 (รอบก่อน WIN8S เป็น **คาสิโน/บาคาร่า** — **ห้ามสืบทอดลิสต์ข้ามรอบเด็ดขาด**)
// ❌ **สล็อต / บาคาร่า / คาสิโนสด / ไฮโล / รูเล็ต / ยิงปลา / เดิมพันฟุตบอล
// ไม่มีในบรีฟรอบนี้เลยสักคำ ห้ามเขียนลงเว็บ**
// → **/ตรวจหวย กับ /แนวทาง ย้ายเข้า src/pages/ แล้วรอบนี้** (แบรนด์หวย) และ
// navbar + footer ที่ใช้งานอยู่ **ต้องมีลิงก์ของสองหน้านั้น**
// ⚠️⚠️ **บรีฟรอบนี้ไม่มีหมวดฝากถอน/ธนาคาร/วอลเลท และไม่มีหมวดโปรโมชั่นเลยสักคำ**
// → **ห้าม render BankStrip** และ **ห้ามเขียนคืนยอดเสีย/แนะนำเพื่อนเป็น %**
// **อย่าสืบทอดคำอนุญาตหรือข้อห้ามข้ามรอบโดยไม่เปิดบรีฟดู**
//
// 🚨🚨 **คำที่กลับทิศจากรอบก่อน** — spec ของ WIN8S อนุญาต "เซิร์ฟนอก" /
// "ปลอดภัย100%" / "ลิขสิทธิ์แท้จากเมกา" ในฐานะถ้อยคำของบรีฟรอบนั้น
// **รอบนี้ทั้งสามไม่มีในบรีฟเลย — ห้ามเขียน** ส่วนคำของรอบนี้คือ
// **"ทางเข้าเว็บแม่" · "อัตราจ่ายสูง" · "จ่ายเต็ม" · "โอนไว" · "เลขอั้น" ·
// "รอบปิดรับ" · "สามตัวตรง/สามตัวโต๊ด" · "สองตัวบน/สองตัวล่าง"**
// ❌ คำของ **WIN8S รอบก่อนทันที (แบรนด์ขาออก เสี่ยงหลงเหลือสูงสุด)** คือ
// "WIN8S" / "คาสิโนเล่นบาคาร่า" / "ลิขสิทธิ์แท้จากเมกา" / "เซิร์ฟนอก" /
// "ปลอดภัย100%" / "ไม่หักเปอร์เซ็นต์" / "โบนัสไม่อั้น" / "คืนยอดเสีย 0.3%" /
// "แนะนำเพื่อน 0.8%" — **ห้ามเขียนกลับเข้ามา**
// 🚨 **ภาษาภาพของ WIN8S ก็ห้ามหลุดกลับมา**: ห้องญี่ปุ่นโทนขาวงาช้าง · กิ่งซากุระ
// ชมพู-ขาว · กิโมโนแดง-ดำปักทอง · เสาโทริอิ · มังกร · ชิปคาสิโนดำ-ทอง · ไพ่เอซ ·
// ร่มกระดาษญี่ปุ่น · พัดพับแดง-ขาว
// ⚠️ **หญิงสาวในชุดประจำชาติ ดอกไม้ขาว และเครื่องประดับทองมีจริงในดรอปนี้ด้วย**
// แต่คนละชุด — รอบนี้เป็น **ชุดไทยเขียวมรกตปักทอง** · **ดอกลีลาวดีขาว** ·
// **ยอดปรางค์ทองแบบไทย** · **ลูกบอลหวยเขียว-ขาวมีตัวเลข** ·
// **ใบโคลเวอร์สี่แฉก** — บรรยายตามที่เห็นจริง อย่าเหมารวมจากรอบก่อน
// ❌ ชื่อและคำของแบรนด์เก่ากว่านั้นที่ห้ามหลุดเช่นกัน (ลิสต์เต็มใน brand-spec §5):
// 123BET · ZORO365 · TEVA69 · LOTTO189 · ZANE96 · ZNOVA168 · MEXICANOSLOT ·
// okkub88 · JEDI66 · KINGKONG555 · สาธุ168 · 888PARUAY · KOON234 · รวยเทพ168 ·
// โบ๊ะบ๊ะ168 · หมูบิน168 · สล็อต168 · นาซ่า168 · มาดาม168 · เงินทอง168
// 🚨🚨 **LOTTO189 ใกล้ตัวที่สุดรอบนี้** เพราะเป็น **แบรนด์หวยเหมือนกัน** และตระกูล
// `*Huay` ที่หมุนเข้ามารอบนี้ (NavbarHuay/FooterHuay/AnnouncementHuay/
// LatestWinnersHuay/ContentBox*Huay) เป็นของแบรนด์หวยเจ้าก่อน ซึ่งเป็น
// **แดง/ทอง** — **"เจอคำว่าหวย" ไม่เคยแปลว่าเป็นของรอบนี้ ต้องอ่านให้ครบคำ
// และเทียบสีให้ตรงหกหลัก**
// ตัวเลขที่ใช้ได้รอบนี้มีแค่ **100 · 1,000 · 2 ตัว · 3 ตัว · 3 ขั้นตอน · 24ชม.**
// ⚠️ **ไม่มีจำนวนสมาชิก ไม่มีปีก่อตั้ง ไม่มีค่า RTP เป็นตัวเลข
// ไม่มีจำนวนค่าย/เกม และไม่มียอดขั้นต่ำเป็นตัวเลข**
//
// หน้าเว็บไม่พิมพ์ชื่อแบรนด์ตรงๆ เลยสักที่ แต่ interpolate ค่านี้ ค่านี้ไปโผล่ใน
// og:site_name, JSON-LD, terms/privacy และ <address>
export const BRAND_NAME = "LOTTOPLUS";

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
// 🚨🚨 **LOTTOPLUS กลับทิศ 180° จากรอบก่อนอีกครั้ง: รอบนี้ "สว่างทั้งเว็บ"**
// รอบก่อน (WIN8S) **มืดทั้งเว็บ** ค่านี้จึงเป็นหมึกสว่าง
// **รอบนี้เนื้อหาเป็นผิวสว่างเขียวมินต์** ค่านี้จึงเป็น **หมึกเข้ม**
// เหตุผล: bg.json ของดรอปนี้เป็น mode color + color **#e1fef3**
// = **เขียวมินต์จางเกือบขาว** และ bg.json คือแหล่งเดียวของพื้นเพจ
// ⚠️ **รอบก่อนเป็น 1e0101 = ดำอมเลือดหมู ซึ่งเป็นคนละปลายของสเกลความสว่าง**
// — ให้เปิด bg.json อ่านทุกรอบ **ห้ามสืบทอดค่าข้ามรอบ**
// ⚠️⚠️ **ห้ามคงผิวเข้ม 1e0101 / 2a0a04 / 3b130b / 250604 / 140302 ของรอบก่อนไว้
// แม้แต่ที่เดียวบนการ์ดเนื้อหา** — บนธีมสว่างรอบนี้ = แผ่นดำกลางหน้าสว่าง
// ⚠️⚠️ และ **ห้ามคงหมึกสว่าง fdf0e6 / e0bda4 ไว้** — บนการ์ดขาวรอบนี้ = ตัวอักษรหาย
//
// ทิศของธีมรอบนี้ (อ่านให้จบก่อนแตะไฟล์ไหน):
//   พื้นเพจ   — **#e1fef3 (จาก bg.json) เขียวมินต์จาง**
//   ผิวเนื้อหา — **#ffffff (การ์ด) / #f0fdf7 (การ์ดสำรอง)
//               / #d2f3e4 (พื้นถมอ่อน ชั้นยก ชิป) / #a3ddc3 (เส้นบาง)
//               / #19a97c (ขอบตกแต่ง ออรา) / #2fd49b (ออราสว่าง)**
//   ผิวโครม   — **#052e22 (ฐาน navbar footer ticker) / #03201a (ลึกสุด)
//               / #0a4433 (ชั้นยกบนโครม)**
//   ฮิวนำ     — **เขียวมรกต #046c4e** คู่ **ทองอำพัน #e2b32a** และ
//               **เงินโครเมียม #c8d4d0**
//   หมึก      — **#0d3326 (ค่านี้)** · หมึกรอง **#3f6f5c** · ทองเข้ม **#8a6508**
//   ⚠️ **#a3ddc3 · #d2f3e4 · #19a97c · #2fd49b เป็นเส้น/ออรา/พื้นถมเท่านั้น
//       ห้ามถือตัวอักษรทุกบริบท**
//
// ค่าคอนทราสต์ที่ตรวจแล้ว (เทียบบนพื้นเพจ #e1fef3 และบนการ์ด #ffffff):
//   #0d3326 (ค่านี้) บนพื้นเพจ 12.9:1 · บนการ์ด 13.8:1 — **ถือตัวอักษรได้ทุกบริบท**
//   #3f6f5c บนพื้นเพจ 5.6:1 · บนการ์ด 6.0:1 — หมึกรอง
//   #046c4e บนพื้นเพจ 6.3:1 · บนการ์ด 6.7:1 — **หัวข้อ ลิงก์ และ strong**
//   #8a6508 บนพื้นเพจ 5.0:1 · บนการ์ด 5.4:1 — ทองเข้ม เน้นตัวเลข
//   #19a97c บนการ์ด **3.0:1 — ตกเกณฑ์ ห้ามถือตัวอักษร** เส้น/ออรา/พื้นถมเท่านั้น
//   #e2b32a บนการ์ด **2.0:1 — ตกเกณฑ์** แต่บนโครม #052e22 ได้ 7.4:1 **ผ่าน**
// **ปุ่ม CTA หลักคือพื้นไล่เฉด #0c7c58 -> #046c4e -> #03543c + หมึก #ffffff**
//   คอนทราสต์ต่อ stop: 5.2:1 / 6.7:1 / 9.2:1 **เทียบกับหมึกขาว**
//   🚨🚨 **ห้ามลากปลายอ่อนเกิน #19a97c** (อ่อนกว่านั้นหมึกขาวตกต่ำกว่า 3:1)
//   🚨🚨 **หมึกเข้มบนเฉดนี้ตก — ห้ามใช้ #0d3326 บนปุ่มหลักเด็ดขาด**
// **ปุ่มรองคือผิว #ffffff + หมึก #046c4e + ขอบ #19a97c**
// **ปุ่มทองคือพื้น #e2b32a + หมึก #0d3326 (8.4:1) — ทองเป็นพื้นเท่านั้น ไม่ใช่หมึก**
// ⚠️⚠️ **ผลที่ตามมา: บล็อก address ใน footer ยัง paste verbatim ตาม SKILL.md ได้
// ตามปกติ** (border-white/15 + bg-black/20 + ตัวอักษร inherit) เพราะ **footer
// รอบนี้ยังเป็นผิวเข้ม #052e22** — **ห้ามใส่เฮกซ์ของแบรนด์ลงในบล็อกนั้น**
//
// 🚨🚨 **กับดักที่แหลมที่สุดของรอบนี้: ตระกูล `*Huay` ทั้งชุดที่หมุนเข้ามา
// (NavbarHuay / FooterHuay / AnnouncementHuay / LatestWinnersHuay /
// ContentBoxHuay / ContentBoxTwoHuay / ContentBoxSevenThreeHuay) เป็นของแบรนด์
// หวยเจ้าก่อน ซึ่งเป็น แดง/ทอง** ไฟล์พวกนั้นจะ "ดูเข้าธีมหวย" ตั้งแต่ยังไม่แก้
// ทั้งที่ทุกค่าสีเป็นของแบรนด์อื่น
// → **"เป็นเว็บหวยเหมือนกัน ไม่ได้แปลว่าสีเป็นของรอบนี้"** ต้องเทียบทีละค่าให้
// ตรงหกหลักกับ .claude/brand-spec-lottoplus.md §2 **ห้ามตัดสินด้วยสายตา**
//   ⚠️⚠️ คู่ที่ใกล้ที่สุดและต้องสงสัยว่า "พิมพ์ผิด" ก่อนเสมอ:
//     e5a92b (WIN8S) / e3a712 ffd94a (Huay) / e9b53c (LOTTO189) /
//       e0b03a (TEVA69) ↔ #e2b32a
//     8a0412 b00718 c1071b (Huay) / a30d1a (123BET) ↔
//       **ไม่มีคู่ — แดงชาดออกจากพาเลตแล้วทั้งชุด**
//     c9d2dc (WIN8S) / dde1e7 (Huay) / cfd6e3 (LOTTO189) ↔ #c8d4d0
//     fdf0e6 e0bda4 (WIN8S) / eef7f0 e8fbe4 ↔ **ไม่มีคู่ — หมึกรอบนี้เป็นสีเข้ม**
//     0e0602 140302 250604 2a0a04 (WIN8S) ↔ #03201a #052e22 #0a4433
//     **(ระวัง: ของเก่าเป็นดำอมแดง ของรอบนี้เป็นดำอมเขียว — ต่างกันที่ช่อง G/B)**
// 🚨🚨 ชุดเฮกซ์เต็มของทุกแบรนด์ที่ต้องกวาดออกอยู่ใน
//   .claude/brand-spec-lottoplus.md §2 — **ไม่ซ้ำลงที่นี่โดยตั้งใจ** ลิสต์เดียว
//   ที่อัปเดตที่เดียวย่อมไม่มีทางหลุดกันเอง ตัวที่เสี่ยงสูงสุดสามอันดับแรกคือ
//   **WIN8S (ขาออกทันที ส้ม-ทองบนดำ) · ตระกูล Huay (แดง-ทอง เจ้าของไฟล์ที่หมุน
//   เข้ามารอบนี้ทั้งเจ็ดไฟล์) · LOTTO189 (แบรนด์หวยเหมือนกัน)**
// (เขียนเฮกซ์เก่าแบบไม่มี # เพื่อไม่ให้ sweep ที่ไล่หาสีแบรนด์เก่าสะดุดที่คอมเมนต์นี้)
//
// เขียวที่เป็นสีเชิงความหมายมีสองที่และ **ห้ามเปลี่ยน**:
// LINE green #00B900 ของปุ่ม LINE และเขียว success ของฟีดถอนเงิน
// 🚨🚨 **รอบนี้อันตรายเป็นพิเศษเพราะแบรนด์ก็เป็นเขียว** — สองค่านั้นยังต้องคงไว้
// เป็นค่าเดิมของมัน **ห้ามกลืนเข้าเขียวมรกต #046c4e ของพาเลต** และกลับกัน
// **ห้ามเอา #00B900 มาใช้เป็นสีแบรนด์** เพราะมันคือสีของ LINE ไม่ใช่ของแบรนด์นี้
// (navbar/footer/ticker ประกาศสีตัวอักษรของตัวเองไว้ครบ ค่านี้จึงไปไม่ถึงมัน)
export const BRAND_TEXT = "#0d3326";

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
