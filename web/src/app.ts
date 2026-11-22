// UI-V06 · A ChatGPT-like document and component visual workshop.
// Design tokens are shared with the flows; all interactions stay in the browser.
import {
  PALETTES,FONTS,DEFAULT_SETTINGS,readSavedSettings,saveSettings,clearSavedSettings,
  applyDesignTokens,exportCss,auditPalette,
  type DesignSettings,type FontKey,type PaletteKey,type ViewportKey
} from "./design.js";
import { initComposerGallery } from "./composer-gallery.js";
import { initMessageActions } from "./action-gallery.js";
import { initRootButtonCatalog } from "./root-button-library.js";
import { initPatternKit } from "./pattern-kit.js";
import { initInvoiceGallery } from "./invoice-gallery.js";
import { initSimpleGallery } from "./simple-gallery.js";
import { initSimpleFields } from "./simple-fields.js";

type BlockId="title"|"body"|"section"|"description"|"list"|"table"|"number"|"money"|"note"|"caption";
type SelectId=BlockId|"all";
interface BlockStyle {
 font?:FontKey;size?:number;weight?:number;italic?:boolean;underline?:boolean;surface?:boolean;
 leading?:number;tracking?:number;
}
interface BlockDefinition {label:string;size:number;weight:number;}
const blockTypes:Record<BlockId,BlockDefinition>={
 title:{label:"Tiêu đề lớn",size:30,weight:700},
 body:{label:"Đoạn mở đầu",size:16,weight:400},
 section:{label:"Tiêu đề mục",size:21,weight:700},
 description:{label:"Đoạn nội dung",size:16,weight:400},
 list:{label:"Danh sách",size:16,weight:400},
 table:{label:"Bảng dữ liệu",size:14,weight:400},
 number:{label:"Số lượng",size:18,weight:600},
 money:{label:"Số tiền",size:20,weight:700},
 note:{label:"Ghi chú",size:14,weight:400},
 caption:{label:"Nhãn phụ",size:13,weight:400}
};
const blockIds=Object.keys(blockTypes) as BlockId[];
const storageKey="2027-ui-library-blocks-v06";
const settings:DesignSettings=readSavedSettings();
let selected:SelectId="all";
let allUnderline=false;
let allSurface=false;
let blocks:Partial<Record<BlockId,BlockStyle>>={};
function get<T extends HTMLElement>(id:string):T {
 const element=document.getElementById(id);
 if(!element)throw new Error("Missing element "+id);
 return element as T;
}
function saveBlockStyles():boolean {
 try{localStorage.setItem(storageKey,JSON.stringify({allUnderline,allSurface,blocks}));return true;}
 catch{return false;}
}
function loadBlockStyles():void{
 try{
  const value=JSON.parse(localStorage.getItem(storageKey)||"null") as
   {allUnderline?:unknown;allSurface?:unknown;blocks?:Record<string,Record<string,unknown>>}|null;
  if(!value||typeof value!=="object")return;
  allUnderline=value.allUnderline===true;
  allSurface=value.allSurface===true;
  if(!value.blocks||typeof value.blocks!=="object")return;
  for(const id of blockIds){
   const raw=value.blocks[id];if(!raw||typeof raw!=="object")continue;
   const clean:BlockStyle={};
   if(typeof raw.font==="string"&&Object.prototype.hasOwnProperty.call(FONTS,raw.font))clean.font=raw.font as FontKey;
   if(typeof raw.size==="number"&&Number.isFinite(raw.size))clean.size=Math.max(12,Math.min(40,Math.round(raw.size)));
   if(typeof raw.weight==="number"&&[400,500,600,700].includes(raw.weight))clean.weight=raw.weight;
   if(typeof raw.italic==="boolean")clean.italic=raw.italic;
   if(typeof raw.underline==="boolean")clean.underline=raw.underline;
   if(typeof raw.surface==="boolean")clean.surface=raw.surface;
   if(typeof raw.leading==="number"&&Number.isFinite(raw.leading))clean.leading=Math.max(1.2,Math.min(1.9,raw.leading));
   if(typeof raw.tracking==="number"&&Number.isFinite(raw.tracking))clean.tracking=Math.max(-0.02,Math.min(0.08,raw.tracking));
   blocks[id]=clean;
  }
 }catch{/* malformed or blocked storage uses the default demo */}
}
loadBlockStyles();

