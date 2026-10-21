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

// รอบนี้ (โปรดี168 2026-10-22) หมุนออกจาก kanit ของรอบก่อน (รวยแท้168) กลับไปเป็น
// google-sans เพื่อให้ชุด @font-face ไม่ซ้ำกันสองรอบติด — การหมุนสลับไปมาทุกรอบคือ
// สิ่งที่ตัดลายนิ้วมือข้ามแบรนด์ชุดนั้นลงครึ่งหนึ่ง ไม่ใช่การเลือกว่าฟอนต์ไหน "ดีกว่า"
// ทั้งสองตัว self-host เหมือนกัน ไม่มี request ออกนอกโดเมน
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
// ชื่อที่ "เห็นบนเว็บ" รอบนี้คือ โปรดี168 — **ภาษาไทยผสมเลข** เขียนติดกันเป็นคำเดียว
// ไม่มีเว้นวรรค (เหมือนรอบก่อน) โลโก้ แบนเนอร์ และสไลด์ของดรอป 2026-10-21/22 เขียน
// ตรงกันหมด: **คำว่า "โปรดี168" ตัวอักษรไทยสามมิติผิวมันวาวสีแดงเชอร์รี่ ขอบขาว**
// คู่กับ **กระต่ายการ์ตูนขนขาวผูกผ้าพันคอแดงยกนิ้วโป้ง**
// ⚠️⚠️ **ห้ามสับสนกับ PUNPRO168 (punpro168) และ แตกดี168 (takdee168-vip) ซึ่งเป็น
// คนละลูกค้ากันสิ้นเชิง** และห้ามสะกดโดเมนเป็น prodee168 — ต้องมี **e สามตัว**
// ⚠️⚠️ **แกนของแบรนด์รอบนี้คือ "เว็บสล็อตออนไลน์" เต็มตัว** — บรีฟเรียกตัวเองว่า
// "สล็อตแท้โปรเด็ด มัดรวมเกมสล็อตลิขสิทธิ์แท้ ค่ายตรงมาแรง" และระบุ
// **โปรโมชั่นคืนยอดเสีย 0.3% · แนะนำเพื่อน 0.8%** กับ **ขั้นตอนสมัคร 3 ขั้น**
// และ **ช่องทางติดต่อแอดมิน 24 ชม.**
// ⚠️ **นี่ไม่ใช่เว็บหวย** → /ตรวจหวย กับ /แนวทาง **ถูกย้ายกลับไป src/pages-disabled/
// รอบนี้แล้ว** และลิงก์ของมันถูกถอดออกจาก navbar/footer ที่ใช้งานอยู่ —
// ห้ามย้ายกลับเข้า src/pages/
// ⚠️ คำกลุ่มหวยทุกคำที่เจอเป็น **คำค้างของ รวยแท้168 รอบก่อน** ไม่ใช่ของรอบนี้:
// "หวย" / "ตรวจหวย" / "แนวทาง" / "หวยรัฐบาลไทย" / "หวยฮานอย" / "หวยลาว" /
// "ลาวพัฒนา" / "หวยหุ้นต่างประเทศ" / "สลาก" / "เลขเด็ด" / "อัตราจ่าย" /
// "2 ตัว 100" / "3 ตัว 1,000" / "แทงหวย" / "บริษัทแม่" / "เว็บแม่" / "รวยแท้"
// ⚠️ **"บาคาร่า" / "คาสิโนสด" / "ยิงปลา" / "ไฮโล" / "บอล" ไม่มีในบรีฟรอบนี้เลยสักคำ**
// รอบนี้เป็นสล็อตล้วน และ **บรีฟไม่ได้ระบุชื่อค่ายเกมหรือชื่อธนาคารแม้แต่รายเดียว**
// ตัวเลขที่ใช้ได้มีแค่ **0.3% · 0.8% · 24ชม. · ปี 2026**
// ถ้าเจอ "มงกุฎ" / "ลูกบอลหวยสีทองเลข 9" / "หวยคิง" คือคำของ **หวยคิง**
// ถ้าเจอ "เศรษฐีพนันมือ1" / "ผู้สอน" / "บทเรียน" / "หลักสูตร" / "สูตร" / "เทคนิค"
// คือคำของ **ดวงเศรษฐี168** ถ้าเจอ "ยูฟ่า" / "แทงบอล" / "ค่าน้ำ" / "ราคาบอล"
// คือของ **ufalion168** ถ้าเจอ "CEO66" / "JEDI66" / "SUMOHENG" คือคำค้างใน alt=
// และ logo fallback ของ navbar/footer inventory ถ้าเจอ "ระบบดูแลการเงิน" /
// "ไม่ผ่านม้า" / "บัญชีม้า" คือของ **มีทรัพย์168** ถ้าเจอ "ถอนง่าย" /
// "ไม่มีรีวิวเสีย" คือของ **ถอนชัวร์168** และถ้าเจอ PG SOFT / JOKER / JILI /
// "นำเข้าตรงจากสิงคโปร์" คือคำของ **มีโชค168** — ไม่ใช่ของรอบนี้ทั้งหมด
// ⚠️ รอบนี้ **แดงเชอร์รี่นำ คู่กับทองแดงไหม้เป็นสีที่สอง** — ⚠️ **แดงกับทองนำมาแล้ว
// หลายแบรนด์ในรีโปนี้มากกว่าฮิวอื่นใด รวมถึงรอบก่อน (รวยแท้168) ที่เป็นแดง+ทอง
// +ธีมสว่างชมพูเหมือนกัน** จึง **ห้ามเทียบด้วยวงศ์สี ต้องเทียบทีละค่า**
// แดงรอบนี้คือ #eb0305 (R235 G3 B5) ซึ่งเป็นค่า vivid ที่วัดได้จาก logo.webp เอง
// = เชอร์รี่สว่าง ไม่ใช่คริมสัน #c30303 ของรอบก่อน (ห่าง 40 หน่วยที่ R)
// ยอมรับว่าห่าง dc0203 ของหวย365 แค่ 18 หน่วย — **ใกล้กว่าที่รีโปนี้ปกติยอม**
// แต่รับไว้โดยตั้งใจเพราะอาร์ตเวิร์กเป็นเชอร์รี่ชัดเจน ห้าม "ปรับ" ไปเป็นฮิวอื่น
// ทองรอบนี้คือ **ทองแดงไหม้ #b44c06 / #7a2f03** คู่กับ **ทองสาลี่ #f0b46a**
// ซึ่งไม่ใช่ทองโบราณ b8862b/dcb95f/96681f ของรวยแท้168 ไม่ใช่ aeb04a ของสาธุ168
// ไม่ใช่ d39c45 ของ ufalion168 ไม่ใช่ f0c878 ของดวงเศรษฐี168 ไม่ใช่ fcd434 ของมีโชค168
// — ตารางค่าเต็มอยู่ใน .claude/brand-spec-prodeee168.md §2
// ⚠️⚠️ bg.json ของดรอปนี้เป็น {"mode":"color","color":"#ffd1d1"} = **ชมพูพาสเทลสว่าง**
// จึงเป็น **ธีมสว่างรอบที่สี่**ของรีโปนี้ เนื้อหาเป็น **การ์ดสว่างหมึกเข้ม** ส่วนโครม
// (navbar/footer/ticker/feed) เป็นน้ำตาลแดงเข้มเพื่อคร่อมหน้าและให้บล็อก <address>
// ที่ paste verbatim ลงถูก
// ส่วนโดเมนรอบนี้คือ prodeee168.club — **ASCII ล้วน ไม่ต้องแปลง punycode**
// ถ้า operator ไม่ได้ระบุโดเมนมาในคำสั่ง ห้ามแตะ site: เด็ดขาด — รอบนี้ operator
// ระบุมาตรงๆ ว่า real url is "https://prodeee168.club"
// ค่านี้คือชื่อที่คนอ่านเห็นบนโลโก้ ไม่ใช่ host — host มาจาก site:
// ใน astro.config.mjs เท่านั้น ทั้งสองค่ามาจาก operator ตรงๆ
//
// iconSlug (ด้านล่าง) รอบนี้ชื่อแบรนด์เป็นไทยผสมเลข [^a-z0-9] จึงกินอักษรไทยทิ้งหมด
// เหลือ **"168"** เท่ากับสิบกว่าแบรนด์ไทยก่อนหน้า (มีทรัพย์168 / ดวงเศรษฐี168 /
// รวยเทพ168 / มีเฮ168 / รวยแทร่168 / นินจา168 / สบายเบท168 / ถอนชัวร์168 / มีโชค168 /
// ขวัญใจ168 / รับตัง168 / สมหวัง168 / รวยแท้168)
// ⚠️ แปลว่า ?v= รอบนี้ **ไม่ bust แคชต่างจากแบรนด์ไทยเหล่านั้น** ขณะที่ไบต์ไอคอนเปลี่ยน
// — เป็นข้อจำกัดที่รู้อยู่ของสูตร ไม่ใช่บั๊กที่ต้องแก้มือ
// ห้ามแก้ iconVersion ด้วยมือไม่ว่ากรณีใด เพราะค่านี้ต้องคงที่ต่อแบรนด์
// สังเกตว่า slug มาจากชื่อแบรนด์ จึงไม่เท่ากับ label ใน wrangler.toml ซึ่งมาจาก
// "โดเมน" — รอบนี้คนละค่ากันสิ้นเชิง ("168" vs "prodeee168")
//
// รอบนี้บรีฟ (src/assets/content.txt) เขียน "โปรดี168" ตรงกับอาร์ตเวิร์กและคำสั่ง
// ของ operator ทุกจุด ไม่มีความขัดแย้งแบบรอบ UOK365 ที่บรีฟยังเป็นชื่อแบรนด์ก่อนหน้า
// ถึงอย่างนั้นหน้าเว็บก็ยังไม่พิมพ์ชื่อแบรนด์ตรงๆ เลยสักที่ แต่ interpolate ค่านี้แทน
// ค่านี้ไปโผล่ใน og:site_name, JSON-LD, terms/privacy และ <address>
export const BRAND_NAME = "โปรดี168";

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
// ⚠️⚠️ **โปรดี168 เป็นแบรนด์ "ธีมสว่าง" รอบที่สี่ของรีโปนี้ — ค่านี้จึงเป็นหมึกเข้ม
// ไม่ใช่สีสว่างเหมือนรอบที่พื้นดำ** อย่าเห็นว่าเป็นค่ามืดแล้วคิดว่าพิมพ์ผิด
// เหตุผล: bg.json ของดรอปนี้เป็น {"mode":"color","color":"#ffd1d1"} = **ชมพูพาสเทล
// สว่าง** และ bg.json คือแหล่งเดียวของพื้นเพจ
// ห้าม "แก้" ให้กลับไปเป็นดำเพราะ "แบรนด์ก่อนๆ เป็นดำ"
//
// ทิศของธีมรอบนี้ (อ่านให้จบก่อนแตะไฟล์ไหน):
//   เนื้อหา  — การ์ดสว่าง #ffffff / #fff4ea + หมึกเข้ม #401107
//   โครม     — navbar/footer/ticker/winners feed/Navfoot/CtaRedirect เป็น
//              น้ำตาลแดงเข้ม #4d1c0a / #2c1004 + ตัวอักษรสว่าง #fff0e4
//              และทองสาลี่ #f0b46a กับทองแดงไหม้ #b44c06
//   พื้นเพจ  — #ffd1d1 (จาก bg.json)
// โครมยังเข้มด้วยเหตุผลสามข้อ: (ก) บล็อก <address> ใน footer ต้อง paste verbatim
// (border-white/15 bg-black/20 + ตัวอักษร inherit) ซึ่งออกแบบมาสำหรับ footer เข้ม
// (ข) หัว-ท้ายเข้มคร่อมเนื้อหาสว่างคือกรอบที่อ่านง่าย
// (ค) โครมประกาศสีตัวอักษรของตัวเองครบอยู่แล้ว ค่านี้จึงไปไม่ถึงมัน
//
// ⚠️ รอบนี้ **แดงเชอร์รี่นำ คู่ทองแดงไหม้เป็นสีที่สอง** และ **รอบนี้ไม่มีเขียวเป็นสี
// แบรนด์เลยสักเฉด** — เขียวที่ยังเหลืออยู่มีสองที่และเป็นสีเชิงความหมายทั้งคู่:
// LINE green #00B900 ของปุ่ม LINE และเขียว success ของฟีด (emerald-400/500/900
// จุด live + สถานะ "ตรวจสอบแล้ว") ซึ่งอยู่คู่ทุกแบรนด์มาตลอด **ห้ามเปลี่ยนสองชุดนี้
// ให้เป็นสีแบรนด์ เพราะนั่นคือการลบความหมายออกจาก UI**
// **แดงกับทองเคยนำมาแล้วหลายแบรนด์ รวมถึงรอบก่อนที่เป็นแดง+ทอง+ธีมสว่างชมพู
// เหมือนกัน จึงต้องเทียบทีละค่า ไม่ใช่ทั้งวงศ์สี**
// ความต่างที่แท้จริงของรอบนี้มีสี่ข้อ:
//   1. สีอัตลักษณ์เป็น **แดงเชอร์รี่** #eb0305 (R235 G3 B5) ซึ่งเป็นค่า vivid
//      ที่วัดได้จาก logo.webp เอง ได้ 4.6:1 บนผิวการ์ดขาว **จึงเป็นพื้นถมที่รอง
//      ตัวอักษรขาวได้** และใช้กับหัวข้อ ตัวหนา ขอบ ออรา
//      ⚠️ ห่าง dc0203 ของหวย365 แค่ 18 หน่วย และห่าง #c30303 ของรวยแท้168
//      40 หน่วย — **ห้าม "ปรับ" ไปเป็นฮิวอื่นเพื่อไล่ระยะ เพราะจะขัดกับโลโก้**
//      (เขียว #00B900 ของปุ่ม LINE เป็นสีของแบรนด์ LINE ไม่ใช่ของเรา คงไว้ตามเดิม)
//   2. สีไฮไลต์ `<strong>` ในเนื้อความเป็น **แดงเข้ม** #9b0a0c ได้ 8.6:1 บนผิว
//      การ์ดขาว — **สงวนไว้งานเดียวนี้** ห้ามใช้ #eb0305 แทน
//      (⚠️ แดงสด #ff4446 ได้แค่ 3.1:1 บนขาว = ตกเกณฑ์ AA จึงเป็น **stop ของ
//      ไล่เฉด/ออราเท่านั้น ห้ามถือตัวอักษร และห้ามเป็นพื้นของตัวอักษร**)
//   3. หมึกเนื้อความเป็น **น้ำตาลแดงเข้ม** #401107 (ค่าที่ export ด้านล่าง)
//      ได้ 16.1:1 บนขาว · 14.9:1 บนอินเซ็ต #fff4ea · 11.8:1 บนพื้นเพจ #ffd1d1
//      ส่วนพื้นโครมเป็น #4d1c0a (raised) กับ #2c1004 (sunken) ตัวอักษร #fff0e4
//   4. สีที่สองเป็น **ทองแดงไหม้** #b44c06 (วัดจาก banner1.png vivid) คู่กับ
//      #7a2f03 และ **ทองสาลี่ #f0b46a** ซึ่ง
//      ⚠️ **ทองเป็นกับดักรอบนี้ เพราะเกือบทุกแบรนด์ในรีโปเคยใช้ทอง** (b8862b
//      dcb95f 96681f f0c878 d4922c d39c45 e5a81b fcd434 f7c92b f0b429 fef54b
//      ffc82e ffd84d fcd45c cd9a2c aeb04a) — ความต่างเชิงใช้งานของรอบนี้คือ
//      **#b44c06 ถือตัวอักษรบนการ์ดสว่างได้จริง (5.3:1)** ซึ่งทองโบราณของรอบก่อน
//      ทำไม่ได้ ส่วน **ทองสาลี่ #f0b46a เป็นสีของโครมเท่านั้น ห้ามถือตัวอักษรบนพื้น
//      สว่าง** (บนขาวได้ 1.8:1 แต่บนโครม #4d1c0a ได้ 7.9:1)
//      **ปุ่ม CTA หลักบนการ์ดสว่างคือพื้นถมไล่เฉดแดง eb0305 -> c20305 -> 9b0a0c
//      + ตัวอักษรขาว** (4.6 / 6.4 / 8.6:1 ผ่านทุก stop)
//      **ปุ่ม CTA รองบนโครมคือไล่เฉดทอง f0b46a -> d9803a -> b44c06 + หมึก #1a0802**
//      (11.5 / 6.6 / 4.6:1) **ห้ามสลับเป็นพื้นทองแล้วใส่ตัวอักษรขาว**
//      (⚠️ #2c1004 เป็นเกือบดำ และ #fff4ea เกือบขาว — สองปลายของสเกลแออัดโดย
//      ธรรมชาติ เป็นสีผิว/พื้น **ไม่ใช่สีอัตลักษณ์** ความต่างบังคับไว้ที่แดงกับทองแดง)
// นอกจากนั้นการหมุน variant (NavbarStyle4 + FooterPremiumSumo + AnnouncementPremium +
// LatestWinnersCyber + Faq4 + ReviewCardSumo + การ์ดชุด FloatingBadge/3ThreeCyberCut/
// Neumorphism/SevenThreeCyberCut/SevenThree/ContentBox/TwoFloatingBadge) คือสิ่งที่
// ทำให้รูปทรงของหน้าไม่ซ้ำ ไม่ใช่สี — ดู .claude/brand-spec-prodeee168.md §3
// (รอบก่อนคือ รวยแท้168 ซึ่งใช้ชุด Premium/CyberCut/Special/Neumorphism รอบนี้หมุนออกหมด)
// อ่านมาจากงานศิลป์ตรงๆ: dominant ของ banner1 คือ **ครีม-น้ำตาลอ่อนของฉากฟาร์ม**
// (#fcbaa2 #322422 #dbbe9a) และ vivid ของ banner1 เป็นครีม/ทองอ่อนล้วน
// (#fddba5 #fcbaa2 #fde3ac #fad39e) ซึ่ง **ไม่ใช่สีแบรนด์เลย** —
// **palette.json จัดอันดับให้ แต่ไม่ได้ตีความให้** ไฟล์ที่ตัวเลขชี้ถูกคือ logo.webp
// ซึ่งให้ vivid เป็น #eb0305 #e40303 = **แดงเชอร์รี่ล้วน** ตรงกับที่ตาเห็น
// ส่วน #b44c06 ของ banner1 คือทองแดงไหม้ของรั้วไม้/ถังไม้ ซึ่งเป็นสีที่สองที่ใช้จริง
// โลโก้อ่านตรงๆ ได้ว่า: บนพื้นโปร่งใส มี **กระต่ายการ์ตูนขนขาวยกนิ้วโป้ง ผูกผ้าพันคอแดง
// ขยิบตา** อยู่ซ้าย แล้วเป็น **คำว่า "โปรดี168" ตัวอักษรไทยสามมิติผิวมันวาวสีแดงเชอร์รี่
// ขอบขาว**
// แบนเนอร์เป็น **ฉากฟาร์มกลางแจ้งแดดจัด** — กังหันลมไม้ ยุ้งแดง รั้วไม้ ท้องฟ้าฟ้า
// มีเมฆขาว ฝั่งซ้ายเป็น **เด็กชายผมดำ เอี๊ยมยีนส์ ผ้าพันคอแดง ยกนิ้วโป้ง** ฝั่งขวา
// เป็น **เด็กหญิงผมดำโบว์แดง ชุดขาว-แดง ชูสองนิ้ว** กลางภาพเป็น **กระต่ายขาวกับ
// หมูชมพู** และ **ข้อความสามมิติ "โปรดี168 สล็อตแท้โปรเด็ด" แดง-ทอง มีมงกุฎทองเล็ก
// ประดับ** ใต้ลงมาเป็น **ป้ายไม้ครีมเขียนว่า รวมเกมสล็อต ค่ายตรงมาแรง อัปเดตก่อนสิ้นปี**
// มีเหรียญทองลอยและถังไม้ใส่เหรียญ
// — **ไม่มีวัดไทย ไม่มีเจดีย์ ไม่มีสลากกินแบ่ง ไม่มีชุดไทยแบบรวยแท้168 (แบรนด์ขาออก
// รอบนี้ จึงเป็นตัวที่เสี่ยงหลงเหลือมากที่สุด) ไม่มีตัวอักษรเขียวมรกตแบบสาธุ168
// ไม่มีหัวหมูการ์ตูนหน้ากากโจร ไม่มียุ้งฉางแบบมีทรัพย์168 ไม่มีไฉ่ซิงเอี๊ย
// ไม่มีมงกุฎทองใหญ่ ไม่มีลูกบอลหวยแบบหวยคิง ไม่มีชิปคาสิโนดำ-ทอง ไม่มีไพ่เอซโพดำ
// ไม่มีห้องโถงหรูขาว-งาช้างแบบดวงเศรษฐี168 ไม่มีสิงโตทอง ไม่มีสนามบอล ไม่มีถ้วย
// แชมเปี้ยนส์ลีกแบบ ufalion168 ไม่มีตู้สล็อต 777 ไม่มีกล่องของขวัญแดงแบบรวยเทพ168
// ไม่มีชุดลูกไม้ขาวผูกโบว์แดงแบบมีเฮ168 ไม่มีนินจาการ์ตูน ไม่มีชูริเคนแบบนินจา168
// ไม่มีถุงเงินสีฟ้าแบบรวยแทร่168 ไม่มีแมวการ์ตูนขนขาวลายส้มแบบสบายเบท168
// ไม่มีดอกซากุระชมพูแบบถอนชัวร์168 ไม่มีแมวกวักนำโชค ไม่มีธงชาติสิงคโปร์แบบมีโชค168
// ไม่มีอักขระมังกรจีน 龍 (GT66B) ไม่มีมาสคอตโจรการ์ตูน (TKB55) ไม่มีปีกเหยี่ยวน้ำเงิน
// (TSDET911) ไม่มีเป็ดการ์ตูน (DUCK1688) และไม่มีหัวเสือ (TIGERWIN369)**
// ⚠️ **รอบนี้ไม่มีเขียวทุกเฉด (ยกเว้น LINE green กับเขียว success ของฟีด)
// ไม่มีบานเย็น/มาเจนต้า ไม่มีฟ้า/น้ำเงิน/ไซยาน ไม่มีม่วงเข้ม ไม่มีเงิน/โครเมียม
// ไม่มีโรสโกลด์ และไม่มีทองเหลืองสดแบบ fcd434/fef54b**
// ⚠️ **ระวังสับสน: "ชมพู" รอบนี้มีได้เฉพาะพื้นเพจ #ffd1d1 (จาก bg.json) ซึ่งเป็น
// ชมพูพาสเทลที่เป็นสีของรอบนี้เอง — ไม่ใช่ #ffdbdb ของรวยแท้168 ไม่ใช่ชมพูบานเย็น
// ของมีทรัพย์168 และไม่ใช่ชมพูของถอนชัวร์168 ส่วน "แดง" รอบนี้คือ
// #eb0305 / #9b0a0c / #ff4446 เท่านั้น ห้ามเหมารวมว่าเจอแดงหรือชมพูที่ไหนคือของเก่า
// ต้องเทียบทีละค่า** (ตารางค่าเต็มของทุกแบรนด์ที่ต้องกวาดออกอยู่ใน
// .claude/brand-spec-prodeee168.md §2)
// ⚠️ **ฟ้าของท้องฟ้า เขียวของทุ่ง/ใบไม้ ขาวของกระต่าย ชมพูของหมู น้ำเงินของเอี๊ยมยีนส์
// และน้ำตาลของรั้วไม้/กังหัน เป็นวัตถุในภาพ ไม่ใช่สีแบรนด์** ห้ามดึงเข้ามาเป็นสีของ UI
// ส่วน bg.json ของดรอปนี้เป็น {"mode":"color","color":"#ffd1d1"} = **ชมพูพาสเทลสว่าง**
// (ค่านี้มาจากไฟล์ ไม่ได้สืบทอด — ให้เปิดดูทุกรอบ และรอบนี้ **ยังเป็นธีมสว่างเหมือน
// รอบก่อน แต่คนละค่า** รอบก่อนเป็น #ffdbdb)
// ตัวอักษรเนื้อความเป็นน้ำตาลแดงเข้ม — ค่านี้คือสีนั้น
//
// มันทำงานสองหน้าที่พร้อมกัน: เป็นสีย่อหน้าในการ์ด และเป็นสีพื้นของทั้งเว็บที่หน้า
// terms/privacy/404 (ซึ่งไม่ประกาศสีเองเลยโดยตั้งใจ) พึ่งอยู่ รอบนี้ทั้งสองบริบท
// วางอยู่บนพื้นสว่างเหมือนกัน จึงใช้ค่าเดียวกันได้จริง
// #401107 บน #ffffff ≈ 16.1:1 · บน #fff4ea ≈ 14.9:1 · และบนพื้นสีเดียวของ bg.json
// (#ffd1d1) ≈ 11.8:1
// ⚠️ แดงเข้ม #9b0a0c ได้ ≈ 8.6:1 บนผิวการ์ดขาว จึงเป็นตัวที่ใช้ไฮไลต์ <strong>
// ในเนื้อความ (สงวนไว้งานเดียวนี้)
// ⚠️ **แดงเชอร์รี่ #eb0305 ได้ 4.6:1 บนผิวการ์ดขาว** ใช้กับหัวข้อ ตัวหนา ขอบ ออรา
// และ **เป็นพื้นถมที่รองตัวอักษรขาวได้ (4.6:1)** แต่ **ห้ามใช้เป็นสีไฮไลต์ <strong>
// ในเนื้อความ** (ให้ใช้ #9b0a0c ตัวเดียว)
// ⚠️ **แดงสด #ff4446 ได้แค่ 3.1:1 บนขาว = ตกเกณฑ์ AA** จึงเป็น **stop ของ
// ไล่เฉด/ออราเท่านั้น ห้ามถือตัวอักษร และห้ามเป็นพื้นของตัวอักษร**
// ⚠️ **ทองแดงไหม้ #b44c06 ได้ 5.3:1 บนผิวการ์ดขาว — ถือตัวอักษรได้จริง** และ
// #7a2f03 ได้ 9.4:1 ส่วน **ทองสาลี่ #f0b46a เป็นสีของโครมเท่านั้น** (บนโครม
// #4d1c0a ได้ 7.9:1 แต่บนผิวการ์ดขาวได้แค่ 1.8:1 = ตก)
// **ปุ่ม CTA หลักคือพื้นถมไล่เฉดแดง eb0305 -> c20305 -> 9b0a0c + ตัวอักษรขาว**
// (4.6 / 6.4 / 8.6:1 ผ่านทุก stop) **ห้ามสลับเป็นพื้นแดงอ่อนแล้วใส่ตัวอักษรขาว**
// ⚠️ #ffd1d1 และ #fff4ea ห้ามถือตัวอักษรบนพื้นขาว เป็นสีพื้น/เส้นเท่านั้น
// — แต่ทั้งคู่วางบนพื้นถม #4d1c0a ได้
// (navbar/footer/ticker ประกาศสีตัวอักษรของตัวเองไว้ครบ ค่านี้จึงไปไม่ถึงมัน)
export const BRAND_TEXT = "#401107";

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
