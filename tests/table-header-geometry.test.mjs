import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import ts from "typescript";
const read=path=>readFileSync(new URL("../"+path,import.meta.url),"utf8");

test("V39 keeps one 20-column table under section 8 with no duplicate layout",()=>{
 const html=read("index.html");
 const src=read("web/src/column-matrix.ts");
 assert.ok(html.includes('id="simpleTables"'));
 assert.ok(html.includes('<h2 id="simpleTablesTitle">8. Bảng & dữ liệu · 20 cột</h2>'));
 assert.ok(src.includes("export function initSimpleMasterTable():void"));
 assert.ok(src.includes('stage.replaceChildren(buildTable(COLUMN_SCHEMA,sortedRows(SAMPLE_ROWS,state),state,render))'));
 assert.doesNotMatch(src,/for\(let count=1;count<=COLUMN_SCHEMA\.length;count\+\+\)/);
 assert.ok(src.includes("export function getColumnByPosition(position:number)"));
});

test("V39 prevents STT text breaking by sizing the column and rendering sort arrow only when active",async()=>{
 const src=read("web/src/column-matrix.ts");
 const compiled=ts.transpileModule(src,{compilerOptions:{
  target:ts.ScriptTarget.ES2022,module:ts.ModuleKind.ESNext
 }}).outputText;
 const {COLUMN_SCHEMA}=await import("data:text/javascript;base64,"+Buffer.from(compiled).toString("base64"));
 assert.equal(COLUMN_SCHEMA.length,20);
 assert.deepEqual(COLUMN_SCHEMA.slice(0,6).map(x=>x.label),
  ["STT","Tên hàng","Số","Số lượng","Đơn giá","Thành tiền"]);
 assert.deepEqual(COLUMN_SCHEMA.slice(0,6).map(x=>x.minPx),
  [64,198,72,102,124,142]);
 const inner=64-2*10;
 assert.ok(inner>=40,"STT must fit text and active sort icon within its inner width");
 assert.ok(src.includes('if(active){\n   const icon=document.createElementNS('),
  "no icon subtree in unsorted columns");
 assert.ok(src.includes('th.setAttribute("aria-sort",!active?"none":state.descending?"descending":"ascending")'));
 assert.ok(src.includes('use.setAttribute("href","./web/icons.svg#ui-icon-chevron")'));
 assert.ok(src.includes('button.setAttribute("aria-label","Sắp xếp theo "+col.label)'));
});

test("V39 uses common header/body axes and a compact, single-line sort control",()=>{
 const css=read("web/styles.css"),src=read("web/src/column-matrix.ts");
 assert.ok(src.includes('const group=node("colgroup")'));
 assert.ok(src.includes('track.style.width=(100*col.minPx/minWidth).toFixed(4)+"%"'));
 assert.ok(css.includes("table-layout:fixed"));
 assert.ok(css.includes("--ds-table-cell-pad-x:10px;--ds-table-row-min:44px"));
 assert.ok(css.includes("padding:8px var(--ds-table-cell-pad-x)"));
 assert.ok(css.includes("height:var(--ds-table-row-min)"));
 assert.ok(css.includes(".ds-table.ds-table--schema .ui-column-sort{"));
 assert.ok(css.includes("min-height:28px;padding:0;gap:4px"));
 assert.ok(css.includes("border:0;border-radius:0;white-space:nowrap"));
 assert.ok(css.includes("color:inherit;text-align:inherit;overflow-wrap:normal"));
 assert.ok(css.includes("word-break:normal;hyphens:none"));
 assert.ok(css.includes("background:var(--ui-surface);font-weight:650;line-height:1.35;\n overflow-wrap:normal;word-break:normal;hyphens:none;white-space:nowrap"));
 assert.ok(css.includes('data-col-role="money"]'));
 assert.ok(css.includes("font-variant-numeric:tabular-nums;white-space:nowrap"));
});

test("V39 main table grid has only one first-column separator, no double sticky line",()=>{
 const css=read("web/styles.css"),src=read("web/src/column-matrix.ts");
 assert.ok(src.includes('borders:"grid",density:"standard",sortKey:null,descending:false,headerNames:{}'));
 assert.ok(css.includes('.ds-table.ds-table--schema[data-borders="grid"] :is(th,td):not(:last-child){'));
 assert.ok(css.includes('.ds-table.ds-table--schema[data-wide="true"][data-borders="grid"] :is(th,td):first-child{'));
 assert.ok(css.includes("box-shadow:none"));
 assert.ok(css.includes(".ds-table.ds-table--schema tbody tr:last-child td{border-bottom:0}"));
});

test("V39 has one canonical table rule with the screenshot-derived regression constraints",()=>{
 const rules=read("RULES.md"),html=read("index.html"),pages=read(".github/workflows/pages.yml");
 assert.ok(rules.includes("### 9.10. V39: bảng 20 cột phải cân trục tiêu đề/dữ liệu, không bẻ tên cột"));
 assert.ok(rules.includes("STT"));
 assert.ok(rules.includes("64 / 198 / 72 / 102 / 124 / 142"));
 assert.ok(html.includes('data-ui-version="2027-UI-V46"'));
 assert.ok(html.includes('<span class="version">V45</span>'));
 assert.ok(html.includes('src="./web/dist-v46/app.js"'));
 assert.ok(pages.includes("cp -R web/dist _site/web/dist-v46"));
});