const statusEl=get<HTMLElement>("statusText");
function announce(message:string):void{statusEl.textContent=message;}
function save(message:string):void {
 const ok=saveSettings(settings)&&saveBlockStyles();
 get<HTMLElement>("savedStatus").textContent=ok?"Đã lưu cục bộ":"Không thể lưu trên thiết bị";
 render();announce(message);
}
function computed(id:BlockId):Required<BlockStyle>{
 const base=blockTypes[id],over=blocks[id]||{};
 return {
  font:over.font??settings.font,
  size:over.size??Math.round(base.size*settings.size/16),
  weight:over.weight??(settings.weight!==400?settings.weight:base.weight),
  italic:over.italic??(settings.textStyle==="italic"),
  underline:over.underline??allUnderline,
  surface:over.surface??allSurface,
  leading:over.leading??settings.leading,
  tracking:over.tracking??settings.tracking
 };
}
function selectedStyle():Required<BlockStyle>{
 return selected==="all"
  ? {font:settings.font,size:settings.size,weight:settings.weight,italic:settings.textStyle==="italic",
     underline:allUnderline,surface:allSurface,leading:settings.leading,tracking:settings.tracking}
  : computed(selected);
}
function setStyle(part:Partial<BlockStyle>,message:string):void{
 if(selected==="all"){
  if(part.font)settings.font=part.font;
  if(typeof part.size==="number")settings.size=Math.max(13,Math.min(21,part.size));
  if(typeof part.weight==="number")settings.weight=part.weight;
  if(typeof part.italic==="boolean")settings.textStyle=part.italic?"italic":"normal";
  if(typeof part.underline==="boolean")allUnderline=part.underline;
  if(typeof part.surface==="boolean")allSurface=part.surface;
  if(typeof part.leading==="number")settings.leading=part.leading;
  if(typeof part.tracking==="number")settings.tracking=part.tracking;
 }else{
  blocks[selected]={...blocks[selected],...part};
 }
 save(message);
}
function setPressed(selector:string,attr:string,value:string):void{
 for(const b of Array.from(document.querySelectorAll<HTMLButtonElement>(selector))){
  const pressed=b.getAttribute(attr)===value;b.classList.toggle("selected",pressed);
  b.setAttribute("aria-pressed",String(pressed));
 }
}
function renderBlocks():void{
 for(const id of blockIds){
  const element=document.querySelector<HTMLElement>('.studio-document [data-block="'+id+'"]');
  if(!element)continue;
  const s=computed(id);
  element.style.fontFamily=FONTS[s.font].css;
  element.style.fontSize=s.size+"px";
  element.style.lineHeight=s.leading.toFixed(2);
  element.style.letterSpacing=s.tracking.toFixed(2)+"em";
  element.style.fontWeight=String(s.weight);
  element.style.fontStyle=s.italic?"italic":"normal";
  element.style.textDecoration=s.underline?"underline":"none";
  element.classList.toggle("has-surface",s.surface);
  element.classList.toggle("is-target",selected===id);
  element.setAttribute("aria-pressed",String(selected===id));
 }
}
function renderInspector():void{
 const s=selectedStyle();
 const all=selected==="all";
 const input=get<HTMLInputElement>("sizeRange");
 input.min=all?"13":"12";input.max=all?"21":"40";input.value=String(Math.max(Number(input.min),Math.min(Number(input.max),s.size)));
 get<HTMLElement>("sizeOutput").textContent=s.size+" px";
 get<HTMLSelectElement>("fontSelect").value=s.font;
 get<HTMLElement>("weightOutput").textContent=String(s.weight);
 get<HTMLInputElement>("leadingRange").value=s.leading.toFixed(2);
 get<HTMLElement>("leadingOutput").textContent=s.leading.toFixed(2);
 get<HTMLInputElement>("trackingRange").value=s.tracking.toFixed(2);
 get<HTMLElement>("trackingOutput").textContent=s.tracking.toFixed(2)+" em";
 get<HTMLElement>("selectedBlockLabel").textContent=selected==="all"?"Toàn văn bản":blockTypes[selected].label;
 const allButton=get<HTMLButtonElement>("selectAllButton");
 allButton.classList.toggle("selected",all);allButton.setAttribute("aria-pressed",String(all));
 for(const [id,pressed] of [
  ["boldButton",s.weight>=700],["italicButton",s.italic],
  ["underlineButton",s.underline],["surfaceButton",s.surface]
 ] as [string,boolean][]){
  const el=get<HTMLButtonElement>(id);el.classList.toggle("selected",pressed);el.setAttribute("aria-pressed",String(pressed));
 }
 setPressed("[data-weight]","data-weight",String(s.weight));
}
function render():void{
 const palette=PALETTES[settings.palette];
 applyDesignTokens(get<HTMLElement>("studioTheme"),settings);
 applyDesignTokens(get<HTMLElement>("componentTheme"),settings);
 get<HTMLElement>("studioTheme").style.setProperty("color-scheme",settings.palette==="dark"?"dark":"light");
 get<HTMLElement>("componentTheme").style.setProperty("color-scheme",settings.palette==="dark"?"dark":"light");
 get<HTMLElement>("paletteLabel").textContent="Nền "+palette.label.toLowerCase();
 get<HTMLElement>("contrastPalette").textContent=palette.label;
 const audit=auditPalette(settings.palette);
 get<HTMLElement>("contrastSummary").textContent=audit.filter(x=>x.passesAA).length+"/"+audit.length+" cặp đạt AA";
 get<HTMLElement>("demoCanvas").dataset.viewport=settings.viewport;
 setPressed("[data-palette]","data-palette",settings.palette);
 setPressed("[data-viewport]","data-viewport",settings.viewport);
 renderBlocks();
 renderInspector();
 const css=exportCss(settings);
 const typeRules=blockIds.map(id=>{
   const s=computed(id);
   return '.studio-document [data-block="'+id+'"] {'+
    '\n  font-family: '+FONTS[s.font].css+';'+
    '\n  font-size: '+s.size+'px;'+
    '\n  font-weight: '+s.weight+';'+
    '\n  font-style: '+(s.italic?"italic":"normal")+';'+
    '\n  text-decoration: '+(s.underline?"underline":"none")+';'+
    '\n  line-height: '+s.leading.toFixed(2)+';'+
    '\n  letter-spacing: '+s.tracking.toFixed(2)+'em;'+
    '\n  background: '+(s.surface?"var(--ui-surface)":"transparent")+';'+
    '\n}';
 }).join('\n');
 get<HTMLElement>("cssPreview").textContent=css+"\n/* Quy tắc trình bày cho 10 loại nội dung */\n"+typeRules;
}
function selectBlock(next:SelectId):void {
 selected=next;render();announce(next==="all"?"Chọn toàn văn bản.":"Đang chỉnh: "+blockTypes[next].label+".");
}
get<HTMLButtonElement>("selectAllButton").addEventListener("click",()=>selectBlock("all"));
for(const element of Array.from(document.querySelectorAll<HTMLElement>(".studio-document [data-block]"))){
 const key=element.dataset.block as BlockId;
 element.addEventListener("click",()=>selectBlock(key));
 element.addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();selectBlock(key);}});
}
get<HTMLSelectElement>("fontSelect").addEventListener("change",e=>{
 const key=(e.target as HTMLSelectElement).value;
 if(Object.prototype.hasOwnProperty.call(FONTS,key))setStyle({font:key as FontKey},"Đã đổi font cho "+(selected==="all"?"toàn bộ văn bản":blockTypes[selected].label)+".");
});
get<HTMLInputElement>("sizeRange").addEventListener("input",e=>{
 const n=Number((e.target as HTMLInputElement).value);
 if(Number.isInteger(n))setStyle({size:n},"Cỡ chữ "+n+" px.");
});
for(const button of Array.from(document.querySelectorAll<HTMLButtonElement>("[data-weight]"))){
 button.addEventListener("click",()=>{
  const w=Number(button.dataset.weight);if([400,500,600,700].includes(w))setStyle({weight:w},"Độ đậm "+w+".");
 });
}
get<HTMLButtonElement>("boldButton").addEventListener("click",()=>{
 const s=selectedStyle();setStyle({weight:s.weight>=700?400:700},"Đã thay đổi kiểu đậm.");
});
get<HTMLButtonElement>("italicButton").addEventListener("click",()=>setStyle({italic:!selectedStyle().italic},"Đã thay đổi kiểu nghiêng."));
get<HTMLButtonElement>("underlineButton").addEventListener("click",()=>setStyle({underline:!selectedStyle().underline},"Đã thay đổi kiểu gạch chân."));
get<HTMLButtonElement>("surfaceButton").addEventListener("click",()=>setStyle({surface:!selectedStyle().surface},"Đã thay đổi nền khối."));
get<HTMLInputElement>("leadingRange").addEventListener("input",e=>setStyle({leading:Number((e.target as HTMLInputElement).value)},"Đã thay đổi giãn dòng."));
get<HTMLInputElement>("trackingRange").addEventListener("input",e=>setStyle({tracking:Number((e.target as HTMLInputElement).value)},"Đã thay đổi giãn ký tự."));
for(const b of Array.from(document.querySelectorAll<HTMLButtonElement>("[data-palette]"))){
 b.addEventListener("click",()=>{
  const key=b.dataset.palette;
  if(key&&Object.prototype.hasOwnProperty.call(PALETTES,key)){
   settings.palette=key as PaletteKey;
   save("Đã đổi nền sang "+PALETTES[settings.palette].label+".");
  }
 });
}
for(const b of Array.from(document.querySelectorAll<HTMLButtonElement>("[data-viewport]"))){
 b.addEventListener("click",()=>{
  const key=b.dataset.viewport;
  if(key==="desktop"||key==="mobile"){settings.viewport=key as ViewportKey;save("Đã chọn xem "+(key==="mobile"?"mobile":"rộng")+".");}
 });
}
get<HTMLButtonElement>("resetButton").addEventListener("click",()=>{
 Object.assign(settings,DEFAULT_SETTINGS);blocks={};allUnderline=false;allSurface=false;selected="all";
 clearSavedSettings();
 try{localStorage.removeItem(storageKey);}catch{/* storage permission is optional */}
 render();get<HTMLElement>("savedStatus").textContent="Mẫu mặc định";announce("Đã khôi phục văn bản và bảng màu mặc định.");
});
get<HTMLButtonElement>("copyButton").addEventListener("click",()=>{
 void (async()=>{
  try{
   if(!navigator.clipboard?.writeText)throw new Error("Clipboard blocked");
   await navigator.clipboard.writeText(get<HTMLElement>("cssPreview").textContent||"");
   announce("Đã sao chép CSS của bộ mẫu, gồm các phần chỉnh riêng.");
  }catch{announce("Trình duyệt không cho phép sao chép CSS.");}
 })();
});

