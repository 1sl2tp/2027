import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const read=(path)=>readFileSync(new URL("../"+path,import.meta.url),"utf8");

test("V29 renders Section 6 variants with the CSS classes they actually use",()=>{
  const script=read("web/src/simple-buttons.ts");
  const css=read("web/styles.css");
  const variants=[...script.matchAll(/id:"BUTTON-\d{2}",label:"[^"]+",kind:"button",style:"([^"]+)"/g)]
    .map(m=>m[1]);
  assert.equal(variants.length,14);
  assert.match(script,/button\.className="simple-button-demo simple-button-demo-"\+spec\.style/);
  for(const variant of variants){
    assert.ok(css.includes(".simple-button-demo-"+variant),"missing working selector for "+variant);
  }
  assert.ok(css.includes(".simple-button-demo-toggle[aria-pressed=\"true\"]"),"toggle uses active visual state");
  assert.ok(script.includes('button.setAttribute("aria-disabled","true")'),"inactive states are announced");
  assert.ok(css.includes(".simple-button-demo-block{width:100%"),"block fills available column");
});

test("V29 only uses valid single-level XML comments in the icon registry",()=>{
  const sprite=read("web/icons.svg");
  assert.match(sprite,/^<svg xmlns="http:\/\/www\.w3\.org\/2000\/svg"/);
  for(const [,body] of sprite.matchAll(/<!--([\s\S]*?)-->/g)){
    assert.doesNotMatch(body,/<!--|--/,"XML comments cannot contain nested comments or double hyphens");
  }
  const ids=[...sprite.matchAll(/<symbol id="(ui-icon-[^"]+)"/g)].map(m=>m[1]);
  assert.equal(new Set(ids).size,ids.length,"sprite symbol IDs are unique");
  for(const icon of ["plus","minus","search","close","copy","edit","trash","share","send-up","ellipsis","save","arrow-right"]){
    assert.ok(ids.includes("ui-icon-"+icon),"missing icon "+icon);
  }
  assert.ok(sprite.trimEnd().endsWith("</svg>"));
});

test("V29 has measurable size, touch target, and shape examples",()=>{
  const html=read("index.html"),css=read("web/styles.css"),script=read("web/src/simple-buttons.ts");
  assert.match(html,/data-ui-version="2027-UI-V29"/);
  assert.ok(html.includes('id="simpleButtonSizeKit"'));
  for(const size of ["compact","medium","large"])assert.ok(html.includes('data-size="'+size+'"'));
  for(const cls of ["simple-button-demo-square","simple-button-demo-circle","simple-button-demo-pill"])assert.ok(html.includes(cls));
  assert.ok(css.includes("--ds-btn-height:36px"));
  assert.ok(css.includes("--ds-btn-height:44px"));
  assert.ok(css.includes("--ds-btn-height:52px"));
  assert.ok(css.includes("--ds-btn-icon:20px"));
  assert.match(css,/@media\(pointer:coarse\)[\s\S]*?min-height:44px/);
  assert.match(script,/data-geometry-preview/);
});

test("V29 still uses one asset build for all modules",()=>{
 const html=read("index.html"),workflow=read(".github/workflows/pages.yml");
 assert.ok(html.includes('src="./web/dist-v29/app.js"'));
 assert.ok(html.includes('./web/styles.css?v=2027-UI-V29'));
 assert.ok(workflow.includes('cp -R web/dist _site/web/dist-v29'));
 assert.ok(workflow.includes("ET.parse('web/icons.svg')"));
});
