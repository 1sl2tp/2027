import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import ts from "typescript";
const read=p=>readFileSync(new URL("../"+p,import.meta.url),"utf8");
async function helper(){
 const compiled=ts.transpileModule(read("web/src/scroll-preserve.ts"),{
  compilerOptions:{target:ts.ScriptTarget.ES2022,module:ts.ModuleKind.ESNext}
 }).outputText;
 return import("data:text/javascript;base64,"+Buffer.from(compiled).toString("base64"));
}
test("V42: a stable message ID anchors the visible item before an insert",async()=>{
 const {captureVisibleAnchor,restoreVisibleAnchor}=await helper();
 let shift=0;
 const viewport={scrollTop:100,getBoundingClientRect:()=>({top:0,bottom:200})};
 const m1={dataset:{messageId:"first"},getBoundingClientRect:()=>({top:20+shift-(viewport.scrollTop-100),bottom:100+shift-(viewport.scrollTop-100)})};
 const m2={dataset:{messageId:"second"},getBoundingClientRect:()=>({top:110+shift-(viewport.scrollTop-100),bottom:190+shift-(viewport.scrollTop-100)})};
 viewport.querySelectorAll=()=>[m1,m2];
 const anchor=captureVisibleAnchor(viewport);
 assert.deepEqual(anchor,{id:"first",top:20});
 shift=120;
 assert.equal(restoreVisibleAnchor(viewport,anchor),true);
 assert.equal(viewport.scrollTop,220);
 assert.equal(restoreVisibleAnchor(viewport,{id:"missing",top:0}),false);
});
test("V42: two scroll operations are owned by the existing message list",()=>{
 const src=read("web/src/scroll-anchor.ts"),html=read("index.html"),css=read("web/styles.css");
 for(const id of ["scrollAnchorPrepend","scrollAnchorReflow","scrollAnchorViewport","scrollAnchorJump"])
  assert.ok(html.includes('id="'+id+'"'));
 assert.ok(src.includes("viewport.prepend(...batch)"));
 assert.ok(src.includes("restoreVisibleAnchor(viewport,snapshot)"));
 assert.ok(src.includes("const resizeObserver=typeof ResizeObserver"));
 assert.ok(src.includes("anchor=captureVisibleAnchor(viewport)"));
 assert.ok(css.includes("overflow-anchor:none"));
 assert.ok(css.includes(".ui-scroll-anchor-message.is-expanded::after"));
 assert.doesNotMatch(src,/\bfetch\s*\(|\bWebSocket\s*\(|XMLHttpRequest|supabase/i);
});
test("V42: GitHub sources are the final content section, not inside UI samples",()=>{
 const html=read("index.html"),a=html.indexOf('id="simpleKit"');
 const b=html.indexOf('id="sourceCss"'),c=html.indexOf('id="githubSourcesV42"');
 const d=html.indexOf('<footer class="page-footer">',c);
 assert.ok(a>=0&&b>a&&c>b&&d>c);
 for(const n of ["architects-toolkit/chat-ui","loquix-dev/loquix","microsoft/open-kosmos","LibreChat-AI/LibreChat"])
  assert.ok(html.includes("https://github.com/"+n),n);
 assert.ok(html.includes('data-ui-version="2027-UI-V45"'));
 assert.ok(html.includes('src="./web/dist-v45/app.js"'));
 assert.ok(read(".github/workflows/pages.yml").includes("cp -R web/dist _site/web/dist-v45"));
});
