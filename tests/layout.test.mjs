import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
const read = (file) => readFileSync(new URL("../"+file, import.meta.url),"utf8");

test("V08 retains one interactive ChatGPT-like document and shared CSS",()=>{
  const html=read("index.html");
  assert.match(html,/data-ui-version="2027-UI-V08"/);
  assert.match(html,/<h1>Chỉnh ngay trên một văn bản mẫu<\/h1>/);
  for(const id of ["document","controls","components","overlays","demoCanvas","fontSelect","sizeRange","sizeOutput","weightOutput","leadingRange","trackingRange","cssPreview","resetButton","copyButton"])
    assert.ok(html.includes('id="'+id+'"'),id);
  for(const block of ["title","body","section","description","list","table","number","money","note","caption"])
    assert.ok(html.includes('data-block="'+block+'"'),block);
  assert.ok(html.includes("./web/styles.css?v=2027-UI-V08"));
  assert.ok(html.includes("./web/dist/app.js?v=2027-UI-V08"));
  assert.doesNotMatch(html,/<script[^>]+src="https?:\/\//);
});

test("V08 retains working controls for tables, icons, numeric input, search, chat, menu and popup",()=>{
  const html=read("index.html"),ts=read("web/src/app.ts");
  for(const id of ["quantityInput","qtyMinus","qtyPlus","searchInput","searchResults","chatDemoForm","chatInput","menuButton","sampleMenu","demoDialog","openPopupButton","dialogConfirmButton"])
    assert.ok(html.includes('id="'+id+'"'),id);
  for(const cssClass of ["studio-data-table","studio-icon-button square","studio-icon-button round","studio-action-primary","studio-action-secondary"])
    assert.ok(html.includes(cssClass),cssClass);
  for(const method of ["setQty","setMenu","showModal","dialog.close","get<HTMLFormElement>(\"chatDemoForm\")","get<HTMLInputElement>(\"searchInput\")"])
    assert.ok(ts.includes(method),method);
  for(const button of ["boldButton","italicButton","underlineButton","surfaceButton","selectAllButton"])
    assert.ok(ts.includes(button),button);
  assert.doesNotMatch(ts,/\bfetch\s*\(|\bWebSocket\s*\(|\bXMLHttpRequest\b|supabase|Authorization:/i);
});

test("V08 colors and fonts still reuse the central semantic token module",()=>{
  const html=read("index.html"),ts=read("web/src/app.ts"),css=read("web/styles.css");
  for(const palette of ["white","warm","mist","dark"])assert.ok(html.includes('data-palette="'+palette+'"'));
  for(const font of ["system","arial","serif","mono"])assert.ok(html.includes('<option value="'+font+'">'));
  for(const weight of ["400","500","600","700"])assert.ok(html.includes('data-weight="'+weight+'"'));
  for(const device of ["desktop","mobile"])assert.ok(html.includes('data-viewport="'+device+'"'));
  for(const marker of ["PALETTES","FONTS","applyDesignTokens","auditPalette","exportCss","readSavedSettings","saveSettings"])
    assert.ok(ts.includes(marker),marker);
  for(const token of ["--ui-font","--ui-bg","--ui-surface","--ui-text","--ui-text-muted","--ui-border"])
    assert.ok(css.includes(token),token);
  assert.ok(css.includes(".studio-document[data-viewport=mobile]"));
  assert.ok(css.includes(".studio-component-grid"));
  assert.ok(css.includes(".studio-dialog::backdrop"));
  assert.ok(css.includes(".studio-pop-menu"));
  assert.ok(css.includes(".studio-chat-compose"));
  assert.match(css,/@media\(max-width:760px\)/);
});

test("Pages still builds the exact versioned assets shipped in HTML",()=>{
  const html=read("index.html");
  const config=JSON.parse(read("tsconfig.json"));
  const out=config.compilerOptions.outDir.replace(/^\.\//,"").replace(/\/$/,"");
  assert.ok(html.includes("web/styles.css?v=2027-UI-V08"));
  assert.ok(html.includes(out+"/app.js?v=2027-UI-V08"));
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

test("V06 preserves links to all three V04 interactive frames",()=>{
  const index=read("index.html");
  const flows=read("flows.html");
  assert.match(index,/<h1>Chỉnh ngay trên một văn bản mẫu<\/h1>/);
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

test("V08 keeps the library font/color and three-flow screens on one CSS file",()=>{
  const index=read("index.html"),flows=read("flows.html"),css=read("web/styles.css");
  assert.ok(index.includes('href="./flows.html"'));
  assert.ok(flows.includes('./web/styles.css?v=2027-UI-V04'));
  assert.ok(index.includes('./web/styles.css?v=2027-UI-V08'));
  assert.equal((index.match(/<link rel="stylesheet"/g)||[]).length,1);
  assert.equal((flows.match(/<link rel="stylesheet"/g)||[]).length,1);
  assert.ok(css.includes(".flow-app-shell"));
  assert.ok(css.includes(".studio-document"));
  assert.ok(css.includes(".studio-dialog"));
});

test("V07 presents six table variations with distinct borders and density",()=>{
  const html=read("index.html"),css=read("web/styles.css"),app=read("web/src/app.ts");
  const types=["table-border","table-lines","table-clean","table-zebra","table-compact","table-stacked"];
  for(const name of types){
    assert.ok(html.includes('data-variant-select="'+name+'"'),name);
    assert.ok(css.includes("."+name),name);
  }
  assert.equal((html.match(/data-variant-select=/g)||[]).length,6);
  assert.ok(app.includes("variantTableFeedback"));
  assert.ok(app.includes('setAttribute("aria-pressed",String(active))'));
});

test("V07 five independent quantity variants, six inputs, line clamps and compositional rows",()=>{
  const html=read("index.html"),css=read("web/styles.css"),app=read("web/src/app.ts");
  for(const name of ["joined","pill","separated","minimal","inline"])assert.ok(html.includes('data-qty-kind="'+name+'"'));
  assert.equal((html.match(/data-qty-kind=/g)||[]).length,5);
  for(const input of ["input-square","input-rounded","input-pill","input-underline","input-filled","input-variant-shell"])
    assert.ok(html.includes(input),input);
  for(const line of [1,2,3,4])assert.ok(html.includes('data-lines="'+line+'"'));
  assert.equal((html.match(/data-expand-lines/g)||[]).length,4);
  assert.equal((html.match(/class="icon-layout-row"/g)||[]).length,4);
  assert.equal((html.match(/class="compound-row"/g)||[]).length,4);
  for(const rule of [".qty-joined",".qty-pill",".qty-separated",".qty-minimal",".qty-inline",
    ".input-square",".input-rounded",".input-pill",".input-underline",".input-filled",
    ".line-preview[data-lines=\"4\"]",".layout-main",".layout-trailing",".layout-amount"])assert.ok(css.includes(rule),rule);
  for(const action of ["normalizeQty","variantClearInput","data-expand-lines","data-layout-action"])
    assert.ok(app.includes(action),action);
  assert.doesNotMatch(app,/\bfetch\s*\(|\bWebSocket\s*\(|\bXMLHttpRequest\b|supabase|Authorization:/i);
});

test("V08 gives grouped quantity and text inputs a single outer focus ring",()=>{
  const css=read("web/styles.css");
  const html=read("index.html");
  assert.match(html,/data-ui-version="2027-UI-V08"/);
  for(const grouped of [".studio-qty",".qty-joined",".qty-pill",".qty-inline",".input-variant-shell",".studio-search-field"])
    assert.ok(css.includes(grouped),grouped);
  assert.ok(css.includes(":focus-within"));
  assert.ok(css.includes("border-color:var(--ui-focus-color,#597bda)"));
  assert.ok(css.includes("--ui-focus-color:#597bda"));
  assert.match(css,/\.qty-separated input:focus-visible,\.qty-minimal input:focus-visible/);
  assert.ok(css.includes(") input:focus,"));
  assert.ok(css.includes("outline:none;"));
  assert.ok(css.includes("box-shadow:none;"));
  assert.ok(css.includes("appearance:textfield;-webkit-appearance:textfield"));
});

test("R04 grounds three vendor reference captures in the one canonical RULES file",()=>{
  const rule=read("RULES.md"),comparison=read("references/CHATGPT_FACEBOOK_GEMINI_UI_COMPARISON_2026-11-22.md");
  assert.ok(rule.includes("## RULE 04"));
  assert.ok(rule.includes("UI-REF-01"));
  assert.ok(rule.includes("UI-REF-05"));
  assert.ok(rule.includes("ONE")===false || rule.includes("một `web/styles.css`"));
  for(const name of ["ChatGPT","Facebook","Gemini"]){
    assert.ok(rule.includes(name));
    assert.ok(comparison.includes(name));
  }
  for(const term of ["--fds-blue-60","#1877F2","--gem-sys-spacing--xs","--ssr-sidenav-open-width","--app-color-border-focus","--ui-bg","--ui-surface"]){
    assert.ok(comparison.includes(term),term);
  }
  assert.ok(comparison.includes("Facebook Reel"));
  assert.ok(comparison.includes("codex"));
  assert.ok(comparison.includes("Không copy"));
  assert.ok(read("README.md").includes("CHATGPT_FACEBOOK_GEMINI_UI_COMPARISON_2026-11-22.md"));
});
