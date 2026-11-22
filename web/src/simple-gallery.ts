// V20: One purpose only — compare and pick a font/size specimen.
// No theme selector, no editor, no input, no HTML copy and no business actions.
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
export function initSimpleGallery():void {
 const root=document.getElementById("simpleKit");
 const list=document.getElementById("simpleItems");
 const chosen=document.getElementById("simpleChosen");
 if(!root||!list||!chosen)return;
 // Direct links to earlier detailed examples still work without crowding this first page.
 const showOriginal=():void=>{
   const hash=window.location.hash;
   const useOriginal=hash!==""&&hash!=="#simpleKit"&&hash!=="#simple-gallery";
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
}
