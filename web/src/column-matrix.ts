// UI-V34 · RULE 09: one schema, table and compact-card projections.
// Geometry belongs to the canonical ds-table modifier; never align by column index.
export type ColumnRole="index"|"text"|"number"|"quantity"|"money"|"status"|"note";
interface SampleRow{
 index:number;name:string;number:number;quantity:number;price:number;
 total:number;status:string;note:string;
}
export interface ColumnSpec{
 key:keyof SampleRow;label:string;role:ColumnRole;
 priority:"primary"|"secondary";minPx:number;
}
export const COLUMN_SCHEMA:readonly ColumnSpec[]=[
 {key:"index",label:"STT",role:"index",priority:"secondary",minPx:52},
 {key:"name",label:"Tên hàng",role:"text",priority:"primary",minPx:186},
 {key:"number",label:"Số",role:"number",priority:"secondary",minPx:70},
 {key:"quantity",label:"Số lượng",role:"quantity",priority:"secondary",minPx:88},
 {key:"price",label:"Đơn giá",role:"money",priority:"secondary",minPx:128},
 {key:"total",label:"Thành tiền",role:"money",priority:"secondary",minPx:140},
 {key:"status",label:"Trạng thái",role:"status",priority:"secondary",minPx:114},
 {key:"note",label:"Ghi chú",role:"note",priority:"secondary",minPx:210}
];
const SAMPLE_ROWS:readonly SampleRow[]=[
 {index:1,name:"Sữa hộp 180 ml",number:101,quantity:12,price:12000,total:144000,status:"Đã giao",note:"Đã đối chiếu đủ hàng"},
 {index:2,name:"Bánh quy bơ",number:205,quantity:3,price:26000,total:78000,status:"Đơn tạm",note:"Giao sau"},
 {index:3,name:"Gạo loại 1 kg - tên hàng dài để thử xuống dòng",number:307,quantity:5,price:32000,total:160000,status:"Cần kiểm",note:"Tên dài và nội dung ghi chú dài không được làm lệch trục cột số tiền"},
 {index:4,name:"Nước khoáng",number:408,quantity:24,price:7000,total:168000,status:"Đã giao",note:"Thử số nguyên lớn"}
];
type TableMode="auto"|"scroll"|"cards";
type PreviewWidth="mobile"|"desktop";
type BorderMode="grid"|"rows"|"plain";
type Density="compact"|"standard"|"comfortable";
interface TableState{
 count:number;mode:TableMode;width:PreviewWidth;
 borders:BorderMode;density:Density;
 sortKey:keyof SampleRow|null;descending:boolean;
}
const amount=new Intl.NumberFormat("vi-VN",{maximumFractionDigits:0});
const number=new Intl.NumberFormat("vi-VN");
function node<K extends keyof HTMLElementTagNameMap>(tag:K,className="",value=""):HTMLElementTagNameMap[K]{
 const el=document.createElement(tag);
 if(className)el.className=className;
 el.textContent=value;
 return el;
}
function displayValue(row:SampleRow,col:ColumnSpec):string{
 const value=row[col.key];
 if(col.role==="money")return amount.format(value as number)+" đ";
 if(typeof value==="number")return number.format(value);
 return String(value);
}
function sortedRows(rows:readonly SampleRow[],state:TableState):SampleRow[]{
 const items=rows.slice();
 if(!state.sortKey)return items;
 const key=state.sortKey;
 items.sort((a,b)=>{
  const left=a[key],right=b[key];
  const delta=typeof left==="number"&&typeof right==="number"
   ?left-right:String(left).localeCompare(String(right),"vi",{numeric:true,sensitivity:"base"});
  return state.descending?-delta:delta;
 });
 return items;
}
function buildTable(columns:readonly ColumnSpec[],rows:readonly SampleRow[],state:TableState,refresh:()=>void):HTMLTableElement{
 const table=node("table","ds-table ds-table--schema");
 table.dataset.colCount=String(columns.length);
 table.dataset.wide=String(columns.length>=6);
 table.dataset.borders=state.borders;
 table.dataset.density=state.density;
 // One track definition per column: header and every value share exactly the same axis.
 const minWidth=columns.reduce((total,col)=>total+col.minPx,0);
 table.style.minWidth=minWidth+"px";
 const group=node("colgroup");
 for(const col of columns){
  const track=node("col");
  track.dataset.colRole=col.role;
  track.style.width=(100*col.minPx/minWidth).toFixed(4)+"%";
  group.append(track);
 }
 table.append(group);
 table.append(node("caption","ui-column-caption","Bảng mẫu "+columns.length+" cột; số là mã/số hàng, số lượng là số đơn vị"));
 const thead=node("thead"),headRow=node("tr");
 for(const col of columns){
  const th=node("th");th.scope="col";
  th.dataset.colRole=col.role;th.dataset.priority=col.priority;
  const active=state.sortKey===col.key;
  th.setAttribute("aria-sort",!active?"none":state.descending?"descending":"ascending");
  const button=node("button","ui-button ui-button--quiet ui-column-sort",col.label);
  button.type="button";
  const icon=document.createElementNS("http://www.w3.org/2000/svg","svg");
  icon.classList.add("ui-icon","ui-icon--chevron","ui-column-sort-icon");
  icon.setAttribute("aria-hidden","true");
  const use=document.createElementNS("http://www.w3.org/2000/svg","use");
  use.setAttribute("href","./web/icons.svg#ui-icon-chevron");
  icon.append(use);button.append(icon);
  button.setAttribute("aria-label","Sắp xếp theo "+col.label);
  button.addEventListener("click",()=>{
   if(state.sortKey!==col.key){state.sortKey=col.key;state.descending=false;}
   else if(!state.descending)state.descending=true;
   else state.sortKey=null;
   refresh();
  });
  th.append(button);headRow.append(th);
 }
 thead.append(headRow);table.append(thead);
 const tbody=node("tbody");
 for(const row of rows){
  const tr=node("tr");
  for(const col of columns){
   const cell=node("td","",displayValue(row,col));
   cell.dataset.colRole=col.role;cell.dataset.priority=col.priority;
   tr.append(cell);
  }
  tbody.append(tr);
 }
 table.append(tbody);
 return table;
}
function buildCards(columns:readonly ColumnSpec[],rows:readonly SampleRow[]):HTMLElement{
 const list=node("div","ui-column-cards");
 list.setAttribute("role","list");
 const primary=columns.find(col=>col.priority==="primary")||columns[0];
 for(const row of rows){
  const card=node("article","ui-column-card");card.setAttribute("role","listitem");
  const title=node("h4","",displayValue(row,primary));card.append(title);
  const dl=node("dl");
  for(const col of columns){
   if(col.key===primary.key)continue;
   const label=node("dt","",col.label);
   const value=node("dd","",displayValue(row,col));value.dataset.colRole=col.role;
   dl.append(label,value);
  }
  if(columns.length>1)card.append(dl);
  list.append(card);
 }
 return list;
}
function matches<T extends string>(value:string,options:readonly T[]):value is T{
 return options.some(option=>option===value);
}
export function initColumnMatrix():void{
 const root=document.getElementById("columnMatrix");
 const preview=document.getElementById("columnMatrixPreview");
 const notice=document.getElementById("columnMatrixStatus");
 const count=document.getElementById("columnMatrixCount") as HTMLSelectElement|null;
 const mode=document.getElementById("columnMatrixMode") as HTMLSelectElement|null;
 const width=document.getElementById("columnMatrixWidth") as HTMLSelectElement|null;
 const borders=document.getElementById("columnMatrixBorders") as HTMLSelectElement|null;
 const density=document.getElementById("columnMatrixDensity") as HTMLSelectElement|null;
 const copy=document.getElementById("columnMatrixCopy") as HTMLButtonElement|null;
 if(!root||!preview||!notice||!count||!mode||!width||!borders||!density||!copy)return;
 const state:TableState={count:6,mode:"scroll",width:"mobile",borders:"grid",
  density:"standard",sortKey:null,descending:false};
 let currentTable:HTMLTableElement|null=null;
 const render=()=>{
  const columns=COLUMN_SCHEMA.slice(0,state.count);
  const rows=sortedRows(SAMPLE_ROWS,state);
  preview.replaceChildren();
  preview.dataset.width=state.width;
  preview.dataset.mode=state.mode;
  preview.dataset.many=String(state.count>=4);
  const projection=node("div","ui-column-projection");
  projection.dataset.mode=state.mode;projection.dataset.many=String(state.count>=4);
  const scroll=node("div","ds-table-scroll ui-column-table-zone");
  scroll.tabIndex=0;scroll.setAttribute("role","region");
  scroll.setAttribute("aria-label","Bảng "+state.count+" cột, cuộn ngang để đọc các cột");
  currentTable=buildTable(columns,rows,state,render);scroll.append(currentTable);
  const cards=node("div","ui-column-card-zone");
  cards.append(buildCards(columns,rows));
  projection.append(scroll,cards);preview.append(projection);
  const totalWidth=columns.reduce((sum,col)=>sum+col.minPx,0);
  notice.textContent=state.count+" cột · "+(state.width==="mobile"?"360px mobile":"khung rộng")+
   " · tối thiểu "+totalWidth+"px · "+(state.mode==="scroll"?"bảng cuộn ngang":state.mode==="cards"?"thẻ nhãn cột":"tự theo độ rộng")+
   " · padding "+(state.density==="compact"?"6":state.density==="standard"?"10":"14")+"px mỗi bên.";
 };
 for(let i=1;i<=COLUMN_SCHEMA.length;i++){
  const option=node("option","",i+" cột");option.value=String(i);count.append(option);
 }
 count.value=String(state.count);mode.value=state.mode;width.value=state.width;
 borders.value=state.borders;density.value=state.density;
 count.addEventListener("change",()=>{
  const n=Number(count.value);
  if(!Number.isInteger(n)||n<1||n>COLUMN_SCHEMA.length)return;
  state.count=n;state.sortKey=null;render();
 });
 mode.addEventListener("change",()=>{if(matches(mode.value,["auto","scroll","cards"] as const)){
  state.mode=mode.value;render();
 }});
 width.addEventListener("change",()=>{if(matches(width.value,["mobile","desktop"] as const)){
  state.width=width.value;render();
 }});
 borders.addEventListener("change",()=>{if(matches(borders.value,["grid","rows","plain"] as const)){
  state.borders=borders.value;render();
 }});
 density.addEventListener("change",()=>{if(matches(density.value,["compact","standard","comfortable"] as const)){
  state.density=density.value;render();
 }});
 copy.addEventListener("click",async()=>{
  if(!currentTable)return;
  try{
   await navigator.clipboard.writeText(currentTable.outerHTML);
   notice.textContent="Đã sao chép HTML của bảng mẫu. Chưa tích hợp xử lý nghiệp vụ.";
  }catch{notice.textContent="Trình duyệt chưa cấp quyền sao chép. Bảng vẫn hiển thị để xem trực tiếp.";}
 });
 render();
}
