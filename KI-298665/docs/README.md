

# KI 298665

A custom solution for [KI-298665](https://projects-northlatam.atlassian.net/browse/LRP-217)

## How to use
- Run command: `vtex install vtex.ki-298665 ` in the desired account.

- Paste the following script in https://{account}.myvtex.com/admin/portal/#/sites/default/code/files/checkout6-custom.js:
```javascript
$(window).on("orderFormUpdated.vtex", function () {
  if (window.location.hash === "#/shipping") {
    setTimeout(changeDuplicatedSlaId, 500);
  }
});
function changeDuplicatedSlaId() {
  const orderForm = vtexjs.checkout.orderForm;
  const slas = orderForm.shippingData.logisticsInfo;

  // Get duplicated slas
  const duplicated = [];
  const lookUp = {};
  slas.forEach((element, index) => {
    const sla = element.selectedSla;
    lookUp[sla] = ++lookUp[sla] || 0;
    if (lookUp[sla]) {
      duplicated.push(index);
    }
  });

  // Modify duplicated SLAs
  const items = orderForm.items;
  duplicated.forEach((element) => {
    const sla = slas[element];
    const product = items[sla.itemIndex];
    const seller = product.sellerChain[product.sellerChain.length - 1];

    $.ajax({
      contentType: "application/json; charset=utf-8",
      headers: {
        Accept: "application/vnd.vtex.ds.v10+json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      type: "POST",
      url: "/_v/shipping-policy",
      data: JSON.stringify({
        account: seller,
        shippingMethod: slas[element].selectedSla,
      }),
    });
  });
}
```