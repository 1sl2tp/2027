// 2027 UI Library · V03
// A standalone, local-only visual laboratory. No backend, messaging or production data.
type PaletteKey = "white" | "warm" | "mist" | "dark";
type FontKey = "system" | "arial" | "serif" | "mono";
type ViewportKey = "desktop" | "mobile";
interface Palette { label:string; bg:string; surface:string; ink:string; muted:string; line:string; }
interface DesignState { palette:PaletteKey; font:FontKey; size:number; leading:number; weight:number; viewport:ViewportKey; }

const palettes:Record<PaletteKey,Palette> = {
  white: {label:"Trắng tinh",bg:"#FFFFFF",surface:"#F7F7F8",ink:"#171717",muted:"#727272",line:"#E5E5E5"},
  warm: {label:"Trắng ấm",bg:"#FAF9F6",surface:"#F1EFEA",ink:"#25231F",muted:"#706D67",line:"#E4E1DB"},
  mist: {label:"Xám dịu",bg:"#F3F4F6",surface:"#FFFFFF",ink:"#202127",muted:"#676B73",line:"#DADDE2"},
  dark: {label:"Đen than",bg:"#181818",surface:"#292929",ink:"#F5F5F5",muted:"#BABABA",line:"#424242"}
};
const fonts:Record<FontKey,{label:string;css:string}> = {
  system:{label:"System UI",css:'-apple-system,BlinkMacSystemFont,"Segoe UI",Arial,sans-serif'},
  arial:{label:"Arial",css:"Arial,Helvetica,sans-serif"},
  serif:{label:"Georgia",css:"Georgia,'Times New Roman',serif"},
  mono:{label:"Mono",css:"ui-monospace,SFMono-Regular,Consolas,monospace"}
};
const defaults:DesignState = {palette:"white",font:"system",size:16,leading:1.5,weight:400,viewport:"desktop"};
const state:DesignState = {...defaults};

function el<T extends HTMLElement>(id:string):T {
  const target=document.getElementById(id);
  if(!target) throw new Error("Missing element: "+id);
  return target as T;
}
const canvas=el<HTMLDivElement>("demoCanvas");
const sizeRange=el<HTMLInputElement>("sizeRange");
const leadingRange=el<HTMLInputElement>("leadingRange");
const status=el<HTMLSpanElement>("statusText");
const styleLabel=el<HTMLSpanElement>("activeStyleLabel");