// Gallery: actual local behaviors, not placeholder controls.
for(const b of Array.from(document.querySelectorAll<HTMLButtonElement>("[data-demo]"))){
 b.addEventListener("click",()=>{get<HTMLElement>("buttonFeedback").textContent="Đã bấm nút "+b.textContent?.trim()+" trong bản mẫu.";});
}
for(const b of Array.from(document.querySelectorAll<HTMLButtonElement>("[data-icon]"))){
 b.addEventListener("click",()=>{
  get<HTMLElement>("iconFeedback").textContent="Đã bấm icon: "+(b.dataset.icon||"mẫu")+".";
  for(const x of Array.from(document.querySelectorAll<HTMLButtonElement>("[data-icon]")))x.classList.toggle("is-picked",x===b);
 });
}
const qtyInput=get<HTMLInputElement>("quantityInput");
function setQty(n:number):void{
 const next=Math.max(0,Math.min(99,Math.round(Number.isFinite(n)?n:0)));
 qtyInput.value=String(next);get<HTMLElement>("qtyFeedback").textContent="Số lượng hiện tại: "+next;
}
get<HTMLButtonElement>("qtyMinus").addEventListener("click",()=>setQty(Number(qtyInput.value)-1));
get<HTMLButtonElement>("qtyPlus").addEventListener("click",()=>setQty(Number(qtyInput.value)+1));
qtyInput.addEventListener("input",()=>{
 const n=Number(qtyInput.value);
 get<HTMLElement>("qtyFeedback").textContent=Number.isFinite(n)&&n>=0&&n<=99?"Số lượng đang nhập: "+qtyInput.value:"Giới hạn từ 0 đến 99.";
});
qtyInput.addEventListener("change",()=>setQty(Number(qtyInput.value)));
const products=["Sữa hộp","Bánh quy","Nước khoáng"];
get<HTMLInputElement>("searchInput").addEventListener("input",e=>{
 const query=(e.target as HTMLInputElement).value.trim().toLocaleLowerCase("vi");
 const found=products.filter(p=>p.toLocaleLowerCase("vi").includes(query));
 get<HTMLElement>("searchResults").textContent=found.length?found.join(" · "):"Không tìm thấy trong dữ liệu mẫu.";
});
const chatInput=get<HTMLTextAreaElement>("chatInput");
chatInput.addEventListener("input",()=>{
 chatInput.style.height="auto";
 chatInput.style.height=Math.min(chatInput.scrollHeight,128)+"px";
});
get<HTMLFormElement>("chatDemoForm").addEventListener("submit",e=>{
 e.preventDefault();
 const message=chatInput.value.trim();if(!message)return;
 const bubble=document.createElement("div");bubble.className="studio-chat-bubble sent";bubble.textContent=message;
 const area=get<HTMLElement>("chatExamples");area.append(bubble);
 while(area.childElementCount>5)area.firstElementChild?.remove();
 area.scrollTop=area.scrollHeight;chatInput.value="";chatInput.style.height="";
 get<HTMLElement>("chatFeedback").textContent="Đã thêm tin nhắn mẫu; không gửi lên máy chủ.";
});
// One anchored secondary menu. Keyboard Escape and outside-click both close it.
const menu=get<HTMLElement>("sampleMenu");
const menuButton=get<HTMLButtonElement>("menuButton");
function setMenu(open:boolean):void{
 menu.hidden=!open;menuButton.setAttribute("aria-expanded",String(open));
 if(open)menu.querySelector<HTMLButtonElement>('[role="menuitem"]')?.focus();
 else menuButton.focus();
}
menuButton.addEventListener("click",()=>setMenu(menu.hidden));
for(const b of Array.from(menu.querySelectorAll<HTMLButtonElement>("[data-menu-item]"))){
 b.addEventListener("click",()=>{
  get<HTMLElement>("menuFeedback").textContent="Đã chọn: "+(b.dataset.menuItem||"menu")+" (mẫu).";
  setMenu(false);
 });
}
document.addEventListener("click",e=>{
 const anchor=get<HTMLElement>("menuAnchor");
 if(!menu.hidden&&!anchor.contains(e.target as Node))setMenu(false);
});
const dialog=get<HTMLDialogElement>("demoDialog");
get<HTMLButtonElement>("openPopupButton").addEventListener("click",()=>dialog.showModal());
for(const id of ["dialogCloseButton","dialogCancelButton"]){
 get<HTMLButtonElement>(id).addEventListener("click",()=>dialog.close());
}
get<HTMLButtonElement>("dialogConfirmButton").addEventListener("click",()=>{
 dialog.close();announce("Đã xác nhận trong popup mẫu; không có thao tác thật.");
});
dialog.addEventListener("click",e=>{if(e.target===dialog)dialog.close();});
document.addEventListener("keydown",e=>{if(e.key==="Escape"&&!menu.hidden)setMenu(false);});
for(const link of Array.from(document.querySelectorAll<HTMLAnchorElement>(".studio-sidebar .nav-link"))){
 link.addEventListener("click",()=>{
  document.querySelectorAll(".studio-sidebar .nav-link").forEach(x=>x.classList.remove("active"));
  link.classList.add("active");
 });
}

