function getIdOfElement(elementId) {
  const splited = elementId.split(" ");
  let splitedWithputStart = "";
  splited.forEach((sp, index) => {
    if (index !== 0) {
      if (index === splited.length - 1) {
        splitedWithputStart += sp;
      } else {
        splitedWithputStart += sp + " ";
      }
    }
  });

  const id = splited[0] + "-" + splitedWithputStart;
  return id;
}

function getSlaList(orderForm) {
  var shippingData = orderForm.shippingData;
  const slaList = [];
  shippingData.logisticsInfo.forEach((logisticsInfo) => {
    const selectedSla = logisticsInfo.selectedSla;
    logisticsInfo.slas.forEach((sla) => {
      if (selectedSla === sla.id) {
        if (
          !slaList
            .map((s) => {
              return s.sla;
            })
            .includes(selectedSla)
        ) {
          slaList.push({ sla: sla.id, price: sla.price });
        } else {
          slaList.find((item) => item.sla === selectedSla).price += sla.price;
        }
      }
    });
  });
  return slaList;
}

function changePriceOfElement(slaList){
  slaList.forEach((s) => {
    const elementId = `scheduled-delivery-${s.sla}`;
    const id = getIdOfElement(elementId);
    const delivery = document.querySelector('[id="' + id + '"]');
    if (delivery) {
        delivery.childNodes.forEach((child) => {
          const textContent = child.textContent.split('    ');
          const price = textContent[1].split(' ')
          child.textContent = textContent[0] + '\xA0\xA0\xA0\xA0' + price[0] + ' ' + parseFloat(s.price/100).toFixed(2);
        })
    }
  });
}

vtexjs.checkout.getOrderForm().then((orderForm) => {
  const slaList = getSlaList(orderForm);
  console.log(slaList);
  changePriceOfElement(slaList)
});



