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

  // โดเมนจริงรอบนี้คือ https://สบายเบท-168.com — operator ระบุมาตรงๆ ในคำสั่ง
  // ⚠️ รอบนี้โดเมนเป็น **IDN ภาษาไทย** เหมือนสองรอบก่อน จึงต้องเก็บเป็น
  // **punycode** ตรงนี้ เหมือนรอบ หวยดีใจ.com -> xn--82cx5btt7d4e.com และ
  // ถอนชัวร์168.com -> xn--168-ell7cs5e5a5c2b0v.com:
  //   สบายเบท-168.com -> xn---168-9gora7dtd1dwh.com
  // (ตรวจซ้ำได้ด้วย node -e "console.log(new URL('https://สบายเบท-168.com').hostname)")
  // ⚠️ **รอบนี้ชื่อโดเมนมีขีดคั่นอยู่ก่อนเลข 168 ด้วย** ผลคือ punycode ขึ้นต้นด้วย
  // `xn---` (ขีด **สามตัว**) ไม่ใช่ `xn--168-` แบบสองรอบก่อน — อย่าแก้จำนวนขีด
  // ด้วยมือเพราะ "ดูเหมือนพิมพ์เกิน" ค่านี้มาจาก new URL() ตรงๆ
  // เก็บเป็น punycode เพราะ new URL() normalize ให้อยู่แล้ว และ canonical/sitemap/
  // og:url ที่ออกไปจะได้เป็นสตริงเดียวกันเป๊ะทุกที่ ไม่ขึ้นกับว่าใครเขียน host
  // ด้วยสคริปต์ไหน — ถ้าเขียนเป็นอักษรไทยตรงนี้ ไฟล์ผลลัพธ์บางที่จะเป็น percent-
  // encoded UTF-8 และบางที่เป็น punycode ซึ่ง parser มองว่าเป็นคนละโฮสต์
  // ⚠️ ชื่อแบรนด์กับโดเมนรอบนี้ "ใกล้กัน" แต่ยังคนละค่าอยู่ดี (แบรนด์ไม่มีขีด
  // โดเมนมี) — label ใน wrangler.toml ต้องเป็น punycode label ทั้งก้อน ห้ามตัดที่ขีด
  // (ขีดใน xn---168-9gora7dtd1dwh เป็นส่วนของการเข้ารหัส ไม่ใช่ช่องว่างระหว่างคำ)
  // ถ้า operator ไม่ได้ระบุโดเมนมาในคำสั่ง ห้ามเดาจากชื่อแบรนด์เด็ดขาด
  // canonical, sitemap, robots.txt, อีเมลใน BRAND_ADDRESS และ JSON-LD ทุกตัว
  // อนุมานจากค่านี้ค่าเดียว ไม่มีไฟล์ไหนพิมพ์โดเมนซ้ำอีก
  site: "https://xn---168-9gora7dtd1dwh.com",
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
