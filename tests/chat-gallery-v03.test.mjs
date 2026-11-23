import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
const read=path=>readFileSync(new URL("../"+path,import.meta.url),"utf8");

test("CG-V03: Composer has one labeled textarea and one native submit",()=>{
 const html=read("chat-gallery.html");
 const script=read("web/src/chat-gallery.ts");
 assert.ok(html.includes('data-ui-version="2027-CG-V03"'));
 assert.ok(html.includes('<label for="cg2Input" class="cg2-sr-only">'));
 assert.equal((html.match(/id="cg2Input"/g)||[]).length,1);
 assert.equal((html.match(/data-ui-component="COMPOSER-SEND-BUTTON"/g)||[]).length,1);
 assert.ok(script.includes('input.addEventListener("keydown",event=>{'));
 assert.ok(script.includes('event.key!=="Enter"||event.shiftKey'));
 assert.ok(script.includes("event.preventDefault()"));
 assert.ok(script.includes("event.isComposing||event.keyCode===229"));
 assert.ok(script.includes("form.requestSubmit()"));
 assert.ok(script.includes('form.addEventListener("submit",e=>{'));
});

test("CG-V03: existing table primitive remains keyboard scrollable with proper caption",()=>{
 const script=read("web/src/chat-gallery.ts");
 assert.ok(script.includes('const root=make("div","ds-table-scroll cg2-table-slot")'));
 assert.ok(script.includes("root.tabIndex=0"));
 assert.ok(script.includes('root.setAttribute("role","region")'));
 assert.ok(script.includes('root.setAttribute("aria-labelledby",caption.id)'));
 assert.ok(script.includes('table.append(caption)'));
 assert.ok(script.includes('mark(make("table","ds-table ds-table--schema"),"DATA-TABLE")'));
 assert.ok(script.includes('col.style.width=field.minPx+"px"'));
 assert.doesNotMatch(script,/\bfetch\s*\(|\bWebSocket\s*\(|\bXMLHttpRequest\b|supabase/i);
});
