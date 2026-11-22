// UI-V33 · Variable-column table gallery. One schema/row source, two responsive projections.
// This is a consumer of the existing ds-table primitive (RULE 08/09), not a new table framework.
export type ColumnRole="text"|"quantity"|"money"|"date"|"status"|"note";
export interface ColumnSpec{
 key:keyof SampleRow;label:string;role:ColumnRole;priority:"primary"|"secondary";
}
interface SampleRow{
 name:string;quantity:number;price:number;total:number;
 status:string;date:string;group:string;note:string;
}
export const COLUMN_SCHEMA:readonly ColumnSpec[]=[
 {key:"name",label:"Tên hàng",role:"text",priority:"primary"},
 {key:"quantity",label:"SL",role:"quantity",priority:"secondary"},
 {key:"price",label:"Đơn giá",role:"money",priority:"secondary"},
 {key:"total",label:"Thành tiền",role:"money",priority:"secondary"},
 {key:"status",label:"Trạng thái",role:"status",priority:"secondary"},
 {key:"date",label:"Ngày",role:"date",priority:"secondary"},
 {key:"group",label:"Nhóm",role:"text",priority:"secondary"},
 {key:"note",label:"Ghi chú",role:"note",priority:"secondary"}
];
const SAMPLE_ROWS:readonly SampleRow[]=[
 {name:"Sữa hộp 180 ml",quantity:12,price:12000,total:144000,status:"Đã giao",date:"22/11/2026",group:"Sữa",note:"Đủ hàng, soát số lượng"},
 {name:"Bánh quy bơ",quantity:3,price:26000,total:78000,status:"Đơn tạm",date:"21/11/2026",group:"Bánh kẹo",note:"Giao cùng đơn sau"},
 {name:"Gạo loại 1 kg",quantity:5,price:32000,total:160000,status:"Cần kiểm",date:"20/11/2026",group:"Lương thực",note:"Tên dài thử nghiệm để xem cột có bị tràn khi xuống dòng hay không"},
 {name:"Nước khoáng",quantity:24,price:7000,total:168000,status:"Đã giao",date:"19/11/2026",group:"Đồ uống",note:"Mẫu căn số và nội dung"}
];
type TableMode="auto"|"scroll"|"cards";
type PreviewWidth="mobile"|"desktop";
interface TableState {count:number;mode:TableMode;width:PreviewWidth;sortKey:keyof SampleRow|null;descending:boolean}
const amount=new Intl.NumberFormat("vi-VN",{maximumFractionDigits:0});
const number=new Intl.NumberFormat("vi-VN");
const widthForCount=[0,245,355,475,620,755,880,1010,1170] as const;
function textElement<K extends keyof HTMLElementTagNameMap>(tag:K,className="",text=""):HTMLElementTagNameMap[K]{
 const node=document.createElement(tag);
 if(className)node.className=className;
 node.textContent=text;
 return node;
}
function formatValue(row:SampleRow,column:ColumnSpec):string{
 const raw=row[column.key];
 if(column.role==="money")return amount.format(raw as number)+" đ";
 if(column.role==="quantity")return number.format(raw as number);
 return String(raw);
}
function sortRows(rows:readonly SampleRow[],state:TableState):SampleRow[]{
 const items=rows.slice();
 const key=state.sortKey;
 if(!key)return items;
 const col=COLUMN_SCHEMA.find(c=>c.key===key);
 if(!col)return items;
 items.sort((a,b)=>{
  const left=a[key],right=b[key];
  let comparison:number;
  if(typeof left==="number"&&typeof right==="number")comparison=left-right;
  else comparison=String(left).localeCompare(String(right),"vi",{numeric:true,sensitivity:"base"});
  return state.descending?-comparison:comparison;
 });
 return items;
}
function buildTable(columns:readonly ColumnSpec[],rows:readonly SampleRow[],state:TableState,refresh:()=>void):HTMLTableElement{
 const table=textElement("table","ds-table ds-table--schema");
 table.dataset.colCount=String(columns.length);
 table.dataset.wide=String(columns.length>=6);
 table.style.minWidth=widthForCount[columns.length]+"px";
 const caption=textElement("caption","ui-column-caption","Bảng dữ liệu minh họa "+columns.length+" cột");
 table.append(caption);
 const thead=textElement("thead");const heading=textElement("tr");
 for(const col of columns){
  const th=textElement("th");th.scope="col";th.dataset.colRole=col.role;th.dataset.priority=col.priority;
  const active=state.sortKey===col.key;
  th.setAttribute("aria-sort",!active?"none":state.descending?"descending":"ascending");
  const button=textElement("button","ui-button ui-button--quiet ui-column-sort",col.label);
  button.type="button";
  button.setAttribute("aria-label","Sắp xếp theo "+col.label+(active?(state.descending?", hiện giảm dần":", hiện tăng dần"):""));
  button.addEventListener("click",()=>{
   if(state.sortKey!==col.key){state.sortKey=col.key;state.descending=false;}
   else if(!state.descending)state.descending=true;
   else state.sortKey=null;
   refresh();
  });
  th.append(button);heading.append(th);
 }
 thead.append(heading);table.append(thead);
 const tbody=textElement("tbody");
 for(const row of rows){
  const tr=textElement("tr");
  for(const col of columns){
   const cell=textElement("td","",formatValue(row,col));
   cell.dataset.colRole=col.role;cell.dataset.priority=col.priority;
   if(col.priority==="primary"){cell.classList.add("ui-column-primary");}
   tr.append(cell);
  }
  tbody.append(tr);
 }
 table.append(tbody);
 return table;
}
function buildCards(columns:readonly ColumnSpec[],rows:readonly SampleRow[]):HTMLElement{
 const list=textElement("div","ui-column-cards");
 list.setAttribute("role","list");
 const primary=columns.find(c=>c.priority==="primary")||columns[0];
 for(const row of rows){
  const card=textElement("article","ui-column-card");
  card.setAttribute("role","listitem");
  const title=textElement("h4","",formatValue(row,primary));card.append(title);
  const dl=textElement("dl");
  for(const col of columns){
   if(col.key===primary.key)continue;
   dl.append(textElement("dt","",col.label));
   const dd=textElement("dd","",formatValue(row,col));dd.dataset.colRole=col.role;dl.append(dd);
  }
  if(columns.length>1)card.append(dl);
  list.append(card);
 }
 return list;
}
export function initColumnMatrix():void{
 const root=document.getElementById("columnMatrix");
 const preview=document.getElementById("columnMatrixPreview");
 const notice=document.getElementById("columnMatrixStatus");
 const countControl=document.getElementById("columnMatrixCount") as HTMLSelectElement|null;
 const modeControl=document.getElementById("columnMatrixMode") as HTMLSelectElement|null;
 const widthControl=document.getElementById("columnMatrixWidth") as HTMLSelectElement|null;
 const copyControl=document.getElementById("columnMatrixCopy") as HTMLButtonElement|null;
 if(!root||!preview||!notice||!countControl||!modeControl||!widthControl||!copyControl)return;
 const state:TableState={count:5,mode:"auto",width:"mobile",sortKey:null,descending:false};
 let currentTable:HTMLTableElement|null=null;
 const render=()=>{
  const columns=COLUMN_SCHEMA.slice(0,state.count);
  const rows=sortRows(SAMPLE_ROWS,state);
  preview.replaceChildren();
  preview.dataset.width=state.width;
  preview.dataset.mode=state.mode;
  preview.dataset.many=String(state.count>=4);
  const inner=textElement("div","ui-column-projection");
  inner.dataset.mode=state.mode;inner.dataset.many=String(state.count>=4);
  const scroll=textElement("div","ds-table-scroll ui-column-table-zone");
  scroll.tabIndex=0;scroll.setAttribute("role","region");
  scroll.setAttribute("aria-label","Bảng "+state.count+" cột, cuộn ngang nếu bảng rộng hơn khung");
  currentTable=buildTable(columns,rows,state,render);
  scroll.append(currentTable);
  const cards=textElement("div","ui-column-card-zone");
  cards.append(buildCards(columns,rows));
  inner.append(scroll,cards);preview.append(inner);
  notice.textContent=state.count+" cột · "+(state.width==="mobile"?"khung 360px":"khung rộng")+" · "+
   (state.mode==="auto"?"tự đổi bảng/thẻ theo khung":state.mode==="scroll"?"bảng cuộn ngang":"thẻ có nhãn cột")+
   ". Cùng một nguồn dữ liệu, không giấu cột.";
 };
 for(let c=1;c<=COLUMN_SCHEMA.length;c++){
  const option=textElement("option","",c+" cột");option.value=String(c);countControl.append(option);
 }
 countControl.value=String(state.count);modeControl.value=state.mode;widthControl.value=state.width;
 countControl.addEventListener("change",()=>{
  const value=Number(countControl.value);
  if(!Number.isInteger(value)||value<1||value>COLUMN_SCHEMA.length)return;
  state.count=value;state.sortKey=null;render();
 });
 modeControl.addEventListener("change",()=>{
  if(modeControl.value==="auto"||modeControl.value==="scroll"||modeControl.value==="cards"){
   state.mode=modeControl.value;render();
  }
 });
 widthControl.addEventListener("change",()=>{
  if(widthControl.value==="mobile"||widthControl.value==="desktop"){
   state.width=widthControl.value;render();
  }
 });
 copyControl.addEventListener("click",async()=>{
  if(!currentTable)return;
  try{
   // Export the actual semantic HTML table from the preview, never an alternate template.
   await navigator.clipboard.writeText(currentTable.outerHTML);
   notice.textContent="Đã sao chép HTML bảng đang xem. Chỉ mẫu cục bộ, dùng CSS gốc 2027.";
  }catch{notice.textContent="Trình duyệt chưa cho phép sao chép. Có thể xem bảng mẫu trực tiếp."; }
 });
 render();
}
