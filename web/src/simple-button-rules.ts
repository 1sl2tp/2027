// UI 2027 V28 — Rules for what lives INSIDE a button.
// Inspiration: OpenAI Apps SDK UI Button sizing, gutter, iconSize and optical alignment.
// Geometry tokens, image layouts and content rules below are independently authored for 2027.
type InnerKind =
 "text"|"icon"|"leading"|"trailing"|"photo-leading"|"photo-trailing"|
 "letter"|"number"|"two-line"|"count"|"identity"|"truncate"|"arrow"|"loading";
interface InnerSpec {
 id:string;name:string;kind:InnerKind;rule:string;
}
const INNER_SPECS:readonly InnerSpec[]=[
 {id:"INNER-01",name:"Chỉ chữ",kind:"text",rule:"Nội dung một dòng · căn giữa cả khối"},
 {id:"INNER-02",name:"Chỉ icon",kind:"icon",rule:"Khung 44×44 · icon 20×20"},
 {id:"INNER-03",name:"Icon trái + chữ",kind:"leading",rule:"Icon 20 · gap 8 · chữ 14"},
 {id:"INNER-04",name:"Chữ + icon phải",kind:"trailing",rule:"Chữ 14 · gap 8 · icon 20"},
 {id:"INNER-05",name:"Ảnh trái + chữ",kind:"photo-leading",rule:"Ảnh 28×28 · gap 8 · chữ 14"},
 {id:"INNER-06",name:"Chữ + ảnh phải",kind:"photo-trailing",rule:"Chữ 14 · gap 8 · ảnh 28×28"},
 {id:"INNER-07",name:"Một ký tự",kind:"letter",rule:"Khung 44×44 · ký tự đúng tâm"},
 {id:"INNER-08",name:"Nút số",kind:"number",rule:"Số tabular · cân giữa theo khung"},
 {id:"INNER-09",name:"Chữ hai dòng",kind:"two-line",rule:"Cao 56 · mỗi dòng 18 · giữa dọc"},
 {id:"INNER-10",name:"Icon + chữ + số",kind:"count",rule:"Ba vùng cân đối 24 / giữa / 24"},
 {id:"INNER-11",name:"Ảnh + chữ + mũi tên",kind:"identity",rule:"Ba vùng cân đối 32 / giữa / 32"},
 {id:"INNER-12",name:"Chữ rất dài",kind:"truncate",rule:"Co chữ bằng min-width:0 + dấu …"},
 {id:"INNER-13",name:"Mũi tên có bù thị giác",kind:"arrow",rule:"Icon 20 · bù hình học +1px"},
 {id:"INNER-14",name:"Đang xử lý + chữ",kind:"loading",rule:"Giữ chữ và khoảng cách khi tải"}
];
function innerIcon(name:string):SVGSVGElement{
 const ns="http://www.w3.org/2000/svg";
 const svg=document.createElementNS(ns,"svg");
 svg.classList.add("ui-icon");if(name==="loader")svg.classList.add("ui-icon--loading");svg.setAttribute("viewBox","0 0 24 24");
 svg.setAttribute("aria-hidden","true");
 const use=document.createElementNS(ns,"use");
 use.setAttribute("href","./web/icons.svg#ui-icon-"+name);
 svg.append(use);return svg;
}
function innerImage():HTMLImageElement{
 const img=document.createElement("img");
 img.className="simple-button-inner-photo";
 img.src="./web/button-thumbnail.svg";img.width=28;img.height=28;
 img.alt="";img.decoding="async";return img;
}
function innerText(text:string):HTMLSpanElement{
 const span=document.createElement("span");span.className="simple-button-inner-text";
 span.textContent=text;return span;
}
function innerSlot(node:Node):HTMLSpanElement{
 const el=document.createElement("span");el.className="simple-button-inner-slot";
 el.append(node);return el;
}
function previewInner(spec:InnerSpec):HTMLButtonElement{
 const button=document.createElement("button");button.type="button";
 button.className="ui-button ui-button--outline simple-button-inner-demo simple-button-inner-"+spec.kind;
 if(["icon","letter","number","arrow"].includes(spec.kind))button.classList.add("ui-button--icon","ui-button--square");
 button.setAttribute("aria-label","Xem thử "+spec.name.toLowerCase());
 const group=document.createElement("span");group.className="simple-button-inner-group";
 switch(spec.kind){
 case "text":group.append(innerText("Xác nhận"));break;
 case "icon":group.append(innerIcon("search"));break;
 case "leading":group.append(innerIcon("save"),innerText("Lưu đơn"));break;
 case "trailing":group.append(innerText("Tiếp theo"),innerIcon("arrow-right"));break;
 case "photo-leading":group.append(innerImage(),innerText("Xem ảnh"));break;
 case "photo-trailing":group.append(innerText("Ảnh mẫu"),innerImage());break;
 case "letter":{
  const glyph=innerText("A");glyph.classList.add("simple-button-inner-glyph");
  group.append(glyph);break;
 }
 case "number":{
  const number=innerText("12");number.classList.add("simple-button-inner-number");
  group.append(number);break;
 }
 case "two-line":{
  const stack=document.createElement("span");stack.className="simple-button-inner-stack";
  stack.append(innerText("Tên khách"),innerText("Đã giao"));
  group.append(stack);break;
 }
 case "count":{
  group.classList.add("simple-button-inner-grid");
  group.append(innerSlot(innerIcon("bell")),innerText("Thông báo"),innerSlot(innerText("3")));
  break;
 }
 case "identity":{
  group.classList.add("simple-button-inner-grid","simple-button-inner-grid-photo");
  group.append(innerSlot(innerImage()),innerText("Khách mẫu"),innerSlot(innerIcon("chevron")));
  break;
 }
 case "truncate":group.append(innerText("Tên thao tác rất dài cần được rút gọn trên điện thoại"));break;
 case "arrow":{
  const icon=innerIcon("arrow-right");icon.classList.add("simple-button-inner-optical");
  group.append(icon);break;
 }
 case "loading":{
  group.append(innerIcon("loader"),innerText("Đang tải"));
  button.disabled=true;button.setAttribute("aria-busy","true");button.setAttribute("aria-disabled","true");break;
 }
 }
 button.append(group);
 return button;
}
export function initSimpleButtonRules():void{
 const list=document.getElementById("simpleButtonRuleItems");
 const chosen=document.getElementById("simpleButtonRulesChosen");
 const feedback=document.getElementById("simpleButtonRulesFeedback");
 if(!list||!chosen||!feedback)return;
 let chosenId:string|null=null;
 for(const [i,spec] of INNER_SPECS.entries()){
  const row=document.createElement("div");
  row.className="simple-button-inner-row";row.dataset.sampleId=spec.id;
  row.setAttribute("role","group");row.setAttribute("aria-label",spec.name);
  const number=document.createElement("span");number.className="simple-font-number";
  number.textContent=String(i+1).padStart(2,"0");
  const content=document.createElement("div");content.className="simple-button-inner-middle";
  const title=document.createElement("strong");title.className="simple-field-title";
  title.textContent=spec.name;
  const stage=document.createElement("div");stage.className="simple-button-inner-stage";
  stage.append(previewInner(spec));
  const detail=document.createElement("span");detail.className="simple-font-meta";detail.textContent=spec.rule;
  content.append(title,stage,detail);
  const pick=document.createElement("button");pick.type="button";
  pick.className="ui-button ui-button--icon ui-button--round simple-button-inner-pick";pick.dataset.sampleId=spec.id;
  pick.setAttribute("aria-label","Chọn "+spec.name);pick.setAttribute("aria-pressed","false");
  pick.append(innerIcon("check"));
  row.append(number,content,pick);list.append(row);
 }
 list.addEventListener("click",event=>{
  if(!(event.target instanceof Element))return;
  const demo=event.target.closest<HTMLButtonElement>(".simple-button-inner-demo");
  if(demo){
   const row=demo.closest<HTMLElement>(".simple-button-inner-row");
   feedback.textContent="Đang xem "+(row?.getAttribute("aria-label")||"mẫu")+". Không thực hiện thao tác thật.";
   return;
  }
  const pick=event.target.closest<HTMLButtonElement>(".simple-button-inner-pick");
  const row=pick?.closest<HTMLElement>(".simple-button-inner-row")||
   (event.target.closest("button")?null:event.target.closest<HTMLElement>(".simple-button-inner-row"));
  const spec=INNER_SPECS.find(s=>s.id===row?.dataset.sampleId);
  if(!spec)return;
  chosenId=spec.id;
  for(const el of Array.from(list.querySelectorAll<HTMLButtonElement>(".simple-button-inner-pick"))){
   el.setAttribute("aria-pressed",String(el.dataset.sampleId===chosenId));
  }
  chosen.textContent="Đã chọn: "+spec.id+" · "+spec.name;
  chosen.hidden=false;
 });
}
