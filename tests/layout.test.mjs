import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
const read = (file) => readFileSync(new URL("../"+file, import.meta.url),"utf8");

test("V08 retains one interactive ChatGPT-like document and shared CSS",()=>{
  const html=read("index.html");
  assert.match(html,/data-ui-version="2027-UI-V19"/);
  assert.match(html,/<h1>Chỉnh ngay trên một văn bản mẫu<\/h1>/);
  for(const id of ["document","controls","components","overlays","demoCanvas","fontSelect","sizeRange","sizeOutput","weightOutput","leadingRange","trackingRange","cssPreview","resetButton","copyButton"])
    assert.ok(html.includes('id="'+id+'"'),id);
  for(const block of ["title","body","section","description","list","table","number","money","note","caption"])
    assert.ok(html.includes('data-block="'+block+'"'),block);
  assert.ok(html.includes("./web/styles.css?v=2027-UI-V19"));
  assert.ok(html.includes("./web/dist/app.js?v=2027-UI-V19"));
  assert.doesNotMatch(html,/<script[^>]+src="https?:\/\//);
});

test("V08 retains working controls for tables, icons, numeric input, search, chat, menu and popup",()=>{
  const html=read("index.html"),ts=read("web/src/app.ts");
  for(const id of ["quantityInput","qtyMinus","qtyPlus","searchInput","searchResults","chatDemoForm","chatInput","menuButton","sampleMenu","demoDialog","openPopupButton","dialogConfirmButton"])
    assert.ok(html.includes('id="'+id+'"'),id);
  for(const cssClass of ["studio-data-table","ui-button--icon ui-button--square","ui-button--icon ui-button--round","ui-button--primary","ui-button--secondary"])
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
  assert.ok(html.includes("web/styles.css?v=2027-UI-V19"));
  assert.ok(html.includes(out+"/app.js?v=2027-UI-V19"));
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
  assert.ok(yaml.includes("cp index.html flows.html base.html _site/"));
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
  assert.ok(index.includes('./web/styles.css?v=2027-UI-V19'));
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
  assert.match(html,/data-ui-version="2027-UI-V19"/);
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
  assert.ok(rule.includes("một `web/styles.css`"));
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

test("V09 preserves V08 as a pinned original and names three Drive references",()=>{
  const manifest=read("references/ORIGINAL_UI_SOURCES_AND_BASELINE_2026-11-22.md");
  const rules=read("RULES.md"),readme=read("README.md");
  assert.ok(manifest.includes("7e10663b72e85c63621462048a262897f36c3182"));
  assert.ok(manifest.includes("archive/ui-v08-original-before-foundation-20261122"));
  assert.ok(manifest.includes("1uPNFbeA_lbJjIEZW0O__g4lTWWXJEVSj"));
  for(const id of ["14RXspORGw1X8MJV3nxA850ahdDAMa9nW","1A2A86yBaz42Gv1fZP7b5aHmObIER1qXe","1KSPGdSqEcxFcyR_N6fdVjoGxyhhxKwJV"])
    assert.ok(manifest.includes(id),id);
  assert.ok(rules.includes("## RULE 05"));
  assert.ok(rules.includes("Bốn hướng, một DOM"));
  assert.ok(readme.includes("base.html"));
  assert.ok(readme.includes("ORIGINAL_UI_SOURCES_AND_BASELINE_2026-11-22.md"));
});

test("V09 base template ships four source-inspired modes on one CSS",()=>{
  const html=read("base.html"),css=read("web/styles.css"),ts=read("web/src/base.ts");
  assert.ok(html.includes('data-ui-version="2027-BASE-V09"'));
  assert.ok(html.includes("./web/styles.css?v=2027-BASE-V09"));
  assert.ok(html.includes("./web/dist/base.js?v=2027-BASE-V09"));
  assert.equal((html.match(/<link rel="stylesheet"/g)||[]).length,1);
  assert.doesNotMatch(html,/<script[^>]+src="https?:\/\//);
  for(const preset of ["original","chatgpt","facebook","gemini"]){
    assert.ok(html.includes('data-preset="'+preset+'"'),preset);
    assert.ok(css.includes(".base-app[data-preset="+preset+"]") || (preset==="original" && css.includes(".base-app{")),preset);
    assert.ok(ts.includes(preset),preset);
  }
  for(const view of ["chat","work","sales"]){
    assert.ok(html.includes('data-panel="'+view+'"'),view);
    assert.ok(html.includes('data-view="'+view+'"'),view);
  }
  for(const device of ["desktop","phone"])assert.ok(html.includes('data-device="'+device+'"'));
  for(const id of ["basePreview","baseTokenOutput","baseReset","baseCopy","baseDialog","baseComposeForm","baseQty","baseSearch","baseMenu","baseFeedback"])
    assert.ok(html.includes('id="'+id+'"'),id);
  for(const component of [".base-rail",".base-side",".base-thread",".base-composer",".base-stepper",".base-dialog",".base-data-table"])
    assert.ok(css.includes(component),component);
  for(const functionName of ["cssText","changeQuantity","closeMenu","render"])
    assert.ok(ts.includes(functionName),functionName);
  assert.doesNotMatch(ts,/\bfetch\s*\(|\bWebSocket\s*\(|\bXMLHttpRequest\b|supabase|Authorization:/i);
});

test("V09 Pages bundles base.html and TS output without replacing original pages",()=>{
  const index=read("index.html"),flows=read("flows.html"),base=read("base.html");
  assert.ok(index.includes('data-ui-version="2027-UI-V19"'));
  assert.ok(flows.includes('data-ui-version="2027-UI-V04"'));
  assert.ok(index.includes('href="./base.html"'));
  assert.ok(base.includes("Mẫu gốc 2027"));
  const yaml=read(".github/workflows/pages.yml");
  assert.ok(yaml.includes('"base.html"'));
  assert.ok(yaml.includes("cp index.html flows.html base.html _site/"));
  assert.ok(yaml.includes("cp web/styles.css _site/web/"));
  assert.ok(yaml.includes("cp -R web/dist _site/web/"));
  assert.ok(yaml.includes("npm run verify"));
});

test("V16 categorizes 23 component sets into nine clear groups",()=>{
  const html=read("index.html");
  const css=read("web/styles.css");
  const expected={patterns:1,typography:1,tables:2,invoices:1,quantity:2,inputs:4,actions:6,layouts:4,overlays:2};
  assert.match(html,/data-ui-version="2027-UI-V19"/);
  assert.ok(html.includes("Chọn loại mẫu cần xem"));
  assert.ok(html.includes('id="componentTheme"'));
  for(const [category,count] of Object.entries(expected)){
    assert.ok(html.includes('data-gallery-category="'+category+'"'),category);
    assert.ok(html.includes('data-gallery-filter="'+category+'"'),category);
    assert.ok(html.includes('id="sample-'+category+'"'),category);
    assert.ok(html.includes('href="#sample-'+category+'"'),category);
    const token='data-gallery-category="'+category+'"';
    const a=html.indexOf(token),z=html.indexOf('data-gallery-category="',a+token.length);
    const slice=html.slice(a,z<0?html.indexOf('  </div>\n  <div class="gallery-empty"',a):z);
    assert.equal((slice.match(/class="studio-component-card/g)||[]).length,count,category);
  }
  assert.equal((html.match(/class="studio-component-card/g)||[]).length,23);
  assert.ok(css.includes(".gallery-filter-nav"));
  assert.ok(css.includes(".gallery-category-heading"));
  assert.ok(css.includes(".gallery-browser"));
  assert.ok(css.includes("@media(max-width:760px)"));
});

test("V12 searches and filters the same DOM without altering component event bindings",()=>{
 const html=read("index.html"),ts=read("web/src/app.ts"),css=read("web/styles.css");
 for(const id of ["gallerySearch","galleryClearSearch","galleryCount","galleryEmpty","galleryShowAll"])
   assert.ok(html.includes('id="'+id+'"'),id);
 for(const token of ["updateGallery","chooseGallery","galleryCategoryFromHash","activeGalleryCategory","data-gallery-category","aria-pressed","normalizeGalleryText"])
   assert.ok(ts.includes(token),token);
 assert.ok(ts.includes("replace(/\\p{M}/gu"));
 assert.ok(ts.includes("card.hidden=!matches"));
 assert.ok(ts.includes("section.hidden=visible===0"));
 assert.ok(css.includes(".gallery-filter-nav button.selected"));
 assert.ok(css.includes(".gallery-search-box:focus-within"));
 for(const original of ["normalizeQty","dialog.showModal","setMenu","renderBlocks","variantClearInput","data-expand-lines"])
   assert.ok(ts.includes(original),original);
 assert.ok(html.includes('href="./base.html"'));
 assert.ok(html.includes('href="./flows.html"'));
 assert.doesNotMatch(ts,/\bfetch\s*\(|\bWebSocket\s*\(|\bXMLHttpRequest\b|supabase|Authorization:/i);
});

test("V12 keeps four distinct composers inside the existing input gallery",()=>{
 const html=read("index.html"),css=read("web/styles.css");
 assert.match(html,/data-ui-version="2027-UI-V19"/);
 const inputs=html.slice(html.indexOf('id="sample-inputs"'),html.indexOf('id="sample-actions"'));
 assert.ok(inputs.includes('id="composerGalleryTitle"'));
 assert.ok(inputs.includes("Bốn trạng thái ô gõ chat"));
 assert.ok(inputs.includes("4 bộ mẫu"));
 assert.ok(html.includes('data-gallery-filter="inputs"'));
 assert.ok(html.includes('href="#sample-inputs"'));
 for(const kind of ["compact","single","multi","sending"]){
   assert.ok(inputs.includes('data-composer-sample="'+kind+'"'),kind);
   assert.ok(inputs.includes('id="composerText-'+kind+'"'),kind);
 }
 assert.equal((inputs.match(/data-composer-sample="/g)||[]).length,4);
 for(const hook of ["data-composer-form","data-composer-text","data-composer-add","data-composer-file",
   "data-composer-previews","data-composer-send","data-composer-mic","data-composer-mode",
   "data-composer-status","data-composer-log"]){
   assert.equal((inputs.match(new RegExp(hook+"(?=[\\s>])","g"))||[]).length,4,hook);
 }
 assert.ok(inputs.includes("Ảnh mẫu 1"));
 assert.ok(inputs.includes("Ảnh mẫu 3"));
 for(const selector of [".composer-variant-grid",".composer-variant--compact",".composer-attachment-list",
     ".composer-preview",".composer-surface:focus-within",".composer-local-feedback",".ui-button--send[data-composer-busy=true]"])
   assert.ok(css.includes(selector),selector);
 assert.ok(css.includes("@media(max-width:760px)"));
});

test("V12 composer demos use browser-only image previews and local simulated send",()=>{
 const app=read("web/src/app.ts"),source=read("web/src/composer-gallery.ts"),html=read("index.html");
 assert.ok(app.includes('from "./composer-gallery.js"'));
 assert.ok(app.includes("initComposerGallery();"));
 for(const marker of ["URL.createObjectURL","URL.revokeObjectURL","accept="]){
   if(marker==="accept=")assert.ok(html.includes('accept="image/*"'));
   else assert.ok(source.includes(marker),marker);
 }
 for(const marker of ["data-composer-remove-demo","data-composer-remove-file","filePicker.addEventListener(\"change\"",
  "text.addEventListener(\"input\"","mode.addEventListener(\"click\"","mic.addEventListener(\"click\"",
  "form.addEventListener(\"submit\"","window.setTimeout","pagehide","maximum=kind===\"single\"?1:4"]){
   assert.ok(source.includes(marker),marker);
 }
 assert.ok(source.includes("Không gửi tin nhắn hoặc ảnh thật")||
           source.includes("không gửi tin nhắn hoặc ảnh thật"));
 assert.doesNotMatch(source,/\bfetch\s*\(|\bWebSocket\s*\(|\bXMLHttpRequest\b|supabase|Authorization:|getUserMedia\s*\(/i);
 const workflow=read(".github/workflows/pages.yml");
 assert.ok(workflow.includes("cp -R web/dist _site/web/"));
 assert.equal((html.match(/<link rel="stylesheet"/g)||[]).length,1);
});

test("V12 puts the canonical composer controls inside Buttons & Icons category",()=>{
 const html=read("index.html"),css=read("web/styles.css"),app=read("web/src/app.ts");
 const actions=html.slice(html.indexOf('id="sample-actions"'),html.indexOf('id="sample-layouts"'));
 assert.ok(actions.includes('data-ui-library="buttons-icons"'));
 assert.ok(actions.includes('id="sharedActionsTitle"'));
 assert.ok(actions.includes("6 bộ mẫu"));
 assert.ok(html.includes('data-gallery-filter="actions"'));
 for(const kind of ["plus","mode","mic","send"])assert.ok(actions.includes('data-ui-control-preview="'+kind+'"'),kind);
 for(const shared of ["ui-button--icon","ui-button--mode","ui-button--send","ui-icon--plus","ui-icon--mic","ui-icon--send","ui-icon--chevron"])
   assert.ok(actions.includes(shared),shared);
 for(const symbol of ["ui-icon-plus","ui-icon-chevron","ui-icon-mic","ui-icon-send-up","ui-icon-voice","ui-icon-stop"])
   assert.ok(read("web/icons.svg").includes('id="'+symbol+'"'),symbol);
 for(const token of ["--ui-control-hit:44px","--ui-control-plus:22px","--ui-control-mic:19px",
  "--ui-control-chevron:13px","--ui-control-send-glyph:20px","--ui-control-send-disc:36px",
  "--ui-control-label:14px","--ui-control-gap:2px"]){
   assert.ok(css.includes(token),token);
 }
 assert.ok(css.includes(".ui-button--icon"));
 assert.ok(css.includes(".ui-button--mode"));
 assert.ok(css.includes(".ui-button--send"));
 assert.ok(css.includes(".ui-icon"));
 assert.ok(app.includes("[data-ui-control-preview]"));
 assert.ok(app.includes("sharedActionFeedback"));
});

test("V12 all chat input variants consume canonical action/icon markup and preserve SVG across state changes",()=>{
 const html=read("index.html"),css=read("web/styles.css"),ts=read("web/src/composer-gallery.ts");
 const input=html.slice(html.indexOf('id="sample-inputs"'),html.indexOf('id="sample-actions"'));
 for(const fragment of [
  'class="ui-button ui-button--icon composer-add"',
  'class="ui-button ui-button--mode composer-mode"',
  'class="ui-button ui-button--icon composer-mic"',
  'class="ui-button ui-button--send composer-send"',
  'data-composer-send-icon href="./web/icons.svg#ui-icon-send-up"',
  'data-composer-mode-label>Cao'
 ])assert.equal((input.split(fragment).length-1),4,fragment);
 assert.ok(ts.includes('querySelector<SVGUseElement>("[data-composer-send-icon]")'));
 assert.ok(ts.includes('sendIcon.setAttribute("href"'));
 assert.ok(ts.includes('"./web/icons.svg#ui-icon-voice"'));
 assert.ok(ts.includes('"./web/icons.svg#ui-icon-send-up"'));
 assert.ok(ts.includes('"./web/icons.svg#ui-icon-stop"'));
 assert.ok(ts.includes("modeLabel.textContent"));
 assert.ok(!ts.includes("sendSymbol.textContent"));
 // No separate sizes for plus/mic/send/mode inside the consumer's CSS.
 const consumerCss=css.slice(css.indexOf("/* The Chat Composer is a consumer"));
 assert.doesNotMatch(consumerCss,/\.composer-icon-button\s*\{/);
 assert.doesNotMatch(consumerCss,/\.composer-send\s*\{/);
 assert.doesNotMatch(consumerCss,/\.composer-mode\s*\{/);
 assert.ok(consumerCss.includes("grid-template-columns:var(--ui-control-hit)"));
 assert.equal((html.match(/<link rel="stylesheet"/g)||[]).length,1);
});

test("R06 classifies future components under the shared Button and Icon library",()=>{
 const rules=read("RULES.md"),catalog=read("references/UI_COMPONENT_CATALOG_2026-11-22.md");
 const svg=read("web/icons.svg"),workflow=read(".github/workflows/pages.yml");
 assert.ok(rules.includes("## RULE 06"));
 assert.ok(rules.includes("2027-R06"));
 assert.ok(rules.includes("web/icons.svg"));
 assert.ok(rules.includes("index.html#sample-actions"));
 assert.ok(catalog.includes("Cấp | Vai trò"));
 for(const group of ["Chữ","Bảng","Số lượng","Ô nhập","Nút","Hàng","Menu"])
   assert.ok(catalog.toLocaleLowerCase("vi").includes(group.toLocaleLowerCase("vi")),group);
 for(const item of ["token","Icon","Button","Mẫu ghép","Luồng"])
   assert.ok(catalog.toLowerCase().includes(item.toLowerCase()),item);
 for(const icon of ["ui-icon-plus","ui-icon-chevron","ui-icon-mic","ui-icon-send-up","ui-icon-voice","ui-icon-stop","ui-icon-ellipsis"])
   assert.ok(svg.includes('id="'+icon+'"'),icon);
 assert.ok(workflow.includes("cp web/icons.svg _site/web/"));
 assert.ok(read("README.md").includes("UI_COMPONENT_CATALOG_2026-11-22.md"));
});

test("V12 library all uses the single external SVG registry and no old button classes",()=>{
 const html=read("index.html"),ts=read("web/src/composer-gallery.ts"),css=read("web/styles.css");
 const actions=html.slice(html.indexOf('id="sample-actions"'),html.indexOf('id="sample-layouts"'));
 const inputs=html.slice(html.indexOf('id="sample-inputs"'),html.indexOf('id="sample-actions"'));
 for(const content of [actions,inputs]){
  assert.ok(content.includes("./web/icons.svg#ui-icon-plus"));
  assert.ok(content.includes("./web/icons.svg#ui-icon-mic"));
  assert.ok(content.includes("./web/icons.svg#ui-icon-send-up"));
 }
 assert.ok(!html.includes('class="studio-icon-button'));
 assert.ok(!html.includes('class="studio-action-'));
 assert.ok(!html.includes('class="ui-icon-sprite"'));
 assert.ok(ts.includes('sendIcon.setAttribute("href"'));
 assert.ok(css.includes(".ui-button--icon"));
 assert.ok(css.includes(".ui-button--send"));
 assert.ok(css.includes(".ui-icon--send"));
});

test("V13 catalogs subtle copy, share, download, loading and feedback buttons",()=>{
 const html=read("index.html"),css=read("web/styles.css"),svg=read("web/icons.svg");
 const actions=html.slice(html.indexOf('id="sample-actions"'),html.indexOf('id="sample-layouts"'));
 assert.ok(html.includes('data-ui-version="2027-UI-V19"'));
 assert.ok(actions.includes('data-ui-library="message-actions"'));
 assert.ok(actions.includes('id="messageActionsTitle"'));
 for(const action of ["copy","like","dislike","speak","share","more","download","load"])
   assert.ok(actions.includes('data-action-kind="'+action+'"'),action);
 for(const symbol of ["copy","thumbs-up","thumbs-down","volume","share","download","loader","check","refresh"])
   assert.ok(svg.includes('id="ui-icon-'+symbol+'"'),symbol);
 for(const marker of [".ui-button--message-action",".ui-button--message-labeled",
  ".ui-action-strip",".ui-action-popup",".ui-icon--loading","@keyframes ui-action-rotate",
  ".ui-message-action-grid",".ui-message-layout-demo"])
   assert.ok(css.includes(marker),marker);
 assert.ok(css.includes("@media(prefers-reduced-motion:reduce)"));
 assert.equal((html.match(/class="studio-component-card/g)||[]).length,23);
 assert.equal((html.match(/<link rel="stylesheet"/g)||[]).length,1);
});

test("V13 reuses the same action strip beneath a chat message in Layouts",()=>{
 const html=read("index.html"),css=read("web/styles.css");
 const layouts=html.slice(html.indexOf('id="sample-layouts"'),html.indexOf('id="sample-overlays"'));
 assert.ok(layouts.includes('id="messageActionLayoutTitle"'));
 assert.ok(layouts.includes('class="ui-message-layout-demo"'));
 assert.ok(layouts.includes('class="ui-action-strip"'));
 for(const action of ["copy","like","dislike","speak","share","more"])
   assert.ok(layouts.includes('data-action-kind="'+action+'"'),action);
 assert.ok(layouts.includes('data-action-content'));
 assert.ok(layouts.includes('data-action-feedback'));
 assert.ok(css.includes(".ui-message-layout-content"));
 assert.ok(html.includes('data-gallery-filter="actions"'));
 assert.ok(html.includes('data-gallery-filter="layouts"'));
});

test("V13 copy, share, local TXT download and loading demo do not use network",()=>{
 const app=read("web/src/app.ts"),ts=read("web/src/action-gallery.ts");
 assert.ok(app.includes('from "./action-gallery.js"'));
 assert.ok(app.includes("initMessageActions();"));
 for(const hook of ["navigator.clipboard","navigator.share","Blob","URL.createObjectURL",
  "URL.revokeObjectURL",'anchor.download="2027-ui-noi-dung-mau.txt"',
  'data-action-state="loading"','setIcon(button,"loader")','setIcon(button,"check")',"aria-busy","aria-pressed",
  "window.setTimeout","closeMenus","data-action-feedback"]){
   // DOM loading state is assigned with dataset, not hard-coded attribute strings.
   if(hook==='data-action-state="loading"')assert.ok(ts.includes('dataset.actionState="loading"'));
   else assert.ok(ts.includes(hook),hook);
 }
 assert.doesNotMatch(ts,/\bfetch\s*\(|\bWebSocket\s*\(|\bXMLHttpRequest\b|supabase|Authorization:|getUserMedia\s*\(/i);
});

test("V14 preserves complete source button inventory for CHAT and sampled TAPHOA",()=>{
 const source=read("web/src/root-button-data.ts");
 const chat=[...source.matchAll(/"id": "CHAT-I(\d{2})"/g)].map(x=>x[1]);
 const tap=[...source.matchAll(/"id": "TAPHOA-T(\d{2})"/g)].map(x=>x[1]);
 assert.equal(chat.length,44);
 assert.equal(tap.length,44);
 assert.equal(new Set(chat).size,44);
 assert.equal(new Set(tap).size,44);
 for(let i=1;i<=44;i++){
   assert.ok(chat.includes(String(i).padStart(2,"0")),"CHAT "+i);
   assert.ok(tap.includes(String(i).padStart(2,"0")),"TAPHOA "+i);
 }
 for(const family of ["navigation","message","composer","media","account","call","admin","sales","orders","debt","settings"])
   assert.ok(source.includes('"id": "'+family+'"'),family);
 for(const sourcePath of ["index.source.html","app.js","message-forward.js","src/fixed-ui-cart-spacing.css",
    "src/fixed-ui-markup-5.js","src/fixed-ui-invoice-templates.js","src/fixed-ui-debt-popup.css"])
   assert.ok(source.includes(sourcePath),sourcePath);
});

test("V14 root button gallery filters by CHAT/TAPHOA and 11 functional families",()=>{
 const html=read("index.html"),script=read("web/src/root-button-library.ts"),css=read("web/styles.css");
 assert.ok(html.includes('data-ui-library="root-buttons"'));
 for(const id of ["rootButtonCatalogTitle","rootButtonFamily","rootButtonGroups","rootButtonQuery",
    "rootButtonCount","rootButtonDetail","rootButtonEmpty","rootButtonReset"])
   assert.ok(html.includes('id="'+id+'"'),id);
 for(const origin of ["ALL","CHAT","TAPHOA"])assert.ok(html.includes('data-root-origin="'+origin+'"'));
 for(const name of ["ROOT_BUTTON_SPECS","ROOT_BUTTON_FAMILIES","renderDetail","root.replaceChildren",
   "summary","aria-pressed","sourceUrl","addEventListener(\"input\"","addEventListener(\"change\"",
   'from "./root-button-data.js"'])
   assert.ok(script.includes(name),name);
 for(const selector of [".ui-button--catalog",".ui-root-button-rows",".ui-root-family-list",
   ".ui-root-button-item",".ui-root-detail",".ui-root-search-row"])
   assert.ok(css.includes(selector),selector);
 assert.ok(read("web/src/app.ts").includes("initRootButtonCatalog();"));
 assert.equal((html.match(/class="studio-component-card/g)||[]).length,23);
});

test("V14 one registry owns icons used by all root button specs",()=>{
 const source=read("web/src/root-button-data.ts"),svg=read("web/icons.svg");
 const icons=[...new Set([...source.matchAll(/"icon": "([^"]+)"/g)].map(m=>m[1]))];
 assert.ok(icons.length>=40);
 for(const icon of icons)assert.ok(svg.includes('id="ui-icon-'+icon+'"'),icon);
 assert.equal((svg.match(/<symbol /g)||[]).length,51);
 assert.ok(read(".github/workflows/pages.yml").includes("cp web/icons.svg _site/web/"));
 assert.equal((read("index.html").match(/<link rel="stylesheet"/g)||[]).length,1);
});

test("V14 shared state and composite buttons cannot trigger real transactions",()=>{
 const html=read("index.html"),css=read("web/styles.css"),script=read("web/src/root-button-library.ts");
 for(const id of ["rootStateTitle","rootStateFeedback","rootCombosTitle","rootComboFeedback"])
   assert.ok(html.includes('id="'+id+'"'),id);
 for(const kind of ["idle","toggle","loading","success","error","danger","confirm"])
   assert.ok(html.includes('data-root-demo="'+kind+'"'),kind);
 for(const type of ["chat","sales","debt","order"])
   assert.ok(html.includes('data-root-combo="'+type+'"'),type);
 for(const cls of [".ui-button--quiet",".ui-button--outline",".ui-button--success",
  ".ui-button--warning",".ui-button--danger",".ui-button--segment",".ui-button--toggle",
  ".ui-root-combo-grid",".ui-root-state-grid"])assert.ok(css.includes(cls),cls);
 for(const term of ["window.setTimeout","aria-busy","selectedId","dataset.rootCombo"])
   assert.ok(script.includes(term),term);
 assert.doesNotMatch(script,/\bfetch\s*\(|\bWebSocket\s*\(|\bXMLHttpRequest\b|supabase|Authorization:|getUserMedia\s*\(/i);
});

test("V15 exposes a source-of-truth reusable pattern kit inside the existing UI gallery",()=>{
 const html=read("index.html");
 const css=read("web/styles.css");
 for(const id of ["sample-patterns","patternKit","kitTitle","kitFamilyTabs","kitSearch","kitCount","kitItems",
    "kitPreview","kitSource","kitCopy","kitCopySetup","kitExportCatalog","kitReset","kitFeedback"]){
   assert.ok(html.includes('id="'+id+'"'),id);
 }
 assert.ok(html.includes('data-gallery-category="patterns"'));
 assert.ok(html.includes('data-gallery-filter="patterns"'));
 assert.ok(html.includes('href="#sample-patterns"'));
 assert.ok(html.includes("23 bộ mẫu · 9 nhóm"));
 assert.ok(html.includes("35 mẫu HTML"));
 assert.ok(html.includes("V19</title>"));
 assert.ok(css.includes(".ui-kit-workspace"));
 assert.ok(css.includes(".ui-kit-preview"));
 assert.ok(css.includes(".ui-kit-source"));
 assert.equal((html.match(/<link rel="stylesheet"/g)||[]).length,1);
});

test("V16 offers 32 unique portable HTML patterns with nine functional groups",()=>{
 const src=read("web/src/ui-patterns.ts"),iconRegistry=read("web/icons.svg");
 const groups=JSON.parse(src.match(/export const UI_PATTERN_GROUPS:UiPatternGroup\[\]=(\[[\s\S]*?\]);/)[1]);
 const examples=JSON.parse(src.match(/export const UI_PATTERNS:UiPattern\[\]=(\[[\s\S]*?\]);/)[1]);
 assert.equal(groups.length,9);
 assert.equal(examples.length,35);
 assert.equal(new Set(examples.map(x=>x.id)).size,35);
 const groupIds=groups.map(x=>x.id);
 assert.equal(new Set(groupIds).size,9);
 assert.ok(examples.every(x=>groupIds.includes(x.group)&&x.title&&x.description&&x.html));
 for(const entry of examples){
   assert.ok(!/on(click|submit|load|error)\s*=/i.test(entry.html),entry.id);
   assert.ok(!/<script\b/i.test(entry.html),entry.id);
   assert.ok(!/https?:\/\//i.test(entry.html),entry.id);
   const icons=[...entry.html.matchAll(/\.\/web\/icons\.svg#ui-icon-([\w-]+)/g)].map(m=>m[1]);
   for(const icon of icons)assert.ok(iconRegistry.includes('id="ui-icon-'+icon+'"'),entry.id+": "+icon);
 }
 for(const required of ["TEXT-01","BTN-03","INPUT-02","CHAT-03","SALE-02","WORK-01","SETTING-01","OVERLAY-02"])
   assert.ok(examples.some(x=>x.id===required),required);
 assert.ok(examples.every(x=>!/(?:Auth|supabase|Authorization:|fetch\()/i.test(x.html)));
});

test("V15 pattern kit has local-only interaction and safe copy/download controls",()=>{
 const ts=read("web/src/pattern-kit.ts"),app=read("web/src/app.ts");
 assert.ok(app.includes('from "./pattern-kit.js"'));
 assert.ok(app.includes("initPatternKit();"));
 for(const marker of ["UI_PATTERNS","UI_PATTERN_GROUPS","navigator.clipboard","kitSource","kitCopy","kitCopySetup",
  "kitExportCatalog","kitFamilyTabs","kitSearch","Blob","URL.createObjectURL","URL.revokeObjectURL",
  "data-kit-stepper","data-kit-segment","data-kit-password-toggle","data-kit-switch","data-kit-action",
  "aria-pressed","2027-ui-pattern-catalog-v17.json"]){
   assert.ok(ts.includes(marker),marker);
 }
 assert.doesNotMatch(ts,/\bfetch\s*\(|\bWebSocket\s*\(|\bXMLHttpRequest\b|supabase|Authorization:|getUserMedia\s*\(/i);
 assert.ok(ts.includes("sourceInput.select()"));
});

test("V15 unified CSS primitives keep inputs, controls and workflow previews under one token owner",()=>{
 const css=read("web/styles.css");
 for(const token of ["--ds-control-min:44px","--ds-body-size:14px","--ds-focus:",
  ".ds-field-shell:focus-within",".ds-qty:focus-within",".ds-qty input:focus-visible",
  ".ds-composer:focus-within",".ds-contact",".ds-table",".ds-summary",".ds-switch",
  ".ds-confirm",".ds-toast",".ds-product-row",".ui-kit-index"]){
  assert.ok(css.includes(token),token);
 }
 assert.ok(css.includes("@media(max-width:760px)"));
 assert.ok(css.includes("@media(prefers-reduced-motion:reduce)"));
 const rules=read("RULES.md");
 assert.ok(rules.includes("## RULE 08"));
 assert.ok(rules.includes("web/src/ui-patterns.ts"));
});

test("V17 adds thirteen invoice and receipt templates in both the gallery and copyable kit",()=>{
 const html=read("index.html"),ts=read("web/src/invoice-gallery.ts"),app=read("web/src/app.ts");
 assert.ok(html.includes('data-gallery-category="invoices"'));
 assert.ok(html.includes('data-gallery-filter="invoices"'));
 assert.ok(html.includes('href="#sample-invoices"'));
 for(const id of ["sample-invoices","invoiceVariantList","invoiceSelectedTitle","invoicePreview",
  "invoiceSource","invoiceCopy","invoicePrint","invoiceNotice","invoicePrintHost"]){
    assert.ok(html.includes('id="'+id+'"'),id);
 }
 assert.ok(ts.includes('item.group==="invoices"'));
 assert.ok(ts.includes('source.value=item.html'));
 assert.ok(ts.includes('preview.innerHTML=item.html'));
 assert.ok(ts.includes('navigator.clipboard?.writeText'));
 assert.ok(ts.includes('window.print()'));
 assert.ok(ts.includes('afterprint'));
 assert.ok(app.includes('from "./invoice-gallery.js"'));
 assert.ok(app.includes("initInvoiceGallery();"));
 assert.ok(app.includes('"invoices"|"quantity"'));
 assert.ok(html.includes("1 bộ · 13 mẫu hóa đơn"));
});

test("V16 invoice layouts retain consistent arithmetic, header, numeric columns and safe text",()=>{
 const src=read("web/src/ui-patterns.ts");
 const entries=JSON.parse(src.match(/export const UI_PATTERNS:UiPattern\[\]=(\[[\s\S]*?\]);/)[1]);
 const invoices=entries.filter(item=>item.group==="invoices");
 assert.equal(invoices.length,13);
 assert.deepEqual(invoices.map(x=>x.id),Array.from({length:13},(_,n)=>"INV-"+String(n).padStart(2,"0")));
 for(const entry of invoices){
  assert.ok(entry.html.includes('class="ds-invoice '),entry.id);
  assert.ok(entry.html.includes('data-invoice-variant='),entry.id);
  assert.ok(entry.html.includes('<table '),entry.id);
  assert.ok(entry.html.includes('scope="col"'),entry.id);
  assert.ok(entry.html.includes('TÊN HÀNG'),entry.id);
  assert.ok(entry.html.includes('STT'),entry.id);
  assert.ok(entry.html.includes('Không phải chứng từ thật'),entry.id);
  assert.doesNotMatch(entry.html,/<script\b|on(click|submit|error)\s*=|https?:\/\//i,entry.id);
 }
 for(const entry of invoices.filter(x=>x.id!=="INV-08")){
  for(const value of ["187.000","7.000","180.000","64.000","75.000","48.000"]){
   assert.ok(entry.html.includes(value),entry.id+" amount "+value);
  }
 }
 assert.ok(invoices.find(x=>x.id==="INV-09").html.includes("80.000 đ"));
 assert.ok(invoices.find(x=>x.id==="INV-08").html.includes("5 / 6"));
});

test("V16 invoice style palettes and column alignment are shared in one stylesheet",()=>{
 const css=read("web/styles.css"),html=read("index.html");
 for(const marker of [".ds-invoice",".ds-invoice-header",".ds-invoice-meta",".ds-invoice-table",
   ".ds-invoice-totals",".ds-invoice-note",".ds-invoice--print",".ds-invoice--minimal",
   ".ds-invoice--navy",".ds-invoice--sage",".ds-invoice--full-grid",".ds-invoice--compact",
   ".ds-invoice--draft",".ds-invoice--delivered",".ds-invoice--checklist",".ds-invoice--debt",
   ".ui-invoice-gallery-layout","@media print","body.ui-invoice-print-mode #invoicePrintHost"]){
   assert.ok(css.includes(marker),marker);
 }
 for(const color of ["#203c52","#406e56","#eff2f4"]){
   assert.ok(css.includes(color),color);
 }
 assert.ok(css.includes("font-variant-numeric:tabular-nums"));
 assert.ok(css.includes(".ds-invoice-table :is(th,td):nth-child(1)"));
 assert.ok(css.includes(".ds-invoice-table :is(th,td):nth-child(5)"));
 assert.equal((html.match(/<link rel="stylesheet"/g)||[]).length,1);
});

test("V16 print and table previews remain local without transactions or external service calls",()=>{
 const ts=read("web/src/invoice-gallery.ts"),patterns=read("web/src/ui-patterns.ts");
 assert.ok(ts.includes('host.innerHTML=selected.html'));
 assert.ok(ts.includes('document.body.classList.add("ui-invoice-print-mode")'));
 assert.ok(ts.includes('host.replaceChildren()'));
 assert.ok(ts.includes('window.addEventListener("afterprint"'));
 assert.doesNotMatch(ts,/\bfetch\s*\(|\bWebSocket\s*\(|\bXMLHttpRequest\b|supabase|Authorization:|getUserMedia\s*\(/i);
 assert.ok(patterns.includes("INV-00"));
 assert.ok(patterns.includes("INV-09"));
 assert.ok(read("RULES.md").includes("## RULE 09"));
});

test("V17 variants physically reorder price before quantity in header and all rows",()=>{
 const src=read("web/src/ui-patterns.ts");
 const items=JSON.parse(src.match(/export const UI_PATTERNS:UiPattern\[\]=(\[[\s\S]*?\]);/)[1]);
 const variants=items.filter(x=>["INV-10","INV-11","INV-12"].includes(x.id));
 assert.equal(variants.length,3);
 const wantedHeader=["STT","TÊN HÀNG","GIÁ","SL","THÀNH TIỀN"];
 const expected=[
  ["1","Gạo loại 1 kg","32.000","2","64.000"],
  ["2","Sữa hộp 180 ml","25.000","3","75.000"],
  ["3","Bánh quy bơ","48.000","1","48.000"]
 ];
 for(const pattern of variants){
   const cols=[...pattern.html.matchAll(/<th scope="col">([^<]+)<\/th>/g)].map(x=>x[1]);
   assert.deepEqual(cols,wantedHeader,pattern.id+" header order");
   assert.ok(pattern.html.includes('ds-invoice-table--price-first'),pattern.id+" modifier");
   const dataRows=[...pattern.html.matchAll(/<tr><td>([^<]*)<\/td><td>([^<]*)<\/td><td>([^<]*)<\/td><td>([^<]*)<\/td><td>([^<]*)<\/td><\/tr>/g)]
    .map(x=>x.slice(1));
   assert.deepEqual(dataRows,expected,pattern.id+" rows: prices must not remain in qty column");
   for(const figure of ["187.000 đ","7.000 đ","180.000 đ"])
     assert.ok(pattern.html.includes(figure),pattern.id+" "+figure);
 }
 const original=items.find(x=>x.id==="INV-00");
 const baseHeader=[...original.html.matchAll(/<th scope="col">([^<]+)<\/th>/g)].map(x=>x[1]);
 assert.deepEqual(baseHeader,["STT","TÊN HÀNG","SL","ĐƠN GIÁ","THÀNH TIỀN"],
   "Original 10 variants retain the prior STT TÊN SL GIÁ THÀNH TIỀN layout");
});

test("V17 price-before-quantity prints and scales via shared semantic column modifier",()=>{
 const css=read("web/styles.css"),html=read("index.html");
 for(const marker of [
   "--ds-invoice-price-first-price-width:21%",
   "--ds-invoice-price-first-qty-width:10%",
   ".ds-invoice-table--price-first :is(th,td):nth-child(3)",
   ".ds-invoice-table--price-first :is(th,td):nth-child(4)",
   "text-align:right",
   "text-align:center",
   "@media print"
 ])assert.ok(css.includes(marker),marker);
 assert.equal((html.match(/<link rel="stylesheet"/g)||[]).length,1);
 assert.ok(html.includes("13 mẫu hóa đơn"));
 assert.ok(html.includes("GIÁ → SL"));
 assert.ok(read("web/src/pattern-kit.ts").includes("2027-ui-pattern-catalog-v17.json"));
});


test("V18 mobile gallery uses native pickers, a collapsible source, and preserves complete invoice cells",()=>{
 const html=read("index.html");
 const css=read("web/styles.css");
 const gallery=read("web/src/app.ts");
 const invoice=read("web/src/invoice-gallery.ts");
 const patterns=read("web/src/ui-patterns.ts");
 for(const marker of [
   'id="galleryMobileFilter"','id="invoiceMobileSelect"',
   'id="invoiceSourceDetails"','id="invoiceSource"',
   'data-gallery-filter="invoices"'
 ])assert.ok(html.includes(marker),marker);
 for(const marker of [
   '.gallery-mobile-filter select','.gallery-filter-nav{display:none}',
   '.ui-invoice-variant-list{display:none}',
   '.ds-invoice-table{display:block;width:100%;min-width:0',
   '.ds-invoice-table tbody tr{display:grid',
   '.ds-invoice-table--price-first tbody td:nth-child(3)::before{content:"Giá"}',
   '.ds-invoice-table--price-first tbody td:nth-child(4)::before{content:"SL"}',
   '.ds-invoice-table--check tbody td:nth-child(3)::before{content:"SL đặt"}',
   '.ds-invoice-table--check tbody td:nth-child(4)::before{content:"SL thực"}',
   '.ds-invoice-table--check tbody td:nth-child(5)::before{content:"Ghi chú"}'
 ])assert.ok(css.includes(marker),marker);
 assert.ok(css.includes('@media screen and (max-width:760px)'),"mobile-only styles preserve print");
 assert.ok(gallery.includes('galleryMobileFilter.addEventListener("change"'),"mobile category selection");
 assert.ok(gallery.includes('galleryMobileFilter.value=activeGalleryCategory'),"category picker stays synced");
 assert.ok(invoice.includes('mobileSelect.addEventListener("change"'),"mobile invoice selection");
 assert.ok(invoice.includes('sourceDetails.open=!narrowScreen.matches'),"source collapsed on phone");
 assert.ok(invoice.includes('sourceDetails.open=true'),"clipboard fallback exposes source");
 assert.ok(invoice.includes('source.value=item.html'),"copied HTML stays original");
 assert.ok(patterns.includes("INV-12"),"all thirteen invoice variants remain available");
 assert.ok(css.includes('@media print'),"A4 print rules retained");
});


test("V19 starts with a simple theme package and one numbered component category",()=>{
 const html=read("index.html"),css=read("web/styles.css"),src=read("web/src/simple-gallery.ts"),app=read("web/src/app.ts");
 for(const id of [
  "simpleKit","simpleTheme","simpleCategory","simpleItems","simpleCount","simpleChosen",
  "simpleCopy","simpleStatus","simpleCodeDetails","simpleSource","simpleAdvancedToggle"
 ])assert.ok(html.includes('id="'+id+'"'),id);
 for(const option of ["chatgpt","facebook","gemini","mono"])
  assert.ok(html.includes('<option value="'+option+'">'),"theme "+option);
 for(const type of ["text","input","button","icon","table","layout","popup"])
  assert.ok(html.includes('<option value="'+type+'">'),"component "+type);
 for(const id of Array.from({length:10},(_,i)=>"TEXT-"+String(i+1).padStart(2,"0")))
  assert.ok(src.includes('id:"'+id+'"'),"ten numbered text variants "+id);
 for(const id of Array.from({length:10},(_,i)=>"INPUT-"+String(i+1).padStart(2,"0")))
  assert.ok(src.includes('id:"'+id+'"'),"ten input variants "+id);
 const buttonStyles=JSON.parse(src.match(/const buttonStyles=(\[[^;]+\]);/)[1]);
 const iconNames=JSON.parse(src.match(/const iconNames=(\[[^;]+\]);/)[1]);
 assert.equal(buttonStyles.length,10,"ten button shapes");
 assert.equal(iconNames.length,10,"ten shared icon variants");
 assert.ok(src.includes("selectedByCategory"),"category selection survives navigation");
 assert.ok(src.includes("root.dataset.theme=theme.value"),"a theme changes all sample styling");
 for(const token of [
  '.simple-kit[data-theme="facebook"]','.simple-kit[data-theme="gemini"]',
  '.simple-kit[data-theme="mono"]','--s-font:','--s-accent:',
  'body.simple-first .studio-component-gallery',
  '.simple-row-preview','.simple-row-select[aria-pressed="true"]'
 ])assert.ok(css.includes(token),token);
 assert.ok(html.includes('id="patternKit"'),"advanced library preserved");
 assert.ok(html.includes('id="invoiceVariantList"'),"existing invoice samples preserved");
 assert.ok(src.includes('data-simple-money'),"formatted money field");
 assert.ok(src.includes('replace(/\\B(?=(\\d{3})+(?!\\d))/g,".")'),"live money thousands formatting");
 assert.ok(src.includes('data-simple-demo'),"demo actions only");
 assert.doesNotMatch(src,/\bfetch\s*\(|\bWebSocket\s*\(|supabase|Authorization:|getUserMedia\s*\(/i);
 assert.ok(app.includes('initSimpleGallery();'),"simple samples initialized");
 assert.equal((html.match(/<link rel="stylesheet"/g)||[]).length,1,"single shared stylesheet");
 assert.ok(html.includes('2027-UI-V19'),"new version marker and asset cache invalidation");
});
