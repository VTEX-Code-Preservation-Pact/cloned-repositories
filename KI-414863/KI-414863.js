$(document).ready(function () {
  let listenerCreated = false;
  const observerRemoveUnavailableItems = new MutationObserver(
    (mutations, obsRUI) => {
      const removeUnavailableItems = document.querySelector(
        "#remove-unavailable-items"
      );

      const buttonCartRemoveUnavailableItems = document.querySelector(
        "#checkedEmpty"
      );

      if (document.contains(removeUnavailableItems)) {
        if (!listenerCreated) {
          listenerCreated = true;
          createListener(listenerCreated, removeUnavailableItems);
        }
      } else if (document.contains(buttonCartRemoveUnavailableItems)) {
        if (!listenerCreated) {
          listenerCreated = true;
          createListener(listenerCreated, buttonCartRemoveUnavailableItems);
        }
      } else {
        listenerCreated = false;
      }
    }
  );

  observerRemoveUnavailableItems.observe(document, {
    childList: true,
    subtree: true,
  });
});

function createListener(listenerFlag, element) {
  if (listenerFlag) {
    element.addEventListener("click", (event) => {
      //console.log("remove unavailable items");
      changeAfterRemove();
    });
  }
}

function changeAfterRemove() {
  $(window).on("orderFormUpdated.vtex", async function (_evt, orderForm) {
    //console.log("orderFormUpdated");
    location.reload();
  });
}
