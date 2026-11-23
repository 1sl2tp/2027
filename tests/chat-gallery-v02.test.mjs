import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
const read=p=>readFileSync(new URL("../"+p,import.meta.url),"utf8");

test("CG-V02: one screen, one directory, one message list, one composer",()=>{
  const html=read("chat-gallery.html");
  for(const id of ["UI-LIBRARY","UI-SHELL","UI-SCREEN-SLOT","CHAT-SCREEN","CHAT-DIRECTORY","CHAT-REGION-TOP","CHAT-THREAD","CHAT-MESSAGE-LIST","CHAT-COMPOSER","COMPOSER-INPUT","COMPOSER-TOOLBAR"]){
   assert.ok(html.includes('data-ui-component="'+id+'"'),"missing parent or slot: "+id);
  }
  assert.equal((html.match(/data-ui-component="CHAT-COMPOSER"/g)||[]).length,1);
  assert.equal((html.match(/data-ui-component="CHAT-MESSAGE-LIST"/g)||[]).length,1);
  assert.equal((html.match(/data-ui-component="COMPOSER-SEND-BUTTON"/g)||[]).length,1);
  assert.equal((html.match(/data-ui-component="COMPOSER-INPUT"/g)||[]).length,1);
  for(const cls of ["ds-composer","ds-field","ds-summary","ui-button","ui-icon","ds-segmented"]){
   assert.ok(html.includes(cls),"uses existing 2027 class "+cls);
  }
});

test("CG-V02: slots change, primitive definitions remain canonical",()=>{
  const html=read("chat-gallery.html"),src=read("web/src/chat-gallery.ts"),css=read("web/styles.css");
  assert.ok(src.includes('import {COLUMN_SCHEMA,alignmentForRole,type ColumnSpec} from "./column-matrix.js"'));
  assert.ok(src.includes('import {auditComponentPlacements,auditComponentRegistry,auditMessageTree,auditComposerTree'));
  assert.ok(src.includes('col.style.width=field.minPx+"px"'));
  assert.ok(src.includes('mark(make("table","ds-table ds-table--schema"),"DATA-TABLE")'));
  assert.ok(src.includes('mark(make("div","ds-media-list cg2-media-part"),"MESSAGE-MEDIA-PART")'));
  assert.ok(src.includes('mark(make("button","ui-button ui-button--secondary"),"MESSAGE-COPY-BUTTON")'));
  for(const layout of ["two","three","focus"]){
   assert.ok(html.includes('data-layout="'+layout+'"'));
  }
  for(const device of ["desktop","phone","keyboard"]){
   assert.ok(html.includes('data-device="'+device+'"'));
  }
  assert.ok(css.includes("/* CG-V02: slots and layout composition only."));
  const suffix=css.slice(css.indexOf("/* CG-V02: slots and layout composition only."));
  assert.doesNotMatch(suffix,/\.ui-button\s*\{|\.ds-table\s*\{|\.ds-composer\s*\{|\.ds-field\s*\{/,"no duplicate library primitive rules");
  assert.doesNotMatch(src,/\bfetch\s*\(|\bWebSocket\s*\(|\bXMLHttpRequest\b|supabase|localStorage/gi);
});
