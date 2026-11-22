// V42 · Shared geometry primitive for CHAT-MESSAGE-LIST, no vendor code.
export interface MessageAnchor {id:string;top:number}
export function captureVisibleAnchor(viewport:HTMLElement):MessageAnchor|null{
 const frame=viewport.getBoundingClientRect();
 const node=Array.from(viewport.querySelectorAll<HTMLElement>("[data-message-id]"))
  .find(el=>el.getBoundingClientRect().bottom>frame.top&&el.getBoundingClientRect().top<frame.bottom);
 return node?.dataset.messageId?{id:node.dataset.messageId,top:node.getBoundingClientRect().top-frame.top}:null;
}
export function restoreVisibleAnchor(viewport:HTMLElement,anchor:MessageAnchor|null):boolean{
 if(!anchor)return false;
 const node=Array.from(viewport.querySelectorAll<HTMLElement>("[data-message-id]"))
  .find(el=>el.dataset.messageId===anchor.id);
 if(!node)return false;
 viewport.scrollTop+=node.getBoundingClientRect().top-viewport.getBoundingClientRect().top-anchor.top;
 return true;
}
