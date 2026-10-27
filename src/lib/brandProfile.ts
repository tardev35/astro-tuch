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

// รอบนี้ (TEVA69 2026-10-28) หมุนออกจาก google-sans ของรอบก่อน (LOTTO189)
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
// ชื่อที่ "เห็นบนเว็บ" รอบนี้คือ TEVA69 — **ตัวละตินพิมพ์ใหญ่ + เลข เขียนติดกัน
// เป็นคำเดียว ไม่มีเว้นวรรค และ "ไม่มีขีดกลาง"** ห้าม Teva69 / teva69 /
// "TEVA 69" / "TEVA-69"
// ⚠️⚠️ **ชื่อแบรนด์ไม่มีขีด แต่โดเมนมี** (teva-69.com) — สองค่านี้คนละตัวกัน
// iconSlug = "teva69" (จากชื่อแบรนด์) · worker name = "teva-69" (จากโดเมน)
// ✅ **รอบนี้คำสั่ง operator กับบรีฟตรงกัน**: `src/assets/content.txt` เขียนโทเค็น
// "TEVA69" ทุกบรรทัด และ operator สั่งมาตรงๆ ว่า rebrand to "TEVA69" +
// real url "https://teva-69.com"
// → ถึงจะตรงกันก็ยัง **ห้ามพิมพ์ชื่อแบรนด์เป็นตัวอักษรตรงๆ ในโค้ด** ทุกที่ต้อง
// interpolate ${BRAND_NAME} เหมือนเดิม
// ⚠️⚠️ **อาร์ตเวิร์กทุกใบพิมพ์คำว่า TEVA69 อยู่บนรูปจริง** (โลโก้ แบนเนอร์
// สไลด์ทั้งสอง) นั่นคือข้อเท็จจริงของรูป แต่เวลาเขียน alt ให้บรรยาย **รูปทรงของ
// เวิร์ดมาร์ก** แล้วอ้างชื่อด้วย ${BRAND_NAME}
// อาร์ตเวิร์กของดรอป 2026-10-28: **เวิร์ดมาร์กสามมิติ ครึ่งแรกเป็นตัวอักษรละติน
// ผิวโครเมียมเงินขัดเงา ครึ่งหลังเป็นตัวเลขผิวเขียวมรกตเคลือบเงาเรืองแสง
// ตัดขอบดำหนาทั้งชุด**
// ⚠️⚠️ **แกนของแบรนด์รอบนี้คือ "เว็บเกมพนัน/คาสิโน-สล็อตออนไลน์"** — บรีฟเรียก
// ตัวเองว่า "เกมพนันเบอร์ต้นๆของไทย สมัครเล่นไม่มีขั้นต่ำ" และพูดถึง
// **เกมเดิมพันออนไลน์หลากหลายประเภท · ค่ายแท้ ถูกลิขสิทธิ์ · เซิร์ฟนอก ·
// ปลอดภัยในไทย · โปรโมชั่นอัปเดตใหม่ตลอดสัปดาห์ · คืนยอดเสีย 0.3% ·
// แนะนำเพื่อน 0.8% · สมัคร 3 ขั้นตอน · แอดมินออนไลน์ตลอด 24ชม.**
// 🚨🚨 **กลับทิศจากรอบก่อน: รอบก่อน (LOTTO189) เป็นเว็บหวย รอบนี้เป็นเว็บเกมพนัน**
// บรีฟรอบนี้ **ไม่มีคำว่า หวย / สลาก / งวด / เลขเด็ด / ลอตโต้ เลยสักคำ**
// → **/ตรวจหวย กับ /แนวทาง ถูกย้ายกลับไป src/pages-disabled/ แล้วรอบนี้** และ
// navbar + footer ที่ใช้งานอยู่ **ต้องไม่มีลิงก์ของสองหน้านั้น**
// ⚠️⚠️ **บรีฟรอบนี้ไม่มีหมวดฝากถอน/ธนาคาร/วอลเลทเลยสักคำ** (เหมือนรอบก่อน)
// → **ห้าม render BankStrip** แต่ **มีหมวดโปรโมชั่นเต็มหัวข้อ** (กลับทิศจากรอบก่อน)
// **อย่าสืบทอดคำอนุญาตหรือข้อห้ามข้ามรอบโดยไม่เปิดบรีฟดู**
// ⚠️⚠️ คำของ **LOTTO189 รอบก่อน (แบรนด์ขาออก เสี่ยงหลงเหลือสูงสุด)** คือ
// "LOTTO189" / "แนะนำเว็บหวยลอตโต้" / "แทงหวยจ่ายสด" / "รับทุกเลข ไม่มีอั้น" /
// "หวยรัฐบาลไทย" / "หวยลาว" / "หวยฮานอย" / "หวยหุ้นต่างประเทศ" / "จ่ายเต็ม จ่ายสด" /
// "อัตราจ่าย 2 ตัว 100" / "3 ตัว 1,000" / "สองตัวบน/ล่าง" / "สามตัวตรง/โต๊ด" /
// "รอบปิดรับ" / "บิลหวย" / "โพยหวย" / "งวด" — **ห้ามเขียนกลับเข้ามา**
// 🚨🚨 **กลับทิศจากรอบก่อน**: `0.3%` กับ `0.8%` รอบก่อนห้ามเป็นเนื้อความ แต่
// **รอบนี้เป็นเนื้อหาของบรีฟจริง (content.txt บรรทัด 8-12)** → **เขียนเป็นหัวข้อ
// และเนื้อความได้ตามปกติ** (ยังต้องคงประโยคกำกับของบรีฟไว้ครบ)
// 🚨 **ภาษาภาพของ LOTTO189 ก็ห้ามหลุดกลับมา**: ลูกบอลหวยสีขาวพิมพ์ตัวเลข ·
// ใบโพยหวยกองซ้อน · ปากกาด้ามสีทอง · อาร์มแชร์ขาวขอบทอง · แคปซูลแดงเข้มขอบทอง
// และของก่อนหน้านั้น (ZNOVA168): "ZNOVA168" / "ZOLO99" / "สล็อต1บาททรูวอลเลท" /
// "เบทเริ่มต้น1บาท" / "ฝากถอนธนาคารและวอลเลท" / "สล็อตคลาสสิก" / "ฟรีสปิน" /
// "เกมโบนัส" / "ค่า RTP" / "ความผันผวน" พร้อมภาษาภาพ นักรบหญิงถือดาบเงิน ·
// ชุดเกราะเมทัลลิกประดับหนาม · ริบบิ้นแดงพลิ้ว · ทองหลอมเหลว/ส้มเพลิง ·
// โลโก้ทรูมันนี่วอลเล็ต — ห้ามเช่นกัน
// และของก่อนหน้านั้น (ZANE96): "ZANE96" / "สล็อตลิขสิทธิ์แท้ในไทย" / "เว็บตรง
// ไม่ผ่านเอเย่นต์" / "แหล่งรวมเกมสล็อตแบรนด์ดัง" / "ยูสใหม่เล่นง่าย" /
// "ยูสใหม่เล่น1บาทได้" พร้อมภาษาภาพ ตู้สล็อต 777 ม่วงใส · ชิปคาสิโนแมเจนต้า ·
// เชอร์รี่ชมพู · เพชรม่วง · ลำแสงนีออนม่วง-แมเจนต้า — ห้ามเช่นกัน
// ⚠️ **ชิปคาสิโนมีจริงในดรอปนี้ แต่เป็นชิปเขียวเข้มสลับขาวพิมพ์เลข 69 และ 6**
// ไม่ใช่ชิปแมเจนต้าของ ZANE96 — บรรยายตามที่เห็นได้
// และ (MEXICANOSLOT): "MEXICANOSLOT" / "สล็อตเมกซิกัน" / "เมกซิกัน" / "เม็กซิโก" /
// "การันตีเว็บตรง" / "ยอดเข้าบริษัทแน่นอน" / "เว็บแท้ที่นี่ที่เดียว" พร้อมภาษาภาพ
// ซอมเบรโร · ปอนโช/ซาราเป้ · มาราคัส · กีตาร์โปร่ง · กระบองเพชร · พริกแดง ·
// ธงชาติเม็กซิโก · อาคารอะโดบี · หนวด · fiesta — ห้ามเช่นกัน
// และ (okkub88): "okkub88" / "เว็บสล็อตเงินดี" / "ทางเข้าเล่นง่าย" /
// "ยูสใหม่แตกไว" / "รับโปรไม่อั้น" / "โบนัสแจกทั้งวันไม่จำกัด" /
// "ฝากถอนไม่มีขั้นต่ำ" / "ทรูวอลเลท" / "ทรูมันนี่" — ห้ามเช่นกัน
// (โบ๊ะบ๊ะ168): "โบ๊ะบ๊ะ" / "เว็บตรงแตกง่าย" / "เบทต่ำ" / "ไม่ทำเทิร์น" /
// "รวมค่ายดัง" / "ถอนได้ไม่จำกัด" · (หมูบิน168): "หมูบิน" / "เกมสล็อตแท้" /
// "เว็บตรงถูกลิขสิทธิ์" / "ไม่จำกัดยอด" · (สล็อต168): "ระบบสล็อตเว็บนอก" /
// "ทางเข้าแท้" / "ไม่ผ่านเอเย่นต์100%" / "ฐานเกมหลัก" — ห้ามเช่นกัน
// 🚨 **แบรนด์สล็อต/คาสิโนเก่าคือกลุ่มที่ใกล้ตัวที่สุดรอบนี้ เพราะอยู่หมวดเดียวกัน**:
// (ZNOVA168) · (ZANE96) · (MEXICANOSLOT) · (okkub88) · (โบ๊ะบ๊ะ168) · (หมูบิน168) ·
// (สล็อต168) · (นาซ่า168) · (มาดาม168) · (เงินทอง168) · (KINGKONG555) —
// **ชื่อแบรนด์เหล่านี้ห้ามหลุด** แต่ **คำหมวดเกมพนันทั่วไปอย่าง "เกมพนัน" /
// "เกมเดิมพัน" / "ค่ายเกม" / "สมัครสมาชิก" รอบนี้ใช้ได้** เพราะเป็นคำของบรีฟเอง
// — **อย่าสืบทอดข้อห้ามข้ามรอบโดยไม่เปิดบรีฟดู**
// (มาดาม168): "มาดาม" / "เปย์แรง" / "จ่ายไม่มีอั้น" · (นาซ่า168): "นาซ่า" /
// "เซิร์ฟไทย" / "อวกาศ" / "ไม่ผ่านม้า" · (โบ๊ะบ๊ะ168): "เว็บตรงแตกง่าย" /
// "เบทต่ำ" / "ไม่ทำเทิร์น" / "ถอนได้ไม่จำกัด" · (okkub88): "ทรูวอลเลท" /
// "ทรูมันนี่" / "ยูสใหม่แตกไว" — ห้ามเช่นกัน
// ⚠️ **"เซิร์ฟนอก" เป็นคำของบรีฟรอบนี้เอง (content.txt บรรทัด 1,5) ใช้ได้**
// แต่ "เซิร์ฟไทย" ของ นาซ่า168 ห้ามใช้ — คนละคำ อย่าสับสน
// ตัวเลขที่ใช้ได้รอบนี้มีแค่ **0.3% · 0.8% · 3 ขั้นตอน · 24ชม.**
// ⚠️ **ไม่มีจำนวนสมาชิก ไม่มีปีก่อตั้ง ไม่มี 100% ไม่มี "30 วินาที" ไม่มีค่า RTP
// เป็นตัวเลข ไม่มีจำนวนค่าย/เกม และไม่มียอดขั้นต่ำเป็นตัวเลข**
// ส่วนโดเมนรอบนี้คือ **teva-69.com — ASCII ล้วน ไม่ต้องแปลง punycode**
// ⚠️⚠️ **โดเมนมีขีดกลาง แต่ชื่อแบรนด์ไม่มี** ชื่อ worker จึงเป็น "teva-69"
// ซึ่ง **ไม่ชนกับชื่อใดในลิสต์ของ wrangler.toml** (ไม่มีชื่อไหนมีคำว่า teva เลย)
// ถ้า operator ไม่ได้ระบุโดเมนมาในคำสั่ง ห้ามแตะ site: เด็ดขาด — รอบนี้ operator
// ระบุมาตรงๆ ว่า real url is "https://teva-69.com"
// ค่านี้คือชื่อที่คนอ่านเห็นบนโลโก้ ไม่ใช่ host — host มาจาก site:
// ใน astro.config.mjs เท่านั้น ทั้งสองค่ามาจาก operator ตรงๆ
// รายการค่าสีและคำของทุกแบรนด์ที่ต้องกวาดออกอยู่ใน
// .claude/brand-spec-teva69.md §2 และ §5
//
// iconSlug (ด้านล่าง) รอบนี้ชื่อแบรนด์เป็นละติน+เลขล้วน [^a-z0-9] จึงไม่กินอะไรเลย
// แต่ถูก toLowerCase() ก่อน จึงได้ **"teva69"** เต็ม
// ห้ามแก้ iconVersion ด้วยมือไม่ว่ากรณีใด
// ⚠️⚠️ **รอบนี้ slug ("teva69") ไม่เท่ากับ name ใน wrangler.toml ("teva-69")**
// เพราะโดเมนมีขีดแต่ชื่อแบรนด์ไม่มี — **ที่มาคนละทางกันเสมอ**
// (slug มาจากชื่อแบรนด์ · name มาจากโดเมน) รอบก่อน (lotto189) บังเอิญตรงกัน
// รอบนี้ไม่ตรง — อย่าสรุปว่าสองค่านี้เท่ากันทุกรอบ
//
// หน้าเว็บไม่พิมพ์ชื่อแบรนด์ตรงๆ เลยสักที่ แต่ interpolate ค่านี้ ค่านี้ไปโผล่ใน
// og:site_name, JSON-LD, terms/privacy และ <address>
export const BRAND_NAME = "TEVA69";

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
// ⚠️⚠️ **TEVA69 เป็นแบรนด์ "เนื้อหาสว่าง" แต่ "โครมเข้ม" — ทิศเดียวกับรอบก่อน
// แต่คนละตระกูลสีทั้งชุด** ค่านี้จึงเป็น **หมึกเข้ม** เพราะมันเป็นสีตัวอักษรบน
// "ผิวเนื้อหา" (การ์ดขาวบนพื้นเพจสว่าง) ไม่ใช่บนโครม
// เหตุผลที่พื้นเพจสว่าง: bg.json ของดรอปนี้เป็น
// {"mode":"color","color":"#f0ffeb"} = **ขาวอมมิ้นต์จาง** และ bg.json คือแหล่งเดียว
// ของพื้นเพจ ⚠️ **รอบก่อน (LOTTO189) เป็น fff0f0 = ขาวอมชมพูจาง คนละค่า**
// — ให้เปิด bg.json อ่านทุกรอบ ห้ามสืบทอดค่าข้ามรอบ
// ⚠️ และหมึกรอบนี้เป็น **เขียวป่าจม (G>R>B)** ต่างจากรอบก่อนที่เป็นแดงเลือดนกจม
// (R>B>G) — **ย้ายช่องเด่นจาก R ไป G ทั้งชุด** อ่านมาจากอาร์ตเวิร์กที่เป็น
// **เวิร์ดมาร์กสามมิติ ครึ่งแรกตัวอักษรละตินผิวโครเมียมเงินขัดเงา ครึ่งหลังตัวเลข
// ผิวเขียวมรกตเคลือบเงาเรืองแสง ตัดขอบดำหนา บนฉากห้องสีขาวครีม ที่มีหญิงสาว
// สวมสูทขาวนั่งอยู่ ชิปคาสิโนสีเขียวเข้มสลับขาวกองซ้อนกัน และมงกุฎทองดวงเล็ก**
//
// ทิศของธีมรอบนี้ (อ่านให้จบก่อนแตะไฟล์ไหน):
//   พื้นเพจ  — #f0ffeb (จาก bg.json) ขาวอมมิ้นต์จาง **สว่างมาก**
//   ผิวเนื้อหา — #ffffff (การ์ด) / #e6f7df (ยก ชิป) / #d7f0cd (wash)
//               / #b2dba3 (เส้นอ่อน) / #3f7a2e (เส้นเข้ม)
//   ผิวโครม  — **#0b2a12 (ฐาน) / #15401d (ยก) / #051409 (ลึก) / #2d6b2f (เส้น)
//               / #e8fbe4 (หมึกบนโครม) / #b4d6ad (หมึกรองบนโครม)** ← **เข้ม**
//   ฮิวนำ    — **เขียวป่า #116018** คู่รอง **เขียวลึก #0b4a12** และ
//               **เขียวแบรนด์ #1a7d24** พร้อม **ทองเข้ม #8a6a0e**
//               (ทั้งสี่ค่าถือตัวอักษรบนขาวได้) ส่วน #28c437 #e3bb45
//               เป็น **ตกแต่ง/พื้นถม/ขอบเท่านั้น**
//   หมึก     — #10280f (ค่านี้) · หมึกรอง #3c5b36 · **หัวข้อ/strong/ลิงก์ #116018**
//   ไฮไลต์บนโครมเข้ม — #e8fbe4 (14.3:1) / #b4d6ad (9.7:1) / #c6cfd2 (9.8:1)
//                      / #e3bb45 (8.5:1) / #28c437 (6.7:1)
//   โครเมียม — #c6cfd2 เป็น **เส้น/ขอบ/ตัวอักษรบนโครมเข้มเท่านั้น** (ลายเซ็นของ
//               เวิร์ดมาร์ก) ห้ามเป็นพื้นถมใหญ่บนผิวสว่าง และห้ามกลายเป็นแรมป์เทาทั้งหน้า
// ⚠️⚠️ **โครมกับเนื้อหาอยู่คนละทิศ (โครมเข้ม เนื้อหาสว่าง)** อาร์ตเวิร์กรอบนี้เป็น
// ฉากห้องสว่างที่มีเวิร์ดมาร์กเขียวมรกตเรืองแสงและชิปเขียวเข้ม โครมเขียวป่าจึงทำ
// หน้าที่เป็น "กรอบโปสเตอร์" ไม่ใช่แถบดำแปลกปลอม **ห้าม "แก้" ให้โครมสว่างตามพื้นเพจ**
// ⚠️⚠️ **ผลที่ตามมา: บล็อก <address> ใน footer paste verbatim ตาม SKILL.md ได้
// ตามปกติ** (border-white/15 + bg-black/20 + ตัวอักษร inherit) เพราะ footer รอบนี้
// เป็นผิวเข้ม — **ห้ามใส่เฮกซ์ของแบรนด์ลงในบล็อกนั้น**
//
// 🚨🚨 **กับดักที่แหลมที่สุดของรอบนี้: รอบนี้เป็นแบรนด์เขียว/เงินโครเมียม และ
// เขียวเคยเป็นฮิวนำของแบรนด์เก่ามาแล้วหลายเจ้า** (KINGKONG555 เขียวมะนาว-ทอง ·
// สาธุ168 เขียวใบไม้ · 888PARUAY เขียว-แดง · KOON234 ทอง-มรกต · MEXICANOSLOT
// เขียวธงชาติ) **และสีเขียวคือสีที่ตาแยกค่าได้ยากที่สุดในบรรดาฮิวทั้งหมด**
// → **"เจอเขียว ≠ เป็นของรอบนี้"** ต้องเทียบทีละค่าให้ตรงหกหลัก
// กับ .claude/brand-spec-teva69.md §2 ห้ามตัดสินด้วยสายตา
//   ⚠️⚠️ คู่ที่ใกล้ที่สุดและต้องสงสัยว่า "พิมพ์ผิด" ก่อนเสมอ:
//     e9f7d6 (KINGKONG555) ↔ #e6f7df — ต่างกันแค่สลับสองหลักท้าย
//     bde397 (KINGKONG555) ↔ #b2dba3
//     1a5c04 (KINGKONG555) ↔ #1a7d24 — **ขึ้นต้น 1a เหมือนกันเป๊ะ**
//     0b7d28 (สาธุ168) ↔ #0b4a12 — **ขึ้นต้น 0b เหมือนกันเป๊ะ**
//     0d2312 / 143a1c / 07130a (888PARUAY) · 0c3a16 (สาธุ168) ↔ #0b2a12 / #15401d / #051409
//     2bb061 (MEXICANOSLOT) / 2fbf6a (KOON234) / 8ce023 (KINGKONG555) ↔ #28c437
//     0f9b35 / 0a5f1c / 061f0c (สาธุ168) · 1fae1c (888PARUAY) · 117a41 (MEXICANOSLOT)
//       · 2f8c07 / 051400 / 0f2e05 / 06220a (KINGKONG555) — **ห้ามใช้ทั้งหมด**
//     e3b23c (สมหวัง168) / e3a712 (รวย168) / f2c230 / ffe066 (KINGKONG555) ↔ #e3bb45
//     f3f6fa / e8eaee / cfd6e3 / d8dde6 / c0c0bf ↔ #c6cfd2
//     a87a08 (KINGKONG555) / 8f6310 (LOTTO189) ↔ #8a6a0e
// 🚨🚨 แดง/ทอง/ขาวชมพูของ **LOTTO189 รอบก่อนทันที (แบรนด์ขาออก เสี่ยงหลงเหลือ
//   สูงสุด)** ที่ต้องกวาดออกให้หมด: fff0f0 ffe4e6 ffd4d7 f5b9bd a8333f 25090f
//   6e3b44 b00718 c1071b 8a0412 8f6310 d61023 ff2436 e9b53c 24060c 3d0d16 120307
//   7e1221 ffeaea f0bcbc c3ccd6 + rgba(176,7,24) rgba(193,7,27) rgba(255,36,54)
//   rgba(233,181,60) rgba(37,9,15) rgba(245,185,189) rgba(138,4,18) rgba(18,3,7)
// 🚨 ส้ม/ทอง/ครีมของ **ZNOVA168 (N-2)**
//   ที่ต้องกวาดออกให้หมด: 2a1206 1a0c04 2b1608 0e0602 7a3a0c fff3e0 e0b784 fffbf0
//   fff4e0 ffe9c7 f3d9a8 c98a24 c23400 b8300a 9a5b00 9a2a00 d13800 fa4903 fde90b
//   e8a000 ff8a2b d8dde6 8f9aa8 6a4a30
// 🚨 ม่วง/ฟ้า/แมเจนต้าของ **ZANE96**: 7a1bd6 2b3fd9 c2178b f23bb4 bb6dff 7aa7ff
//   5411c4 241046 6b4a86 f8e6f9 f6edfe ece0fb dcc6f4 9a6fd0 190b3d 271257 100626
//   5b2f9e f3e8ff c0a6e8 8e14b8 2f1766
// 🚨 แดง/ทอง/ครีมของ **MEXICANOSLOT** ที่ต้องกวาดออกให้หมด: de2b1e f2a033
//   a81410 c81e12 9d140c 6f0e08 3f130d 80453a 2b100a 431a10 1d0a06 8c3a22 fdeee2
//   e8c6ae fed7b5 fec28d f6c4a4 e2855c fde4d3 fff3ea fef6fb 117a41 2bb061 f2543f
// ทอง/เหลือง/ส้มของแบรนด์เก่ากว่านั้น (**ตระกูลเดียวกับรอบนี้ ต้องระวังเท่ากัน**):
//   ffd84d f5ba14 fcee52 b37c0b ffd94a e3a712 9d6f06 eeae12 fded41 9f600d fcd434
//   ffeaa0 fcd45c fdcb0c fefb6b fee45d e6a416 fef54b f7c92b ffe6a3 d4922c fdfc71
//   e5a81b ffe08a f9a826 ffdc8c f0b429 ffc82e e0bd72 f6e4b4 d4af5a eab308 f5c53d
//   ece2cc dcb95f f0c878 f0b46a fbc134 ffe87a cf9a18 fcdc2b fff6ae a87d0c fadc64
//   fdf3b4 e0b03a
// เขียว/แดงของแบรนด์หวยเก่า (เจ้าของเดิมของ LottoGrid): 1fae1c 0d2312 143a1c 07130a
//   e8e4c6 cf1111 e01f26 1a0709 2a0b0e 120406 d8bda6 f3f6fa
// ครีม/เบจ/เทาเงินของแบรนด์เก่า: f4e4d3 e4cbb3 ecd5c4 d2b9a4 f3ece0 bfb8aa e8eaee
//   b4b9c2 6b7079 e0e0df c0c0bf a1a09e e8ecf1 a8b2bf 78828f d9c9a6 cfd6e3
// ชมพู/แมเจนต้าของแบรนด์เก่า: ffd6fa fff4fb ffe3f5 ffe9f7 f9b2d9 f479b9 f4a7cf
//   6a0f3c 95486b 9c0f55 fb439b fc74b5 ffc2e2 d91a73 b01160 85094a fd6cb2 fc7cba
//   fc4da1 (okkub88) · fa539c c2185b 8e0f41 fb8cc0 fdc6c3 ffd1cd f7bcd9 ef8dbd
//   ffe5ff fff0f8 ffeef7 3b0b26 54123a 7a2350 ffe9f5 7a4463 (หมูบิน168)
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
// (เขียนเฮกซ์เก่าแบบไม่มี # เพื่อไม่ให้ sweep ที่ไล่หาสีแบรนด์เก่าสะดุดที่คอมเมนต์นี้)
//
// ⚠️ รอบนี้ **ไม่มีม่วง/ฟ้า/ไซแอน/แมเจนต้า/ชมพูบับเบิลกัม/ส้มเพลิง/แดง
// เป็นสี UI เลยสักเฉด** — ผิวเงินโครเมียมของเวิร์ดมาร์กเป็น **ลายเซ็นของโลโก้**
// (ใช้เป็นเส้น/ตัวอักษรบนโครมเข้มได้ แต่ไม่ใช่ฮิวของแบรนด์)
// (ค่า dominant ที่ palette.json วัดได้จาก logo.webp เป็นเทา-ขาว c4c5c5 / d3d3d2 /
// fcfdfd และจาก banner1 / slide1 เป็นขาว ecedeb / ececea ซึ่งคือ **ฉากห้องสว่าง
// กับขอบโครเมียมในภาพ ไม่ใช่พื้นเพจ** พื้นเพจมาจาก bg.json = #f0ffeb เท่านั้น
// palette.json จัดอันดับให้ แต่ไม่ได้ตีความให้ —
// ค่าที่เอามาใช้คือ **vivid**: logo.webp ได้ 014b02 0c3d0c 0d330c 135413 01930c
// (เขียวป่า/เขียวสดล้วนทั้งห้าค่า) · banner1.png ได้ 035302 กับ 448d0a ·
// slide1.png ได้ 004301 กับ 026c01
// = **เขียวคือฮิวนำจริงของรอบนี้** ค่าดิบพวกนั้นอิ่มและมืดเกินไปสำหรับตัวอักษร
// จึงแปลงเป็น #116018 / #0b4a12 / #1a7d24 ตามตารางด้านบน)
// 🚨🚨 **รอบนี้เขียวเป็นสีแบรนด์ ซึ่งกลับทิศจากทุกรอบที่ผ่านมาที่เขียนไว้ว่า
// "รอบนี้ไม่มีเขียวแบรนด์"** — อย่าอ่านคอมเมนต์ของรอบเก่าในไฟล์อื่นแล้วสรุปว่า
// เขียวที่เจอเป็นของเก่าเสมอ ให้เทียบกับตาราง §2 ของรอบนี้เป็นค่า
// เขียวที่เป็นสีเชิงความหมายมีสองที่และ **ห้ามเปลี่ยน แม้รอบนี้แบรนด์จะเขียวก็ตาม**:
// LINE green #00B900 ของปุ่ม LINE และเขียว success ของฟีดถอนเงิน
// — **สองชุดนี้ไม่ใช่สีของแบรนด์ไหน และต้องไม่ถูกกลืนเข้าพาเลตเขียวของรอบนี้**
//
// ค่าคอนทราสต์ที่ตรวจแล้ว:
//   #10280f (ค่านี้) บนการ์ดขาว 15.8:1 · บนพื้นเพจ #f0ffeb 15.2:1 · บน #e6f7df 14.1:1
//           — **ถือตัวอักษรได้ทุกบริบทสว่าง**
//   #3c5b36 บนการ์ดขาว 7.7:1 — หมึกรอง
//   #116018 บนการ์ดขาว 7.8:1 · บนพื้นเพจ 7.5:1
//           — **หัวข้อ ลิงก์ และ <strong> ในเนื้อความบนผิวสว่าง**
//   #0b4a12 10.5:1 · #1a7d24 5.3:1 · #8a6a0e 5.1:1 บนการ์ดขาว — ถือตัวอักษรได้
// ⚠️⚠️ **#28c437 (2.3:1) #e3bb45 #c6cfd2 #f0ffeb #e6f7df #d7f0cd #b2dba3
//      เป็นพื้นถม/ขอบ/ออราบนผิวสว่างเท่านั้น ห้ามถือตัวอักษรบนผิวสว่างเด็ดขาด**
//      และ #3f7a2e เป็น **เส้น/ขอบ** เท่านั้น
// ⚠️⚠️ **ขาวบนพื้นเพจ #f0ffeb ได้แค่ 1.07:1** — ข้อความที่วางบนพื้นเพจตรงๆ โดยไม่มี
//      การ์ดรองต้องเป็นหมึกเข้มเท่านั้น
// **ปุ่ม CTA หลักคือพื้นไล่เฉด #0b4a12 -> #116018 -> #1a7d24 + หมึกขาว #ffffff**
//   คอนทราสต์ต่อ stop: 10.5:1 / 7.8:1 / 5.3:1 — ผ่าน AA ทุก stop
//   ⚠️⚠️ **ห้ามลากปลายเฉดขึ้นไปถึง #28c437 หรือใช้ #e3bb45 เป็น stop ของปุ่มที่
//   ถือหมึกขาว** (ทั้งคู่ตกต่ำกว่า 4.5:1 กับขาว) สงวนไว้สำหรับ **ขอบ/ออรา/พื้นถม
//   บนโครมเข้ม** เท่านั้น
// **ปุ่มรองคือพื้นไล่เฉดขาว #ffffff -> #e6f7df + หมึก #10280f** (15.8 / 14.1:1)
// **ปุ่ม outline คือขอบ #116018 ตัวอักษร #116018 บนผิว #ffffff** (7.8:1)
// (navbar/footer/ticker ประกาศสีตัวอักษรของตัวเองไว้ครบ ค่านี้จึงไปไม่ถึงมัน)
export const BRAND_TEXT = "#10280f";

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
