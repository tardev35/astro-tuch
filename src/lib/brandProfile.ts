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

// รอบนี้ (นินจา168 2026-10-19) หมุนออกจาก google-sans ของรอบก่อน (สบายเบท168)
// กลับไปเป็น kanit เพื่อให้ชุด @font-face ไม่ซ้ำกันสองรอบติด — การหมุนสลับไปมา
// ทุกรอบคือสิ่งที่ตัดลายนิ้วมือข้ามแบรนด์ชุดนั้นลงครึ่งหนึ่ง ไม่ใช่การเลือกว่า
// ฟอนต์ไหน "ดีกว่า" ทั้งสองตัว self-host เหมือนกัน ไม่มี request ออกนอกโดเมน
export const BRAND_FONT: BrandFont = "kanit";

// ── ชื่อแบรนด์ ─────────────────────────────────────────────────────────────
// สลับบรรทัดเดียวนี้ตอนรีแบรนด์ เหมือน BRAND_FONT ด้านบน (ดู SKILL.md)
//
// มีไว้เพื่อให้ไฟล์ "ถาวร" เขียนชื่อแบรนด์ได้โดยไม่ต้อง hardcode — ไฟล์อย่าง
// terms/privacy หรือ schema helper อยู่นอกสโคปที่รีแบรนด์แตะ ถ้ามันพิมพ์ชื่อ
// แบรนด์ไว้ตรงๆ มันจะกลายเป็นชื่อของแบรนด์ก่อนหน้าแบบเงียบๆ ภายในไม่กี่ชั่วโมง
// และไม่มีอะไรในบิลด์จับได้ เพราะเว็บยัง build ผ่านทั้งสองแบบ
// ชื่อที่ "เห็นบนเว็บ" รอบนี้คือ นินจา168 — **ภาษาไทยผสมเลขอารบิก** เขียนติดกัน
// เป็นคำเดียว ไม่มีเว้นวรรค ไม่มีขีด โลโก้ แบนเนอร์ และสไลด์ของดรอป 2026-10-19
// เขียนตรงกันหมด: คำว่า "นินจา" เป็นตัวอักษรไทยหนาสามมิติ **สีเหลืองทอง** ต่อด้วย
// "168" **สีฟ้าบับเบิลผิวมันวาว** ข้างๆ เป็น **นินจาการ์ตูนชุดดำ** ผูกผ้าคาดหัว
// ฟ้า-ขาวมีดาวน้ำเงิน ขยิบตา ถือ **ดาวกระจาย (ชูริเคน) สีฟ้า** มีผ้าพันคอฟ้าปลิว
// ล้อมด้วยประกายดาวทองและชูริเคนฟ้า (บรีฟเรียกตัวเองว่า "สล็อตโปรแรงโบนัส0.8%
// ทุกวัน" — จึงเป็น **เว็บสล็อตล้วน** เหมือนสี่รอบก่อน ไม่ใช่คาสิโน ไม่มีหมวด
// กีฬา/บอล และไม่ใช่เว็บหวย) แกนของบรีฟรอบนี้คือ **โปรโมชั่นแนะนำเพื่อน 0.8%
// และคืนยอดเสีย 0.3%** ไม่ใช่เรื่องการเป็นช่องทาง/ฐานเกมหลักแบบรอบก่อน
// ⚠️ บรีฟรอบนี้ **ไม่ได้ระบุชื่อค่ายเกมแม้แต่ค่ายเดียว** — ถ้าเจอ PG SOFT / JOKER /
// JILI หรือ "นำเข้าตรงจากสิงคโปร์" ที่ไหน แปลว่าเป็นคำของ **มีโชค168** ที่ค้างอยู่
// ถ้าเจอ "ถอนง่าย" / "ไม่มีรีวิวเสีย" / "หลักแสนยูสต่อวัน" / "การันตีเว็บแท้"
// คือคำของ **ถอนชัวร์168** ที่ค้าง และถ้าเจอ "เว็บสล็อตทางการ" / "ผู้ให้บริการ
// ฐานเกมหลัก" / "เว็บแท้อันดับ1" / "เว็บแท้100%" / "3 ขั้นตอน" คือคำของ
// **สบายเบท168** รอบก่อนที่ค้าง ไม่ใช่ของรอบนี้
// ⚠️ รอบนี้ **ฟ้านำ เหลืองมะนาวรอง** — ซ้ำ "ตระกูล" กับรอบก่อน (สบายเบท168 ก็ฟ้านำ
// ทองรอง) เพราะอาร์ตเวิร์กมาแบบนั้นจริง จึง **ห้ามเทียบด้วยวงศ์สี ต้องเทียบทีละค่า**
// ฟ้ารอบนี้ไซยานสว่างกว่า #32bcfb (ไม่ใช่ 2f9ff5) และรองรอบนี้เป็นเหลืองมะนาว
// #fef54b (ไม่ใช่ทองอำพัน ffc82e) — ถ้าเจอ 2f9ff5 / a8dcff / 0b3f78 / ffc82e /
// e8f4ff ที่ไหน คือของ สบายเบท168 ที่ค้าง (เช่นเดียวกับ fa63b9/ffd84d ของ
// ถอนชัวร์168 fcd434/f5469f ของมีโชค168 f7c92b ของขวัญใจ168 และ cfd9e6 ของรับตัง168)
// ส่วนโดเมนรอบนี้คือ ninja168.bet — **ASCII ล้วน ไม่ใช่ IDN** ต่างจากสามรอบก่อน
// จึงเก็บใน astro.config.mjs ตรงตัว **ไม่ต้องแปลง punycode**
// ⚠️ ถึงรอบนี้โดเมนจะอ่านตรงกับชื่อแบรนด์ (นินจา -> ninja) ก็ไม่ได้แปลว่ารอบหน้า
// เดาได้: รอบ TSDET911 แบรนด์สะกด d แต่โดเมนสะกด b (tsbet911-play.com) ถ้า operator
// ไม่ได้ระบุโดเมนมาในคำสั่ง ห้ามแตะ site: เด็ดขาด — รอบนี้ operator ระบุมาตรงๆ
// ค่านี้คือชื่อที่คนอ่านเห็นบนโลโก้ ไม่ใช่ host — host มาจาก site:
// ใน astro.config.mjs เท่านั้น ทั้งสองค่ามาจาก operator ตรงๆ
//
// iconSlug (ด้านล่าง) รอบนี้เหลือ **"168"** เพราะ [^a-z0-9] กินอักษรไทยทิ้งหมด
// ค่านี้ไม่ว่าง จึง **ไม่** ตก fallback แฮช (ต่างจากกรณี "หวยเต็ง" ที่เป็นไทยล้วน
// ไม่มีตัวเลขเลย แล้วเหลือสตริงว่างจนต้องพึ่ง fallback)
// ⚠️ หกรอบก่อน (สบายเบท168 / ถอนชัวร์168 / มีโชค168 / ขวัญใจ168 / รับตัง168 /
// สมหวัง168) ก็ได้ "168" เท่ากัน **?v= จึงไม่เปลี่ยนข้ามเจ็ดรอบนี้** ไบต์ของไฟล์
// ไอคอนเปลี่ยน แต่ query ไม่เปลี่ยน — เป็นข้อจำกัดที่รู้อยู่ ห้ามแก้ iconVersion
// ด้วยมือเพื่อ "บังคับให้ต่าง" เพราะค่านี้ต้องคงที่ต่อแบรนด์
// สังเกตว่า slug มาจากชื่อแบรนด์ จึงไม่เท่ากับ label ใน wrangler.toml ซึ่งมาจาก
// "โดเมน" — รอบนี้คือ 168 กับ ninja168
//
// รอบนี้บรีฟ (src/assets/content.txt) เขียน "นินจา168" ตรงกับอาร์ตเวิร์กและคำสั่ง
// ของ operator ทุกจุด ไม่มีความขัดแย้งแบบรอบ UOK365 ที่บรีฟยังเป็นชื่อแบรนด์ก่อนหน้า
// ถึงอย่างนั้นหน้าเว็บก็ยังไม่พิมพ์ชื่อแบรนด์ตรงๆ เลยสักที่ แต่ interpolate ค่านี้แทน
// ค่านี้ไปโผล่ใน og:site_name, JSON-LD, terms/privacy และ <address>
export const BRAND_NAME = "นินจา168";

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
// นินจา168 เป็น **ฟ้าไซยานนำ เหลืองมะนาวเป็นฮิวที่สอง และน้ำเงินลึกเป็นเงาที่ไม่
// เคยถือตัวอักษร** บนพื้นดำสนิท
// ⚠️ **รอบนี้คือรอบแรกที่ตระกูลสีซ้ำกับรอบก่อน** — สบายเบท168 ก็ฟ้านำ+ทองรอง
// เหมือนกัน (ก่อนหน้านั้น: ถอนชัวร์168 ชมพูบับเบิลกัมนำ+ทองเนยรอง · มีโชค168
// ทองนำ+ชมพูบานเย็น · ขวัญใจ168 ทองนำ+โรสโกลด์ · รับตัง168 ทองนำ+แดงสด ·
// สมหวัง168 แดงนำ+ทองรอง) ที่ซ้ำเพราะ **อาร์ตเวิร์กของดรอปนี้เป็นฟ้า-ทองจริงๆ**
// ไม่ใช่เพราะลอกรอบก่อนมา — จึง **ห้ามพิสูจน์ด้วยวงศ์สีเด็ดขาด ต้องเทียบทีละค่า**
// ความต่างที่แท้จริงของรอบนี้มีสามข้อ และทั้งสามข้อต้องเห็นได้บนหน้าเว็บ:
//   1. ฟ้ารอบนี้ **ไซยานสว่างกว่า** #32bcfb (R50 G188 B251) ≠ #2f9ff5 ของรอบก่อน
//   2. ฮิวที่สองเป็น **เหลืองมะนาว** #fef54b ≠ **ทองอำพัน** #ffc82e ของรอบก่อน
//   3. ชุดความลึกเป็น **ฟ้าหมึก** #0c2a3d / #071a28 / #030e16 ≠ #0e2238 / #081726 /
//      #040d16 ของรอบก่อน
// นอกจากนั้นการหมุน variant (Cyber/CyberCut ทั้งชุด) คือสิ่งที่ทำให้รูปทรงของหน้า
// ไม่ซ้ำ ไม่ใช่สี — ดู .claude/brand-spec-ninja168.md §3
// อ่านมาจากงานศิลป์ตรงๆ: dominant ของ banner1/slide1 คือ **ขาวเกือบสนิท**
// (#fdfefe #fefefe) เพราะทั้งสองไฟล์เป็นฉากพื้นขาว-ฟ้าน้ำแข็ง ซึ่ง **ไม่ใช่สีแบรนด์
// และไม่ใช่พื้นเพจ** (พื้นเพจมาจาก bg.json ไม่ใช่จากรูป) ส่วน vivid ของ slide1
// เป็นโทนผิวของนางแบบ (#eccac4 #eac4bb) ซึ่ง **ไม่ใช่สีแบรนด์เช่นกัน**
// — **palette.json จัดอันดับให้ แต่ไม่ได้ตีความให้** ไฟล์เดียวที่ตัวเลขชี้ถูกคือ
// logo.webp ซึ่งให้ vivid เป็น #fef54b (เหลืองมะนาว = เนื้อตัวอักษร "นินจา") และ
// #32bcfb (ฟ้าไซยาน = เนื้อตัวอักษร "168") — สองค่านั้นคือสีแบรนด์จริงของรอบนี้
// โลโก้อ่านตรงๆ ได้ว่า: **นินจาการ์ตูนชุดดำ** ผูกผ้าคาดหัวฟ้า-ขาวมีดาวน้ำเงิน
// ขยิบตาหนึ่งข้าง ถือ **ดาวกระจาย (ชูริเคน) สีฟ้า** มีผ้าพันคอฟ้าปลิวไปด้านหลัง
// ยืนอยู่ซ้ายของคำว่า "นินจา" ที่เป็นตัวอักษรไทยหนาสามมิติ **สีเหลืองทอง** ต่อด้วย
// "168" **สีฟ้าบับเบิลผิวมันวาว** ล้อมด้วย **ประกายดาวสีทอง** และ **ชูริเคนสีฟ้า**
// แบนเนอร์เป็นฉาก **พื้นขาว-ฟ้าน้ำแข็ง** (ไม่ใช่พื้นดำแบบรอบก่อน) มีนินจาตัวเดียวกัน
// อยู่กลางซ้าย **หญิงสาวผมบลอนด์เงินชุดลูกไม้ขาว-ฟ้าชี้นิ้วมาทางผู้ชม** อยู่ฝั่งขวา
// ข้างๆ มี **ตู้สล็อตขึ้นเลข 777** กลางภาพเป็นคำว่า นินจา168 ตัวโต และสองแถบคำโปรย
// **สล็อตโปรแรงโบนัส 0.8% ทุกวัน** กับ **แค่แนะนำง่ายๆ รับได้ไม่อั้น** มุมล่างซ้าย
// เป็น **กล่องของขวัญผูกโบว์ฟ้า** กับเหรียญทอง และมี **หัวใจฟ้า** ทั่วภาพ
// — **ไม่มีแมวการ์ตูนขนขาวลายส้มแบบสบายเบท168 ไม่มีมือถือขึ้นคำว่า ถอนสำเร็จ
// ไม่มีริบบิ้นซาตินชมพู ดอกซากุระชมพู หรือหญิงสาวชุดชมพูปักทองแบบถอนชัวร์168
// ไม่มีแมวกวักนำโชคจีน ไม่มีเหรียญจีนรูสี่เหลี่ยม ไม่มีทองแท่งจีน ไม่มีธงชาติ
// สิงคโปร์ ไม่มีหญิงสาวชุดแดงปักทองผมดำแบบขวัญใจ168 ไม่มีอักขระมังกรจีน 龍 (GT66B)
// ไม่มีมาสคอตโจรการ์ตูน (TKB55) ไม่มีปีกเหยี่ยวน้ำเงิน (TSDET911) ไม่มีเป็ดการ์ตูน
// (DUCK1688) ไม่มีหัวเสือ (TIGERWIN369) ไม่มีไพ่เอซ/กองชิปคาสิโนแบบรับตัง168
// และไม่มีโปสเตอร์หวย**
// ⚠️ **รอบนี้ไม่มีชมพู ไม่มีแดง ไม่มีม่วง ไม่มีเขียว ไม่มีส้ม ไม่มีเงิน/โครเมียม
// อมฟ้า และไม่มีโรสโกลด์** (fa63b9 ffb3de เป็นชมพูของ **ถอนชัวร์168** f5469f
// ff8dc6 เป็นชมพูของ **มีโชค168** f2bba5 c98a74 เป็นโรสโกลด์ของ **ขวัญใจ168**
// b3121b เป็นแดงชาดของ **ขวัญใจ168** cfd9e6 เป็นเงินของ **รับตัง168** — เจอที่ไหน
// คือของเก่าค้าง ต้องกวาดออก)
// ⚠️ **กับดักรอบนี้หนักกว่าทุกรอบ เพราะทั้งฟ้าและทองเคยถูกใช้ไปแล้วในรอบก่อนหน้า**
// ทองเป็นกับดักเดิม เพราะแทบทุกแบรนด์ที่ผ่านรีโปนี้มีทอง — สบายเบท168 ffc82e
// (+5c4a16) · ถอนชัวร์168 ffd84d · มีโชค168 fcd434 (+ffeaa0) · ขวัญใจ168 f7c92b
// (+ffe6a3 8a5f12 140c06) · รับตัง168 f0b429 (+ffdc8c 9a6c0c) · สมหวัง168 e3b23c ·
// KMD88 e2b33f · TND168 dfa310 (+ffc93d +ffe4a3) · KINGKONG555 f2c230 (+ffe066) ·
// UFA324 e5a81b · 789BETTING fad354 · FLASH877 f5c518 · PUNPRO168 fce343 ·
// DUCK1688 f3bb34 · WEPLAY168 fbe455 · SUPERSLOTCLUB f2b705 (+ffd666)
// — ส่วนเหลืองมะนาวรอบนี้คือ **#fef54b** (R:254 G:245 B:75) เท่านั้น และมันเป็น
// **เหลืองมะนาว ไม่ใช่ทอง** คือเขียวอมเหลืองกว่าทุกค่าข้างบนอย่างเห็นได้ชัด
// **ฟ้ายิ่งไม่ปลอดภัย เพราะรอบที่แล้วก็ฟ้า** สบายเบท168 2f9ff5 (+a8dcff d6ecff
// 0b3f78) · TSDET911 0360f3 (+0292fb 6ec8ff) · HI59 0a84e0 (+04203f e4f1fd) ·
// cfd9e6 ของ รับตัง168 เป็นเงินอมฟ้าที่หน้าตาใกล้ฟ้าอ่อนมาก
// — ฟ้ารอบนี้คือ **#32bcfb** (+#a9e9ff +#07335f) เท่านั้น
// การเจอ "ทองอยู่แล้ว" หรือ "ฟ้าอยู่แล้ว" ในไฟล์ไหนจึงไม่พิสูจน์อะไรเลย ต้อง grep
// เป็นค่าทีละตัวกับตารางใน .claude/brand-spec-ninja168.md §2 ห้ามกะด้วยตาเด็ดขาด
// ชุดเต็มของสบายเบท168 ที่ต้องกวาดออกจากทุกไฟล์ที่ render (2f9ff5 a8dcff d6ecff
// 0b3f78 ffc82e 5c4a16 e8f4ff 0e2238 081726 040d16 04121f และ rgba(47,159,245,α)
// rgba(255,200,46,α) rgba(168,220,255,α) rgba(11,63,120,α))
// ชุดของถอนชัวร์168 (fa63b9 ffb3de ffd84d 2b0f20 1a0914 0d040a 6d0b3f 6b4708
// 2a0617 fdeaf5) ชุดของมีโชค168 (fcd434 ffeaa0 f5469f ff8dc6 8c0f52 7a5508 1a0612
// f6e4ee 24101c 160a12 0b0509) ชุดของขวัญใจ168 (f7c92b ffe6a3 f2bba5 c98a74
// b3121b 5a0a0e 8a5f12 eadfce 140c06 241509 160d06 0b0603) ชุดของรับตัง168
// (f0b429 ffdc8c d30304 ff6b6e a00203 4a0202 9a6c0c cfd9e6 f5ece0 2b100f 200a09
// 140505 1a0505) และชุดของสมหวัง168 (fa0513 ffadaf ff5a5f e3b23c ffe5a8 8a6210
// b90203 8c0204 5b0203 3c0303 170504 f4ecea ccb9b6 2c1413 1f0d0c 140706 290f0f)
// ต้องไม่เหลือในไฟล์ที่ render เลยสักจุด
// ส่วน bg.json ของดรอปนี้เป็น {"mode":"color","color":"#000000"} = **ดำสนิท**
// เท่ากับรอบก่อน (ค่านี้มาจากไฟล์ ไม่ได้สืบทอด — ให้เปิดดูทุกรอบ) ลำดับความลึก
// รอบนี้เป็นฟ้าหมึก: #0c2a3d ยก = ผิวการ์ด / #071a28 กลาง / #030e16 จม /
// #000000 = พื้นเพจ (คนละชุดกับ 0e2238 081726 040d16 ของรอบก่อน)
// ตัวอักษรเนื้อความเป็นขาวอมฟ้า — ค่านี้คือสีนั้น
//
// มันทำงานสองหน้าที่พร้อมกัน: เป็นสีย่อหน้าในการ์ด และเป็นสีพื้นของทั้งเว็บที่หน้า
// terms/privacy/404 (ซึ่งไม่ประกาศสีเองเลยโดยตั้งใจ) พึ่งอยู่ รอบนี้ทั้งสองบริบท
// วางอยู่บนพื้นเข้มเหมือนกัน จึงใช้ค่าเดียวกันได้จริง
// #dceefc บน #0c2a3d ≈ 13.2:1 · บน #071a28 ≈ 14.8:1 · บน #030e16 ≈ 15.9:1
// และบนพื้นสีเดียวของ bg.json (#000000) ≈ 16.8:1
// ⚠️ เหลืองมะนาว #fef54b ได้ ≈ 12.7:1 บนผิวการ์ด จึงเป็นตัวที่ใช้ไฮไลต์ <strong>
// ในเนื้อความ (สงวนไว้งานเดียวนี้) ส่วนฟ้าแบรนด์ #32bcfb ได้ ≈ 7.1:1 และ
// ฟ้าน้ำแข็ง #a9e9ff ได้ ≈ 11.3:1 ทั้งคู่ถือหัวข้อ ขอบ ไอคอน และตัวอักษรรองได้จริง
// ส่วนน้ำเงินลึก #07335f (≈1.4:1) และทองลึก #6b5c10 (≈1.9:1)
// เป็นเส้น/ขอบ/ออรา/พื้นถมเท่านั้น **ห้ามถือตัวอักษรทุกขนาด**
// และ #041019 เป็นหมึกตัวเดียวที่วางบนพื้นถมเหลือง (#fef54b ≈ 16.5:1) หรือพื้นถมฟ้า
// (#32bcfb ≈ 8.9:1) ได้
// (navbar/footer/ticker ประกาศสีตัวอักษรของตัวเองไว้ครบ ค่านี้จึงไปไม่ถึงมัน)
export const BRAND_TEXT = "#dceefc";

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
