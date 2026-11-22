// V43 · One canonical icon sprite and motion patterns, classified by UI owner.
// Sources are public design references; all artwork is authored for 2027.
export interface IconGroup {title:string;owner:string;icons:readonly string[]}
export const ICON_GROUPS:readonly IconGroup[]=[
 {title:"Điều hướng",owner:"Header / MessageList / Sidebar",icons:["menu","arrow-left","arrow-right","arrow-down","chevron","chevron-left","chevron-right","search","panel-left","home","ellipsis","close"]},
 {title:"Vùng gõ",owner:"Composer → Toolbar",icons:["plus","minus","paperclip","image","camera","mic","voice","send-up","stop","sparkles"]},
 {title:"Thao tác tin",owner:"Message → ActionBar",icons:["copy","thumbs-up","thumbs-down","volume","share","download","refresh","reply","forward","eye","trash","edit","rotate","link","unlink","clipboard","save"]},
 {title:"Trạng thái",owner:"Indicator / Status",icons:["loader","check","check-circle","alert-circle","clock","circle-dashed","circle-help","bell","lock"]},
 {title:"Tệp và video",owner:"Message → Media / Attachment",icons:["play","zoom-in","file-text","file","video","music","file-image"]},
 {title:"Công cụ",owner:"Workspace / Contact / Settings",icons:["phone","phone-off","log-in","users","user-plus","settings","calendar","wallet","filter","monitor","palette","type","layers","receipt"]}
];
export type MotionName="fade"|"rise"|"scale"|"shimmer"|"dots"|"spin"|"pulse";
export interface MotionSpec{effect:MotionName;name:string;owner:string;trigger:string}
export const MOTION_SPECIMENS:readonly MotionSpec[]=[
 {effect:"fade",name:"Fade in",owner:"Menu / Overlay",trigger:"Mở vùng"},
 {effect:"rise",name:"Slide + fade",owner:"Message / Popup",trigger:"Hiện nội dung"},
 {effect:"scale",name:"Press / scale",owner:"Button",trigger:"Nhấn nút"},
 {effect:"shimmer",name:"Thinking shimmer",owner:"Message → Indicator",trigger:"Đang suy nghĩ"},
 {effect:"dots",name:"Loading dots",owner:"Indicator",trigger:"Đang tải"},
 {effect:"spin",name:"Spinner",owner:"Indicator",trigger:"Đang xử lý"},
 {effect:"pulse",name:"Badge bump",owner:"MessageList → Jump button",trigger:"Có tin mới"}
];
const svgNS="http://www.w3.org/2000/svg";
function span(tag:"span"|"small"|"strong"|"div"|"button",className="",value=""):HTMLElement{
 const el=document.createElement(tag);
 if(className)el.className=className;
 el.textContent=value;
 return el;
}
export function iconNode(name:string):SVGSVGElement{
 const svg=document.createElementNS(svgNS,"svg");
 svg.classList.add("ui-icon");
 svg.setAttribute("aria-hidden","true");
 svg.setAttribute("focusable","false");
 const use=document.createElementNS(svgNS,"use");
 use.setAttribute("href","./web/icons.svg#ui-icon-"+name);
 svg.append(use);return svg;
}
export function initIconMotionGallery():void{
 const icons=document.getElementById("iconV43Gallery"),motions=document.getElementById("motionV43Gallery");
 const feedback=document.getElementById("iconV43Feedback");
 if(icons&&feedback){
  let sum=0;
  for(const group of ICON_GROUPS){
   const region=span("div","ui-v43-icon-group");
   const heading=span("strong","ui-v43-icon-group-title",group.title);
   const owner=span("small","ui-v43-icon-owner","Cha: "+group.owner);
   const grid=span("div","ui-v43-icon-grid");
   for(const name of group.icons){
    sum++;
    const button=span("button","ui-button ui-button--secondary ui-v43-icon-card") as HTMLButtonElement;
    button.type="button";button.title="Sao chép: ui-icon-"+name;
    button.setAttribute("aria-label","Sao chép mã icon "+name);
    const art=span("span","ui-v43-icon-art");
    art.append(iconNode(name));button.append(art,span("small","",name));
    button.addEventListener("click",async()=>{
     try{
      await navigator.clipboard.writeText("ui-icon-"+name);
      feedback.textContent="Đã sao chép mã ui-icon-"+name;
     }catch{feedback.textContent="Không có quyền sao chép. Mã icon: ui-icon-"+name;}
    });
    grid.append(button);
   }
   region.append(heading,owner,grid);icons.append(region);
  }
  const counter=document.getElementById("iconV43Count");
  if(counter)counter.textContent=sum+" icon · 1 sprite gốc";
 }
 if(motions){
  for(const motion of MOTION_SPECIMENS){
   const card=span("div","ui-v43-motion-card");
   const title=span("strong","",motion.name);
   const owner=span("small","",motion.owner+" · "+motion.trigger);
   const stage=span("div","ui-v43-motion-stage");
   const demo=span("span","ui-v43-motion-target");
   demo.dataset.motion=motion.effect;
   demo.setAttribute("aria-hidden","true");
   if(motion.effect==="dots"){
    for(let i=0;i<3;i++)demo.append(span("span","ui-v43-dot"));
   }else if(motion.effect==="spin")demo.append(iconNode("loader"));
   else if(motion.effect==="shimmer")demo.textContent="Đang suy nghĩ";
   else if(motion.effect==="pulse")demo.textContent="3";
   else demo.append(iconNode("sparkles"));
   stage.append(demo);
   const replay=span("button","ui-button ui-button--quiet","Thử hiệu ứng") as HTMLButtonElement;
   replay.type="button";
   replay.setAttribute("aria-label","Phát lại "+motion.name);
   replay.addEventListener("click",()=>{
    demo.classList.remove("is-playing");
    void demo.offsetWidth; // Restart only this preview; do not animate page geometry.
    demo.classList.add("is-playing");
   });
   demo.classList.add("is-playing");
   card.append(title,owner,stage,replay);motions.append(card);
  }
 }
}
