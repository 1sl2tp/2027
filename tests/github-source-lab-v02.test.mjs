import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
const read=path=>readFileSync(new URL("../"+path,import.meta.url),"utf8");

test("SOURCE-V02: 13 GitHub references classify owner/parent and do not install dependencies",()=>{
 const html=read("github-sources.html"),pkg=JSON.parse(read("package.json"));
 const first=html.slice(html.indexOf('id="source-map"'),html.indexOf('id="source-playground"'));
 assert.ok(html.includes("SOURCE-V02"));
 assert.match(first,/<th>Loại \/ cha áp dụng<\/th>/);
 assert.equal((first.match(/<tr><td><a href="https:\/\/github\.com\//g)||[]).length,13);
 for(const repo of ["mui/base-ui","adobe/react-spectrum","vercel/components.build","shadcn-ui/ui","vercel-labs/ui"])
  assert.ok(first.includes("https://github.com/"+repo),repo);
 for(const row of first.match(/<tr><td><a href="https:\/\/github\.com\/[^"]+"[\s\S]*?<\/tr>/g)||[])
  assert.equal((row.match(/<td>/g)||[]).length,5,row.slice(0,90));
 assert.deepEqual(Object.keys(pkg.dependencies||{}),[],"The source lab should not add vendor runtime dependencies");
});

test("SOURCE-V02: a mixed message owns parts and action bar, table uses existing base",()=>{
 const html=read("github-sources.html");
 const section=html.slice(html.indexOf('<section class="source-section" id="source-message-parts"'),html.indexOf('<section class="source-section" id="source-rows"'));
 const message=section.slice(section.indexOf('<article '),section.indexOf('</article>')+10);
 assert.match(message,/data-ui-component="CHAT-MESSAGE"/);
 assert.equal((message.match(/data-ui-component="MESSAGE-CONTENT-PARTS"/g)||[]).length,1);
 for(const child of ["MESSAGE-TEXT-PART","MESSAGE-TABLE-PART","MESSAGE-MEDIA-PART","MESSAGE-MEDIA-TILE","CHAT-MESSAGE-ACTIONS","MESSAGE-COPY-BUTTON"])
  assert.ok(message.includes('data-ui-component="'+child+'"'),child);
 assert.ok(message.indexOf('data-ui-component="CHAT-MESSAGE-ACTIONS"')>message.indexOf('data-ui-component="MESSAGE-CONTENT-PARTS"'));
 assert.ok(message.includes('class="ds-table source-table source-parts-table"'),"reuse DATA-TABLE");
 assert.ok(message.includes('class="ui-button ui-button--secondary"'),"reuse Button");
 assert.ok(html.includes("navigator.clipboard.writeText(parts.textContent.trim())"),"copy targets selected message parts");
 assert.doesNotMatch(section,/\bfetch\s*\(|\bWebSocket\s*\(|\bXMLHttpRequest\b|supabase/gi);
});

test("SOURCE-V02: new styles remain scoped to source parts, do not create another input system",()=>{
 const css=read("web/styles.css"),html=read("github-sources.html");
 for(const selector of [".source-parts-grid{",".source-parts-stack{",".source-parts-media{",".source-parts-actions{"])
  assert.ok(css.includes(selector),selector);
 assert.ok(css.includes("@media(max-width:700px){.source-parts-grid{grid-template-columns:minmax(0,1fr)}}"));
 assert.ok(html.includes('id="sourceMessageCopy"'));
 assert.ok(html.includes('id="sourceMessageStatus" role="status"'));
 assert.ok(css.includes(".source-composer:focus-within"),"preserve the existing shared composer border owner");
});
