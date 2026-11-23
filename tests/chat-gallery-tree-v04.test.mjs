import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
const read=path=>readFileSync(new URL("../"+path,import.meta.url),"utf8");

test("CG-V04: every rendered component tag belongs to a registered parent or placement",()=>{
 const html=read("chat-gallery.html");
 const registry=read("web/src/component-contracts.ts");
 const allowed=new Map();
 for(const m of registry.matchAll(/\{id:"([^"]+)",parent:(null|"[^"]+")/g)){
  const parent=m[2]==="null"?null:m[2].slice(1,-1);
  allowed.set(m[1],parent?[parent]:[]);
 }
 for(const m of registry.matchAll(/\{id:"[^"]+",host:"([^"]+)",child:"([^"]+)"/g)){
  const accepted=allowed.get(m[2])||[];
  allowed.set(m[2],[...accepted,m[1]]);
 }
 const stack=[],issues=[];
 const voidTags=new Set(["input","meta","link","br","img","hr","source","area","base","embed","wbr","col","param"]);
 let componentCount=0;
 for(const token of html.match(/<\/?[a-z][^>]*>/gi)||[]){
  const tag=token.match(/^<\/?([a-z0-9-]+)/i)?.[1].toLowerCase();
  if(!tag)continue;
  if(token.startsWith("</")){
   let i=stack.length-1;
   while(i>=0 && stack[i].tag!==tag)i--;
   if(i>=0)stack.splice(i);
   continue;
  }
  const id=token.match(/data-ui-component="([^"]+)"/)?.[1];
  if(id){
   componentCount++;
   assert.ok(allowed.has(id),"component must exist in canonical registry: "+id);
   const parent=stack.findLast(item=>item.id)?.id;
   if(parent&&!allowed.get(id).includes(parent)){
    issues.push(id+" mounted in "+parent+" instead of "+allowed.get(id).join("/"));
   }
  }
  if(!voidTags.has(tag)&&!token.endsWith("/>"))stack.push({tag,id});
 }
 assert.ok(componentCount>=20,"whole screen must be checked");
 assert.deepEqual(issues,[]);
});

test("CG-V04: obsolete first-version design system is not shipped",()=>{
 const css=read("web/styles.css");
 const html=read("chat-gallery.html");
 assert.doesNotMatch(css,/\/\* ===== CHAT GALLERY \/ 2027-CG-V01/);
 assert.doesNotMatch(css,/\.cg-layout-pick|\.cg-device-frame|\.cg-composer-field/);
 assert.ok(html.includes('data-ui-version="2027-CG-V04"'));
 assert.ok(css.includes("/* CG-V04: only owner-level responsive composition"));
});
