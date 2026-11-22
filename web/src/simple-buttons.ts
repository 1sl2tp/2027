// 2027 UI V27 · Read-only button and icon specimen gallery.
// OpenAI Apps SDK UI Button is the public reference for solid/soft/outline/ghost,
// pill, uniform icon buttons, disabled/loading and block layouts.
// Icon SVGs come from the existing 2027 sprite. No backend or message sending.
type ButtonStyle =
 "solid"|"soft"|"outline"|"ghost"|"pill"|"block"|"icon-start"|"icon-end"|
 "square"|"circle"|"danger"|"disabled"|"loading"|"toggle";
type IconStyle = "plus"|"minus"|"search"|"close"|"copy"|"edit"|"trash"|"share"|"send-up"|"ellipsis";
type Specimen = {
 id:string; label:string; kind:"button"|"icon";style:ButtonStyle|IconStyle;
 source:string;caption:string;
};
const SPECIMENS:readonly Specimen[]=[
 {id:"BUTTON-01",label:"Nút chính · solid",kind:"button",style:"solid",source:"Apps SDK · Button",caption:"Chọn"},
 {id:"BUTTON-02",label:"Nút phụ · soft",kind:"button",style:"soft",source:"Apps SDK · Button",caption:"Hủy"},
 {id:"BUTTON-03",label:"Nút có viền · outline",kind:"button",style:"outline",source:"Apps SDK · Button",caption:"Chi tiết"},
 {id:"BUTTON-04",label:"Nút không nền · ghost",kind:"button",style:"ghost",source:"Apps SDK · Button",caption:"Xem thêm"},
 {id:"BUTTON-05",label:"Nút bo viên thuốc",kind:"button",style:"pill",source:"Apps SDK · Button",caption:"Tiếp tục"},
 {id:"BUTTON-06",label:"Nút toàn chiều ngang",kind:"button",style:"block",source:"Apps SDK · Button",caption:"Xác nhận"},
 {id:"BUTTON-07",label:"Icon bên trái chữ",kind:"button",style:"icon-start",source:"Apps SDK · Button",caption:"Lưu"},
 {id:"BUTTON-08",label:"Chữ + icon bên phải",kind:"button",style:"icon-end",source:"Apps SDK · Button",caption:"Tiếp theo"},
 {id:"BUTTON-09",label:"Nút icon hình vuông",kind:"button",style:"square",source:"Apps SDK · Button",caption:""},
 {id:"BUTTON-10",label:"Nút icon hình tròn",kind:"button",style:"circle",source:"Apps SDK · Button",caption:""},
 {id:"BUTTON-11",label:"Nút thao tác nguy hiểm",kind:"button",style:"danger",source:"Apps SDK · Button",caption:"Xóa"},
 {id:"BUTTON-12",label:"Nút bị khóa",kind:"button",style:"disabled",source:"Apps SDK · Button",caption:"Không khả dụng"},
 {id:"BUTTON-13",label:"Nút đang tải",kind:"button",style:"loading",source:"Apps SDK · Button",caption:"Đang xử lý"},
 {id:"BUTTON-14",label:"Nút có trạng thái chọn",kind:"button",style:"toggle",source:"2027 · trạng thái",caption:"Chế độ xem"},
 {id:"ICON-01",label:"Thêm",kind:"icon",style:"plus",source:"2027 · icons.svg",caption:""},
 {id:"ICON-02",label:"Giảm",kind:"icon",style:"minus",source:"2027 · icons.svg",caption:""},
 {id:"ICON-03",label:"Tìm kiếm",kind:"icon",style:"search",source:"2027 · icons.svg",caption:""},
 {id:"ICON-04",label:"Đóng",kind:"icon",style:"close",source:"2027 · icons.svg",caption:""},
 {id:"ICON-05",label:"Sao chép",kind:"icon",style:"copy",source:"2027 · icons.svg",caption:""},
 {id:"ICON-06",label:"Sửa",kind:"icon",style:"edit",source:"2027 · icons.svg",caption:""},
 {id:"ICON-07",label:"Xóa",kind:"icon",style:"trash",source:"2027 · icons.svg",caption:""},
 {id:"ICON-08",label:"Chia sẻ",kind:"icon",style:"share",source:"2027 · icons.svg",caption:""},
 {id:"ICON-09",label:"Gửi",kind:"icon",style:"send-up",source:"2027 · icons.svg",caption:""},
 {id:"ICON-10",label:"Thêm tùy chọn",kind:"icon",style:"ellipsis",source:"2027 · icons.svg",caption:""}
];
function spriteIcon(name:string):SVGSVGElement{
 const ns="http://www.w3.org/2000/svg";
 const svg=document.createElementNS(ns,"svg");svg.classList.add("simple-button-icon");
 svg.setAttribute("viewBox","0 0 24 24");svg.setAttribute("aria-hidden","true");
 const use=document.createElementNS(ns,"use");
 use.setAttribute("href","./web/icons.svg#ui-icon-"+name);
 svg.append(use);return svg;
}
function iconFor(spec:Specimen):string{
 if(spec.kind==="icon")return spec.style;
 if(spec.style==="icon-start")return "save";
 if(spec.style==="icon-end")return "arrow-right";
 if(spec.style==="square")return "plus";
 if(spec.style==="circle")return "ellipsis";
 return "";
}
function sampleButton(spec:Specimen):HTMLButtonElement{
 const button=document.createElement("button");button.type="button";
 button.className="simple-button-demo simple-button-"+spec.style;
 button.setAttribute("aria-label",spec.kind==="icon"?spec.label+" · mẫu":spec.label+" · mẫu");
 const ico=iconFor(spec);
 if(ico&&spec.style!=="icon-end")button.append(spriteIcon(ico));
 if(spec.caption){const text=document.createElement("span");text.textContent=spec.caption;button.append(text);}
 if(ico&&spec.style==="icon-end")button.append(spriteIcon(ico));
 if(spec.style==="loading"){
   const spin=document.createElement("span");spin.className="simple-button-spinner";spin.setAttribute("aria-hidden","true");
   button.prepend(spin);button.disabled=true;button.setAttribute("aria-busy","true");
 }
 if(spec.style==="disabled")button.disabled=true;
 if(spec.style==="toggle")button.setAttribute("aria-pressed","false");
 return button;
}
export function initSimpleButtons():void{
 const list=document.getElementById("simpleButtonsItems");
 const chosen=document.getElementById("simpleButtonsChosen");
 const feedback=document.getElementById("simpleButtonsFeedback");
 if(!list||!chosen||!feedback)return;
 let selected:string|null=null;
 for(const [i,spec] of SPECIMENS.entries()){
  if(i===0||i===14){
   const heading=document.createElement("div");heading.className="simple-frame-group-label";
   heading.setAttribute("role","heading");heading.setAttribute("aria-level","3");
   heading.textContent=i===0?"Kiểu nút":"Biểu tượng icon";list.append(heading);
  }
  const row=document.createElement("div");row.className="simple-button-row";row.dataset.sampleId=spec.id;
  row.setAttribute("role","group");row.setAttribute("aria-label",spec.label);
  const num=document.createElement("span");num.className="simple-font-number";
  num.textContent=String(i+1).padStart(2,"0");
  const middle=document.createElement("div");middle.className="simple-button-middle";
  const label=document.createElement("strong");label.className="simple-field-title";label.textContent=spec.label;
  const preview=document.createElement("div");preview.className="simple-button-stage";
  preview.append(sampleButton(spec));
  const source=document.createElement("span");source.className="simple-font-meta";source.textContent=spec.source;
  middle.append(label,preview,source);
  const choose=document.createElement("button");choose.type="button";
  choose.className="simple-button-pick";choose.dataset.sampleId=spec.id;
  choose.setAttribute("aria-label","Chọn "+spec.label);choose.setAttribute("aria-pressed","false");
  choose.textContent="✓";
  row.append(num,middle,choose);list.append(row);
 }
 list.addEventListener("click",event=>{
   if(!(event.target instanceof Element))return;
   const preview=event.target.closest<HTMLButtonElement>(".simple-button-demo");
   if(preview){
     const row=preview.closest<HTMLElement>(".simple-button-row");
     const spec=SPECIMENS.find(s=>s.id===row?.dataset.sampleId);
     if(!spec)return;
     if(spec.style==="toggle"){
       const next=preview.getAttribute("aria-pressed")!=="true";
       preview.setAttribute("aria-pressed",String(next));
       feedback.textContent=next?"Đã chọn thử chế độ xem.":"Đã bỏ chọn thử chế độ xem.";
     }else feedback.textContent="Đang thử "+spec.label.toLowerCase()+". Không thực hiện thao tác thật.";
     return;
   }
   const pick=event.target.closest<HTMLButtonElement>(".simple-button-pick");
   const row=pick?.closest<HTMLElement>(".simple-button-row")||
     (event.target.closest("button")?null:event.target.closest<HTMLElement>(".simple-button-row"));
   const spec=SPECIMENS.find(s=>s.id===row?.dataset.sampleId);
   if(!spec)return;
   selected=spec.id;
   for(const button of Array.from(list.querySelectorAll<HTMLButtonElement>(".simple-button-pick"))){
     button.setAttribute("aria-pressed",String(button.dataset.sampleId===selected));
   }
   chosen.textContent="Đã chọn: "+spec.label;chosen.hidden=false;
 });
}
