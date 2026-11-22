// V21: two minimal typography galleries. No theme selector, CSS editor or business actions.
interface FontSample {
 id:string;
 family:"system"|"arial"|"georgia"|"mono";
 familyName:string;
 size:number;
 weight:400|500|600|700;
 weightName:string;
}
const FONT_SAMPLES:FontSample[]=[
 {id:"FONT-01",family:"system",familyName:"System",size:12,weight:400,weightName:"Thường"},
 {id:"FONT-02",family:"system",familyName:"System",size:14,weight:400,weightName:"Thường"},
 {id:"FONT-03",family:"system",familyName:"System",size:16,weight:400,weightName:"Thường"},
 {id:"FONT-04",family:"system",familyName:"System",size:18,weight:600,weightName:"Đậm vừa"},
 {id:"FONT-05",family:"system",familyName:"System",size:20,weight:700,weightName:"Đậm"},
 {id:"FONT-06",family:"system",familyName:"System",size:24,weight:700,weightName:"Đậm"},
 {id:"FONT-07",family:"arial",familyName:"Arial",size:14,weight:400,weightName:"Thường"},
 {id:"FONT-08",family:"arial",familyName:"Arial",size:16,weight:600,weightName:"Đậm vừa"},
 {id:"FONT-09",family:"georgia",familyName:"Georgia",size:18,weight:400,weightName:"Thường"},
 {id:"FONT-10",family:"mono",familyName:"Monospace",size:14,weight:400,weightName:"Thường"}
];
interface MultiTextSample {
 id:string;label:string;lines:readonly string[];
 style:"normal"|"bold"|"italic"|"underline"|"strike"|"mixed"|"muted";
}
const MULTI_TEXT_SAMPLES:readonly MultiTextSample[]=[
 {id:"MULTI-01",label:"1 dòng · 16px",lines:["Tin nhắn một dòng"],style:"normal"},
 {id:"MULTI-02",label:"2 dòng · 16px",lines:["Sữa hộp 180 ml","Số lượng: 12 hộp"],style:"normal"},
 {id:"MULTI-03",label:"3 dòng · 16px",lines:["Đơn hàng hôm nay","Khách mẫu A","Tổng: 125.000 đ"],style:"normal"},
 {id:"MULTI-04",label:"4 dòng · 16px",lines:["Đơn DH-001","Tên hàng: Bánh quy","Số lượng: 3 hộp","Thành tiền: 75.000 đ"],style:"normal"},
 {id:"MULTI-05",label:"Chữ đậm · 16px",lines:["Thông tin quan trọng"],style:"bold"},
 {id:"MULTI-06",label:"Chữ nghiêng · 16px",lines:["Ghi chú của khách hàng"],style:"italic"},
 {id:"MULTI-07",label:"Gạch chân · 16px",lines:["Xem nội dung chi tiết"],style:"underline"},
 {id:"MULTI-08",label:"Gạch ngang · 16px",lines:["Giá cũ: 150.000 đ"],style:"strike"},
 {id:"MULTI-09",label:"Đậm + thường · 2 dòng",lines:["Tổng tiền: 125.000 đ","Đã thanh toán: 75.000 đ"],style:"mixed"},
 {id:"MULTI-10",label:"Chữ phụ · 13px",lines:["Cập nhật lúc 08:30","Dữ liệu dùng để xem mẫu"],style:"muted"}
];
export function initSimpleGallery():void {
 const root=document.getElementById("simpleKit");
 const list=document.getElementById("simpleItems");
 const chosen=document.getElementById("simpleChosen");
 if(!root||!list||!chosen)return;
 // Direct links to earlier detailed examples still work without crowding this first page.
 const showOriginal=():void=>{
   const hash=window.location.hash;
   const useOriginal=hash!==""&&hash!=="#simpleKit"&&hash!=="#simple-gallery"&&hash!=="#simpleMultiline";
   document.body.classList.toggle("simple-first",!useOriginal);
 };
 window.addEventListener("hashchange",showOriginal);
 showOriginal();
 let selectedId:string|null=null;
 for(const [index,item] of FONT_SAMPLES.entries()){
   const button=document.createElement("button");
   button.type="button";
   button.className="simple-font-row";
   button.dataset.sampleId=item.id;
   button.setAttribute("aria-pressed","false");
   button.setAttribute("aria-label","Chọn mẫu "+(index+1)+": "+item.familyName+", "+item.size+" pixel, "+item.weightName);
   const number=document.createElement("span");
   number.className="simple-font-number";
   number.textContent=String(index+1).padStart(2,"0");
   const content=document.createElement("span");
   content.className="simple-font-content";
   const preview=document.createElement("span");
   preview.className="simple-font-preview simple-font-"+item.family+" simple-font-weight-"+item.weight;
   preview.style.fontSize=item.size+"px";
   preview.textContent="Văn bản mẫu 123.456 đ";
   const meta=document.createElement("span");
   meta.className="simple-font-meta";
   meta.textContent=item.familyName+" · "+item.size+" px · "+item.weightName;
   const check=document.createElement("span");
   check.className="simple-font-check";
   check.setAttribute("aria-hidden","true");
   check.textContent="✓";
   content.append(preview,meta);
   button.append(number,content,check);
   list.append(button);
 }
 chosen.hidden=true;
 list.addEventListener("click",event=>{
   if(!(event.target instanceof Element))return;
   const row=event.target.closest<HTMLButtonElement>(".simple-font-row");
   if(!row)return;
   const item=FONT_SAMPLES.find(x=>x.id===row.dataset.sampleId);
   if(!item)return;
   selectedId=item.id;
   for(const el of Array.from(list.querySelectorAll<HTMLButtonElement>(".simple-font-row"))){
     el.setAttribute("aria-pressed",String(el.dataset.sampleId===selectedId));
   }
   chosen.textContent="Đã chọn: "+item.familyName+" · "+item.size+" px · "+item.weightName;
   chosen.hidden=false;
 });
 const multilineList=document.getElementById("simpleMultilineItems");
 const multilineChosen=document.getElementById("simpleMultilineChosen");
 if(!multilineList||!multilineChosen)return;
 let selectedMultiId:string|null=null;
 for(const [index,item] of MULTI_TEXT_SAMPLES.entries()){
   const button=document.createElement("button");
   button.type="button";
   button.className="simple-font-row simple-multi-row";
   button.dataset.sampleId=item.id;
   button.setAttribute("aria-pressed","false");
   button.setAttribute("aria-label","Chọn mẫu "+(index+1)+": "+item.label);
   const number=document.createElement("span");
   number.className="simple-font-number";
   number.textContent=String(index+1).padStart(2,"0");
   const content=document.createElement("span");
   content.className="simple-font-content";
   const preview=document.createElement("span");
   preview.className="simple-multi-preview simple-multi-"+item.style;
   if(item.style==="mixed"){
     for(const [lineIndex,line] of item.lines.entries()){
       const segment=document.createElement(lineIndex===0?"strong":"span");
       segment.textContent=line;
       preview.append(segment);
     }
   }else{
     preview.textContent=item.lines.join("\n");
   }
   const meta=document.createElement("span");
   meta.className="simple-font-meta";
   meta.textContent=item.label;
   const tick=document.createElement("span");
   tick.className="simple-font-check";
   tick.setAttribute("aria-hidden","true");
   tick.textContent="✓";
   content.append(preview,meta);
   button.append(number,content,tick);
   multilineList.append(button);
 }
 multilineList.addEventListener("click",event=>{
   if(!(event.target instanceof Element))return;
   const row=event.target.closest<HTMLButtonElement>(".simple-multi-row");
   if(!row)return;
   const item=MULTI_TEXT_SAMPLES.find(x=>x.id===row.dataset.sampleId);
   if(!item)return;
   selectedMultiId=item.id;
   for(const button of Array.from(multilineList.querySelectorAll<HTMLButtonElement>(".simple-multi-row"))){
     button.setAttribute("aria-pressed",String(button.dataset.sampleId===selectedMultiId));
   }
   multilineChosen.textContent="Đã chọn: "+item.label;
   multilineChosen.hidden=false;
 });
}
