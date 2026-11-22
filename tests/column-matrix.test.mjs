import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import ts from "typescript";
const read=file=>readFileSync(new URL("../"+file,import.meta.url),"utf8");

async function loadColumnModule(){
 const js=ts.transpileModule(read("web/src/column-matrix.ts"),{
  compilerOptions:{target:ts.ScriptTarget.ES2022,module:ts.ModuleKind.ESNext}
 }).outputText;
 return import("data:text/javascript;base64,"+Buffer.from(js).toString("base64"));
}

test("V36 has exactly one main table card with 1–20 columns and existing gallery ownership",()=>{
 const html=read("index.html"),app=read("web/src/app.ts"),rules=read("RULES.md");
 const start=html.indexOf('data-gallery-category="tables"');
 const end=html.indexOf('data-gallery-category="invoices"',start);
 const section=html.slice(start,end);
 assert.ok(start>=0&&end>start);
 assert.equal((section.match(/class="studio-component-card/g)||[]).length,1,"one main table card, no duplicate mini-table or parallel variant card");
 assert.ok(section.includes('id="tableColumnMatrixCard"'));
 assert.ok(section.includes("Bảng chính · 1–20 cột theo tiêu đề"));
 for(const id of ["columnMatrix","columnMatrixCount","columnMatrixMode","columnMatrixWidth",
  "columnMatrixBorders","columnMatrixDensity","columnMatrixPreview","columnMatrixCopy","columnMatrixStatus",
  "columnMatrixHeaderColumn","columnMatrixHeaderName","columnMatrixApplyTitle","columnMatrixRoles"])
   assert.ok(section.includes('id="'+id+'"'),"missing canonical table control "+id);
 for(const count of [6,10,15,20])
   assert.ok(section.includes('data-column-preset="'+count+'"'),"quick preset "+count);
 assert.ok(section.includes("<details")&&section.includes('id="variantTableFeedback"'),"old styles only as optional reference");
 assert.ok(html.includes('data-gallery-filter="tables">Bảng & dữ liệu <span>1</span>'));
 assert.ok(html.includes('data-gallery-filter="all">Tất cả <span>22</span>'));
 assert.ok(app.includes('import { initColumnMatrix, initSimpleMasterTable } from "./column-matrix.js";'));
 assert.ok(app.includes("initColumnMatrix();"));
 assert.ok(rules.includes("### 9.7. V36: Một bảng chính cho 1–20 cột"));
 assert.ok(rules.includes("## RULE 12 — XÁC ĐỊNH CHA"),"component hierarchy has its own distinct rule in the same RULES.md");
});

test("V36 schema has 20 meaningful headers and role metadata; header names really determine alignment",async()=>{
 const src=read("web/src/column-matrix.ts");
 const {COLUMN_SCHEMA,roleFromHeader,alignmentForRole}=await loadColumnModule();
 const names=["STT","Tên hàng","Số","Số lượng","Đơn giá","Thành tiền",
  "Mã hàng","ĐVT","Ngày","Giờ","Nhóm","Nhà cung cấp","Giá vốn","Chiết khấu",
  "Thuế %","Còn lại","Trạng thái","Người phụ trách","Cập nhật","Ghi chú"];
 assert.equal(COLUMN_SCHEMA.length,20);
 assert.deepEqual(COLUMN_SCHEMA.map(c=>c.label),names);
 assert.equal(new Set(COLUMN_SCHEMA.map(c=>c.key)).size,20);
 assert.ok(COLUMN_SCHEMA.every(c=>Number.isInteger(c.minPx)&&c.minPx>=52));
 for(const col of COLUMN_SCHEMA){
  assert.equal(roleFromHeader(col.label),col.role,"role recognized by the heading: "+col.label);
  assert.ok(["left","center","right"].includes(alignmentForRole(col.role)));
 }
 assert.equal(alignmentForRole(roleFromHeader("SỐ LƯỢNG")),"center");
 assert.equal(alignmentForRole(roleFromHeader("thành tiền")),"right");
 assert.equal(alignmentForRole(roleFromHeader("Ghi chú")),"left");
 assert.equal(alignmentForRole(roleFromHeader("Thuế %")),"right");
 assert.equal(alignmentForRole(roleFromHeader("Tùy chọn khác")),"left","unknown heading does not guess money");
 assert.ok(src.includes("role:roleFromHeader(label)"),"render derives roles from current header strings");
 assert.ok(src.includes('applyName.addEventListener("click"'));
 assert.ok(src.includes("state.headerNames[key]=value"));
 assert.ok(src.includes('for(let i=1;i<=COLUMN_SCHEMA.length;i++)'),"selector lists 1 to 20");
 assert.ok(src.includes('state.count=value;state.sortKey=null;count.value=String(value)'),"presets use same controller");
});

test("V36 keeps fixed column axes and role-based margin/gap at 6, 10, 15 or 20 fields",()=>{
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
 assert.ok(css.includes("padding:8px var(--ds-table-cell-pad-x)"),"header and rows have the same padding");
 assert.ok(css.includes("height:var(--ds-table-row-min)"));
 for(const role of ["index","text","number","quantity","money","percent","status","note","code","unit","date","time"])
  assert.ok(css.includes('data-col-role="'+role+'"'),"style role "+role);
 const section=css.slice(css.indexOf("/* UI-V34 · RULE 09"),css.indexOf("/* UI-V34 · RULE 11"));
 assert.doesNotMatch(section,/nth-child\(/,"never align by column position");
 assert.ok(css.includes('--ds-table-cell-pad-x:10px'));
 assert.ok(css.includes('[data-density="compact"]{--ds-table-cell-pad-x:6px}'));
 assert.ok(css.includes('[data-density="comfortable"]{--ds-table-cell-pad-x:14px}'));
 assert.ok(css.includes('[data-borders="grid"]'));
 assert.ok(css.includes('[data-borders="plain"]'));
 assert.ok(css.includes('data-col-role="percent"] .ui-column-sort'));
 assert.ok(css.includes(".ui-column-role-chip"));
});

test("V36 uses one dataset for table and cards, stays local, and keeps realistic arithmetic",()=>{
 const src=read("web/src/column-matrix.ts"),css=read("web/styles.css"),html=read("index.html");
 const rows=[...src.matchAll(/index:(\d+),name:"[^"]+",number:(\d+),quantity:(\d+),price:(\d+),total:(\d+)/g)];
 assert.equal(rows.length,4);
 for(const row of rows)assert.equal(Number(row[3])*Number(row[4]),Number(row[5]));
 assert.ok(src.includes('const columns=COLUMN_SCHEMA.slice(0,state.count).map(column=>'));
 assert.ok(src.includes('const rows=sortedRows(SAMPLE_ROWS,state)'));
 assert.ok(src.includes('dl.append(label,value)'));
 assert.ok(src.includes('typeof value==="number"'),"relabeling text as money never creates NaN đ");
 assert.ok(css.includes('@container column-preview (max-width:480px)'));
 assert.ok(css.includes('.ui-column-projection[data-mode="auto"][data-many="true"] .ui-column-card-zone{display:block}'));
 assert.ok(css.includes('.ui-column-projection[data-mode="cards"] .ui-column-card-zone{display:block}'));
 assert.ok(html.includes('<option value="cards">Thẻ có nhãn</option>'));
 assert.ok(src.includes('new Intl.NumberFormat("vi-VN")'));
 assert.doesNotMatch(src,/\.innerHTML\s*=|insertAdjacentHTML|document\.write\s*\(/);
 assert.doesNotMatch(src,/\bfetch\s*\(|\bWebSocket\s*\(|\bXMLHttpRequest\b|\bsupabase\b/i);
});

test("V36 preserves source audit and ships a cache-safe page",()=>{
 const audit=read("references/GITHUB_COMPONENT_TABLE_EFFECT_AUDIT_V33.md");
 const html=read("index.html"),workflow=read(".github/workflows/pages.yml");
 for(const repo of ["assistant-ui/assistant-ui","vercel/streamdown","lobehub/streamdown","vercel/ai-elements","openai/apps-sdk-ui","mrigankad/Lumi-UI"])
  assert.ok(audit.includes(repo));
 assert.ok(html.includes('data-ui-version="2027-UI-V42"'));
 assert.ok(html.includes('src="./web/dist-v42/app.js"'));
 assert.ok(workflow.includes("cp -R web/dist _site/web/dist-v42"));
 assert.ok(workflow.includes("ET.parse('web/icons.svg')"));
});
