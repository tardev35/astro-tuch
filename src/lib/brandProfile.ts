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

// รอบนี้ (ดวงเศรษฐี168 2026-10-20) หมุนออกจาก kanit ของรอบก่อน (ufalion168)
// กลับไปเป็น google-sans เพื่อให้ชุด @font-face ไม่ซ้ำกันสองรอบติด — การหมุนสลับ
// ไปมาทุกรอบคือสิ่งที่ตัดลายนิ้วมือข้ามแบรนด์ชุดนั้นลงครึ่งหนึ่ง ไม่ใช่การเลือกว่า
// ฟอนต์ไหน "ดีกว่า" ทั้งสองตัว self-host เหมือนกัน ไม่มี request ออกนอกโดเมน
// ผลข้างเคียงที่ตั้งใจ: แบรนด์นี้จะ ship @font-face + preload ชุด
// /fonts/google-sans-v70-*.woff2 และจะ **ไม่** ship ชุด kanit-v17-latin_thai-*
// ของรอบก่อนเลย — และต้องสลับกลับอีกรอบหน้า
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
// ชื่อที่ "เห็นบนเว็บ" รอบนี้คือ ดวงเศรษฐี168 — **ภาษาไทยผสมเลข** เขียนติดกันเป็นคำเดียว
// ไม่มีเว้นวรรค (ต่างจากรอบก่อนที่เป็น ASCII ล้วน) โลโก้ แบนเนอร์ และสไลด์ของดรอป
// 2026-10-20 เขียนตรงกันหมด: **หัวไฉ่ซิงเอี๊ย (เทพเจ้าโชคลาภจีน) ยิ้มหัวเราะ สวมหมวก
// ทรงจีนสีแดงขลิบทอง มีลูกปัดทองห้อยสองข้าง** ถัดมาเป็นคำว่า **"ดวงเศรษฐี" ตัวอักษรไทย
// สามมิติผิวทองมันวาว** ต่อด้วย **เลข "168" สามมิติสีแดงสดขลิบทอง**
// ⚠️ **แกนของแบรนด์รอบนี้คือ เว็บ "สอนเล่น" เกมเดิมพันออนไลน์หลายประเภท** — บรีฟเรียก
// ตัวเองว่า "เว็บสอนเล่นเกมออนไลน์ จากเศรษฐีพนันมือ1" และพูดถึง สล็อต · บาคาร่า ·
// ยิงปลา · ไฮโล · บอล · หวยออนไลน์ · สูตร · เทคนิค · กติกา · ความน่าจะเป็น ·
// ตารางจ่ายรางวัล · ประเภทการเดิมพัน · อัตราจ่าย บวกกับ **โปรโมชั่นคืนยอดเสีย 0.3%
// และแนะนำเพื่อน 0.8%**
// ⚠️ **นี่ไม่ใช่เว็บหวย** ถึงบรีฟจะเอ่ยถึงหวย แต่เป็น 1 ใน 6 ประเภทเกมที่ "สอน" เท่านั้น
// ไม่ใช่แกนของเว็บ และคำสั่งของ operator ไม่มีคำว่า "เว็บหวย" → /ตรวจหวย กับ /แนวทาง
// จึงยังจอดอยู่ที่ src/pages-disabled/ และห้ามมีลิงก์ในเมนูหรือฟุตเตอร์
// ⚠️ คำฟุตบอลเชิงลึกทุกคำที่เจอเป็น **คำค้างของ ufalion168 รอบก่อน** ไม่ใช่ของรอบนี้:
// "แฟนเพจเว็บบอลยูฟ่า" / "ยูฟ่า" / "แทงบอล" / "ทริคแทงบอล" / "ค่าน้ำ" / "ราคาบอล" /
// "ราคาต่อรอง" / "สถิติการพบกัน" / "ความพร้อมของนักเตะ" / "โปรแกรมแข่งขัน" /
// "ผลการแข่งขัน" / "แนวทางวิเคราะห์ก่อนเกม" / "การันตีค่าน้ำดี จ่ายสูงสุดในวงการ"
// — **คำว่า "ฟุตบอล"/"บอล" เฉยๆ ยังใช้ได้** เพราะบรีฟรอบนี้ระบุเอง แต่คำแวดล้อมข้างบนไม่ได้
// ถ้าเจอ "เกมสล็อตรวยขั้นเทพ" / "ครบในเว็บเดียว" คือคำของ **รวยเทพ168** ถ้าเจอ
// "เกมสล็อตเจนซี" / "ระบบเข้าทางคนรุ่นใหม่" / "เดิมพันง่าย ไม่มีขั้นต่ำ" คือคำของ
// **มีเฮ168** ถ้าเจอ "สล็อตรวมเกมกำไรงาม" / "เล่นง่ายทุกค่าย" / "ทุนน้อยก็เล่นได้"
// คือคำของ **รวยแทร่168** ถ้าเจอ "สล็อตโปรแรงโบนัส0.8%ทุกวัน" คือคำของ **นินจา168**
// ถ้าเจอ "ถอนง่าย" / "ไม่มีรีวิวเสีย" / "การันตีเว็บแท้" คือคำของ **ถอนชัวร์168**
// ถ้าเจอ "เว็บสล็อตทางการ" / "เว็บแท้อันดับ1" คือคำของ **สบายเบท168** และถ้าเจอ
// PG SOFT / JOKER / JILI / "นำเข้าตรงจากสิงคโปร์" คือคำของ **มีโชค168**
// — ไม่ใช่ของรอบนี้ทั้งหมด บรีฟรอบนี้ **ไม่ได้ระบุชื่อค่ายเกมแม้แต่ค่ายเดียว**
// ⚠️ รอบนี้ **ทองน้ำผึ้งนำ + แดงชาดจีนเป็นสีอัตลักษณ์** — ต่างจากรอบก่อนที่เป็นทองสอง
// เฉดล้วนไม่มีสีที่สอง และ **รอบนี้ไม่มีบรอนซ์เลย** แต่ **ทองเคยนำมาแล้วเกือบทุกแบรนด์
// และแดงเคยนำมาแล้วหลายแบรนด์** จึง **ห้ามเทียบด้วยวงศ์สี ต้องเทียบทีละค่า**
// แดงชาดรอบนี้คือ #d9212a (R217 G33 B42) ซึ่งไม่ใช่ fb1b32 ของมีเฮ168 (R251 G27 B50)
// ไม่ใช่ e4021b ของรวยเทพ168 (G2 B27) ไม่ใช่ d30304 ของรับตัง168 ไม่ใช่ b3121b
// ของขวัญใจ168 ไม่ใช่ fa0513 ของสมหวัง168 — ส่วนทองน้ำผึ้งรอบนี้คือ #f0c878
// (R240 G200 B120) ซึ่ง **ใกล้ ffdc8c ของรับตัง168 ที่สุด** ตัวตัดสินคือ R240 vs R255
// และ B120 vs B140 — ตารางค่าเต็มอยู่ใน .claude/brand-spec-duangsetthi168.md §2
// ส่วนโดเมนรอบนี้คือ settee168-tech.com — **ASCII ล้วน ไม่ต้องแปลง punycode** เหมือน
// รอบก่อน และ ⚠️ **สะกดว่า settee ไม่ใช่ setthee/setthi** และมี **ขีดกลางก่อน tech**
// ⚠️ **โดเมนรอบนี้อ่านไม่ตรงกับชื่อแบรนด์เลย** (แบรนด์ไทย "ดวงเศรษฐี168" vs โดเมน
// ASCII "settee168-tech") — เป็นตัวอย่างชัดๆ ว่าทำไมห้ามเดาโดเมนจากชื่อแบรนด์
// ถ้า operator ไม่ได้ระบุโดเมนมาในคำสั่ง ห้ามแตะ site: เด็ดขาด — รอบนี้ operator
// ระบุมาตรงๆ ว่า real url is "https://settee168-tech.com"
// ค่านี้คือชื่อที่คนอ่านเห็นบนโลโก้ ไม่ใช่ host — host มาจาก site:
// ใน astro.config.mjs เท่านั้น ทั้งสองค่ามาจาก operator ตรงๆ
//
// iconSlug (ด้านล่าง) รอบนี้ชื่อแบรนด์เป็นไทยผสมเลข [^a-z0-9] จึงกินอักษรไทยทิ้งหมด
// เหลือ **"168"** เท่ากับสิบกว่าแบรนด์ไทยก่อนหน้า (รวยเทพ168 / มีเฮ168 / รวยแทร่168 /
// นินจา168 / สบายเบท168 / ถอนชัวร์168 / มีโชค168 / ขวัญใจ168 / รับตัง168 / สมหวัง168)
// ⚠️ แปลว่า ?v= รอบนี้ **ไม่ bust แคชต่างจากแบรนด์ไทยเหล่านั้น** ขณะที่ไบต์ไอคอนเปลี่ยน
// — เป็นข้อจำกัดที่รู้อยู่ของสูตร ไม่ใช่บั๊กที่ต้องแก้มือ
// ห้ามแก้ iconVersion ด้วยมือไม่ว่ากรณีใด เพราะค่านี้ต้องคงที่ต่อแบรนด์
// สังเกตว่า slug มาจากชื่อแบรนด์ จึงไม่เท่ากับ label ใน wrangler.toml ซึ่งมาจาก
// "โดเมน" — รอบนี้คนละค่ากันสิ้นเชิง ("168" vs "settee168-tech")
//
// รอบนี้บรีฟ (src/assets/content.txt) เขียน "ดวงเศรษฐี168" ตรงกับอาร์ตเวิร์กและคำสั่ง
// ของ operator ทุกจุด ไม่มีความขัดแย้งแบบรอบ UOK365 ที่บรีฟยังเป็นชื่อแบรนด์ก่อนหน้า
// ถึงอย่างนั้นหน้าเว็บก็ยังไม่พิมพ์ชื่อแบรนด์ตรงๆ เลยสักที่ แต่ interpolate ค่านี้แทน
// ค่านี้ไปโผล่ใน og:site_name, JSON-LD, terms/privacy และ <address>
export const BRAND_NAME = "ดวงเศรษฐี168";

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
// ดวงเศรษฐี168 เป็น **ทองน้ำผึ้งนำ แดงชาดจีนเป็นสีอัตลักษณ์คู่กัน แดงเลือดหมูเป็นเงา
// ที่ไม่เคยถือตัวอักษร** บนพื้นดำสนิท
// ⚠️ **รอบนี้เป็นทองคู่แดง** ต่างจากรอบก่อน (ufalion168 ทองสองเฉดล้วน ไม่มีสีที่สอง)
// ที่สำคัญคือ **รอบนี้ไม่มีบรอนซ์เลย** (บรอนซ์ #a25b24 เป็นฮิวที่สามของรอบก่อน)
// **แต่ทองเคยนำมาแล้วเกือบทุกแบรนด์ และแดงเคยนำมาแล้วหลายแบรนด์** จึง **ห้ามพิสูจน์
// ด้วยวงศ์สีเด็ดขาด ต้องเทียบทีละค่า** ความต่างที่แท้จริงของรอบนี้มีสี่ข้อ:
//   1. สีอัตลักษณ์รอบนี้เป็น **แดงชาดจีน** #d9212a (R217 G33 B42) ซึ่ง **หม่นและ
//      อมชมพูกว่าแดงของทุกแบรนด์ก่อนหน้า** — ⚠️ **ตัวที่ใกล้ที่สุดคือ #fb1b32 ของ
//      มีเฮ168** (R251 G27 B50) ตัวตัดสินคือ **R217 vs R251** และตัวรองลงมาคือ
//      #e4021b ของรวยเทพ168 (G2 B27) ตัวตัดสินคือ **G33 vs G2 และ B42 vs B27**
//      ต้อง grep เป็นค่า ห้ามกะด้วยตา และ ≠ #d30304 (รับตัง168) ≠ #b3121b (ขวัญใจ168)
//      ≠ #fa0513 #b90203 #8c0204 (สมหวัง168) ≠ #a00203 ≠ #ff5a5f ≠ #ff6b6e
//   2. ทองนำเป็น **ทองน้ำผึ้ง** #f0c878 (R240 G200 B120) — ⚠️ **อยู่ใกล้ #ffdc8c
//      ของรับตัง168 ที่สุด** ตัวตัดสินคือ **R240 vs R255 และ B120 vs B140**
//      (รอบนี้อุ่นและเข้มกว่า ส่วนของรับตัง168 ซีดและสว่างกว่า) และ ≠ #fcd45c
//      (มีเฮ168) ≠ #f0bb4e (รวยเทพ168) ≠ #ffe08a (UFA324) ≠ #f6e3b4 (รอบก่อน)
//   3. ชั้นเงาเป็น **แดงเลือดหมู** #8e1a16 (R142 G26 B22) — ⚠️ ใกล้ #8c0204 ของ
//      สมหวัง168 ที่สุด ตัวตัดสินคือ **G26 vs G2 และ B22 vs B4**
//   4. ชุดความลึกเป็น **น้ำตาลอมแดง**: #4e2120 ยก / #300605 กลาง / #150303 จม
//      ≠ #33200a #1f1304 #0a0601 ของรอบก่อน ≠ #3b1b0e #260d04 #0d0501 ของรวยเทพ168
//      ≠ #2b100f #200a09 #140505 ของรับตัง168 ≠ #2c1413 #1f0d0c #140706 ของสมหวัง168
//      (⚠️ ชั้นจมสุด #150303 เป็นเกือบดำและอยู่ใกล้เกือบดำของหลายแบรนด์ — เรื่องนี้
//      เลี่ยงไม่ได้ และ **ไม่ใช่สีอัตลักษณ์** ความต่างบังคับไว้ที่ชั้นยก #4e2120
//      ซึ่งห่างจากทุกแบรนด์ 27 หน่วยขึ้นไป และเป็นชั้นที่มองเห็นจริง)
// นอกจากนั้นการหมุน variant (NavbarStyle11 + FooterPremiumSumo + Announcement5 +
// LatestWinners2 + Faq4 + ReviewCardSumo + การ์ดชุด FloatingBadge/Neumorphism/
// TwoPremium/SevenThree/SevenThreePremium/TwoCyberCut/3ThreePremium) คือสิ่งที่ทำให้
// รูปทรงของหน้าไม่ซ้ำ ไม่ใช่สี — ดู .claude/brand-spec-duangsetthi168.md §3
// อ่านมาจากงานศิลป์ตรงๆ: dominant ของ banner1/slide1 คือ **ขาวเกือบสนิท** (#fdfdfd)
// เพราะฉากในรูปเป็นห้องโถงหรูโทนขาว แต่ **นั่นคือฉากในภาพ ไม่ใช่สีพื้นของเว็บ** และ
// พื้นเพจมาจาก bg.json ไม่ใช่จากรูป ส่วน vivid ของ banner1/slide1 เป็นสีผิวคนกับ
// ผ้าซาตินครีม (#ecd2c4 #dcbdac) ซึ่ง **ไม่ใช่สีแบรนด์เลย** — **palette.json จัดอันดับ
// ให้ แต่ไม่ได้ตีความให้** ไฟล์ที่ตัวเลขชี้ถูกคือ logo.webp ซึ่งให้ vivid เป็น
// #fce443 #fcc31d #fce23d #f1ab13 #e40301 = **ทองสี่เฉด + แดงหนึ่ง** ซึ่งตรงกับที่
// ตาเห็น (โลโก้เป็นไฉ่ซิงเอี๊ยหมวกแดง + ตัวอักษรทอง + เลข 168 แดง บนพื้นโปร่งใส)
// ⚠️ แต่ค่าดิบเหล่านั้น **ใช้ตรงๆ ไม่ได้** เพราะชนของเก่า: #e40301 ห่างจาก #e4021b
// ของรวยเทพ168 แค่ 24 หน่วย และ #fce443 ห่างจาก #fce343 ของ PUNPRO168 แค่ 1 หน่วย
// จึงเลื่อนเป็น #d9212a กับ #f0c878 ซึ่งยังอ่านเป็นแดงชาด-ทองน้ำผึ้งชุดเดียวกัน
// แต่ห่างจากทุกแบรนด์ในรีโปอย่างน้อย 32 หน่วย
// โลโก้อ่านตรงๆ ได้ว่า: **หัวไฉ่ซิงเอี๊ย (เทพเจ้าโชคลาภจีน) ยิ้มหัวเราะ สวมหมวกทรงจีน
// สีแดงขลิบทองมีลูกปัดทองห้อยสองข้าง** ถัดมาเป็น **"ดวงเศรษฐี" ตัวอักษรไทยสามมิติ
// ผิวทองมันวาว** ต่อด้วย **เลข "168" สามมิติสีแดงสดขลิบทอง**
// แบนเนอร์เป็นฉาก **ห้องโถงหรูโทนขาว-งาช้าง** ฝั่งซ้ายเป็น **ชายหนุ่มผมสั้นสีเงิน
// ชุดสูทขาว นั่งพิงบัลลังก์ทอง** ฝั่งขวาเป็น **หญิงสาวผมยาวสีเงิน ชุดรัดรูปขาว-ทอง
// สวมสร้อยและกำไลทอง** รอบตัวมี **มงกุฎทอง กองเหรียญทอง ชิปคาสิโนดำ-ทอง และไพ่เอซ
// โพดำสีดำขลิบทอง** กลางภาพเป็นชื่อแบรนด์ตัวโต ใต้ลงมาเป็น **เว็บสอนเล่นเกมออนไลน์**
// และ **แถบแดงโค้งเขียนว่า จากเศรษฐีพนันมือ1 พร้อมมงกุฎทอง**
// — **ไม่มีสิงโตทอง ไม่มีมงกุฎแหลม ไม่มีสนามบอล ไม่มีถ้วยแชมเปี้ยนส์ลีก ไม่มีลูกฟุตบอล
// ไม่มีเสื้อบอล ไม่มีธงดาวฟุตบอลแบบ ufalion168 ไม่มีหญิงสาวชุดขาว-แดง ไม่มีชิปคาสิโน
// แดง-ขาว ไม่มีไพ่เอซโพแดง ไม่มีตู้สล็อต 777 ไม่มีหัวใจแดง ไม่มีกล่องของขวัญแดงแบบ
// รวยเทพ168 ไม่มีฉากพื้นชมพูอ่อน ไม่มีชุดลูกไม้ขาวผูกโบว์แดงแบบมีเฮ168 ไม่มีนินจา
// การ์ตูน ไม่มีชูริเคนแบบนินจา168 ไม่มีถุงเงินสีฟ้า ไม่มีโบว์ซาตินฟ้าแบบรวยแทร่168
// ไม่มีแมวการ์ตูนขนขาวลายส้มแบบสบายเบท168 ไม่มีริบบิ้นซาตินชมพู ดอกซากุระชมพู
// แบบถอนชัวร์168 ไม่มีแมวกวักนำโชค ไม่มีเหรียญจีนรูสี่เหลี่ยม ไม่มีธงชาติสิงคโปร์
// แบบมีโชค168 ไม่มีลายกนก/เจดีย์ทองแบบสมหวัง168 ไม่มีอักขระมังกรจีน 龍 (GT66B)
// ไม่มีมาสคอตโจรการ์ตูน (TKB55) ไม่มีปีกเหยี่ยวน้ำเงิน (TSDET911) ไม่มีเป็ดการ์ตูน
// (DUCK1688) ไม่มีหัวเสือ (TIGERWIN369) และไม่มีโปสเตอร์หวย**
// ⚠️ **รอบนี้ไม่มีบรอนซ์ ไม่มีฟ้า/น้ำเงิน/ไซยาน ไม่มีม่วง ไม่มีเขียว ไม่มีเงิน/
// โครเมียม ไม่มีโรสโกลด์ ไม่มีส้มสด และไม่มีชมพูบานเย็น/ฟูเชีย**
// (a25b24 8c4312 d39c45 เป็นบรอนซ์ของ **ufalion168** รอบก่อน · d9701a เป็นทองแดงของ
// **รวยเทพ168** · 039cfa c3ebfc เป็นฟ้าของ **รวยแทร่168** · 32bcfb a9e9ff เป็นฟ้าของ
// **นินจา168** · 2f9ff5 a8dcff เป็นฟ้าของ **สบายเบท168** · fa63b9 ffb3de เป็นชมพูของ
// **ถอนชัวร์168** · f5469f ff8dc6 เป็นชมพูของ **มีโชค168** · f2bba5 c98a74 เป็น
// โรสโกลด์ของ **ขวัญใจ168** · cfd9e6 เป็นเงินของ **รับตัง168** · 8792a0 b9c2cc เป็น
// เงินโครเมียมของ **UFA324** · ff8f9c เป็นชมพูบลัชของ **มีเฮ168** — เจอที่ไหนคือของ
// เก่าค้าง ต้องกวาดออก)
// ⚠️ **ผมสีเงินของนายแบบ/นางแบบและฉากพื้นขาวในแบนเนอร์เป็นวัตถุในภาพ ไม่ใช่สีแบรนด์**
// ห้ามดึงเงิน/โครเมียมหรือพื้นขาวเข้ามาเป็นสีของ UI (เงินคือสิ่งที่ UFA324 กับรับตัง168
// ทำ และเป็นคนละแบรนด์ ส่วนพื้นเพจมาจาก bg.json ซึ่งเป็นดำสนิท)
// ⚠️ **ทองเป็นกับดักเดิม เพราะแทบทุกแบรนด์ที่ผ่านรีโปนี้มีทอง** — ufalion168 d4922c
// (+fdfc71 f6e3b4) · รวยเทพ168 f0bb4e (+ffeccb) · มีเฮ168 fcd45c · รวยแทร่168 f9a826
// (+704504) · นินจา168 fef54b (+6b5c10) · สบายเบท168 ffc82e (+5c4a16) · ถอนชัวร์168
// ffd84d · มีโชค168 fcd434 (+ffeaa0) · ขวัญใจ168 f7c92b (+ffe6a3 8a5f12) · รับตัง168
// f0b429 (+ffdc8c 9a6c0c) · สมหวัง168 e3b23c (+ffe5a8 8a6210) · KMD88 e2b33f ·
// TND168 dfa310 (+ffc93d ffe4a3) · KINGKONG555 f2c230 (+ffe066) ·
// UFA324 e5a81b (+ffe08a bb8410 7d5a07) · 789BETTING fad354 · FLASH877 f5c518 ·
// PUNPRO168 fce343 · DUCK1688 f3bb34 · WEPLAY168 fbe455 · SUPERSLOTCLUB f2b705
// — ส่วนทองน้ำผึ้งรอบนี้คือ **#f0c878** (R:240 G:200 B:120) เท่านั้น ⚠️ **ตัวที่
// ใกล้ที่สุดคือ ffdc8c ของรับตัง168** ตัวตัดสินคือ R240 vs R255 และ B120 vs B140
// การเจอ "ทองอยู่แล้ว" หรือ "แดงอยู่แล้ว" ในไฟล์ไหนจึงไม่พิสูจน์อะไรเลย ต้อง grep
// เป็นค่าทีละตัวกับตารางใน .claude/brand-spec-duangsetthi168.md §2 ห้ามกะด้วยตา
// ชุดเต็มของ ufalion168 ที่ต้องกวาดออกจากทุกไฟล์ที่ render (d4922c fdfc71 a25b24
// 8c4312 d39c45 f6e3b4 33200a 1f1304 0a0601 5a3310 1a1000 และ rgba(212,146,44,α)
// rgba(253,252,113,α) rgba(162,91,36,α) rgba(246,227,180,α))
// ชุดของรวยเทพ168 (f0bb4e ffeccb e4021b d9701a 3b1b0e 260d04 0d0501 5c2a06 fff8ec
// 2b1400) ชุดของมีเฮ168 (fb1b32 ff8f9c 5c0410 fcd45c 6b4a08 2b0711 1a040a 0c0205
// fdeaec ffe3e6 1b0308) ชุดของรวยแทร่168 (039cfa 0494f5 c3ebfc 04366b f9a826 704504
// e3f2fc 0b2d52 071e38 030f1d 031320 7fa8cc) ชุดของนินจา168 (32bcfb a9e9ff 07335f
// fef54b 6b5c10 0c2a3d 071a28 030e16 041019 dceefc) ชุดของสบายเบท168 (2f9ff5
// a8dcff d6ecff 0b3f78 ffc82e 5c4a16 e8f4ff 0e2238 081726 040d16 04121f)
// ชุดของถอนชัวร์168 (fa63b9 ffb3de ffd84d 2b0f20 1a0914 0d040a 6d0b3f 6b4708
// 2a0617 fdeaf5) ชุดของมีโชค168 (fcd434 ffeaa0 f5469f ff8dc6 8c0f52 7a5508 1a0612
// f6e4ee 24101c 160a12 0b0509) ชุดของขวัญใจ168 (f7c92b ffe6a3 f2bba5 c98a74
// b3121b 5a0a0e 8a5f12 eadfce 140c06 241509 160d06 0b0603) ชุดของรับตัง168
// (f0b429 ffdc8c d30304 ff6b6e a00203 4a0202 9a6c0c cfd9e6 f5ece0 2b100f 200a09
// 140505 1a0505) ชุดของสมหวัง168 (fa0513 ffadaf ff5a5f e3b23c ffe5a8 8a6210
// b90203 8c0204 5b0203 3c0303 170504 f4ecea ccb9b6 2c1413 1f0d0c 140706 290f0f)
// และชุดของ UFA324 (e5a81b ffe08a bb8410 7d5a07 43300a 17130a 312713 0d0b06
// 140d01 8792a0 f0e8d4 b9c2cc 464f5a) ต้องไม่เหลือในไฟล์ที่ render เลยสักจุด
// ส่วน bg.json ของดรอปนี้เป็น {"mode":"color","color":"#000000"} = **ดำสนิท**
// เท่ากับรอบก่อน (ค่านี้มาจากไฟล์ ไม่ได้สืบทอด — ให้เปิดดูทุกรอบ) ลำดับความลึก
// รอบนี้เป็นน้ำตาลอมแดง: #4e2120 ยก = ผิวการ์ด / #300605 กลาง / #150303 จม /
// #000000 = พื้นเพจ (คนละชุดกับ 33200a 1f1304 0a0601 ของรอบก่อน)
// ตัวอักษรเนื้อความเป็นงาช้างอมครีม — ค่านี้คือสีนั้น
//
// มันทำงานสองหน้าที่พร้อมกัน: เป็นสีย่อหน้าในการ์ด และเป็นสีพื้นของทั้งเว็บที่หน้า
// terms/privacy/404 (ซึ่งไม่ประกาศสีเองเลยโดยตั้งใจ) พึ่งอยู่ รอบนี้ทั้งสองบริบท
// วางอยู่บนพื้นเข้มเหมือนกัน จึงใช้ค่าเดียวกันได้จริง
// #fff8d8 บน #4e2120 ≈ 12.6:1 · บน #300605 ≈ 17.1:1 · บน #150303 ≈ 18.8:1
// และบนพื้นสีเดียวของ bg.json (#000000) ≈ 19.7:1
// ⚠️ ทองน้ำผึ้ง #f0c878 ได้ ≈ 8.5:1 บนผิวการ์ด (13.2:1 บนพื้นดำ) จึงเป็นตัวที่ใช้
// ไฮไลต์ <strong> ในเนื้อความ (สงวนไว้งานเดียวนี้) และใช้กับหัวข้อได้ด้วย
// ⚠️ **แดงชาด #d9212a ได้แค่ ≈ 2.7:1 บนผิวการ์ด (4.2:1 บนพื้นดำ) = ตกเกณฑ์ AA
// ทุกพื้น** จึงเป็น **สีพื้นถม/ขอบ/ออรา/ไอคอนเท่านั้น ห้ามถือตัวอักษรบนพื้นเข้ม** —
// ถ้าต้องการตัวอักษรที่อ่านว่าแดง ให้ถมแดงเป็นพื้นแล้ววาง #fff8d8 ทับ (≈ 4.7:1 ผ่าน AA)
// และ #2a0608 เป็นหมึกตัวเดียวที่วางบนพื้นถมทอง (#f0c878 ≈ 11.7:1) ได้
// ⚠️ #8e1a16 (แดงเลือดหมู) ห้ามถือตัวอักษรทุกขนาด เป็นสีเส้นและออราเท่านั้น
// — แต่ #f0c878 วางบนพื้นถม #8e1a16 ได้ (≈ 5.7:1) และ #fff8d8 ก็ได้ (≈ 8.5:1)
// (navbar/footer/ticker ประกาศสีตัวอักษรของตัวเองไว้ครบ ค่านี้จึงไปไม่ถึงมัน)
export const BRAND_TEXT = "#fff8d8";

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
