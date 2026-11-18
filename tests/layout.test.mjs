import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
const read = (file) => readFileSync(new URL("../"+file, import.meta.url),"utf8");
test("only RULES.md is normative", () => {
  const root = readdirSync(new URL("../",import.meta.url));
  assert.equal(root.filter(f=>/^(rules|agents)(-.+)?\.md$/i.test(f)).length,1);
  assert.match(read("RULES.md"), /RULE 02/);
});
test("chat shell has real semantic regions and no fake conversation", () => {
  const html=read("index.html");
  for(const id of ["chatPanel","workPanel","composerDock","messageInput","sendButton","tabChat","tabWork","sidebar"])
    assert.match(html,new RegExp('id="'+id+'"'));
  assert.doesNotMatch(html,/onclick=|https?:\/\/|<script[^>]+src="https?:/);
});
test("CSS has one token owner and keyboard-bounded main", () => {
  const css=read("web/styles.css");
  for(const part of ["--app-height","--composer-radius","--header","--hit","--column","safe-area-inset-bottom","@media(max-width:760px)"])
    assert.ok(css.includes(part),part);
});
test("native Compose scaffolding uses same fixed layout intentions", () => {
  const kotlin=read("android/app/src/main/java/app/twentytwentyseven/chat/MainActivity.kt");
  for(const part of ["imePadding()","navigationBarsPadding()","ChatShell","ChatComposer","56.dp","Color(0xFF171717)"])
    assert.ok(kotlin.includes(part),part);
});

test("TypeScript output does not exclude source; Pages copies matching script path", () => {
  const config=JSON.parse(read("tsconfig.json"));
  const out=config.compilerOptions.outDir.replace(/^\.\//, "").replace(/\/$/,"");
  const input=config.compilerOptions.rootDir.replace(/^\.\//, "").replace(/\/$/,"");
  assert.ok(!input.startsWith(out+"/") && input!==out, "outDir must not encompass TypeScript source");
  const html=read("index.html");
  assert.ok(html.includes('src="./'+out+'/app.js?v=2027-UI-V02"'), "HTML references versioned compiler output");
  const workflow=read(".github/workflows/pages.yml");
  assert.ok(workflow.includes("cp -R "+out+" _site/web/"), "Pages packages the same compiler output");
});

test("V02 has a two-level composer and compact mobile header without losing utilities", () => {
  const html=read("index.html");
  const css=read("web/styles.css");
  const logic=read("web/src/app.ts");
  assert.match(html, /class="composer-actions"/);
  assert.ok(html.indexOf('id="messageInput"') < html.indexOf('class="composer-actions"'));
  for (const id of ["newChatTop","searchMobile","themeMobile"]) {
    assert.match(html, new RegExp('id="'+id+'"'));
    assert.match(logic, new RegExp('"'+id+'".*addEventListener'));
  }
  assert.match(css, /\.header-right #searchButton,\.header-right #themeButton\{display:none\}/);
  assert.match(css, /\.composer\-actions\{height:44px/);
  assert.match(css, /\.search-dialog\{[\s\S]*top:calc\(var\(--app-top\)/);
});

test("preview identifies UI version and busts stale stylesheet and script assets", () => {
  const html=read("index.html");
  assert.match(html,/data-ui-version="2027-UI-V02"/);
  assert.match(html,/styles\.css\?v=2027-UI-V02/);
  assert.match(html,/dist\/app\.js\?v=2027-UI-V02/);
});
