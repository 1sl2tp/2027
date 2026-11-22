// UI-V26: simple, live form-field specimens. No network requests or real messages.
// Input / Textarea / Select source: OpenAI Apps SDK UI (MIT); quantity, money and
// chat-composer is a compound owner under RULE 12; its buttons/icons are primitives.
import { auditComposerTree } from "./component-contracts.js";
type FieldKind=
 "outline"|"soft"|"pill"|"search"|"clear"|"invalid"|"disabled"|
 "textarea"|"money"|"quantity"|"composer"|"select";
interface FieldSample { id:string;label:string;kind:FieldKind;source:string }
const FIELD_SAMPLES:readonly FieldSample[]=[
 {id:"FIELD-01",label:"Ô chữ có viền",kind:"outline",source:"SDK · Input"},
 {id:"FIELD-02",label:"Ô chữ nền nhẹ",kind:"soft",source:"SDK · Input"},
 {id:"FIELD-03",label:"Ô chữ bo tròn",kind:"pill",source:"SDK · Input"},
 {id:"FIELD-04",label:"Tìm kiếm + icon",kind:"search",source:"SDK · Input"},
 {id:"FIELD-05",label:"Có nút xóa nội dung",kind:"clear",source:"SDK · Input"},
 {id:"FIELD-06",label:"Ô nhập báo lỗi",kind:"invalid",source:"SDK · Input"},
 {id:"FIELD-07",label:"Ô nhập bị khóa",kind:"disabled",source:"SDK · Input"},
 {id:"FIELD-08",label:"Ô ghi chú nhiều dòng",kind:"textarea",source:"SDK · Textarea"},
 {id:"FIELD-09",label:"Ô nhập tiền · 12.345 đ",kind:"money",source:"2027 · định dạng số"},
 {id:"FIELD-10",label:"Số lượng − / +",kind:"quantity",source:"2027 · bộ điều khiển"},
 {id:"FIELD-11",label:"Vùng gõ chat · Composer (cha)",kind:"composer",source:"assistant-ui · tham khảo"},
 {id:"FIELD-12",label:"Ô chọn danh mục",kind:"select",source:"SDK · Select"}
];
function textInput(type:string,placeholder:string,aria:string):HTMLInputElement{
 const input=document.createElement("input");
 input.className="simple-field-input";input.type=type;input.placeholder=placeholder;
 input.setAttribute("aria-label",aria);return input;
}
function smallButton(label:string,visual:string):HTMLButtonElement{
 const b=document.createElement("button");b.type="button";
 b.className="simple-field-action";b.setAttribute("aria-label",label);b.textContent=visual;
 return b;
}
function onlyDigits(value:string):string{return value.replace(/\D/g,"");}
function groupMoney(digits:string):string{return digits.replace(/\B(?=(\d{3})+(?!\d))/g,".");}
function previewField(item:FieldSample):HTMLElement{
 const wrap=document.createElement("div");
 wrap.className="simple-field-demo simple-field-demo-"+item.kind;
 const shell=document.createElement("div");shell.className="simple-field-shell";
 const add=(...nodes:Node[])=>{shell.append(...nodes);wrap.append(shell);};
 switch(item.kind){
  case "outline":add(textInput("text","Tên khách hàng","Tên khách hàng mẫu"));break;
  case "soft":shell.classList.add("simple-field-shell-soft");
    add(textInput("text","Nhập ghi chú","Ô nền nhẹ mẫu"));break;
  case "pill":shell.classList.add("simple-field-shell-pill");
    add(textInput("text","Nhập nội dung","Ô bo tròn mẫu"));break;
  case "search":{
    const prefix=document.createElement("span");prefix.className="simple-field-adornment";
    prefix.textContent="⌕";prefix.setAttribute("aria-hidden","true");
    add(prefix,textInput("search","Tìm sản phẩm…","Tìm kiếm sản phẩm mẫu"));break;
  }
  case "clear":{
    const input=textInput("text","Nhập nội dung","Ô nhập có nút xóa mẫu");
    input.value="Đơn hàng mẫu";
    const clear=smallButton("Xóa nội dung mẫu","×");clear.addEventListener("click",()=>{input.value="";input.focus();});
    add(input,clear);break;
  }
  case "invalid":{
    shell.classList.add("simple-field-shell-invalid");
    const input=textInput("text","Nhập mã hợp lệ","Mã thử lỗi");input.value="12?";
    input.setAttribute("aria-invalid","true");add(input);
    const error=document.createElement("div");error.className="simple-field-error";
    error.textContent="Mã chưa hợp lệ";wrap.append(error);break;
  }
  case "disabled":{
    const input=textInput("text","Không thể nhập","Ô nhập đang khóa");
    input.value="Không thể chỉnh sửa";input.disabled=true;
    shell.classList.add("simple-field-shell-disabled");add(input);break;
  }
  case "textarea":{
    const area=document.createElement("textarea");area.className="simple-field-input simple-field-area";
    area.rows=2;area.placeholder="Ghi chú đơn hàng…";area.setAttribute("aria-label","Ghi chú nhiều dòng mẫu");
    area.addEventListener("input",()=>{area.style.height="auto";area.style.height=Math.min(area.scrollHeight,132)+"px";});
    add(area);break;
  }
  case "money":{
    const input=textInput("text","0","Số tiền mẫu");input.inputMode="numeric";
    input.classList.add("simple-field-money-input");input.value="12.345";input.dataset.raw="12345";
    const unit=document.createElement("span");unit.className="simple-field-unit";unit.textContent="đ";
    input.addEventListener("input",()=>{
      const start=input.selectionStart??input.value.length;
      const count=onlyDigits(input.value.slice(0,start)).length;
      const digits=onlyDigits(input.value).replace(/^0+(?=\d)/,"");
      input.dataset.raw=digits;const formatted=groupMoney(digits);input.value=formatted;
      let at=0,seen=0;while(at<formatted.length&&seen<count){if(/\d/.test(formatted[at]))seen++;at++;}
      input.setSelectionRange(at,at);
    });add(input,unit);break;
  }
  case "quantity":{
    const minus=smallButton("Giảm số lượng","−");
    const number=textInput("text","","Số lượng mẫu");number.inputMode="numeric";
    number.classList.add("simple-field-quantity-input");number.value="12";
    const plus=smallButton("Tăng số lượng","+");
    const sanitize=()=>{const digits=onlyDigits(number.value);number.value=digits?String(Math.min(999999,Number(digits))):"0";};
    number.addEventListener("input",sanitize);
    minus.addEventListener("click",()=>{sanitize();number.value=String(Math.max(0,Number(number.value)-1));});
    plus.addEventListener("click",()=>{sanitize();number.value=String(Math.min(999999,Number(number.value)+1));});
    add(minus,number,plus);break;
  }
  case "composer":{
    // COMPOSER is not a single input or a button. It is the compound parent.
    const form=document.createElement("form");
    form.className="ds-composer composer-contract";
    form.dataset.uiComponent="CHAT-COMPOSER";
    form.dataset.uiLayer="composition";
    form.setAttribute("aria-label","Vùng soạn chat mẫu");
    form.noValidate=true;

    const area=document.createElement("textarea");
    area.rows=1;area.placeholder="Nhắn tin…";
    area.setAttribute("aria-label","Nội dung chat mẫu");
    area.dataset.uiComponent="COMPOSER-INPUT";
    area.dataset.uiLayer="primitive";

    const toolbar=document.createElement("div");
    toolbar.className="ds-composer-actions composer-contract-toolbar";
    toolbar.dataset.uiComponent="COMPOSER-TOOLBAR";
    toolbar.dataset.uiLayer="composition";
    toolbar.setAttribute("role","group");
    toolbar.setAttribute("aria-label","Hành động soạn tin");

    const button=(component:string,label:string,icon:string,variant:"icon"|"send",type:"button"|"submit")=>{
      const element=document.createElement("button");
      element.type=type;
      element.dataset.uiComponent=component;
      element.dataset.uiLayer="primitive";
      element.className=variant==="icon"?"ui-button ui-button--icon":"ui-button ui-button--send";
      element.setAttribute("aria-label",label);
      const container=variant==="send"?document.createElement("span"):element;
      if(variant==="send")container.className="ui-send-disc";
      const svg=document.createElementNS("http://www.w3.org/2000/svg","svg");
      svg.classList.add("ui-icon");
      if(variant==="send")svg.classList.add("ui-icon--send");
      else svg.classList.add(icon==="plus"?"ui-icon--plus":"ui-icon--mic");
      svg.setAttribute("aria-hidden","true");
      const use=document.createElementNS("http://www.w3.org/2000/svg","use");
      use.setAttribute("href","./web/icons.svg#ui-icon-"+icon);
      svg.append(use);container.append(svg);
      if(variant==="send")element.append(container);
      return element;
    };
    const attach=button("COMPOSER-ATTACH-BUTTON","Thêm ảnh minh họa","plus","icon","button");
    const mic=button("COMPOSER-MIC-BUTTON","Thử trạng thái mic","mic","icon","button");
    const send=button("COMPOSER-SEND-BUTTON","Gửi bản mẫu","send-up","send","submit");
    mic.setAttribute("aria-pressed","false");
    toolbar.append(attach,mic,send);
    form.append(area,toolbar);
    const status=document.createElement("div");
    status.className="simple-field-demo-status";
    status.setAttribute("role","status");status.setAttribute("aria-live","polite");
    const grow=()=>{
      area.style.height="auto";
      area.style.height=Math.max(43,Math.min(area.scrollHeight,136))+"px";
      area.style.overflowY=area.scrollHeight>136?"auto":"hidden";
      send.disabled=area.value.trim().length===0;
    };
    area.addEventListener("input",grow);
    attach.addEventListener("click",()=>{status.textContent="Nút thêm ảnh là con của Toolbar; bản mẫu không tải tệp.";});
    mic.addEventListener("click",()=>{
      const next=mic.getAttribute("aria-pressed")!=="true";
      mic.setAttribute("aria-pressed",String(next));
      status.textContent=next?"Đang thử trạng thái mic, không truy cập microphone.":"Đã tắt trạng thái mic.";
    });
    form.addEventListener("submit",event=>{
      event.preventDefault();
      const message=area.value.trim();
      if(!message){status.textContent="Nhập nội dung để thử.";return;}
      status.textContent="Đã thử: "+message.slice(0,100)+" · không gửi thật.";
      area.value="";grow();area.focus();
    });
    const hint=document.createElement("small");
    hint.className="simple-field-parent-map";
    hint.textContent="Cha: Composer → con: Textarea + Toolbar → Button → Icon.";
    wrap.append(form,hint,status);
    const errors=auditComposerTree(form);
    if(errors.length)status.textContent="Cấu trúc chưa hợp lệ: "+errors.join("; ");
    grow();
    break;
  }
  case "select":{
    const select=document.createElement("select");select.className="simple-field-input";
    select.setAttribute("aria-label","Chọn nhóm sản phẩm mẫu");
    for(const text of ["Nhóm sữa","Bánh kẹo","Gia vị"]){
      const option=document.createElement("option");option.textContent=text;option.value=text;select.append(option);
    }add(select);break;
  }
 }
 return wrap;
}
export function initSimpleFields():void{
 const list=document.getElementById("simpleFieldsItems");
 const chosen=document.getElementById("simpleFieldsChosen");
 if(!list||!chosen)return;
 let picked:string|null=null;
 for(const [i,item] of FIELD_SAMPLES.entries()){
  const row=document.createElement("div");row.className="simple-field-row";row.dataset.sampleId=item.id;
  row.setAttribute("role","group");row.setAttribute("aria-label",item.label);
  const num=document.createElement("span");num.className="simple-font-number";
  num.textContent=String(i+1).padStart(2,"0");
  const content=document.createElement("div");content.className="simple-field-content";
  const title=document.createElement("strong");title.className="simple-field-title";title.textContent=item.label;
  const preview=previewField(item);
  const source=document.createElement("span");source.className="simple-font-meta";
  source.textContent=item.source;
  content.append(title,preview,source);
  const pick=smallButton("Chọn "+item.label,"✓");pick.className="simple-field-pick";
  pick.setAttribute("aria-pressed","false");pick.dataset.sampleId=item.id;
  row.append(num,content,pick);list.append(row);
 }
 const select=(id:string)=>{
  const item=FIELD_SAMPLES.find(x=>x.id===id);if(!item)return;
  picked=id;
  for(const button of Array.from(list.querySelectorAll<HTMLButtonElement>(".simple-field-pick"))){
   button.setAttribute("aria-pressed",String(button.dataset.sampleId===picked));
  }
  chosen.textContent="Đã chọn: "+item.label;chosen.hidden=false;
 };
 list.addEventListener("click",event=>{
  if(!(event.target instanceof Element))return;
  const pick=event.target.closest<HTMLButtonElement>(".simple-field-pick");
  if(pick){select(pick.dataset.sampleId||"");return;}
  if(event.target.closest("input,textarea,select,button"))return;
  const row=event.target.closest<HTMLElement>(".simple-field-row");
  if(row)select(row.dataset.sampleId||"");
 });
}
