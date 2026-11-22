// UI-V41 · RULE 12: one message owns many content parts and its action bar.
// This demo reuses COLUMN_SCHEMA, ds-table and ui-button. It does not send any data.
import {COLUMN_SCHEMA,type ColumnSpec} from "./column-matrix.js";
import {auditMessageTree} from "./component-contracts.js";

type Variant="text"|"table"|"mixed";
const sampleId="message-v41-preview";
const products=[
 {name:"Sữa hộp 180 ml",quantity:12,total:144000},
 {name:"Bánh quy bơ",quantity:3,total:78000}
] as const;
const amount=new Intl.NumberFormat("vi-VN",{maximumFractionDigits:0});
const tableColumns:COLUMNKEY[]= ["name","quantity","total"];
type COLUMNKEY="name"|"quantity"|"total";

function element<K extends keyof HTMLElementTagNameMap>(
 tag:K,className="",text=""
):HTMLElementTagNameMap[K]{
 const e=document.createElement(tag);
 if(className)e.className=className;
 if(text)e.textContent=text;
 return e;
}
function mark<T extends HTMLElement>(e:T,id:string):T{
 e.dataset.uiComponent=id;
 return e;
}
function tablePart():HTMLElement{
 const part=mark(element("div","message-v41-table-part"),"MESSAGE-TABLE-PART");
 const scroll=element("div","message-v41-table-scroll");
 scroll.tabIndex=0;scroll.setAttribute("role","region");
 scroll.setAttribute("aria-label","Bảng mặt hàng trong tin mẫu");
 const table=mark(element("table","ds-table ds-table--schema message-v41-table"),"DATA-TABLE");
 const caption=element("caption","message-v41-sr-only","Bảng mẫu dùng cột của một schema 20 cột");
 table.append(caption);
 const columns=tableColumns.map(key=>COLUMN_SCHEMA.find(col=>col.key===key))
  .filter((column):column is ColumnSpec=>Boolean(column));
 if(columns.length!==3)throw new Error("Bảng V41 không tìm thấy cột trong COLUMN_SCHEMA");
 const thead=element("thead"),head=element("tr");
 for(const col of columns){
  const th=element("th","",col.label);
  th.scope="col";th.dataset.colKey=col.key;th.dataset.colRole=col.role;
  head.append(th);
 }
 thead.append(head);table.append(thead);
 const tbody=element("tbody");
 for(const product of products){
  const tr=element("tr");
  for(const col of columns){
   const raw=product[col.key as COLUMNKEY];
   const display=typeof raw==="number"?amount.format(raw)+(col.role==="money"?" đ":""):raw;
   const cell=element("td","",display);
   cell.dataset.colKey=col.key;cell.dataset.colRole=col.role;
   tr.append(cell);
  }
  tbody.append(tr);
 }
 table.append(tbody);scroll.append(table);part.append(scroll);
 return part;
}
function mediaPart():HTMLElement{
 const part=mark(element("div","message-v41-media"),"MESSAGE-MEDIA-PART");
 part.setAttribute("aria-label","Hai ô ảnh minh họa trong cùng tin");
 for(let i=1;i<=2;i++){
  const tile=mark(element("div","message-v41-media-tile","Ảnh "+i),"MESSAGE-MEDIA-TILE");
  part.append(tile);
 }
 return part;
}
function textPart(text:string):HTMLElement{
 return mark(element("p","message-v41-text",text),"MESSAGE-TEXT-PART");
}
function serializeMessage(message:HTMLElement):string{
 const content=message.querySelector<HTMLElement>('[data-ui-component="MESSAGE-CONTENT-PARTS"]');
 if(!content)return "";
 const lines:string[]=[];
 for(const part of Array.from(content.children)){
  const kind=(part as HTMLElement).dataset.uiComponent;
  if(kind==="MESSAGE-TEXT-PART")lines.push(part.textContent?.trim()||"");
  if(kind==="MESSAGE-TABLE-PART"){
   const rows=Array.from(part.querySelectorAll("tr"));
   lines.push(...rows.map(row=>Array.from(row.querySelectorAll("th,td"))
    .map(cell=>cell.textContent?.trim()||"").join(" | ")));
  }
  if(kind==="MESSAGE-MEDIA-PART")lines.push("[2 ảnh minh họa; không có tệp thật]");
 }
 return lines.filter(Boolean).join("\n");
}
function buildMessage(variant:Variant,feedback:HTMLElement):HTMLElement{
 const message=mark(element("article","message-v41-message"),"CHAT-MESSAGE");
 message.dataset.messageId=sampleId;
 message.setAttribute("aria-label","Một tin mẫu có nhiều phần nội dung");
 const parts=mark(element("div","message-v41-parts"),"MESSAGE-CONTENT-PARTS");
 parts.append(textPart("Danh sách mẫu cần đối chiếu hôm nay."));
 if(variant!=="text")parts.append(tablePart());
 if(variant==="mixed"){
  parts.append(mediaPart());
  parts.append(textPart("Ghi chú: hai ảnh ở đây là ô minh họa, không có tệp thật."));
 }
 const actions=mark(element("div","message-v41-actions"),"CHAT-MESSAGE-ACTIONS");
 const copy=mark(element("button","ui-button ui-button--secondary","Sao chép tin mẫu"),"MESSAGE-COPY-BUTTON");
 copy.type="button";
 copy.setAttribute("aria-label","Sao chép các phần nội dung của tin mẫu hiện tại");
 copy.addEventListener("click",async()=>{
  const owningMessage=copy.closest<HTMLElement>('[data-ui-component="CHAT-MESSAGE"]');
  if(!owningMessage||owningMessage.dataset.messageId!==sampleId)return;
  const value=serializeMessage(owningMessage);
  try{
   if(!navigator.clipboard?.writeText)throw new Error("Clipboard unavailable");
   await navigator.clipboard.writeText(value);
   feedback.textContent="Đã sao chép đúng tin mẫu hiện tại.";
  }catch{
   feedback.textContent="Chưa cấp quyền sao chép. Nội dung vẫn ở trong tin mẫu.";
  }
 });
 actions.append(copy);message.append(parts,actions);
 return message;
}
export function initMessagePartsGallery():void{
 const host=document.getElementById("messageV41Preview");
 const feedback=document.getElementById("messageV41Feedback");
 if(!host||!feedback)return;
 const buttons=Array.from(document.querySelectorAll<HTMLButtonElement>("[data-message-v41-variant]"));
 const render=(variant:Variant):void=>{
  const message=buildMessage(variant,feedback);
  const errors=auditMessageTree(message);
  host.replaceChildren(message);
  feedback.textContent=errors.length?"Sai cấu trúc: "+errors.join("; "):
   "Đạt kiểm tra cấu trúc cha–con · "+(variant==="text"?"chữ":variant==="table"?"chữ + bảng":"chữ + bảng + ảnh + ghi chú")+".";
  for(const b of buttons){
   const active=b.dataset.messageV41Variant===variant;
   b.setAttribute("aria-pressed",String(active));
   b.classList.toggle("selected",active);
  }
 };
 for(const button of buttons){
  button.addEventListener("click",()=>{
   const variant=button.dataset.messageV41Variant;
   if(variant==="text"||variant==="table"||variant==="mixed")render(variant);
  });
 }
 render("mixed");
}
