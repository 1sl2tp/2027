import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import ts from "typescript";
const read=p=>readFileSync(new URL("../"+p,import.meta.url),"utf8");
async function contractsModule(){
 const source=read("web/src/component-contracts.ts");
 const js=ts.transpileModule(source,{
  compilerOptions:{target:ts.ScriptTarget.ES2022,module:ts.ModuleKind.ESNext}
 }).outputText;
 return import("data:text/javascript;base64,"+Buffer.from(js).toString("base64"));
}
test("V40 uses a typed component hierarchy with real owners, cardinality, and no cycles",async()=>{
 const {COMPONENT_CONTRACTS,getComponentContract,auditComponentRegistry}=await contractsModule();
 assert.equal(auditComponentRegistry().length,0,"registry must be internally consistent");
 assert.equal(new Set(COMPONENT_CONTRACTS.map(x=>x.id)).size,COMPONENT_CONTRACTS.length);
 for(const item of COMPONENT_CONTRACTS){
  assert.ok(["screen","region","composition","primitive","token"].includes(item.layer));
  assert.ok(["container","content","control","decoration"].includes(item.nature));
  assert.ok(["one","many","optional"].includes(item.cardinality));
  assert.ok(item.owner);
  if(item.parent!==null)assert.ok(getComponentContract(item.parent),"missing parent "+item.id);
 }
 assert.equal(getComponentContract("CHAT-COMPOSER")?.layer,"composition");
 assert.equal(getComponentContract("COMPOSER-INPUT")?.nature,"content");
 assert.equal(getComponentContract("COMPOSER-TOOLBAR")?.nature,"container");
 assert.equal(getComponentContract("COMPOSER-SEND-BUTTON")?.nature,"control");
 assert.equal(getComponentContract("COMPOSER-SEND-ICON")?.nature,"decoration");
 assert.equal(getComponentContract("COMPOSER-SEND-ICON")?.parent,"COMPOSER-SEND-BUTTON");
 assert.equal(getComponentContract("CHAT-MESSAGE")?.cardinality,"many");
 assert.equal(getComponentContract("COMPOSER-ATTACHMENT")?.cardinality,"many");
 assert.equal(getComponentContract("COMPOSER-INPUT")?.cardinality,"one");
 assert.equal(getComponentContract("SEARCH-FIELD")?.layer,"composition");
 assert.equal(getComponentContract("QUANTITY-STEPPER")?.layer,"composition");
 assert.equal(getComponentContract("TABLE-COLUMN")?.parent,"DATA-TABLE");
});

test("V40 registry rejects missing parent, duplicate key, ownerless nodes and a circular tree",async()=>{
 const {COMPONENT_CONTRACTS,auditComponentRegistry}=await contractsModule();
 const fake={...COMPONENT_CONTRACTS[0],id:"TEST-ORPHAN",parent:"MISSING"};
 assert.ok(auditComponentRegistry([...COMPONENT_CONTRACTS,fake]).some(x=>x.includes("thiếu cha")));
 assert.ok(auditComponentRegistry([...COMPONENT_CONTRACTS,COMPONENT_CONTRACTS[0]]).some(x=>x.includes("Trùng ID")));
 assert.ok(auditComponentRegistry([...COMPONENT_CONTRACTS,{...fake,id:"TEST-OWNER",parent:null,owner:""}]).some(x=>x.includes("Thiếu owner")));
 assert.ok(auditComponentRegistry([...COMPONENT_CONTRACTS,{...fake,id:"TEST-CYCLE",parent:"TEST-CYCLE"}]).some(x=>x.includes("Chu trình")));
});

