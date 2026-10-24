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
    "/line": "https://tinyurl.com/linetddy",
  },

  // โดเมนจริงรอบนี้คือ https://โบ๊ะบ๊ะ-168.com — operator ระบุมาตรงๆ ในคำสั่ง
  // ⚠️⚠️ **โดเมนรอบนี้เป็น IDN ภาษาไทย จึงต้องแปลงเป็น punycode ก่อนเขียนลงที่นี่**
  // (กลับทิศจากสามรอบก่อนหน้าที่เป็น ASCII ล้วน: moobin-168.online /
  // slot-168.online / ruay168.games — ส่วน นาซ่า168 กับ สบาย168 ก่อนหน้านั้น
  // เป็น IDN เหมือนรอบนี้)
  //   โบ๊ะบ๊ะ-168.com -> xn---168-phoa7mb2n5cc.com
  // ตรวจด้วย `node -e "console.log(new URL('https://โบ๊ะบ๊ะ-168.com').hostname)"`
  // ห้ามพิมพ์เอาเองจากความจำ
  // ⚠️⚠️ **TLD รอบนี้คือ `.com`** (รอบก่อนเป็น .online) ทุกค่าที่ derive จาก
  // บรรทัดนี้จะผิดตามทันทีถ้าพิมพ์ TLD ผิด
  // ⚠️ BRAND_ADDRESS.email จะออกมาเป็น <mailbox>@okkub88.net ซึ่ง
  // **ถูกต้องแล้ว** verify-build.mjs เทียบโฮสต์ของอีเมลกับค่านี้ตรงๆ
  // — ห้ามเขียนอีเมลด้วยมือ
  // ⚠️ name ใน wrangler.toml มาจาก **โดเมน** ไม่ใช่ชื่อแบรนด์ — รอบนี้บังเอิญ
  // ตรงกันทั้งสองค่า ("okkub88") เพราะชื่อแบรนด์เป็นละติน+เลขล้วน iconSlug จึงไม่
  // โดน [^a-z0-9] กินอะไรเลย **แต่ที่มาของสองค่ายังคนละทางกันเสมอ** —
  // name มาจาก SITE.hostname.split(".")[0] ส่วน iconSlug มาจาก BRAND_NAME
  // (รอบก่อน โบ๊ะบ๊ะ168 สองค่านี้ต่างกันสิ้นเชิง: "168" vs "xn---168-phoa7mb2n5cc")
  // ⚠️ รอบนี้โดเมนเป็น **ASCII ล้วน ไม่ต้องแปลง punycode** เหมือนรอบก่อน
  // — แต่ **TLD เป็น .cc** ไม่ใช่ .net ของรอบก่อน (name ไม่รวม TLD อยู่แล้ว)
  // ถ้า operator ไม่ได้ระบุโดเมนมาในคำสั่ง ห้ามเดาจากชื่อแบรนด์เด็ดขาด
  // canonical, sitemap, robots.txt, อีเมลใน BRAND_ADDRESS และ JSON-LD ทุกตัว
  // อนุมานจากค่านี้ค่าเดียว ไม่มีไฟล์ไหนพิมพ์โดเมนซ้ำอีก
  site: "https://mexicanoslot.cc",
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