// V07 gallery behavior — side-by-side variants remain independent and local.
const tableOptions=Array.from(document.querySelectorAll<HTMLButtonElement>("[data-variant-select]"));
for(const b of tableOptions){
 b.addEventListener("click",()=>{
  const name=b.querySelector("span")?.textContent||"kiểu bảng";
  for(const option of tableOptions){
   const active=option===b;
   option.setAttribute("aria-pressed",String(active));
   option.closest(".variant-sample")?.classList.toggle("is-picked",active);
   const hint=option.lastElementChild;
   if(hint)hint.textContent=active?"Đang chọn":"Chọn";
  }
  get<HTMLElement>("variantTableFeedback").textContent="Đang xem: "+name+". Không làm thay đổi dữ liệu hoặc giao dịch.";
 });
}
const qtyVariants=Array.from(document.querySelectorAll<HTMLElement>("[data-qty-kind]"));
function normalizeQty(input:HTMLInputElement):number{
 const n=Number(input.value);
 const safe=Number.isFinite(n)?Math.round(n):0;
 const clamped=Math.min(99,Math.max(0,safe));
 input.value=String(clamped);
 return clamped;
}
for(const variant of qtyVariants){
 const input=variant.querySelector<HTMLInputElement>('input[type="number"]');
 if(!input)continue;
 const name=variant.dataset.qtyKind||"mẫu";
 const updateButtons=(qty:number)=>{
  for(const btn of Array.from(variant.querySelectorAll<HTMLButtonElement>("[data-step]"))){
   btn.disabled=qty===0&&btn.dataset.step==="-1"||qty===99&&btn.dataset.step==="1";
  }
 };
 updateButtons(normalizeQty(input));
 for(const btn of Array.from(variant.querySelectorAll<HTMLButtonElement>("[data-step]"))){
  btn.addEventListener("click",()=>{
   const next=normalizeQty(input)+Number(btn.dataset.step||"0");
   const q=normalizeQty(Object.assign(input,{value:String(next)}));
   updateButtons(q);
   get<HTMLElement>("variantQtyFeedback").textContent="Kiểu "+name+": số lượng "+q+" (mẫu cục bộ).";
  });
 }
 input.addEventListener("input",()=>{
  get<HTMLElement>("variantQtyFeedback").textContent="Kiểu "+name+": đang nhập "+input.value+".";
 });
 input.addEventListener("change",()=>{
  const q=normalizeQty(input);updateButtons(q);
  get<HTMLElement>("variantQtyFeedback").textContent="Kiểu "+name+": số lượng "+q+" (giới hạn 0–99).";
 });
}
const variantInputs=Array.from(document.querySelectorAll<HTMLInputElement>(".input-variant, .input-variant-shell input"));
for(const input of variantInputs){
 input.addEventListener("focus",()=>{
  get<HTMLElement>("variantInputFeedback").textContent="Đã chọn: "+(input.placeholder||"ô nhập mẫu")+".";
 });
 input.addEventListener("input",()=>{
  get<HTMLElement>("variantInputFeedback").textContent="Nội dung chỉ ở máy của bạn: "+input.value.slice(0,60);
 });
}
get<HTMLButtonElement>("variantClearInput").addEventListener("click",()=>{
 const input=get<HTMLInputElement>("variantSearchInput");
 input.value="";input.focus();
 get<HTMLElement>("variantInputFeedback").textContent="Đã xóa nội dung ô input có icon.";
});
for(const b of Array.from(document.querySelectorAll<HTMLButtonElement>("[data-expand-lines]"))){
 b.addEventListener("click",()=>{
  const text=b.parentElement?.querySelector<HTMLElement>(".line-preview");
  if(!text)return;
  const expanded=text.classList.toggle("is-expanded");
  b.setAttribute("aria-expanded",String(expanded));
  b.textContent=expanded?"Thu gọn":"Xem đủ";
 });
}
for(const b of Array.from(document.querySelectorAll<HTMLButtonElement>("[data-layout-action]"))){
 b.addEventListener("click",()=>{
  const message="Đã thử bố cục: "+(b.dataset.layoutAction||"mẫu")+".";
  const area=b.closest(".studio-component-card");
  const feedback=area?.querySelector<HTMLElement>("#iconLayoutFeedback, #compoundFeedback");
  if(feedback)feedback.textContent=message;
 });
}


