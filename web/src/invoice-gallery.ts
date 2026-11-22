// UI 2027 V17 · Invoice table visual samples from the shared UI_PATTERNS contract.
// Read-only preview, HTML copy, and browser-only print. No TAPHOA integration.
import {UI_PATTERNS,type UiPattern} from "./ui-patterns.js";
export function initInvoiceGallery():void{
 const options=document.getElementById("invoiceVariantList") as HTMLElement;
 const mobileSelect=document.getElementById("invoiceMobileSelect") as HTMLSelectElement;
 const sourceDetails=document.getElementById("invoiceSourceDetails") as HTMLDetailsElement;
 const preview=document.getElementById("invoicePreview") as HTMLElement;
 const source=document.getElementById("invoiceSource") as HTMLTextAreaElement;
 const selectedTitle=document.getElementById("invoiceSelectedTitle") as HTMLElement;
 const info=document.getElementById("invoiceNotice") as HTMLElement;
 const copy=document.getElementById("invoiceCopy") as HTMLButtonElement;
 const print=document.getElementById("invoicePrint") as HTMLButtonElement;
 const host=document.getElementById("invoicePrintHost") as HTMLElement;
 if(!options||!mobileSelect||!sourceDetails||!preview||!source||!selectedTitle||!info||!copy||!print||!host)return;
 // Keep the detailed code available, but prioritize the receipt preview on narrow screens.
 const narrowScreen=window.matchMedia("(max-width:760px)");
 sourceDetails.open=!narrowScreen.matches;
 narrowScreen.addEventListener("change",event=>{sourceDetails.open=!event.matches;});
 const variants=UI_PATTERNS.filter(item=>item.group==="invoices");
 if(!variants.length)return;
 let selected:UiPattern=variants[0];
 function selectPattern(item:UiPattern):void{
   selected=item;
   // Static developer-owned invoice samples, shared with the copyable pattern kit.
   preview.innerHTML=item.html;
   source.value=item.html;
   mobileSelect.value=item.id;
   selectedTitle.textContent=item.id+" · "+item.title;
   for(const button of Array.from(options.querySelectorAll<HTMLButtonElement>("[data-invoice-id]"))){
     const active=button.dataset.invoiceId===item.id;
     button.setAttribute("aria-pressed",String(active));
   }
   info.textContent="Dữ liệu hóa đơn minh họa. Không lưu mẫu vào TAPHOA, không gửi ảnh hoặc ghi thu.";
 }
 for(const item of variants){
   const button=document.createElement("button");
   button.type="button";button.className="ui-invoice-choice";
   button.dataset.invoiceId=item.id;
   button.setAttribute("aria-pressed","false");
   const short=document.createElement("strong");short.textContent=item.id+" · "+item.title;
   const sub=document.createElement("span");sub.textContent=item.description;
   button.append(short,sub);options.append(button);
   const choice=document.createElement("option");
   choice.value=item.id;
   choice.textContent=item.id+" · "+item.title;
   mobileSelect.append(choice);
 }
 mobileSelect.addEventListener("change",()=>{
   const item=variants.find(x=>x.id===mobileSelect.value);
   if(item)selectPattern(item);
 });
 options.addEventListener("click",event=>{
   if(!(event.target instanceof Element))return;
   const button=event.target.closest<HTMLButtonElement>("[data-invoice-id]");
   const item=variants.find(x=>x.id===button?.dataset.invoiceId);
   if(item)selectPattern(item);
 });
 async function copyHtml():Promise<void>{
   try{
     if(!navigator.clipboard?.writeText)throw new Error("Clipboard unavailable");
     await navigator.clipboard.writeText(selected.html);
     info.textContent="Đã sao chép HTML mẫu "+selected.id+". Kiểu chữ và bảng lấy từ một CSS chung.";
   }catch{
     sourceDetails.open=true;
     source.focus();source.select();
     info.textContent="Clipboard không khả dụng. Đã bôi chọn mã HTML để bạn sao chép thủ công.";
   }
 }
 copy.addEventListener("click",()=>{void copyHtml();});
 function endPrint():void{
   document.body.classList.remove("ui-invoice-print-mode");
   host.replaceChildren();
 }
 window.addEventListener("afterprint",endPrint);
 print.addEventListener("click",()=>{
   endPrint();
   // Print a temporary direct-body clone so the app shell, menu and controls are not printed.
   // This is a visual-only sample, not a generated commercial invoice.
   host.innerHTML=selected.html;
   document.body.classList.add("ui-invoice-print-mode");
   info.textContent="Đã mở chức năng in mẫu. Chế độ in dùng đen trắng để tiết kiệm mực.";
   try{window.print();}catch{endPrint();info.textContent="Trình duyệt không hỗ trợ mở in trong ngữ cảnh này.";}
 });
 selectPattern(selected);
}
