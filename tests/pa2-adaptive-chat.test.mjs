import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";

const read=path=>readFileSync(new URL("../"+path,import.meta.url),"utf8");
const src=read("web/src/master-library-v46.ts");
const css=read("web/styles.css");

test("PA2 uses one canonical Chat screen with Directory, Thread and optional Context",()=>{
 for(const id of ["CHAT-SCREEN","CHAT-DIRECTORY","DIRECTORY-TOOLS","DIRECTORY-SEARCH",
  "DIRECTORY-LIST","DIRECTORY-CONTACT-ROW","CHAT-REGION-TOP","CHAT-THREAD",
  "CHAT-MESSAGE-LIST","CHAT-COMPOSER","CHAT-WORK-REGION"])
  assert.ok(src.includes('"'+id+'"'),id);
 assert.ok(src.includes("screen.append(directory,conversation,contextPanel)"));
 assert.ok(src.includes('contextPanel.hidden=true'));
 assert.ok(src.includes('screen.dataset.contextOpen="false"'));
 assert.ok(src.includes('screen.dataset.mobileView="directory"'));
 assert.ok(src.includes('screen.dataset.mobileView="thread"'));
 assert.ok(src.includes('screen.dataset.mobileView="context"'));
});
test("PA2 maintains local per-contact draft and message state; no real send/network",()=>{
 assert.ok(src.includes('const drafts:Record<ContactKey,string>'));
 assert.ok(src.includes("drafts[active]=input.value"));
 assert.ok(src.includes("input.value=drafts[id]"));
 assert.ok(src.includes("samples[active].push"));
 assert.ok(src.includes("list.replaceChildren"));
 assert.doesNotMatch(src,/\bfetch\s*\(|XMLHttpRequest|WebSocket|\.innerHTML\s*=|sendMessage\s*\(/);
});
test("PA2 mobile has only one visible panel and no extra fixed viewport owner",()=>{
 assert.ok(css.includes(".master-v46-preview{border:1px solid var(--ui-border);border-radius:12px;min-width:0;overflow:hidden;container-type:inline-size}"));
 const first=css.indexOf(".master-v46-chat{"),last=css.indexOf(".master-v46-product-list{",first);
 const pa2=css.slice(first,last);
 assert.ok(pa2.includes("grid-template-columns:clamp(194px,28%,250px) minmax(0,1fr)"));
 assert.ok(pa2.includes("@container (max-width:620px)"));
 assert.ok(pa2.includes('[data-mobile-view="directory"] .master-v46-conversation'));
 assert.ok(pa2.includes('[data-mobile-view="thread"] .master-v46-directory'));
 assert.ok(pa2.includes('[data-mobile-view="context"] .master-v46-conversation'));
 assert.ok(pa2.includes('.master-v46-context[hidden]{display:none}'));
 assert.ok(pa2.includes("overscroll-behavior:contain"));
 assert.doesNotMatch(pa2,/position:fixed|height:100(?:dvh|svh)|\bscrollTop\s*=(?!=)/);
});
