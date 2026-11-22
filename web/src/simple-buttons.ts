// UI-V30 · Section 6 references the canonical RULE 06–08 Button/Icon primitives.
// Specimens classify semantic variant, geometry/composition and state separately.
// No new parallel button tokens or external icon source.
type ButtonVariant="primary"|"secondary"|"outline"|"quiet"|"danger"|"toggle";
type ButtonLayout="plain"|"pill"|"block"|"leading"|"trailing"|"square"|"round";
type ButtonState="idle"|"disabled"|"loading"|"toggle";
interface Specimen {
 id:string;label:string;kind:"button"|"icon";
 variant:ButtonVariant;layout:ButtonLayout;state:ButtonState;
 source:string;caption:string;icon?:string;
}
const SPECIMENS:readonly Specimen[]=[
 {id:"BUTTON-01",label:"Nút chính · primary",kind:"button",variant:"primary",layout:"plain",state:"idle",source:"Apps SDK · tham khảo Button",caption:"Chọn"},
 {id:"BUTTON-02",label:"Nút phụ · secondary",kind:"button",variant:"secondary",layout:"plain",state:"idle",source:"Apps SDK · tham khảo Button",caption:"Hủy"},
 {id:"BUTTON-03",label:"Nút viền · outline",kind:"button",variant:"outline",layout:"plain",state:"idle",source:"Apps SDK · tham khảo Button",caption:"Chi tiết"},
 {id:"BUTTON-04",label:"Nút nhẹ · quiet",kind:"button",variant:"quiet",layout:"plain",state:"idle",source:"Apps SDK · tham khảo Button",caption:"Xem thêm"},
 {id:"BUTTON-05",label:"Nút viên thuốc · pill",kind:"button",variant:"primary",layout:"pill",state:"idle",source:"Apps SDK · tham khảo Button",caption:"Tiếp tục"},
 {id:"BUTTON-06",label:"Nút toàn chiều ngang · block",kind:"button",variant:"primary",layout:"block",state:"idle",source:"UI 2027 · ui-button--block",caption:"Xác nhận"},
 {id:"BUTTON-07",label:"Icon trước chữ",kind:"button",variant:"outline",layout:"leading",state:"idle",source:"UI 2027 · ui-icon",caption:"Lưu",icon:"save"},
 {id:"BUTTON-08",label:"Icon sau chữ",kind:"button",variant:"outline",layout:"trailing",state:"idle",source:"UI 2027 · ui-icon",caption:"Tiếp theo",icon:"arrow-right"},
 {id:"BUTTON-09",label:"Nút icon vuông",kind:"button",variant:"secondary",layout:"square",state:"idle",source:"UI 2027 · ui-button--square",caption:"",icon:"plus"},
 {id:"BUTTON-10",label:"Nút icon tròn",kind:"button",variant:"secondary",layout:"round",state:"idle",source:"UI 2027 · ui-button--round",caption:"",icon:"ellipsis"},
 {id:"BUTTON-11",label:"Nút cảnh báo · danger",kind:"button",variant:"danger",layout:"plain",state:"idle",source:"UI 2027 · ui-button--danger",caption:"Xóa"},
 {id:"BUTTON-12",label:"Nút vô hiệu · disabled",kind:"button",variant:"secondary",layout:"plain",state:"disabled",source:"UI 2027 · trạng thái",caption:"Không khả dụng"},
 {id:"BUTTON-13",label:"Nút đang tải · loading",kind:"button",variant:"secondary",layout:"leading",state:"loading",source:"UI 2027 · trạng thái",caption:"Đang xử lý",icon:"loader"},
 {id:"BUTTON-14",label:"Nút chọn · toggle",kind:"button",variant:"toggle",layout:"plain",state:"toggle",source:"UI 2027 · ui-button--toggle",caption:"Chế độ xem"},
 {id:"ICON-01",label:"Thêm",kind:"icon",variant:"quiet",layout:"square",state:"idle",source:"2027 · icons.svg",caption:"",icon:"plus"},
 {id:"ICON-02",label:"Giảm",kind:"icon",variant:"quiet",layout:"square",state:"idle",source:"2027 · icons.svg",caption:"",icon:"minus"},
 {id:"ICON-03",label:"Tìm kiếm",kind:"icon",variant:"quiet",layout:"square",state:"idle",source:"2027 · icons.svg",caption:"",icon:"search"},
 {id:"ICON-04",label:"Đóng",kind:"icon",variant:"quiet",layout:"square",state:"idle",source:"2027 · icons.svg",caption:"",icon:"close"},
 {id:"ICON-05",label:"Sao chép",kind:"icon",variant:"quiet",layout:"square",state:"idle",source:"2027 · icons.svg",caption:"",icon:"copy"},
 {id:"ICON-06",label:"Sửa",kind:"icon",variant:"quiet",layout:"square",state:"idle",source:"2027 · icons.svg",caption:"",icon:"edit"},
 {id:"ICON-07",label:"Xóa",kind:"icon",variant:"quiet",layout:"square",state:"idle",source:"2027 · icons.svg",caption:"",icon:"trash"},
 {id:"ICON-08",label:"Chia sẻ",kind:"icon",variant:"quiet",layout:"square",state:"idle",source:"2027 · icons.svg",caption:"",icon:"share"},
 {id:"ICON-09",label:"Gửi",kind:"icon",variant:"quiet",layout:"square",state:"idle",source:"2027 · icons.svg",caption:"",icon:"send-up"},
 {id:"ICON-10",label:"Thêm tùy chọn",kind:"icon",variant:"quiet",layout:"square",state:"idle",source:"2027 · icons.svg",caption:"",icon:"ellipsis"}
];
function spriteIcon(name:string):SVGSVGElement{
 const ns="http://www.w3.org/2000/svg";
 const svg=document.createElementNS(ns,"svg");
 svg.classList.add("ui-icon");
 if(name==="loader")svg.classList.add("ui-icon--loading");
 if(name==="plus")svg.classList.add("ui-icon--plus");
 svg.setAttribute("viewBox","0 0 24 24");svg.setAttribute("aria-hidden","true");
 const use=document.createElementNS(ns,"use");
 use.setAttribute("href","./web/icons.svg#ui-icon-"+name);
 svg.append(use);return svg;
}
function sampleButton(spec:Specimen):HTMLButtonElement{
 const button=document.createElement("button");button.type="button";
 button.className="ui-button ui-button--"+spec.variant+" simple-button-demo";
 button.title=spec.label;
 if(spec.kind==="icon"||spec.layout==="square"||spec.layout==="round")
   button.setAttribute("aria-label",spec.label+" · mẫu");
 if(spec.layout==="square"||spec.layout==="round"||spec.kind==="icon"){
   button.classList.add("ui-button--icon");
   button.classList.add(spec.layout==="round"?"ui-button--round":"ui-button--square");
 }else if(spec.layout==="pill"){button.classList.add("ui-button--pill");}
 else if(spec.layout==="block"){button.classList.add("ui-button--block");}
 const icon=spec.icon?spriteIcon(spec.icon):null;
 const caption=document.createElement("span");caption.textContent=spec.caption;
 if(icon&&spec.layout!=="trailing")button.append(icon);
 if(spec.caption)button.append(caption);
 if(icon&&spec.layout==="trailing")button.append(icon);
 if(spec.state==="loading"){
   button.disabled=true;button.setAttribute("aria-disabled","true");button.setAttribute("aria-busy","true");
 }
 if(spec.state==="disabled"){button.disabled=true;button.setAttribute("aria-disabled","true");}
 if(spec.state==="toggle")button.setAttribute("aria-pressed","false");
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
  preview.dataset.layout=spec.layout;
  preview.append(sampleButton(spec));
  const source=document.createElement("span");source.className="simple-font-meta";source.textContent=spec.source;
  middle.append(label,preview,source);
  const choose=document.createElement("button");choose.type="button";
  choose.className="ui-button ui-button--icon ui-button--round ui-button--outline simple-button-pick";
  choose.dataset.sampleId=spec.id;
  choose.setAttribute("aria-label","Chọn "+spec.label);choose.setAttribute("aria-pressed","false");
  const tick=spriteIcon("check");choose.append(tick);
  row.append(num,middle,choose);list.append(row);
 }
 list.addEventListener("click",event=>{
   if(!(event.target instanceof Element))return;
   const preview=event.target.closest<HTMLButtonElement>(".simple-button-demo");
   if(preview){
     const row=preview.closest<HTMLElement>(".simple-button-row");
     const spec=SPECIMENS.find(s=>s.id===row?.dataset.sampleId);
     if(!spec)return;
     if(spec.state==="toggle"){
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
