import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
const read=path=>readFileSync(new URL("../"+path,import.meta.url),"utf8");

test("CG-V04: single composed preview supports narrowing without duplicate panels",()=>{
 const html=read("chat-gallery.html");
 const css=read("web/styles.css");
 assert.ok(html.includes('data-ui-version="2027-CG-V04"'));
 for(const region of ["CHAT-DIRECTORY","CHAT-THREAD","CHAT-WORK-REGION"]){
  assert.equal((html.match(new RegExp('data-ui-component="'+region+'"',"g"))||[]).length,1);
 }
 assert.ok(css.includes(".cg2-device{container:cg2-preview / inline-size;transition:none}"));
 assert.ok(css.includes("@container cg2-preview (max-width:920px)"));
 assert.ok(css.includes(".cg2-device[data-device=desktop][data-layout=three] .cg2-screen{grid-template-columns:265px minmax(0,1fr)}"),"only desktop may use the two-column collapsed three-region layout");
 assert.ok(css.includes(".cg2-device[data-device=phone] .cg2-screen,.cg2-device[data-device=keyboard] .cg2-screen{grid-template-columns:minmax(0,1fr)"),"phone/keyboard remain single-column");
 assert.ok(css.includes("@container cg2-preview (max-width:650px)"));
 assert.ok(css.includes('[data-device=desktop][data-mobile-view=directory] .cg2-directory'));
 assert.ok(css.includes('.cg2-device[data-layout=focus] .cg2-back{display:none}'));
});

test("CG-V04: thread draft state is keyed by contact and keyboard simulation preserves scroll",()=>{
 const src=read("web/src/chat-gallery.ts");
 assert.ok(src.includes('const drafts:Record<ContactId,string>={a:"",b:"",group:""}'));
 assert.ok(src.includes('const scrollPositions:Partial<Record<ContactId,number>>={}'));
 assert.ok(src.includes("rememberScrollPosition();"));
 assert.ok(src.includes("input.value=drafts[id];"));
 assert.ok(src.includes('input.addEventListener("input",()=>{drafts[contact]=input.value;});'));
 assert.ok(src.includes('drafts[contact]="";delete scrollPositions[contact];'));
 assert.ok(src.includes("const wasAtBottom=remaining<=80;"));
 assert.ok(src.includes('messageList.scrollTop=wasAtBottom?messageList.scrollHeight:before;'));
 assert.ok(src.includes('jump.hidden=true;'));
});

test("CG-V04: actions remain owned by Message and do not take idle space",()=>{
 const src=read("web/src/chat-gallery.ts");
 const css=read("web/styles.css");
 assert.ok(src.includes('target.classList.toggle("cg2-actions-open")'));
 assert.ok(src.includes('message.classList.toggle("cg2-actions-open")'));
 assert.ok(src.includes('"CHAT-MESSAGE-ACTIONS"'));
 assert.ok(css.includes(".cg2-message-actions{display:none;opacity:1}"));
 assert.ok(css.includes(".cg2-message.cg2-actions-open .cg2-message-actions{display:flex}"));
 assert.ok(css.includes(".cg2-jump[hidden]{display:none!important}"));
 assert.ok(css.includes(".cg2-composer textarea{resize:none;height:auto;overflow-y:auto}"));
 assert.ok(css.includes("@supports (field-sizing:content)"));
 assert.doesNotMatch(css.slice(css.indexOf("/* CG-V04: only owner-level responsive composition")),/\n\.ui-button\s*\{|\n\.ds-composer\s*\{|\n\.ds-table\s*\{/);
});
