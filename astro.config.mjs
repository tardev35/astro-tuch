// @ts-check
import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },

  image: {
    service: { entrypoint: "./tools/avif-quality-service.mjs" },
  },

  build: {
    // "auto" (Astro's default) externalises anything over ~4 kB and keeps the
    // genuinely tiny page-level blocks inline.
    //
    // This used to be "always", which is a good setting for a small stylesheet
    // and a bad one for this project's: the sheet is ~227 kB, so 82% of every
    // byte of HTML the site shipped was the same CSS pasted into each page —
    // 1.83 MB across the build, none of it cacheable, and re-downloaded on
    // every navigation. It also pushed the hero <img> ~230 kB down the
    // document, so the preload scanner reached the LCP image late on the one
    // request where it matters.
    //
    // The trade is one render-blocking request on a cold visit. With
    // public/_headers marking /_astro/* immutable for a year, that is paid once
    // per visitor instead of once per page view.
    inlineStylesheets: "auto",
  },

  redirects: {
    "/line": "https://tinyurl.com/tog191",
  },

  // โดเมนจริงรอบนี้คือ https://ninja168.bet — operator ระบุมาตรงๆ ในคำสั่ง
  // ⚠️ รอบนี้โดเมนเป็น **ASCII ล้วน** ต่างจากสามรอบก่อนที่เป็น IDN ภาษาไทย
  // (สบายเบท-168.com -> xn---168-9gora7dtd1dwh.com · ถอนชัวร์168.com ->
  // xn--168-ell7cs5e5a5c2b0v.com · หวยดีใจ.com -> xn--82cx5btt7d4e.com)
  // จึง **ไม่ต้องแปลง punycode** และ **ห้ามแปลง** — new URL() คืนค่า ninja168.bet
  // ตรงตัวอยู่แล้ว การใส่ xn-- นำหน้าจะกลายเป็นโฮสต์ที่ไม่มีอยู่จริง
  // (ตรวจซ้ำได้ด้วย node -e "console.log(new URL('https://ninja168.bet').hostname)")
  // ⚠️ TLD รอบนี้คือ **.bet ไม่ใช่ .com** — อย่าเติม .com ด้วยความเคยชิน
  // ⚠️ ชื่อแบรนด์กับโดเมนรอบนี้ "อ่านตรงกัน" (นินจา -> ninja) แต่ยังคนละค่าอยู่ดี
  // label ใน wrangler.toml มาจาก **โดเมน** ไม่ใช่ชื่อแบรนด์ — รอบนี้คือ "ninja168"
  // ถ้า operator ไม่ได้ระบุโดเมนมาในคำสั่ง ห้ามเดาจากชื่อแบรนด์เด็ดขาด (รอบ TSDET911
  // แบรนด์สะกด d แต่โดเมนสะกด b)
  // canonical, sitemap, robots.txt, อีเมลใน BRAND_ADDRESS และ JSON-LD ทุกตัว
  // อนุมานจากค่านี้ค่าเดียว ไม่มีไฟล์ไหนพิมพ์โดเมนซ้ำอีก
  site: "https://ninja168.bet",
  integrations: [
    sitemap({
      // /line is a redirect declared above — it resolves to an external short
      // link and has no page of its own, so listing it asks Google to crawl a
      // URL that only ever 301s off-site.
      //
      // /login and /register are NOT filtered, and that depends on brand state:
      // when the uploader's cta toggle is ON (as it is for this brand) they are
      // real button pages that ship `index, follow` from MainLayout's default,
      // carry a length-gated description, and are meant to be indexed —
      // withholding them from the sitemap while asking Google to index them is
      // the contradiction, in the opposite direction. This filter previously
      // dropped both on the premise that all three were noindex forwarding
      // stubs, which stopped being true once the toggle converted them.
      // If a future brand switches the toggle off, they revert to noindex
      // redirect stubs (src/pages-disabled/*.redirect.astro) and belong back in
      // this pattern — check which shape they have before trusting either form.
      //
      // Match against the pathname, anchored at the front. The old form tested
      // the whole URL unanchored, so a future page whose path merely ENDED in
      // one of these words — /promotion/line, say — would have been dropped
      // from the sitemap silently.
      filter: (page) => !/^\/line\/?$/.test(new URL(page).pathname),
    }),
  ],
});
