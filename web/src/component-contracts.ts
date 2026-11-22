// UI-V40 · RULE 12: structural contracts — classification before creating CSS.
// Public GitHub inspiration: assistant-ui ComposerPrimitive, AI Elements PromptInput
// and OpenAI Apps SDK UI Button/Textarea. This is original 2027 metadata, not vendor code.
export type ComponentLayer="screen"|"region"|"composition"|"primitive"|"token";
export type ComponentNature="container"|"content"|"control"|"decoration";
export type ComponentCardinality="one"|"many"|"optional";
export interface ComponentContract {
 id:string;parent:string|null;layer:ComponentLayer;nature:ComponentNature;
 cardinality:ComponentCardinality;owner:string;description:string;
}
export const COMPONENT_CONTRACTS:readonly ComponentContract[]=[
 {id:"CHAT-SCREEN",parent:null,layer:"screen",nature:"container",cardinality:"one",owner:"app shell",description:"Vùng ứng dụng chat"},
 {id:"CHAT-THREAD",parent:"CHAT-SCREEN",layer:"region",nature:"container",cardinality:"one",owner:"thread layout",description:"Vùng nội dung hội thoại, một owner cuộn"},
 {id:"CHAT-MESSAGE-LIST",parent:"CHAT-THREAD",layer:"composition",nature:"container",cardinality:"one",owner:"thread layout",description:"Danh sách nhiều tin nhắn"},
 {id:"CHAT-MESSAGE",parent:"CHAT-MESSAGE-LIST",layer:"composition",nature:"container",cardinality:"many",owner:"message template",description:"Một tin nhắn có nhiều phần tùy chọn"},
 {id:"CHAT-MESSAGE-TEXT",parent:"CHAT-MESSAGE",layer:"primitive",nature:"content",cardinality:"optional",owner:"typography tokens",description:"Nội dung chữ, không phải button"},
 {id:"CHAT-MESSAGE-ACTIONS",parent:"CHAT-MESSAGE",layer:"composition",nature:"container",cardinality:"optional",owner:"ui-action-strip",description:"Vùng nhiều hành động của tin"},
 {id:"CHAT-COMPOSER",parent:"CHAT-THREAD",layer:"composition",nature:"container",cardinality:"one",owner:"ds-composer",description:"Cha của textarea, đính kèm và toolbar"},
 {id:"COMPOSER-ATTACHMENTS",parent:"CHAT-COMPOSER",layer:"composition",nature:"container",cardinality:"optional",owner:"composer attachment slots",description:"Vùng có 0–n ảnh/tệp trước khi gửi"},
 {id:"COMPOSER-ATTACHMENT",parent:"COMPOSER-ATTACHMENTS",layer:"composition",nature:"content",cardinality:"many",owner:"attachment preview",description:"Một ảnh/tệp với nút bỏ riêng"},
 {id:"COMPOSER-INPUT",parent:"CHAT-COMPOSER",layer:"primitive",nature:"content",cardinality:"one",owner:"ds-composer textarea",description:"Một ô textarea; không bao gồm nút"},
 {id:"COMPOSER-TOOLBAR",parent:"CHAT-COMPOSER",layer:"composition",nature:"container",cardinality:"one",owner:"ds-composer-actions",description:"Cha trực tiếp của các nút thao tác"},
 {id:"COMPOSER-ATTACH-BUTTON",parent:"COMPOSER-TOOLBAR",layer:"primitive",nature:"control",cardinality:"optional",owner:"ui-button",description:"Nút thêm ảnh, chứa ui-icon"},
 {id:"COMPOSER-MIC-BUTTON",parent:"COMPOSER-TOOLBAR",layer:"primitive",nature:"control",cardinality:"optional",owner:"ui-button",description:"Nút mic, không phải icon độc lập"},
 {id:"COMPOSER-SEND-BUTTON",parent:"COMPOSER-TOOLBAR",layer:"primitive",nature:"control",cardinality:"one",owner:"ui-button",description:"Nút gửi/dừng theo trạng thái, icon là con"},
 {id:"COMPOSER-SEND-ICON",parent:"COMPOSER-SEND-BUTTON",layer:"token",nature:"decoration",cardinality:"one",owner:"web/icons.svg",description:"SVG hiển thị không tự là một button"},
 {id:"SEARCH-FIELD",parent:"CHAT-SCREEN",layer:"composition",nature:"container",cardinality:"optional",owner:"ds-field",description:"Cha của input tìm và nút xóa nếu có"},
 {id:"SEARCH-INPUT",parent:"SEARCH-FIELD",layer:"primitive",nature:"content",cardinality:"one",owner:"ds-field input",description:"Một text input"},
 {id:"QUANTITY-STEPPER",parent:"CHAT-SCREEN",layer:"composition",nature:"container",cardinality:"optional",owner:"ds-qty",description:"Cha gồm giảm, giá trị, tăng"},
 {id:"QUANTITY-VALUE",parent:"QUANTITY-STEPPER",layer:"primitive",nature:"content",cardinality:"one",owner:"ds-qty input",description:"Giá trị số"},
 {id:"DATA-TABLE",parent:"CHAT-SCREEN",layer:"composition",nature:"container",cardinality:"optional",owner:"ds-table",description:"Một bảng có nhiều cột từ schema"},
 {id:"TABLE-COLUMN",parent:"DATA-TABLE",layer:"primitive",nature:"content",cardinality:"many",owner:"COLUMN_SCHEMA",description:"Một cột có key/label/role bất biến"}
];

