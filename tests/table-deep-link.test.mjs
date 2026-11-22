import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import ts from "typescript";
const read=p=>readFileSync(new URL("../"+p,import.meta.url),"utf8");

test("V40 version badge and GitHub Pages module graph agree",()=>{
 const html=read("index.html"),workflow=read(".github/workflows/pages.yml");
 assert.ok(html.includes('<span class="version">V46</span>'));
 assert.ok(html.includes('data-ui-version="2027-UI-V46"'));
 assert.ok(html.includes('./web/styles.css?v=2027-UI-V46'));
 assert.ok(html.includes('src="./web/dist-v46/app.js"'));
 assert.ok(workflow.includes('cp -R web/dist _site/web/dist-v46'));
});

test("V40 moves table after 7 as section 8, keeps fonts section 1 clean",()=>{
 const html=read("index.html"),src=read("web/src/simple-gallery.ts"),css=read("web/styles.css");
 const fontStart=html.indexOf('id="simpleKit"');
 const secondStart=html.indexOf('id="simpleMultiline"');
 const motionStart=html.indexOf('id="simpleMotion"');
 const tableStart=html.indexOf('id="simpleTables"');
 const advancedStart=html.indexOf('class="studio-heading"');
 assert.ok(fontStart>=0&&fontStart<secondStart&&secondStart<motionStart&&motionStart<tableStart&&tableStart<advancedStart);
 assert.doesNotMatch(html.slice(fontStart,secondStart),/simpleTables|tableColumnMatrixCard|ui-sample-direct-link/,"no table link or example within section one");
 assert.ok(html.includes('<h2 id="simpleTablesTitle">8. Bảng & dữ liệu · 20 cột</h2>'));
 assert.ok(html.includes('id="simpleTableItems" class="simple-table-content"'));
 assert.ok(src.includes('document.body.classList.add("simple-first")'));
 assert.ok(src.includes('hash==="#tableColumnMatrixCard"||hash==="#sample-tables"'));
 assert.ok(src.includes('window.history.replaceState(null,"",window.location.pathname+window.location.search+"#simpleTables")'));
 assert.ok(!src.includes('document.body.classList.toggle("simple-first"'),"never display dashboard in public");
 assert.ok(css.includes("body.simple-first .studio-component-gallery"),"legacy dashboard stays hidden");
});

test("V40 makes only ONE real 20-column table, plus a metadata list",()=>{
 const source=read("web/src/column-matrix.ts"),app=read("web/src/app.ts"),css=read("web/styles.css");
 assert.ok(source.includes("export function initSimpleMasterTable():void"));
 assert.ok(source.includes('const root=document.getElementById("simpleTableItems")'));
 assert.ok(source.includes('count:COLUMN_SCHEMA.length'));
 assert.ok(source.includes('stage.replaceChildren(buildTable(COLUMN_SCHEMA,sortedRows(SAMPLE_ROWS,state),state,render))'));
 assert.ok(source.includes('root.replaceChildren(stage,details)'),"only one table stage and a plain mapping list");
 assert.ok(source.includes('const mapping=node("ol","simple-table-field-map")'));
 assert.ok(source.includes('for(const [index,col] of COLUMN_SCHEMA.entries())'));
 assert.ok(source.includes('entry.dataset.colIndex=String(index+1)'));
 assert.ok(source.includes('entry.dataset.colKey=col.key'));
 assert.ok(!source.includes('for(let count=1;count<=COLUMN_SCHEMA.length;count++)'),"must not generate twenty separate tables");
 assert.ok(!source.includes('const details=node("details","simple-table-row")'));
 assert.ok(app.includes('import { initColumnMatrix, initSimpleMasterTable } from "./column-matrix.js";'));
 assert.ok(app.includes("initSimpleMasterTable();"));
 assert.ok(css.includes(".simple-table-master"));
 assert.ok(css.includes(".simple-table-field-index"));
 assert.ok(!css.includes(".simple-table-row{"),"removed old multi-table CSS layer");
});

test("V40 stable 1-based column positions map to names and keys, including boundary cases",async()=>{
 const src=read("web/src/column-matrix.ts");
 const js=ts.transpileModule(src,{
  compilerOptions:{target:ts.ScriptTarget.ES2022,module:ts.ModuleKind.ESNext}
 }).outputText;
 const {COLUMN_SCHEMA,getColumnByPosition}=await import("data:text/javascript;base64,"+Buffer.from(js).toString("base64"));
 assert.equal(COLUMN_SCHEMA.length,20);
 assert.deepEqual(COLUMN_SCHEMA.slice(0,6).map(c=>c.label),
  ["STT","Tên hàng","Số","Số lượng","Đơn giá","Thành tiền"]);
 assert.equal(getColumnByPosition(1)?.key,"index");
 assert.equal(getColumnByPosition(2)?.key,"name");
 assert.equal(getColumnByPosition(3)?.key,"number");
 assert.equal(getColumnByPosition(4)?.key,"quantity");
 assert.equal(getColumnByPosition(5)?.key,"price");
 assert.equal(getColumnByPosition(6)?.key,"total");
 assert.equal(getColumnByPosition(20)?.key,"note");
 for(const value of [0,-1,1.5,21,99])assert.equal(getColumnByPosition(value),undefined);
 assert.equal(new Set(COLUMN_SCHEMA.map(c=>c.key)).size,20);
 assert.equal((src.match(/dataset\.colIndex=String\(colIndex\+1\)/g)||[]).length,3,
  "track, th and td each expose 1-based column position");
 assert.equal((src.match(/dataset\.colKey=col\.key/g)||[]).length,4,
  "track, th, td and metadata list each expose stable data field keys");
});
