// V46 · A NEW, 2027-owned master library. No CHAT/TAPHOA implementation is loaded.
// All specimens are original, local demonstrations. Shared primitives: ui-button,
// ds-composer, ds-qty, ds-table, COLUMN_SCHEMA and web/icons.svg.
import {getComponentContract,getAllowedComponentParents} from "./component-contracts.js";
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
 const glyph=make("span");glyph.append(iconNode(icon));node.append(glyph);return node;
}
function frame(title:string):HTMLElement{
 const shell=mark(make("section","master-v46-frame"),"UI-SHELL");
 const header=make("header","master-v46-top");
 header.append(make("strong","",title),make("small","","UI 2027 · minh họa"));
 shell.append(header);return shell;
}
function message(text:string,author="other"):HTMLElement{
 const item=mark(make("article","master-v46-message"),"CHAT-MESSAGE");
 item.dataset.author=author;
 const parts=mark(make("div","master-v46-message-parts"),"MESSAGE-CONTENT-PARTS");
 parts.append(mark(make("p","",text),"MESSAGE-TEXT-PART"));item.append(parts);return item;
}
function chat():HTMLElement{
 const view=frame("Hội thoại · mẫu 2027");
 const screen=mark(make("div","master-v46-screen master-v46-chat"),"CHAT-SCREEN");
 const thread=mark(make("div","master-v46-thread"),"CHAT-THREAD");
 const list=mark(make("div","master-v46-messages"),"CHAT-MESSAGE-LIST");
 list.append(message("Một tin nhắn có thể chứa chữ, bảng, ảnh hoặc nhiều phần nội dung."),message("Một chủ sở hữu cho cuộn, trạng thái và hành động.", "self"));
 const composer=mark(make("form","ds-composer master-v46-composer"),"CHAT-COMPOSER");
 const input=mark(make("textarea"),"COMPOSER-INPUT");input.placeholder="Nhập nội dung mẫu…";input.rows=1;
 input.setAttribute("aria-label","Nội dung soạn mẫu");
 const toolbar=mark(make("div","ds-composer-actions master-v46-toolbar"),"COMPOSER-TOOLBAR");
 toolbar.append(control("Đính kèm mẫu","plus"),control("Gửi thử (không gửi thật)","send-up"));
 composer.append(input,toolbar);composer.addEventListener("submit",event=>event.preventDefault());
 thread.append(list,composer);screen.append(thread);view.append(screen);return view;
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
 minus.addEventListener("click",()=>{value.value=String(Math.max(0,Number(value.value)||0)-1<0?0:Math.max(0,(Number(value.value)||0)-1));});
 plus.addEventListener("click",()=>{value.value=String(Math.min(99,(Number(value.value)||0)+1));});
 qty.append(minus,value,plus);slot.append(qty);row.append(slot);list.append(row);
 const tableSlot=mark(make("div"),"SALES-TABLE-SLOT");
 tableSlot.append(table(["index","name","quantity","price","total"],[["1","Mặt hàng mẫu","2","12.000","24.000"]]));
 screen.append(list,tableSlot);shell.append(screen);return shell;
}
function work():HTMLElement{
 const shell=frame("Công việc · mẫu 2027"),screen=mark(make("div","master-v46-screen"),"WORK-SCREEN");
 const list=mark(make("div","master-v46-task-list"),"WORK-TASK-LIST");
 for(const [title,state] of [["Đối chiếu nội dung","Đang làm"],["Xem lại bản nháp","Chưa bắt đầu"],["Kiểm tra giao diện","Hoàn tất"]]){
  const row=mark(make("div","master-v46-task-row"),"WORK-TASK-ROW");
  row.append(make("span","",title),make("small","",state));list.append(row);
 }
 screen.append(list);shell.append(screen);return shell;
}
function report():HTMLElement{
 const shell=frame("Báo cáo · mẫu 2027"),screen=mark(make("div","master-v46-screen"),"REPORT-SCREEN");
 const slot=mark(make("div"),"REPORT-TABLE-SLOT");
 slot.append(table(["index","name","quantity","total"],[["1","Nhóm A","12","120.000"],["2","Nhóm B","4","64.000"]]));
 screen.append(slot);shell.append(screen);return shell;
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
