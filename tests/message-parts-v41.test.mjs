import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import ts from "typescript";
const read=p=>readFileSync(new URL("../"+p,import.meta.url),"utf8");
async function loadContracts(){
 const js=ts.transpileModule(read("web/src/component-contracts.ts"),{
  compilerOptions:{target:ts.ScriptTarget.ES2022,module:ts.ModuleKind.ESNext}
 }).outputText;
 return import("data:text/javascript;base64,"+Buffer.from(js).toString("base64"));
}

test("V41: message parts are typed descendants, and action button stays inside its message",async()=>{
 const {COMPONENT_CONTRACTS,getComponentContract,auditComponentRegistry}=await loadContracts();
 assert.deepEqual(auditComponentRegistry(),[]);
 const child=(id,parent,cardinality)=>{
  const c=getComponentContract(id);
  assert.ok(c,id+" missing from canonical registry");
  assert.equal(c.parent,parent);
  assert.equal(c.cardinality,cardinality);
 };
 child("MESSAGE-CONTENT-PARTS","CHAT-MESSAGE","one");
 child("MESSAGE-TEXT-PART","MESSAGE-CONTENT-PARTS","many");
 child("MESSAGE-TABLE-PART","MESSAGE-CONTENT-PARTS","many");
 child("MESSAGE-MEDIA-PART","MESSAGE-CONTENT-PARTS","many");
 child("MESSAGE-MEDIA-TILE","MESSAGE-MEDIA-PART","many");
 child("CHAT-MESSAGE-ACTIONS","CHAT-MESSAGE","optional");
 child("MESSAGE-COPY-BUTTON","CHAT-MESSAGE-ACTIONS","optional");
 assert.equal(getComponentContract("MESSAGE-COPY-BUTTON").owner,"ui-button");
 assert.equal(COMPONENT_CONTRACTS.filter(c=>c.id==="DATA-TABLE").length,1,"one table definition");
});

test("V41: shared DATA-TABLE may have two hosts but remains ONE definition",async()=>{
 const {getComponentContract,getAllowedComponentParents,COMPONENT_PLACEMENTS,
  auditComponentPlacements,COMPONENT_CONTRACTS}=await loadContracts();
 assert.equal(getComponentContract("DATA-TABLE").parent,"CHAT-SCREEN");
 assert.deepEqual(getAllowedComponentParents("DATA-TABLE"),["CHAT-SCREEN","MESSAGE-TABLE-PART"]);
 assert.deepEqual(auditComponentPlacements(),[]);
 assert.equal(COMPONENT_PLACEMENTS.length,1);
 const base=COMPONENT_PLACEMENTS[0];
 assert.equal(base.cardinality,"one");
 assert.ok(auditComponentPlacements(COMPONENT_CONTRACTS,[base,base]).some(x=>x.includes("Trùng placement")));
 assert.ok(auditComponentPlacements(COMPONENT_CONTRACTS,[{...base,host:"MISSING"}]).some(x=>x.includes("thiếu host")));
 assert.ok(auditComponentPlacements(COMPONENT_CONTRACTS,[{...base,child:"MISSING"}]).some(x=>x.includes("thiếu child")));
 assert.ok(auditComponentPlacements(COMPONENT_CONTRACTS,[{...base,host:"TABLE-COLUMN",child:"DATA-TABLE"}]).some(x=>x.includes("host không là container")));
 assert.ok(auditComponentPlacements(COMPONENT_CONTRACTS,[{...base,host:"TABLE-COLUMN",child:"CHAT-SCREEN"}]).some(x=>x.includes("Chu trình placement")));
});

test("V41: main message sample uses COLUMN_SCHEMA, ds-table, and the existing ui-button",()=>{
 const source=read("web/src/message-parts.ts"),html=read("index.html");
 assert.ok(source.includes('import {COLUMN_SCHEMA,type ColumnSpec} from "./column-matrix.js"'));
 assert.ok(source.includes('const tableColumns:COLUMNKEY[]= ["name","quantity","total"]'));
 assert.ok(source.includes('element("table","ds-table ds-table--schema message-v41-table")'));
 assert.ok(source.includes('element("button","ui-button ui-button--secondary","Sao chép tin mẫu")'));
 assert.ok(source.includes('copy.closest<HTMLElement>'));
 assert.ok(source.includes('message.dataset.messageId=sampleId'));
 assert.ok(source.includes('auditMessageTree(message)'));
 for(const part of ["MESSAGE-CONTENT-PARTS","MESSAGE-TEXT-PART","MESSAGE-TABLE-PART","MESSAGE-MEDIA-PART","MESSAGE-MEDIA-TILE","CHAT-MESSAGE-ACTIONS"])
  assert.ok(source.includes('"'+part+'"'),part);
 assert.doesNotMatch(source,/\bfetch\s*\(|\bWebSocket\s*\(|\bXMLHttpRequest\b|supabase|getUserMedia\s*\(/i);
 assert.ok(html.includes('id="messageV41Preview"'));
 assert.ok(html.includes('id="simpleFrames"'));
 assert.equal((html.match(/data-message-v41-variant=/g)||[]).length,3);
 assert.ok(html.includes('data-ui-version="2027-UI-V42"'));
 assert.ok(html.includes('src="./web/dist-v42/app.js"'));
});

test("V41: source has one owner for message composition, no duplicate Button or Table CSS",()=>{
 const source=read("web/styles.css"),app=read("web/src/app.ts"),rules=read("RULES.md"),pages=read(".github/workflows/pages.yml");
 assert.ok(source.includes(".message-v41-parts{"));
 assert.ok(source.includes(".message-v41-table-scroll{"));
 assert.ok(source.includes(".message-v41-media{"));
 assert.ok(source.includes(".message-v41-actions{"));
 const added=source.slice(source.indexOf("/* UI-V41: composition geometry only;"),source.indexOf(".simple-component-contract{"));
 assert.doesNotMatch(added,/\.ui-button\s*\{|\.ds-table\s*\{/);
 assert.ok(app.includes('import { initMessagePartsGallery } from "./message-parts.js";'));
 assert.ok(app.includes("initMessagePartsGallery();"));
 assert.ok(pages.includes("cp -R web/dist _site/web/dist-v42"));
 assert.ok(rules.includes("## RULE 12 — XÁC ĐỊNH CHA"));
});
