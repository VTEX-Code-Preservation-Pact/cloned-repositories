$(document).ready(function () {
    let listenerCreated = false;
    const observerToggle = new MutationObserver((mutations, obsP) => {
        const shippingToggle = document.querySelector(".vtex-omnishipping-1-x-toggle");
        if (document.contains(shippingToggle)) {
            if (!listenerCreated) {
                listenerCreated = true;
                createListener(listenerCreated);
            }
        } else {
            listenerCreated = false;
        }
    });

    observerToggle.observe(document, {
        childList: true,
        subtree: true,
    });
});

function createListener(listenerFlag) {
    if (listenerFlag) {
        document
            .querySelector(".vtex-omnishipping-1-x-toggle")
            .addEventListener("click", (event) => {
                vtexjs.checkout.getOrderForm().then(function (orderForm) {
                    var shippingData = orderForm.shippingData;
                    if (
                        shippingData.logisticsInfo &&
                        shippingData.logisticsInfo.length > 0
                    ) {
                        const frontDelivery = document.querySelectorAll(".shp-lean-option")
                        let freeShippingNotExists = false
                        for (var i = 0; i < frontDelivery.length; i++) {
                            const textPrice = frontDelivery[i].querySelector(".shp-option-text-price").textContent
                            if (textPrice.toLowerCase() === "gratis") {
                                const freeBack = vtexjs.checkout.orderForm.shippingData.logisticsInfo[i].slas.filter(item => { return item.deliveryChannel === "delivery" }).filter(delivery => { return delivery.price === 0 })
                                if (freeBack.length === 0) {
                                    freeShippingNotExists = true;
                                }
                            } else {
                                if (freeShippingNotExists) {
                                    frontDelivery[i].click()
                                }
                            }
                        }
                        return null;
                    }
                });
            });
    }
}
