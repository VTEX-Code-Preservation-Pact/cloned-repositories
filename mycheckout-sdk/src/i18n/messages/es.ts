import { LOCALES } from '../locales'

export default {
  [LOCALES.SPANISH]: {
    'store/checkoutless.generalMesage.appName': 'Kuikpay',
    'store/checkoutless.generalMesage.loading': 'Cargando...',
    'store/checkoutless.generalError': 'Ha ocurrido un error',
    'store/checkoutless.generalMessage.or': 'o',
    'store/checkoutless.generalMessage.in': 'en',
    'store/checkoutless.register.alt.loading': 'Cargando...',
    'store/checkoutless.register.data': 'Datos',
    'store/checkoutless.register.shipping': 'Entrega',
    'store/checkoutless.register.noOptions': 'No se encontraron resultados',
    'store/checkoutless.register.payment': 'Pago',
    'store/checkoutless.register.email': 'Email*',
    'store/checkoutless.register.emailError':
      'El email debe ser un email válido',
    'store/checkoutless.register.name': 'Nombre*',
    'store/checkoutless.register.nameError':
      'El nombre solo puede contener letras',
    'store/checkoutless.register.lastname': 'Apellido*',
    'store/checkoutless.register.lastnameError':
      'El apellido solo puede contener letras',
    'store/checkoutless.register.neighborhoodError': 'Barrio incorrecto',
    'store/checkoutless.register.prefix': 'Prefijo*',
    'store/checkoutless.register.phone': 'Teléfono*',
    'store/checkoutless.register.phoneError':
      'El teléfono solo puede contener números y el máximo son 10 dígitos',
    'store/checkoutless.register.documentType': 'Documento*',
    'store/checkoutless.register.document': 'Cédula*',
    'store/checkoutless.register.documentError':
      'Formato de documento inválido',
    'store/checkoutless.register.habeasData':
      'He leído y acepto los {terms} del sitio. Acepto también las {privacy} y tratamientos de datos personales',
    'store/checkoutless.register.habeasData.terms': 'Términos y condiciones',
    'store/checkoutless.register.habeasData.privacy': 'políticas de privacidad',
    'store/checkoutless.register.country': 'País*',
    'store/checkoutless.register.state': 'Departamento*',
    'store/checkoutless.register.city': 'Ciudad*',
    'store/checkoutless.register.neighborhood': 'Barrio*',
    'store/checkoutless.register.address': 'Dirección*',
    'store/checkoutless.register.address.alternative':
      'Esta dirección esta actualizada con la tienda',
    'store/checkoutless.register.addressError': 'Dirección incorrecta',
    'store/checkoutless.register.complement': 'Torre, apto, oficina',
    'store/checkoutless.register.postalCode': 'Código postal*',
    'store/checkoutless.register.postalCodeError':
      'El código postal solo puede contener números',
    'store/checkoutless.register.creditCard': 'Tarjeta de crédito',
    'store/checkoutless.register.creditCardName': 'Nombre en la tarjeta',
    'store/checkoutless.register.creditCardNumber': 'Número de tarjeta',
    'store/checkoutless.register.creditCardError':
      'Alguno de los campos no es válido',
    'store/checkoutless.register.payOnReceive': 'Pago Contraentrega',
    'store/checkoutless.register.customerCredit':
      '{store} compra ahora y paga después',
    'store/checkoutless.register.customerCredit.fail':
      'No cuentas con el cupo ORION suficiente para finalizar la compra',
    'store/checkoutless.register.customerCredit.study.title':
      'Estamos estudiando tu perfil',
    'store/checkoutless.register.customerCredit.study.description':
      'Nos encontramos validando tu información',
    'store/checkoutless.register.customerCredit.study.approved.minmessage':
      'Tienes un cupo de {value} para tu compra',
    'store/checkoutless.register.customerCredit.study.initialmessage':
      'Compra ahora y paga en {quantity} de {value}',
    'store/checkoutless.register.customerCredit.study.approved.title':
      '¡Felicitaciones!',
    'store/checkoutless.register.customerCredit.study.approved.description':
      'Hemos aprobado tu cupo ORION por {value}',
    'store/checkoutless.register.customerCredit.study.approved.message':
      'Tu pago ya puede ser aplicado',
    'store/checkoutless.register.customerCredit.study.deny.title':
      'Lo sentimos',
    'store/checkoutless.register.customerCredit.study.deny.description':
      'Después de estudiar tu perfil tu cupo ORION no ha sido aprobado, por favor finaliza tu compra con otro medio de pago',
    'store/checkoutless.register.payOnReceiveMessage':
      'En el momento de la entrega de tu pedido se realizará la recolección del efectivo. Recuerda tener el valor exacto ya que el transportador no tiene cambio.',
    'store/checkoutless.register.checkoutErrorTitle': 'Error en el pago',
    'store/checkoutless.register.checkoutError':
      'Tu pago no ha sido aprobado, por favor intenta nuevamente con otro medio de pago.',
    'store/checkoutless.register.processingPayment': 'Estamos Creando Tu Orden',
    'store/checkoutless.register.pay': 'Pagar {price}',
    'store/checkoutless.register.pay.loading': 'Estamos creando tu pedido',
    'store/checkoutless.register.pay.delivery': 'Entrega a domicilio',
    'store/checkoutless.register.pay.pickup-point': 'Recoge en',
    'store/checkoutless.register.pay.total': 'Total a pagar:',
    'store/checkoutless.register.card.name': 'Nombre *',
    'store/checkoutless.register.card.nameError': 'El nombre es obligatorio',
    'store/checkoutless.register.card.document': 'Número de identificación *',
    'store/checkoutless.register.card.number': 'Número de tarjeta *',
    'store/checkoutless.register.card.numberError':
      'Número de tarjeta inválido',
    'store/checkoutless.register.card.franchiseError':
      'Esta franquicia no está disponible para cerrar esta compra. Intente con otra por favor.',
    'store/checkoutless.register.card.dues': 'Cuotas *',
    'store/checkoutless.register.card.duesError': 'Cuotas incorrectas',
    'store/checkoutless.register.card.expiryDate': 'MM / AA *',
    'store/checkoutless.register.card.expiryDateError': 'Fecha incorrecta',
    'store/checkoutless.register.card.cvv': 'CVC',
    'store/checkoutless.register.card.enterAllFields':
      'Por favor ingresa todos los campos obligatorios para continuar',
    'store/checkoutless.register.notAddress':
      'Algunos productos no están disponibles para recoger en tienda. Podemos enviártelos, por favor ingresa tus datos de entrega.',
    'store/checkoutless.register.step.personalData': 'Continuar Mis Datos',
    'store/checkoutless.register.step.location': 'Continuar Mi Ubicación',
    'store/checkoutless.register.step.logistic': 'Continuar Mi Entrega',
    'store/checkoutless.register.step.payment': 'Continuar Mi Pago',
    'store/checkoutless.button.loading': 'Cargando',
    'store/checkoutless.button.continue': 'Continuar',
    'store/checkoutless.text.select': 'Seleccionar',
    'store/checkoutless.button.save': 'Guardar',
    'store/checkoutless.button.goShopping': 'Ir a comprar',
    'store/checkoutless.accessKey.message':
      'Te hemos enviado un código de seguridad de 6 digitos a tu correo, ingrésalo para continuar.',
    'store/checkoutless.accessKey.messageError':
      'El código que ingresaste no es correcto, por favor ingrésalo nuevamente.',
    'store/checkoutless.accessKey.sessionExpireTitle':
      'El tiempo de tu sesión ha expirado',
    'store/checkoutless.accessKey.sessionExpireText':
      'Por seguridad hemos bloqueado el código por {minutes} minuto, por favor inténtalo de nuevo para terminar tu proceso.',
    'store/checkoutless.accessKey.question': '¿No has recibido el código?',
    'store/checkoutless.accessKey.resendCode': 'Reenviar el código',
    'store/checkoutless.accessKey.newCode': 'solicita un nuevo código',
    'store/checkoutless.accessKey.oneMinute': 'dentro de 1 minuto',
    'store/checkoutless.accessKey.countdownSecondsMessage':
      'Podrás solicitar un nuevo código en',
    'store/checkoutless.accessKey.countdownSeconds': '{seconds} segundos',
    'store/checkoutless.logistics.shipping': 'Envío {selectedSla}',
    'store/checkoutless.logistics.packages': 'Tienes 2 entregas programadas',
    'store/checkoutless.logistics.sameDay': 'hoy',
    'store/checkoutless.logistics.businessDays': 'días hábiles',
    'store/checkoutless.logistics.days': 'días',
    'store/checkoutless.logistics.minutes': 'minutos',
    'store/checkoutless.logistics.date': 'Fecha de entrega',
    'store/checkoutless.logistics.delivery': 'Domicilio',
    'store/checkoutless.logistics.pickUp': 'Recogida',
    'store/checkoutless.logistics.pickUpInStore': 'Recoger en tienda',
    'store/checkoutless.logistics.homeDelivery': 'Entrega a domicilio',
    'store/checkoutless.logistics.endingOrderPackages':
      'Compra {package} de {length}',
    'store/checkoutless.logistics.chooseStore': 'Elegir tienda',
    'store/checkoutless.logistics.chooseShipping': 'Elegir tipo de domicilio',
    'store/checkoutless.logistics.deliveryType':
      'Envío {type} (Recíbelo {in} {days} - {price})',
    'store/checkoutless.logistics.shippingSteps': 'Paquete {step}',
    'store/checkoutless.logistics.packageSteps':
      'Entrega {step} de {totalSteps}',
    'store/checkoutless.logistics.deliveryCost': 'Costo de Entrega',
    'store/checkoutless.logistics.freeDeliveryCost': 'Gratis',
    'store/checkoutless.orderPlaced.thanks': '¡Gracias por tu compra!',
    'store/checkoutless.orderPlaced.pending': 'Pago pendiente de aprobación',
    'store/checkoutless.orderPlaced.pendingMessage':
      'Tu pago está siendo procesado, te notificaremos una vez haya sido aprobado',
    'store/checkoutless.orderPlaced.confirmationMessage':
      'Hemos enviado a tu correo electrónico con una copia de tu factura electrónica',
    'store/checkoutless.summary.showOrder': 'Mi orden',
    'store/checkoutless.summary.myOrder': 'Mi orden',
    'store/checkoutless.summary.MyInfo': 'Mis datos',
    'store/checkoutless.summary.myPersonalData': 'Mis datos personales',
    'store/checkoutless.summary.error': 'No hay productos',
    'store/checkoutless.summary.hide': 'Ocultar orden',
    'store/checkoutless.summary.unit': '{quantity} Und.',
    'store/checkoutless.summary.unavailable':
      'Este producto no se encuentra disponible',
    'store/checkoutless.summary.unavailableLogistic':
      'Este producto no se encuentra disponible para tu dirección',
    'store/checkoutless.summary.subtotal': 'Subtotal',
    'store/checkoutless.summary.total': 'Total',
    'store/checkoutless.summary.shipping': 'Envío',
    'store/checkoutless.summary.taxes': 'Impuestos',
    'store/checkoutless.summary.discounts': 'Descuentos',
    'store/checkoutless.summary.isGift': 'La compra incluye',
    'store/checkoutless.summary.notAddress':
      'Algunos productos no están disponibles para recoger en tienda. Podemos enviártelos, por favor ',
    'store/checkoutless.summary.nonEditableDelivery':
      'Para garantizarte la disponibilidad de tus productos, no puedes cambiar ni tu método de entrega, ni tu dirección seleccionada.',
    'store/checkoutless.summary.notAddressLink':
      'ingresa aquí tus datos de entrega.',
    'store/checkoutless.summary.undefinedTotal': 'Por calcular',
    'store/checkoutless.summary.dividedPackage':
      'Hemos dividido tu paquete en múltiples entregas',
    'store/checkoutless.summary.productsNotAvailable':
      'Algunos de tus productos no se encuentran disponibles para el metodo de entrega seleccionado',
    'store/checkoutless.summary.free': 'Gratis',
    'store/checkoutless.userInfo.unavailableProducts':
      'Hay productos que no están disponibles para entrega en esta dirección. Por favor cambie la dirección o ',
    'store/checkoutless.userInfo.noProducts':
      'No hay productos disponibles para seleccionar datos de entrega',
    'store/checkoutless.userInfo.unavailableLink':
      'elimine los productos del carrito.',
    'store/checkoutless.userInfo.email': '{customText}',
    'store/checkoutless.userInfo.address': '{customText}',
    'store/checkoutless.userInfo.address.alternative':
      'Esta dirección esta actualizada con la tienda',
    'store/checkoutless.userInfo.payment': '{customText}',
    'store/checkoutless.userInfo.addressDeleted':
      'Dirección eliminada correctamente',
    'store/checkoutless.userInfo.addressEdited':
      'Dirección editada correctamente',
    'store/checkoutless.userInfo.paymentDeleted':
      'Método de pago eliminado correctamente',
    'store/checkoutless.userInfo.deleteAddressError':
      'Se presentaron inconvenientes eliminando la dirección, por favor intenta de nuevo más tarde',
    'store/checkoutless.userInfo.deletePaymentError':
      'Se presentaron inconvenientes eliminando el método de pago, por favor intenta de nuevo más tarde',
    'store/checkoutless.userInfo.newAddress': 'Nueva dirección',
    'store/checkoutless.userInfo.paymentMethod': 'Método de pago',
    'store/checkoutless.userInfo.addPaymentMethod': 'Usar otro medio de pago',
    'store/checkoutless.userInfo.otherPaymentMethod': 'Otros medios de pago',
    'store/checkoutless.userInfo.deleteLink': 'Eliminar',
    'store/checkoutless.userInfo.confirmDeleteAddress':
      'Estas apunto de eliminar tu dirección {customText}. ',
    'store/checkoutless.userInfo.confirmDeletePayment':
      'Estas apunto de eliminar tu tarjeta de crédito ******** {customText}. ',
    'store/checkoutless.userInfo.myCards': 'Método de pago - Mis tarjetas',
    'store/checkoutless.card.cardNumberError':
      'Ingresa el número de tu tarjeta',
    'store/checkoutless.card.cardNumber': 'Número de tarjeta *',
    'store/checkoutless.card.cardExpirationMonthError': 'Elige un mes',
    'store/checkoutless.card.cardExpirationYearError': 'Elige un año',
    'store/checkoutless.card.identificationTypeError':
      'Ingresa tu tipo de documento',
    'store/checkoutless.card.identificationNumberError': 'Ingresa tu documento',
    'store/checkoutless.card.issuerError': 'Ingresa tu banco',
    'store/checkoutless.card.cardholderNameError':
      'Ingresa el nombre y apellido',
    'store/checkoutless.card.securityCodeCVV': 'CVV *',
    'store/checkoutless.card.cvv': 'CVV',
    'store/checkoutless.card.securityCodeError':
      'Ingresa el código de seguridad',
    'store/checkoutless.card.invalidCardNumberError':
      'Ingresa un número de tarjeta válido',
    'store/checkoutless.card.invalidSecurityCodeError':
      'Revisa el código de seguridad',
    'store/checkoutless.card.invalidcardholderNameError':
      'Ingresa un nombre válido',
    'store/checkoutless.card.invalidIdentificationTypeError':
      'El tipo de documento es inválido',
    'store/checkoutless.card.invalidIdentificationNumberError':
      'El documento es inválido',
    'store/checkoutless.card.invalidCardExpirationMonthError':
      'El mes es inválido',
    'store/checkoutless.card.invalidCardExpirationYearError':
      'El año es inválido',
    'store/checkoutless.card.defaultError': 'Revisa los datos',
    'store/checkoutless.card.invalidCardExpirationError':
      'La fecha de expiración no es válida',
    'store/checkoutless.location.unAvailable':
      'Los datos de localización no están disponibles, por favor acepta los permisos de ubicación e intenta nuevamente',
    'store/checkoutless.location.notSuported':
      'Geolocalización no soportada en su navegador, por favor actualicelo',
    'store/checkoutless.location.denied':
      'Acceso a la ubicación denegado, para usar esta funcionalidad debe cambiar los permisos del navegador',
    'store/checkoutless.location.generalError':
      'Ocurrió un error obteniendo la ubicación del navegador, por favor intente de nuevo luego',
    'store/checkoutless.location.zeroResults':
      'No se encontraron resultados para tu ubicación actual, por favor ingresa la dirección manualmente',
    'store/checkoutless.location.imgText': 'Estamos actualizando tu ubicación',
    'store/checkoutless.location.userLocation': 'Usar mi ubicación actual',
    'store/checkoutless.location.EnterCity':
      'Ingresa la ciudad donde vas a recibir tu pedido',
    'store/checkoutless.card.securityCode': 'Código de seguridad',
    'store/checkoutless.next': 'Continuar',
    'store/checkoutless.card.cvcInfo':
      'Corresponde a los 3 o 4 dígitos ubicados en la parte posterior de tu tarjeta.',
    'store/checkoutless.validateItems.text':
      'Los siguientes productos no están disponibles para pagar por nuestra plataforma',
    'store/checkoutless.validateItems.description':
      'Para continuar puedes eliminarlos o puedes realizar tu compra desde el checkout',
    'store/checkoutless.validateItems.deleteAndContinue':
      'Eliminar y continuar',
    'store/checkoutless.validateItems.checkout': 'Ir a checkout',
    'store/checkoutless.multiplePackages.text':
      'Tu pedido ha sido dividido en varias entregas',
    'store/checkoutless.multiplePackages.description':
      'Para continuar con tu compra debes dirigirte al checkout',
    'store/checkoutless.coupon': 'Código de descuento',
    'store/checkoutless.coupon.action': 'Aplicar',
    'store/checkoutless.coupon.textInput': 'Tengo un código de descuento',
    'store/checkoutless.coupon.error':
      'Cupón no válido, por favor vuelve a ingresarlo',
    'store/checkoutless.coupon.success': 'Tu cupón se agregó con éxito',
    'store/checkoutless.attachment.add': 'Agregar',
    'store/checkoutless.skuSelector.close': 'Agregar y seguir comprando',
    'store/checkoutless.emptyCart.emptyOrder': 'Tu orden está vacía',
    'store/checkoutless.emptyCart.message':
      'Tu orden está vacía, continúa con tu compra',
    'store/checkoutless.emptyCart.messageDeskopt':
      'Por favor continua en la tienda con tu compra',
    'store/checkoutless.userInfo.close': 'Seguir comprando',
    'store/quota.productdetails.quotainformation':
      'Compra ahora y paga después con {store} en {quotas} mensuales de {value}',
    'store/quota.modal.quotainformation.description':
      'Compra ahora y paga después con {store} en cuotas libres de interés.',
    'store/quota.modal.quotainformation.instruction-1':
      'Antójate y selecciona tu producto favorito.',
    'store/quota.modal.quotainformation.instruction-2':
      'Selecciona comprar ahora y pagar después con ORION.',
    'store/quota.modal.quotainformation.instruction-3':
      'Tu compra se distribuirá en cuotas de igual valor, dependiendo del monto final comprado sin intereses.',
    'store/quota.modal.quotainformation.instruction-4':
      'Tendrás multiples opciones para pagar. Tu primera cuota será cargada el día de despacho del producto y las siguientes en cuotas mensuales.',
    'store/checkoutless.security': 'Compra 100% segura',
    'store/checkoutless.user.sorry': '¡ LO SENTIMOS !',
    'store/checkoutless.user.error':
      'Ha ocurrido un error al cargar la información, por favor vuleve a intentarlo',
    'store/checkoutless.user.error.retry': 'Intentar nuevamente',
    'store/checkoutless.user.userEditedMessageHeader':
      'Editaste tus datos con éxito',
    'store/checkoutless.user.userEditedMessageText':
      'Ahora puedes continuar con tu pago 100% seguro',
    'store/checkoutless.user.addressEditedMessageHeader':
      'Editaste tu dirección de domicilio correctamente',
    'store/checkoutless.user.addressEditedMessageText':
      'Ahora puedes continuar con tu pago 100% seguro',
    'store/checkoutless.alert.selectionOfVariations':
      'Por favor elige las preferencias de tu producto para continuar con tu compra',
    'store/checkoutless.user.addAddresInfo': 'Ingresa tu dirección',
    'store/checkoutless.user.addPaymentInfo': 'Selecciona tipo de pago',
    'store/checkoutless.loading.almostThere':
      'Falta poco para finalizar tu compra',
    'store/checkoutless.textAlertCvv':
      'Por favor ingresa el código CVV para continuar con tu pago',
    'store/checkoutless.descriptionAlertCvv':
      'Termina de completar tus datos de pago y continúa con el pago 100% seguro',
  },
}