export function getComponentContract(id:string):ComponentContract|undefined{
 return COMPONENT_CONTRACTS.find(node=>node.id===id);
}
// DOM-level audit for the visible FIELD-11 composer example.
// It deliberately checks ownership and nesting, not cosmetic pixel appearance.
export function auditComposerTree(root:Element):string[]{
 const errors:string[]=[];
 const form=root.matches('form.ds-composer[data-ui-component="CHAT-COMPOSER"]')
  ?root:root.querySelector('form.ds-composer[data-ui-component="CHAT-COMPOSER"]');
 if(!form)return ["CHAT-COMPOSER: thiếu form cha dùng ds-composer"];
 const input=form.querySelector<HTMLElement>('[data-ui-component="COMPOSER-INPUT"]');
 const toolbar=form.querySelector<HTMLElement>('[data-ui-component="COMPOSER-TOOLBAR"]');
 if(!input||input.tagName!=="TEXTAREA")errors.push("COMPOSER-INPUT: phải là textarea");
 if(input&&input.parentElement!==form)errors.push("COMPOSER-INPUT: phải thuộc trực tiếp Composer");
 if(!toolbar||toolbar.parentElement!==form)errors.push("COMPOSER-TOOLBAR: phải là con trực tiếp Composer");
 if(form.querySelectorAll('[data-ui-component="COMPOSER-INPUT"]').length!==1)
  errors.push("COMPOSER-INPUT: mỗi Composer chỉ có một textarea");
 if(form.querySelectorAll('[data-ui-component="COMPOSER-TOOLBAR"]').length!==1)
  errors.push("COMPOSER-TOOLBAR: mỗi Composer chỉ có một toolbar");
 for(const [id,expectedType] of [
  ["COMPOSER-ATTACH-BUTTON","button"],
  ["COMPOSER-MIC-BUTTON","button"],
  ["COMPOSER-SEND-BUTTON","submit"]
 ] as const){
  const control=form.querySelector<HTMLButtonElement>('[data-ui-component="'+id+'"]');
  if(!control){errors.push(id+": thiếu nút");continue;}
  if(control.parentElement!==toolbar)errors.push(id+": phải là con trực tiếp Toolbar");
  if(!control.classList.contains("ui-button"))errors.push(id+": phải dùng ui-button gốc");
  if(control.type!==expectedType)errors.push(id+": sai type");
  if(!control.getAttribute("aria-label"))errors.push(id+": thiếu nhãn thao tác");
  const svg=control.querySelector("svg.ui-icon > use[href]");
  if(!svg||!svg.getAttribute("href")?.startsWith("./web/icons.svg#ui-icon-"))
   errors.push(id+": icon phải là con SVG từ web/icons.svg");
 }
 if(form.querySelectorAll("[data-ui-component='COMPOSER-SEND-BUTTON']").length!==1)
  errors.push("COMPOSER-SEND-BUTTON: không được có hai nút gửi");
 return errors;
}
