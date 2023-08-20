function observeChangesOnCartItems(oldItems) {
  const cartItems = document.querySelector("ul.cart-items");

  const observer = new MutationObserver((mutationsList, observer) => {
    const items = cartItems.querySelectorAll("li");
    if (oldItems != items.length) {
      //Descomentar para verificar la diferencia de items
      /*
      const startItems = []
      items.forEach((item) => startItems.push(item.getAttribute("data-sku")+ '-' + item.querySelector("[data-bind='text: sellingPriceLabel']").textContent.split(" ")[1]));
      console.log('startItems', startItems);
      */
      const uniqueItems = [];
      items.forEach((item) => {
        const itemId = item.getAttribute("data-sku");
        //El sellingPrice es diferente entre los productos que comparten id pero uno tiene aplicado una promocion y otro no
        const sellingPrice = item.querySelector("[data-bind='text: sellingPriceLabel']").textContent.split(" ")[1] 
        if (!uniqueItems.includes(`${itemId}-${sellingPrice}`)) {
          uniqueItems.push(`${itemId}-${sellingPrice}`);
        } else {
          item.remove();
        }
      });
      oldItems = uniqueItems.length;
      //Descomentar para verificar la diferencia de items
      //console.log("uniqueItems", uniqueItems);
    }
  });

  observer.observe(cartItems, {
    attributes: true,
    childList: true,
    subtree: true,
  });
}

$(document).ready(function () {
  let oldItems = -1
  const cartItems = document.querySelector("ul.cart-items");

  const observerCartItems = new MutationObserver((mutations, obsCI) => {
    if (document.contains(cartItems)) {
      observeChangesOnCartItems(oldItems);
      window.addEventListener("hashchange", () => {
        observeChangesOnCartItems(oldItems);
      });
      obsCI.disconnect();
      return;
    }
  });

  observerCartItems.observe(document, {
    childList: true,
    subtree: true,
  });
});
