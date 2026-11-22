// 2027 UI Library V05 · Typography and palette design laboratory.
// All design tokens and WCAG calculations come from the shared design module.
import {
  PALETTES,FONTS,DEFAULT_SETTINGS,
  type PaletteKey,type FontKey,type TextStyleKey,type ViewportKey,
  readSavedSettings,saveSettings,clearSavedSettings,
  auditPalette,applyDesignTokens,exportCss
} from "./design.js";

function el<T extends HTMLElement>(id:string):T{
  const node=document.getElementById(id);
  if(!node)throw new Error("Missing UI element "+id);
  return node as T;
}
const canvas=el<HTMLDivElement>("demoCanvas");
const sizeRange=el<HTMLInputElement>("sizeRange");
const leadingRange=el<HTMLInputElement>("leadingRange");
const trackingRange=el<HTMLInputElement>("trackingRange");
const statusEl=el<HTMLElement>("statusText");
const savedEl=el<HTMLElement>("savedStatus");
const styleLabel=el<HTMLElement>("activeStyleLabel");
const sampleText=el<HTMLTextAreaElement>("sampleText");
const state=readSavedSettings();

function setChoice(selector:string,attribute:string,selectedValue:string):void{
  for(const button of Array.from(document.querySelectorAll<HTMLButtonElement>(selector))){
    const selected=button.getAttribute(attribute)===selectedValue;
    button.classList.toggle("selected",selected);
    button.setAttribute("aria-pressed",String(selected));
  }
}
function showStatus(message:string):void{statusEl.textContent=message;}
function onSettingChanged(message:string):void{
  render();
  savedEl.textContent=saveSettings(state)?"Đã lưu trên thiết bị":"Chưa lưu: bộ nhớ bị chặn";
  showStatus(message);
}
function renderContrast():void{
  const palette=PALETTES[state.palette];
  const audits=auditPalette(state.palette);
  const passing=audits.filter(x=>x.passesAA).length;
  el<HTMLElement>("contrastSummary").textContent=passing+"/"+audits.length+" cặp màu đạt tương phản AA";
  el<HTMLElement>("contrastPalette").textContent=palette.label;
  const holder=el<HTMLDivElement>("contrastResults");
  holder.replaceChildren();
  for(const item of audits){
    const card=document.createElement("div");
    card.className="contrast-result";
    card.setAttribute("role","listitem");
    const left=document.createElement("span");
    left.className="contrast-result-name";
    left.textContent=item.label;
    const right=document.createElement("span");
    right.className="contrast-result-score";
    const score=document.createElement("strong");
    score.textContent=item.ratio.toFixed(2)+":1";
    const note=document.createElement("small");
    note.className=item.passesAA?"contrast-pass":"contrast-fail";
    note.textContent=item.passesAA?"Đạt AA":"Chưa đạt";
    right.append(score,note);
    card.append(left,right);
    holder.append(card);
  }
}
function render():void{
  const palette=PALETTES[state.palette];
  const sizes={
    display:Math.round(state.size*2),
    title:Math.round(state.size*1.5),
    caption:Math.max(11,state.size-4)
  };
  applyDesignTokens(canvas,state);
  canvas.style.setProperty("--sample-display",sizes.display+"px");
  canvas.style.setProperty("--sample-title",sizes.title+"px");
  canvas.style.setProperty("--sample-caption",sizes.caption+"px");
  canvas.dataset.viewport=state.viewport;
  el<HTMLElement>("fontSample").style.fontFamily=FONTS[state.font].css;
  el<HTMLElement>("fontSample").style.fontWeight=String(state.weight);
  el<HTMLElement>("fontSample").style.fontStyle=state.textStyle;
  el<HTMLElement>("fontSample").style.letterSpacing=state.tracking.toFixed(2)+"em";
  sizeRange.value=String(state.size);
  leadingRange.value=state.leading.toFixed(2);
  trackingRange.value=state.tracking.toFixed(2);
  el<HTMLOutputElement>("sizeOutput").textContent=state.size+" px";
  el<HTMLOutputElement>("leadingOutput").textContent=state.leading.toFixed(2);
  el<HTMLOutputElement>("trackingOutput").textContent=state.tracking.toFixed(2)+" em";
  el<HTMLOutputElement>("weightOutput").textContent=String(state.weight);
  el<HTMLOutputElement>("styleOutput").textContent=state.textStyle==="italic"?"Nghiêng":"Thường";
  el<HTMLElement>("displaySize").textContent=sizes.display+" px";
  el<HTMLElement>("titleSize").textContent=sizes.title+" px";
  el<HTMLElement>("bodySize").textContent=state.size+" px";
  el<HTMLElement>("captionSize").textContent=sizes.caption+" px";
  styleLabel.textContent=FONTS[state.font].label+" · "+state.size+" px · "+palette.label;
  const colorRoles:[string,string][]=[
    ["Background",palette.background],["Surface",palette.surface],["Ink",palette.ink],
    ["Muted",palette.muted],["Border",palette.border]
  ];
  for(const [key,color] of colorRoles){
    el<HTMLElement>("swatch"+key).style.backgroundColor=color;
    el<HTMLElement>("role"+key).textContent=color.toUpperCase();
  }
  el<HTMLElement>("paletteLabel").textContent=palette.label;
  el<HTMLElement>("cssPreview").textContent=exportCss(state);
  el<HTMLElement>("sampleBodyText").textContent=sampleText.value;
  renderContrast();
  setChoice("[data-palette]","data-palette",state.palette);
  setChoice("[data-font]","data-font",state.font);
  setChoice("[data-weight]","data-weight",String(state.weight));
  setChoice("[data-text-style]","data-text-style",state.textStyle);
  setChoice("[data-viewport]","data-viewport",state.viewport);
}
for(const button of Array.from(document.querySelectorAll<HTMLButtonElement>("[data-palette]"))){
  button.addEventListener("click",()=>{
    const next=button.dataset.palette;
    if(next&&Object.prototype.hasOwnProperty.call(PALETTES,next)){
      state.palette=next as PaletteKey;
      onSettingChanged("Đang xem bảng màu "+PALETTES[state.palette].label+".");
    }
  });
}
for(const button of Array.from(document.querySelectorAll<HTMLButtonElement>("[data-font]"))){
  button.addEventListener("click",()=>{
    const next=button.dataset.font;
    if(next&&Object.prototype.hasOwnProperty.call(FONTS,next)){
      state.font=next as FontKey;
      onSettingChanged("Đã chọn font "+FONTS[state.font].label+".");
    }
  });
}
for(const button of Array.from(document.querySelectorAll<HTMLButtonElement>("[data-weight]"))){
  button.addEventListener("click",()=>{
    const next=Number(button.dataset.weight);
    if([400,500,600,700].includes(next)){state.weight=next;onSettingChanged("Độ đậm nội dung: "+next+".");}
  });
}
for(const button of Array.from(document.querySelectorAll<HTMLButtonElement>("[data-text-style]"))){
  button.addEventListener("click",()=>{
    const next=button.dataset.textStyle;
    if(next==="normal"||next==="italic"){
      state.textStyle=next as TextStyleKey;
      onSettingChanged("Kiểu chữ: "+(next==="italic"?"nghiêng":"thường")+".");
    }
  });
}
for(const button of Array.from(document.querySelectorAll<HTMLButtonElement>("[data-viewport]"))){
  button.addEventListener("click",()=>{
    const next=button.dataset.viewport;
    if(next==="desktop"||next==="mobile"){
      state.viewport=next as ViewportKey;
      onSettingChanged("Đang kiểm tra bản xem trước "+(next==="mobile"?"mobile":"rộng")+".");
    }
  });
}
sizeRange.addEventListener("input",()=>{
  state.size=Math.max(13,Math.min(21,Number(sizeRange.value)||16));
  onSettingChanged("Đã đổi cỡ chữ thành "+state.size+" px.");
});
leadingRange.addEventListener("input",()=>{
  state.leading=Math.max(1.2,Math.min(1.9,Number(leadingRange.value)||1.5));
  onSettingChanged("Giãn dòng "+state.leading.toFixed(2)+".");
});
trackingRange.addEventListener("input",()=>{
  state.tracking=Math.round(Math.max(-0.02,Math.min(0.08,Number(trackingRange.value)||0))*100)/100;
  onSettingChanged("Giãn ký tự "+state.tracking.toFixed(2)+" em.");
});
sampleText.addEventListener("input",()=>{
  el<HTMLElement>("sampleBodyText").textContent=sampleText.value;
  showStatus("Nội dung thử chỉ thay đổi trong bản xem trước.");
});
el<HTMLButtonElement>("resetButton").addEventListener("click",()=>{
  Object.assign(state,DEFAULT_SETTINGS);
  clearSavedSettings();
  sampleText.value="Giao diện tốt giúp người dùng đọc dễ, hiểu nhanh và thao tác chính xác. Sản phẩm 180ml × 12 hộp = 144.000 đ.";
  render();
  savedEl.textContent="Mẫu mặc định";
  showStatus("Đã đặt lại màu nền, font, kiểu chữ và thang chữ.");
});
el<HTMLButtonElement>("copyButton").addEventListener("click",()=>{
  void (async()=>{
    try{
      if(!navigator.clipboard?.writeText)throw new Error("Clipboard unsupported");
      await navigator.clipboard.writeText(exportCss(state));
      showStatus("Đã sao chép CSS chứa các biến giao diện hiện tại.");
    }catch{
      showStatus("Chưa thể sao chép CSS vì trình duyệt không cấp quyền clipboard.");
    }
  })();
});
el<HTMLButtonElement>("sampleButton").addEventListener("click",()=>{
  el<HTMLDivElement>("sampleFeedback").textContent="Đã bấm nút chính trong bản xem trước.";
});
el<HTMLButtonElement>("sampleSecondary").addEventListener("click",()=>{
  el<HTMLDivElement>("sampleFeedback").textContent="Đã bấm nút phụ trong bản xem trước.";
});
el<HTMLInputElement>("sampleInput").addEventListener("input",(event)=>{
  const v=(event.target as HTMLInputElement).value;
  el<HTMLDivElement>("sampleFeedback").textContent=v?"Đang thử chữ trong ô nhập.":"";
});
for(const link of Array.from(document.querySelectorAll<HTMLAnchorElement>(".nav-link"))){
  link.addEventListener("click",()=>{
    if(!link.hash)return;
    document.querySelectorAll(".nav-link").forEach(x=>x.classList.remove("active"));
    link.classList.add("active");
  });
}
render();
savedEl.textContent=localStorageAvailable()?"Lựa chọn lưu trên thiết bị":"Lưu tùy chọn không khả dụng";
function localStorageAvailable():boolean{
  try{const probe="2027-ui-probe";localStorage.setItem(probe,"1");localStorage.removeItem(probe);return true;}
  catch{return false;}
}
