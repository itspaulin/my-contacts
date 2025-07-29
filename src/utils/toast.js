import EventManager from "../lib/eventManager";

export const toastEventManager = new EventManager();

export default function toast({ type, text }) {
  toastEventManager.emit("addtoast", { type, text });
}
