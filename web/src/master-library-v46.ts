// V46 · A NEW, 2027-owned master library. No CHAT/TAPHOA implementation is loaded.
// All specimens are original, local demonstrations. Shared primitives: ui-button,
// ds-composer, ds-qty, ds-table, COLUMN_SCHEMA and web/icons.svg.
import {getComponentContract} from "./component-contracts.js";
import {COLUMN_SCHEMA} from "./column-matrix.js";
import {iconNode} from "./icon-motion-gallery.js";
export type MasterMode="chat"|"sales"|"work"|"report";
export const MASTER_MODES:readonly {id:MasterMode;label:string;contract:string;description:string}[]=[
 {id:"chat",label:"Trò chuyện",contract:"CHAT-SCREEN",description:"Tin nhắn nhiều phần và ô gõ hợp nhất"},
 {id:"sales",label:"Bán hàng",contract:"SALES-SCREEN",description:"Một stepper và một bảng ngữ nghĩa gốc"},
 {id:"work",label:"Công việc",contract:"WORK-SCREEN",description:"Danh sách nhiệm vụ, trạng thái thuộc từng hàng"},
 {id:"report",label:"Báo cáo",contract:"REPORT-SCREEN",description:"Một projection khác của bảng gốc"}
];
const make=<K extends keyof HTMLElementTagNameMap>(tag:K,className="",value=""):HTMLElementTagNameMap[K]=>{
 const node=document.createElement(tag);
 if(className)node.className=className;
 if(value)node.textContent=value;
 return node;
};
function mark<T extends HTMLElement>(node:T,id:string):T{node.dataset.uiComponent=id;return node;}
function control(title:string,icon:string,variant="secondary"):HTMLButtonElement{
 const node=mark(make("button","ui-button ui-button--"+variant),"UI-BUTTON");
 node.type="button";node.title=title;node.setAttribute("aria-label",title);
 const glyph=make("span");const svg=iconNode(icon);
 svg.setAttribute("data-ui-component","UI-ICON");glyph.append(svg);node.append(glyph);return node;
}
function frame(title:string):HTMLElement{
 const shell=mark(make("section","master-v46-frame"),"UI-SHELL");
 const header=make("header","master-v46-top");
 header.append(make("strong","",title),make("small","","UI 2027 · minh họa"));
 const screenSlot=mark(make("div"),"UI-SCREEN-SLOT");
 shell.append(header,screenSlot);return shell;
}
function placeScreen(shell:HTMLElement,screen:HTMLElement):void{
 const slot=shell.querySelector<HTMLElement>('[data-ui-component="UI-SCREEN-SLOT"]');
 if(!slot)throw new Error("2027 screen requires UI-SCREEN-SLOT");
 slot.append(screen);
}
function message(text:string,author="other"):HTMLElement{
 const item=mark(make("article","master-v46-message"),"CHAT-MESSAGE");
 item.dataset.author=author;
 const parts=mark(make("div","master-v46-message-parts"),"MESSAGE-CONTENT-PARTS");
 parts.append(mark(make("p","",text),"MESSAGE-TEXT-PART"));item.append(parts);return item;
}
function chat():HTMLElement{
 // PA2: one responsive workspace owns directory, conversation and OPTIONAL
 // context. On mobile these are exclusive views; no second scroll/keyboard owner.
 const view=frame("Trò chuyện · PA2 thích ứng");
 const screen=mark(make("div","master-v46-screen master-v46-chat"),"CHAT-SCREEN");
 screen.dataset.mobileView="directory";
 screen.dataset.contextOpen="false";
 const directory=mark(make("aside","master-v46-directory"),"CHAT-DIRECTORY");
 directory.setAttribute("aria-label","Danh bạ mẫu");
 const dirHeading=make("h3","","Trò chuyện");
 const tools=mark(make("div","master-v46-directory-tools"),"DIRECTORY-TOOLS");
 const search=mark(make("input","master-v46-contact-search"),"DIRECTORY-SEARCH");
 search.type="search";search.placeholder="Tìm khách…";search.setAttribute("aria-label","Tìm khách trong mẫu");
 tools.append(search);
 const contacts=mark(make("div","master-v46-contact-list"),"DIRECTORY-LIST");
 const entries=[
  {id:"a",name:"Khách mẫu A",preview:"Đã nhận hàng"},
  {id:"b",name:"Khách mẫu B",preview:"Xin báo giá"},
  {id:"c",name:"Nhóm KH mẫu",preview:"Thông tin tổng hợp"}
 ] as const;
 type ContactKey=typeof entries[number]["id"];
 let active:ContactKey="a";
 const samples:Record<ContactKey,{body:string;author:string}[]>={
  a:[{body:"Có thể cho xem nội dung đơn hôm nay?",author:"other"},{body:"Mình đã gửi thông tin mẫu.",author:"self"}],
  b:[{body:"Cho mình xin bảng giá tham khảo.",author:"other"}],
  c:[{body:"Đây là hội thoại nhóm mẫu.",author:"other"}]
 };
 const drafts:Record<ContactKey,string>={a:"",b:"",c:""};
 const rows=new Map<ContactKey,HTMLButtonElement>();
 const conversation=make("section","master-v46-conversation");
 conversation.setAttribute("aria-label","Hội thoại mẫu");
 const head=mark(make("header","master-v46-conversation-head"),"CHAT-REGION-TOP");
 const back=control("Quay về danh bạ","arrow-left");
 back.classList.add("master-v46-mobile-back");
 const identity=make("strong","master-v46-contact-identity",entries[0].name);
 const contextButton=control("Xem công việc liên quan mẫu","panel-right");
 contextButton.setAttribute("aria-expanded","false");
 head.append(back,identity,contextButton);
 const thread=mark(make("div","master-v46-thread"),"CHAT-THREAD");
 const list=mark(make("div","master-v46-messages"),"CHAT-MESSAGE-LIST");
 const composer=mark(make("form","ds-composer master-v46-composer"),"CHAT-COMPOSER");
 const input=mark(make("textarea"),"COMPOSER-INPUT");
 input.placeholder="Nhập nội dung mẫu…";input.rows=1;
 input.setAttribute("aria-label","Nội dung soạn mẫu");
 const toolbar=mark(make("div","ds-composer-actions master-v46-toolbar"),"COMPOSER-TOOLBAR");
 const attach=control("Mở khay đính kèm mẫu","plus");
 const send=control("Thêm tin mẫu cục bộ","send-up");
 const hint=make("p","master-v46-inline-hint");hint.hidden=true;
 attach.addEventListener("click",()=>{
  hint.hidden=!hint.hidden;
  hint.textContent="Khay mẫu: ảnh · tệp (không mở thiết bị hoặc upload).";
 });
 const renderMessages=()=>{
  list.replaceChildren(...samples[active].map(entry=>message(entry.body,entry.author)));
 };
 const select=(id:ContactKey)=>{
  drafts[active]=input.value;
  active=id;
  for(const [key,row] of rows){const selected=key===id;row.setAttribute("aria-current",selected?"true":"false");}
  identity.textContent=entries.find(entry=>entry.id===id)!.name;
  input.value=drafts[id];
  renderMessages();
  screen.dataset.mobileView="thread";
  screen.dataset.contextOpen="false";contextPanel.hidden=true;contextButton.setAttribute("aria-expanded","false");
 };
 for(const entry of entries){
  const row=mark(make("button","master-v46-contact-row"),"DIRECTORY-CONTACT-ROW");
  row.type="button";row.dataset.contact=entry.id;
  row.setAttribute("aria-current",String(entry.id===active));
  const avatar=mark(make("span","master-v46-contact-avatar",entry.name.slice(-1)),"CONTACT-AVATAR");
  const body=make("span","master-v46-contact-copy");
  body.append(mark(make("strong","",entry.name),"CONTACT-NAME"),make("small","",entry.preview));
  row.append(avatar,body);
  row.addEventListener("click",()=>select(entry.id));
  contacts.append(row);rows.set(entry.id,row);
 }
 search.addEventListener("input",()=>{
  const query=search.value.trim().toLocaleLowerCase("vi");
  for(const entry of entries){rows.get(entry.id)!.hidden=!entry.name.toLocaleLowerCase("vi").includes(query);}
 });
 directory.append(dirHeading,tools,contacts);
 const onSend=()=>{
  const text=input.value.trim();if(!text)return;
  samples[active].push({body:text.slice(0,500),author:"self"});
  input.value="";drafts[active]="";renderMessages();
  list.scrollTop=list.scrollHeight;
 };
 input.addEventListener("input",()=>{drafts[active]=input.value;});
 send.addEventListener("click",onSend);
 toolbar.append(attach,send);composer.append(input,toolbar,hint);
 composer.addEventListener("submit",event=>{event.preventDefault();onSend();});
 thread.append(list,composer);conversation.append(head,thread);
 const contextPanel=mark(make("aside","master-v46-context"),"CHAT-WORK-REGION");
 contextPanel.hidden=true;contextPanel.setAttribute("aria-label","Ngữ cảnh công việc mẫu");
 const contextHead=make("div","master-v46-context-head");
 const contextTitle=make("strong","","Công việc liên quan");
 const contextClose=control("Đóng vùng ngữ cảnh","x");
 contextHead.append(contextTitle,contextClose);
 contextPanel.append(contextHead,make("p","","Chỉ là vị trí nội dung theo khách đang xem. Không truy cập đơn hàng hoặc dữ liệu thật."));
 const closeContext=()=>{
  contextPanel.hidden=true;screen.dataset.contextOpen="false";screen.dataset.mobileView="thread";
  contextButton.setAttribute("aria-expanded","false");
 };
 contextButton.addEventListener("click",()=>{
  const opening=contextPanel.hidden;
  contextPanel.hidden=!opening;screen.dataset.contextOpen=String(opening);
  if(opening)screen.dataset.mobileView="context";
  else screen.dataset.mobileView="thread";
  contextButton.setAttribute("aria-expanded",String(opening));
 });
 contextClose.addEventListener("click",closeContext);
 back.addEventListener("click",()=>{
  closeContext();screen.dataset.mobileView="directory";
 });
 renderMessages();
 screen.append(directory,conversation,contextPanel);
 placeScreen(view,screen);return view;
}
function table(keys:readonly string[],rows:readonly (readonly string[])[]):HTMLElement{
 const outer=make("div","master-v46-scroll-table");
 const base=mark(make("table","ds-table ds-table--schema"),"DATA-TABLE");
 const columns=keys.map(key=>COLUMN_SCHEMA.find(x=>x.key===key));
 if(columns.some(x=>!x))throw new Error("Thiếu cột trong COLUMN_SCHEMA");
 const thead=make("thead"),hrow=make("tr");
 columns.forEach(x=>{const cell=mark(make("th","",x!.label),"TABLE-COLUMN");cell.scope="col";cell.dataset.colRole=x!.role;hrow.append(cell);});
 thead.append(hrow);base.append(thead);
 const tbody=make("tbody");
 for(const values of rows){
  const tr=make("tr");
  values.forEach((value,index)=>{
   const td=make("td","",value);
   td.dataset.colRole=columns[index]!.role;tr.append(td);
  });tbody.append(tr);
 }
 base.append(tbody);outer.append(base);return outer;
}
function sales():HTMLElement{
 const shell=frame("Bán hàng · mẫu 2027");
 const screen=mark(make("div","master-v46-screen"),"SALES-SCREEN");
 const list=mark(make("div","master-v46-product-list"),"SALES-PRODUCT-LIST");
 const row=mark(make("div","master-v46-product-row"),"SALES-PRODUCT-ROW");
 row.append(make("div","master-v46-item-name","Mặt hàng minh họa"));
 const slot=mark(make("div"),"SALES-QUANTITY-SLOT");
 const qty=mark(make("div","ds-qty"),"QUANTITY-STEPPER");
 const minus=control("Giảm số lượng","minus"),plus=control("Tăng số lượng","plus");
 const value=mark(make("input"),"QUANTITY-VALUE");value.value="2";value.inputMode="numeric";value.setAttribute("aria-label","Số lượng minh họa");
 const sanitize=()=>{const digits=value.value.replace(/[^0-9]/g,"");const n=Number.parseInt(digits,10);value.value=String(Number.isFinite(n)?Math.min(99,Math.max(0,n)):0);};
 value.addEventListener("input",sanitize);
 minus.addEventListener("click",()=>{sanitize();value.value=String(Math.max(0,Number(value.value)-1));});
 plus.addEventListener("click",()=>{value.value=String(Math.min(99,(Number(value.value)||0)+1));});
 qty.append(minus,value,plus);slot.append(qty);row.append(slot);list.append(row);
 const tableSlot=mark(make("div"),"SALES-TABLE-SLOT");
 tableSlot.append(table(["index","name","quantity","price","total"],[["1","Mặt hàng mẫu","2","12.000","24.000"]]));
 screen.append(list,tableSlot);placeScreen(shell,screen);return shell;
}
function work():HTMLElement{
 const shell=frame("Công việc · mẫu 2027"),screen=mark(make("div","master-v46-screen"),"WORK-SCREEN");
 const list=mark(make("div","master-v46-task-list"),"WORK-TASK-LIST");
 for(const [title,state] of [["Đối chiếu nội dung","Đang làm"],["Xem lại bản nháp","Chưa bắt đầu"],["Kiểm tra giao diện","Hoàn tất"]]){
  const row=mark(make("div","master-v46-task-row"),"WORK-TASK-ROW");
  row.append(make("span","",title),make("small","",state));list.append(row);
 }
 screen.append(list);placeScreen(shell,screen);return shell;
}
function report():HTMLElement{
 const shell=frame("Báo cáo · mẫu 2027"),screen=mark(make("div","master-v46-screen"),"REPORT-SCREEN");
 const slot=mark(make("div"),"REPORT-TABLE-SLOT");
 slot.append(table(["index","name","quantity","total"],[["1","Nhóm A","12","120.000"],["2","Nhóm B","4","64.000"]]));
 screen.append(slot);placeScreen(shell,screen);return shell;
}
function renderPath(id:string):string[]{
 const path:string[]=[],seen=new Set<string>();
 let cursor=getComponentContract(id);
 while(cursor&&!seen.has(cursor.id)){path.unshift(cursor.id);seen.add(cursor.id);cursor=cursor.parent?getComponentContract(cursor.parent):undefined;}
 return path;
}
export function initMasterLibraryV46():void{
 const root=document.getElementById("masterV46Preview"),path=document.getElementById("masterV46Path"),
 status=document.getElementById("masterV46Status");
 if(!root||!path||!status)return;
 const buttons=Array.from(document.querySelectorAll<HTMLButtonElement>("[data-master-v46-mode]"));
 const render=(mode:MasterMode)=>{
  const config=MASTER_MODES.find(x=>x.id===mode);
  if(!config)return;
  root.replaceChildren((mode==="chat"?chat:mode==="sales"?sales:mode==="work"?work:report)());
  path.textContent=renderPath(config.contract).join(" → ");
  const contracts=renderPath(config.contract);
  status.textContent=config.description+" · "+contracts.length+" cấp trong cây thư viện cha.";
  for(const button of buttons)button.setAttribute("aria-pressed",String(button.dataset.masterV46Mode===mode));
 };
 for(const button of buttons)button.addEventListener("click",()=>{
  const id=button.dataset.masterV46Mode;
  if(id==="chat"||id==="sales"||id==="work"||id==="report")render(id);
 });
 render("chat");
}
