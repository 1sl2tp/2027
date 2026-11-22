import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import ts from "typescript";
const read=p=>readFileSync(new URL("../"+p,import.meta.url),"utf8");
async function load(){
 const content=ts.transpileModule(read("web/src/icon-motion-gallery.ts"),{
  compilerOptions:{target:ts.ScriptTarget.ES2022,module:ts.ModuleKind.ESNext}
 }).outputText;
 return import("data:text/javascript;base64,"+Buffer.from(content).toString("base64"));
}
test("V43 sprite remains single source of icon truth, every categorized name exists once",async()=>{
 const {ICON_GROUPS}=await load();
 const svg=read("web/icons.svg");
 const symbols=[...svg.matchAll(/<symbol id="(ui-icon-[^"]+)"/g)].map(x=>x[1]);
 const catalog=ICON_GROUPS.flatMap(group=>group.icons).map(name=>"ui-icon-"+name);
 assert.equal(symbols.length,69);
 assert.equal(new Set(symbols).size,69);
 assert.equal(new Set(catalog).size,69);
 assert.deepEqual([...symbols].sort(),[...catalog].sort());
 for(const ref of ["arrow-down","paperclip","image","sparkles","clock","alert-circle","file-text"])
  assert.ok(symbols.includes("ui-icon-"+ref),ref);
});
test("V43 catalog classifies icon use by parent and has seven semantic motions",async()=>{
 const {ICON_GROUPS,MOTION_SPECIMENS}=await load();
 assert.equal(ICON_GROUPS.length,6);
 assert.ok(ICON_GROUPS.some(g=>g.owner.includes("Composer")));
 assert.ok(ICON_GROUPS.some(g=>g.owner.includes("Message")));
 assert.deepEqual(MOTION_SPECIMENS.map(x=>x.effect),
  ["fade","rise","scale","shimmer","dots","spin","pulse"]);
 assert.ok(MOTION_SPECIMENS.every(x=>x.owner&&x.trigger));
 const html=read("index.html"),app=read("web/src/app.ts");
 assert.ok(html.includes('id="iconV43Gallery"'));
 assert.ok(html.includes('id="motionV43Gallery"'));
 assert.ok(app.includes('initIconMotionGallery();'));
 assert.ok(app.includes('from "./icon-motion-gallery.js"'));
});
test("V43 jump-to-latest is arrow-only, counts unseen and belongs to MessageList",()=>{
 const html=read("index.html"),tsSrc=read("web/src/scroll-anchor.ts"),
  contracts=read("web/src/component-contracts.ts"),css=read("web/styles.css");
 const start=html.indexOf('id="scrollAnchorJump"');
 const end=html.indexOf("</button>",start);
 const button=html.slice(start,end);
 assert.ok(button.includes('data-ui-component="THREAD-JUMP-TO-LATEST"'));
 assert.ok(button.includes('aria-label="Về tin mới"'));
 assert.ok(button.includes("ui-icon-arrow-down"));
 assert.ok(button.includes('data-ui-component="THREAD-UNSEEN-COUNT"'));
 assert.ok(!button.includes(">Về tin mới</button>"),"no visual text label");
 assert.ok(tsSrc.includes("jump.hidden=pinned"));
 assert.ok(tsSrc.includes("count.hidden=unseen===0"));
 assert.ok(tsSrc.includes("count.textContent=unseen>99?"));
 assert.ok(tsSrc.includes('window.matchMedia?.("(prefers-reduced-motion: reduce)")'));
 assert.ok(tsSrc.includes('viewport.scrollTo({top:viewport.scrollHeight,behavior:reduced?"auto":"smooth"})'));
 assert.ok(contracts.includes('id:"THREAD-JUMP-TO-LATEST",parent:"CHAT-MESSAGE-LIST"'));
 assert.ok(contracts.includes('id:"THREAD-JUMP-ICON",parent:"THREAD-JUMP-TO-LATEST"'));
 assert.ok(css.includes("@keyframes ui-v43-jump-in"));
 assert.ok(css.includes(".ui-scroll-anchor-count[hidden]{display:none}"));
});
test("V43 motion preserves canonical styles, reduced-motion and safe backend boundary",()=>{
 const css=read("web/styles.css"),src=read("web/src/icon-motion-gallery.ts"),
  html=read("index.html"),ci=read(".github/workflows/pages.yml");
 assert.ok(css.includes("@media(prefers-reduced-motion:reduce)"));
 assert.ok(css.includes("animation:none!important"));
 assert.ok(css.includes("ui-v43-shimmer"));
 assert.ok(css.includes("ui-v43-dots"));
 assert.ok(src.includes('demo.classList.remove("is-playing")'));
 assert.ok(src.includes('navigator.clipboard.writeText'));
 assert.doesNotMatch(src,/\bfetch\s*\(|WebSocket|XMLHttpRequest|supabase|getUserMedia/i);
 assert.ok(html.includes('data-ui-version="2027-UI-V43"'));
 assert.ok(html.includes('src="./web/dist-v43/app.js"'));
 assert.ok(ci.includes("cp -R web/dist _site/web/dist-v43"));
 assert.ok(html.indexOf('id="githubSourcesV42"')>html.indexOf('id="motionV43Gallery"'));
});
