// 2027 UI-V14 · Root button reference browser for CHAT + TAPHOA.
// All listed buttons are source-mapped visual examples. No production handlers,
// no external requests, no customer/account data, and no mutation of other apps.
import { ROOT_BUTTON_SPECS,ROOT_BUTTON_FAMILIES,
  type RootButtonSpec,type ButtonOrigin } from "./root-button-data.js";
export function initRootButtonCatalog():void {
 const root=document.getElementById("rootButtonGroups");
 const select=document.getElementById("rootButtonFamily") as HTMLSelectElement|null;
 const search=document.getElementById("rootButtonQuery") as HTMLInputElement|null;
 const reset=document.getElementById("rootButtonReset") as HTMLButtonElement|null;
 const count=document.getElementById("rootButtonCount");
 const empty=document.getElementById("rootButtonEmpty");
 const detail=document.getElementById("rootButtonDetail");
 const stateFeedback=document.getElementById("rootStateFeedback");
 const comboFeedback=document.getElementById("rootComboFeedback");
 if(!root||!select||!search||!reset||!count||!empty||!detail||!stateFeedback||!comboFeedback)return;
 type OriginFilter="ALL"|ButtonOrigin;
 let origin:OriginFilter="ALL";
 let selectedId:string|null=null;
 const originButtons=Array.from(document.querySelectorAll<HTMLButtonElement>("[data-root-origin]"));
 const lower=(value:string):string=>value.toLocaleLowerCase("vi").normalize("NFD")
   .replace(/\p{M}/gu,"").replace(/đ/g,"d").trim();
 const make=<T extends keyof HTMLElementTagNameMap>(tag:T,className?:string):HTMLElementTagNameMap[T]=>{
   const node=document.createElement(tag);
   if(className)node.className=className;
   return node;
 };
 const setText=(node:HTMLElement,value:string):HTMLElement=>{node.textContent=value;return node;};
 const appendIcon=(button:HTMLButtonElement,name:string):void=>{
   const svg=document.createElementNS("http://www.w3.org/2000/svg","svg");
   svg.classList.add("ui-icon");svg.setAttribute("aria-hidden","true");
   const use=document.createElementNS("http://www.w3.org/2000/svg","use");
   use.setAttribute("href","./web/icons.svg#ui-icon-"+name);
   svg.append(use);button.append(svg);
 };
 const sourceUrl=(s:RootButtonSpec):string=>
   "https://github.com/1sl2tp/"+(s.origin==="CHAT"?"chat":"taphoaxyz")+"/blob/main/"+s.source;
 for(const family of ROOT_BUTTON_FAMILIES){
   const option=make("option");option.value=family.id;option.textContent=family.label;select.append(option);
 }
 function renderDetail(spec:RootButtonSpec):void{
   detail.replaceChildren();
   detail.append(setText(make("strong"),spec.title));
   detail.append(setText(make("span"),"Nguồn: "+spec.origin+" · Họ: "+
     (ROOT_BUTTON_FAMILIES.find(group=>group.id===spec.family)?.label||spec.family)+
     " · Primitive: "+spec.primitive));
   detail.append(setText(make("span"),"Kiểu thiết kế: "+spec.variant+" · Mã tham chiếu: "+spec.id));
   const source=make("span");
   source.append(document.createTextNode("Selector/owner: "));
   source.append(setText(make("code"),spec.selector));
   detail.append(source);
   const link=make("a");
   link.href=sourceUrl(spec);link.target="_blank";link.rel="noopener noreferrer";
   link.textContent="Xem tệp nguồn "+spec.source;
   detail.append(link);
   detail.append(setText(make("span","ui-root-detail-note"),
     "Bạn vừa chọn mẫu để xem cấu trúc. Không gọi hàm nghiệp vụ, không ghi thu tiền, gửi tin hoặc tạo đơn thật."));
 }
 function render():void{
   const q=lower(search.value);
   const family=select.value;
   const filtered=ROOT_BUTTON_SPECS.filter(spec=>
     (origin==="ALL"||spec.origin===origin)&&
     (family==="all"||spec.family===family)&&
     (!q||lower([spec.title,spec.primitive,spec.selector,spec.source,spec.context,
       spec.origin,spec.family,spec.sourceId].join(" ")).includes(q)));
   root.replaceChildren();
   let displayedFamilies=0;
   for(const group of ROOT_BUTTON_FAMILIES){
     const items=filtered.filter(spec=>spec.family===group.id);
     if(!items.length)continue;
     const wrapper=make("details","ui-root-family-group");
     wrapper.dataset.rootFamily=group.id;
     wrapper.open=Boolean(q)||family!=="all"||origin!=="ALL"||displayedFamilies===0;
     const summary=make("summary");
     const titles=make("span","ui-root-family-heading");
     titles.append(setText(make("strong"),group.label));
     titles.append(setText(make("small"),group.description));
     const badge=setText(make("span","ui-root-family-count"),items.length+" mẫu");
     const chevron=document.createElementNS("http://www.w3.org/2000/svg","svg");
     chevron.classList.add("ui-root-family-arrow");
     chevron.setAttribute("viewBox","0 0 24 24");chevron.setAttribute("aria-hidden","true");
     const use=document.createElementNS("http://www.w3.org/2000/svg","use");
     use.setAttribute("href","./web/icons.svg#ui-icon-chevron");chevron.append(use);
     summary.append(titles,badge,chevron);
     const list=make("div","ui-root-family-list");
     for(const spec of items){
       const card=make("div","ui-root-button-item");
       card.dataset.rootItem=spec.id;
       const button=make("button","ui-button ui-button--catalog ui-button--"+spec.variant);
       button.type="button";button.dataset.rootButtonId=spec.id;
       button.dataset.catalogIntent=spec.variant;
       button.setAttribute("aria-pressed",String(spec.id===selectedId));
       appendIcon(button,spec.icon);
       button.append(setText(make("span"),spec.title));
       const meta=make("div","ui-root-button-meta");
       const badge=make("span","ui-root-origin-badge");
       badge.dataset.origin=spec.origin;badge.textContent=spec.origin+" · "+spec.sourceId;
       meta.append(badge,setText(make("span"),spec.primitive));
       const selector=make("code");selector.textContent=spec.selector;meta.append(selector);
       card.append(button,meta);list.append(card);
     }
     wrapper.append(summary,list);root.append(wrapper);displayedFamilies++;
   }
   count.textContent=filtered.length+" / "+ROOT_BUTTON_SPECS.length+
     " nút · "+filtered.filter(x=>x.origin==="CHAT").length+" CHAT · "+
     filtered.filter(x=>x.origin==="TAPHOA").length+" TAPHOA · "+
     displayedFamilies+" họ đang hiển thị";
   empty.hidden=filtered.length>0;
   for(const button of originButtons){
     const active=button.dataset.rootOrigin===origin;
     button.setAttribute("aria-pressed",String(active));
   }
 }
 for(const button of originButtons){
   button.addEventListener("click",()=>{
     const value=button.dataset.rootOrigin;
     if(value!=="ALL"&&value!=="CHAT"&&value!=="TAPHOA")return;
     origin=value;selectedId=null;render();
   });
 }
 search.addEventListener("input",()=>{selectedId=null;render();});
 select.addEventListener("change",()=>{selectedId=null;render();});
 reset.addEventListener("click",()=>{
   origin="ALL";search.value="";select.value="all";selectedId=null;render();search.focus();
 });
 root.addEventListener("click",event=>{
   if(!(event.target instanceof Element))return;
   const button=event.target.closest<HTMLButtonElement>("[data-root-button-id]");
   if(!button)return;
   const spec=ROOT_BUTTON_SPECS.find(x=>x.id===button.dataset.rootButtonId);
   if(!spec)return;
   selectedId=spec.id;
   root.querySelectorAll<HTMLButtonElement>("[data-root-button-id]").forEach(b=>
     b.setAttribute("aria-pressed",String(b===button)));
   renderDetail(spec);
 });
 for(const button of Array.from(document.querySelectorAll<HTMLButtonElement>("[data-root-demo]"))){
   button.addEventListener("click",()=>{
     const kind=button.dataset.rootDemo;
     if(kind==="loading"){
       if(button.dataset.state==="loading")return;
       const icon=button.querySelector<SVGUseElement>("svg use");
       const label=button.querySelector<HTMLElement>("span");
       const original=label?.textContent||"Thử loading";
       const oldIcon=icon?.getAttribute("href")||"";
       button.dataset.state="loading";button.disabled=true;button.setAttribute("aria-busy","true");
       button.closest<HTMLElement>(".ui-root-state-example")?.setAttribute("data-state","loading");
       if(icon)icon.setAttribute("href","./web/icons.svg#ui-icon-loader");
       if(label)label.textContent="Đang tải…";
       stateFeedback.textContent="Đang mô phỏng một thao tác. Không thực hiện API hay giao dịch thật.";
       window.setTimeout(()=>{
         button.disabled=false;button.dataset.state="success";button.removeAttribute("aria-busy");
         button.closest<HTMLElement>(".ui-root-state-example")?.setAttribute("data-state","success");
         if(icon)icon.setAttribute("href","./web/icons.svg#ui-icon-check");
         if(label)label.textContent="Hoàn tất";
         stateFeedback.textContent="Đã kết thúc trạng thái loading giả lập; không xử lý dữ liệu thật.";
         // Users can click again to replay; the original icon is restored on click.
         if(oldIcon)button.dataset.originalIcon=oldIcon;
         button.dataset.originalLabel=original;
       },850);
       return;
     }
     if(kind==="toggle"){
       const on=button.getAttribute("aria-pressed")!=="true";
       button.setAttribute("aria-pressed",String(on));
       stateFeedback.textContent=on?"Trạng thái đang chọn.":"Trạng thái không được chọn.";
       return;
     }
     if(kind==="danger"||kind==="confirm"){
       stateFeedback.textContent=(kind==="danger"?"Nút nguy hiểm":"Nút chờ xác nhận")+
         ": chỉ hiển thị loại nút, không xóa hoặc duyệt gì thật.";
       return;
     }
     stateFeedback.textContent="Đã thử trạng thái "+(kind||"mặc định")+
       ". Đây là mẫu UI, không thực hiện nghiệp vụ.";
   });
 }
 for(const button of Array.from(document.querySelectorAll<HTMLButtonElement>("[data-root-combo-action]"))){
   button.addEventListener("click",()=>{
     const combo=button.closest<HTMLElement>("[data-root-combo]");
     if(!combo)return;
     if(combo.dataset.rootCombo==="debt"&&button.classList.contains("ui-button--segment")){
       for(const peer of Array.from(combo.querySelectorAll<HTMLButtonElement>(".ui-button--segment")))
         peer.setAttribute("aria-pressed",String(peer===button));
     }
     comboFeedback.textContent="Đã chọn bố cục nút “"+(button.dataset.rootComboAction||"")+
       "” trong "+(combo.querySelector("strong")?.textContent||"mẫu")+
       ". Không gửi hoặc cập nhật đơn hàng, công nợ thật.";
   });
 }
 render();
}
