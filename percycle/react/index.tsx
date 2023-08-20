import { PixelMessage } from "./typings/events";
import { canUseDOM } from "vtex.render-runtime";

function handleMessages(e: PixelMessage) {
  const { storeName } = window

  if (e.data.eventName === 'vtex:orderPlaced') {
    const percycleScript = document.createElement('script');
    percycleScript.setAttribute('src', `//static.percycle.com/${storeName}/c.js`);
    percycleScript.setAttribute('async', 'async');
    percycleScript.setAttribute('defer', 'defer');
    document.getElementsByTagName('body')[0].appendChild(percycleScript);
  }
}

if (canUseDOM) {
  window.addEventListener("message", handleMessages);
}
