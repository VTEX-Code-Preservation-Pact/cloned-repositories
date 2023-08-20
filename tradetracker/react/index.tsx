import { PixelMessage } from "./typings/events";
import { canUseDOM } from "vtex.render-runtime";

function handleMessages(e: PixelMessage) {
  const {
    ttConversionOptions = [],
    __tradetracker: {
      tradeTrackerCampaignID: campaignID,
      tradeTrackerProductID: productID,
      tradeTrackerDescrMerchant: descrMerchant,
      tradeTrackerDescrAffiliate: descrAffiliate
    }
  } = window;
  switch (e.data.eventName) {
    case "vtex:orderPlaced": {
      const {
        transactionId: transactionID,
        currency,
        transactionTotal: transactionAmount,
        visitorContactInfo: [email]
      } = e.data;
      ttConversionOptions.push({
        type: "sales",
        quantity: "1",
        email,
        currency,
        campaignID,
        productID,
        transactionID,
        transactionAmount,
        descrMerchant,
        descrAffiliate
      });
      const tradeTrackerScriptTag = document.createElement("script");
      tradeTrackerScriptTag.type = "text/javascript";
      tradeTrackerScriptTag.async = true;
      tradeTrackerScriptTag.src = "//tm.tradetracker.net/conversion?s=" + encodeURIComponent(campaignID) + "&t=m";
      const scriptTags = document.getElementsByTagName("script");
      if (scriptTags && scriptTags.length) {
        const lastScriptTag = scriptTags[scriptTags.length - 1];
        if (lastScriptTag && lastScriptTag.parentNode) {
          lastScriptTag.parentNode.insertBefore(tradeTrackerScriptTag, lastScriptTag);
        }
      }
      break;
    }
  }
}

if (canUseDOM) {
  window.addEventListener("message", handleMessages);
}
