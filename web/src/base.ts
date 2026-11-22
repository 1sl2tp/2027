// 2027 UI-V09: local-only original foundation template.
// The ChatGPT/Facebook/Gemini switches apply original 2027 CSS presets.
// No live authentication, messaging, orders, payments, or network calls.
export {};
type Preset = "original"|"chatgpt"|"facebook"|"gemini";
type ModuleKey = "chat"|"work"|"sales";
type Device = "desktop"|"phone";
type CustomerId = "a"|"b"|"c";
interface FoundationState{
 preset:Preset;device:Device;module:ModuleKey;customer:CustomerId;quantity:number;
}
const descriptions:Record<Preset,string>={
 original:"Mẫu gốc 2027: cách đọc nội dung rõ ràng, danh sách gọn và ô nhập bo mềm. Đây là thiết kế mặc định.",
 chatgpt:"Tham khảo cách trình bày văn bản và bố cục đọc của ChatGPT. Đây không phải giao diện hay CSS chính thức của ChatGPT.",
 facebook:"Tham khảo cách tổ chức danh sách và tương tác theo hàng của Facebook/Messenger, không sao chép UI chính thức.",
 gemini:"Tham khảo nhịp khoảng cách và bề mặt ô nhập của Gemini. Đây là phương án do 2027 thiết kế lại."
};
const state:FoundationState={preset:"original",device:"desktop",module:"chat",customer:"a",quantity:2};
const customerNames:Record<CustomerId,string>={a:"Khách mẫu A",b:"Khách mẫu B",c:"Khách mẫu C"};
const moduleNames:Record<ModuleKey,string>={chat:"Trò chuyện",work:"Công việc",sales:"Bán hàng"};
const styles=[
 "--base-canvas","--base-sidebar","--base-surface","--base-ink","--base-sub",
 "--base-border","--base-accent","--base-on-accent","--base-bubble",
 "--base-radius","--base-composer-radius","--base-sidebar-width","--base-leading"
];
function byId<T extends HTMLElement>(id:string):T{
 const element=document.getElementById(id);
 if(!element)throw new Error("Missing foundation element: "+id);
 return element as T;
}
const preview=byId<HTMLDivElement>("basePreview");
const feedback=byId<HTMLSpanElement>("baseFeedback");
const menu=byId<HTMLDivElement>("baseMenu");
const moreButton=byId<HTMLButtonElement>("baseMoreButton");
const thread=byId<HTMLDivElement>("baseThread");
const quantity=byId<HTMLInputElement>("baseQty");
const messageInput=byId<HTMLTextAreaElement>("baseMessage");
const dialog=byId<HTMLDialogElement>("baseDialog");
function notify(message:string):void{feedback.textContent=message;}
function setPressed(selector:string,attribute:string,value:string):void{
 for(const button of Array.from(document.querySelectorAll<HTMLButtonElement>(selector))){
  const current=button.getAttribute(attribute)===value;
  button.classList.toggle("selected",current);
  button.setAttribute("aria-pressed",String(current));
  if(attribute==="data-view")button.setAttribute("aria-current",current?"page":"false");
 }
}
function cssText():string{
 const computed=getComputedStyle(preview);
 const lines=styles.map(name=>"  "+name+": "+computed.getPropertyValue(name).trim()+";");
 return "/* 2027 UI Library · Bản "+state.preset+" · Token theo vai trò */\n:root {\n"+lines.join("\n")+"\n}";
}
function refreshTokens():void{byId<HTMLElement>("baseTokenOutput").textContent=cssText();}
function closeMenu():void{
 if(menu.hidden)return;
 menu.hidden=true;moreButton.setAttribute("aria-expanded","false");
}
function render():void{
 preview.dataset.preset=state.preset;preview.dataset.device=state.device;preview.dataset.view=state.module;
 byId<HTMLElement>("basePresetDescription").textContent=descriptions[state.preset];
 byId<HTMLElement>("baseCurrentModule").textContent=moduleNames[state.module];
 byId<HTMLElement>("baseViewHint").textContent=moduleNames[state.module]+" · Bản mẫu cục bộ";
 byId<HTMLElement>("baseCustomerName").textContent=customerNames[state.customer];
 for(const section of Array.from(document.querySelectorAll<HTMLElement>(".base-view-panel"))){
  section.hidden=section.dataset.panel!==state.module;
 }
 setPressed("[data-preset]","data-preset",state.preset);
 setPressed("[data-device]","data-device",state.device);
 setPressed("[data-view]","data-view",state.module);
 for(const b of Array.from(document.querySelectorAll<HTMLButtonElement>("[data-customer]"))){
  const active=b.dataset.customer===state.customer;
  b.classList.toggle("selected",active);
  b.setAttribute("aria-pressed",String(active));
 }
 quantity.value=String(state.quantity);
 byId<HTMLElement>("baseQtyStat").textContent=String(state.quantity);
 byId<HTMLElement>("baseRowQuantity").textContent=String(state.quantity);
 byId<HTMLElement>("baseAmountStat").textContent=new Intl.NumberFormat("vi-VN").format(state.quantity*12000)+" đ";
 byId<HTMLElement>("baseRowPrice").textContent=new Intl.NumberFormat("vi-VN").format(state.quantity*12000)+" đ";
 byId<HTMLElement>("baseSalesTotal").textContent=new Intl.NumberFormat("vi-VN").format(state.quantity*12000)+" đ";
 const minus=byId<HTMLButtonElement>("baseQtyMinus"),plus=byId<HTMLButtonElement>("baseQtyPlus");
 minus.disabled=state.quantity<=0;plus.disabled=state.quantity>=99;
 refreshTokens();
}
for(const button of Array.from(document.querySelectorAll<HTMLButtonElement>("[data-preset]"))){
 button.addEventListener("click",()=>{
  const value=button.dataset.preset as Preset;
  if(!Object.prototype.hasOwnProperty.call(descriptions,value))return;
  state.preset=value;render();notify("Đang so sánh mẫu "+button.textContent?.trim()+". HTML và dữ liệu không thay đổi.");
 });
}
for(const button of Array.from(document.querySelectorAll<HTMLButtonElement>("[data-device]"))){
 button.addEventListener("click",()=>{
  const value=button.dataset.device;
  if(value!=="desktop"&&value!=="phone")return;
  state.device=value as Device;render();notify("Đang xem chế độ "+(value==="phone"?"mobile":"rộng")+".");
 });
}
for(const button of Array.from(document.querySelectorAll<HTMLButtonElement>("[data-view]"))){
 button.addEventListener("click",()=>{
  const value=button.dataset.view;
  if(value!=="chat"&&value!=="work"&&value!=="sales")return;
  state.module=value as ModuleKey;render();thread.scrollTop=0;
  notify("Đang xem khung "+moduleNames[state.module]+" trong mẫu 2027.");
 });
}
for(const button of Array.from(document.querySelectorAll<HTMLButtonElement>("[data-customer]"))){
 button.addEventListener("click",()=>{
  const id=button.dataset.customer as CustomerId;
  if(!Object.prototype.hasOwnProperty.call(customerNames,id))return;
  state.customer=id;render();notify("Đã đổi ngữ cảnh sang "+customerNames[id]+" (mẫu, không dữ liệu thật).");
 });
}
byId<HTMLInputElement>("baseSearch").addEventListener("input",event=>{
 const value=(event.target as HTMLInputElement).value.trim().toLocaleLowerCase("vi");
 let found=0;
 for(const contact of Array.from(document.querySelectorAll<HTMLButtonElement>("[data-customer]"))){
  const visible=(contact.dataset.name||"").toLocaleLowerCase("vi").includes(value);
  contact.hidden=!visible;if(visible)found++;
 }
 notify("Tìm trong danh bạ mẫu: "+found+" kết quả.");
});
function changeQuantity(n:number):void{
 if(!Number.isFinite(n))return;
 state.quantity=Math.max(0,Math.min(99,Math.round(n)));
 render();notify("Đã chỉnh số lượng mẫu thành "+state.quantity+". Không tạo đơn thật.");
}
byId<HTMLButtonElement>("baseQtyMinus").addEventListener("click",()=>changeQuantity(state.quantity-1));
byId<HTMLButtonElement>("baseQtyPlus").addEventListener("click",()=>changeQuantity(state.quantity+1));
quantity.addEventListener("change",()=>changeQuantity(Number(quantity.value)));
byId<HTMLFormElement>("baseComposeForm").addEventListener("submit",event=>{
 event.preventDefault();
 const message=messageInput.value.trim();
 if(!message)return;
 if(state.module!=="chat"){notify("Chỉ khung Chat cho nhập tin nhắn mẫu.");return;}
 const list=document.querySelector<HTMLElement>('.base-view-panel[data-panel="chat"]');
 if(!list)return;
 const bubbleLine=document.createElement("div");bubbleLine.className="base-user-line base-local-message";
 const bubble=document.createElement("span");bubble.className="base-user-bubble";
 bubble.textContent=message.slice(0,500);bubbleLine.append(bubble);list.append(bubbleLine);
 while(list.querySelectorAll(".base-local-message").length>6)list.querySelector(".base-local-message")?.remove();
 messageInput.value="";messageInput.style.height="";
 thread.scrollTop=thread.scrollHeight;
 notify("Đã thêm tin nhắn vào bản xem thử; không gửi qua mạng.");
});
messageInput.addEventListener("input",()=>{
 messageInput.style.height="auto";messageInput.style.height=Math.min(messageInput.scrollHeight,118)+"px";
});
for(const id of ["basePrimaryDemo","baseWorkAction","baseWorkSecondary","baseSalesButton","baseSalesSecondary"]){
 byId<HTMLButtonElement>(id).addEventListener("click",()=>{
  notify("Đã thử thao tác "+byId<HTMLButtonElement>(id).textContent?.trim()+" trong mẫu cục bộ.");
 });
}
moreButton.addEventListener("click",()=>{
 const open=menu.hidden;
 menu.hidden=!open;moreButton.setAttribute("aria-expanded",String(open));
 if(open)menu.querySelector<HTMLButtonElement>('[role="menuitem"]')?.focus();
 else moreButton.focus();
});
for(const button of Array.from(menu.querySelectorAll<HTMLButtonElement>("[data-menu-command]"))){
 button.addEventListener("click",()=>{
  const command=button.dataset.menuCommand;
  closeMenu();
  if(command==="Chỉnh sửa giao diện"){window.location.href="./";return;}
  if(command==="Xem thông số CSS"){byId<HTMLElement>("baseTokenOutput").scrollIntoView({block:"center",behavior:"smooth"});return;}
  notify("Đã đóng menu thao tác.");
 });
}
document.addEventListener("click",event=>{
 if(!menu.hidden&&!menu.contains(event.target as Node)&&!moreButton.contains(event.target as Node))closeMenu();
});
document.addEventListener("keydown",event=>{if(event.key==="Escape")closeMenu();});
byId<HTMLButtonElement>("baseOpenPopup").addEventListener("click",()=>dialog.showModal());
for(const id of ["baseDialogClose","baseDialogCancel"]){
 byId<HTMLButtonElement>(id).addEventListener("click",()=>dialog.close());
}
byId<HTMLButtonElement>("baseDialogConfirm").addEventListener("click",()=>{
 dialog.close();notify("Đã thử xác nhận trong popup mẫu; không ghi dữ liệu thật.");
});
dialog.addEventListener("click",event=>{if(event.target===dialog)dialog.close();});
byId<HTMLButtonElement>("baseReset").addEventListener("click",()=>{
 state.preset="original";state.device="desktop";state.module="chat";state.customer="a";state.quantity=2;
 byId<HTMLInputElement>("baseSearch").value="";
 for(const button of Array.from(document.querySelectorAll<HTMLButtonElement>("[data-customer]")))button.hidden=false;
 document.querySelectorAll(".base-local-message").forEach(node=>node.remove());
 messageInput.value="";closeMenu();render();
 notify("Đã khôi phục bản gốc 2027. Không thay đổi thư viện V08 hoặc các bản lưu Drive.");
});
byId<HTMLButtonElement>("baseCopy").addEventListener("click",()=>{
 void (async()=>{
  try{
   if(!navigator.clipboard?.writeText)throw new Error("Clipboard unavailable");
   await navigator.clipboard.writeText(cssText());
   notify("Đã sao chép các token của phương án hiện hành.");
  }catch{notify("Không sao chép được vì trình duyệt chưa cấp quyền clipboard.");}
 })();
});
render();
