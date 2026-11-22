import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const read=(path)=>readFileSync(new URL("../"+path,import.meta.url),"utf8");

test("V30 follows existing RULE 06–08, not a separate Section 6 button system",()=>{
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

test("V30 preserves the 14 button and 10 icon specimens with semantic fields",()=>{
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

test("V30 uses existing control tokens, image layout only in compositions",()=>{
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

test("V30 keeps a valid, singly rooted SVG sprite and safe deployment",()=>{
  const sprite=read("web/icons.svg"),html=read("index.html"),workflow=read(".github/workflows/pages.yml");
  assert.match(sprite,/^<svg xmlns="http:\/\/www\.w3\.org\/2000\/svg"/);
  for(const [,body] of sprite.matchAll(/<!--([\s\S]*?)-->/g))
    assert.doesNotMatch(body,/<!--|--/,"invalid XML comments");
  const ids=[...sprite.matchAll(/<symbol id="(ui-icon-[^"]+)"/g)].map(m=>m[1]);
  assert.equal(ids.length,new Set(ids).size);
  assert.equal(sprite.split("</svg>").length-1,1);
  assert.ok(sprite.trimEnd().endsWith("</svg>"));
  assert.ok(html.includes('data-ui-version="2027-UI-V30"'));
  assert.ok(html.includes('src="./web/dist-v30/app.js"'));
  assert.ok(html.includes('./web/styles.css?v=2027-UI-V30'));
  assert.ok(workflow.includes("cp -R web/dist _site/web/dist-v30"));
  assert.ok(workflow.includes("ET.parse('web/icons.svg')"));
});
