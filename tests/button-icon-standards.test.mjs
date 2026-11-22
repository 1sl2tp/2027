import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const read=(path)=>readFileSync(new URL("../"+path,import.meta.url),"utf8");

test("V31 follows existing RULE 06–08, not a separate Section 6 button system",()=>{
  const rules=read("RULES.md"),css=read("web/styles.css"),html=read("index.html");
  const button=read("web/src/simple-buttons.ts"),inner=read("web/src/simple-button-rules.ts");
  for(const rule of ["## RULE 06","## RULE 07","## RULE 08"])
    assert.ok(rules.includes(rule),"missing canonical "+rule);
  assert.ok(rules.includes(".ui-button"));
  assert.ok(rules.includes("web/icons.svg"));
  assert.ok(html.includes("6.1. Cấu tạo bên trong nút — dùng thành phần gốc"));
  assert.ok(html.includes('id="simpleButtonRules"'));
  assert.ok(html.includes('id="sample-actions"'));
  assert.doesNotMatch(html,/simpleButtonSizeKit|data-geometry-preview/,"no duplicate 6.1 size gallery");
  assert.doesNotMatch(css,/--ds-btn-|--inner-icon-size|--inner-gap|--inner-pad/,"no parallel button token system");
  assert.ok(button.includes('button.className="ui-button ui-button--"+spec.variant+" simple-button-demo"'));
  assert.ok(inner.includes('button.className="ui-button ui-button--outline simple-button-inner-demo'));
  assert.ok(button.includes('svg.classList.add("ui-icon")'));
  assert.ok(inner.includes('svg.classList.add("ui-icon")'));
  assert.ok(css.includes(".ui-button{"),"button appearance remains at primitive");
  assert.ok(css.includes(".ui-icon{"),"icon appearance remains at primitive");
  assert.ok(!css.includes(".simple-button-demo-solid"),"no separate gallery color variants");
});

test("V31 preserves the 14 button and 10 icon specimens with semantic fields",()=>{
  const script=read("web/src/simple-buttons.ts"),css=read("web/styles.css"),sprite=read("web/icons.svg");
  const buttons=[...script.matchAll(/id:"BUTTON-(\d{2})",label:"([^"]+)",kind:"button",variant:"([^"]+)",layout:"([^"]+)",state:"([^"]+)"/g)];
  const icons=[...script.matchAll(/id:"ICON-(\d{2})",label:"([^"]+)",kind:"icon",variant:"[^"]+",layout:"[^"]+",state:"[^"]+",source:"[^"]+",caption:"",icon:"([^"]+)"/g)];
  assert.equal(buttons.length,14);
  assert.equal(icons.length,10);
  for(const [i,match] of buttons.entries())assert.equal(match[1],String(i+1).padStart(2,"0"));
  for(const [i,match] of icons.entries()){
    assert.equal(match[1],String(i+1).padStart(2,"0"));
    assert.ok(sprite.includes('id="ui-icon-'+match[3]+'"'),"missing shared icon "+match[3]);
  }
  for(const name of ["primary","secondary","outline","quiet","danger","toggle","square","round","catalog","icon"]){
    assert.ok(css.includes(".ui-button--"+name),"existing primitive missing "+name);
  }
  for(const state of ["idle","disabled","loading","toggle"])
    assert.ok(buttons.some(match=>match[5]===state),"state "+state);
  assert.ok(script.includes('button.setAttribute("aria-disabled","true")'));
  assert.ok(script.includes('preview.setAttribute("aria-pressed",String(next))'));
  assert.ok(script.includes('button.setAttribute("aria-busy","true")'));
  assert.ok(!script.includes("fetch(")&&!script.includes("WebSocket(")&&!script.includes("supabase"));
});

test("V31 uses existing control tokens, image layout only in compositions",()=>{
  const html=read("index.html"),css=read("web/styles.css");
  for(const token of ["--ui-control-hit","--ui-control-glyph","--ui-control-plus","--ui-control-mic","--ui-control-label","--ui-control-gap"]){
    assert.ok(html.includes(token),"missing source token in 6.1 table: "+token);
    assert.ok(css.includes(token),"missing canonical CSS token "+token);
  }
  assert.ok(css.includes(".ui-button--round{border-radius:var(--ui-button-radius-pill)"));
  assert.ok(css.includes(".simple-button-inner-grid{display:grid;grid-template-columns:24px minmax(0,1fr) 24px"));
  assert.ok(css.includes(".simple-button-inner-grid-photo{grid-template-columns:32px minmax(0,1fr) 32px"));
  assert.ok(css.includes(".simple-button-inner-two-line{min-height:56px"));
  assert.ok(css.includes("object-fit:cover;aspect-ratio:1"));
  assert.ok(css.includes(".simple-button-inner-optical{transform:translate(1px,-.5px)"));
});