// UI-V10 · Browse the existing samples by purpose instead of one long gallery.
// No component is recreated: grouped sections and all previous demo handlers stay intact.
type GalleryCategory = "all"|"typography"|"tables"|"invoices"|"quantity"|"inputs"|"actions"|"layouts"|"overlays";
const galleryCategories:GalleryCategory[]=["all","typography","tables","invoices","quantity","inputs","actions","layouts","overlays"];
const gallerySearch=get<HTMLInputElement>("gallerySearch");
const galleryMobileFilter=get<HTMLSelectElement>("galleryMobileFilter");
const gallerySections=Array.from(document.querySelectorAll<HTMLElement>("[data-gallery-category]"));
const galleryFilterButtons=Array.from(document.querySelectorAll<HTMLButtonElement>("[data-gallery-filter]"));
let activeGalleryCategory:GalleryCategory="all";
const normalizeGalleryText=(text:string):string=>text.toLocaleLowerCase("vi")
 .normalize("NFD").replace(/\p{M}/gu,"").replace(/đ/g,"d").trim();
function galleryCategoryFromHash():GalleryCategory|null{
 const hash=window.location.hash.replace(/^#/,"");
 if(hash==="components")return "all";
 if(hash==="overlays")return "overlays"; // Maintain old links to the menu example.
 const key=hash.startsWith("sample-")?hash.slice("sample-".length):"";
 return galleryCategories.includes(key as GalleryCategory)?key as GalleryCategory:null;
}
function updateGallery():void{
 const search=normalizeGalleryText(gallerySearch.value);
 let count=0,visibleGroups=0;
 for(const section of gallerySections){
  const categoryMatches=activeGalleryCategory==="all"||section.dataset.galleryCategory===activeGalleryCategory;
  let visible=0;
  for(const card of Array.from(section.querySelectorAll<HTMLElement>(".studio-component-card"))){
   const searchable=normalizeGalleryText(card.textContent||"");
   const matches=categoryMatches&&(!search||searchable.includes(search));
   card.hidden=!matches;
   if(matches)visible++;
  }
  section.hidden=visible===0;
  if(visible>0)visibleGroups++;
  count+=visible;
 }
 for(const button of galleryFilterButtons){
  const on=button.dataset.galleryFilter===activeGalleryCategory;
  button.classList.toggle("selected",on);
  button.setAttribute("aria-pressed",String(on));
 }
 galleryMobileFilter.value=activeGalleryCategory;
 get<HTMLElement>("galleryCount").textContent=count+" bộ mẫu · "+visibleGroups+" nhóm";
 get<HTMLElement>("galleryEmpty").hidden=count>0;
}
function chooseGallery(category:GalleryCategory,scroll:boolean):void{
 activeGalleryCategory=category;
 gallerySearch.value="";
 updateGallery();
 if(scroll)get<HTMLElement>("components").scrollIntoView({block:"start",behavior:"smooth"});
}
galleryMobileFilter.addEventListener("change",()=>{
 const category=galleryMobileFilter.value as GalleryCategory;
 if(galleryCategories.includes(category))chooseGallery(category,false);
});
for(const button of galleryFilterButtons){
 button.addEventListener("click",()=>{
  const category=button.dataset.galleryFilter as GalleryCategory;
  if(!galleryCategories.includes(category))return;
  chooseGallery(category,false);
  if(window.location.hash!=="#components")
   get<HTMLElement>("components").scrollIntoView({block:"start",behavior:"smooth"});
 });
}
gallerySearch.addEventListener("input",()=>{
 activeGalleryCategory="all";updateGallery();
});
get<HTMLButtonElement>("galleryClearSearch").addEventListener("click",()=>{
 gallerySearch.value="";updateGallery();gallerySearch.focus();
});
get<HTMLButtonElement>("galleryShowAll").addEventListener("click",()=>chooseGallery("all",true));
for(const link of Array.from(document.querySelectorAll<HTMLAnchorElement>(".studio-sidebar a[href^='#sample-'], .studio-sidebar a[href='#components']"))){
 link.addEventListener("click",()=>{
  const hash=link.getAttribute("href")||"";
  const category=hash==="#components"?"all":hash.slice("#sample-".length) as GalleryCategory;
  if(galleryCategories.includes(category))chooseGallery(category,false);
 });
}
window.addEventListener("hashchange",()=>{
 const category=galleryCategoryFromHash();
 if(category)chooseGallery(category,false);
});
const initialGalleryCategory=galleryCategoryFromHash();
if(initialGalleryCategory)activeGalleryCategory=initialGalleryCategory;
initSimpleGallery();
initSimpleFields();
initPatternKit();
initInvoiceGallery();
initRootButtonCatalog(); // Build the source catalog before text-search discovers gallery content.
updateGallery();

// UI-V12 · The SAME ui-button/ui-icon controls that are used by every chat composer.
for(const button of Array.from(document.querySelectorAll<HTMLButtonElement>("[data-ui-control-preview]"))){
 button.addEventListener("click",()=>{
  const kind=button.dataset.uiControlPreview;
  let message="Đã thử nút gốc 2027.";
  if(kind==="plus")message="Nút +: hành động thêm media trong ô gõ chat (chỉ minh họa tại thư viện).";
  if(kind==="mode"){
    const label=button.querySelector<HTMLElement>("[data-ui-demo-mode]");
    if(label)label.textContent=label.textContent==="Cao"?"Nhanh":"Cao";
    message="Đã thay đổi nhãn chế độ mẫu. Bốn ô chat dùng chung kiểu chữ và icon chevron này.";
  }
  if(kind==="mic"){
    const active=button.getAttribute("aria-pressed")!=="true";
    button.setAttribute("aria-pressed",String(active));
    message=active?"Mic ở trạng thái nhấn (mẫu, không truy cập micro).":"Mic trở về trạng thái bình thường.";
  }
  if(kind==="send")message="Đã thử nút gửi gốc. Không gửi dữ liệu thật.";
  get<HTMLElement>("sharedActionFeedback").textContent=message;
 });
}
initComposerGallery();
initMessageActions();
render();
// When a user opens #sample-inputs directly, filtering hides preceding sections.
// Reposition the anchor once the visible layout has settled.
if(initialGalleryCategory&&initialGalleryCategory!=="all"){
 requestAnimationFrame(()=>{
  document.getElementById("sample-"+initialGalleryCategory)?.scrollIntoView({block:"start"});
 });
}
