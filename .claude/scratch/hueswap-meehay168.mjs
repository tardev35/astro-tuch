// P1 shared-chrome hue swap — มีเฮ168 (2026-10-19).
// Mechanical, per-file, value-by-value. Comments/copy are rewritten by hand after.
import { readFileSync, writeFileSync } from "node:fs";

const RUAY = {
  "#039cfa": "#fb1b32",
  "#0494f5": "#f41332",
  "#c3ebfc": "#ff8f9c",
  "#04366b": "#5c0410",
  "#f9a826": "#fcd45c",
  "#704504": "#6b4a08",
  "#e3f2fc": "#fdeaec",
  "#0b2d52": "#2b0711",
  "#071e38": "#1a040a",
  "#030f1d": "#0c0205",
  "#031320": "#1b0308",
  "rgba(3,156,250": "rgba(251,27,50",
  "rgba(249,168,38": "rgba(252,212,92",
  "rgba(195,235,252": "rgba(255,143,156",
  "rgba(4,54,107": "rgba(92,4,16",
  "rgba(227,242,252": "rgba(253,234,236",
  "rgba(11,45,82": "rgba(43,7,17",
  "rgba(3,15,29": "rgba(12,2,5",
};

const SABUY = {
  "#2f9ff5": "#fb1b32",
  "#a8dcff": "#ff8f9c",
  "#e8f4ff": "#ffe3e6",
  "#ffc82e": "#fcd45c",
  "#ffefbb": "#ffeec0",
  "#5c4a16": "#6b4a08",
  "#0b3f78": "#5c0410",
  "#0e2238": "#2b0711",
  "#04121f": "#1b0308",
  "#040d16": "#0c0205",
  "rgba(47,159,245": "rgba(251,27,50",
  "rgba(168,220,255": "rgba(255,143,156",
  "rgba(255,200,46": "rgba(252,212,92",
};

const MEECHOKE = {
  "#f5469f": "#fb1b32",
  "#ff8dc6": "#ff8f9c",
  "#fcd434": "#fcd45c",
  "#ffeaa0": "#ffeec0",
  "#8c0f52": "#5c0410",
  "#7a5508": "#6b4a08",
  "#f6e4ee": "#fdeaec",
  "#24101c": "#2b0711",
  "#160a12": "#1a040a",
  "#0b0509": "#0c0205",
  "#1a0612": "#1b0308",
  "rgba(245,70,159": "rgba(251,27,50",
  "rgba(252,212,52": "rgba(252,212,92",
};

const NINJA = {
  "#32bcfb": "#fb1b32",
  "#a9e9ff": "#ff8f9c",
  "#dceefc": "#fdeaec",
  "#fef54b": "#fcd45c",
  "#030e16": "#0c0205",
  "rgba(50,188,251": "rgba(251,27,50",
  "rgba(4,16,25": "rgba(12,2,5",
};

const JOBS = [
  ["src/components/ContentBox.astro", RUAY],
  ["src/components/ContentBoxTwo.astro", RUAY],
  ["src/components/Navfoot.astro", RUAY],
  ["src/components/CtaRedirect.astro", RUAY],
  ["src/components/NavbarStyle9.astro", SABUY],
  ["src/components/FooterStyle3.astro", MEECHOKE],
  ["src/components/Announcement5.astro", NINJA],
];

for (const [file, map] of JOBS) {
  let src = readFileSync(file, "utf8");
  const hits = [];
  for (const [from, to] of Object.entries(map)) {
    const re = new RegExp(from.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "gi");
    const n = (src.match(re) || []).length;
    if (n) hits.push(`${from}->${to} x${n}`);
    src = src.replace(re, to);
  }
  writeFileSync(file, src, "utf8");
  console.log(`${file}\n  ${hits.join("\n  ") || "(no hits)"}`);
}
