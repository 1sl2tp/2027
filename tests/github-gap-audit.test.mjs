import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
const read=p=>readFileSync(new URL("../"+p,import.meta.url),"utf8");

test("V41 audit checks new and deeper GitHub sources without calling them ChatGPT internals",()=>{
 const doc=read("references/GITHUB_UI_UX_COMPONENT_GAPS_V41.md");
 for(const source of [
  "TanStack/virtual","petyosi/react-virtuoso","assistant-ui/assistant-ui",
  "radix-ui/primitives","floating-ui/floating-ui","bvaughn/react-resizable-panels",
  "dip/cmdk","motiondivision/motion","formkit/auto-animate"
 ])assert.ok(doc.includes(source),"missing evidence "+source);
 assert.ok(doc.includes("V40"));
 assert.ok(doc.includes("chưa triển khai"));
 assert.ok(doc.includes("@virtuoso.dev/message-list"));
 assert.ok(doc.includes("thương mại"));
 assert.ok(doc.includes("Vaul"));
 assert.ok(doc.includes("unmaintained"));
});

test("V41 source candidates are children or utilities of established R12 parents",()=>{
 const doc=read("references/GITHUB_UI_UX_COMPONENT_GAPS_V41.md");
 for(const role of [
  "CHAT-THREAD","CHAT-MESSAGE-LIST","CHAT-MESSAGE","CHAT-COMPOSER",
  "DATA-TABLE","OVERLAY-ROOT","WORKSPACE","COMMAND-POPOVER",
  "SEARCH-PANEL","MEDIA-GRID","MESSAGE-ACTIONS"
 ])assert.ok(doc.includes(role),"missing parent candidate "+role);
 for(const phrase of [
  "cardinality","Owner","CSS","chưa có","Một phần",
  "không tạo","không gửi","scroll"
 ])assert.ok(doc.toLowerCase().includes(phrase.toLowerCase()),"missing audit discipline "+phrase);
 assert.ok(doc.includes("## 2. Gap matrix"));
 assert.ok(doc.includes("## 3. Gating"));
});

test("V41 extends RULE 12 and README: main page is published as V41",()=>{
 const html=read("index.html"),rules=read("RULES.md"),readme=read("README.md");
 assert.ok(rules.includes("### 12.5. Kiểm kê nguồn V41"));
 assert.ok(rules.includes("## RULE 12"));
 assert.ok(!rules.includes("## RULE 13"));
 assert.ok(readme.includes("GITHUB_UI_UX_COMPONENT_GAPS_V41.md"));
 assert.ok(readme.includes("UI-V46"));
 assert.ok(html.includes('data-ui-version="2027-UI-V46"'));
 assert.ok(html.includes('<span class="version">V45</span>'));
 assert.ok(html.includes('src="./web/dist-v46/app.js"'));
});
