import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
const read = (file) => readFileSync(new URL("../"+file, import.meta.url),"utf8");

test("V05 completes the UI library typography foundation", () => {
  const html=read("index.html");
  assert.match(html,/data-ui-version="2027-UI-V05"/);
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
  for(const style of ["normal","italic"]) assert.match(html,new RegExp('data-text-style="'+style+'"'));
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
  for(const marker of ["applyDesignTokens","auditPalette","exportCss","sizeRange.addEventListener","leadingRange.addEventListener","trackingRange.addEventListener","copyButton","resetButton"])
    assert.ok(ts.includes(marker),marker);
  assert.doesNotMatch(ts,/\bfetch\s*\(|\bWebSocket\s*\(|\bXMLHttpRequest\b|supabase|Authorization:/i);
});

test("Pages builds the exact versioned assets shipped in HTML",()=>{
  const html=read("index.html");
  const config=JSON.parse(read("tsconfig.json"));
  const out=config.compilerOptions.outDir.replace(/^\.\//,"").replace(/\/$/,"");
  assert.ok(html.includes("web/styles.css?v=2027-UI-V05"));
  assert.ok(html.includes(out+"/app.js?v=2027-UI-V05"));
  const workflow=read(".github/workflows/pages.yml");
  assert.ok(workflow.includes("npm run verify"));
  assert.ok(workflow.includes("cp -R "+out+" _site/web/"));
});

test("R03 keeps attributed UX principles and accessibility checks in one rule file",()=>{
  const rules=read("RULES.md");
  assert.match(rules,/RULE 03 — NGUYÊN TẮC UX\/UI/);
  for(const expert of ["Jakob Nielsen","Don Norman","Steve Krug","Luke Wroblewski","Brad Frost"]){
    assert.ok(rules.includes(expert),expert);
  }
  for(let i=1;i<=14;i++) assert.ok(rules.includes("UX-"+String(i).padStart(2,"0")),String(i));
  for(const source of ["nngroup.com/articles/ten-usability-heuristics","jnd.org/","sensible.com/dont-make-me-think","lukew.com/mobilefirst","atomicdesign.bradfrost.com","w3.org/TR/WCAG22","developer.apple.com/design/human-interface-guidelines"]){
    assert.ok(rules.includes(source),source);
  }
  assert.match(rules,/44×44 pt/);
  assert.match(rules,/24×24 CSS px/);
  assert.match(rules,/4\.5:1/);
  assert.match(rules,/không tự động cấp phép sửa CHAT production/);
});

test("V04 keeps original typography library and links three interactive frames",()=>{
  const index=read("index.html");
  const flows=read("flows.html");
  assert.match(index,/<h1>Chữ & màu nền<\/h1>/);
  assert.ok(index.includes('href="./flows.html#chat/contacts"'));
  assert.ok(index.includes('href="./flows.html#work/summary"'));
  assert.ok(index.includes('href="./flows.html#sales/products"'));
  assert.match(flows,/data-ui-version="2027-UI-V04"/);
  for(const module of ["chat","work","sales"]) assert.ok(flows.includes('data-module="'+module+'"'));
  for(const id of ["flowApp","flowStatus"]) assert.ok(flows.includes('id="'+id+'"'));
  assert.ok(flows.includes("./web/styles.css?v=2027-UI-V04"));
  assert.ok(flows.includes("./web/dist/flows.js?v=2027-UI-V04"));
  assert.doesNotMatch(flows,/<script[^>]+src="https?:\/\//);
});

test("V04 one CSS owner and linked data model for Chat Work Sales",()=>{
  const css=read("web/styles.css");
  const flow=read("web/src/flows.ts");
  for(const token of ["--ui-font","--ui-bg","--ui-soft","--ui-border","--ui-radius","--ui-hit"]){
    assert.ok(css.includes(token),token);
  }
  for(const component of [".flow-app-shell",".flow-app-head",".flow-app-side",".flow-app-content",".flow-compose",".flow-order-card",".flow-receipt",".flow-stat"]){
    assert.ok(css.includes(component),component);
  }
  for(const feature of ["renderAuth","renderChat","renderPayments","renderSummary","renderInvoice","renderDebts","renderQuotes","renderProducts","renderDrafts","renderDelivered","renderSettings","shareInvoice","shareQuote","makeDraft","addProduct","deliveredTotal","paidTotal","debt"]){
    assert.ok(flow.includes(feature),feature);
  }
  assert.match(flow,/newState=\(\):UiState/);
  assert.match(flow,/state\.orders\.push\(draft\)/);
  assert.match(flow,/state\.payments\.push/);
  assert.match(flow,/canvas\.toDataURL\("image\/png"\)/);
  assert.doesNotMatch(flow,/\bfetch\s*\(|\bWebSocket\s*\(|\bXMLHttpRequest\b|supabase|Authorization:/i);
});

test("V04 Pages bundles every frame with one stylesheet",()=>{
  const yaml=read(".github/workflows/pages.yml");
  assert.ok(yaml.includes('"flows.html"'));
  assert.ok(yaml.includes("cp index.html flows.html _site/"));
  assert.ok(yaml.includes("cp web/styles.css _site/web/"));
  assert.ok(yaml.includes("cp -R web/dist _site/web/"));
  const links=[read("index.html"),read("flows.html")];
  for(const doc of links)assert.ok(doc.includes("./web/styles.css?v="));
  assert.equal(links.reduce((n,doc)=>n+(doc.match(/<link rel="stylesheet"/g)||[]).length,0),2);
});

test("V05 one source of semantic tokens, contrast math and safe persistence",async()=>{
  const ts=await import("typescript");
  const source=read("web/src/design.ts");
  const js=ts.default.transpileModule(source,{compilerOptions:{module:ts.default.ModuleKind.ES2022,target:ts.default.ScriptTarget.ES2022}}).outputText;
  const design=await import("data:text/javascript;base64,"+Buffer.from(js).toString("base64"));
  assert.deepEqual(Object.keys(design.PALETTES),["white","warm","mist","dark"]);
  assert.deepEqual(Object.keys(design.FONTS),["system","arial","serif","mono"]);
  assert.equal(design.contrastRatio("#000000","#FFFFFF").toFixed(2),"21.00");
  assert.equal(design.contrastRatio("#FFFFFF","#FFFFFF").toFixed(2),"1.00");
  for(const [key,palette] of Object.entries(design.PALETTES)){
    const result=design.auditPalette(key);
    assert.equal(result.length,4,key);
    for(const item of result) assert.ok(item.passesAA && item.ratio>=4.5,key+" "+item.label+" "+item.ratio);
    const css=design.exportCss({...design.DEFAULT_SETTINGS,palette:key});
    for(const color of [palette.background,palette.surface,palette.ink,palette.muted,palette.border])
      assert.ok(css.includes(color),key+" "+color);
  }
  const normalized=design.normalizeSettings({palette:"invalid",font:"invalid",size:-200,weight:888,tracking:22,leading:0,textStyle:"oblique"});
  assert.equal(normalized.palette,"white");
  assert.equal(normalized.font,"system");
  assert.equal(normalized.size,13);
  assert.equal(normalized.weight,400);
  assert.equal(normalized.tracking,0.08);
  assert.equal(normalized.leading,1.2);
  assert.equal(normalized.textStyle,"normal");
  assert.ok(design.exportCss(design.DEFAULT_SETTINGS).includes("--ui-font-style: normal;"));
});

test("V05 shared stylesheet renders all design roles and has narrow screen layouts",()=>{
  const html=read("index.html");
  const css=read("web/styles.css");
  for(const id of ["roleBackground","roleSurface","roleInk","roleMuted","roleBorder","paletteLabel"])
    assert.match(html,new RegExp('id="'+id+'"'));
  for(const varname of ["--ui-font","--ui-bg","--ui-surface","--ui-text","--ui-text-muted","--ui-border","--ui-font-size","--ui-font-style","--ui-letter-spacing"])
    assert.ok(css.includes(varname),varname);
  assert.match(css,/\.color-roles-grid/);
  assert.match(css,/\.contrast-grid/);
  assert.match(css,/@media\(max-width:420px\)/);
  assert.match(html,/WCAG 2\.2/);
  assert.match(html,/href="\.\/flows\.html"/);
});
