import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
const read=file=>readFileSync(new URL("../"+file,import.meta.url),"utf8");

test("V34 keeps one schema driven table gallery with controls for axes, borders and gap",()=>{
 const html=read("index.html"),app=read("web/src/app.ts"),rules=read("RULES.md");
 const src=read("web/src/column-matrix.ts");
 for(const id of ["tableColumnMatrixCard","columnMatrix","columnMatrixCount","columnMatrixMode",
  "columnMatrixWidth","columnMatrixBorders","columnMatrixDensity","columnMatrixPreview","columnMatrixCopy","columnMatrixStatus"])
   assert.ok(html.includes('id="'+id+'"'),id);
 for(const label of ["STT","Tên hàng","Số","Số lượng","Đơn giá","Thành tiền"])
   assert.ok(html.includes(label),"missing explicit example "+label);
 assert.ok(html.includes("Bảng từ 1 đến 8 cột"));
 assert.ok(app.includes('import { initColumnMatrix } from "./column-matrix.js";'));
 assert.ok(app.includes("initColumnMatrix();"));
 assert.ok(src.includes('"ds-table ds-table--schema"'));
 assert.ok(src.includes('"ds-table-scroll ui-column-table-zone"'));
 assert.ok(rules.includes("### 9.5. Mở rộng V33"));
 assert.ok(rules.includes("### 9.6. V34"));
 assert.ok(!rules.includes("## RULE 12"),"use one existing rule owner");
});

test("V34 six-column sample is STT/Tên/Số/SL/Đơn giá/Thành tiền with 8 columns available",()=>{
 const src=read("web/src/column-matrix.ts");
 const specs=[...src.matchAll(/\{key:"([^"]+)",label:"([^"]+)",role:"([^"]+)",priority:"([^"]+)",minPx:(\d+)\}/g)];
 assert.equal(specs.length,8);
 assert.deepEqual(specs.map(x=>x[1]),["index","name","number","quantity","price","total","status","note"]);
 assert.deepEqual(specs.map(x=>x[2]),["STT","Tên hàng","Số","Số lượng","Đơn giá","Thành tiền","Trạng thái","Ghi chú"]);
 assert.deepEqual(specs.map(x=>x[3]),["index","text","number","quantity","money","money","status","note"]);
 assert.deepEqual(specs.slice(0,6).map(x=>Number(x[5])),[52,186,70,88,128,140]);
 assert.equal(specs[1][4],"primary");
 assert.ok(src.includes('count:6,mode:"scroll",width:"mobile",borders:"grid"'),"default keeps the six axes visible by scrolling on mobile");
 const rows=[...src.matchAll(/index:(\d+),name:"[^"]+",number:(\d+),quantity:(\d+),price:(\d+),total:(\d+)/g)];
 assert.equal(rows.length,4);
 for(const row of rows)assert.equal(Number(row[3])*Number(row[4]),Number(row[5]),"quantity x unit price = total");
});

test("V34 colgroup defines one track for thead and tbody; role sets alignment",()=>{
 const src=read("web/src/column-matrix.ts"),css=read("web/styles.css");
 assert.ok(src.includes('const group=node("colgroup")'));
 assert.ok(src.includes('const track=node("col")'));
 assert.ok(src.includes('track.style.width=(100*col.minPx/minWidth).toFixed(4)+"%"'));
 assert.ok(src.includes('table.style.minWidth=minWidth+"px"'));
 assert.ok(src.includes('th.scope="col"'));
 assert.ok(src.includes('th.setAttribute("aria-sort"'));
 assert.ok(src.includes('cell.dataset.colRole=col.role'));
 assert.ok(src.includes('buildTable(columns,rows,state,render)'));
 assert.ok(src.includes('buildCards(columns,rows)'));
 assert.ok(src.includes('currentTable.outerHTML'));
 assert.ok(src.includes('scroll.tabIndex=0'));
 assert.ok(src.includes('scroll.setAttribute("role","region")'));
 assert.ok(src.includes('use.setAttribute("href","./web/icons.svg#ui-icon-chevron")'));
 assert.ok(css.includes("table-layout:fixed"));
 assert.ok(css.includes("border-collapse:separate;border-spacing:0"));
 assert.ok(css.includes("padding:8px var(--ds-table-cell-pad-x)"),"same padding across th and td");
 assert.ok(css.includes("height:var(--ds-table-row-min)"));
 for(const role of ["index","text","number","quantity","money","status","note"])
  assert.ok(css.includes('data-col-role="'+role+'"'),"semantic axis "+role);
 const section=css.slice(css.indexOf("/* UI-V34 · RULE 09"),css.indexOf("/* UI-V34 · RULE 11"));
 assert.doesNotMatch(section,/nth-child\(/,"do not align by nth child position");
 assert.ok(css.includes('[data-density="compact"]{--ds-table-cell-pad-x:6px}'));
 assert.ok(css.includes('[data-density="comfortable"]{--ds-table-cell-pad-x:14px}'));
 assert.ok(css.includes('--ds-table-cell-pad-x:10px'));
 for(const v of ["grid","rows","plain"])assert.ok(src.includes('"'+v+'"'));
 assert.ok(css.includes('[data-borders="grid"]'));
 assert.ok(css.includes('[data-borders="plain"]'));
});

test("V34 responsive and accessible table/cards share rows without dropping fields or fetching data",()=>{
 const src=read("web/src/column-matrix.ts"),css=read("web/styles.css"),html=read("index.html");
 assert.ok(css.includes('@container column-preview (max-width:480px)'));
 assert.ok(css.includes('.ui-column-projection[data-mode="auto"][data-many="true"] .ui-column-card-zone{display:block}'));
 assert.ok(css.includes('.ui-column-projection[data-mode="cards"] .ui-column-card-zone{display:block}'));
 assert.ok(css.includes('.ds-table.ds-table--schema[data-wide="true"] :is(th,td):first-child'));
 assert.ok(src.includes('const columns=COLUMN_SCHEMA.slice(0,state.count)'));
 assert.ok(src.includes('const rows=sortedRows(SAMPLE_ROWS,state)'));
 assert.ok(src.includes('dl.append(label,value)'));
 assert.ok(html.includes('<option value="cards">Thẻ có nhãn</option>'));
 assert.ok(src.includes('new Intl.NumberFormat("vi-VN")'));
 assert.doesNotMatch(src,/\.innerHTML\s*=|insertAdjacentHTML|document\.write\s*\(/);
 assert.doesNotMatch(src,/\bfetch\s*\(|\bWebSocket\s*\(|\bXMLHttpRequest\b|\bsupabase\b/i);
});

test("V34 keeps reference attribution and versioned Pages assets",()=>{
 const audit=read("references/GITHUB_COMPONENT_TABLE_EFFECT_AUDIT_V33.md");
 const html=read("index.html"),workflow=read(".github/workflows/pages.yml");
 for(const repo of ["assistant-ui/assistant-ui","vercel/streamdown","lobehub/streamdown","vercel/ai-elements","openai/apps-sdk-ui","mrigankad/Lumi-UI"])
  assert.ok(audit.includes(repo));
 assert.ok(html.includes('data-ui-version="2027-UI-V34"'));
 assert.ok(html.includes('src="./web/dist-v34/app.js"'));
 assert.ok(workflow.includes("cp -R web/dist _site/web/dist-v34"));
 assert.ok(workflow.includes("ET.parse('web/icons.svg')"));
});
