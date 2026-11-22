import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
const read=(file)=>readFileSync(new URL("../"+file,import.meta.url),"utf8");

test("V33 adds 1–8 columns to existing tables category, not a separate UI system",()=>{
 const html=read("index.html"),app=read("web/src/app.ts"),rules=read("RULES.md");
 const source=read("web/src/column-matrix.ts");
 assert.ok(html.includes('id="sample-tables"'));
 for(const id of ["tableColumnMatrixCard","columnMatrix","columnMatrixCount","columnMatrixMode","columnMatrixWidth","columnMatrixPreview","columnMatrixCopy","columnMatrixStatus"])
  assert.ok(html.includes('id="'+id+'"'),"missing table gallery control "+id);
 assert.ok(html.includes("Bảng từ 1 đến 8 cột"));
 assert.ok(app.includes('import { initColumnMatrix } from "./column-matrix.js";'));
 assert.ok(app.includes("initColumnMatrix();"));
 assert.ok(source.includes('className="ds-table ds-table--schema"')===false,"no disconnected stylesheet");
 assert.ok(source.includes('"ds-table ds-table--schema"'));
 assert.ok(source.includes('"ds-table-scroll ui-column-table-zone"'));
 assert.ok(rules.includes("### 9.5. Mở rộng V33: bảng linh hoạt từ 1 đến 8 cột"));
 assert.ok(rules.includes("### 11.5. Rà soát V33"));
 assert.ok(!rules.includes("## RULE 12"),"extend existing rules");
});

test("V33 one 8-column schema drives semantic table and labeled card projections",()=>{
 const src=read("web/src/column-matrix.ts");
 const specs=[...src.matchAll(/\{key:"([^"]+)",label:"([^"]+)",role:"([^"]+)",priority:"([^"]+)"\}/g)];
 assert.equal(specs.length,8);
 assert.deepEqual(specs.map(x=>x[1]),["name","quantity","price","total","status","date","group","note"]);
 assert.deepEqual(specs.map(x=>x[3]),["text","quantity","money","money","status","date","text","note"]);
 assert.equal(specs[0][4],"primary");
 assert.ok(specs.slice(1).every(x=>x[4]==="secondary"));
 assert.ok(src.includes("COLUMN_SCHEMA.slice(0,state.count)"));
 assert.ok(src.includes('buildTable(columns,rows,state,render)'));
 assert.ok(src.includes('buildCards(columns,rows)'));
 assert.ok(src.includes('currentTable.outerHTML'),"export from the same preview semantic table");
 assert.ok(src.includes("table.append(caption)"),"accessible table caption");
 assert.ok(src.includes('th.scope="col"'),"semantic headers");
 assert.ok(src.includes('th.setAttribute("aria-sort"'),"sensible sortable header");
 assert.ok(src.includes("dl.append(textElement"),"accessible labeled cards");
 assert.ok(src.includes('scroll.tabIndex=0'),"keyboard can reach horizontal scroller");
 assert.ok(src.includes('scroll.setAttribute("role","region")'));
 assert.ok(src.includes('use.setAttribute("href","./web/icons.svg#ui-icon-chevron")'),"sort icon from shared SVG");
 assert.ok(src.includes('new Intl.NumberFormat("vi-VN")'),"numeric locale");
 assert.doesNotMatch(src,/\.innerHTML\s*=|insertAdjacentHTML|document\.write\s*\(/);
 assert.doesNotMatch(src,/\bfetch\s*\(|\bWebSocket\s*\(|\bXMLHttpRequest\b|\bsupabase\b/i);
});

test("V33 schema aligns by role, responsive table/card and sticky primary without data loss",()=>{
 const css=read("web/styles.css"),src=read("web/src/column-matrix.ts"),html=read("index.html");
 assert.ok(css.includes(".ds-table.ds-table--schema"));
 for(const role of ["quantity","money","date","status","text","note"])
  assert.ok(css.includes('data-col-role="'+role+'"'),"missing semantic alignment "+role);
 assert.ok(css.includes('@container column-preview (max-width:480px)'),"container-size responsive, not just viewport");
 assert.ok(css.includes('.ui-column-projection[data-mode="auto"][data-many="true"] .ui-column-table-zone{display:none}'));
 assert.ok(css.includes('.ui-column-projection[data-mode="auto"][data-many="true"] .ui-column-card-zone{display:block}'));
 assert.ok(css.includes('.ui-column-projection[data-mode="cards"] .ui-column-card-zone{display:block}'));
 assert.ok(css.includes('.ds-table.ds-table--schema[data-wide="true"] :is(th,td):first-child'));
 assert.ok(src.includes('const widthForCount=[0,245,355,475,620,755,880,1010,1170]'));
 assert.ok(src.includes('state.width==="mobile"'));
 assert.ok(src.includes('state.mode==="auto"'));
 assert.ok(src.includes('state.mode==="scroll"'));
 assert.ok(html.includes('<option value="cards">Thẻ có nhãn</option>'));
 assert.ok(!src.includes("display:none"),"column data must not be silently dropped by JS");
});

test("V33 source audit distinguishes real GitHub capabilities and 2027 decisions",()=>{
 const s=read("references/GITHUB_COMPONENT_TABLE_EFFECT_AUDIT_V33.md"),html=read("index.html"),workflow=read(".github/workflows/pages.yml");
 for(const name of ["assistant-ui/assistant-ui","vercel/streamdown","lobehub/streamdown","vercel/ai-elements","openai/apps-sdk-ui","mrigankad/Lumi-UI"])
  assert.ok(s.includes(name),"repo attribution "+name);
 assert.ok(s.includes("TanStack"));
 assert.ok(s.includes("W3C WAI"));
 assert.ok(s.includes("Đây là quy tắc đề xuất cho 2027"));
 assert.ok(html.includes('data-ui-version="2027-UI-V33"'));
 assert.ok(html.includes('src="./web/dist-v33/app.js"'));
 assert.ok(workflow.includes("cp -R web/dist _site/web/dist-v33"));
 assert.ok(workflow.includes("ET.parse('web/icons.svg')"));
});
