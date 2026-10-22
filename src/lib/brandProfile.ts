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

// รอบนี้ (เงินทอง168 2026-10-22) หมุนออกจาก kanit ของรอบก่อน (พักยก168) ไปเป็น
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
// ชื่อที่ "เห็นบนเว็บ" รอบนี้คือ เงินทอง168 — **ภาษาไทยผสมเลข** เขียนติดกันเป็นคำเดียว
// ไม่มีเว้นวรรค โลโก้ แบนเนอร์ และสไลด์ของดรอป 2026-10-22 เขียนตรงกันหมด:
// **ตราชั่งทองสามมิติ (ตาชั่งสองจานมีเหรียญทองกองอยู่ทั้งสองข้าง) ตามด้วยคำว่า
// "เงินทอง" ตัวอักษรไทยสามมิติผิวทองมันวาว ต่อด้วยเลข "168" ผิวโครเมียมเงิน**
// ⚠️⚠️ **แกนของแบรนด์รอบนี้คือ "เว็บสล็อตออนไลน์" ล้วน** — บรีฟเรียกตัวเองว่า
// "สล็อตเงินดี อัตราจ่ายสูง ค่ายเกมลิขสิทธิ์แท้100%" และพูดถึง
// **เกมสล็อตมากกว่า 1,000 เกม จากค่ายมาตรฐานสากล · ค่า RTP · ตารางจ่ายรางวัล**
// พร้อม **โปรโมชั่นคืนยอดเสีย 0.3% · แนะนำเพื่อน 0.8%** กับ **ขั้นตอนสมัคร 3 ขั้น**
// และ **ช่องทางติดต่อแอดมิน 24ชม.**
// ⚠️ **นี่ไม่ใช่เว็บหวย** → /ตรวจหวย กับ /แนวทาง อยู่ใน src/pages-disabled/ แล้ว
// และลิงก์ของมันไม่อยู่ใน navbar/footer ที่ใช้งานอยู่ — ห้ามย้ายกลับเข้า src/pages/
// ⚠️ คำกลุ่มหวยทุกคำที่เจอเป็นคำค้างของแบรนด์เก่า ไม่ใช่ของรอบนี้:
// "หวย" / "ตรวจหวย" / "แนวทาง" / "หวยรัฐบาลไทย" / "หวยฮานอย" / "หวยลาว" /
// "ลาวพัฒนา" / "หวยหุ้นต่างประเทศ" / "สลาก" / "เลขเด็ด" / "2 ตัว 100" /
// "3 ตัว 1,000" / "แทงหวย" / "บริษัทแม่" / "เว็บแม่" / "รวยแท้"
// ⚠️⚠️ ส่วนคำของ **พักยก168 รอบก่อน (แบรนด์ขาออก เสี่ยงหลงเหลือสูงสุด)** คือ
// "เจ้าดัง" / "ไม่ผ่านม้า" / "บัญชีม้า" / "ค่ายแท้" / "เดิมพันค่ายแท้" /
// "ถูกลิขสิทธิ์100%" / "ทดลองเล่นฟรี" / "โหมดทดลองเล่น" / "เว็บสล็อตเจ้าดัง"
// — **ไม่มีในบรีฟรอบนี้เลยสักคำ ห้ามเขียนกลับเข้ามา** ⚠️ คำว่า "ทดลองเล่น"
// เหลือรอดได้ที่เดียวคือ **ชื่อ route /ทดลองเล่น** ซึ่งเป็นหน้าที่มีอยู่จริง
// ไม่ใช่คำกล่าวอ้างที่ copy ของแบรนด์นี้พูดถึงเกมของตัวเองได้
// ส่วนคำของ **สบาย168** คือ "เบทต่ำ" / "สบายเป๋า" / "ทุนน้อย" / "เล่นง่าย" /
// "ยอดเข้าบริษัทโดยตรง" / "ปรับระดับการเดิมพัน" / "ยอดเดิมพันขั้นต่ำ" / "งบประมาณ"
// ส่วนคำของ **ยูฟ้า168** คือ "ฐานหลักเว็บพนันออนไลน์" / "แทงบอล" / "ฟุตบอล" /
// "ราคาต่อรอง" / "ค่าน้ำ" / "บาคาร่า" / "เกมไพ่" / "เว็บตรง100%" / "ไม่มีขั้นต่ำ"
// **สิ่งที่ "ใช้ได้" ขึ้นกับบรีฟของรอบนั้นๆ เท่านั้น ไม่ได้สืบทอดข้ามรอบ**
// ⚠️ คำของ **โปรดี168** คือ "สล็อตแท้โปรเด็ด" / "ค่ายตรงมาแรง" / "อัปเดตก่อนสิ้นปี" /
// "ปี 2026" — ⚠️ แต่ **"ตารางจ่ายรางวัล" กับ "ลิขสิทธิ์แท้100%" รอบนี้ใช้ได้**
// เพราะเป็นคำของบรีฟรอบนี้เอง (content.txt บรรทัด 1, 3, 6)
// **บรีฟรอบนี้ไม่ได้ระบุชื่อค่ายเกม ชื่อธนาคาร หรือผู้ให้บริการแม้แต่รายเดียว**
// — พูดแค่ "ค่ายมาตรฐานสากล" แล้วจบ
// ตัวเลขที่ใช้ได้มีแค่ **1,000 เกม · 0.3% · 0.8% · 24ชม. · 3 ขั้นตอน · 100%**
// ถ้าเจอ "ลูกบอลหวยสีทองเลข 9" / "หวยคิง" คือคำของ **หวยคิง**
// ถ้าเจอ "เศรษฐีพนันมือ1" / "ผู้สอน" / "บทเรียน" / "หลักสูตร" / "สูตร" / "เทคนิค"
// คือคำของ **ดวงเศรษฐี168** ถ้าเจอ "CEO66" / "JEDI66" / "SUMOHENG" / "BRAVO168" /
// "LAPDEE88" / "LOTTOPLUS" คือคำค้างใน alt= และ logo fallback ของ navbar/footer
// inventory ถ้าเจอ "ระบบดูแลการเงิน" / "ฝากถอนทุกช่องทาง" / "ปลอดภัยไม่ผ่านม้า"
// คือของ **มีทรัพย์168** ถ้าเจอ "ถอนง่าย" / "ไม่มีรีวิวเสีย" คือของ **ถอนชัวร์168**
// และถ้าเจอ PG SOFT / JOKER / JILI / "นำเข้าตรงจากสิงคโปร์" คือคำของ **มีโชค168**
// ⚠️⚠️ รอบนี้ **ทองนำ เป็นรอบที่สองติดกัน** (รอบก่อนก็ทอง) — ⚠️ **ทองถูกใช้มาแล้ว
// เกือบทุกแบรนด์ในรีโปนี้** จึง **ห้ามเทียบด้วยวงศ์สี ต้องเทียบทีละค่า**
// ทองรอบนี้คือ #f5ba14 (แกน) กับ #fcee52 (สว่าง) ซึ่งวัดได้จาก logo.webp เอง
// ⚠️ **เพื่อนบ้านที่ใกล้ที่สุดและต้องกวาดออกให้หมด**: eeae12 กับ fded41 ของ
// **พักยก168 รอบก่อนทันที** (eeae12 ห่างจาก #f5ba14 แค่ R7/G12/B2) ·
// f7c92b ของ **ขวัญใจ168** (ซึ่งทาธีม NavbarStyle10 ของรอบนี้อยู่) ·
// d4922c ของ **ufalion168** (ซึ่งทาธีม FooterStyle2 ของรอบนี้อยู่) ·
// e6a416 ของ ยูฟ้า168 · e5a81b ของ UFA324 · fdcb0c ของ สบาย168
// ⚠️ **ตัวแยกของรอบนี้จากพักยก168 (ซึ่งเป็นทอง+เงินเหมือนกัน)**: (ก) ค่าทองคนละค่า
// (#f5ba14/#fcee52 vs eeae12/fded41) (ข) **วัสดุที่สองรอบนี้คือครีมอุ่น #ecd5c4
// ไม่ใช่เทาโครเมียม** — เทาโครเมียม (e0e0df c0c0bf a1a09e) เป็นของพักยก168 และ
// (e8ecf1 a8b2bf 78828f) เป็นของยูฟ้า168 **ห้ามเอาแรมป์เทาเงินกลับเข้ามารอบนี้**
// (ค) การหมุน variant ทั้งชุด — ตารางค่าเต็มอยู่ใน
// .claude/brand-spec-ngernthong168.md §2 และ §3
// ⚠️⚠️ bg.json ของดรอปนี้เป็น {"mode":"color","color":"#29210f"} = **น้ำตาลโอลีฟเข้ม**
// จึงยังเป็นธีมมืดเหมือนรอบก่อน **แต่คนละค่า** (รอบก่อน 291d0f ต่างกันที่เขียว 4 หน่วย)
// — **ค่ามาจากไฟล์ ให้เปิดดูทุกรอบ ห้ามเดาว่าเท่าเดิม**
// ส่วนโดเมนรอบนี้คือ เงินทอง168.com — **IDN ภาษาไทย ต้องแปลง punycode เป็น
// xn--168-1kla9gn5n9bwg.com** (ต่างจากรอบก่อนที่เป็น pakyok168.club ซึ่งเป็น
// ASCII ล้วน) ⚠️ TLD รอบนี้กลับมาเป็น **.com**
// ถ้า operator ไม่ได้ระบุโดเมนมาในคำสั่ง ห้ามแตะ site: เด็ดขาด — รอบนี้ operator
// ระบุมาตรงๆ ว่า real url is "https://เงินทอง168.com"
// ค่านี้คือชื่อที่คนอ่านเห็นบนโลโก้ ไม่ใช่ host — host มาจาก site:
// ใน astro.config.mjs เท่านั้น ทั้งสองค่ามาจาก operator ตรงๆ
//
// iconSlug (ด้านล่าง) รอบนี้ชื่อแบรนด์เป็นไทยผสมเลข [^a-z0-9] จึงกินอักษรไทยทิ้งหมด
// เหลือ **"168"** เท่ากับสิบกว่าแบรนด์ไทยก่อนหน้า (มีทรัพย์168 / ดวงเศรษฐี168 /
// รวยเทพ168 / มีเฮ168 / รวยแทร่168 / นินจา168 / สบายเบท168 / ถอนชัวร์168 / มีโชค168 /
// ขวัญใจ168 / รับตัง168 / สมหวัง168 / รวยแท้168 / โปรดี168 / สบาย168 / พักยก168)
// ⚠️ แปลว่า ?v= รอบนี้ **ไม่ bust แคชต่างจากแบรนด์ไทยเหล่านั้น** ขณะที่ไบต์ไอคอนเปลี่ยน
// — เป็นข้อจำกัดที่รู้อยู่ของสูตร ไม่ใช่บั๊กที่ต้องแก้มือ
// ห้ามแก้ iconVersion ด้วยมือไม่ว่ากรณีใด เพราะค่านี้ต้องคงที่ต่อแบรนด์
// สังเกตว่า slug มาจากชื่อแบรนด์ จึงไม่เท่ากับ label ใน wrangler.toml ซึ่งมาจาก
// "โดเมน" — รอบนี้คนละค่ากันสิ้นเชิง ("168" vs "xn--168-1kla9gn5n9bwg")
//
// รอบนี้บรีฟ (src/assets/content.txt) เขียน "เงินทอง168" ตรงกับอาร์ตเวิร์กและคำสั่ง
// ของ operator ทุกจุด ไม่มีความขัดแย้งแบบรอบ UOK365 ที่บรีฟยังเป็นชื่อแบรนด์ก่อนหน้า
// หน้าเว็บไม่พิมพ์ชื่อแบรนด์ตรงๆ เลยสักที่ แต่ interpolate ค่านี้แทน
// ค่านี้ไปโผล่ใน og:site_name, JSON-LD, terms/privacy และ <address>
export const BRAND_NAME = "เงินทอง168";

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
// ⚠️⚠️ **เงินทอง168 เป็นแบรนด์ "ธีมมืด" เหมือนรอบก่อน — ค่านี้จึงเป็นหมึกสว่าง**
// อย่าเห็นว่าเป็นค่าสว่างแล้วคิดว่าพิมพ์ผิด เหตุผล: bg.json ของดรอปนี้เป็น
// {"mode":"color","color":"#29210f"} = **น้ำตาลโอลีฟเข้ม** และ bg.json คือแหล่งเดียว
// ของพื้นเพจ ⚠️ **ค่านี้ไม่เท่ากับรอบก่อน (291d0f) ต่างกันที่เขียว 4 หน่วย**
// — ให้เปิด bg.json อ่านทุกรอบ ห้ามสืบทอดค่าข้ามรอบ
//
// ทิศของธีมรอบนี้ (อ่านให้จบก่อนแตะไฟล์ไหน):
//   เนื้อหา  — การ์ดน้ำตาลเข้ม #3d3016 (raised) / #332810 (กลาง) / #201906 (inset)
//              + หมึกครีม #ecd5c4 และหัวข้อทอง #fcee52
//   โครม     — navbar/footer/ticker/winners feed/Navfoot/CtaRedirect ใช้ผิวชุด
//              น้ำตาลลึก #2e2512 (กลาง) / #1b1407 (จม) / #4d3c15 (ยก) + ทองนำ
//              #f5ba14 กับ #fcee52 โดยมีหมึก #ecd5c4 / #d2b9a4
//   พื้นเพจ  — #29210f (จาก bg.json)
// ⚠️ รอบนี้โครมกับเนื้อหา **อยู่ทิศเดียวกัน (มืดทั้งคู่)** สิ่งที่แยกหัว-ท้ายออกจาก
// ตัวหน้าคือ **โทนน้ำตาลที่ลึกกว่า บวกเส้นขอบทอง #f5ba14 และออราทอง**
// ไม่ใช่ความต่างของความสว่าง **ห้าม "แก้" ครึ่งใดครึ่งหนึ่งให้สว่างขึ้น**
// บล็อก <address> ใน footer ยัง paste verbatim ได้เหมือนเดิม (border-white/15
// bg-black/20 + ตัวอักษร inherit) เพราะ footer ทุกตัวในคลังเป็นผิวเข้มอยู่แล้ว
//
// ⚠️ รอบนี้ **ทองนำ คู่ครีมอุ่นเป็นวัสดุที่สอง** และ **รอบนี้ไม่มีเขียวเป็นสี
// แบรนด์เลยสักเฉด** — เขียวที่ยังเหลืออยู่มีสองที่และเป็นสีเชิงความหมายทั้งคู่:
// LINE green #00B900 ของปุ่ม LINE และเขียว success ของฟีด (emerald-400/500/900
// จุด live + สถานะ "สำเร็จ") ซึ่งอยู่คู่ทุกแบรนด์มาตลอด **ห้ามเปลี่ยนสองชุดนี้
// ให้เป็นสีแบรนด์ เพราะนั่นคือการลบความหมายออกจาก UI**
// (สีผิวนักแสดง ชุดซาตินสีงาช้าง รูปปั้นเสือดำ และลิปสติกแดงในอาร์ตเวิร์ก เป็นวัตถุ
// ในภาพ **ไม่ใช่สีแบรนด์** ห้ามดึงเข้ามาเป็นสีของ UI)
// ⚠️⚠️ **ทองนำสองรอบติดกันแล้ว (รอบก่อนก็ทอง) จึงต้องเทียบทีละค่า ไม่ใช่ทั้งวงศ์สี**
// ความต่างที่แท้จริงของรอบนี้มีสี่ข้อ:
//   1. สีอัตลักษณ์เป็น **ทองแกน** #f5ba14 (R245 G186 B20) ซึ่งเป็นค่าที่วัดได้จาก
//      logo.webp เอง ได้ 7.3:1 บนการ์ด #3d3016 จึง **ถือตัวอักษรได้** และใช้เป็น
//      เส้น/ออรา/active ได้ด้วย ⚠️ **เพื่อนบ้านใกล้สุดคือ eeae12 ของพักยก168
//      รอบก่อนทันที (ห่าง R7/G12/B2) · f7c92b ของขวัญใจ168 ซึ่งทาธีม NavbarStyle10
//      ของรอบนี้อยู่ (ห่าง R2/G15/B23) · d4922c ของ ufalion168 ซึ่งทาธีม
//      FooterStyle2 ของรอบนี้อยู่ — ต้องกวาดทั้งสามค่านั้นออกให้หมด** และ
//      **ห้าม "ปรับ" ไปเป็นฮิวอื่นเพื่อไล่ระยะ เพราะจะขัดกับโลโก้**
//   2. สีไฮไลต์ `<strong>` ในเนื้อความเป็น **ทองสว่าง #fcee52 ตัวเดียว** (10.7:1 บน
//      การ์ด #3d3016) — **สงวนไว้งานเดียวนี้ พร้อมกับหัวข้อ** ⚠️ **ห้ามใช้ #b37c0b
//      แทน เพราะได้แค่ 2.0:1 บนการ์ดมืด = มองไม่เห็น**
//   3. หมึกเนื้อความเป็น **ครีมอุ่น** #ecd5c4 (ค่าที่ export ด้านล่าง)
//      ได้ 9.9:1 บนการ์ด #3d3016 · 12.1:1 บนพื้นเพจ #29210f
//      — **ทั้งสองบริบทมืดเหมือนกันหมด** จึงใช้ค่าเดียวได้จริง
//   4. **วัสดุที่สองคือครีมอุ่น ไม่ใช่เทาโครเมียม** — #ecd5c4 เป็นค่าที่ share
//      สูงสุดใน slide1.png (ชุดซาตินสีงาช้างของผู้หญิงในภาพ) ⚠️⚠️ **เลข "168"
//      ในโลโก้เป็นโครเมียมจริง แต่แรมป์เทาเงินเป็นของพักยก168 (e0e0df c0c0bf
//      a1a09e) และยูฟ้า168 (e8ecf1 a8b2bf 78828f) ไปแล้ว — ห้ามเอาเทาเงินกลับ
//      เข้ามาเป็นสี UI รอบนี้ นี่คือหนึ่งในสองตัวที่แยกรอบนี้จากรอบก่อน**
//      **ปุ่ม CTA หลักคือพื้นถมไล่เฉดทอง #fcee52 -> #f5ba14 -> #b37c0b + หมึก #201906**
//      (14.5 / 9.9 / 4.8:1 ผ่านทุก stop) **ห้ามสลับเป็นพื้นทองแล้วใส่ตัวอักษรขาว**
//      **ปุ่ม CTA รองคือแบบ outline ขอบ #f5ba14 ตัวอักษร #fcee52 บนพื้น #2e2512**
// ⚠️⚠️ **ตัวแยกที่แข็งที่สุดของรอบนี้จากพักยก168 (รอบก่อน ซึ่งเดินทอง+เงินเหมือนกัน)
// คือ (ก) ค่าทองคนละค่า (ข) วัสดุที่สองเป็นครีมอุ่นไม่ใช่เทาโครเมียม**
// นอกจากนั้นการหมุน variant (NavbarStyle10 + FooterStyle2 + Announcement2 +
// LatestWinners2 + Faq2 + ReviewCardSumo + การ์ดชุด FloatingBadge/3ThreeCyberCut/
// Neumorphism/SevenThreeNeumorphism/SevenThree/ContentBox/TwoCyberCut) คือสิ่งที่
// ทำให้รูปทรงของหน้าไม่ซ้ำ ไม่ใช่สี — ดู .claude/brand-spec-ngernthong168.md §3
// (รอบก่อนคือ พักยก168 ซึ่งใช้ชุด NavbarStyle4Black/FooterStyle3/AnnouncementPremium/
// LatestWinners3/Faq4/ReviewCardSumo2/Premium/3ThreeNeumorphism/CyberCut/
// SevenThreePremium/SevenThreeCyberCut/TwoNeumorphism รอบนี้หมุนออกหมด เหลือทับแค่
// ContentBox ซึ่งเป็นกล่องถาวรของ terms/privacy/404 และ FeatureHighlights ซึ่งเป็น
// คอมโพเนนต์เดียวในคลังที่รองรับรูปทรง sub-list)
// อ่านมาจากงานศิลป์ตรงๆ: ค่า vivid ที่วัดจาก logo.webp ให้ **#f5ba14 #fcee52 #fdec49
// #fcd62a #e3a313 = ทองไล่เฉด** ส่วน #ecd5c4 กับ #f2ddcc มาจาก slide1.png
// ⚠️ dominant ของ banner1.png เป็น **สีน้ำตาลของฉากห้องนิรภัย** (#341c0c #442c1b
// #23130a) ซึ่งเป็น **สีพื้นผิว ไม่ใช่สีอัตลักษณ์** — **palette.json จัดอันดับให้
// แต่ไม่ได้ตีความให้** ไฟล์ที่ตัวเลขชี้ถูกคือ logo.webp เท่านั้น
// โลโก้อ่านตรงๆ ได้ว่า: บนพื้นขาว เป็น **ตราชั่งทองสามมิติสองจาน มีเหรียญทองกอง
// อยู่บนจานทั้งสองข้าง เสาและคานเป็นทองเงางาม** ต่อด้วย **คำว่า "เงินทอง"
// ตัวอักษรไทยสามมิติผิวทองมันวาว** และ **เลข "168" ผิวโครเมียมเงิน** ทั้งหมด
// ตัดขอบดำหนาและมีแสงสะท้อนขาว — **สองวัสดุคู่กัน โดยมีตราชั่งทองเป็นสัญลักษณ์
// ประจำแบรนด์ตัวเดียว**
// แบนเนอร์เป็น **ฉากห้องนิรภัยทองคำ** — **ประตูเซฟวงกลมทองเหลือง** **ชั้นวางทองคำแท่ง**
// **โคมระย้าทอง** และ **รูปปั้นเสือดำฝั่งขวา** เป็นฉากหลัง ฝั่งซ้ายเป็น
// **ผู้หญิงสูงวัยผมขาวสั้นดัดลอน สวมแว่นกันแดดดำทรงใหญ่ ลิปสติกแดง ใส่ชุดซาติน
// สีงาช้าง สวมสร้อยคอทอง ต่างหูทอง แหวนทองหลายวง และนาฬิกาทอง มือขวาคลี่ปึกธนบัตร
// ดอลลาร์เป็นรูปพัด นั่งอยู่บนโซฟาหนังสีน้ำตาลเข้ม** รอบตัวมี **ทองคำแท่งกองสูง
// ปึกธนบัตร เหรียญทอง และหีบสมบัติ** กลางภาพเป็น **ข้อความสามมิติ "เงินทอง" ทอง +
// "168" โครเมียม ตามด้วย "สล็อตเงินดี" ทองใต้มงกุฎทอง** และ **ป้ายดำขอบทอง
// "อัตราจ่ายสูง ค่ายเกมลิขสิทธิ์แท้ 100%"**
// — **ไม่มีหัวมังกรจีนทอง ไม่มีรูปปั้นม้าทอง ไม่มีผู้ชายสูทดำถือซิการ์แบบพักยก168
// (แบรนด์ขาออกรอบนี้ จึงเป็นตัวที่เสี่ยงหลงเหลือมากที่สุด) ไม่มีโรงเรือนปลูกผัก
// ไม่มีหมวกฟาง ไม่มีรถแทรกเตอร์แดงแบบสบาย168 ไม่มีอัฒจันทร์สนามฟุตบอล
// ไม่มีลูกฟุตบอลแบบยูฟ้า168 ไม่มีวัดไทย ไม่มีเจดีย์ ไม่มีสลากกินแบ่งแบบรวยแท้168
// ไม่มีตัวอักษรเขียวมรกตแบบสาธุ168 ไม่มีหัวหมูการ์ตูนหน้ากากโจรแบบมีทรัพย์168
// ไม่มีไฉ่ซิงเอี๊ย ไม่มีห้องโถงหรูขาว-งาช้างแบบดวงเศรษฐี168 ไม่มีลูกบอลหวยแบบหวยคิง
// ไม่มีกล่องของขวัญแดงแบบรวยเทพ168 ไม่มีชุดลูกไม้ขาวผูกโบว์แดงแบบมีเฮ168
// ไม่มีนินจาการ์ตูน ไม่มีชูริเคนแบบนินจา168 ไม่มีถุงเงินสีฟ้าแบบรวยแทร่168
// ไม่มีแมวการ์ตูนขนขาวลายส้มแบบสบายเบท168 ไม่มีดอกซากุระชมพูแบบถอนชัวร์168
// ไม่มีแมวกวักนำโชค ไม่มีธงชาติสิงคโปร์แบบมีโชค168 ไม่มีอักขระมังกรจีน 龍 (GT66B)
// ไม่มีมาสคอตโจรการ์ตูน (TKB55) ไม่มีปีกเหยี่ยวน้ำเงิน (TSDET911) ไม่มีเป็ดการ์ตูน
// (DUCK1688) ไม่มีหัวเสือ (TIGERWIN369) และไม่มีสิงโตทองสวมมงกุฎ (ufalion168)**
// ⚠️ **มงกุฎทองมีอยู่จริงในรูปรอบนี้ แต่เป็นเครื่องประดับเหนือข้อความ ไม่ใช่สัญลักษณ์
// ประจำแบรนด์แบบ ufalion168 หรือ หวยคิง — สัญลักษณ์ของรอบนี้คือตราชั่งทองตัวเดียว**
// ⚠️ **รอบนี้ไม่มีแดงทุกเฉด ไม่มีเขียวทุกเฉด (ยกเว้น LINE green กับเขียว success
// ของฟีด) ไม่มีชมพู/บานเย็น ไม่มีม่วง ไม่มีโรสโกลด์ ไม่มีส้ม ไม่มีฟ้า/น้ำเงิน
// และ **ไม่มีแรมป์เทาเงิน** (ซึ่งเป็นวัสดุที่สองของรอบก่อน)**
// ⚠️ **ระวังสับสน: "ทอง" รอบนี้คือ #f5ba14 / #fcee52 / #b37c0b เท่านั้น
// และ "ครีม" คือ #ecd5c4 / #d2b9a4 เท่านั้น ห้ามเหมารวมว่าเจอทองที่ไหนคือของรอบนี้
// ต้องเทียบทีละค่า** (ตารางค่าเต็มของทุกแบรนด์ที่ต้องกวาดออกอยู่ใน
// .claude/brand-spec-ngernthong168.md §2)
// ตัวอักษรเนื้อความเป็นครีมอุ่น — ค่านี้คือสีนั้น
//
// มันทำงานสองหน้าที่พร้อมกัน: เป็นสีย่อหน้าในการ์ด และเป็นสีพื้นของทั้งเว็บที่หน้า
// terms/privacy/404 (ซึ่งไม่ประกาศสีเองเลยโดยตั้งใจ) พึ่งอยู่ รอบนี้ทั้งสองบริบท
// วางอยู่บนพื้นมืดเหมือนกัน จึงใช้ค่าเดียวกันได้จริง
// #ecd5c4 บน #3d3016 ≈ 9.9:1 · บนพื้นเพจ #29210f ≈ 12.1:1 · บน #201906 ≈ 13.3:1
// ⚠️ ทองสว่าง #fcee52 ได้ ≈ 10.7:1 บนการ์ดมืด จึงเป็นตัวที่ใช้ไฮไลต์ <strong>
// ในเนื้อความและใช้กับหัวข้อ (สงวนไว้สองงานนี้)
// ⚠️ **ทองแกน #f5ba14 ได้ 7.3:1 บนการ์ดมืด — ถือตัวอักษรได้ ใช้กับ accent/เส้น/active**
// **ครีมจาง #d2b9a4 ได้ 8.1:1 บนโครม — ถือตัวอักษรได้**
// ⚠️ **#b37c0b ห้ามถือตัวอักษรบนพื้นมืดเด็ดขาด** (2.0:1) เป็นพื้นถม/ขอบ/ออราเท่านั้น
// **ปุ่ม CTA หลักคือพื้นถมไล่เฉดทอง #fcee52 -> #f5ba14 -> #b37c0b + หมึก #201906**
// (14.5 / 9.9 / 4.8:1 ผ่านทุก stop) **ห้ามสลับเป็นพื้นทองแล้วใส่ตัวอักษรขาว**
// ⚠️ #29210f #3d3016 #332810 #201906 #2e2512 #1b1407 #4d3c15 ห้ามถือตัวอักษร
// เป็นสีพื้น/เส้นเท่านั้น
// (navbar/footer/ticker ประกาศสีตัวอักษรของตัวเองไว้ครบ ค่านี้จึงไปไม่ถึงมัน)
export const BRAND_TEXT = "#ecd5c4";

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
