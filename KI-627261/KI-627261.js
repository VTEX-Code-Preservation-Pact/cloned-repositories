const changeCalendars = () => {
    const calendars = $(".vtex-omnishipping-1-x-dateLink").toArray();
  
  const sleep = async seconds => new Promise(resolve => {
   setTimeout(resolve, seconds)
  })
  
   const callSelectedDay = async (index, calendar) =>{
    $(calendar).click();
    await sleep(100)
    $(calendar).parents(".react-datepicker-wrapper").siblings(".react-datepicker-popper").find(".react-datepicker_day:not(.react-datepicker_day--disabled)").first().click()
  }
  
  const validation = async () => {  
    if (calendars.length) {
        $(calendars).each(callSelectedDay)
    }
  };
  
  $(calendars.shift()).on("click", async()=>{
    await sleep(100);
    $(".react-datepicker__day").on("click", validation);
  });
  };
  
  $(document).ready(function () {
    let previusSelectedAddress =
      vtexjs.checkout.orderForm.shippingData.selectedAddresses[0];
    $(window).on("orderFormUpdated.vtex", async function (_evt, orderForm) {
      const selectedAddresses = orderForm.shippingData.selectedAddresses[0];
      if (!previusSelectedAddress && selectedAddresses) {
        console.log("coloco direccion por primera vez");
        changeCalendars()
        previusSelectedAddress = selectedAddresses;
      } else if (
        selectedAddresses.addressId !== previusSelectedAddress.addressId ||
        selectedAddresses.addressType !== previusSelectedAddress.addressType ||
        selectedAddresses.city !== previusSelectedAddress.city ||
        selectedAddresses.complement !== previusSelectedAddress.complement ||
        selectedAddresses.country !== previusSelectedAddress.country ||
        JSON.stringify(selectedAddresses.geoCoordinates) !==
          JSON.stringify(previusSelectedAddress.geoCoordinates) ||
        selectedAddresses.isDisposable !== previusSelectedAddress.isDisposable ||
        selectedAddresses.neighborhood !== previusSelectedAddress.neighborhood ||
        selectedAddresses.number !== previusSelectedAddress.number ||
        selectedAddresses.postalCode !== previusSelectedAddress.postalCode ||
        selectedAddresses.receiverName !== previusSelectedAddress.receiverName ||
        selectedAddresses.reference !== previusSelectedAddress.reference ||
        selectedAddresses.state !== previusSelectedAddress.state ||
        selectedAddresses.street !== previusSelectedAddress.street
      ) {
        console.log("cambio la direcciones");
        previusSelectedAddress = selectedAddresses;
        changeCalendars()
      } else {
        console.log("no cambio la direcciones");
      }
    });
  });