$(document).ready(function () {
  window.addEventListener("hashchange", () => {
    hashchange();
  });
  let listenerCreated = false;
  const observerReceiverName = new MutationObserver((mutations, obsP) => {
    const receiverName = document.querySelector(".ship-receiverName");
    if (document.contains(receiverName)) {
      if (!listenerCreated) {
        listenerCreated = true;
        createListener(listenerCreated);
      }
    } else {
      listenerCreated = false;
    }
  });

  observerReceiverName.observe(document, {
    childList: true,
    subtree: true,
  });
});

function createListener(listenerFlag) {
  if (listenerFlag) {
    document
      .querySelector("#ship-receiverName")
      .addEventListener("focusout", (event) => {
        vtexjs.checkout.getOrderForm().then(function (orderForm) {
          var shippingData = orderForm.shippingData;
          if (
            shippingData.selectedAddresses &&
            shippingData.selectedAddresses.length > 0
          ) {
            shippingData.selectedAddresses[0].receiverName =
              document.querySelector("#ship-receiverName").value;
            return vtexjs.checkout.sendAttachment("shippingData", shippingData);
          }
        });
      });
  }
}

function hashchange() {
  vtexjs.checkout.getOrderForm().then(function (orderForm) {
    var shippingData = orderForm.shippingData;
    if (
      shippingData.selectedAddresses &&
      shippingData.selectedAddresses.length > 0
    ) {
      if (!shippingData.selectedAddresses[0].receiverName) {
        //console.log("receiverName is empty");
        const clientProfileData = orderForm.clientProfileData
        const { firstName, lastName } = clientProfileData
        let name = `${firstName} ${lastName}`
        if (name.includes("*")) {
          name = name.replaceAll("*", "")
        }
        shippingData.selectedAddresses[0].receiverName = name
        return vtexjs.checkout.sendAttachment("shippingData", shippingData);
      }/*{
        console.log("receiverName is not empty");
      }*/
    }
  });
}
