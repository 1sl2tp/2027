import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
const read = (file) => readFileSync(new URL("../"+file, import.meta.url),"utf8");

test("V08 retains one interactive ChatGPT-like document and shared CSS",()=>{
  const html=read("index.html");
  assert.match(html,/data-ui-version="2027-UI-V13"/);
  assert.match(html,/<h1>Chỉnh ngay trên một văn bản mẫu<\/h1>/);
  for(const id of ["document","controls","components","overlays","demoCanvas","fontSelect","sizeRange","sizeOutput","weightOutput","leadingRange","trackingRange","cssPreview","resetButton","copyButton"])
    assert.ok(html.includes('id="'+id+'"'),id);
  for(const block of ["title","body","section","description","list","table","number","money","note","caption"])
    assert.ok(html.includes('data-block="'+block+'"'),block);
  assert.ok(html.includes("./web/styles.css?v=2027-UI-V13"));
  assert.ok(html.includes("./web/dist/app.js?v=2027-UI-V13"));
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
  assert.ok(html.includes("web/styles.css?v=2027-UI-V13"));
  assert.ok(html.includes(out+"/app.js?v=2027-UI-V13"));
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
  assert.ok(index.includes('./web/styles.css?v=2027-UI-V13'));
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
  assert.match(html,/data-ui-version="2027-UI-V13"/);
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
  assert.ok(index.includes('data-ui-version="2027-UI-V13"'));
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

test("V13 categorizes 18 component sets into seven clear groups",()=>{
  const html=read("index.html");
  const css=read("web/styles.css");
  const expected={typography:1,tables:2,quantity:2,inputs:4,actions:4,layouts:3,overlays:2};
  assert.match(html,/data-ui-version="2027-UI-V13"/);
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
  assert.equal((html.match(/class="studio-component-card/g)||[]).length,18);
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
 assert.match(html,/data-ui-version="2027-UI-V13"/);
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
 assert.ok(actions.includes("4 bộ mẫu"));
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
 assert.ok(html.includes('data-ui-version="2027-UI-V13"'));
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
 assert.equal((html.match(/class="studio-component-card/g)||[]).length,18);
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
