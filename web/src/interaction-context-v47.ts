// UI-V47 · RULE 12: context-aware feedback belongs to CHAT-SCREEN.
// Original 2027 specimen only. No notifications, messages, APIs or timers.
export type ChatContextV47="locked"|"directory"|"same"|"other"|"keyboard";
export interface ChatFeedbackV47{
  label:string;description:string;
  system:boolean;inbox:boolean;thread:boolean;toast:boolean;secondaryActions:boolean;typing:boolean;
  threadTitle:string;threadText:string;
}
export const CHAT_FEEDBACK_V47:Readonly<Record<ChatContextV47,Readonly<ChatFeedbackV47>>> = {
  locked:{
    label:"Máy khóa",description:"Một thông báo hệ thống; không tạo toast trong ứng dụng đang nền.",
    system:true,inbox:false,thread:false,toast:false,secondaryActions:false,typing:false,
    threadTitle:"Không có màn đang đọc",threadText:""
  },
  directory:{
    label:"Danh bạ",description:"Dòng khách nhận cập nhật xem trước và dấu chưa đọc; không hiện banner thứ hai.",
    system:false,inbox:true,thread:false,toast:false,secondaryActions:false,typing:false,
    threadTitle:"Danh bạ",threadText:""
  },
  same:{
    label:"Đúng hội thoại",description:"Tin mới xuất hiện ngay tại hội thoại đang xem; không phát Push hoặc toast trùng.",
    system:false,inbox:false,thread:true,toast:false,secondaryActions:true,typing:false,
    threadTitle:"Khách mẫu B",threadText:"Tin mới đang hiển thị trong cuộc trò chuyện"
  },
  other:{
    label:"Hội thoại khác",description:"Dòng B có tin chưa đọc và một toast gọn; vùng A đang đọc không bị chuyển tự động.",
    system:false,inbox:true,thread:true,toast:true,secondaryActions:true,typing:false,
    threadTitle:"Khách mẫu A",threadText:"Đang đọc cuộc trò chuyện A"
  },
  keyboard:{
    label:"Bàn phím mở",description:"Vùng đọc và ô nhập là chính; nút phụ thu lại. Đây chỉ là mô phỏng, không bật bàn phím thật.",
    system:false,inbox:false,thread:true,toast:false,secondaryActions:false,typing:true,
    threadTitle:"Khách mẫu B",threadText:"Tin mới vẫn nhìn thấy khi soạn nội dung"
  }
} as const;
export function decideChatFeedbackV47(context:ChatContextV47):Readonly<ChatFeedbackV47>{
  return CHAT_FEEDBACK_V47[context];
}
export function initChatContextV47():void{
  const root=document.getElementById("uxContextV47");
  if(!root)return;
  const controls=Array.from(root.querySelectorAll<HTMLButtonElement>("[data-chat-context-v47]"));
  const status=root.querySelector<HTMLElement>("#uxContextV47Status");
  const title=root.querySelector<HTMLElement>("#uxContextV47ThreadTitle");
  const message=root.querySelector<HTMLElement>("#uxContextV47ThreadText");
  if(!status||!title||!message)throw new Error("Thiếu phần tử trong mẫu trạng thái V47");
  function render(context:ChatContextV47):void{
    const scenario=decideChatFeedbackV47(context);
    root.dataset.activeContext=context;
    for(const key of ["system","inbox","thread","toast","secondaryActions","typing"] as const){
      const el=root.querySelector<HTMLElement>('[data-v47-surface="'+key+'"]');
      if(!el)throw new Error("Thiếu slot "+key);
      el.hidden=!scenario[key];
    }
    title.textContent=scenario.threadTitle;
    message.textContent=scenario.threadText;
    status.textContent=scenario.label+" · "+scenario.description;
    for(const button of controls)
      button.setAttribute("aria-pressed",String(button.dataset.chatContextV47===context));
  }
  for(const button of controls){
    button.addEventListener("click",()=>{
      const candidate=button.dataset.chatContextV47;
      if(candidate&&Object.prototype.hasOwnProperty.call(CHAT_FEEDBACK_V47,candidate))
        render(candidate as ChatContextV47);
    });
  }
  render("directory");
}
