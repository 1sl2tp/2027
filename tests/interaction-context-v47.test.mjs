import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import ts from "typescript";
const read=path=>readFileSync(new URL("../"+path,import.meta.url),"utf8");
async function policy(){
 const out=ts.transpileModule(read("web/src/interaction-context-v47.ts"),{compilerOptions:{
  target:ts.ScriptTarget.ES2022,module:ts.ModuleKind.ESNext
 }}).outputText;
 return import("data:text/javascript;base64,"+Buffer.from(out).toString("base64"));
}
test("V47: only one interrupting notification surface in each chat context",async()=>{
 const {CHAT_FEEDBACK_V47,decideChatFeedbackV47}=await policy();
 assert.deepEqual(Object.keys(CHAT_FEEDBACK_V47),["locked","directory","same","other","keyboard"]);
 const expected={
  locked:{system:true,inbox:false,thread:false,toast:false,secondaryActions:false,typing:false},
  directory:{system:false,inbox:true,thread:false,toast:false,secondaryActions:false,typing:false},
  same:{system:false,inbox:false,thread:true,toast:false,secondaryActions:true,typing:false},
  other:{system:false,inbox:true,thread:true,toast:true,secondaryActions:true,typing:false},
  keyboard:{system:false,inbox:false,thread:true,toast:false,secondaryActions:false,typing:true}
 };
 for(const [key,flags] of Object.entries(expected)){
  const actual=decideChatFeedbackV47(key);
  for(const [flag,value] of Object.entries(flags))
   assert.equal(actual[flag],value,key+"/"+flag);
  assert.ok(actual.label&&actual.description);
  assert.ok(!(actual.system&&actual.toast),"never double-interrupt the user");
 }
});
test("V47 follows the existing 2027 parent/component hierarchy and one CSS owner",()=>{
 const html=read("index.html"),css=read("web/styles.css"),app=read("web/src/app.ts"),
       source=read("web/src/interaction-context-v47.ts"),contracts=read("web/src/component-contracts.ts");
 assert.ok(html.includes('id="uxContextV47"'));
 assert.ok(html.includes('data-ui-component="CHAT-CONTEXT-FEEDBACK"'));
 assert.ok(contracts.includes('id:"CHAT-CONTEXT-FEEDBACK",parent:"CHAT-SCREEN"'));
 assert.ok(html.includes('data-ui-component="UI-SHELL"'));
 assert.ok(html.includes('data-ui-component="UI-SCREEN-SLOT"'));
 assert.ok(html.includes('data-ui-component="CHAT-SCREEN"'));
 for(const key of ["locked","directory","same","other","keyboard"])
  assert.ok(html.includes('data-chat-context-v47="'+key+'"'),key);
 for(const surface of ["system","inbox","thread","toast","secondaryActions","typing"])
  assert.ok(html.includes('data-v47-surface="'+surface+'"'),surface);
 assert.ok(css.includes(".ui-v47-controls .ui-button"));
 assert.ok(css.includes("var(--ui-border)"));
 assert.ok(css.includes("var(--ui-text)"));
 assert.ok(app.includes('import {initChatContextV47} from "./interaction-context-v47.js"'));
 assert.ok(app.includes("initChatContextV47();"));
 assert.ok(source.includes('button.setAttribute("aria-pressed"'));
 assert.ok(source.includes('el.hidden=!scenario[key]'));
 assert.ok(source.includes("render(\"directory\")"));
 assert.doesNotMatch(source,/\b(fetch|WebSocket|XMLHttpRequest|showNotification|sendMessage|Notification\.requestPermission)\s*\(/);
 assert.doesNotMatch(source,/\.innerHTML\s*=|insertAdjacentHTML|document\.write/);
});
test("V47 is a separately versioned public 2027 demo, not CHAT production",()=>{
 const html=read("index.html"),workflow=read(".github/workflows/pages.yml"),
       rules=read("RULES.md");
 assert.ok(html.includes('data-ui-version="2027-UI-V47"'));
 assert.ok(html.includes('src="./web/dist-v47/app.js"'));
 assert.ok(workflow.includes("cp -R web/dist _site/web/dist-v47"));
 assert.ok(rules.includes("### 12.13. V47"));
 assert.ok(rules.includes("E4"));
 assert.ok(!html.includes('src="./app.js"'));
});
