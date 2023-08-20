$(document).ready(function () {
  let listenerCreated = false;

  const observerPaymentsGroup = new MutationObserver((mutations, obsP) => {
    const paymentGroup = document.querySelector(".payment-group");
    if (document.contains(paymentGroup)) {
      if ($(".payment-group").is(":visible")) {
        //console.log("es visible");
        if (!listenerCreated) {
          listenerCreated = true;
          const actualActive = document.querySelector(
            ".payment-group-item.active"
          );
          createListenerPayments(actualActive.id, listenerCreated);
        }
      } else {
        //console.log("no es visible");
        listenerCreated = false;
      }
    }
  });

  observerPaymentsGroup.observe(document, {
    childList: true,
    subtree: true,
  });
});

function clearData() {
  console.log("clearData");
  const iframePlaceholder = document.querySelector(
    "#iframe-placeholder-creditCardPaymentGroup"
  );
  const iframe = iframePlaceholder.querySelector("iframe");
  iframe.src = iframe.src;
}

function createListenerPayments(actualActiveId, listenerFlag) {
  if (listenerFlag) {
    let id = actualActiveId;
    document
      .querySelector(".payment-group")
      .addEventListener("click", (event) => {
        const newActualActive = document.querySelector(
          ".payment-group-item.active"
        );
        const newActualActiveId = newActualActive.id;
        //console.log("actualActiveId", id);
        //console.log("newActualActiveId", newActualActiveId);

        if (newActualActiveId !== id) {
          console.log("SI cambio el medio de pago");
          id = newActualActiveId;
          clearData();
        } else {
          console.log("NO cambio el medio de pago");
        }
      });
  }
}
