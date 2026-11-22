import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
const read=(file)=>readFileSync(new URL("../"+file,import.meta.url),"utf8");

test("V32 has a Section 7 motion library and six stable, classified examples",()=>{
 const html=read("index.html"),src=read("web/src/text-motion.ts"),app=read("web/src/app.ts");
 assert.ok(html.includes('id="simpleMotion"'));
 assert.ok(html.includes('id="uiMotionItems"'));
 assert.ok(html.includes('7. Chữ đang chạy & trạng thái tải'));
 assert.ok(html.includes('href="#simpleMotion"'));
 const ids=[...src.matchAll(/id:"(MOTION-\d{2})",title:/g)].map(m=>m[1]);
 assert.deepEqual(ids,Array.from({length:6},(_,i)=>"MOTION-"+String(i+1).padStart(2,"0")));
 for(const kind of ['"dots"','"shimmer"','"skeleton"','"words"','"chunks"','"lifecycle"'])
   assert.ok(src.includes("kind:"+kind),"missing demo "+kind);
 assert.ok(app.includes('import { initTextMotionGallery } from "./text-motion.js";'));
 assert.ok(app.includes("initTextMotionGallery();"));
});

test("V32 demo renders actual supplied text and has bounded waiting/streaming states",()=>{
 const src=read("web/src/text-motion.ts");
 for(const state of ["idle","waiting","streaming","complete","cancelled"])
   assert.ok(src.includes('"'+state+'"'),"missing "+state);
 assert.ok(src.includes('const DEMO_TEXT='));
 assert.ok(src.includes('const DEMO_CHUNKS='));
 assert.ok(src.includes('DEMO_TEXT.match(/\\S+\\s*/gu)'),"unicode words stay intact");
 assert.ok(src.includes('copy.textContent+=batch'),"text added only from existing demo chunks");
 assert.ok(src.includes('inst.region.replaceChildren()'),"reset before replay");
 assert.ok(src.includes("clearTimers(inst)"),"running timers cleared when stopping or resetting");
 assert.ok(src.includes('inst.region.querySelectorAll(".ui-motion-dots,.ui-motion-shimmer,.ui-motion-skeleton,.ui-motion-caret")'),"motion nodes cleaned on stop");
 assert.ok(src.includes('document.addEventListener("visibilitychange"'));
 assert.ok(src.includes('window.addEventListener("pagehide"'));
 assert.ok(src.includes('applyState(inst,"cancelled","Đã dừng · chưa hoàn tất.")'),"cancel is never success");
 assert.ok(src.includes('cursor.remove();finish(inst'),"caret removed at completion");
 assert.doesNotMatch(src,/\bfetch\s*\(|\bWebSocket\s*\(|\bEventSource\s*\(|\bXMLHttpRequest\b|\bsupabase\b/i,"no network/real data");
 assert.doesNotMatch(src,/\.innerHTML\s*=|insertAdjacentHTML|document\.write\s*\(/,"no HTML injection from partial text");
});

test("V32 honors motion preference and uses existing ui-button with accessible statuses",()=>{
 const src=read("web/src/text-motion.ts"),css=read("web/styles.css");
 assert.ok(src.includes('window.matchMedia("(prefers-reduced-motion: reduce)")'));
 assert.ok(src.includes('applyState(inst,"complete","Hoàn tất · giảm chuyển động, không chạy hiệu ứng.")'));
 assert.ok(src.includes('status.setAttribute("role","status")'));
 assert.ok(src.includes('status.setAttribute("aria-live","polite")'));
 assert.ok(src.includes('region.setAttribute("aria-busy"')||src.includes('inst.region.setAttribute("aria-busy"'));
 assert.ok(src.includes('element("button","ui-button ui-button--secondary"'));
 assert.ok(src.includes('element("button","ui-button ui-button--quiet"'));
 assert.ok(css.includes("@media(prefers-reduced-motion:reduce)"));
 for(const className of ["ui-motion-dots","ui-motion-shimmer","ui-motion-skeleton","ui-motion-caret"])
   assert.ok(css.includes("."+className),"missing animation class "+className);
 assert.ok(css.includes('.ui-motion-controls .ui-button{min-height:var(--ui-control-hit)}'));
 assert.ok(css.includes("animation:none!important"),"motion genuinely reduces");
 assert.doesNotMatch(css,/--ds-btn-|--ui-motion-button-/,"does not create duplicate button tokens");
});

test("V32 distinguishes external research from the local-only demo",()=>{
 const rules=read("RULES.md"),html=read("index.html"),workflow=read(".github/workflows/pages.yml");
 assert.ok(rules.includes("## RULE 11 — HIỆU ỨNG CHỮ KHI CHỜ VÀ STREAMING"));
 for(const ref of ["vercel/streamdown","assistant-ui/assistant-ui","lobehub/streamdown",
    "vercel/ai-elements","openai/apps-sdk-ui","mrigankad/Lumi-UI"]){
   assert.ok(rules.includes(ref),"rule source "+ref);
   assert.ok(html.includes('https://github.com/'+ref),"visible source "+ref);
 }
 assert.ok(rules.includes("không phải thư viện giao diện ChatGPT nội bộ"));
 assert.ok(html.includes('data-ui-version="2027-UI-V41"'));
 assert.ok(html.includes('src="./web/dist-v41/app.js"'));
 assert.ok(workflow.includes("cp -R web/dist _site/web/dist-v41"));
});
