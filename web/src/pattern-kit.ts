// UI 2027 V17 · One portable visual contract, multiple copyable compositions.
// No app data or backend calls. Previews are hard-coded owned HTML, never user HTML.
import {UI_PATTERNS,UI_PATTERN_GROUPS,type UiPattern} from "./ui-patterns.js";
export function initPatternKit():void{
 const root=document.getElementById("patternKit") as HTMLElement;
 const tabs=document.getElementById("kitFamilyTabs") as HTMLElement;
 const search=document.getElementById("kitSearch") as HTMLInputElement;
 const count=document.getElementById("kitCount") as HTMLElement;
 const list=document.getElementById("kitItems") as HTMLElement;
 const name=document.getElementById("kitSelectedName") as HTMLElement;
 const desc=document.getElementById("kitSelectedDescription") as HTMLElement;
 const preview=document.getElementById("kitPreview") as HTMLElement;
 const sourceInput=document.getElementById("kitSource") as HTMLTextAreaElement;
 const feedback=document.getElementById("kitFeedback") as HTMLElement;
 const copyButton=document.getElementById("kitCopy") as HTMLButtonElement;
 const copySetup=document.getElementById("kitCopySetup") as HTMLButtonElement;
 const download=document.getElementById("kitExportCatalog") as HTMLButtonElement;
 const showAll=document.getElementById("kitReset") as HTMLButtonElement;
 if(!root||!tabs||!search||!count||!list||!name||!desc||!preview||!sourceInput||!feedback||!copyButton||!copySetup||!download||!showAll)return;
 let activeGroup="all";
 let selected=UI_PATTERNS[0];
 const normalize=(v:string):string=>v.toLocaleLowerCase("vi").normalize("NFD").replace(/\p{M}/gu,"").replace(/đ/g,"d");
 const tell=(message:string):void=>{feedback.textContent=message;};
 const setupText=[
  "<!-- Copy both files from https://github.com/1sl2tp/2027 -->",
  '<link rel="stylesheet" href="./web/styles.css">',
  "<!-- Keep web/icons.svg in that folder: the examples reference its symbols. -->",
  "<!-- Use the shared ui-* / ds-* classes. Wire business events in your own app. -->"
 ].join("\n");
 async function copyValue(content:string,label:string):Promise<void>{
  try{
   if(!navigator.clipboard?.writeText)throw new Error("Clipboard blocked");
   await navigator.clipboard.writeText(content);
   tell("Đã sao chép "+label+". Chưa kết nối vào ứng dụng thật.");
  }catch{
   sourceInput.value=content;sourceInput.focus();sourceInput.select();
   tell("Không thể dùng clipboard trực tiếp. Đã chọn mã trong ô bên dưới để bạn sao chép thủ công.");
  }
 }
 function selectPattern(item:UiPattern):void{
  selected=item;name.textContent=item.id+" · "+item.title;desc.textContent=item.description;
  // Static, developer-owned snippets; not a parser for externally supplied HTML.
  preview.innerHTML=item.html;
  sourceInput.value=item.html;
  for(const button of Array.from(list.querySelectorAll<HTMLButtonElement>("[data-kit-id]"))){
   button.setAttribute("aria-pressed",String(button.dataset.kitId===item.id));
  }
  tell("Mẫu "+item.id+" dùng chung web/styles.css và web/icons.svg. Các nút chỉ thử giao diện.");
 }
 function render():void{
  const q=normalize(search.value.trim());
  const visible=UI_PATTERNS.filter(item=>(activeGroup==="all"||item.group===activeGroup)
    &&(!q||normalize([item.id,item.title,item.description,item.group].join(" ")).includes(q)));
  count.textContent=visible.length+" / "+UI_PATTERNS.length+" mẫu · "+
   UI_PATTERN_GROUPS.filter(group=>visible.some(item=>item.group===group.id)).length+" nhóm";
  list.replaceChildren();
  for(const item of visible){
   const button=document.createElement("button");
   button.className="ui-kit-index-button";button.type="button";
   button.dataset.kitId=item.id;
   button.setAttribute("aria-pressed",String(item.id===selected.id));
   const title=document.createElement("strong");title.textContent=item.title;
   const code=document.createElement("small");code.textContent=item.id+" · "+
     (UI_PATTERN_GROUPS.find(group=>group.id===item.group)?.label||item.group);
   button.append(title,code);list.append(button);
  }
  for(const button of Array.from(tabs.querySelectorAll<HTMLButtonElement>("[data-kit-group]"))){
   button.setAttribute("aria-pressed",String(button.dataset.kitGroup===activeGroup));
  }
  if(visible.length&&!visible.includes(selected))selectPattern(visible[0]);
  if(!visible.length){
   name.textContent="Không có mẫu phù hợp";
   desc.textContent="Hãy đổi nhóm hoặc xóa từ khóa.";
   preview.replaceChildren();sourceInput.value="";
   copyButton.disabled=true;
  }else copyButton.disabled=false;
 }
 const tabNames=[{id:"all",label:"Tất cả"}].concat(UI_PATTERN_GROUPS.map(group=>({id:group.id,label:group.label})));
 for(const group of tabNames){
  const button=document.createElement("button");
  button.type="button";button.dataset.kitGroup=group.id;button.textContent=group.label;
  button.className="ui-kit-filter-button";button.setAttribute("aria-pressed",String(group.id==="all"));
  tabs.append(button);
 }
 tabs.addEventListener("click",event=>{
  if(!(event.target instanceof Element))return;
  const button=event.target.closest<HTMLButtonElement>("[data-kit-group]");
  if(!button)return;activeGroup=button.dataset.kitGroup||"all";render();
 });
 list.addEventListener("click",event=>{
  if(!(event.target instanceof Element))return;
  const button=event.target.closest<HTMLButtonElement>("[data-kit-id]");
  const item=UI_PATTERNS.find(x=>x.id===button?.dataset.kitId);
  if(item)selectPattern(item);
 });
 search.addEventListener("input",render);
 showAll.addEventListener("click",()=>{activeGroup="all";search.value="";render();search.focus();});
 copyButton.addEventListener("click",()=>{if(sourceInput.value)void copyValue(sourceInput.value,"HTML mẫu "+selected.id);});
 copySetup.addEventListener("click",()=>void copyValue(setupText,"hướng dẫn nạp CSS/icon"));
 download.addEventListener("click",()=>{
  const manifest={version:"2027-UI-V17",status:"presentation-only",source:"1sl2tp/2027",
   stylesheet:"web/styles.css",iconRegistry:"web/icons.svg",
   patterns:UI_PATTERNS.map(item=>({id:item.id,group:item.group,title:item.title,description:item.description,html:item.html}))};
  const blob=new Blob([JSON.stringify(manifest,null,2)],{type:"application/json;charset=utf-8"});
  const url=URL.createObjectURL(blob);
  const a=document.createElement("a");
  a.href=url;a.download="2027-ui-pattern-catalog-v17.json";
  document.body.append(a);a.click();a.remove();
  window.setTimeout(()=>URL.revokeObjectURL(url),1000);
  tell("Đã tạo yêu cầu tải JSON danh mục mẫu. Đây là dữ liệu thiết kế, không có dữ liệu khách.");
 });
 preview.addEventListener("click",event=>{
  if(!(event.target instanceof Element))return;
  const step=event.target.closest<HTMLButtonElement>("[data-kit-minus], [data-kit-plus]");
  if(step){
   const input=step.closest<HTMLElement>("[data-kit-stepper]")?.querySelector<HTMLInputElement>("input");
   if(!input)return;
   const value=Number(input.value)||0;
   const min=Number(input.min||0),max=Number(input.max||999);
   input.value=String(Math.min(max,Math.max(min,value+(step.hasAttribute("data-kit-plus")?1:-1))));
   tell("Đã đổi số lượng mẫu thành "+input.value+". Không thêm hàng vào giỏ thật.");
   return;
  }
  const segment=event.target.closest<HTMLButtonElement>("[data-kit-segment]");
  if(segment){
   const all=segment.closest<HTMLElement>(".ds-segmented")?.querySelectorAll<HTMLButtonElement>("[data-kit-segment]");
   all?.forEach(button=>button.setAttribute("aria-pressed",String(button===segment)));
   tell("Đã chọn bộ lọc mẫu "+(segment.textContent||"")+".");
   return;
  }
  const password=event.target.closest<HTMLButtonElement>("[data-kit-password-toggle]");
  if(password){
   const field=password.closest<HTMLElement>(".ds-field")?.querySelector<HTMLInputElement>("[data-kit-password]");
   if(field)field.type=field.type==="password"?"text":"password";
   password.setAttribute("aria-label",field?.type==="password"?"Hiện mật khẩu":"Ẩn mật khẩu");
   tell("Đã đổi chế độ hiển thị mật khẩu thử, không đăng nhập thật.");
   return;
  }
  const sw=event.target.closest<HTMLButtonElement>("[data-kit-switch]");
  if(sw){
   const on=sw.getAttribute("aria-pressed")!=="true";
   sw.setAttribute("aria-pressed",String(on));
   tell(on?"Bật trạng thái thử.":"Tắt trạng thái thử.");
   return;
  }
  const action=event.target.closest<HTMLButtonElement>("[data-kit-action]");
  if(!action)return;
  if(action.dataset.kitAction==="remove-media"){
   action.closest(".ds-media-tile")?.remove();
   tell("Đã bỏ thumbnail giả lập. Không xóa ảnh trên thiết bị.");
  }else if(action.dataset.kitAction==="close-toast"){
   action.closest(".ds-toast")?.remove();
   tell("Đã đóng thông báo mẫu.");
  }else{
   tell("Đã thử nút “"+(action.textContent?.trim()||action.getAttribute("aria-label")||"thao tác")+
    "”. Mẫu chỉ trình diễn, không gửi tin, ghi thu hoặc chỉnh đơn.");
  }
 });
 render();selectPattern(selected);
}
