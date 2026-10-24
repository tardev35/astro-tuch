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

// รอบนี้ (สล็อต168 2026-10-23) หมุนออกจาก google-sans ของรอบก่อน (รวย168)
// กลับไปเป็น kanit เพื่อให้ชุด @font-face ไม่ซ้ำกันสองรอบติด — การสลับไปมา
// ทุกรอบคือสิ่งที่ตัดลายนิ้วมือข้ามแบรนด์ชุดนั้นลงครึ่งหนึ่ง ไม่ใช่การเลือกว่า
// ฟอนต์ไหน "ดีกว่า" ทั้งสองตัว self-host เหมือนกัน ไม่มี request ออกนอกโดเมน
// ผลข้างเคียงที่ตั้งใจ: แบรนด์นี้จะ ship @font-face + preload ชุด
// /fonts/kanit-v17-latin_thai-*.woff2 และจะ **ไม่** ship ชุด
// /fonts/google-sans-v70-*.woff2 ของรอบก่อนเลยสักไฟล์ — และต้องสลับกลับอีกรอบหน้า
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
// ชื่อที่ "เห็นบนเว็บ" รอบนี้คือ สล็อต168 — **ภาษาไทยผสมเลข** เขียนติดกันเป็นคำเดียว
// ไม่มีเว้นวรรค โลโก้ แบนเนอร์ และสไลด์ของดรอป 2026-10-23 เขียนตรงกันหมด:
// **ตัวอักษรเจลสามมิติ "สล็อต168" สีแดงมันวาว ไฮไลต์ขาวสเปกคูลาร์
// มีมงกุฎทองเล็กประดับหัวใจแดงวางบนตัวอักษรตัวแรก**
// ⚠️⚠️ **แกนของแบรนด์รอบนี้คือ "เว็บสล็อตออนไลน์" ล้วน** — บรีฟเรียกตัวเองว่า
// "ระบบสล็อตเว็บนอก ทางเข้าเล่นฐานเกมหลัก ไม่ผ่านเอเย่นต์100%" และพูดถึง
// **ค่ายแท้ถูกลิขสิทธิ์ · ฝากถอนยอดเข้าบริษัทแม่โดยตรง · สล็อตคลาสสิก ·
// เกมที่มีรอบโบนัส · เกมที่ใช้สัญลักษณ์พิเศษ · คืนยอดเสีย 0.3% ·
// แนะนำเพื่อน 0.8% · ฝากถอนทุกธนาคารและทรูมันนี่ · แอดมิน 24ชม.**
// ⚠️⚠️ **นี่คือเว็บสล็อต ไม่ใช่เว็บหวย** (กลับทิศจากรอบก่อน) → /ตรวจหวย กับ
// /แนวทาง ถูกย้ายกลับไป src/pages-disabled/ แล้ว และลิงก์ของทั้งสองถูกถอดออกจาก
// navbar + footer ที่ใช้งานอยู่ — ห้ามย้ายกลับเข้า src/pages/
// ⚠️ **ห้ามเขียน "SLOT168" ตัวละตินที่ไหนทั้งสิ้น** รอบนี้คือ "สล็อต168"
// ภาษาไทยเท่านั้น (slot-168 ใช้ได้เฉพาะเป็น host/worker name)
// ⚠️⚠️ คำของ **รวย168 รอบก่อน (แบรนด์ขาออก เสี่ยงหลงเหลือสูงสุด)** คือ
// "รวย" / "แทงหวยเว็บรวย" / "หวย" / "หวยรัฐบาลไทย" / "หวยลาว" / "หวยฮานอย" /
// "หวยออมสิน" / "สลาก" / "เลขเด็ด" / "เลขดัง" / "งวด" / "บาทละ 1,000" /
// "2 ตัว 100" / "3 ตัว 1,000" / "วิ่ง/โต๊ด" / "ตารางอัตราจ่าย" / "ทุกสำนัก" —
// **ไม่มีในบรีฟรอบนี้เลยสักคำ ห้ามเขียนกลับเข้ามา**
// และของเก่ากว่านั้น (มาดาม168): "มาดาม" / "เปย์แรง" / "จ่ายไม่มีอั้น" / "ไม่อั้น" /
// "แจกโบนัสสมาชิกทุกวัน" / "สมัครรับโปรใหม่" — ห้ามเช่นกัน
// (นาซ่า168): "นาซ่า" / "เซิร์ฟไทย" / "อวกาศ" / "ไม่ผ่านม้า" — ห้ามเช่นกัน
// ตัวเลขที่ใช้ได้รอบนี้มีแค่ **0.3% · 0.8% · 100% (เฉพาะในวลี ไม่ผ่านเอเย่นต์100%)
// · 24ชม.**
// ⚠️ **ไม่มี "3 ขั้นตอน" ไม่มีจำนวนเกม ไม่มีจำนวนค่าย และไม่มี RTP**
// ส่วนโดเมนรอบนี้คือ **slot-168.online — ASCII ล้วน ไม่ต้องแปลง punycode**
// ⚠️⚠️ **TLD รอบนี้คือ `.online`** และ **host มีขีดกลาง** ชื่อ worker จึงเป็น
// "slot-168" (ขีดกลางรวมอยู่ด้วย) ไม่ใช่ "slot168"
// ถ้า operator ไม่ได้ระบุโดเมนมาในคำสั่ง ห้ามแตะ site: เด็ดขาด — รอบนี้ operator
// ระบุมาตรงๆ ว่า real url is "https://slot-168.online"
// ค่านี้คือชื่อที่คนอ่านเห็นบนโลโก้ ไม่ใช่ host — host มาจาก site:
// ใน astro.config.mjs เท่านั้น ทั้งสองค่ามาจาก operator ตรงๆ
// รายการค่าสีและคำของทุกแบรนด์ที่ต้องกวาดออกอยู่ใน
// .claude/brand-spec-slot168.md §2 และ §5
//
// iconSlug (ด้านล่าง) รอบนี้ชื่อแบรนด์เป็นไทยผสมเลข [^a-z0-9] จึงกินอักษรไทยทิ้งหมด
// เหลือ **"168"** เท่ากับสิบกว่าแบรนด์ไทยก่อนหน้า — เป็นข้อจำกัดที่รู้อยู่ของสูตร
// ไม่ใช่บั๊กที่ต้องแก้มือ ห้ามแก้ iconVersion ด้วยมือไม่ว่ากรณีใด
// สังเกตว่า slug มาจากชื่อแบรนด์ จึงไม่เท่ากับ name ใน wrangler.toml ซึ่งมาจาก
// "โดเมน" — รอบนี้คนละค่ากัน ("168" vs "slot-168")
//
// รอบนี้บรีฟ (src/assets/content.txt) เขียน "สล็อต168" ตรงกับอาร์ตเวิร์กและคำสั่ง
// ของ operator ทุกจุด หน้าเว็บไม่พิมพ์ชื่อแบรนด์ตรงๆ เลยสักที่ แต่ interpolate ค่านี้
// ค่านี้ไปโผล่ใน og:site_name, JSON-LD, terms/privacy และ <address>
export const BRAND_NAME = "หมูบิน168";

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
// ⚠️⚠️ **สล็อต168 เป็นแบรนด์ "ธีมมืด" เหมือนรอบก่อน แต่คนละฮิวสิ้นเชิง**
// ค่านี้จึงยังเป็น **หมึกสว่าง** เหตุผล: bg.json ของดรอปนี้เป็น
// {"mode":"color","color":"#140000"} = **ดำอมแดงเข้มมาก** และ bg.json คือแหล่งเดียว
// ของพื้นเพจ ⚠️ **รอบก่อน (รวย168) เป็น 000000 = ดำสนิท ไม่ใช่ดำอมแดง**
// — ให้เปิด bg.json อ่านทุกรอบ ห้ามสืบทอดค่าข้ามรอบ
// ⚠️ และหมึกรอบนี้เป็น **ขาวอมชมพูอุ่น (R>G>B)** ต่างจากรอบก่อนที่เป็นงาช้างอมครีม
// อ่านมาจากอาร์ตเวิร์กที่เป็น **แดงเจลมันวาวคู่ไฮไลต์ขาวสเปกคูลาร์**
//
// ทิศของธีมรอบนี้ (อ่านให้จบก่อนแตะไฟล์ไหน):
//   พื้นเพจ  — #140000 (จาก bg.json)
//   ผิว      — #0b0000 (จม) / #1c0607 (กลาง การ์ด) / #2a0c0d (ยก ชิป) / #551c1e (เส้น)
//   ฮิวนำ    — **แดง #fb2e33** คู่แดงลึก #cb0b0d และแดงลึกสุด #8a0608
//   วัสดุที่สอง — มุกอุ่น #f0e6e4 / #c9b9b7 / #7d6f6e
//   หมึก     — #f0e6e4 (ค่านี้) · หมึกรอง #c9b9b7 · แพลทินัม #e3d6d4
// ⚠️ รอบนี้โครมกับเนื้อหา **อยู่ทิศเดียวกัน (มืดทั้งคู่)**
// บล็อก <address> ใน footer ยัง paste verbatim ได้เหมือนเดิม (border-white/15
// bg-black/20 + ตัวอักษร inherit) เพราะ footer รอบนี้ยังเป็นผิวเข้ม
//
// ⚠️⚠️ **ทองคือฮิวนำของรอบก่อนทันที (รวย168) — รอบนี้ห้ามมีทอง/เหลืองเลยสักเฉด**
// มงกุฎทองเล็กในโลโก้เป็นรายละเอียด ~2% ของอาร์ตเวิร์ก **ไม่ใช่สีแบรนด์**
// ค่าที่ต้องกวาดออกก่อนใคร: ffd94a e3a712 9d6f06 (รอบก่อนทันที)
// และโครเมียมเงินเย็นของรอบก่อน e8eaee b4b9c2 6b7079 กับผิว/หมึกของรอบก่อน
// 070707 121110 1c1a16 3d3425 f3ece0 bfb8aa dde1e7
// ⚠️ ระวัง 1c1a16 (ผิวยกรอบก่อน) กับ 1c0607 (การ์ดรอบนี้) — ต่างกันที่ G/B ตรวจทีละค่า
// ส่วนฟ้า/ไซยานอิ่มตัวมาแล้วเจ็ดแบรนด์ รอบนี้จึง **ไม่มีน้ำเงินเลย**
// ตัวนำคือ **แดง** ซึ่งรอบก่อนระบุไว้ชัดว่า "ห้ามมีแดงเลยสักเฉด"
// → เป็นตัวแยกที่แข็งที่สุดของรอบนี้
// อ่านมาจากอาร์ตเวิร์กตรงๆ: ตัวอักษร "สล็อต168" ในโลโก้และบนแบนเนอร์ · คำว่า
// "ไม่ผ่านเอเย่นต์100%" บนแคปซูล · เลข 0.3% / 0.8% บนสไลด์ทั้งสองใบ
// **เป็นแดงทั้งหมด** ส่วนไฮไลต์บนตัวอักษร แคปซูลพื้นขาว และคำว่า "โปรโมชั่น"
// บนสไลด์เป็น **ขาว/มุก** ซึ่งคือคู่วัสดุบนอาร์ตเวิร์กเป๊ะๆ
// ตารางค่าที่ต้องกวาดออกครบทุกแบรนด์อยู่ใน .claude/brand-spec-slot168.md §2
//
// ⚠️ รอบนี้ **ไม่มีทอง/เหลือง/ส้ม/ฟ้า/ไซยาน/น้ำเงิน/ม่วง/เขียวมิ้นต์/ครีมน้ำตาล
// เป็นสี UI เลยสักเฉด** — คาร์ดิแกนแดง เสื้อกล้ามขาว พื้นหลังสตูดิโอขาว
// และสีผิวนักแสดงในอาร์ตเวิร์กเป็น **วัตถุในภาพ ไม่ใช่สีแบรนด์**
// (พีช fcd3d4 / fbdcdc / fdccce ที่ palette.json วัดได้จาก banner1 คือไฮไลต์
// ของคาร์ดิแกนแดงกับสีผิว ห้ามดึงเข้ามาเป็นสี UI — และ dominant ของ banner1
// เป็นขาว fefefd เพราะฉากหลังเป็นสตูดิโอขาว **ซึ่งไม่ใช่พื้นเพจ** พื้นเพจ
// มาจาก bg.json = #140000 เท่านั้น)
// เขียวที่ยังเหลืออยู่มีสองที่และเป็นสีเชิงความหมายทั้งคู่: LINE green #00B900
// ของปุ่ม LINE และเขียว success ของฟีด **ห้ามเปลี่ยนสองชุดนี้ให้เป็นสีแบรนด์**
//
// ค่าคอนทราสต์ที่ตรวจแล้ว:
//   #f0e6e4 (ค่านี้) บนพื้นเพจ #140000 16.7:1 · บนการ์ด #1c0607 16.0:1
//           — **ถือตัวอักษรได้ทุกบริบทมืด**
//   #c9b9b7 บนการ์ด #1c0607 10.3:1 — หมึกรอง
//   #e3d6d4 บนการ์ด 14.1:1 — แพลทินัม/มุก (ป้ายกำกับ เส้นมุก)
//   #fb2e33 บนพื้นเพจ 5.4:1 · บนการ์ด 5.1:1 — **หัวข้อ ลิงก์ และ <strong> ในเนื้อความ**
// ⚠️⚠️ **#cb0b0d (3.5:1) #8a0608 #7d6f6e (4.25:1) #551c1e เป็นพื้นถม/ขอบ/ออรา
//      เท่านั้น ห้ามถือตัวอักษร**
// ⚠️⚠️ **ขาวบนแดงสว่าง #fb2e33 ได้แค่ ~3.8:1 — ห้ามใส่หมึกขาวบนเฉดนั้น**
//      พื้นแดงที่ถือหมึกขาวได้ต้องเข้มกว่านั้น (#d81115 ลงไป) หรือใช้หมึกดำ
//      #0a0a0a ซึ่งตรงกับแคปซูลขาวในอาร์ตเวิร์กอยู่แล้ว
// **ปุ่ม CTA หลักคือพื้นไล่เฉด #d81115 -> #b00d11 -> #8a0608 + หมึกขาว #ffffff**
//   คอนทราสต์ต่อ stop: 5.2:1 / 7.2:1 / 10.0:1
//   ⚠️⚠️ **ห้ามใช้ #fb2e33 เป็น stop บนของปุ่มที่ถือหมึกขาว** — ได้แค่ 3.8:1
//   #fb2e33 สงวนไว้สำหรับ **ตัวอักษร/ขอบ/ไอคอนบนผิวมืด** เท่านั้น
//   (brand-spec §2 ระบุข้อนี้ไว้ตรงกัน)
// **ปุ่มรองคือพื้นไล่เฉดมุก #f0e6e4 -> #c9b9b7 + หมึกดำ #0a0a0a** (16.2 / 10.5:1)
// **ปุ่ม outline คือขอบ #fb2e33 ตัวอักษร #fb2e33 บนผิว #0b0000** (5.5:1)
// (navbar/footer/ticker ประกาศสีตัวอักษรของตัวเองไว้ครบ ค่านี้จึงไปไม่ถึงมัน)
export const BRAND_TEXT = "#3b0b26";

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
