import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
const read=p=>readFileSync(new URL("../"+p,import.meta.url),"utf8");

test("V35 visible version badge agrees with HTML data, stylesheet and compiled module directory",()=>{
 const html=read("index.html");
 assert.ok(html.includes('<span class="version">V35</span>'),"topbar is not an old V33 release");
 assert.ok(html.includes('data-ui-version="2027-UI-V35"'));
 assert.ok(html.includes('./web/styles.css?v=2027-UI-V35'));
 assert.ok(html.includes('src="./web/dist-v35/app.js"'));
 assert.ok(!html.includes('<span class="version">V33</span>'));
});

test("V35 sample has an accessible entry link even when the advanced gallery starts hidden",()=>{
 const html=read("index.html"),app=read("web/src/app.ts");
 const simple=read("web/src/simple-gallery.ts"),css=read("web/styles.css");
 assert.ok(html.includes('href="#tableColumnMatrixCard" class="ui-sample-direct-link"'));
 assert.ok(html.includes('id="tableColumnMatrixCard"'),"target must exist");
 assert.ok(html.includes('data-gallery-category="tables" id="sample-tables"'));
 assert.ok(html.includes('data-gallery-filter="tables">Bảng & dữ liệu <span>3</span>'));
 assert.ok(html.includes('data-gallery-filter="all">Tất cả <span>24</span>'));
 assert.ok(simple.includes('document.body.classList.toggle("simple-first",!useOriginal)'));
 assert.ok(app.includes('target?.closest<HTMLElement>("[data-gallery-category]")'),"nested hash must resolve section ownership");
 assert.ok(app.includes('if(category){chooseGallery(category,false);scrollToGalleryAnchor();}'));
 assert.ok(app.includes('const initialGalleryCategory=galleryCategoryFromHash();'));
 assert.ok(app.includes('scrollToGalleryAnchor();'),"reload with nested hash must reposition");
 assert.ok(app.includes('target.scrollIntoView({block:"start",behavior:"auto"})'));
 assert.ok(css.includes('#tableColumnMatrixCard{scroll-margin-top:105px}'));
});

test("V35 demo initializes the six-column table and remains usable across mobile widths",()=>{
 const src=read("web/src/column-matrix.ts"),html=read("index.html");
 assert.ok(src.includes('count:6,mode:"scroll",width:"mobile",borders:"grid"'));
 assert.ok(src.includes('render();'),"initial render not dependent on button press");
 assert.ok(src.includes('preview.replaceChildren()'));
 for(const label of ["STT","Tên hàng","Số","Số lượng","Đơn giá","Thành tiền"])
   assert.ok(html.includes(label));
 assert.ok(html.includes('id="columnMatrixPreview"'));
 assert.ok(html.includes('id="columnMatrixCount"'));
 assert.ok(html.includes('id="columnMatrixMode"'));
});
