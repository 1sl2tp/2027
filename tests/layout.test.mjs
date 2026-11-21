import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
const read = (file) => readFileSync(new URL("../"+file, import.meta.url),"utf8");

test("V03 starts as a reusable UI library typography page", () => {
  const html=read("index.html");
  assert.match(html,/data-ui-version="2027-UI-V03"/);
  assert.match(html,/<h1>Chữ & màu nền<\/h1>/);
  for (const section of ["colors","typography","preview"]) assert.match(html,new RegExp('id="'+section+'"'));
  for (const id of ["demoCanvas","sizeRange","leadingRange","weightOutput","copyButton","resetButton","sampleInput"])
    assert.match(html,new RegExp('id="'+id+'"'));
  assert.doesNotMatch(html,/<script[^>]+src="https?:\/\//);
});

test("palette, font, weight and viewport choices are explicit",()=>{
  const html=read("index.html");
  for(const palette of ["white","warm","mist","dark"])
    assert.match(html,new RegExp('data-palette="'+palette+'"'));
  for(const font of ["system","arial","serif","mono"])
    assert.match(html,new RegExp('data-font="'+font+'"'));
  for(const weight of ["400","500","600","700"])
    assert.match(html,new RegExp('data-weight="'+weight+'"'));
  for(const width of ["desktop","mobile"])
    assert.match(html,new RegExp('data-viewport="'+width+'"'));
});

test("responsive live preview is separated from the library interface",()=>{
  const css=read("web/styles.css");
  for(const token of ["--sample-font","--sample-base","--sample-bg","--sample-surface","--sample-ink","--sample-leading","--sample-weight"])
    assert.ok(css.includes(token),token);
  assert.match(css,/\.demo-canvas\[data-viewport=mobile\]/);
  assert.match(css,/@media\(max-width:760px\)/);
  assert.match(css,/input\[type=range\]/);
});

test("interactions remain local with no live chat, transaction or endpoint",()=>{
  const ts=read("web/src/app.ts");
  for(const marker of ["pickPalette","pickFont","cssText","sizeRange.addEventListener","leadingRange.addEventListener","copyButton","resetButton"])
    assert.ok(ts.includes(marker),marker);
  assert.doesNotMatch(ts,/\bfetch\s*\(|\bWebSocket\s*\(|\bXMLHttpRequest\b|supabase|Authorization:/i);
});

test("Pages builds the exact versioned assets shipped in HTML",()=>{
  const html=read("index.html");
  const config=JSON.parse(read("tsconfig.json"));
  const out=config.compilerOptions.outDir.replace(/^\.\//,"").replace(/\/$/,"");
  assert.ok(html.includes("web/styles.css?v=2027-UI-V03"));
  assert.ok(html.includes(out+"/app.js?v=2027-UI-V03"));
  const workflow=read(".github/workflows/pages.yml");
  assert.ok(workflow.includes("npm run verify"));
  assert.ok(workflow.includes("cp -R "+out+" _site/web/"));
});
