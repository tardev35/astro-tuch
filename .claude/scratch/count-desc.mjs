import fs from "node:fs";
import path from "node:path";

const files = [];
(function walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p);
    else if (e.name.endsWith(".html")) files.push(p);
  }
})("dist");

for (const f of files.sort()) {
  const html = fs.readFileSync(f, "utf8");
  const m = html.match(/<meta name="description" content="([^"]*)"/);
  if (!m) continue;
  const desc = m[1].replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#39;/g, "'");
  const n = [...desc].length;
  const flag = n > 200 ? "  <-- OVER 200 (build gate)" : n < 150 ? "  <-- under 150" : "";
  console.log(String(n).padStart(4) + "  " + f.split(path.sep).join("/") + flag);
}
