import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
const read=p=>readFileSync(new URL("../"+p,import.meta.url),"utf8");

test("V37 release label, stylesheet and module graph agree",()=>{
 const html=read("index.html"),workflow=read(".github/workflows/pages.yml");
 assert.ok(html.includes('<span class="version">V37</span>'));
 assert.ok(html.includes('data-ui-version="2027-UI-V37"'));
 assert.ok(html.includes('./web/styles.css?v=2027-UI-V37'));
 assert.ok(html.includes('src="./web/dist-v37/app.js"'));
 assert.ok(workflow.includes('cp -R web/dist _site/web/dist-v37'));
});

test("V37 opens only simple screenshot-2 presentation, even for legacy table links",()=>{
 const html=read("index.html"),src=read("web/src/simple-gallery.ts"),css=read("web/styles.css");
 assert.ok(html.includes('href="#simpleTables" class="ui-sample-direct-link"'));
 assert.ok(html.includes('id="simpleTables"'));
 assert.ok(html.includes('id="simpleTableItems" class="simple-font-list"'));
 assert.ok(src.includes('document.body.classList.add("simple-first")'));
 assert.ok(src.includes('hash==="#tableColumnMatrixCard"||hash==="#sample-tables"'));
 assert.ok(src.includes('window.history.replaceState(null,"",window.location.pathname+window.location.search+"#simpleTables")'));
 assert.ok(src.includes('window.addEventListener("hashchange",showSimple)'));
 assert.ok(!src.includes('document.body.classList.toggle("simple-first"'),"no switch back to screenshot-1 dashboard");
 assert.ok(css.includes("body.simple-first .studio-component-gallery"),"advanced dashboard remains invisible");
 assert.ok(css.includes(".simple-table-summary"));
 assert.ok(css.includes(".simple-table-preview"));
 assert.ok(css.includes(".simple-font-number"));
});

test("V37 lists all 20 real tables by a shared schema and expands the six-column example",()=>{
 const src=read("web/src/column-matrix.ts"),app=read("web/src/app.ts");
 assert.ok(src.includes("export function initSimpleTableList():void"));
 assert.ok(src.includes('const root=document.getElementById("simpleTableItems")'));
 assert.ok(src.includes('for(let count=1;count<=COLUMN_SCHEMA.length;count++)'));
 assert.ok(src.includes('details.id="simpleTable-"+String(count).padStart(2,"0")'));
 assert.ok(src.includes('const summary=node("summary","simple-table-summary")'));
 assert.ok(src.includes('const description=node("span","simple-font-meta",columns.map(c=>c.label).join(" · "))'));
 assert.ok(src.includes('stage.replaceChildren(buildTable(columns,sortedRows(SAMPLE_ROWS,state),state,render))'));
 assert.ok(src.includes('if(count===6){details.open=true;render();}'));
 assert.ok(src.includes('details.addEventListener("toggle"'));
 assert.ok(app.includes("initSimpleTableList();"));
 assert.ok(!src.includes("simple-table-preview-duplicate"),"only one canonical table renderer");
});
