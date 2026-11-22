import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import ts from "typescript";
const read=p=>readFileSync(new URL("../"+p,import.meta.url),"utf8");
async function loadContracts(){
 const compiled=ts.transpileModule(read("web/src/component-contracts.ts"),{
  compilerOptions:{target:ts.ScriptTarget.ES2022,module:ts.ModuleKind.ESNext}
 }).outputText;
 return import("data:text/javascript;base64,"+Buffer.from(compiled).toString("base64"));
}
test("V44 CHAT crosswalk references canonical contracts, not a second registry",async()=>{
 const {COMPONENT_CONTRACTS,auditComponentRegistry,auditComponentPlacements,
  COMPONENT_PLACEMENTS,getComponentContract}=await loadContracts();
 assert.deepEqual(auditComponentRegistry(),[]);
 assert.deepEqual(auditComponentPlacements(),[]);
 const code=read("web/src/chat-live-map.ts");
 const start=code.indexOf("export const CHAT_LIVE_BINDINGS:");
 const end=code.indexOf("export const CHAT_PLATFORM_OWNERS",start);
 const bindings=[...code.slice(start,end).matchAll(/\{id:"([^"]+)",selector:"([^"]+)",file:"([^"]+)"/g)];
 assert.equal(bindings.length,56);
 const ids=bindings.map(m=>m[1]);
 assert.equal(new Set(ids).size,56);
 for(const id of ids)assert.ok(getComponentContract(id),"missing "+id);
 assert.equal(COMPONENT_CONTRACTS.filter(c=>c.id==="SEARCH-FIELD").length,1);
 assert.ok(COMPONENT_PLACEMENTS.some(x=>x.host==="THREAD-SEARCH-OVERLAY"&&x.child==="SEARCH-FIELD"));
 assert.ok(COMPONENT_PLACEMENTS.some(x=>x.host==="COMPOSER-EDITOR-WRAP"&&x.child==="COMPOSER-INPUT"));
 assert.ok(COMPONENT_PLACEMENTS.some(x=>x.host==="COMPOSER-SURFACE"&&x.child==="COMPOSER-TOOLBAR"));
 assert.ok(code.includes('import {COMPONENT_CONTRACTS,getComponentContract} from "./component-contracts.js"'));
});
test("V44 CHAT source selectors and owner map protect parent-child boundaries",async()=>{
 const {getComponentContract}=await loadContracts();
 const parent={
  "CHAT-DIRECTORY":"CHAT-SCREEN",
  "DIRECTORY-TOOLS":"CHAT-DIRECTORY",
  "DIRECTORY-LIST":"CHAT-DIRECTORY",
  "DIRECTORY-CONTACT-ROW":"DIRECTORY-LIST",
  "CONTACT-NAME":"DIRECTORY-CONTACT-ROW",
  "CHAT-REGION-TOP":"CHAT-SCREEN",
  "HEADER-IDENTITY":"CHAT-REGION-TOP",
  "HEADER-AVATAR":"HEADER-IDENTITY",
  "THREAD-JUMP-TO-LATEST":"CHAT-MESSAGE-LIST",
  "CHAT-COMPOSER":"CHAT-THREAD",
  "COMPOSER-SURFACE":"CHAT-COMPOSER",
  "COMPOSER-EDITOR-WRAP":"COMPOSER-SURFACE",
  "COMPOSER-ACTION-MENU":"CHAT-COMPOSER",
  "CHAT-WORK-REGION":"CHAT-SCREEN",
  "WORK-SUMMARY":"CHAT-WORK-REGION",
  "CHAT-OVERLAY-ROOT":"CHAT-SCREEN",
  "THREAD-SEARCH-OVERLAY":"CHAT-OVERLAY-ROOT",
  "THREAD-SEARCH-RESULTS":"THREAD-SEARCH-OVERLAY",
  "THREAD-SEARCH-HIT":"THREAD-SEARCH-RESULTS",
  "CHAT-IMAGE-VIEWER":"CHAT-OVERLAY-ROOT"
 };
 for(const [id,p] of Object.entries(parent))assert.equal(getComponentContract(id)?.parent,p);
 const map=read("web/src/chat-live-map.ts");
 for(const selector of ["#shellNavigationLayer","#regionTop","#messageWindow",
  "#threadScrollControl","#composerShell","#composerForm","#attachmentTray",
  "#workThreadView","#globalOverlayRoot",".conversation-search-results"])
  assert.ok(map.includes(selector),selector);
 assert.ok(map.includes("Logical owner là MessageList; DOM mount ở #thread-bottom-container"));
 assert.ok(map.includes('keyboard-inset-core.js'));
 assert.ok(map.includes('shell-form-viewport-policy.js'));
 assert.ok(map.includes('interaction-controller.js'));
});
test("V44: UI tree is inside existing Section 5, uses source links but no duplicate CSS primitive",()=>{
 const html=read("index.html"),app=read("web/src/app.ts"),css=read("web/styles.css");
 const section=html.indexOf('id="simpleFields"');
 const part=html.indexOf('id="chatLiveMapV44"');
 const next=html.indexOf('id="simpleButtons"');
 assert.ok(section>=0&&part>section&&next>part);
 assert.ok(html.includes('id="chatLiveMapTree"'));
 assert.ok(html.includes('id="chatLiveMapScope"'));
 assert.ok(app.includes('import { initChatLiveMap } from "./chat-live-map.js";'));
 assert.ok(app.includes("initChatLiveMap();"));
 assert.ok(css.includes(".chat-live-map .simple-component-tree-level"));
 const scope=css.slice(css.indexOf("/* V44: this is a source-aware reader"),css.indexOf(".simple-component-contract{"));
 assert.doesNotMatch(scope,/\.ui-button\s*\{|\.ds-table\s*\{|\.ds-composer\s*\{/);
 assert.ok(html.includes('data-ui-version="2027-UI-V45"'));
 assert.ok(html.includes('src="./web/dist-v45/app.js"'));
 assert.ok(read(".github/workflows/pages.yml").includes("cp -R web/dist _site/web/dist-v45"));
});
test("V44 source audit distinguishes CHAT live implementation from 2027 preview",()=>{
 const doc=read("references/UI_V44_CHAT_CODE_CROSSWALK.md");
 for(const key of ["index.source.html","keyboard-inset-core.js","conversation-search.js","image-viewer","P0","P4"])
  assert.ok(doc.includes(key),key);
 assert.ok(doc.includes("Không được gọi các năng lực"));
 const module=read("web/src/chat-live-map.ts");
 assert.doesNotMatch(module,/\bfetch\s*\(|\bWebSocket\s*\(|\bXMLHttpRequest\b|supabase\.from/i);
 assert.ok(module.includes("document.createElement"));
 assert.doesNotMatch(module,/\.innerHTML\s*=|insertAdjacentHTML|document\.write\s*\(/);
});