test("V40 FIELD-11 is a COMPOSER parent with textarea and toolbar; action buttons own icons",()=>{
 const source=read("web/src/simple-fields.ts"),registry=read("web/src/component-contracts.ts"),sprite=read("web/icons.svg");
 const composer=source.slice(source.indexOf('  case "composer":{'),source.indexOf('  case "select":{'));
 assert.ok(source.includes('label:"Vùng gõ chat · Composer (cha)"'));
 assert.ok(composer.includes('const form=document.createElement("form")'));
 assert.ok(composer.includes('form.className="ds-composer composer-contract"'));
 assert.ok(composer.includes('form.dataset.uiComponent="CHAT-COMPOSER"'));
 assert.ok(composer.includes('area.dataset.uiComponent="COMPOSER-INPUT"'));
 assert.ok(composer.includes('toolbar.dataset.uiComponent="COMPOSER-TOOLBAR"'));
 assert.ok(composer.includes('toolbar.className="ds-composer-actions composer-contract-toolbar"'));
 assert.ok(composer.includes('toolbar.append(attach,mic,send)'));
 assert.ok(composer.includes('form.append(area,toolbar)'));
 for(const [id,name] of [["COMPOSER-ATTACH-BUTTON","plus"],["COMPOSER-MIC-BUTTON","mic"],["COMPOSER-SEND-BUTTON","send-up"]]){
  assert.ok(composer.includes('"'+id+'"'));
  assert.ok(composer.includes('"'+name+'"'));
  assert.ok(sprite.includes('id="ui-icon-'+name+'"'));
 }
 assert.ok(composer.includes('element.className=variant==="icon"?"ui-button ui-button--icon":"ui-button ui-button--send"'));
 assert.ok(composer.includes('use.setAttribute("href","./web/icons.svg#ui-icon-"+icon)'));
 assert.ok(composer.includes('const errors=auditComposerTree(form)'));
 assert.ok(registry.includes("export function auditComposerTree(root:Element):string[]"));
 assert.ok(registry.includes('control.parentElement!==toolbar'));
 assert.ok(registry.includes('control.classList.contains("ui-button")'));
 assert.doesNotMatch(composer,/smallButton\(/,"composer must not create its own ad-hoc button");
 assert.doesNotMatch(composer,/\.innerHTML\s*=|insertAdjacentHTML|document\.write\s*\(/,"text stays text");
 assert.doesNotMatch(composer,/\bfetch\s*\(|XMLHttpRequest|WebSocket|supabase/i,"no real sends");
});

test("V40 inherits existing ds-composer/ui-button/ui-icon; removes separate fake composer-button CSS",()=>{
 const css=read("web/styles.css"),src=read("web/src/simple-fields.ts"),table=read("web/src/column-matrix.ts");
 assert.ok(css.includes(".ds-composer{"));
 assert.ok(css.includes(".ds-composer-actions{"));
 assert.ok(css.includes(".ui-button--icon{"));
 assert.ok(css.includes(".ui-button--send{"));
 assert.ok(css.includes(".ui-icon{"));
 assert.ok(css.includes(".simple-field-demo-composer .composer-contract-toolbar"));
 assert.doesNotMatch(css,/\.simple-field-demo-composer \.simple-field-send\s*\{/);
 assert.doesNotMatch(css,/\.simple-field-demo-composer \.simple-field-action\s*\{/);
 assert.ok(src.includes('shell.dataset.uiComponent="SEARCH-FIELD"'));
 assert.ok(src.includes('search.dataset.uiComponent="SEARCH-INPUT"'));
 assert.ok(src.includes('shell.dataset.uiComponent="QUANTITY-STEPPER"'));
 assert.ok(src.includes('number.dataset.uiComponent="QUANTITY-VALUE"'));
 assert.ok(table.includes('table.dataset.uiComponent="DATA-TABLE"'));
 assert.ok(table.includes('track.dataset.uiComponent="TABLE-COLUMN"'));
});

test("V40 advanced composer Stop is an enabled cancellation action, not a disabled Send",()=>{
 const source=read("web/src/composer-gallery.ts");
 assert.ok(source.includes('send.type=sending?"button":"submit"'));
 assert.ok(source.includes('send.disabled=false'));
 assert.ok(source.includes('sending?"Dừng mô phỏng gửi"'));
 assert.ok(source.includes('send.addEventListener("click",()=>{'));
 assert.ok(source.includes("window.clearTimeout(pendingTimer)"));
 assert.ok(source.includes("pendingTimers.delete(pendingTimer)"));
 assert.ok(source.includes('send.dataset.composerBusy="false"'));
 assert.ok(source.includes('pendingTimers.add(pendingTimer)'));
 assert.ok(source.includes("for(const timer of pendingTimers)window.clearTimeout(timer)"));
 assert.ok(source.includes("pendingTimer=window.setTimeout"));
 assert.ok(source.includes("sendIcon.setAttribute(\"href\",sending?"));
 assert.doesNotMatch(source,/send\.disabled=true;/,"stop icon cannot be attached to disabled button");
 assert.doesNotMatch(source,/\bfetch\s*\(|\bWebSocket\s*\(|\bXMLHttpRequest\b|supabase|getUserMedia\s*\(/i);
});

test("V40 keeps hierarchy display in existing simple section 5 with traceable sources and one rule",()=>{
 const html=read("index.html"),app=read("web/src/app.ts"),rules=read("RULES.md"),workflow=read(".github/workflows/pages.yml");
 const start=html.indexOf('id="simpleFields"'),end=html.indexOf('id="simpleButtons"',start);
 const sec=html.slice(start,end);
 assert.ok(sec.includes('id="componentHierarchy"'));
 assert.ok(sec.includes('id="componentContractTree"'));
 assert.ok(sec.includes("5.1. Quy tắc cha"));
 assert.ok(app.includes('import { initComponentContractTree } from "./component-contracts.js";'));
 assert.ok(app.includes("initComponentContractTree();"));
 assert.ok(rules.includes("## RULE 12 — XÁC ĐỊNH CHA"));
 for(const source of ["assistant-ui/assistant-ui","vercel/ai-elements","openai/apps-sdk-ui","mrigankad/Lumi-UI"])
  assert.ok(read("references/GITHUB_COMPONENT_HIERARCHY_AUDIT_V40.md").includes(source));
 assert.ok(html.includes('data-ui-version="2027-UI-V40"'));
 assert.ok(html.includes('src="./web/dist-v40/app.js"'));
 assert.ok(workflow.includes("cp -R web/dist _site/web/dist-v40"));
});
