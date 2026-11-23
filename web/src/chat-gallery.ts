import {COLUMN_SCHEMA,alignmentForRole,type ColumnSpec} from "./column-matrix.js";
import {auditComponentPlacements,auditComponentRegistry,auditMessageTree,auditComposerTree,getAllowedComponentParents,getComponentContract} from "./component-contracts.js";

// CG-V04 is a compositor: it instantiates already registered 2027 primitives
// in the declared host slots. It never introduces a new button/table/input primitive.
type Layout="two"|"three"|"focus";
type Device="desktop"|"phone"|"keyboard";
type ContactId="a"|"b"|"group";
type MessagePart={kind:"text"|"table"|"media"; text?:string;rows?:Row[];count?:number};
type Row={index:number;name:string;quantity:number;price:number;total:number};
type Message={id:string;side:"incoming"|"outgoing";time:string;parts:MessagePart[]};
const $=<T extends HTMLElement>(id:string):T=>{
 const e=document.getElementById(id);if(!e)throw new Error("Missing CG-V03 element "+id);return e as T;
};
const make=<K extends keyof HTMLElementTagNameMap>(tag:K,cls="",text=""):HTMLElementTagNameMap[K]=>{
 const e=document.createElement(tag);if(cls)e.className=cls;if(text)e.textContent=text;return e;
};
const mark=<T extends HTMLElement>(e:T,id:string):T=>{e.dataset.uiComponent=id;return e;};
const contactData:Record<ContactId,{name:string;subtitle:string;avatar:string;last:string;time:string}>={
 a:{name:"Khách mẫu A",subtitle:"Ví dụ hội thoại bán hàng",avatar:"A",last:"Mình gửi đơn mẫu nhé",time:"09:18"},
 b:{name:"Khách mẫu B",subtitle:"Ví dụ chuyển khoản",avatar:"B",last:"Đã gửi chứng từ mẫu",time:"08:35"},
 group:{name:"Nhóm lấy hàng",subtitle:"Ví dụ danh sách hàng",avatar:"N",last:"Số lượng hàng sáng mai",time:"08:44"}
};
const rows:Row[]=[
 {index:1,name:"Sữa hộp 180 ml",quantity:2,price:30000,total:60000},
 {index:2,name:"Bánh quy bơ",quantity:3,price:15000,total:45000}
];
const inventory:Row[]=[
 {index:1,name:"Sữa hộp 180 ml",quantity:12,price:0,total:0},
 {index:2,name:"Bánh quy bơ",quantity:3,price:0,total:0},
 {index:3,name:"Nước suối 500 ml",quantity:24,price:0,total:0}
];
const messages:Record<ContactId,Message[]>={
 a:[
  {id:"a1",side:"incoming",time:"09:10",parts:[{kind:"text",text:"Chào bạn. Cho mình lấy thêm hàng sáng mai nhé."}]},
  {id:"a2",side:"outgoing",time:"09:11",parts:[{kind:"text",text:"Mình đã sắp xếp lại tên và số lượng để dễ kiểm tra."}]},
  {id:"a3",side:"incoming",time:"09:12",parts:[{kind:"text",text:"Danh sách lấy hàng ngày mai:"},{kind:"table",rows:inventory},{kind:"text",text:"Ghi chú: giao buổi sáng."}]},
  {id:"a4",side:"outgoing",time:"09:16",parts:[{kind:"text",text:"Phiếu xác nhận đơn mẫu:"},{kind:"table",rows}]},
  {id:"a5",side:"incoming",time:"09:17",parts:[{kind:"media",count:3},{kind:"text",text:"Ba ảnh giả lập nằm trong cùng một tin nhắn."}]}
 ],
 b:[
  {id:"b1",side:"incoming",time:"08:30",parts:[{kind:"text",text:"Mình gửi thông tin chuyển khoản để đối chiếu."}]},
  {id:"b2",side:"incoming",time:"08:31",parts:[{kind:"text",text:"CHỨNG TỪ MẪU\nSố tiền: 105.000 đ\nThời gian: 08:31 · 23/11/2026\nNội dung: Thanh toán đơn demo\nTrạng thái: Chưa đối soát, không tự ghi thu."},{kind:"media",count:1}]},
  {id:"b3",side:"outgoing",time:"08:35",parts:[{kind:"text",text:"Đã nhận ví dụ. Chưa xác thực chuyển khoản nên chưa ghi thu."}]}
 ],
 group:[
  {id:"g1",side:"incoming",time:"08:40",parts:[{kind:"text",text:"Cả nhóm xem danh sách sáng mai nhé."}]},
  {id:"g2",side:"incoming",time:"08:41",parts:[{kind:"table",rows:inventory}]},
  {id:"g3",side:"outgoing",time:"08:44",parts:[{kind:"text",text:"Đã nhận danh sách mẫu, có thể kiểm lại từng số lượng."}]}
 ]
};
let layout:Layout="two",device:Device="desktop",contact:ContactId="a";
const drafts:Record<ContactId,string>={a:"",b:"",group:""};
const scrollPositions:Partial<Record<ContactId,number>>={};
const host=$<HTMLElement>("cg2Screen");
const messageList=$<HTMLElement>("cg2Messages");
const frame=$<HTMLElement>("cg2Device");
const input=$<HTMLTextAreaElement>("cg2Input");
function feedback(value:string):void{$("cg2Status").textContent=value;}
function setPressed(key:"data-layout"|"data-device",value:string):void{
 document.querySelectorAll<HTMLButtonElement>("button["+key+"]").forEach(b=>b.setAttribute("aria-pressed",String(b.getAttribute(key)===value)));
}
function renderContacts():void{
 const root=$("cg2Contacts");root.replaceChildren();
 (Object.keys(contactData) as ContactId[]).forEach(id=>{
  const item=contactData[id];
  const b=mark(make("button","ds-contact cg2-contact"),"DIRECTORY-CONTACT-ROW");
  b.type="button";b.dataset.contact=id;b.setAttribute("aria-pressed",String(contact===id));
  const av=mark(make("span","ds-avatar",item.avatar),"CONTACT-AVATAR");
  const copy=make("span","ds-contact-main");
  copy.append(mark(make("strong","",item.name),"CONTACT-NAME"),mark(make("small","",item.last),"CONTACT-PREVIEW"));
  const meta=make("span","cg2-contact-meta");meta.textContent=item.time;
  b.append(av,copy,meta);
  b.addEventListener("click",()=>openContact(id));
  root.append(b);
 });
 filterContacts();
}
function filterContacts():void{
 const query=$<HTMLInputElement>("cg2Search").value.toLocaleLowerCase("vi").trim();
 document.querySelectorAll<HTMLElement>("#cg2Contacts [data-contact]").forEach(el=>{
  el.hidden=Boolean(query)&&!el.textContent?.toLocaleLowerCase("vi").includes(query);
 });
}
function rememberScrollPosition():void{
 const remaining=messageList.scrollHeight-messageList.scrollTop-messageList.clientHeight;
 if(remaining<=80)delete scrollPositions[contact];
 else scrollPositions[contact]=messageList.scrollTop;
}
function openContact(id:ContactId):void{
 if(id!==contact){
  rememberScrollPosition();
  contact=id;
  input.value=drafts[id];
 }
 frame.dataset.mobileView="thread";
 renderContacts();renderHeader();renderMessages();
 feedback("Đã mở "+contactData[id].name+" trong cùng vùng CHAT-THREAD. Bản nháp và vị trí đọc được giữ riêng.");
}
function renderHeader():void{
 const item=contactData[contact];
 $("cg2HeaderAvatar").textContent=item.avatar;
 $("cg2HeaderName").textContent=item.name;
 $("cg2HeaderHint").textContent=item.subtitle;
}
const money=(v:number):string=>new Intl.NumberFormat("vi-VN",{maximumFractionDigits:0}).format(v)+" đ";
let tableCounter=0;
function buildTable(items:readonly Row[]):HTMLElement{
 const isOrder=items.some(x=>x.price>0);
 const fields:ColumnSpec[]=isOrder?COLUMN_SCHEMA.filter(x=>["index","name","quantity","total"].includes(x.key)):COLUMN_SCHEMA.filter(x=>["index","name","quantity"].includes(x.key));
 // Modern Web Guidance: accessible keyboard-scrollable region, one semantic table.
 const root=make("div","ds-table-scroll cg2-table-slot");
 root.tabIndex=0;
 root.setAttribute("role","region");
 const table=mark(make("table","ds-table ds-table--schema"),"DATA-TABLE");
 const caption=make("caption","cg2-sr-only",isOrder?"Đơn hàng mẫu":"Danh sách lấy hàng mẫu");
 caption.id="cg2-table-caption-"+(++tableCounter);
 root.setAttribute("aria-labelledby",caption.id);
 table.append(caption);
 const colgroup=make("colgroup");
 for(const field of fields){const col=mark(make("col"),"TABLE-COLUMN");col.dataset.colKey=field.key;col.dataset.colRole=field.role;col.style.width=field.minPx+"px";colgroup.append(col);}
 table.append(colgroup);
 const thead=make("thead"),tr=make("tr");
 for(const field of fields){const th=make("th","",field.key==="quantity"?"SL":field.label);th.scope="col";th.dataset.colRole=field.role;th.dataset.colKey=field.key;th.style.textAlign=alignmentForRole(field.role);tr.append(th);}
 thead.append(tr);table.append(thead);
 const tbody=make("tbody");
 for(const row of items){
  const line=make("tr");
  for(const field of fields){
   const v=row[field.key as keyof Row];
   const label=typeof v==="number"&&field.role==="money"?money(v):String(v);
   const td=make("td","",label);td.dataset.colKey=field.key;td.dataset.colRole=field.role;td.style.textAlign=alignmentForRole(field.role);line.append(td);
  }
  tbody.append(line);
 }
 table.append(tbody);root.append(table);return root;
}
function buildPart(part:MessagePart,index:number):HTMLElement{
 if(part.kind==="text"){
  const p=mark(make("p","cg2-text-part",part.text||""),"MESSAGE-TEXT-PART");
  p.dataset.partOrder=String(index);return p;
 }
 if(part.kind==="table"){
  const p=mark(make("div","cg2-table-part"),"MESSAGE-TABLE-PART");
  p.dataset.partOrder=String(index);p.append(buildTable(part.rows||[]));return p;
 }
 const p=mark(make("div","ds-media-list cg2-media-part"),"MESSAGE-MEDIA-PART");
 p.dataset.partOrder=String(index);
 for(let i=0;i<(part.count||1);i++){
  const tile=mark(make("div","ds-media-tile"),"MESSAGE-MEDIA-TILE");
  const placeholder=make("div","ds-media-placeholder","Ảnh "+(i+1));
  const name=make("small","","Ảnh minh hoạ");
  tile.append(placeholder,name);p.append(tile);
 }
 return p;
}
function buildMessage(message:Message):HTMLElement{
 const el=mark(make("article","cg2-message ds-message cg2-"+message.side),"CHAT-MESSAGE");
 el.dataset.messageId=message.id;el.tabIndex=0;
 el.setAttribute("aria-label",(message.side==="incoming"?"Tin nhận lúc ":"Tin gửi lúc ")+message.time+". Nhấn Enter để xem thao tác của tin.");
 const parts=mark(make("div","cg2-content-parts"),"MESSAGE-CONTENT-PARTS");
 message.parts.forEach((part,i)=>parts.append(buildPart(part,i)));
 el.append(parts);
 el.append(mark(make("time","cg2-message-time",message.time),"MESSAGE-TIME"));
 const actions=mark(make("div","ui-action-strip cg2-message-actions"),"CHAT-MESSAGE-ACTIONS");
 const copy=mark(make("button","ui-button ui-button--secondary"),"MESSAGE-COPY-BUTTON");
 copy.type="button";copy.setAttribute("aria-label","Sao chép nội dung tin mẫu");
 const svg=document.createElementNS("http://www.w3.org/2000/svg","svg");
 svg.classList.add("ui-icon");svg.setAttribute("aria-hidden","true");
 const use=document.createElementNS("http://www.w3.org/2000/svg","use");
 use.setAttribute("href","./web/icons.svg#ui-icon-copy");svg.append(use);
 copy.append(svg,document.createTextNode("Sao chép"));
 copy.addEventListener("click",()=>{
  const text=message.parts.filter(p=>p.text).map(p=>p.text).join("\n")||"Tin đa phương tiện mẫu";
  if(navigator.clipboard?.writeText){
   void navigator.clipboard.writeText(text).then(()=>feedback("Đã sao chép nội dung của "+message.id+".")).catch(()=>feedback("Không thể sao chép từ trình duyệt này."));
  }else feedback("Trình duyệt hiện tại không hỗ trợ sao chép tự động.");
 });
 actions.append(copy);el.append(actions);return el;
}
function renderMessages():void{
 messageList.replaceChildren();
 messageList.append(mark(make("div","cg2-day","Hôm nay · Nội dung mẫu"),"THREAD-DAY-MARKER"));
 messages[contact].forEach(m=>messageList.append(buildMessage(m)));
 const jump=mark(make("button","ui-button ui-button--secondary cg2-jump","↓ Tin cuối"),"THREAD-JUMP-TO-LATEST");
 jump.type="button";jump.id="cg2Jump";jump.addEventListener("click",()=>messageList.scrollTo({top:messageList.scrollHeight}));
 messageList.append(jump);
 const renderedContact=contact;
 requestAnimationFrame(()=>{
  if(contact!==renderedContact)return;
  const saved=scrollPositions[renderedContact];
  messageList.scrollTop=saved===undefined?messageList.scrollHeight:Math.min(saved,Math.max(0,messageList.scrollHeight-messageList.clientHeight));
  updateJump();
 });
 runAudit();
}
function updateJump():void{
 const jump=$<HTMLButtonElement>("cg2Jump");
 jump.hidden=messageList.scrollHeight-messageList.scrollTop-messageList.clientHeight<110;
}
function showSelection(element:HTMLElement):void{
 const id=element.dataset.uiComponent;if(!id)return;
 const ids:string[]=[];
 for(let cur:HTMLElement|null=element;cur;cur=cur.parentElement){if(cur.dataset.uiComponent)ids.unshift(cur.dataset.uiComponent);}
 $("cg2Selected").textContent=id;
 $("cg2Breadcrumb").textContent=ids.join(" → ");
 const contract=getComponentContract(id);
 $("cg2OwnerHint").textContent=contract?contract.description+" · Định nghĩa: "+contract.owner:"Vị trí của thành phần trong bố cục cha.";
 host.querySelectorAll(".cg2-selected").forEach(el=>el.classList.remove("cg2-selected"));
 element.classList.add("cg2-selected");
}
function runAudit():void{
 const issues=[...auditComponentRegistry(),...auditComponentPlacements(),...auditComposerTree(host)];
 for(const el of Array.from(host.querySelectorAll<HTMLElement>('[data-ui-component="CHAT-MESSAGE"]'))){
  issues.push(...auditMessageTree(el).map(x=>el.dataset.messageId+": "+x));
 }
 const labeled=Array.from(host.querySelectorAll<HTMLElement>("[data-ui-component]"));
 for(const el of labeled){
  const id=el.dataset.uiComponent||"";
  const parent=el.parentElement?.closest<HTMLElement>("[data-ui-component]");
  if(parent && !getAllowedComponentParents(id).includes(parent.dataset.uiComponent||"")){
   issues.push("Sai cha: "+id+" trong "+parent.dataset.uiComponent);
  }
 }
 $("cg2Audit").textContent=issues.length?"Cần sửa "+issues.length+" quan hệ":"Cấu trúc cha–con hợp lệ";
 $("cg2Audit").classList.toggle("cg2-audit-ok",!issues.length);
 $("cg2AuditDetail").textContent=issues.length?issues.slice(0,3).join(" · "):"Một danh bạ · một vùng nội dung · một Composer · mỗi tin một ContentParts; nút/bảng/media dùng mẫu gốc.";
}
function setLayout(v:Layout):void{
 layout=v;frame.dataset.layout=v;setPressed("data-layout",v);
 feedback(v==="three"?"Ghép thêm vùng Công việc cấp 2; mẫu con giữ nguyên.":v==="focus"?"Ẩn vùng danh bạ và Công việc, chỉ đổi bố cục cha.":"Bố cục 2 vùng: danh bạ + hội thoại.");
 runAudit();
}
function setDevice(v:Device):void{
 // Keep the reading position when simulating the keyboard or changing form factor.
 const remaining=messageList.scrollHeight-messageList.scrollTop-messageList.clientHeight;
 const wasAtBottom=remaining<=80;
 const before=messageList.scrollTop;
 device=v;frame.dataset.device=v;frame.dataset.mobileView="thread";setPressed("data-device",v);
 requestAnimationFrame(()=>{
  messageList.scrollTop=wasAtBottom?messageList.scrollHeight:before;
  updateJump();
 });
}
document.querySelectorAll<HTMLButtonElement>("[data-layout]").forEach(b=>b.addEventListener("click",()=>setLayout(b.dataset.layout as Layout)));
document.querySelectorAll<HTMLButtonElement>("[data-device]").forEach(b=>b.addEventListener("click",()=>setDevice(b.dataset.device as Device)));
$<HTMLInputElement>("cg2Search").addEventListener("input",filterContacts);
$("cg2New").addEventListener("click",()=>openContact("group"));
$("cg2Back").addEventListener("click",()=>{frame.dataset.mobileView="directory";feedback("Đang xem cùng vùng Danh bạ, không tạo danh sách thứ hai.");});
$("cg2Menu").addEventListener("click",()=>showSelection($("cg2Screen").querySelector('[data-ui-component="CHAT-REGION-TOP"]') as HTMLElement));
$("cg2Attach").addEventListener("click",()=>{
 const next=messages[contact].length+1;messages[contact].push({id:contact+"m"+next,side:"outgoing",time:"Vừa tạo",parts:[{kind:"media",count:2}]});
 delete scrollPositions[contact];
 renderMessages();feedback("Đã ghép hai ds-media-tile trong MESSAGE-MEDIA-PART của một tin mẫu.");
});
$("cg2Mic").addEventListener("click",()=>feedback("Mic là nút con có sẵn của COMPOSER-TOOLBAR, demo không xin quyền micro."));
const form=$<HTMLFormElement>("cg2Composer");
input.addEventListener("input",()=>{drafts[contact]=input.value;});
// Modern Web Guidance: Enter submits, Shift+Enter adds a line; never submit on IME confirmation.
// Safari may report the confirming Enter as keyCode 229 after compositionend.
input.addEventListener("keydown",event=>{
 if(event.key!=="Enter"||event.shiftKey)return;
 event.preventDefault();
 if(event.isComposing||event.keyCode===229)return;
 form.requestSubmit();
});
form.addEventListener("submit",e=>{
 e.preventDefault();const value=input.value.trim();if(!value)return;
 const next=messages[contact].length+1;messages[contact].push({id:contact+"t"+next,side:"outgoing",time:"Vừa tạo",parts:[{kind:"text",text:value.slice(0,800)}]});
 input.value="";drafts[contact]="";delete scrollPositions[contact];
 renderMessages();feedback("Đã thêm một Message với TextPart mới vào đúng MessageList (chỉ demo).");
});
messageList.addEventListener("scroll",updateJump,{passive:true});
// The action bar belongs to its message and does not reserve space while closed.
host.addEventListener("keydown",event=>{
 const target=event.target as HTMLElement;
 if(!target.matches(".cg2-message")||(event.key!=="Enter"&&event.key!==" "))return;
 event.preventDefault();
 target.classList.toggle("cg2-actions-open");
});
host.addEventListener("click",e=>{
 const target=e.target as HTMLElement;
 if(target.closest("button,input,textarea"))return;
 const message=target.closest<HTMLElement>(".cg2-message");
 if(message){
  host.querySelectorAll<HTMLElement>(".cg2-message.cg2-actions-open").forEach(item=>{if(item!==message)item.classList.remove("cg2-actions-open");});
  message.classList.toggle("cg2-actions-open");
 }
 const node=target.closest<HTMLElement>("[data-ui-component]");
 if(node&&host.contains(node))showSelection(node);
});
renderContacts();renderHeader();renderMessages();setLayout("two");setDevice("desktop");
