$(window).on("orderFormUpdated.vtex", function (evt, orderForm) {
  setTimeout(() => {
    shippingValue(orderForm);
  }, 1000);
});

window.addEventListener("load", function (event) {
  if ($(".srp-toggle__delivery").hasClass("blue")) {
    setTimeout(() => {
      shippingValue(vtexjs.checkout.orderForm);
    }, 1000);
  }

  $(".srp-toggle__delivery").click(function () {
    setTimeout(() => {
      shippingValue(vtexjs.checkout.orderForm);
    }, 1000);
  });
});

function shippingValue(orderForm) {
  if (
    window.location.hash === "#/cart" &&
    $(".srp-shipping-current-single__price").length > -1 &&
    orderForm.shippingData.selectedAddresses != null &&
    orderForm.totalizers.length > 1 &&
    $(".srp-toggle__delivery").hasClass("blue")
  ) {
    let price = orderForm.totalizers[1].value;
    const locale = orderForm.clientPreferencesData.locale;
    const currency = orderForm.storePreferencesData.currencyCode;
    const formattedPrice = formatValue(price, locale, currency);

    if (formattedPrice) {
      $("#shipping-preview-container .srp-shipping-current-single__price").html(
        "$ " + formattedPrice
      );
    }
  }
}

function formatValue(value, locale, currency) {
  try {
    let shippingPrice = value.toString().slice(0, -2);
    shippingPrice = shippingPrice.toLocaleString(locale, {
      style: "currency",
      currency: currency,
    });
    return shippingPrice;
  } catch (error) {
    console.error(error);
    return value;
  }
}
