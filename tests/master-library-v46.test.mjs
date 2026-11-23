import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import ts from "typescript";
const read=p=>readFileSync(new URL("../"+p,import.meta.url),"utf8");
async function registry(){
 const compiled=ts.transpileModule(read("web/src/component-contracts.ts"),{
  compilerOptions:{target:ts.ScriptTarget.ES2022,module:ts.ModuleKind.ESNext}
 }).outputText;
 return import("data:text/javascript;base64,"+Buffer.from(compiled).toString("base64"));
}
test("V46 has exactly one UI-LIBRARY root for all newly authored app screens",async()=>{
 const {COMPONENT_CONTRACTS,getComponentContract,auditComponentRegistry,auditComponentPlacements}=await registry();
 assert.deepEqual(auditComponentRegistry(),[]);
 assert.deepEqual(auditComponentPlacements(),[]);
 assert.deepEqual(COMPONENT_CONTRACTS.filter(x=>x.parent===null).map(x=>x.id),["UI-LIBRARY"]);
 assert.equal(getComponentContract("UI-SHELL")?.parent,"UI-LIBRARY");
 assert.equal(getComponentContract("UI-SCREEN-SLOT")?.parent,"UI-SHELL");
 for(const id of ["CHAT-SCREEN","SALES-SCREEN","WORK-SCREEN","REPORT-SCREEN"])
  assert.equal(getComponentContract(id)?.parent,"UI-SCREEN-SLOT");
 for(const id of ["SEARCH-FIELD","QUANTITY-STEPPER","DATA-TABLE","UI-BUTTON"])
  assert.equal(getComponentContract(id)?.parent,"UI-PRIMITIVES");
 for(const id of ["DATA-TABLE","QUANTITY-STEPPER","UI-BUTTON"])
  assert.equal(COMPONENT_CONTRACTS.filter(x=>x.id===id).length,1);
});
test("V46 canonical components have 2027 owners; old app files are not reused",async()=>{
 const {COMPONENT_CONTRACTS,COMPONENT_PLACEMENTS}=await registry();
 const owners=COMPONENT_CONTRACTS.map(x=>x.owner).join("\n");
 for(const file of ["shell.js","app.js","conversation-search.js","contact-directory-admin.js","admin-composer-actions.js","message-forward.js"])
  assert.ok(!owners.includes(file),"legacy owner: "+file);
 for(const host of ["SALES-QUANTITY-SLOT","SALES-TABLE-SLOT","REPORT-TABLE-SLOT","COMPOSER-TOOLBAR","QUANTITY-STEPPER"])
  assert.ok(COMPONENT_PLACEMENTS.some(x=>x.host===host),host);
 assert.equal(COMPONENT_PLACEMENTS.filter(x=>x.child==="DATA-TABLE").length,3);
});
test("V46 master renders 4 original screen templates using one set of 2027 primitives",()=>{
 const src=read("web/src/master-library-v46.ts"),html=read("index.html"),app=read("web/src/app.ts");
 for(const name of ["chat","sales","work","report"])
  assert.ok(html.includes('data-master-v46-mode="'+name+'"'));
 for(const id of ["UI-SHELL","UI-SCREEN-SLOT","CHAT-MESSAGE-LIST","CHAT-COMPOSER","SALES-SCREEN","WORK-SCREEN","REPORT-SCREEN","QUANTITY-STEPPER","DATA-TABLE"])
  assert.ok(src.includes('"'+id+'"'),id);
 assert.ok(src.includes('import {COLUMN_SCHEMA} from "./column-matrix.js"'));
 assert.ok(src.includes('import {iconNode} from "./icon-motion-gallery.js"'));
 assert.ok(src.includes('make("table","ds-table ds-table--schema")'));
 assert.ok(src.includes('make("div","ds-qty")'));
 assert.ok(src.includes('make("form","ds-composer master-v46-composer")'));
 assert.ok(src.includes('make("button","ui-button ui-button--"+variant)'));
 assert.doesNotMatch(src,/\.innerHTML\s*=|insertAdjacentHTML|document\.write\s*\(/);
 assert.doesNotMatch(src,/\bfetch\s*\(|WebSocket|XMLHttpRequest|supabase|sendMessage|api\.github\.com/i);
 assert.ok(app.includes("initMasterLibraryV46();"));
 assert.ok(src.includes('svg.setAttribute("data-ui-component","UI-ICON")'));
 const config=JSON.parse(read("tsconfig.json"));
 for(const filename of ["web/src/root-button-data.ts","web/src/root-button-library.ts","web/src/chat-live-map.ts"])
  assert.ok(config.exclude.includes(filename),filename);

});
test("V46 only renders new parent system; old app inventories are historical evidence",()=>{
 const html=read("index.html"),app=read("web/src/app.ts"),rules=read("RULES.md");
 assert.ok(html.includes('id="masterLibraryV46"'));
 assert.ok(!html.includes('id="chatLiveMapV44"'));
 assert.ok(!html.includes('data-ui-library="root-buttons"'));
 assert.ok(!app.includes("initChatLiveMap();"));
 assert.ok(!app.includes("initRootButtonCatalog();"));
 assert.ok(read("web/src/chat-live-map.ts").includes("CHAT_LIVE_BINDINGS"));
 assert.ok(read("web/src/root-button-data.ts").includes("ROOT_BUTTON_SPECS"));
 assert.ok(rules.includes("### 12.12. V46"));
 assert.ok(html.includes("Không tái sử dụng mã, CSS, component hay bố cục từ CHAT/TAPHOA cũ"));
 assert.ok(html.includes('data-ui-version="2027-UI-V47"'));
 assert.ok(html.includes('src="./web/dist-v47/app.js"'));
 assert.ok(read(".github/workflows/pages.yml").includes("cp -R web/dist _site/web/dist-v47"));
});