test("V31 audits every Section 6 button contract, not just matching CSS class names",()=>{
 const script=read("web/src/simple-buttons.ts"),inner=read("web/src/simple-button-rules.ts");
 const css=read("web/styles.css"),html=read("index.html"),rules=read("RULES.md");
 assert.ok(rules.includes("## RULE 10 —"),"naming and audit documented in single owner");
 const expected=[
  ["BUTTON-01","primary","plain","idle"],["BUTTON-02","secondary","plain","idle"],
  ["BUTTON-03","outline","plain","idle"],["BUTTON-04","quiet","plain","idle"],
  ["BUTTON-05","primary","pill","idle"],["BUTTON-06","primary","block","idle"],
  ["BUTTON-07","outline","leading","idle"],["BUTTON-08","outline","trailing","idle"],
  ["BUTTON-09","secondary","square","idle"],["BUTTON-10","secondary","round","idle"],
  ["BUTTON-11","danger","plain","idle"],["BUTTON-12","secondary","plain","disabled"],
  ["BUTTON-13","secondary","leading","loading"],["BUTTON-14","toggle","plain","toggle"]
 ];
 const rows=[...script.matchAll(/id:"(BUTTON-\d{2})",label:"[^"]+",kind:"button",variant:"([^"]+)",layout:"([^"]+)",state:"([^"]+)"/g)].map(m=>m.slice(1));
 assert.deepEqual(rows,expected,"every sample has a distinct semantic variant / layout / state");
 assert.ok(script.includes('button.classList.add("ui-button--pill")'));
 assert.ok(script.includes('button.classList.add("ui-button--block")'));
 assert.ok(!script.includes('ui-button--catalog'),"catalog is for the source browser, never a full-width action");
 assert.ok(!script.includes('button.classList.add("ui-button--round");'),"pill must not be misnamed round");
 assert.ok(inner.includes('button.classList.add("ui-button--uniform","ui-button--square")'),"glyph and number are not icons");
 assert.ok(css.includes(".ui-button--pill{border-radius:var(--ui-button-radius-pill)"));
 assert.ok(css.includes(".ui-button--block{width:100%;max-width:100%;justify-content:center;text-align:center}"));
 assert.ok(css.includes(".simple-button-stage[data-layout=\"block\"]{max-width:280px}"));
 assert.ok(css.includes(".ui-button--uniform{"),"uniform belongs to canonical button");
 assert.ok(!css.includes(".ui-button--round:not(.ui-button--primary)"),"shape cannot override semantic color");
 assert.ok(!css.includes(".ui-button--square{border-radius:10px;background"),"square cannot override semantic color");
 assert.ok(script.includes('choose.className="ui-button ui-button--icon ui-button--round ui-button--outline simple-button-pick"'));
 assert.ok(css.includes('.simple-button-pick:not([aria-pressed="true"])>.ui-icon'),"unselected check not shown as selected");
 assert.ok(html.includes("Nút")&&html.includes("--ui-button-gap"),"table separates button gap from composer gap");
});

test("V31 retains one icon registry and one real button-gap token",()=>{
 const css=read("web/styles.css"),sprite=read("web/icons.svg");
 assert.ok(css.includes(".ui-button{box-sizing:border-box;display:inline-flex;align-items:center;justify-content:center;gap:var(--ui-button-gap,5px)"));
 assert.ok(css.includes("--ui-button-gap:7px;"));
 assert.ok(!css.includes("--ds-btn-"),"no parallel button variables");
 const ids=[...sprite.matchAll(/<symbol id="([^"]+)"/g)].map(m=>m[1]);
 assert.equal(ids.length,new Set(ids).size);
});

test("V31 keeps a valid, singly rooted SVG sprite and safe deployment",()=>{
  const sprite=read("web/icons.svg"),html=read("index.html"),workflow=read(".github/workflows/pages.yml");
  assert.match(sprite,/^<svg xmlns="http:\/\/www\.w3\.org\/2000\/svg"/);
  for(const [,body] of sprite.matchAll(/<!--([\s\S]*?)-->/g))
    assert.doesNotMatch(body,/<!--|--/,"invalid XML comments");
  const ids=[...sprite.matchAll(/<symbol id="(ui-icon-[^"]+)"/g)].map(m=>m[1]);
  assert.equal(ids.length,new Set(ids).size);
  assert.equal(sprite.split("</svg>").length-1,1);
  assert.ok(sprite.trimEnd().endsWith("</svg>"));
  assert.ok(html.includes('data-ui-version="2027-UI-V41"'));
  assert.ok(html.includes('src="./web/dist-v41/app.js"'));
  assert.ok(html.includes('./web/styles.css?v=2027-UI-V41'));
  assert.ok(workflow.includes("cp -R web/dist _site/web/dist-v41"));
  assert.ok(workflow.includes("ET.parse('web/icons.svg')"));
});
