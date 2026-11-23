import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
const read=p=>readFileSync(new URL("../"+p,import.meta.url),"utf8");

const sources=[
 ["vercel/streamdown","Apache-2.0","Ưu tiên nghiên cứu"],
 ["chakra-ui/zag","MIT","Ưu tiên nghiên cứu"],
 ["dip/cmdk","MIT","Đối chiếu"],
 ["bvaughn/react-resizable-panels","MIT","Đối chiếu"],
 ["petyosi/react-virtuoso","Message List thương mại","Hạn chế giấy phép"],
 ["emilkowalski/vaul","unmaintained","Không chọn triển khai"]
];
test("V45 new source choices are verified, categorized, and expose licensing/maintenance blockers",()=>{
 const html=read("github-sources.html"),doc=read("references/UI_V45_GITHUB_DESIGN_INDEPENDENCE.md");
 const part=html.slice(html.indexOf('id="source-map"'),html.indexOf('id="source-playground"'));
 assert.ok(html.includes("SOURCE-V03"));
 assert.equal((part.match(/<tr><td><a href="https:\/\/github\.com\//g)||[]).length,19);
 for(const [repo,license,status] of sources){
  assert.ok(part.includes("https://github.com/"+repo),repo);
  assert.ok(part.includes(status),status);
  assert.ok(doc.includes(repo),repo);
  assert.ok(doc.includes(license),repo+" license/maintenance");
 }
 assert.ok(doc.includes("https://virtuoso.dev/message-list/licensing/"));
 assert.ok(doc.includes("Vaul"));
 assert.ok(doc.includes("unmaintained"));
 assert.ok(doc.includes("CHAT/TAPHOA"));
});
test("V45: business-flow references cannot be misrepresented as UI source of truth",()=>{
 const html=read("index.html"),rules=read("RULES.md"),doc=read("references/UI_V45_GITHUB_DESIGN_INDEPENDENCE.md");
 assert.ok(html.includes("CHAT/TAPHOA chỉ dùng để hiểu luồng nghiệp vụ cũ"));
 assert.ok(rules.includes("### 12.11. V45"));
 assert.ok(rules.includes("không phải nguồn thiết kế chuẩn"));
 assert.ok(doc.includes("WHAT"));
 assert.ok(doc.includes("HOW IT LOOKS"));
 const sect=html.indexOf('id="githubSourcesV42"'),prev=html.indexOf('id="cssPreview"');
 const footer=html.indexOf('<footer class="page-footer">',sect);
 assert.ok(prev>=0&&sect>prev&&footer>sect,"GitHub sources remain at the end of the UI library");
 for(const [repo] of sources) assert.ok(html.includes("https://github.com/"+repo));
 assert.ok(html.includes("github-v45-policy"));
 assert.ok(html.includes("2027-UI-V47"));
 assert.ok(html.includes("web/dist-v47/app.js"));
});
test("V45: no duplicated core CSS or package installs; CI packages a distinct asset path",()=>{
 const css=read("web/styles.css"),pkg=JSON.parse(read("package.json")),
  workflow=read(".github/workflows/pages.yml"),html=read("index.html");
 const v45=css.slice(css.indexOf("/* V45: Source decision prose at the bottom"));
 assert.ok(v45.includes(".github-v45-policy"));
 assert.doesNotMatch(v45,/\.ui-button\s*\{|\.ds-table\s*\{|\.ds-composer\s*\{|\.ui-icon\s*\{/);
 assert.deepEqual(Object.keys(pkg.dependencies||{}),[]);
 assert.ok(workflow.includes("cp -R web/dist _site/web/dist-v46"));
 assert.ok(html.includes('src="./web/dist-v47/app.js"'));
 assert.ok(html.includes('href="./web/styles.css?v=2027-UI-V47"'));
});
