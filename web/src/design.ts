// 2027 UI-V05 — Shared, pure design tokens for the UI Library.
// This module is the source for typography, surfaces and contrast calculation.
// It does not send data, request files, or contact a backend.
export type PaletteKey = "white" | "warm" | "mist" | "dark";
export type FontKey = "system" | "arial" | "serif" | "mono";
export type ViewportKey = "desktop" | "mobile";
export type TextStyleKey = "normal" | "italic";

export interface Palette {
  label:string;
  background:string; surface:string; ink:string; muted:string; border:string;
}
export interface FontSpec { label:string; css:string; }
export interface DesignSettings {
  palette:PaletteKey; font:FontKey; size:number; leading:number; weight:number;
  textStyle:TextStyleKey; tracking:number; viewport:ViewportKey;
}
export const STORAGE_KEY="2027-ui-library-design-v05";
export const PALETTES:Record<PaletteKey,Palette>={
  white:{label:"Trắng tinh",background:"#FFFFFF",surface:"#F7F7F8",ink:"#171717",muted:"#646464",border:"#E0E0E0"},
  warm:{label:"Trắng ấm",background:"#FAF9F6",surface:"#F2F0EB",ink:"#24211D",muted:"#625F59",border:"#DAD7D1"},
  mist:{label:"Xám dịu",background:"#F3F4F6",surface:"#FFFFFF",ink:"#202127",muted:"#5E636D",border:"#D6D9DF"},
  dark:{label:"Đen than",background:"#181818",surface:"#252525",ink:"#F5F5F5",muted:"#B9B9B9",border:"#414141"}
};
export const FONTS:Record<FontKey,FontSpec>={
  system:{label:"System UI",css:'-apple-system,BlinkMacSystemFont,"Segoe UI",Arial,sans-serif'},
  arial:{label:"Arial",css:"Arial,Helvetica,sans-serif"},
  serif:{label:"Georgia",css:"Georgia,'Times New Roman',serif"},
  mono:{label:"Mono",css:"ui-monospace,SFMono-Regular,Consolas,monospace"}
};
export const DEFAULT_SETTINGS:DesignSettings={
  palette:"white",font:"system",size:16,leading:1.50,weight:400,
  textStyle:"normal",tracking:0,viewport:"desktop"
};
export function isPaletteKey(x:unknown):x is PaletteKey{return typeof x==="string" && Object.hasOwn(PALETTES,x);}
export function isFontKey(x:unknown):x is FontKey{return typeof x==="string" && Object.hasOwn(FONTS,x);}
export function normalizeSettings(raw:unknown):DesignSettings{
  if(!raw || typeof raw!=="object")return {...DEFAULT_SETTINGS};
  const v=raw as Partial<DesignSettings>;
  const bounded=(value:unknown,min:number,max:number,fallback:number):number=>
    typeof value==="number"&&Number.isFinite(value)?Math.max(min,Math.min(max,value)):fallback;
  const weight=[400,500,600,700].includes(v.weight as number)?v.weight as number:400;
  const tracking=Math.round(bounded(v.tracking,-0.02,0.08,0)*100)/100;
  const leading=Math.round(bounded(v.leading,1.2,1.9,1.5)*100)/100;
  return {
    palette:isPaletteKey(v.palette)?v.palette:DEFAULT_SETTINGS.palette,
    font:isFontKey(v.font)?v.font:DEFAULT_SETTINGS.font,
    size:Math.round(bounded(v.size,13,21,16)),
    leading,weight,tracking,
    textStyle:v.textStyle==="italic"?"italic":"normal",
    viewport:v.viewport==="mobile"?"mobile":"desktop"
  };
}
export function luminance(hex:string):number{
  if(!/^#[0-9a-fA-F]{6}$/.test(hex))throw new Error("Expected six-digit hexadecimal color");
  const channels=[1,3,5].map(i=>{
    const c=parseInt(hex.slice(i,i+2),16)/255;
    return c<=0.04045?c/12.92:Math.pow((c+0.055)/1.055,2.4);
  });
  return channels[0]*0.2126+channels[1]*0.7152+channels[2]*0.0722;
}
export function contrastRatio(first:string,second:string):number{
  const a=luminance(first),b=luminance(second);
  return (Math.max(a,b)+0.05)/(Math.min(a,b)+0.05);
}
export interface ContrastItem { key:string;label:string;ratio:number;passesAA:boolean; }
export function auditPalette(key:PaletteKey):ContrastItem[]{
  const p=PALETTES[key];
  const checks:[string,string,string,string][]=[
    ["main","Chữ chính / nền",p.ink,p.background],
    ["muted","Chữ phụ / nền",p.muted,p.background],
    ["surface","Chữ phụ / thẻ",p.muted,p.surface],
    ["button","Chữ trên nút chính",p.background,p.ink]
  ];
  return checks.map(([id,label,fg,bg])=>{
    const ratio=contrastRatio(fg,bg);
    return {key:id,label,ratio,passesAA:ratio>=4.5};
  });
}
export function cssVariables(settings:DesignSettings):Record<string,string>{
  const s=normalizeSettings(settings),p=PALETTES[s.palette];
  return {
    "--ui-font":FONTS[s.font].css,
    "--ui-font-size":s.size+"px",
    "--ui-line-height":s.leading.toFixed(2),
    "--ui-font-weight":String(s.weight),
    "--ui-font-style":s.textStyle,
    "--ui-letter-spacing":s.tracking.toFixed(2)+"em",
    "--ui-bg":p.background,
    "--ui-surface":p.surface,
    "--ui-text":p.ink,
    "--ui-text-muted":p.muted,
    "--ui-border":p.border
  };
}
export function exportCss(settings:DesignSettings):string {
  const vars=cssVariables(settings);
  return ":root {\n"+Object.entries(vars).map(([key,value])=>"  "+key+": "+value+";").join("\n")+"\n}";
}
export function applyDesignTokens(target:HTMLElement,settings:DesignSettings):void{
  for(const [key,value] of Object.entries(cssVariables(settings)))target.style.setProperty(key,value);
}
export function readSavedSettings():DesignSettings {
  try{return normalizeSettings(JSON.parse(localStorage.getItem(STORAGE_KEY)||"null"));}
  catch{return {...DEFAULT_SETTINGS};}
}
export function saveSettings(settings:DesignSettings):boolean{
  try{localStorage.setItem(STORAGE_KEY,JSON.stringify(normalizeSettings(settings)));return true;}
  catch{return false;}
}
export function clearSavedSettings():void {
  try{localStorage.removeItem(STORAGE_KEY);}catch{/* storage can be blocked */}
}
