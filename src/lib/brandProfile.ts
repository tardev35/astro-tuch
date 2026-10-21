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

// รอบนี้ (มีทรัพย์168 2026-10-21) หมุนออกจาก google-sans ของรอบก่อน (ดวงเศรษฐี168)
// กลับไปเป็น kanit เพื่อให้ชุด @font-face ไม่ซ้ำกันสองรอบติด — การหมุนสลับไปมา
// ทุกรอบคือสิ่งที่ตัดลายนิ้วมือข้ามแบรนด์ชุดนั้นลงครึ่งหนึ่ง ไม่ใช่การเลือกว่า
// ฟอนต์ไหน "ดีกว่า" ทั้งสองตัว self-host เหมือนกัน ไม่มี request ออกนอกโดเมน
// ผลข้างเคียงที่ตั้งใจ: แบรนด์นี้จะ ship @font-face + preload ชุด
// /fonts/kanit-v17-latin_thai-*.woff2 และจะ **ไม่** ship ชุด google-sans-v70-*
// ของรอบก่อนเลย — และต้องสลับกลับอีกรอบหน้า
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
// ชื่อที่ "เห็นบนเว็บ" รอบนี้คือ มีทรัพย์168 — **ภาษาไทยผสมเลข** เขียนติดกันเป็นคำเดียว
// ไม่มีเว้นวรรค (เหมือนรอบก่อน) โลโก้ แบนเนอร์ และสไลด์ของดรอป 2026-10-21 เขียนตรงกันหมด:
// **หัวหมูการ์ตูนสีชมพูอ่อน สวมหน้ากากโจรสีดำ ยิ้มแลบลิ้น** ถัดมาเป็นคำว่า
// **"มีทรัพย์" ตัวอักษรไทยสามมิติไล่เฉดชมพูเข้มไปชมพูอ่อน ขอบขาว** ต่อด้วย
// **เลข "168" สามมิติผิวเงิน-ขาวมันวาว**
// ⚠️ **แกนของแบรนด์รอบนี้คือ "ระบบดูแลการเงิน" — ช่องทางฝากถอนผ่านธนาคารและวอลเลท**
// บรีฟเรียกตัวเองว่า "ระบบดูแลการเงิน ฝากถอนทุกช่องทาง ปลอดภัยไม่ผ่านม้า" และพูดถึง
// สล็อต · ไฮโล · ยิงปลา · หวย · บอล (**ห้าหมวด**) บวกกับ **โปรโมชั่นคืนยอดเสีย 0.3%
// และแนะนำเพื่อน 0.8%** จุดที่บรีฟย้ำซ้ำที่สุดคือ **ความปลอดภัยของบัญชีรับเงิน /
// การตรวจชื่อบัญชีปลายทางก่อนโอน / การเลี่ยงบัญชีม้าและบัญชีแอบอ้าง**
// ⚠️ **นี่ไม่ใช่เว็บหวย** ถึงบรีฟจะเอ่ยถึงหวย แต่เป็น 1 ใน 5 ประเภทเกมเท่านั้น
// ไม่ใช่แกนของเว็บ และคำสั่งของ operator ไม่มีคำว่า "เว็บหวย" → /ตรวจหวย กับ /แนวทาง
// จึงยังจอดอยู่ที่ src/pages-disabled/ และห้ามมีลิงก์ในเมนูหรือฟุตเตอร์
// ⚠️ คำ "สอนเล่น" ทุกคำที่เจอเป็น **คำค้างของ ดวงเศรษฐี168 รอบก่อน** ไม่ใช่ของรอบนี้:
// "เว็บสอนเล่นเกมออนไลน์" / "จากเศรษฐีพนันมือ1" / "เศรษฐีพนันมือ1" / "ผู้สอน" /
// "บทเรียน" / "หลักสูตร" / "หัวข้อเรียน" / "สมัครเรียน" / "สูตร" / "เทคนิค" /
// "ความน่าจะเป็น" / "ตารางจ่ายรางวัล" / "แนวทางศึกษาความเสี่ยง" / "3 ขั้นตอน"
// ⚠️ **"บาคาร่า" ก็เป็นคำค้างของรอบก่อน** — บรีฟรอบนี้ระบุ สล็อต ไฮโล ยิงปลา หวย บอล
// เท่านั้น **ห้ามเติมบาคาร่าเข้าไปเอง** ส่วนคำฟุตบอลเชิงลึก ("ยูฟ่า" / "แทงบอล" /
// "ค่าน้ำ" / "ราคาบอล" / "สถิติการพบกัน" / "โปรแกรมแข่งขัน" / "ผลการแข่งขัน") เป็นของ
// **ufalion168** — คำว่า "ฟุตบอล"/"บอล" เฉยๆ และ "ราคาต่อรอง" ยังใช้ได้ เพราะบรีฟ
// รอบนี้ระบุเอง แต่คำแวดล้อมที่เหลือไม่ได้
// ถ้าเจอ "เกมสล็อตรวยขั้นเทพ" / "ครบในเว็บเดียว" คือคำของ **รวยเทพ168** ถ้าเจอ
// "เกมสล็อตเจนซี" / "ระบบเข้าทางคนรุ่นใหม่" / "เดิมพันง่าย ไม่มีขั้นต่ำ" คือคำของ
// **มีเฮ168** ถ้าเจอ "สล็อตรวมเกมกำไรงาม" / "เล่นง่ายทุกค่าย" / "ทุนน้อยก็เล่นได้"
// คือคำของ **รวยแทร่168** ถ้าเจอ "สล็อตโปรแรงโบนัส0.8%ทุกวัน" คือคำของ **นินจา168**
// ถ้าเจอ "ถอนง่าย" / "ไม่มีรีวิวเสีย" / "การันตีเว็บแท้" คือคำของ **ถอนชัวร์168**
// ถ้าเจอ "เว็บสล็อตทางการ" / "เว็บแท้อันดับ1" คือคำของ **สบายเบท168** และถ้าเจอ
// PG SOFT / JOKER / JILI / "นำเข้าตรงจากสิงคโปร์" คือคำของ **มีโชค168**
// — ไม่ใช่ของรอบนี้ทั้งหมด บรีฟรอบนี้ **ไม่ได้ระบุชื่อค่ายเกมหรือชื่อธนาคารแม้แต่รายเดียว**
// ⚠️ รอบนี้ **ชมพูบานเย็นนำเดี่ยว ไม่มีสีที่สอง** — ต่างจากรอบก่อนที่เป็นทองคู่แดง
// และ ⚠️ **ชมพูเคยนำมาแล้วสามแบรนด์** (ถอนชัวร์168 / มีโชค168 / มีเฮ168 blush)
// จึง **ห้ามเทียบด้วยวงศ์สี ต้องเทียบทีละค่า**
// ชมพูรอบนี้คือ #dd1b74 (R221 G27 B116) ซึ่งไม่ใช่ f5469f ของมีโชค168 (R245 G70 B159)
// ไม่ใช่ fa63b9 ของถอนชัวร์168 (R250 G99 B185) ไม่ใช่ ff8f9c ของมีเฮ168 ไม่ใช่ ffadaf
// ของสมหวัง168 ไม่ใช่ ff6b6e ของรับตัง168 — ตารางค่าเต็มอยู่ใน
// .claude/brand-spec-meesub168.md §2
// ⚠️⚠️ **ความต่างที่ใหญ่ที่สุดของรอบนี้ไม่ใช่สี แต่คือทิศของธีม** — bg.json ของดรอปนี้
// เป็น {"mode":"color","color":"#f0ccf5"} = **ชมพูอมม่วงสว่าง** ไม่ใช่ดำเหมือนทุกแบรนด์
// ก่อนหน้า เนื้อหาจึงเป็น **การ์ดสว่างหมึกเข้ม** ส่วนโครม (navbar/footer/ticker/feed)
// ยังเป็นพลัมเข้มเพื่อคร่อมหน้าและให้บล็อก <address> ที่ paste verbatim ลงถูก
// ส่วนโดเมนรอบนี้คือ meesub168.cc — **ASCII ล้วน ไม่ต้องแปลง punycode**
// ⚠️ **อย่าสับสนกับ meehay168 (มีเฮ168) หรือ meechoke/xn--168-pkl3a1luf6d (มีโชค168)**
// สามแบรนด์นี้ขึ้นต้นด้วย "มี" เหมือนกันและเป็นคนละลูกค้ากันสิ้นเชิง
// ถ้า operator ไม่ได้ระบุโดเมนมาในคำสั่ง ห้ามแตะ site: เด็ดขาด — รอบนี้ operator
// ระบุมาตรงๆ ว่า real url is "https://meesub168.cc"
// ค่านี้คือชื่อที่คนอ่านเห็นบนโลโก้ ไม่ใช่ host — host มาจาก site:
// ใน astro.config.mjs เท่านั้น ทั้งสองค่ามาจาก operator ตรงๆ
//
// iconSlug (ด้านล่าง) รอบนี้ชื่อแบรนด์เป็นไทยผสมเลข [^a-z0-9] จึงกินอักษรไทยทิ้งหมด
// เหลือ **"168"** เท่ากับสิบกว่าแบรนด์ไทยก่อนหน้า (ดวงเศรษฐี168 / รวยเทพ168 / มีเฮ168 /
// รวยแทร่168 / นินจา168 / สบายเบท168 / ถอนชัวร์168 / มีโชค168 / ขวัญใจ168 / รับตัง168 /
// สมหวัง168)
// ⚠️ แปลว่า ?v= รอบนี้ **ไม่ bust แคชต่างจากแบรนด์ไทยเหล่านั้น** ขณะที่ไบต์ไอคอนเปลี่ยน
// — เป็นข้อจำกัดที่รู้อยู่ของสูตร ไม่ใช่บั๊กที่ต้องแก้มือ
// ห้ามแก้ iconVersion ด้วยมือไม่ว่ากรณีใด เพราะค่านี้ต้องคงที่ต่อแบรนด์
// สังเกตว่า slug มาจากชื่อแบรนด์ จึงไม่เท่ากับ label ใน wrangler.toml ซึ่งมาจาก
// "โดเมน" — รอบนี้คนละค่ากันสิ้นเชิง ("168" vs "meesub168")
//
// รอบนี้บรีฟ (src/assets/content.txt) เขียน "มีทรัพย์168" ตรงกับอาร์ตเวิร์กและคำสั่ง
// ของ operator ทุกจุด ไม่มีความขัดแย้งแบบรอบ UOK365 ที่บรีฟยังเป็นชื่อแบรนด์ก่อนหน้า
// ถึงอย่างนั้นหน้าเว็บก็ยังไม่พิมพ์ชื่อแบรนด์ตรงๆ เลยสักที่ แต่ interpolate ค่านี้แทน
// ค่านี้ไปโผล่ใน og:site_name, JSON-LD, terms/privacy และ <address>
export const BRAND_NAME = "มีทรัพย์168";

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
// ⚠️⚠️ **มีทรัพย์168 เป็นแบรนด์ "ธีมสว่าง" ตัวแรกของรีโปนี้ — ค่านี้จึงเป็นหมึกเข้ม
// ไม่ใช่สีสว่างเหมือนทุกรอบก่อนหน้า** อย่าเห็นว่าเป็นค่ามืดแล้วคิดว่าพิมพ์ผิด
// เหตุผล: bg.json ของดรอปนี้เป็น {"mode":"color","color":"#f0ccf5"} = **ชมพูอมม่วง
// สว่าง** ไม่ใช่ดำเหมือนทุกแบรนด์ก่อนหน้า และ bg.json คือแหล่งเดียวของพื้นเพจ
// ห้าม "แก้" ให้กลับไปเป็นดำเพราะ "แบรนด์ก่อนๆ เป็นดำ"
//
// ทิศของธีมรอบนี้ (อ่านให้จบก่อนแตะไฟล์ไหน):
//   เนื้อหา  — การ์ดสว่าง #ffffff / #f7dcf6 + หมึกเข้ม #4a0d35
//   โครม     — navbar/footer/ticker/winners feed/BankStrip/CtaRedirect ยังเป็น
//              พลัมเข้ม #4a0d35 / #2d0720 + ตัวอักษรสว่าง #ffffff / #f7dcf6
//   พื้นเพจ  — #f0ccf5 (จาก bg.json)
// โครมยังเข้มด้วยเหตุผลสามข้อ: (ก) บล็อก <address> ใน footer ต้อง paste verbatim
// (border-white/15 bg-black/20 + ตัวอักษร inherit) ซึ่งออกแบบมาสำหรับ footer เข้ม
// (ข) หัว-ท้ายเข้มคร่อมเนื้อหาสว่างคือทรงที่ไม่ซ้ำรอบไหนในรีโปนี้เลย
// (ค) โครมประกาศสีตัวอักษรของตัวเองครบอยู่แล้ว ค่านี้จึงไปไม่ถึงมัน
//
// ⚠️ รอบนี้ **ชมพูบานเย็นนำเดี่ยว ไม่มีสีที่สอง** ต่างจากรอบก่อน (ดวงเศรษฐี168
// ทองน้ำผึ้งคู่แดงชาด) และ **รอบนี้ไม่มีทอง/เหลืองเลยสักเฉด**
// **แต่ชมพูเคยนำมาแล้วสามแบรนด์** จึง **ห้ามพิสูจน์ด้วยวงศ์สีเด็ดขาด ต้องเทียบทีละค่า**
// ความต่างที่แท้จริงของรอบนี้มีสี่ข้อ:
//   1. สีอัตลักษณ์เป็น **ชมพูบานเย็น** #dd1b74 (R221 G27 B116) ซึ่ง **เข้มและอมแดง
//      กว่าชมพูของทุกแบรนด์ก่อนหน้า** — ⚠️ **ตัวที่ใกล้ที่สุดคือ #f5469f ของมีโชค168**
//      (R245 G70 B159) ห่าง 65 ตัวตัดสินคือ **R221 vs R245 และ B116 vs B159**
//      ตัวรองลงมาคือ #fa63b9 ของถอนชัวร์168 (R250 G99 B185) ห่าง 104
//      และ ≠ #ff8f9c (มีเฮ168) ≠ #ffadaf #ff5a5f (สมหวัง168) ≠ #ff6b6e (รับตัง168)
//      ≠ #ff8dc6 #ffb3de ≠ #f2bba5 #c98a74 (โรสโกลด์ขวัญใจ168) — grep เป็นค่า ห้ามกะด้วยตา
//   2. สีหัวข้อ/`<strong>` เป็น **โรสเข้ม** #a4186b (R164 G24 B107) — ⚠️ ใกล้
//      #8c0f52 ของมีโชค168 ที่สุด (ห่าง 36) ตัวตัดสินคือ **R164 vs R140 และ B107 vs B82**
//      และ ≠ #6d0b3f (ถอนชัวร์168) ≠ #5c0410 (มีเฮ168) ≠ #b3121b (ขวัญใจ168)
//   3. หมึกเนื้อความ/พื้นโครมเป็น **พลัมเข้ม** #4a0d35 (R74 G13 B53) — ⚠️ ใกล้
//      #6d0b3f ของถอนชัวร์168 ที่สุด (ห่าง 37) และ ≠ #2b0f20 #1a0914 (ถอนชัวร์168)
//      ≠ #24101c (มีโชค168) ≠ #2b0711 (มีเฮ168) ≠ #5a0a0e (ขวัญใจ168)
//   4. ชุดความลึกสว่าง: #ffffff ยก = ผิวการ์ด / #f7dcf6 กลาง / #f0ccf5 = พื้นเพจ
//      และฝั่งโครม #4a0d35 ยก / #2d0720 จม
//      (⚠️ #2d0720 เป็นเกือบดำและ #f7dcf6 เป็นเกือบขาว — ปลายสองด้านของสเกลนี้
//      แออัดโดยธรรมชาติ เรื่องนี้เลี่ยงไม่ได้ และ **ไม่ใช่สีอัตลักษณ์** ความต่าง
//      บังคับไว้ที่สามข้อบน ซึ่งห่างจากทุกแบรนด์ 36 หน่วยขึ้นไป)
// นอกจากนั้นการหมุน variant (NavbarStyle3 + FooterStyle3 + Announcement4 +
// LatestWinners3 + Faq ตัวฐาน + ReviewCardSumo2 + การ์ดชุด Premium/CyberCut/
// TwoNeumorphism/SevenThreeNeumorphism/SevenThreeFloatingBadge/Special/3Three)
// คือสิ่งที่ทำให้รูปทรงของหน้าไม่ซ้ำ ไม่ใช่สี — ดู .claude/brand-spec-meesub168.md §3
// อ่านมาจากงานศิลป์ตรงๆ: dominant ของ banner1/slide1 คือ **ขาวเกือบสนิท** (#fefdfd)
// เพราะฉากในรูปเป็นทุ่งแดดจัดและพื้นสตูดิโอสีขาว แต่ **นั่นคือฉากในภาพ** ส่วน vivid
// ของ banner1 เป็นฟ้าของท้องฟ้ากับสีผิวคน (#bde4fc #e4bba5) และ vivid ของ slide1
// เป็นสีผิวล้วน (#f3d3c4 #ebc4b3) ซึ่ง **ไม่ใช่สีแบรนด์เลย** — **palette.json จัดอันดับ
// ให้ แต่ไม่ได้ตีความให้** ไฟล์ที่ตัวเลขชี้ถูกคือ logo.webp ซึ่งให้ vivid เป็น
// #fa739d #fb9bbb #fb7ca4 #fceadc #fb7ea9 = **ชมพูล้วนทุกเฉด** ตรงกับที่ตาเห็น
// (โลโก้เป็นหัวหมูหน้ากากโจร + ตัวอักษรชมพู + เลข 168 สีเงิน บนพื้นโปร่งใส)
// ⚠️ แต่ค่าดิบ **ใช้ตรงๆ ไม่ได้** เพราะชนของเก่า: #fa739d ห่างจาก #fa63b9 ของ
// ถอนชัวร์168 แค่ 32 หน่วย และห่างจาก #ff8f9c ของมีเฮ168 แค่ 29 หน่วย จึงเลื่อนเป็น
// #dd1b74 ซึ่งยังอ่านเป็นชมพูบานเย็นชุดเดียวกัน แต่ห่างจากทุกแบรนด์ในรีโปอย่างน้อย 65
// โลโก้อ่านตรงๆ ได้ว่า: **หัวหมูการ์ตูนสีชมพูอ่อน สวมหน้ากากโจรสีดำ ยิ้มแลบลิ้น**
// ถัดมาเป็น **"มีทรัพย์" ตัวอักษรไทยสามมิติไล่เฉดชมพูเข้มไปชมพูอ่อน ขอบขาว**
// ต่อด้วย **เลข "168" สามมิติผิวเงิน-ขาวมันวาว**
// แบนเนอร์เป็นฉาก **ฟาร์ม/ทุ่งหญ้ากลางแจ้งแดดจัด** — ท้องฟ้าฟ้าสดมีเมฆขาว หญ้าเขียว
// **ยุ้งฉางไม้สีแดง กังหันลมไม้ ฟ่อนฟางสีเหลือง รั้วไม้** และ **หมูการ์ตูนสวมหน้ากาก
// โจรสีดำหลายตัว** ฝั่งซ้ายเป็น **ชายหนุ่มผมสั้นสีเงิน-ขาว เสื้อกล้ามขาว กางเกงขาสั้นขาว**
// ฝั่งขวาเป็น **หญิงสาวผมสั้นสีเงิน-ขาว สปอร์ตบราชมพู กางเกงขาสั้นชมพู** กลางภาพเป็น
// ชื่อแบรนด์ตัวโต ใต้ลงมาเป็น **แคปซูลดำขอบชมพูเขียนว่า ระบบดูแลการเงิน** และ
// **แถบขาวเขียนว่า ฝากถอนทุกช่องทาง ปลอดภัยไม่ผ่านม้า พร้อมโล่ติ๊กถูกสีชมพู**
// — **ไม่มีไฉ่ซิงเอี๊ย ไม่มีหมวกทรงจีน ไม่มีมงกุฎทอง ไม่มีกองเหรียญทอง ไม่มีชิปคาสิโน
// ดำ-ทอง ไม่มีไพ่เอซโพดำ ไม่มีห้องโถงหรูขาว-งาช้างแบบดวงเศรษฐี168 ไม่มีสิงโตทอง
// ไม่มีสนามบอล ไม่มีถ้วยแชมเปี้ยนส์ลีกแบบ ufalion168 ไม่มีตู้สล็อต 777 ไม่มีกล่อง
// ของขวัญแดงแบบรวยเทพ168 ไม่มีชุดลูกไม้ขาวผูกโบว์แดงแบบมีเฮ168 ไม่มีนินจาการ์ตูน
// ไม่มีชูริเคนแบบนินจา168 ไม่มีถุงเงินสีฟ้าแบบรวยแทร่168 ไม่มีแมวการ์ตูนขนขาวลายส้ม
// แบบสบายเบท168 ไม่มีดอกซากุระชมพูแบบถอนชัวร์168 ไม่มีแมวกวักนำโชค ไม่มีธงชาติ
// สิงคโปร์แบบมีโชค168 ไม่มีลายกนก/เจดีย์ทองแบบสมหวัง168 ไม่มีอักขระมังกรจีน 龍
// (GT66B) ไม่มีมาสคอตโจรการ์ตูน (TKB55) ไม่มีปีกเหยี่ยวน้ำเงิน (TSDET911) ไม่มี
// เป็ดการ์ตูน (DUCK1688) ไม่มีหัวเสือ (TIGERWIN369) และไม่มีโปสเตอร์หวย**
// ⚠️ **รอบนี้ไม่มีทอง/เหลือง ไม่มีแดงชาด ไม่มีบรอนซ์ ไม่มีฟ้า/น้ำเงิน/ไซยาน
// ไม่มีม่วงเข้ม ไม่มีเขียว ไม่มีเงิน/โครเมียม ไม่มีโรสโกลด์ และไม่มีส้มสด**
// (f0c878 d9212a 8e1a16 เป็นของ **ดวงเศรษฐี168** รอบก่อน · a25b24 8c4312 d39c45 เป็น
// บรอนซ์ของ **ufalion168** · d9701a เป็นทองแดงของ **รวยเทพ168** · 039cfa c3ebfc เป็นฟ้า
// ของ **รวยแทร่168** · 32bcfb a9e9ff เป็นฟ้าของ **นินจา168** · 2f9ff5 a8dcff เป็นฟ้าของ
// **สบายเบท168** · f2bba5 c98a74 เป็นโรสโกลด์ของ **ขวัญใจ168** · cfd9e6 เป็นเงินของ
// **รับตัง168** · 8792a0 b9c2cc เป็นเงินโครเมียมของ **UFA324** — เจอที่ไหนคือของเก่าค้าง
// ต้องกวาดออก)
// ⚠️ **ท้องฟ้าฟ้า หญ้าเขียว ยุ้งฉางแดง ฟ่อนฟางเหลือง และผมสีเงินของนายแบบ/นางแบบ
// เป็นวัตถุในภาพ ไม่ใช่สีแบรนด์** ห้ามดึงเข้ามาเป็นสีของ UI และ **เลข "168" ผิวเงิน
// ในโลโก้ก็เป็นวัตถุในภาพ** ห้ามทำเงิน/โครเมียมเป็นฮิวที่สาม (เงินคือสิ่งที่ UFA324
// กับรับตัง168 ทำ และเป็นคนละแบรนด์)
// ⚠️ **ชมพูเป็นกับดักรอบนี้ เพราะมีสามแบรนด์ในรีโปที่เคยใช้ชมพู** — ถอนชัวร์168
// fa63b9 (+ffb3de 6d0b3f 2a0617 fdeaf5) · มีโชค168 f5469f (+ff8dc6 8c0f52 f6e4ee) ·
// มีเฮ168 ff8f9c (blush, +fb1b32 fdeaec ffe3e6) และโรสโกลด์ของขวัญใจ168 f2bba5 c98a74
// — ส่วนชมพูบานเย็นรอบนี้คือ **#dd1b74** (R:221 G:27 B:116) เท่านั้น ⚠️ **ตัวที่ใกล้
// ที่สุดคือ f5469f ของมีโชค168** (ห่าง 65) การเจอ "ชมพูอยู่แล้ว" ในไฟล์ไหนจึงไม่พิสูจน์
// อะไรเลย ต้อง grep เป็นค่าทีละตัวกับตารางใน .claude/brand-spec-meesub168.md §2
// ชุดเต็มของ ดวงเศรษฐี168 ที่ต้องกวาดออกจากทุกไฟล์ที่ render (d9212a 8e1a16 f0c878
// fff8d8 2a0608 4e2120 300605 150303 และ rgba(217,33,42,α) rgba(240,200,120,α)
// rgba(142,26,22,α))
// ชุดของ ufalion168 (d4922c fdfc71 a25b24 8c4312 d39c45 f6e3b4 33200a 1f1304 0a0601
// 5a3310 1a1000) ชุดของรวยเทพ168 (f0bb4e ffeccb e4021b d9701a 3b1b0e 260d04 0d0501
// 5c2a06 fff8ec 2b1400) ชุดของมีเฮ168 (fb1b32 ff8f9c 5c0410 fcd45c 6b4a08 2b0711
// 1a040a 0c0205 fdeaec ffe3e6 1b0308) ชุดของรวยแทร่168 (039cfa 0494f5 c3ebfc 04366b
// f9a826 704504 e3f2fc 0b2d52 071e38 030f1d 031320 7fa8cc) ชุดของนินจา168 (32bcfb
// a9e9ff 07335f fef54b 6b5c10 0c2a3d 071a28 030e16 041019 dceefc) ชุดของสบายเบท168
// (2f9ff5 a8dcff d6ecff 0b3f78 ffc82e 5c4a16 e8f4ff 0e2238 081726 040d16 04121f)
// ชุดของถอนชัวร์168 (fa63b9 ffb3de ffd84d 2b0f20 1a0914 0d040a 6d0b3f 6b4708
// 2a0617 fdeaf5) ชุดของมีโชค168 (fcd434 ffeaa0 f5469f ff8dc6 8c0f52 7a5508 1a0612
// f6e4ee 24101c 160a12 0b0509) ชุดของขวัญใจ168 (f7c92b ffe6a3 f2bba5 c98a74
// b3121b 5a0a0e 8a5f12 eadfce 140c06 241509 160d06 0b0603) ชุดของรับตัง168
// (f0b429 ffdc8c d30304 ff6b6e a00203 4a0202 9a6c0c cfd9e6 f5ece0 2b100f 200a09
// 140505 1a0505) ชุดของสมหวัง168 (fa0513 ffadaf ff5a5f e3b23c ffe5a8 8a6210
// b90203 8c0204 5b0203 3c0303 170504 f4ecea ccb9b6 2c1413 1f0d0c 140706 290f0f)
// และชุดของ UFA324 (e5a81b ffe08a bb8410 7d5a07 43300a 17130a 312713 0d0b06
// 140d01 8792a0 f0e8d4 b9c2cc 464f5a) ต้องไม่เหลือในไฟล์ที่ render เลยสักจุด
// ส่วน bg.json ของดรอปนี้เป็น {"mode":"color","color":"#f0ccf5"} = **ชมพูอมม่วงสว่าง**
// (ค่านี้มาจากไฟล์ ไม่ได้สืบทอด — ให้เปิดดูทุกรอบ และรอบนี้ **ต่างจากรอบก่อนที่เป็น
// #000000 ดำสนิท** ซึ่งเป็นเหตุผลทั้งหมดที่ธีมกลับทิศ)
// ตัวอักษรเนื้อความเป็นพลัมเข้ม — ค่านี้คือสีนั้น
//
// มันทำงานสองหน้าที่พร้อมกัน: เป็นสีย่อหน้าในการ์ด และเป็นสีพื้นของทั้งเว็บที่หน้า
// terms/privacy/404 (ซึ่งไม่ประกาศสีเองเลยโดยตั้งใจ) พึ่งอยู่ รอบนี้ทั้งสองบริบท
// วางอยู่บนพื้นสว่างเหมือนกัน จึงใช้ค่าเดียวกันได้จริง
// #4a0d35 บน #ffffff ≈ 14.9:1 · บน #f7dcf6 ≈ 12.6:1 · และบนพื้นสีเดียวของ bg.json
// (#f0ccf5) ≈ 10.4:1
// ⚠️ โรสเข้ม #a4186b ได้ ≈ 7.2:1 บนผิวการ์ดขาว (5.0:1 บนพื้นเพจ) จึงเป็นตัวที่ใช้
// ไฮไลต์ <strong> ในเนื้อความ (สงวนไว้งานเดียวนี้) และใช้กับหัวข้อ/ลิงก์ได้ด้วย
// ⚠️ **ชมพูบานเย็น #dd1b74 ได้ 4.67:1 บนผิวการ์ดขาว = ผ่าน AA พอดี** ใช้กับหัวข้อ
// และตัวหนาได้ แต่ **ห้ามใช้เป็นสีไฮไลต์ <strong> ในเนื้อความ** (ให้ใช้ #a4186b
// ตัวเดียว) และ ⚠️ **บนพื้นโครมเข้ม #4a0d35 ได้แค่ 3.2:1 = ตกเกณฑ์ AA** จึงเป็น
// **สีพื้นถม/ขอบ/ออรา/ไอคอนบนโครม ห้ามถือตัวอักษรบนพื้นเข้ม** — ถ้าต้องการตัวอักษร
// ที่อ่านว่าชมพูสด ให้ถม #dd1b74 เป็นพื้นแล้ววาง #ffffff ทับ (≈ 4.67:1 ผ่าน AA)
// ⚠️ #f0ccf5 และ #f7dcf6 ห้ามถือตัวอักษรบนพื้นขาว เป็นสีพื้น/เส้นเท่านั้น
// — แต่ทั้งคู่วางบนพื้นถม #4a0d35 ได้ (≈ 12.6:1 ขึ้นไป)
// (navbar/footer/ticker ประกาศสีตัวอักษรของตัวเองไว้ครบ ค่านี้จึงไปไม่ถึงมัน)
export const BRAND_TEXT = "#4a0d35";

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
