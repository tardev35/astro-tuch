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

// รอบนี้ (สบาย168 2026-10-22) หมุนออกจาก kanit ของรอบก่อน (ยูฟ้า168) กลับไปเป็น
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
// ชื่อที่ "เห็นบนเว็บ" รอบนี้คือ ยูฟ้า168 — **ภาษาไทยผสมเลข** เขียนติดกันเป็นคำเดียว
// ไม่มีเว้นวรรค (เหมือนรอบก่อน) โลโก้ แบนเนอร์ และสไลด์ของดรอป 2026-10-22 เขียน
// ตรงกันหมด: **คำว่า "ยูฟ้า" ตัวอักษรไทยสามมิติผิวมันวาวสีทองอร่าม ต่อด้วยเลข "168"
// ผิวโครเมียมเงิน** คู่กับ **ลูกฟุตบอลขาว-ดำลายทองพร้อมหางวงโคจรทอง**
// ⚠️⚠️ **ห้ามสับสนกับ "สบายเบท168" (โดเมน สบายเบท-168.com / worker
// xn---168-9gora7dtd1dwh) ซึ่งเป็นคนละลูกค้ากันสิ้นเชิง และเป็น "ชื่อที่ใกล้ที่สุด
// ในรีโปนี้"** — ชื่อรอบนี้คือ สบาย168 ไม่มีคำว่า "เบท" คั่น และที่แย่กว่านั้นคือ
// **เขาเคยเดินพาเลตฟ้า+ทองเหมือนรอบนี้ด้วย** จึงต้องระวังทั้งชื่อและสี
// ⚠️⚠️ **แกนของแบรนด์รอบนี้คือ "เว็บเกมสล็อตเบทต่ำ" ไม่ใช่เว็บพนันครบวงจร** — บรีฟ
// เรียกตัวเองว่า "สล็อตเบทต่ำสบายเป๋า ทุนน้อย เล่นง่าย ยอดเข้าบริษัทโดยตรง"
// และพูดถึง **สล็อตออนไลน์จากค่ายต่าง ๆ · เกมที่กำหนดเงินเดิมพันเริ่มต้นในระดับต่ำ**
// พร้อม **โปรโมชั่นคืนยอดเสีย 0.3% · แนะนำเพื่อน 0.8%** กับ **ขั้นตอนสมัคร 3 ขั้น**
// และ **ช่องทางติดต่อแอดมิน 24ชม.**
// ⚠️ **นี่ไม่ใช่เว็บหวย** → /ตรวจหวย กับ /แนวทาง อยู่ใน src/pages-disabled/ แล้ว
// และลิงก์ของมันถูกถอดออกจาก navbar/footer ที่ใช้งานอยู่ — ห้ามย้ายกลับเข้า src/pages/
// ⚠️ คำกลุ่มหวยทุกคำที่เจอเป็น **คำค้างของ รวยแท้168** ไม่ใช่ของรอบนี้:
// "หวย" / "ตรวจหวย" / "แนวทาง" / "หวยรัฐบาลไทย" / "หวยฮานอย" / "หวยลาว" /
// "ลาวพัฒนา" / "หวยหุ้นต่างประเทศ" / "สลาก" / "เลขเด็ด" / "2 ตัว 100" /
// "3 ตัว 1,000" / "แทงหวย" / "บริษัทแม่" / "เว็บแม่" / "รวยแท้"
// ⚠️⚠️ ส่วนคำของ **ยูฟ้า168 รอบก่อน (แบรนด์ขาออก เสี่ยงหลงเหลือสูงสุด)** คือ
// "ฐานหลักเว็บพนันออนไลน์" / "แทงบอล" / "ฟุตบอล" / "ราคาต่อรอง" / "ค่าน้ำ" /
// "บาคาร่า" / "เกมไพ่" / "เว็บตรง100%" / "ไม่ผ่านม้า" / "ไม่มีขั้นต่ำ" /
// "ไม่จำกัดจำนวนยูสต่อวัน" — **ไม่มีในบรีฟรอบนี้เลยสักคำ ห้ามเขียนกลับเข้ามา**
// (กลับกันกับรอบที่แล้วที่อนุญาตคำพวกนี้ เพราะรอบนั้นเป็นเว็บพนันครบวงจร
// **สิ่งที่ "ใช้ได้" ขึ้นกับบรีฟของรอบนั้นๆ เท่านั้น ไม่ได้สืบทอดข้ามรอบ**)
// ⚠️ คำของ **โปรดี168** คือ "สล็อตแท้โปรเด็ด" / "ค่ายตรงมาแรง" / "อัปเดตก่อนสิ้นปี" /
// "ลิขสิทธิ์แท้" / "ปี 2026" / "ตารางจ่ายรางวัล" — ⚠️ แต่ **"สถานะลิขสิทธิ์" รอบนี้
// ใช้ได้** เพราะเป็นคำของบรีฟรอบนี้เอง (content.txt บรรทัด 6)
// ส่วน "สิงโตทอง" / "ถ้วยแชมเปี้ยนส์ลีก" เป็นของ **ufalion168** และ
// **บรีฟรอบนี้ไม่ได้ระบุชื่อค่ายเกม ชื่อธนาคาร หรือผู้ให้บริการแม้แต่รายเดียว**
// ตัวเลขที่ใช้ได้มีแค่ **0.3% · 0.8% · 24ชม. · 3 ขั้นตอน**
// ถ้าเจอ "มงกุฎ" / "ลูกบอลหวยสีทองเลข 9" / "หวยคิง" คือคำของ **หวยคิง**
// ถ้าเจอ "เศรษฐีพนันมือ1" / "ผู้สอน" / "บทเรียน" / "หลักสูตร" / "สูตร" / "เทคนิค"
// คือคำของ **ดวงเศรษฐี168** ถ้าเจอ "CEO66" / "JEDI66" / "SUMOHENG" / "BRAVO168"
// คือคำค้างใน alt= และ logo fallback ของ navbar/footer inventory ถ้าเจอ
// "ระบบดูแลการเงิน" / "ฝากถอนทุกช่องทาง" / "ปลอดภัยไม่ผ่านม้า" คือของ **มีทรัพย์168**
// ถ้าเจอ "ถอนง่าย" / "ไม่มีรีวิวเสีย" คือของ **ถอนชัวร์168** และถ้าเจอ
// PG SOFT / JOKER / JILI / "นำเข้าตรงจากสิงคโปร์" คือคำของ **มีโชค168**
// ⚠️ รอบนี้ **ฟ้าสกายนำ คู่กับทองคานารีเป็นสีที่สอง** — ⚠️ **ทั้งฟ้าและทองถูกใช้มาแล้ว
// หลายแบรนด์ในรีโปนี้** จึง **ห้ามเทียบด้วยวงศ์สี ต้องเทียบทีละค่า**
// ฟ้ารอบนี้คือ #2cc3fc (R44 G195 B252) และทองรอบนี้คือ #fdcb0c (R253 G203 B12)
// ซึ่งเป็นสองค่า vivid ที่วัดได้จาก logo.webp เอง (คำว่า "สบาย" ทอง + เลข "168" ฟ้า)
// ⚠️ **สามเจ้าที่เคยเดินฟ้าคู่ทองเหมือนกันเป๊ะในเชิงตระกูลสี**:
//   สบายเบท168 2f9ff5 + ffc82e (⚠️ ชื่อใกล้ที่สุด) · นินจา168 32bcfb + fef54b ·
//   รวยแทร่168 039cfa + f9a826
// และทองของรอบก่อนทันที (ยูฟ้า168) คือ fee45d ซึ่งไม่ใช่ #fdcb0c
// ⚠️ **ตัวแยกที่แข็งที่สุดของรอบนี้ไม่ใช่เฉดสี แต่คือ "ธีมสว่าง"** — สามเจ้าข้างบน
// ล้วนวางฟ้า+ทองไว้บนพื้นน้ำเงินหมึกมืดสนิท ส่วนรอบนี้พื้นเพจเป็น **#ccf7ff
// ฟ้าพาสเทลสว่าง** และการ์ดเนื้อหาเป็นผิวขาว หมึกน้ำเงินเข้ม
// — ตารางค่าเต็มอยู่ใน .claude/brand-spec-sabai168.md §2
// ⚠️⚠️ bg.json ของดรอปนี้เป็น {"mode":"color","color":"#ccf7ff"} = **ฟ้าพาสเทลสว่าง**
// จึง **กลับมาเป็นธีมสว่าง** หลังรอบก่อนเป็นดำสนิท (ยูฟ้า168 #000000)
// — **ห้าม "แก้" ให้กลับไปมืดเพราะรอบก่อนเป็นแบบนั้น**
// ส่วนโดเมนรอบนี้คือ สบาย-168.com — ⚠️ **เป็น IDN ภาษาไทย ต้องแปลงเป็น punycode
// `xn---168-pho7byc9c.com` ก่อนใส่ใน site:** (ขีดหลัง xn มีสามตัว เพราะ host รูป
// unicode มียัติภังค์คั่นระหว่าง สบาย กับ 168 อยู่เอง — ห้าม "แก้" ให้เหลือสองขีด)
// ถ้า operator ไม่ได้ระบุโดเมนมาในคำสั่ง ห้ามแตะ site: เด็ดขาด — รอบนี้ operator
// ระบุมาตรงๆ ว่า real url is "https://สบาย-168.com"
// ค่านี้คือชื่อที่คนอ่านเห็นบนโลโก้ ไม่ใช่ host — host มาจาก site:
// ใน astro.config.mjs เท่านั้น ทั้งสองค่ามาจาก operator ตรงๆ
//
// iconSlug (ด้านล่าง) รอบนี้ชื่อแบรนด์เป็นไทยผสมเลข [^a-z0-9] จึงกินอักษรไทยทิ้งหมด
// เหลือ **"168"** เท่ากับสิบกว่าแบรนด์ไทยก่อนหน้า (มีทรัพย์168 / ดวงเศรษฐี168 /
// รวยเทพ168 / มีเฮ168 / รวยแทร่168 / นินจา168 / สบายเบท168 / ถอนชัวร์168 / มีโชค168 /
// ขวัญใจ168 / รับตัง168 / สมหวัง168 / รวยแท้168 / โปรดี168)
// ⚠️ แปลว่า ?v= รอบนี้ **ไม่ bust แคชต่างจากแบรนด์ไทยเหล่านั้น** ขณะที่ไบต์ไอคอนเปลี่ยน
// — เป็นข้อจำกัดที่รู้อยู่ของสูตร ไม่ใช่บั๊กที่ต้องแก้มือ
// ห้ามแก้ iconVersion ด้วยมือไม่ว่ากรณีใด เพราะค่านี้ต้องคงที่ต่อแบรนด์
// สังเกตว่า slug มาจากชื่อแบรนด์ จึงไม่เท่ากับ label ใน wrangler.toml ซึ่งมาจาก
// "โดเมน" — รอบนี้คนละค่ากันสิ้นเชิง ("168" vs "xn---168-pho7byc9c")
//
// รอบนี้บรีฟ (src/assets/content.txt) เขียน "สบาย168" ตรงกับอาร์ตเวิร์กและคำสั่ง
// ของ operator ทุกจุด ไม่มีความขัดแย้งแบบรอบ UOK365 ที่บรีฟยังเป็นชื่อแบรนด์ก่อนหน้า
// ⚠️ **ห้ามสับสนกับ "สบายเบท168" ซึ่งเป็นคนละลูกค้าและเคยผ่านรีโปนี้มาแล้ว**
// ชื่อรอบนี้คือ สบาย168 — ไม่มีคำว่า "เบท" คั่น
// ถึงอย่างนั้นหน้าเว็บก็ยังไม่พิมพ์ชื่อแบรนด์ตรงๆ เลยสักที่ แต่ interpolate ค่านี้แทน
// ค่านี้ไปโผล่ใน og:site_name, JSON-LD, terms/privacy และ <address>
export const BRAND_NAME = "สบาย168";

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
// ⚠️⚠️ **สบาย168 กลับมาเป็นแบรนด์ "ธีมสว่าง" หลังรอบก่อนเป็นธีมมืด — ค่านี้
// จึงเป็นหมึกเข้ม ไม่ใช่หมึกสว่างเหมือนรอบก่อน** อย่าเห็นว่าเป็นค่าเข้มแล้ว
// คิดว่าพิมพ์ผิด เหตุผล: bg.json ของดรอปนี้เป็น {"mode":"color","color":"#ccf7ff"}
// = **ฟ้าพาสเทลสว่าง** และ bg.json คือแหล่งเดียวของพื้นเพจ
// ห้าม "แก้" ให้กลับไปเป็นหมึกสว่างเพราะ "รอบก่อนเป็นแบบนั้น"
//
// ทิศของธีมรอบนี้ (อ่านให้จบก่อนแตะไฟล์ไหน):
//   เนื้อหา  — การ์ดขาว #ffffff (raised) / #f2fbff (กลาง) / #dff4fd (inset)
//              + หมึกเข้ม #0f3a4a และหัวข้อ #063a57
//   โครม     — navbar/footer/ticker/winners feed/Navfoot/CtaRedirect ใช้ผิวชุด
//              น้ำเงินมหาสมุทรลึก #063a57 / #04293d / #0a4f74 + ฟ้านำ #2cc3fc
//              และทอง #fdcb0c โดยมีหมึก #eafaff / #a9e3f9
//   พื้นเพจ  — #ccf7ff (จาก bg.json)
// ⚠️ รอบนี้โครมกับเนื้อหา **อยู่คนละทิศกัน** — โครมเข้มคร่อมเนื้อหาสว่าง ต่างจาก
// รอบก่อนที่มืดเหมือนกันทั้งคู่ สิ่งที่แยกหัว-ท้ายออกจากตัวหน้าคือ **ความต่างของ
// ความสว่าง บวกเส้นขอบฟ้า #2cc3fc / ทอง #fdcb0c**
// บล็อก <address> ใน footer ยัง paste verbatim ได้เหมือนเดิม (border-white/15
// bg-black/20 + ตัวอักษร inherit) เพราะ footer ทุกตัวในคลังเป็นผิวเข้มอยู่แล้ว
//
// ⚠️ รอบนี้ **ฟ้าสกายนำ คู่ทองคานารีเป็นสีที่สอง** และ **รอบนี้ไม่มีเขียวเป็นสี
// แบรนด์เลยสักเฉด** — เขียวที่ยังเหลืออยู่มีสองที่และเป็นสีเชิงความหมายทั้งคู่:
// LINE green #00B900 ของปุ่ม LINE และเขียว success ของฟีด (emerald-400/500/900
// จุด live + สถานะ "สำเร็จ") ซึ่งอยู่คู่ทุกแบรนด์มาตลอด **ห้ามเปลี่ยนสองชุดนี้
// ให้เป็นสีแบรนด์ เพราะนั่นคือการลบความหมายออกจาก UI**
// (เขียวของใบไม้/ผักในอาร์ตเวิร์ก และแดงของลายสก็อตกับรถแทรกเตอร์ เป็นวัตถุในภาพ
// **ไม่ใช่สีแบรนด์** ห้ามดึงเข้ามาเป็นสีของ UI)
// **ทั้งฟ้าและทองเคยถูกใช้มาแล้วหลายแบรนด์ในรีโปนี้ จึงต้องเทียบทีละค่า ไม่ใช่ทั้งวงศ์สี**
// ความต่างที่แท้จริงของรอบนี้มีสี่ข้อ:
//   1. สีอัตลักษณ์เป็น **ฟ้าสกาย** #2cc3fc (R44 G195 B252) ซึ่งเป็นค่า vivid ที่วัด
//      ได้จาก logo.webp เอง ⚠️ **บนการ์ดขาวมันได้แค่ 1.9:1 จึงเป็นเส้น/ออรา/พื้นถม
//      เท่านั้น ห้ามถือตัวอักษร** — บนพื้นถมนี้หมึกที่ใช้คือ #06293c (7.5:1)
//      ⚠️ ห่างจากฟ้าของแบรนด์ก่อนๆ ชัดเจน (อะซัวร์ 039cfa ของรวยแทร่168 · 32bcfb
//      ของนินจา168 · 2f9ff5 ของสบายเบท168 ซึ่งเป็นชื่อที่ใกล้ที่สุด) — **ห้าม "ปรับ"
//      ไปเป็นฮิวอื่นเพื่อไล่ระยะ เพราะจะขัดกับโลโก้**
//   2. สีไฮไลต์ `<strong>` ในเนื้อความเป็น **ทองลึก #8a6504 ตัวเดียว** (5.0:1 บน
//      การ์ดขาว) — **สงวนไว้งานเดียวนี้** ⚠️ **ห้ามใช้ #fdcb0c หรือ #fefb6b แทน
//      เพราะทั้งคู่ได้แค่ 1.5–1.1:1 บนพื้นสว่าง = มองไม่เห็น** และห้ามใช้ #0a7fbd
//      ซึ่งได้ 4.2:1 (ผ่านเฉพาะตัวอักษรขนาดใหญ่)
//   3. หมึกเนื้อความเป็น **น้ำเงินหมึกเข้ม** #0f3a4a (ค่าที่ export ด้านล่าง)
//      ได้ 12.2:1 บนการ์ด #ffffff · 11.4:1 บนอินเซ็ต #dff4fd · 10.7:1 บนพื้นเพจ
//      #ccf7ff — **ทั้งสามบริบทสว่างเหมือนกันหมด** จึงใช้ค่าเดียวได้จริง
//   4. สีที่สองเป็น **ทองคานารี** #fdcb0c / #fefb6b / #8a6504 ซึ่งมาจาก
//      **คำว่า "สบาย" ในโลโก้จริง** ไม่ได้คิดขึ้นเอง
//      **ปุ่ม CTA หลักคือพื้นถมไล่เฉดฟ้า 6bdcfb -> 2cc3fc -> 0a7fbd + หมึก #06293c**
//      (9.9 / 7.5 / 4.5:1 ผ่านทุก stop) **ห้ามสลับเป็นพื้นฟ้าแล้วใส่ตัวอักษรขาว**
//      **ปุ่ม CTA รองคือพื้นถมทอง fdcb0c / fefb6b + หมึก #2a1f02** (10.6 / 14.8:1)
//      หรือแบบ outline ขอบ #2cc3fc ตัวอักษร #063a57 บนพื้น #ffffff
//      (⚠️ #ccf7ff กับ #ffffff เป็นสองปลายที่แออัดโดยธรรมชาติ เป็นสีผิว/พื้น
//      **ไม่ใช่สีอัตลักษณ์** ความต่างบังคับไว้ที่ฟ้ากับทอง)
// ⚠️⚠️ **ตัวแยกที่แข็งที่สุดของรอบนี้ไม่ใช่เฉดสี แต่คือ "ธีมสว่าง"** — สามเจ้าที่
// เคยเดินฟ้า+ทอง (รวยแทร่168 / นินจา168 / สบายเบท168) ล้วนวางมันบนพื้นน้ำเงินหมึก
// มืดสนิท รอบนี้วางบนพื้นฟ้าพาสเทลสว่างกับการ์ดขาว
// นอกจากนั้นการหมุน variant (NavbarStyle7 + FooterPremium + Announcement6 +
// LatestWinners4 + Faq3 + ReviewCardSumo + การ์ดชุด Neumorphism/3Three/FloatingBadge/
// SevenThree/SevenThreeFloatingBadge/ContentBox/TwoPremium) คือสิ่งที่
// ทำให้รูปทรงของหน้าไม่ซ้ำ ไม่ใช่สี — ดู .claude/brand-spec-sabai168.md §3
// (รอบก่อนคือ ยูฟ้า168 ซึ่งใช้ชุด Premium/3ThreePremium/CyberCut/SevenThreePremium/
// SevenThreeNeumorphism/TwoCyberCut รอบนี้หมุนออกหมด เหลือทับแค่ ContentBox ซึ่งเป็น
// กล่องถาวรของ terms/privacy/404 และ FeatureHighlights ซึ่งเป็นคอมโพเนนต์เดียวในคลัง
// ที่รองรับรูปทรง sub-list)
// อ่านมาจากงานศิลป์ตรงๆ: vivid ของ logo.webp ให้ **#fefb6b #fdcb0c #fdfb63 #6bdcfb
// #2cc3fc = ทองคานารีคู่ฟ้าสกาย** ตรงกับที่ตาเห็น
// ⚠️ dominant/vivid ของ banner1.png กับ slide1.png เป็น **สีผิวนักแสดงกับไม้ของ
// โรงเรือน** (#e3aa8c #eab395 #b47b54 #f4b48b #9c531d #8a6524) ซึ่ง **ไม่ใช่สีแบรนด์
// เลย** — **palette.json จัดอันดับให้ แต่ไม่ได้ตีความให้** ไฟล์ที่ตัวเลขชี้ถูกคือ
// logo.webp เท่านั้น
// โลโก้อ่านตรงๆ ได้ว่า: บนพื้นโปร่งใส เป็น **คำว่า "สบาย" ตัวอักษรไทยสามมิติผิว
// มันวาวสีทองคานารี** ต่อด้วย **เลข "168" สามมิติผิวมันวาวสีฟ้าสกาย** ทั้งคู่ตัดขอบ
// ดำหนาและมีแสงสะท้อนขาว — **สองวัสดุคู่กัน ไม่มีมาสคอต ไม่มีสัญลักษณ์ประกอบเลย**
// แบนเนอร์เป็น **ฉากโรงเรือนปลูกผักกลางวันแดดจัด** — ฝั่งซ้ายเป็น **ผู้หญิงผมบลอนด์
// หมวกฟาง เสื้อครอปลายสก็อตแดง-ขาว ทับเอี๊ยมยีนส์ นั่งข้างตะกร้าผัก** มี **รถแทรกเตอร์
// สีแดง** ไกลๆ ริมซ้าย ฝั่งขวาเป็น **ผู้ชายผมบลอนด์ หมวกฟาง เสื้อเชิ้ตลายสก็อตแดง
// ทับเอี๊ยมยีนส์ ยืนพิงรั้วไม้ถือลังไม้ใส่ข้าวโพด** มี **หุ่นไล่กา** และ **ไก่** ด้านหลัง
// กลางภาพเป็น **ข้อความสามมิติ "สบาย" ทอง + "168" ฟ้า** ใต้ลงมา
// **"สล็อตเบทต่ำสบายเป๋า"** และ **ป้ายไม้ "ทุนน้อย เล่นง่าย ยอดเข้าบริษัทโดยตรง"**
// — **ไม่มีอัฒจันทร์สนามฟุตบอล ไม่มีไฟสปอตไลต์ ไม่มีลูกฟุตบอล ไม่มีตู้สล็อต 777
// ไม่มีไพ่เอซ ไม่มีมงกุฎทองแบบยูฟ้า168 (แบรนด์ขาออกรอบนี้ จึงเป็นตัวที่เสี่ยงหลงเหลือ
// มากที่สุด) ⚠️⚠️ และถึงแม้ โปรดี168 จะเคยใช้ฉากฟาร์มเหมือนกัน ของเขาเป็นฟาร์ม
// การ์ตูน — รอบนี้ **ไม่มีกังหันลมไม้ ไม่มียุ้งแดง ไม่มีกระต่ายการ์ตูนขนขาว
// ไม่มีหมูชมพู ไม่มีวัวขาว-ดำ ไม่มีแครอท ไม่มีดอกเดซี่ ไม่มีเด็กชายเอี๊ยมยีนส์
// หรือเด็กหญิงโบว์แดง ไม่มีถังไม้ใส่เหรียญ** เพราะรอบนี้เป็นภาพเสมือนจริงของผู้ใหญ่
// สองคน ไม่ใช่การ์ตูนสัตว์
// ไม่มีวัดไทย ไม่มีเจดีย์ ไม่มีสลากกินแบ่ง ไม่มีชุดไทยแบบรวยแท้168
// ไม่มีตัวอักษรเขียวมรกตแบบสาธุ168 ไม่มีหัวหมูการ์ตูนหน้ากากโจรแบบมีทรัพย์168
// ไม่มีไฉ่ซิงเอี๊ย ไม่มีห้องโถงหรูขาว-งาช้างแบบดวงเศรษฐี168 ไม่มีลูกบอลหวยแบบหวยคิง
// ไม่มีกล่องของขวัญแดงแบบรวยเทพ168 ไม่มีชุดลูกไม้ขาวผูกโบว์แดงแบบมีเฮ168
// ไม่มีนินจาการ์ตูน ไม่มีชูริเคนแบบนินจา168 ไม่มีถุงเงินสีฟ้าแบบรวยแทร่168
// ไม่มีแมวการ์ตูนขนขาวลายส้มแบบสบายเบท168 ไม่มีดอกซากุระชมพูแบบถอนชัวร์168
// ไม่มีแมวกวักนำโชค ไม่มีธงชาติสิงคโปร์แบบมีโชค168 ไม่มีอักขระมังกรจีน 龍 (GT66B)
// ไม่มีมาสคอตโจรการ์ตูน (TKB55) ไม่มีปีกเหยี่ยวน้ำเงิน (TSDET911) ไม่มีเป็ดการ์ตูน
// (DUCK1688) ไม่มีหัวเสือ (TIGERWIN369) และไม่มีสิงโตทองสวมมงกุฎ (ufalion168)**
// ⚠️⚠️ **ระวังที่สุด: "สบายเบท168" เป็นคนละลูกค้าที่ชื่อใกล้ที่สุดในรีโปนี้ และเคยเดิน
// ฟ้า+ทองเหมือนกัน (2f9ff5 ffc82e บนน้ำเงินหมึก) — รอบนี้คนละค่าและคนละธีม**
// ⚠️ **รอบนี้ไม่มีแดงทุกเฉด ไม่มีเขียวทุกเฉด (ยกเว้น LINE green กับเขียว success
// ของฟีด) ไม่มีชมพู/บานเย็น ไม่มีม่วง ไม่มีโรสโกลด์ ไม่มีส้ม ไม่มีทองแดงไหม้
// และไม่มีเงิน/โครเมียม (ซึ่งเป็นสีที่สองของรอบก่อน)**
// ⚠️ **ระวังสับสน: "ฟ้า" รอบนี้คือ #2cc3fc / #6bdcfb / #0a7fbd / #063a57 เท่านั้น
// และ "ทอง" คือ #fdcb0c / #fefb6b / #8a6504 เท่านั้น ห้ามเหมารวมว่าเจอฟ้าหรือทอง
// ที่ไหนคือของรอบนี้ ต้องเทียบทีละค่า** (ตารางค่าเต็มของทุกแบรนด์ที่ต้องกวาดออกอยู่ใน
// .claude/brand-spec-sabai168.md §2)
// ⚠️ **เขียวของใบไม้/ผัก แดงของลายสก็อตกับรถแทรกเตอร์ และสีผิวนักแสดง เป็นวัตถุ
// ในภาพ ไม่ใช่สีแบรนด์** ห้ามดึงเข้ามาเป็นสีของ UI
// ส่วน bg.json ของดรอปนี้เป็น {"mode":"color","color":"#ccf7ff"} = **ฟ้าพาสเทลสว่าง**
// (ค่านี้มาจากไฟล์ ไม่ได้สืบทอด — ให้เปิดดูทุกรอบ และรอบนี้ **กลับทิศจากรอบก่อน**
// รอบก่อนเป็น #000000 ดำสนิท)
// ตัวอักษรเนื้อความเป็นน้ำเงินหมึกเข้ม — ค่านี้คือสีนั้น
//
// มันทำงานสองหน้าที่พร้อมกัน: เป็นสีย่อหน้าในการ์ด และเป็นสีพื้นของทั้งเว็บที่หน้า
// terms/privacy/404 (ซึ่งไม่ประกาศสีเองเลยโดยตั้งใจ) พึ่งอยู่ รอบนี้ทั้งสองบริบท
// วางอยู่บนพื้นสว่างเหมือนกัน จึงใช้ค่าเดียวกันได้จริง
// #0f3a4a บน #ffffff ≈ 12.2:1 · บนพื้นเพจ #ccf7ff ≈ 10.7:1 · บน #dff4fd ≈ 11.4:1
// ⚠️ ทองลึก #8a6504 ได้ ≈ 5.0:1 บนการ์ดขาว จึงเป็นตัวที่ใช้ไฮไลต์ <strong>
// ในเนื้อความ (สงวนไว้งานเดียวนี้)
// ⚠️ **น้ำเงินหมึก #063a57 ได้ 7.5:1 บนการ์ดขาว — ถือตัวอักษรได้ ใช้กับหัวข้อ**
// **ฟ้าลึก #0a7fbd ได้แค่ 4.2:1 — ใช้ได้เฉพาะตัวอักษรขนาดใหญ่ (≥24px หรือ
// ≥18.7px bold) และ UI accent ห้ามใช้กับเนื้อความขนาดปกติ**
// ⚠️ **#2cc3fc #6bdcfb #cdf2ff #9ae0fa #fdcb0c #fefb6b ห้ามถือตัวอักษรบนพื้นสว่าง
// เด็ดขาด** (1.5–2.4:1) เป็นพื้นถม/ขอบ/ออราเท่านั้น — แต่บนผิวโครม #063a57
// ทั้งหกตัวถือตัวอักษรได้สบาย (5.9–11.4:1)
// **ปุ่ม CTA หลักคือพื้นถมไล่เฉดฟ้า #6bdcfb -> #2cc3fc -> #0a7fbd + หมึก #06293c**
// (9.9 / 7.5 / 4.5:1 ผ่านทุก stop) **ห้ามสลับเป็นพื้นฟ้าแล้วใส่ตัวอักษรขาว**
// ⚠️ #ffffff #f2fbff #dff4fd #04293d #0a4f74 ห้ามถือตัวอักษร เป็นสีพื้น/เส้นเท่านั้น
// (navbar/footer/ticker ประกาศสีตัวอักษรของตัวเองไว้ครบ ค่านี้จึงไปไม่ถึงมัน)
export const BRAND_TEXT = "#0f3a4a";

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
