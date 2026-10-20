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

  // โดเมนจริงรอบนี้คือ https://รวยเทพ168.com — operator ระบุมาตรงๆ ในคำสั่ง
  // ⚠️ รอบนี้โดเมนเป็น **IDN ภาษาไทย** ต่างจากสองรอบก่อนที่เป็น ASCII ล้วน
  // (meehay168.cc · ruaythear168.net) จึง **ต้องเก็บเป็น punycode** ที่นี่:
  //   รวยเทพ168.com -> xn--168-vml9awg6a2s.com
  // ตรวจซ้ำได้ด้วย
  //   node -e "console.log(new URL('https://รวยเทพ168.com').hostname)"
  // เคยมี IDN มาแล้วสี่รอบ (สบายเบท-168.com -> xn---168-9gora7dtd1dwh.com ·
  // ถอนชัวร์168.com -> xn--168-ell7cs5e5a5c2b0v.com · มีโชค168.com ->
  // xn--168-pkl3a1luf6d.com · หวยดีใจ.com -> xn--82cx5btt7d4e.com) — รูปแบบ
  // เดียวกันเป๊ะ
  // ⚠️ TLD รอบนี้คือ **.com ไม่ใช่ .cc ของรอบก่อน** — อย่าพิมพ์ .cc ด้วยความเคยชิน
  // ⚠️ ผลข้างเคียงที่ตั้งใจของ IDN: BRAND_ADDRESS.email จะออกมาเป็น
  // <mailbox>@xn--168-vml9awg6a2s.com ซึ่ง **ถูกต้องแล้ว** verify-build.mjs เทียบ
  // โฮสต์ของอีเมลกับค่านี้ตรงๆ — ห้ามเขียนอีเมลสวยๆ ด้วยมือ (มีโชค168 กับ
  // ถอนชัวร์168 ก็ ship แบบนี้มาแล้ว)
  // ⚠️ label ใน wrangler.toml มาจาก **โดเมน** ไม่ใช่ชื่อแบรนด์ — รอบนี้คือ
  // "xn--168-vml9awg6a2s" ถ้าอนุมานจากชื่อแบรนด์ (รวยเทพ168) จะได้ "168" เพราะ
  // [^a-z0-9] กินอักษรไทยทิ้ง ซึ่งชนกับแบรนด์อื่นแน่นอน
  // ถ้า operator ไม่ได้ระบุโดเมนมาในคำสั่ง ห้ามเดาจากชื่อแบรนด์เด็ดขาด
  // (รอบ TSDET911 แบรนด์สะกด d แต่โดเมนสะกด b)
  // canonical, sitemap, robots.txt, อีเมลใน BRAND_ADDRESS และ JSON-LD ทุกตัว
  // อนุมานจากค่านี้ค่าเดียว ไม่มีไฟล์ไหนพิมพ์โดเมนซ้ำอีก
  site: "https://xn--168-vml9awg6a2s.com",
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
