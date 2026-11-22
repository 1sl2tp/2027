import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const html = readFileSync(new URL("../github-sources.html", import.meta.url), "utf8");
const css = readFileSync(new URL("../web/styles.css", import.meta.url), "utf8");
const index = readFileSync(new URL("../index.html", import.meta.url), "utf8");

test("2027 library links to source lab", () => {
  assert.match(index, /href="\.\/github-sources\.html"/);
  assert.match(html, /<title>2027 · Nguồn GitHub/);
});

test("source lab audits all eight sources without runtime dependency", () => {
  for (const repo of ["openai/apps-sdk-ui", "assistant-ui/assistant-ui", "vercel/ai-elements",
    "radix-ui/primitives", "floating-ui/floating-ui", "TanStack/virtual",
    "lucide-icons/lucide", "Andarist/react-textarea-autosize"]) {
    assert.ok(html.includes("https://github.com/" + repo), "missing " + repo);
  }
  assert.doesNotMatch(html, /<script[^>]+src="https?:/i);
});

test("source lab form is local-only and composer owns the border", () => {
  assert.match(html, /id="sourceComposer"/);
  assert.match(html, /event\.preventDefault\(\)/);
  assert.match(html, /document\.createElement\('p'\)/);
  assert.match(html, /id="sourceKeyboardButton"/);
  assert.match(html, /id="sourceDialog"/);
  assert.match(css, /\.source-compose-label textarea\{[^}]*border:0!important/s);
  assert.match(css, /\.source-thread\{[^}]*overflow-y:auto/s);
  assert.match(css, /\.source-preview\.is-keyboard \.source-fake-keyboard/);
});

test("source lab supports 1 to 4 media cells and accessible dialog", () => {
  for (let n=1;n<=4;n++) assert.match(html,new RegExp('<option value="'+n+'"'));
  assert.match(html, /dialog id="sourceDialog"/);
  assert.match(html, /aria-labelledby="sourceDialogTitle"/);
  assert.match(css, /\.source-data-table :is\(th,td\)/);
});