function setChoice(selector:string,active:string,attribute:string):void {
  for(const item of document.querySelectorAll<HTMLButtonElement>(selector)){
    const selected=item.getAttribute(attribute)===active;
    item.classList.toggle("selected",selected);
    item.setAttribute("aria-pressed",String(selected));
  }
}
function showStatus(message:string):void {status.textContent=message;}
function render():void {
  const p=palettes[state.palette];
  const sizes={display:Math.round(state.size*2),title:Math.round(state.size*1.5),caption:Math.max(11,state.size-4)};
  canvas.style.setProperty("--sample-bg",p.bg);
  canvas.style.setProperty("--sample-surface",p.surface);
  canvas.style.setProperty("--sample-ink",p.ink);
  canvas.style.setProperty("--sample-muted",p.muted);
  canvas.style.setProperty("--sample-line",p.line);
  canvas.style.setProperty("--sample-font",fonts[state.font].css);
  canvas.style.setProperty("--sample-base",state.size+"px");
  canvas.style.setProperty("--sample-leading",state.leading.toFixed(2));
  canvas.style.setProperty("--sample-weight",String(state.weight));
  canvas.style.setProperty("--sample-display",sizes.display+"px");
  canvas.style.setProperty("--sample-title",sizes.title+"px");
  canvas.style.setProperty("--sample-caption",sizes.caption+"px");
  canvas.dataset.viewport=state.viewport;
  el<HTMLOutputElement>("sizeOutput").textContent=state.size+" px";
  el<HTMLOutputElement>("leadingOutput").textContent=state.leading.toFixed(2);
  el<HTMLOutputElement>("weightOutput").textContent=String(state.weight);
  el<HTMLSpanElement>("displaySize").textContent=sizes.display+" px";
  el<HTMLSpanElement>("titleSize").textContent=sizes.title+" px";
  el<HTMLSpanElement>("bodySize").textContent=state.size+" px";
  el<HTMLSpanElement>("captionSize").textContent=sizes.caption+" px";
  sizeRange.value=String(state.size);
  leadingRange.value=String(state.leading);
  styleLabel.textContent=fonts[state.font].label+" · "+state.size+" px · "+p.label;
  setChoice("[data-palette]",state.palette,"data-palette");
  setChoice("[data-font]",state.font,"data-font");
  setChoice("[data-weight]",String(state.weight),"data-weight");
  setChoice("[data-viewport]",state.viewport,"data-viewport");
}
function pickPalette(value:string):void {
  if(Object.prototype.hasOwnProperty.call(palettes,value)){
    state.palette=value as PaletteKey;render();showStatus("Nền xem trước: "+palettes[state.palette].label+".");
  }
}
function pickFont(value:string):void {
  if(Object.prototype.hasOwnProperty.call(fonts,value)){
    state.font=value as FontKey;render();showStatus("Font xem trước: "+fonts[state.font].label+".");
  }
}
for(const button of document.querySelectorAll<HTMLButtonElement>("[data-palette]")){
  button.addEventListener("click",()=>pickPalette(button.dataset.palette||""));
}
for(const button of document.querySelectorAll<HTMLButtonElement>("[data-font]")){
  button.addEventListener("click",()=>pickFont(button.dataset.font||""));
}
for(const button of document.querySelectorAll<HTMLButtonElement>("[data-weight]")){
  button.addEventListener("click",()=>{
    const value=Number(button.dataset.weight);
    if([400,500,600,700].includes(value)){state.weight=value;render();showStatus("Độ đậm: "+value+".");}
  });
}
for(const button of document.querySelectorAll<HTMLButtonElement>("[data-viewport]")){
  button.addEventListener("click",()=>{
    if(button.dataset.viewport==="mobile"||button.dataset.viewport==="desktop"){
      state.viewport=button.dataset.viewport;render();
      showStatus("Đang xem giao diện "+(state.viewport==="mobile"?"mobile":"rộng")+".");
    }
  });
}
sizeRange.addEventListener("input",()=>{
  state.size=Math.max(13,Math.min(21,Number(sizeRange.value)||16));render();
});
leadingRange.addEventListener("input",()=>{
  state.leading=Math.max(1.2,Math.min(1.9,Number(leadingRange.value)||1.5));render();
});
el<HTMLButtonElement>("resetButton").addEventListener("click",()=>{
  Object.assign(state,defaults);render();showStatus("Đã khôi phục bộ mẫu ban đầu.");
});
function cssText():string {
  const p=palettes[state.palette];
  return `:root {
  --ui-font: ${fonts[state.font].css};
  --ui-font-size: ${state.size}px;
  --ui-line-height: ${state.leading.toFixed(2)};
  --ui-font-weight: ${state.weight};
  --ui-background: ${p.bg};
  --ui-surface: ${p.surface};
  --ui-text: ${p.ink};
  --ui-text-muted: ${p.muted};
  --ui-border: ${p.line};
}`;
}
el<HTMLButtonElement>("copyButton").addEventListener("click",()=>{
  void (async()=>{
    try {
      if(!navigator.clipboard?.writeText) throw new Error("Clipboard unavailable");
      await navigator.clipboard.writeText(cssText());
      showStatus("Đã sao chép các biến CSS của mẫu hiện tại.");
    }catch{showStatus("Trình duyệt không cho phép sao chép. Hãy thử ở trang HTTPS.");}
  })();
});
el<HTMLButtonElement>("sampleButton").addEventListener("click",()=>{
  el<HTMLDivElement>("sampleFeedback").textContent="Nút chính đã được bấm trong bản xem trước.";
});
el<HTMLButtonElement>("sampleSecondary").addEventListener("click",()=>{
  el<HTMLDivElement>("sampleFeedback").textContent="Nút phụ đã được bấm trong bản xem trước.";
});
el<HTMLInputElement>("sampleInput").addEventListener("input",(event)=>{
  const target=event.target as HTMLInputElement;
  el<HTMLDivElement>("sampleFeedback").textContent=target.value?"Đang thử kiểu chữ trong ô nhập.":"";
});
for(const link of document.querySelectorAll<HTMLAnchorElement>(".nav-link")){
  link.addEventListener("click",()=>{
    document.querySelectorAll(".nav-link").forEach(a=>a.classList.remove("active"));
    link.classList.add("active");
  });
}
render();
