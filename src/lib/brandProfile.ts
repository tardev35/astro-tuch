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

// รอบนี้ (รวยเทพ168 2026-10-20) หมุนออกจาก kanit ของรอบก่อน (มีเฮ168) ไปเป็น
// google-sans เพื่อให้ชุด @font-face ไม่ซ้ำกันสองรอบติด — การหมุนสลับไปมาทุกรอบ
// คือสิ่งที่ตัดลายนิ้วมือข้ามแบรนด์ชุดนั้นลงครึ่งหนึ่ง ไม่ใช่การเลือกว่าฟอนต์ไหน
// "ดีกว่า" ทั้งสองตัว self-host เหมือนกัน ไม่มี request ออกนอกโดเมน
// ผลข้างเคียงที่ตั้งใจ: แบรนด์นี้จะ **ไม่** ship @font-face ที่ชี้ไป
// /fonts/kanit-v17-latin_thai-*.woff2 เลย ซึ่งเป็นชุด path ที่ซ้ำกันเป๊ะทุกแบรนด์
// ที่ใช้ Kanit — จะกลับไป ship ชุด google-sans-v70-* แทน และต้องสลับออกอีกรอบหน้า
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
// ชื่อที่ "เห็นบนเว็บ" รอบนี้คือ รวยเทพ168 — **ภาษาไทยผสมเลขอารบิก** เขียนติดกัน
// เป็นคำเดียว ไม่มีเว้นวรรค ไม่มีขีด โลโก้ แบนเนอร์ และสไลด์ของดรอป 2026-10-20
// เขียนตรงกันหมด: คำว่า "รวย" เป็นตัวอักษรไทยหนาสามมิติ **สีทองไล่เฉด** ต่อด้วย
// "เทพ" **สีขาวมุก** แล้วปิดท้ายด้วย "168" **สีแดงชาดผิวมันวาว** ทางซ้ายเป็น
// **เทพเจ้าแห่งโชคลาภจีน (ไฉ่ซิงเอี๊ย) หัวเราะ สวมหมวกปีกทองแต่งแดง** วางอยู่บน
// **ริ้วทองโค้ง** ล้อมด้วย **ประกายดาวสีทอง** บนพื้นดำ (บรีฟเรียกตัวเองว่า
// "เกมสล็อตรวยขั้นเทพ" — แกนคือ **เกมสล็อต** แต่ ⚠️ ต่างจากหกรอบก่อนตรงที่บรีฟ
// รอบนี้ **ระบุหมวดเกมอื่นไว้ด้วยจริงๆ**: ยิงปลา · ไฮโล · หวยออนไลน์/แทงหวย
// สามคำนั้นจึง **ใช้ได้รอบนี้** ไม่ใช่คำค้างของแบรนด์เก่า) แกนของบรีฟรอบนี้คือ
// **รวมเกมสล็อต ยิงปลา ไฮโล หวยออนไลน์ ไว้ในเว็บเดียว พร้อมสมัคร เข้าสู่ระบบ
// ฝากถอน** บวกกับ **โปรโมชั่นคืนยอดเสีย 0.3% และแนะนำเพื่อน 0.8%**
// ⚠️ ถึงบรีฟจะพูดถึงหวยออนไลน์ แต่ **นี่ไม่ใช่เว็บหวย** — เป็นหนึ่งในสี่หมวดเกม
// ที่ผู้ให้บริการเปิดให้ ไม่ใช่ตัวเว็บ /ตรวจหวย กับ /แนวทาง จึงยังจอดอยู่ที่
// src/pages-disabled/ และห้ามมีลิงก์ในเมนูหรือฟุตเตอร์
// ⚠️ บรีฟรอบนี้ **ไม่ได้ระบุชื่อค่ายเกมแม้แต่ค่ายเดียว** — ถ้าเจอ PG SOFT / JOKER /
// JILI หรือ "นำเข้าตรงจากสิงคโปร์" ที่ไหน แปลว่าเป็นคำของ **มีโชค168** ที่ค้างอยู่
// ถ้าเจอ "เกมสล็อตเจนซี" / "ระบบเข้าทางคนรุ่นใหม่" / "ใส่ใจทุกค่ายเกม" /
// "เดิมพันง่าย ไม่มีขั้นต่ำ" คือคำของ **มีเฮ168** รอบก่อนที่ค้าง ถ้าเจอ "สล็อตรวมเกม
// กำไรงาม" / "เล่นง่ายทุกค่าย" / "ได้เงินสูงทุกรอบ" / "ทุนน้อยก็เล่นได้" คือคำของ
// **รวยแทร่168** ถ้าเจอ "สล็อตโปรแรงโบนัส0.8%ทุกวัน" / "แค่แนะนำง่ายๆ รับได้ไม่อั้น"
// คือคำของ **นินจา168** ถ้าเจอ "ถอนง่าย" / "ไม่มีรีวิวเสีย" / "หลักแสนยูสต่อวัน" /
// "การันตีเว็บแท้" คือคำของ **ถอนชัวร์168** และถ้าเจอ "เว็บสล็อตทางการ" /
// "ผู้ให้บริการฐานเกมหลัก" / "เว็บแท้อันดับ1" / "เว็บแท้100%" คือคำของ
// **สบายเบท168** — ไม่ใช่ของรอบนี้ทั้งหมด
// ⚠️ รอบนี้ **ทองจักรพรรดินำ แดงชาดรอง** — กลับขั้วจากรอบก่อน (มีเฮ168 แดงนำ
// ทองเนยรอง) แต่ **ทองเคยนำมาแล้วเกือบทุกแบรนด์ และแดงเคยนำมาแล้วสามแบรนด์**
// จึง **ห้ามเทียบด้วยวงศ์สี ต้องเทียบทีละค่า** ทองรอบนี้คือ #f0bb4e
// (R240 G187 B78 — ทองน้ำผึ้ง) ซึ่งไม่ใช่ f0b429 ของรับตัง168 (B41) ไม่ใช่
// fcd45c ของมีเฮ168 (G212) ไม่ใช่ e3b23c ของสมหวัง168 ไม่ใช่ f9a826 ของรวยแทร่168
// ส่วนแดงรอบนี้คือ #e4021b (R228 G2 B27) ซึ่งไม่ใช่ fb1b32 ของมีเฮ168 ไม่ใช่
// fa0513 ของสมหวัง168 ไม่ใช่ d30304 ของรับตัง168 ไม่ใช่ b3121b ของขวัญใจ168
// ถ้าเจอ fb1b32 / ff8f9c / 5c0410 / fcd45c / fdeaec ที่ไหน คือของ **มีเฮ168**
// ที่ค้าง — ตารางค่าเต็มอยู่ใน .claude/brand-spec-ruaythep168.md §2
// ส่วนโดเมนรอบนี้คือ รวยเทพ168.com — **IDN ภาษาไทย ไม่ใช่ ASCII** ต่างจากสองรอบ
// ก่อน จึงเก็บใน astro.config.mjs เป็น punycode: xn--168-vml9awg6a2s.com
// ⚠️ ถึงรอบนี้โดเมนจะอ่านตรงกับชื่อแบรนด์ก็ไม่ได้แปลว่ารอบหน้าเดาได้: รอบ TSDET911
// แบรนด์สะกด d แต่โดเมนสะกด b (tsbet911-play.com)
// ถ้า operator ไม่ได้ระบุโดเมนมาในคำสั่ง ห้ามแตะ site: เด็ดขาด — รอบนี้ operator
// ระบุมาตรงๆ ว่า real url is "https://รวยเทพ168.com"
// ค่านี้คือชื่อที่คนอ่านเห็นบนโลโก้ ไม่ใช่ host — host มาจาก site:
// ใน astro.config.mjs เท่านั้น ทั้งสองค่ามาจาก operator ตรงๆ
//
// iconSlug (ด้านล่าง) รอบนี้เหลือ **"168"** เพราะ [^a-z0-9] กินอักษรไทยทิ้งหมด
// ค่านี้ไม่ว่าง จึง **ไม่** ตก fallback แฮช (ต่างจากกรณี "หวยเต็ง" ที่เป็นไทยล้วน
// ไม่มีตัวเลขเลย แล้วเหลือสตริงว่างจนต้องพึ่ง fallback)
// ⚠️ เก้ารอบก่อน (มีเฮ168 / รวยแทร่168 / นินจา168 / สบายเบท168 / ถอนชัวร์168 /
// มีโชค168 / ขวัญใจ168 / รับตัง168 / สมหวัง168) ก็ได้ "168" เท่ากัน **?v= จึงไม่
// เปลี่ยนข้ามสิบรอบนี้** ไบต์ของไฟล์ไอคอนเปลี่ยน แต่ query ไม่เปลี่ยน — เป็นข้อจำกัด
// ที่รู้อยู่ ห้ามแก้ iconVersion ด้วยมือเพื่อ "บังคับให้ต่าง" เพราะค่านี้ต้องคงที่
// ต่อแบรนด์ สังเกตว่า slug มาจากชื่อแบรนด์ จึงไม่เท่ากับ label ใน wrangler.toml
// ซึ่งมาจาก "โดเมน" — รอบนี้คือ 168 กับ xn--168-vml9awg6a2s
//
// รอบนี้บรีฟ (src/assets/content.txt) เขียน "รวยเทพ168" ตรงกับอาร์ตเวิร์กและคำสั่ง
// ของ operator ทุกจุด ไม่มีความขัดแย้งแบบรอบ UOK365 ที่บรีฟยังเป็นชื่อแบรนด์ก่อนหน้า
// ⚠️ **อย่าสับสนกับ รวยแทร่168** (ruaythear168.net) ซึ่งเป็นคนละแบรนด์ที่เคยผ่าน
// รีโปนี้มาแล้ว — ขึ้นต้นด้วย "รวย" เหมือนกันแต่ไม่เกี่ยวข้องกันเลย
// ถึงอย่างนั้นหน้าเว็บก็ยังไม่พิมพ์ชื่อแบรนด์ตรงๆ เลยสักที่ แต่ interpolate ค่านี้แทน
// ค่านี้ไปโผล่ใน og:site_name, JSON-LD, terms/privacy และ <address>
export const BRAND_NAME = "รวยเทพ168";

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
// รวยเทพ168 เป็น **ทองจักรพรรดินำ แดงชาดเป็นฮิวที่สอง ทองแดงเป็นฮิวที่สาม และ
// น้ำตาลเข้ม/ดำเป็นเงาที่ไม่เคยถือตัวอักษร** บนพื้นดำสนิท
// ⚠️ **รอบนี้กลับขั้วจากรอบก่อน** (มีเฮ168 แดงนำ+ทองเนยรอง) มาเป็นทองนำ+แดงรอง
// **แต่ทองเคยนำมาแล้วเกือบทุกแบรนด์ และแดงเคยนำมาแล้วสามแบรนด์** จึง **ห้าม
// พิสูจน์ด้วยวงศ์สีเด็ดขาด ต้องเทียบทีละค่า** ความต่างที่แท้จริงของรอบนี้มีสี่ข้อ
// และทุกข้อต้องเห็นได้บนหน้าเว็บ:
//   1. ทองรอบนี้เป็น **ทองน้ำผึ้ง** #f0bb4e (R240 G187 B78) — ⚠️ **อยู่ใกล้
//      #f0b429 ของรับตัง168** (R เท่ากัน G ต่าง 7) แต่ **B78 vs B41 คือตัวตัดสิน**
//      ต้อง grep เป็นค่า ห้ามกะด้วยตา และ ≠ #fcd45c (มีเฮ168 เหลืองกว่ามาก G212)
//      ≠ #e3b23c (สมหวัง168) ≠ #f9a826 (รวยแทร่168) ≠ #fef54b (นินจา168)
//      ≠ #f7c92b (ขวัญใจ168) ≠ #fcd434 (มีโชค168) ≠ #ffc82e (สบายเบท168)
//   2. ฮิวที่สองเป็น **แดงชาด** #e4021b (R228 G2 B27) ≠ #fb1b32 ของรอบก่อน
//      (G27 B50) ≠ #fa0513 ของสมหวัง168 ≠ #d30304 ของรับตัง168
//      ≠ #b3121b ของขวัญใจ168
//   3. ฮิวที่สามเป็น **ทองแดง** #d9701a ซึ่ง **ไม่มีแบรนด์ไหนในรีโปนี้เคยใช้** —
//      อ่านจากเฉดเงาของไล่สีทองในอาร์ตเวิร์กทั้งสี่ไฟล์ (รอบก่อนถึงกับ "ห้ามส้ม"
//      ไว้ชัดเจน การใช้รอบนี้จึงเป็นการหลุดจากของเดิมจริง)
//   4. ชุดความลึกเป็น **น้ำตาลไหม้** #3b1b0e / #260d04 / #0d0501 ≠ #2b0711 /
//      #1a040a / #0c0205 ของรอบก่อน ≠ #2b100f / #200a09 / #140505 ของรับตัง168
//      ≠ #2c1413 / #1f0d0c / #140706 ของสมหวัง168 ≠ #140c06 / #241509 / #160d06
//      ของขวัญใจ168 (⚠️ ชั้นจมสุด #0d0501 เป็นเกือบดำและอยู่ใกล้เกือบดำของหลาย
//      แบรนด์ — เรื่องนี้เลี่ยงไม่ได้และ **ไม่ใช่สีอัตลักษณ์** ความต่างบังคับไว้ที่
//      ชั้นยกกับชั้นกลางซึ่งเป็นชั้นที่มองเห็น)
// นอกจากนั้นการหมุน variant (NavbarPremium + Footer ฐาน + AnnouncementPremium +
// LatestWinners4 + การ์ดชุด FloatingBadge/Neumorphism/TwoPremium/SevenThreePremium)
// คือสิ่งที่ทำให้รูปทรงของหน้าไม่ซ้ำ ไม่ใช่สี — ดู .claude/brand-spec-ruaythep168.md §3
// อ่านมาจากงานศิลป์ตรงๆ: dominant ของ banner1/slide1 คือ **ดำเกือบสนิท**
// (#010000 #020101) ซึ่งตรงกับพื้นเพจพอดีรอบนี้ แต่ **ก็ยังไม่ใช่สีแบรนด์** และ
// พื้นเพจมาจาก bg.json ไม่ใช่จากรูป ส่วน vivid ของ banner1 เป็นโทนผิว/ชมพูจาง
// (#e9b6ab #e4ada3) ซึ่ง **ไม่ใช่สีแบรนด์** — เป็นผิวของนางแบบในภาพ
// — **palette.json จัดอันดับให้ แต่ไม่ได้ตีความให้** ไฟล์เดียวที่ตัวเลขชี้ถูกคือ
// logo.webp ซึ่งให้ vivid เป็น #ea061c #f50b26 #e4021b (แดงชาด = เนื้อตัวอักษร
// "168") ส่วน **ทองซึ่งเป็นฮิวหลักกลับไม่ติดอันดับเลย** เพราะไล่เฉดกระจายเป็นหลาย
// บักเก็ต — วัดซ้ำด้วย sharp แบบแบ่งแถบ hue ถ่วงด้วย saturation ได้ทองที่ค่ากลาง
// #edbb5a / #edaf4d / #eac264 และยอด #ffdb77 / #fdd871 / #fed777 พร้อมกันทั้งสี่
// ไฟล์ จึงสรุปเป็น #f0bb4e
// โลโก้อ่านตรงๆ ได้ว่า: คำว่า **"รวย" เป็นตัวอักษรไทยหนาสามมิติสีทองไล่เฉด**
// ต่อด้วย **"เทพ" สีขาวมุก** และ **"168" สีแดงชาดผิวมันวาว** ทางซ้ายเป็น
// **เทพเจ้าแห่งโชคลาภจีน (ไฉ่ซิงเอี๊ย) หัวเราะ สวมหมวกปีกทองแต่งแดง** วางอยู่บน
// **ริ้วทองโค้ง** ล้อมด้วย **ประกายดาวสีทอง** บนพื้นดำ
// แบนเนอร์เป็นฉาก **พื้นดำ** ฝั่งขวาเป็น **หญิงสาวผมบลอนด์เงินสั้น ชุดขาว-แดง
// สวมโช้กเกอร์จี้หัวใจ ยื่นมือมาทางผู้ชม** ข้างๆ มี **ตู้สล็อตที่ขึ้นเลข 777** และ
// **ไพ่เอซโพแดง** กลางภาพเป็นคำว่า รวยเทพ168 ตัวโตพร้อม **มงกุฎทอง** ใต้ลงมาเป็น
// **เกมสล็อตรวยขั้นเทพ** และแถบเขียนว่า **สมัคร ฝากถอน รับโปร ครบในเว็บเดียว**
// มุมซ้ายล่างมี **ชิปคาสิโนแดง-ขาว** และมี **เหรียญทองร่วง** **หัวใจแดง** กับ
// **กล่องของขวัญแดง** ทั่วภาพ
// — **ไม่มีฉากพื้นขาว-ชมพูอ่อน ไม่มีหน้ายิ้มหัวเราะสีเหลืองทอง ไม่มีชุดลูกไม้ขาว
// ผูกโบว์แดงแบบมีเฮ168 ไม่มีนินจาการ์ตูนชุดดำ ไม่มีชูริเคน ไม่มีผ้าคาดหัวแบบ
// นินจา168 ไม่มีถุงเงินสีฟ้า ไม่มีหัวใจสีฟ้า ไม่มีโบว์ซาตินฟ้าแบบรวยแทร่168
// ไม่มีแมวการ์ตูนขนขาวลายส้มแบบสบายเบท168 ไม่มีมือถือขึ้นคำว่า ถอนสำเร็จ ไม่มี
// ริบบิ้นซาตินชมพู ดอกซากุระชมพู หรือหญิงสาวชุดชมพูปักทองแบบถอนชัวร์168 ไม่มีแมว
// กวักนำโชคจีน ไม่มีเหรียญจีนรูสี่เหลี่ยม ไม่มีทองแท่งจีน ไม่มีธงชาติสิงคโปร์
// ไม่มีหญิงสาวชุดแดงปักทองผมดำแบบขวัญใจ168 ไม่มีอักขระมังกรจีน 龍 (GT66B) ไม่มี
// มาสคอตโจรการ์ตูน (TKB55) ไม่มีปีกเหยี่ยวน้ำเงิน (TSDET911) ไม่มีเป็ดการ์ตูน
// (DUCK1688) ไม่มีหัวเสือ (TIGERWIN369) และไม่มีโปสเตอร์หวย**
// ⚠️ **รอบนี้ไม่มีฟ้า/น้ำเงิน/ไซยาน ไม่มีม่วง ไม่มีเขียว ไม่มีเงิน/โครเมียม
// ไม่มีโรสโกลด์ ไม่มีเหลืองมะนาว และไม่มีชมพูบานเย็น/ฟูเชีย**
// (039cfa c3ebfc เป็นฟ้าของ **รวยแทร่168** 32bcfb a9e9ff เป็นฟ้าของ **นินจา168**
// 2f9ff5 a8dcff เป็นฟ้าของ **สบายเบท168** fef54b เป็นเหลืองมะนาวของ **นินจา168**
// fa63b9 ffb3de เป็นชมพูของ **ถอนชัวร์168** f5469f ff8dc6 เป็นชมพูของ **มีโชค168**
// f2bba5 c98a74 เป็นโรสโกลด์ของ **ขวัญใจ168** cfd9e6 เป็นเงินของ **รับตัง168**
// ff8f9c เป็นชมพูบลัชของ **มีเฮ168** — เจอที่ไหนคือของเก่าค้าง ต้องกวาดออก)
// ⚠️ **ส้ม/ทองแดง #d9701a เป็นข้อยกเว้นที่อนุญาตเฉพาะรอบนี้** — รอบก่อนห้ามไว้
// เพราะไม่มีในอาร์ตเวิร์กของมัน รอบนี้มีจริงในเงาของไล่สีทองทั้งสี่ไฟล์
// ⚠️ **ทองเป็นกับดักเดิม เพราะแทบทุกแบรนด์ที่ผ่านรีโปนี้มีทอง** — มีเฮ168 fcd45c ·
// รวยแทร่168 f9a826 (+704504) · นินจา168 fef54b (+6b5c10) · สบายเบท168 ffc82e
// (+5c4a16) · ถอนชัวร์168 ffd84d · มีโชค168 fcd434 (+ffeaa0) · ขวัญใจ168 f7c92b
// (+ffe6a3 8a5f12 140c06) · รับตัง168 f0b429 (+ffdc8c 9a6c0c) · สมหวัง168 e3b23c
// (+ffe5a8 8a6210) · KMD88 e2b33f · TND168 dfa310 (+ffc93d +ffe4a3) ·
// KINGKONG555 f2c230 (+ffe066) · UFA324 e5a81b (+ffe08a bb8410) ·
// 789BETTING fad354 · FLASH877 f5c518 · PUNPRO168 fce343 · DUCK1688 f3bb34 ·
// WEPLAY168 fbe455 · SUPERSLOTCLUB f2b705 (+ffd666)
// — ส่วนทองน้ำผึ้งรอบนี้คือ **#f0bb4e** (R:240 G:187 B:78) เท่านั้น ⚠️ **ตัวที่
// ใกล้ที่สุดคือ f0b429 ของรับตัง168 ซึ่ง R เท่ากันเป๊ะ** ตัวตัดสินคือ B78 vs B41
// (อุ่นและนวลกว่าชัดเจน) และห่างจาก fcd45c ของรอบก่อนที่ G212 vs G187
// **แดงยิ่งต้องระวัง เพราะสี่แบรนด์ก่อนหน้าก็มีแดง** มีเฮ168 fb1b32 (+ff8f9c
// 5c0410) · สมหวัง168 fa0513 (+ff5a5f ffadaf b90203 8c0204 5b0203) · รับตัง168
// d30304 (+ff6b6e a00203 4a0202) · ขวัญใจ168 b3121b (+5a0a0e) · และ ea061c/f50b26/
// f22334 ที่ palette.json วัดได้เป็นเฉดข้างเคียงในโลโก้ของรอบนี้เอง ไม่ใช่ของ
// แบรนด์อื่น — แดงรอบนี้คือ **#e4021b** (+#d9701a ทองแดง) เท่านั้น
// การเจอ "ทองอยู่แล้ว" หรือ "แดงอยู่แล้ว" ในไฟล์ไหนจึงไม่พิสูจน์อะไรเลย ต้อง grep
// เป็นค่าทีละตัวกับตารางใน .claude/brand-spec-ruaythep168.md §2 ห้ามกะด้วยตา
// ชุดเต็มของมีเฮ168 ที่ต้องกวาดออกจากทุกไฟล์ที่ render (fb1b32 ff8f9c 5c0410
// fcd45c 6b4a08 2b0711 1a040a 0c0205 fdeaec ffe3e6 1b0308 และ rgba(251,27,50,α)
// rgba(252,212,92,α) rgba(255,143,156,α) rgba(92,4,16,α))
// ชุดของรวยแทร่168 (039cfa 0494f5 c3ebfc 04366b f9a826 704504 e3f2fc 0b2d52
// 071e38 030f1d 031320) ชุดของนินจา168 (32bcfb a9e9ff 07335f fef54b 6b5c10 0c2a3d
// 071a28 030e16 041019 dceefc) ชุดของสบายเบท168 (2f9ff5 a8dcff d6ecff 0b3f78
// ffc82e 5c4a16 e8f4ff 0e2238 081726 040d16 04121f) ชุดของถอนชัวร์168 (fa63b9
// ffb3de ffd84d 2b0f20 1a0914 0d040a 6d0b3f 6b4708 2a0617 fdeaf5) ชุดของมีโชค168
// (fcd434 ffeaa0 f5469f ff8dc6 8c0f52 7a5508 1a0612 f6e4ee 24101c 160a12 0b0509)
// ชุดของขวัญใจ168 (f7c92b ffe6a3 f2bba5 c98a74 b3121b 5a0a0e 8a5f12 eadfce 140c06
// 241509 160d06 0b0603) ชุดของรับตัง168 (f0b429 ffdc8c d30304 ff6b6e a00203 4a0202
// 9a6c0c cfd9e6 f5ece0 2b100f 200a09 140505 1a0505) และชุดของสมหวัง168 (fa0513
// ffadaf ff5a5f e3b23c ffe5a8 8a6210 b90203 8c0204 5b0203 3c0303 170504 f4ecea
// ccb9b6 2c1413 1f0d0c 140706 290f0f) ต้องไม่เหลือในไฟล์ที่ render เลยสักจุด
// ส่วน bg.json ของดรอปนี้เป็น {"mode":"color","color":"#000000"} = **ดำสนิท**
// เท่ากับรอบก่อน (ค่านี้มาจากไฟล์ ไม่ได้สืบทอด — ให้เปิดดูทุกรอบ) ลำดับความลึก
// รอบนี้เป็นน้ำตาลไหม้: #3b1b0e ยก = ผิวการ์ด / #260d04 กลาง / #0d0501 จม /
// #000000 = พื้นเพจ (คนละชุดกับ 2b0711 1a040a 0c0205 ของรอบก่อน)
// ตัวอักษรเนื้อความเป็นงาช้างอุ่น — ค่านี้คือสีนั้น
//
// มันทำงานสองหน้าที่พร้อมกัน: เป็นสีย่อหน้าในการ์ด และเป็นสีพื้นของทั้งเว็บที่หน้า
// terms/privacy/404 (ซึ่งไม่ประกาศสีเองเลยโดยตั้งใจ) พึ่งอยู่ รอบนี้ทั้งสองบริบท
// วางอยู่บนพื้นเข้มเหมือนกัน จึงใช้ค่าเดียวกันได้จริง
// #fff8ec บน #3b1b0e ≈ 14.7:1 · บน #260d04 ≈ 17.4:1 · บน #0d0501 ≈ 19.1:1
// และบนพื้นสีเดียวของ bg.json (#000000) ≈ 19.9:1
// ⚠️ ทองน้ำผึ้ง #f0bb4e ได้ ≈ 8.8:1 บนผิวการ์ด จึงเป็นตัวที่ใช้ไฮไลต์ <strong>
// ในเนื้อความ (สงวนไว้งานเดียวนี้) และใช้กับหัวข้อได้ด้วย
// ⚠️ **แดงแบรนด์ #e4021b ได้แค่ ≈ 3.2:1 บนผิวการ์ด (4.3:1 บนพื้นดำ) = ตกเกณฑ์ AA
// ทุกพื้น** จึงเป็น **สีพื้นถม/ขอบ/ไอคอนเท่านั้น ห้ามถือตัวอักษรบนพื้นเข้ม** —
// ถ้าต้องการตัวอักษรบนแดง ให้ถมแดงเป็นพื้นแล้ววาง #fff8ec ทับ (≈ 4.6:1 ผ่าน AA)
// ครีมทอง #ffeccb ได้ ≈ 13.4:1 ถือตัวอักษรรองได้สบาย
// ทองแดง #d9701a ได้ ≈ 4.7:1 บนผิวการ์ด — ใช้เป็นงานตกแต่ง/ขอบ/เส้น ไม่ใช่เนื้อความ
// และ #2b1400 เป็นหมึกตัวเดียวที่วางบนพื้นถมทอง (#f0bb4e ≈ 9.9:1) หรือพื้นถมครีม
// (#ffeccb ≈ 15.1:1) ได้
// (navbar/footer/ticker ประกาศสีตัวอักษรของตัวเองไว้ครบ ค่านี้จึงไปไม่ถึงมัน)
export const BRAND_TEXT = "#fff8ec";

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
