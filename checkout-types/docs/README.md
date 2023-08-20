[libraryNameWithSpacesAndUpperCases]

# [libraryNameWithSpacesAndUpperCases]

## Table of contents

### Type aliases

- [AddedOptionItem](README.md#addedoptionitem)
- [Address](README.md#address)
- [AddressInput](README.md#addressinput)
- [AddressType](README.md#addresstype)
- [AssemblyOptionInput](README.md#assemblyoptioninput)
- [AssemblyOptionItem](README.md#assemblyoptionitem)
- [AssemblyOptionType](README.md#assemblyoptiontype)
- [Attachment](README.md#attachment)
- [AttachmentOffering](README.md#attachmentoffering)
- [AvailableAccount](README.md#availableaccount)
- [BundleItemAttachmentInput](README.md#bundleitemattachmentinput)
- [BusinessHour](README.md#businesshour)
- [CheckoutProfile](README.md#checkoutprofile)
- [ClientData](README.md#clientdata)
- [ClientPreferencesData](README.md#clientpreferencesdata)
- [ClientPreferencesDataInput](README.md#clientpreferencesdatainput)
- [CompositionItem](README.md#compositionitem)
- [Coupon](README.md#coupon)
- [CurrencyFormatInfo](README.md#currencyformatinfo)
- [DeliveryOption](README.md#deliveryoption)
- [Exact](README.md#exact)
- [ImageUrls](README.md#imageurls)
- [Installment](README.md#installment)
- [InstallmentOption](README.md#installmentoption)
- [Item](README.md#item)
- [ItemAdditionalInfo](README.md#itemadditionalinfo)
- [ItemInput](README.md#iteminput)
- [ItemsOrdinationCriteria](README.md#itemsordinationcriteria)
- [ManualPriceInput](README.md#manualpriceinput)
- [MarketingData](README.md#marketingdata)
- [MarketingDataInput](README.md#marketingdatainput)
- [Maybe](README.md#maybe)
- [Message](README.md#message)
- [Offering](README.md#offering)
- [OfferingInput](README.md#offeringinput)
- [OpenTextField](README.md#opentextfield)
- [OrderForm](README.md#orderform)
- [OrderFormMessages](README.md#orderformmessages)
- [OrderFormOpenTextInput](README.md#orderformopentextinput)
- [Payment](README.md#payment)
- [PaymentData](README.md#paymentdata)
- [PaymentDataInput](README.md#paymentdatainput)
- [PaymentInput](README.md#paymentinput)
- [PaymentSystem](README.md#paymentsystem)
- [PaymentToken](README.md#paymenttoken)
- [PickupOption](README.md#pickupoption)
- [PriceTag](README.md#pricetag)
- [RatesAndBenefitsIdentifier](README.md#ratesandbenefitsidentifier)
- [RemovedOptionItem](README.md#removedoptionitem)
- [SavePaymentTokenPayload](README.md#savepaymenttokenpayload)
- [Scalars](README.md#scalars)
- [Shipping](README.md#shipping)
- [ShippingItem](README.md#shippingitem)
- [SkuSpecification](README.md#skuspecification)
- [StorePreferencesData](README.md#storepreferencesdata)
- [Totalizer](README.md#totalizer)
- [UserProfile](README.md#userprofile)
- [UserProfileInput](README.md#userprofileinput)
- [UserType](README.md#usertype)
- [Validator](README.md#validator)

## Type aliases

### AddedOptionItem

Ƭ **AddedOptionItem**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `__typename?` | ``"AddedOptionItem"`` |
| `choiceType?` | [`Maybe`](README.md#maybe)<[`Scalars`](README.md#scalars)[``"String"``]\> |
| `compositionItem?` | [`Maybe`](README.md#maybe)<[`CompositionItem`](README.md#compositionitem)\> |
| `extraQuantity?` | [`Maybe`](README.md#maybe)<[`Scalars`](README.md#scalars)[``"Int"``]\> |
| `item?` | [`Maybe`](README.md#maybe)<[`Item`](README.md#item)\> |
| `normalizedQuantity?` | [`Maybe`](README.md#maybe)<[`Scalars`](README.md#scalars)[``"Int"``]\> |

#### Defined in

[index.ts:25](https://github.com/vtex/checkout-types/blob/b53e8fb/src/index.ts#L25)

___

### Address

Ƭ **Address**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `__typename?` | ``"Address"`` |
| `addressId?` | [`Maybe`](README.md#maybe)<[`Scalars`](README.md#scalars)[``"ID"``]\> |
| `addressType?` | [`Maybe`](README.md#maybe)<[`AddressType`](README.md#addresstype)\> |
| `city?` | [`Maybe`](README.md#maybe)<[`Scalars`](README.md#scalars)[``"String"``]\> |
| `complement?` | [`Maybe`](README.md#maybe)<[`Scalars`](README.md#scalars)[``"String"``]\> |
| `country?` | [`Maybe`](README.md#maybe)<[`Scalars`](README.md#scalars)[``"String"``]\> |
| `geoCoordinates?` | [`Maybe`](README.md#maybe)<[`Maybe`](README.md#maybe)<[`Scalars`](README.md#scalars)[``"Float"``]\>[]\> |
| `isDisposable?` | [`Maybe`](README.md#maybe)<[`Scalars`](README.md#scalars)[``"Boolean"``]\> |
| `neighborhood?` | [`Maybe`](README.md#maybe)<[`Scalars`](README.md#scalars)[``"String"``]\> |
| `number?` | [`Maybe`](README.md#maybe)<[`Scalars`](README.md#scalars)[``"String"``]\> |
| `postalCode?` | [`Maybe`](README.md#maybe)<[`Scalars`](README.md#scalars)[``"String"``]\> |
| `receiverName?` | [`Maybe`](README.md#maybe)<[`Scalars`](README.md#scalars)[``"String"``]\> |
| `reference?` | [`Maybe`](README.md#maybe)<[`Scalars`](README.md#scalars)[``"String"``]\> |
| `state?` | [`Maybe`](README.md#maybe)<[`Scalars`](README.md#scalars)[``"String"``]\> |
| `street?` | [`Maybe`](README.md#maybe)<[`Scalars`](README.md#scalars)[``"String"``]\> |

#### Defined in

[index.ts:34](https://github.com/vtex/checkout-types/blob/b53e8fb/src/index.ts#L34)

___

### AddressInput

Ƭ **AddressInput**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `addressId?` | [`Maybe`](README.md#maybe)<[`Scalars`](README.md#scalars)[``"ID"``]\> |
| `addressQuery?` | [`Maybe`](README.md#maybe)<[`Scalars`](README.md#scalars)[``"String"``]\> |
| `addressType?` | [`Maybe`](README.md#maybe)<[`AddressType`](README.md#addresstype)\> |
| `city?` | [`Maybe`](README.md#maybe)<[`Scalars`](README.md#scalars)[``"String"``]\> |
| `complement?` | [`Maybe`](README.md#maybe)<[`Scalars`](README.md#scalars)[``"String"``]\> |
| `country?` | [`Maybe`](README.md#maybe)<[`Scalars`](README.md#scalars)[``"String"``]\> |
| `geoCoordinates?` | [`Maybe`](README.md#maybe)<[`Maybe`](README.md#maybe)<[`Scalars`](README.md#scalars)[``"Float"``]\>[]\> |
| `isDisposable?` | [`Maybe`](README.md#maybe)<[`Scalars`](README.md#scalars)[``"Boolean"``]\> |
| `neighborhood?` | [`Maybe`](README.md#maybe)<[`Scalars`](README.md#scalars)[``"String"``]\> |
| `number?` | [`Maybe`](README.md#maybe)<[`Scalars`](README.md#scalars)[``"String"``]\> |
| `postalCode?` | [`Maybe`](README.md#maybe)<[`Scalars`](README.md#scalars)[``"String"``]\> |
| `receiverName?` | [`Maybe`](README.md#maybe)<[`Scalars`](README.md#scalars)[``"String"``]\> |
| `reference?` | [`Maybe`](README.md#maybe)<[`Scalars`](README.md#scalars)[``"String"``]\> |
| `state?` | [`Maybe`](README.md#maybe)<[`Scalars`](README.md#scalars)[``"String"``]\> |
| `street?` | [`Maybe`](README.md#maybe)<[`Scalars`](README.md#scalars)[``"String"``]\> |

#### Defined in

[index.ts:52](https://github.com/vtex/checkout-types/blob/b53e8fb/src/index.ts#L52)

___

### AddressType

Ƭ **AddressType**: ``"residential"`` \| ``"commercial"`` \| ``"inStore"`` \| ``"giftRegistry"`` \| ``"pickup"`` \| ``"search"``

#### Defined in

[index.ts:70](https://github.com/vtex/checkout-types/blob/b53e8fb/src/index.ts#L70)

___

### AssemblyOptionInput

Ƭ **AssemblyOptionInput**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `assemblyId` | [`Scalars`](README.md#scalars)[``"String"``] |
| `id?` | [`Maybe`](README.md#maybe)<[`Scalars`](README.md#scalars)[``"ID"``]\> |
| `inputValues?` | [`Maybe`](README.md#maybe)<[`Scalars`](README.md#scalars)[``"InputValues"``]\> |
| `options?` | [`Maybe`](README.md#maybe)<[`AssemblyOptionInput`](README.md#assemblyoptioninput)[]\> |
| `quantity?` | [`Maybe`](README.md#maybe)<[`Scalars`](README.md#scalars)[``"Int"``]\> |
| `seller?` | [`Maybe`](README.md#maybe)<[`Scalars`](README.md#scalars)[``"String"``]\> |

#### Defined in

[index.ts:78](https://github.com/vtex/checkout-types/blob/b53e8fb/src/index.ts#L78)

___

### AssemblyOptionItem

Ƭ **AssemblyOptionItem**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `__typename?` | ``"AssemblyOptionItem"`` |
| `added` | [`Maybe`](README.md#maybe)<[`AddedOptionItem`](README.md#addedoptionitem)\>[] |
| `parentPrice?` | [`Maybe`](README.md#maybe)<[`Scalars`](README.md#scalars)[``"Float"``]\> |
| `removed` | [`Maybe`](README.md#maybe)<[`RemovedOptionItem`](README.md#removedoptionitem)\>[] |

#### Defined in

[index.ts:87](https://github.com/vtex/checkout-types/blob/b53e8fb/src/index.ts#L87)

___

### AssemblyOptionType

Ƭ **AssemblyOptionType**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `__typename?` | ``"AssemblyOptionType"`` |
| `assemblyId` | [`Scalars`](README.md#scalars)[``"String"``] |
| `id?` | [`Maybe`](README.md#maybe)<[`Scalars`](README.md#scalars)[``"ID"``]\> |
| `inputValues?` | [`Maybe`](README.md#maybe)<[`Scalars`](README.md#scalars)[``"InputValues"``]\> |
| `options?` | [`Maybe`](README.md#maybe)<[`AssemblyOptionType`](README.md#assemblyoptiontype)[]\> |
| `quantity?` | [`Maybe`](README.md#maybe)<[`Scalars`](README.md#scalars)[``"Int"``]\> |
| `seller?` | [`Maybe`](README.md#maybe)<[`Scalars`](README.md#scalars)[``"String"``]\> |

#### Defined in

[index.ts:94](https://github.com/vtex/checkout-types/blob/b53e8fb/src/index.ts#L94)

___

### Attachment

Ƭ **Attachment**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `__typename?` | ``"Attachment"`` |
| `content?` | [`Maybe`](README.md#maybe)<[`Scalars`](README.md#scalars)[``"AttachmentContent"``]\> |
| `name?` | [`Maybe`](README.md#maybe)<[`Scalars`](README.md#scalars)[``"String"``]\> |

#### Defined in

[index.ts:104](https://github.com/vtex/checkout-types/blob/b53e8fb/src/index.ts#L104)

___

### AttachmentOffering

Ƭ **AttachmentOffering**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `__typename?` | ``"AttachmentOffering"`` |
| `name?` | [`Maybe`](README.md#maybe)<[`Scalars`](README.md#scalars)[``"String"``]\> |
| `required?` | [`Maybe`](README.md#maybe)<[`Scalars`](README.md#scalars)[``"Boolean"``]\> |
| `schema?` | [`Maybe`](README.md#maybe)<[`Scalars`](README.md#scalars)[``"AttachmentSchema"``]\> |

#### Defined in

[index.ts:110](https://github.com/vtex/checkout-types/blob/b53e8fb/src/index.ts#L110)

___

### AvailableAccount

Ƭ **AvailableAccount**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `__typename?` | ``"AvailableAccount"`` |
| `accountId` | [`Scalars`](README.md#scalars)[``"String"``] |
| `bin` | [`Scalars`](README.md#scalars)[``"String"``] |
| `cardNumber` | [`Scalars`](README.md#scalars)[``"String"``] |
| `paymentSystem` | [`Scalars`](README.md#scalars)[``"String"``] |
| `paymentSystemName` | [`Scalars`](README.md#scalars)[``"String"``] |

#### Defined in

[index.ts:117](https://github.com/vtex/checkout-types/blob/b53e8fb/src/index.ts#L117)

___

### BundleItemAttachmentInput

Ƭ **BundleItemAttachmentInput**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `attachmentContent` | [`Scalars`](README.md#scalars)[``"AttachmentContent"``] |
| `attachmentName` | [`Scalars`](README.md#scalars)[``"String"``] |
| `bundleItemId` | [`Scalars`](README.md#scalars)[``"String"``] |
| `itemIndex` | [`Scalars`](README.md#scalars)[``"Int"``] |

#### Defined in

[index.ts:126](https://github.com/vtex/checkout-types/blob/b53e8fb/src/index.ts#L126)

___

### BusinessHour

Ƭ **BusinessHour**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `__typename?` | ``"BusinessHour"`` |
| `closed` | [`Scalars`](README.md#scalars)[``"Boolean"``] |
| `closingTime` | [`Scalars`](README.md#scalars)[``"String"``] |
| `dayNumber` | [`Scalars`](README.md#scalars)[``"String"``] |
| `openingTime` | [`Scalars`](README.md#scalars)[``"String"``] |

#### Defined in

[index.ts:133](https://github.com/vtex/checkout-types/blob/b53e8fb/src/index.ts#L133)

___

### CheckoutProfile

Ƭ **CheckoutProfile**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `__typename?` | ``"CheckoutProfile"`` |
| `availableAccounts` | [`AvailableAccount`](README.md#availableaccount)[] |
| `availableAddresses` | [`Address`](README.md#address)[] |
| `profileProvider?` | [`Maybe`](README.md#maybe)<[`Scalars`](README.md#scalars)[``"String"``]\> |
| `userProfile?` | [`Maybe`](README.md#maybe)<[`UserProfile`](README.md#userprofile)\> |
| `userProfileId?` | [`Maybe`](README.md#maybe)<[`Scalars`](README.md#scalars)[``"String"``]\> |

#### Defined in

[index.ts:141](https://github.com/vtex/checkout-types/blob/b53e8fb/src/index.ts#L141)

___

### ClientData

Ƭ **ClientData**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `__typename?` | ``"ClientData"`` |
| `corporateDocument?` | [`Maybe`](README.md#maybe)<[`Scalars`](README.md#scalars)[``"String"``]\> |
| `corporateName?` | [`Maybe`](README.md#maybe)<[`Scalars`](README.md#scalars)[``"String"``]\> |
| `corporatePhone?` | [`Maybe`](README.md#maybe)<[`Scalars`](README.md#scalars)[``"String"``]\> |
| `customerClass?` | [`Maybe`](README.md#maybe)<[`Scalars`](README.md#scalars)[``"String"``]\> |
| `document?` | [`Maybe`](README.md#maybe)<[`Scalars`](README.md#scalars)[``"String"``]\> |
| `documentType?` | [`Maybe`](README.md#maybe)<[`Scalars`](README.md#scalars)[``"String"``]\> |
| `email?` | [`Maybe`](README.md#maybe)<[`Scalars`](README.md#scalars)[``"String"``]\> |
| `firstName?` | [`Maybe`](README.md#maybe)<[`Scalars`](README.md#scalars)[``"String"``]\> |
| `isCorporate?` | [`Maybe`](README.md#maybe)<[`Scalars`](README.md#scalars)[``"Boolean"``]\> |
| `isValid` | [`Scalars`](README.md#scalars)[``"Boolean"``] |
| `lastName?` | [`Maybe`](README.md#maybe)<[`Scalars`](README.md#scalars)[``"String"``]\> |
| `phone?` | [`Maybe`](README.md#maybe)<[`Scalars`](README.md#scalars)[``"String"``]\> |
| `profileCompleteOnLoading?` | [`Maybe`](README.md#maybe)<[`Scalars`](README.md#scalars)[``"Boolean"``]\> |
| `profileErrorOnLoading?` | [`Maybe`](README.md#maybe)<[`Scalars`](README.md#scalars)[``"Boolean"``]\> |
| `stateInscription?` | [`Maybe`](README.md#maybe)<[`Scalars`](README.md#scalars)[``"String"``]\> |
| `tradeName?` | [`Maybe`](README.md#maybe)<[`Scalars`](README.md#scalars)[``"String"``]\> |

#### Defined in

[index.ts:150](https://github.com/vtex/checkout-types/blob/b53e8fb/src/index.ts#L150)

___

### ClientPreferencesData

Ƭ **ClientPreferencesData**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `__typename?` | ``"ClientPreferencesData"`` |
| `locale?` | [`Maybe`](README.md#maybe)<[`Scalars`](README.md#scalars)[``"String"``]\> |
| `optInNewsletter?` | [`Maybe`](README.md#maybe)<[`Scalars`](README.md#scalars)[``"Boolean"``]\> |

#### Defined in

[index.ts:170](https://github.com/vtex/checkout-types/blob/b53e8fb/src/index.ts#L170)

___

### ClientPreferencesDataInput

Ƭ **ClientPreferencesDataInput**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `locale?` | [`Maybe`](README.md#maybe)<[`Scalars`](README.md#scalars)[``"String"``]\> |
| `optInNewsletter?` | [`Maybe`](README.md#maybe)<[`Scalars`](README.md#scalars)[``"Boolean"``]\> |

#### Defined in

[index.ts:176](https://github.com/vtex/checkout-types/blob/b53e8fb/src/index.ts#L176)

___

### CompositionItem

Ƭ **CompositionItem**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `__typename?` | ``"CompositionItem"`` |
| `id?` | [`Maybe`](README.md#maybe)<[`Scalars`](README.md#scalars)[``"ID"``]\> |
| `initialQuantity?` | [`Maybe`](README.md#maybe)<[`Scalars`](README.md#scalars)[``"Int"``]\> |
| `maxQuantity?` | [`Maybe`](README.md#maybe)<[`Scalars`](README.md#scalars)[``"Int"``]\> |
| `minQuantity?` | [`Maybe`](README.md#maybe)<[`Scalars`](README.md#scalars)[``"Int"``]\> |
| `priceTable?` | [`Maybe`](README.md#maybe)<[`Scalars`](README.md#scalars)[``"String"``]\> |
| `seller?` | [`Maybe`](README.md#maybe)<[`Scalars`](README.md#scalars)[``"String"``]\> |

#### Defined in

[index.ts:181](https://github.com/vtex/checkout-types/blob/b53e8fb/src/index.ts#L181)

___

### Coupon

Ƭ **Coupon**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `__typename?` | ``"Coupon"`` |
| `code?` | [`Maybe`](README.md#maybe)<[`Scalars`](README.md#scalars)[``"String"``]\> |

#### Defined in

[index.ts:191](https://github.com/vtex/checkout-types/blob/b53e8fb/src/index.ts#L191)

___

### CurrencyFormatInfo

Ƭ **CurrencyFormatInfo**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `__typename?` | ``"CurrencyFormatInfo"`` |
| `currencyDecimalDigits?` | [`Maybe`](README.md#maybe)<[`Scalars`](README.md#scalars)[``"Int"``]\> |
| `currencyDecimalSeparator?` | [`Maybe`](README.md#maybe)<[`Scalars`](README.md#scalars)[``"String"``]\> |
| `currencyGroupSeparator?` | [`Maybe`](README.md#maybe)<[`Scalars`](README.md#scalars)[``"String"``]\> |
| `startsWithCurrencySymbol?` | [`Maybe`](README.md#maybe)<[`Scalars`](README.md#scalars)[``"Boolean"``]\> |

#### Defined in

[index.ts:196](https://github.com/vtex/checkout-types/blob/b53e8fb/src/index.ts#L196)

___

### DeliveryOption

Ƭ **DeliveryOption**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `__typename?` | ``"DeliveryOption"`` |
| `deliveryChannel` | [`Scalars`](README.md#scalars)[``"String"``] |
| `estimate` | [`Scalars`](README.md#scalars)[``"String"``] |
| `id` | [`Scalars`](README.md#scalars)[``"String"``] |
| `isSelected` | [`Scalars`](README.md#scalars)[``"Boolean"``] |
| `price` | [`Scalars`](README.md#scalars)[``"Int"``] |

#### Defined in

[index.ts:204](https://github.com/vtex/checkout-types/blob/b53e8fb/src/index.ts#L204)

___

### Exact

Ƭ **Exact**<`T`\>: { [K in keyof T]: T[K] }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `Object` |

#### Defined in

[index.ts:2](https://github.com/vtex/checkout-types/blob/b53e8fb/src/index.ts#L2)

___

### ImageUrls

Ƭ **ImageUrls**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `__typename?` | ``"ImageUrls"`` |
| `at1x` | [`Scalars`](README.md#scalars)[``"String"``] |
| `at2x` | [`Scalars`](README.md#scalars)[``"String"``] |
| `at3x` | [`Scalars`](README.md#scalars)[``"String"``] |

#### Defined in

[index.ts:213](https://github.com/vtex/checkout-types/blob/b53e8fb/src/index.ts#L213)

___

### Installment

Ƭ **Installment**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `__typename?` | ``"Installment"`` |
| `count` | [`Scalars`](README.md#scalars)[``"Int"``] |
| `hasInterestRate?` | [`Maybe`](README.md#maybe)<[`Scalars`](README.md#scalars)[``"Boolean"``]\> |
| `interestRate?` | [`Maybe`](README.md#maybe)<[`Scalars`](README.md#scalars)[``"Int"``]\> |
| `total` | [`Scalars`](README.md#scalars)[``"Float"``] |
| `value?` | [`Maybe`](README.md#maybe)<[`Scalars`](README.md#scalars)[``"Float"``]\> |

#### Defined in

[index.ts:220](https://github.com/vtex/checkout-types/blob/b53e8fb/src/index.ts#L220)

___

### InstallmentOption

Ƭ **InstallmentOption**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `__typename?` | ``"InstallmentOption"`` |
| `bin?` | [`Maybe`](README.md#maybe)<[`Scalars`](README.md#scalars)[``"String"``]\> |
| `installments` | [`Installment`](README.md#installment)[] |
| `paymentGroupName?` | [`Maybe`](README.md#maybe)<[`Scalars`](README.md#scalars)[``"String"``]\> |
| `paymentName?` | [`Maybe`](README.md#maybe)<[`Scalars`](README.md#scalars)[``"String"``]\> |
| `paymentSystem` | [`Scalars`](README.md#scalars)[``"String"``] |
| `value` | [`Scalars`](README.md#scalars)[``"Float"``] |

#### Defined in

[index.ts:229](https://github.com/vtex/checkout-types/blob/b53e8fb/src/index.ts#L229)

___

### Item

Ƭ **Item**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `__typename?` | ``"Item"`` | - |
| `additionalInfo?` | [`Maybe`](README.md#maybe)<[`ItemAdditionalInfo`](README.md#itemadditionalinfo)\> | - |
| `assemblyOptions?` | [`Maybe`](README.md#maybe)<[`AssemblyOptionItem`](README.md#assemblyoptionitem)\> | - |
| `attachmentOfferings` | [`AttachmentOffering`](README.md#attachmentoffering)[] | - |
| `attachments` | [`Attachment`](README.md#attachment)[] | - |
| `availability?` | [`Maybe`](README.md#maybe)<[`Scalars`](README.md#scalars)[``"String"``]\> | - |
| `bundleItems` | [`Item`](README.md#item)[] | - |
| `detailUrl?` | [`Maybe`](README.md#maybe)<[`Scalars`](README.md#scalars)[``"String"``]\> | - |
| `id` | [`Scalars`](README.md#scalars)[``"ID"``] | - |
| `imageUrls?` | [`Maybe`](README.md#maybe)<[`ImageUrls`](README.md#imageurls)\> | - |
| `listPrice?` | [`Maybe`](README.md#maybe)<[`Scalars`](README.md#scalars)[``"Float"``]\> | - |
| `manualPrice?` | [`Maybe`](README.md#maybe)<[`Scalars`](README.md#scalars)[``"Float"``]\> | - |
| `measurementUnit?` | [`Maybe`](README.md#maybe)<[`Scalars`](README.md#scalars)[``"String"``]\> | - |
| `name?` | [`Maybe`](README.md#maybe)<[`Scalars`](README.md#scalars)[``"String"``]\> | - |
| `offerings` | [`Offering`](README.md#offering)[] | - |
| `options?` | [`Maybe`](README.md#maybe)<[`Maybe`](README.md#maybe)<[`AssemblyOptionType`](README.md#assemblyoptiontype)\>[]\> | - |
| `parentAssemblyBinding?` | [`Maybe`](README.md#maybe)<[`Scalars`](README.md#scalars)[``"String"``]\> | - |
| `parentItemIndex?` | [`Maybe`](README.md#maybe)<[`Scalars`](README.md#scalars)[``"Int"``]\> | - |
| `price?` | [`Maybe`](README.md#maybe)<[`Scalars`](README.md#scalars)[``"Float"``]\> | - |
| `priceTags` | [`PriceTag`](README.md#pricetag)[] | - |
| `productCategories?` | [`Maybe`](README.md#maybe)<[`Scalars`](README.md#scalars)[``"ProductCategoriesObject"``]\> | - |
| `productCategoryIds?` | [`Maybe`](README.md#maybe)<[`Scalars`](README.md#scalars)[``"String"``]\> | - |
| `productId?` | [`Maybe`](README.md#maybe)<[`Scalars`](README.md#scalars)[``"String"``]\> | Id of the product. Can be null if included inside bundle items. |
| `productRefId?` | [`Maybe`](README.md#maybe)<[`Scalars`](README.md#scalars)[``"String"``]\> | - |
| `quantity` | [`Scalars`](README.md#scalars)[``"Float"``] | - |
| `refId?` | [`Maybe`](README.md#maybe)<[`Scalars`](README.md#scalars)[``"String"``]\> | - |
| `seller?` | [`Maybe`](README.md#maybe)<[`Scalars`](README.md#scalars)[``"String"``]\> | Product's seller. Can be null if included inside bundle items. |
| `sellingPrice?` | [`Maybe`](README.md#maybe)<[`Scalars`](README.md#scalars)[``"Float"``]\> | - |
| `sellingPriceWithAssemblies?` | [`Maybe`](README.md#maybe)<[`Scalars`](README.md#scalars)[``"Float"``]\> | - |
| `skuName?` | [`Maybe`](README.md#maybe)<[`Scalars`](README.md#scalars)[``"String"``]\> | - |
| `skuSpecifications` | [`SkuSpecification`](README.md#skuspecification)[] | - |
| `uniqueId` | [`Scalars`](README.md#scalars)[``"String"``] | - |
| `unitMultiplier?` | [`Maybe`](README.md#maybe)<[`Scalars`](README.md#scalars)[``"Float"``]\> | - |

#### Defined in

[index.ts:239](https://github.com/vtex/checkout-types/blob/b53e8fb/src/index.ts#L239)

___

### ItemAdditionalInfo

Ƭ **ItemAdditionalInfo**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `__typename?` | ``"ItemAdditionalInfo"`` |
| `brandName?` | [`Maybe`](README.md#maybe)<[`Scalars`](README.md#scalars)[``"String"``]\> |

#### Defined in

[index.ts:277](https://github.com/vtex/checkout-types/blob/b53e8fb/src/index.ts#L277)

___

### ItemInput

Ƭ **ItemInput**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `id?` | [`Maybe`](README.md#maybe)<[`Scalars`](README.md#scalars)[``"Int"``]\> |
| `index?` | [`Maybe`](README.md#maybe)<[`Scalars`](README.md#scalars)[``"Int"``]\> |
| `inputValues?` | [`Maybe`](README.md#maybe)<[`Scalars`](README.md#scalars)[``"InputValues"``]\> |
| `options?` | [`Maybe`](README.md#maybe)<[`Maybe`](README.md#maybe)<[`AssemblyOptionInput`](README.md#assemblyoptioninput)\>[]\> |
| `quantity?` | [`Maybe`](README.md#maybe)<[`Scalars`](README.md#scalars)[``"Float"``]\> |
| `seller?` | [`Maybe`](README.md#maybe)<[`Scalars`](README.md#scalars)[``"ID"``]\> |
| `uniqueId?` | [`Maybe`](README.md#maybe)<[`Scalars`](README.md#scalars)[``"String"``]\> |

#### Defined in

[index.ts:282](https://github.com/vtex/checkout-types/blob/b53e8fb/src/index.ts#L282)

___

### ItemsOrdinationCriteria

Ƭ **ItemsOrdinationCriteria**: ``"name"`` \| ``"add_time"``

#### Defined in

[index.ts:292](https://github.com/vtex/checkout-types/blob/b53e8fb/src/index.ts#L292)

___

### ManualPriceInput

Ƭ **ManualPriceInput**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `itemIndex` | [`Scalars`](README.md#scalars)[``"Int"``] |
| `price` | [`Scalars`](README.md#scalars)[``"Float"``] |

#### Defined in

[index.ts:294](https://github.com/vtex/checkout-types/blob/b53e8fb/src/index.ts#L294)

___

### MarketingData

Ƭ **MarketingData**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `__typename?` | ``"MarketingData"`` |
| `coupon?` | [`Maybe`](README.md#maybe)<[`Scalars`](README.md#scalars)[``"String"``]\> |
| `marketingTags?` | [`Maybe`](README.md#maybe)<[`Scalars`](README.md#scalars)[``"String"``][]\> |
| `utmCampaign?` | [`Maybe`](README.md#maybe)<[`Scalars`](README.md#scalars)[``"String"``]\> |
| `utmMedium?` | [`Maybe`](README.md#maybe)<[`Scalars`](README.md#scalars)[``"String"``]\> |
| `utmSource?` | [`Maybe`](README.md#maybe)<[`Scalars`](README.md#scalars)[``"String"``]\> |
| `utmiCampaign?` | [`Maybe`](README.md#maybe)<[`Scalars`](README.md#scalars)[``"String"``]\> |
| `utmiPage?` | [`Maybe`](README.md#maybe)<[`Scalars`](README.md#scalars)[``"String"``]\> |
| `utmiPart?` | [`Maybe`](README.md#maybe)<[`Scalars`](README.md#scalars)[``"String"``]\> |

#### Defined in

[index.ts:299](https://github.com/vtex/checkout-types/blob/b53e8fb/src/index.ts#L299)

___

### MarketingDataInput

Ƭ **MarketingDataInput**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `coupon?` | [`Maybe`](README.md#maybe)<[`Scalars`](README.md#scalars)[``"String"``]\> |
| `marketingTags?` | [`Maybe`](README.md#maybe)<[`Scalars`](README.md#scalars)[``"String"``][]\> |
| `utmCampaign?` | [`Maybe`](README.md#maybe)<[`Scalars`](README.md#scalars)[``"String"``]\> |
| `utmMedium?` | [`Maybe`](README.md#maybe)<[`Scalars`](README.md#scalars)[``"String"``]\> |
| `utmSource?` | [`Maybe`](README.md#maybe)<[`Scalars`](README.md#scalars)[``"String"``]\> |
| `utmiCampaign?` | [`Maybe`](README.md#maybe)<[`Scalars`](README.md#scalars)[``"String"``]\> |
| `utmiPage?` | [`Maybe`](README.md#maybe)<[`Scalars`](README.md#scalars)[``"String"``]\> |
| `utmiPart?` | [`Maybe`](README.md#maybe)<[`Scalars`](README.md#scalars)[``"String"``]\> |

#### Defined in

[index.ts:311](https://github.com/vtex/checkout-types/blob/b53e8fb/src/index.ts#L311)

___

### Maybe

Ƭ **Maybe**<`T`\>: `T` \| ``null``

#### Type parameters

| Name |
| :------ |
| `T` |

#### Defined in

[index.ts:1](https://github.com/vtex/checkout-types/blob/b53e8fb/src/index.ts#L1)

___

### Message

Ƭ **Message**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `__typename?` | ``"Message"`` |
| `code?` | [`Maybe`](README.md#maybe)<[`Scalars`](README.md#scalars)[``"String"``]\> |
| `status?` | [`Maybe`](README.md#maybe)<[`Scalars`](README.md#scalars)[``"String"``]\> |
| `text?` | [`Maybe`](README.md#maybe)<[`Scalars`](README.md#scalars)[``"String"``]\> |

#### Defined in

[index.ts:322](https://github.com/vtex/checkout-types/blob/b53e8fb/src/index.ts#L322)

___

### Offering

Ƭ **Offering**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `__typename?` | ``"Offering"`` |
| `attachmentOfferings` | [`AttachmentOffering`](README.md#attachmentoffering)[] |
| `id` | [`Scalars`](README.md#scalars)[``"String"``] |
| `name` | [`Scalars`](README.md#scalars)[``"String"``] |
| `price` | [`Scalars`](README.md#scalars)[``"Int"``] |
| `type` | [`Scalars`](README.md#scalars)[``"String"``] |

#### Defined in

[index.ts:329](https://github.com/vtex/checkout-types/blob/b53e8fb/src/index.ts#L329)

___

### OfferingInput

Ƭ **OfferingInput**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `itemIndex` | [`Scalars`](README.md#scalars)[``"Int"``] |
| `offeringId` | [`Scalars`](README.md#scalars)[``"String"``] |
| `offeringInfo?` | [`Maybe`](README.md#maybe)<[`Scalars`](README.md#scalars)[``"OfferingInfo"``]\> |

#### Defined in

[index.ts:338](https://github.com/vtex/checkout-types/blob/b53e8fb/src/index.ts#L338)

___

### OpenTextField

Ƭ **OpenTextField**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `__typename?` | ``"OpenTextField"`` |
| `value?` | [`Maybe`](README.md#maybe)<[`Scalars`](README.md#scalars)[``"String"``]\> |

#### Defined in

[index.ts:344](https://github.com/vtex/checkout-types/blob/b53e8fb/src/index.ts#L344)

___

### OrderForm

Ƭ **OrderForm**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `__typename?` | ``"OrderForm"`` |
| `allowManualPrice?` | [`Maybe`](README.md#maybe)<[`Scalars`](README.md#scalars)[``"Boolean"``]\> |
| `canEditData` | [`Scalars`](README.md#scalars)[``"Boolean"``] |
| `clientPreferencesData?` | [`Maybe`](README.md#maybe)<[`ClientPreferencesData`](README.md#clientpreferencesdata)\> |
| `clientProfileData?` | [`Maybe`](README.md#maybe)<[`ClientData`](README.md#clientdata)\> |
| `id` | [`Scalars`](README.md#scalars)[``"ID"``] |
| `items` | [`Item`](README.md#item)[] |
| `loggedIn` | [`Scalars`](README.md#scalars)[``"Boolean"``] |
| `marketingData` | [`MarketingData`](README.md#marketingdata) |
| `messages` | [`OrderFormMessages`](README.md#orderformmessages) |
| `openTextField?` | [`Maybe`](README.md#maybe)<[`OpenTextField`](README.md#opentextfield)\> |
| `paymentData` | [`PaymentData`](README.md#paymentdata) |
| `shipping` | [`Shipping`](README.md#shipping) |
| `storePreferencesData?` | [`Maybe`](README.md#maybe)<[`StorePreferencesData`](README.md#storepreferencesdata)\> |
| `totalizers` | [`Totalizer`](README.md#totalizer)[] |
| `userProfileId?` | [`Maybe`](README.md#maybe)<[`Scalars`](README.md#scalars)[``"String"``]\> |
| `userType?` | [`Maybe`](README.md#maybe)<[`UserType`](README.md#usertype)\> |
| `value` | [`Scalars`](README.md#scalars)[``"Float"``] |

#### Defined in

[index.ts:349](https://github.com/vtex/checkout-types/blob/b53e8fb/src/index.ts#L349)

___

### OrderFormMessages

Ƭ **OrderFormMessages**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `__typename?` | ``"OrderFormMessages"`` |
| `couponMessages` | [`Message`](README.md#message)[] |
| `generalMessages` | [`Message`](README.md#message)[] |

#### Defined in

[index.ts:370](https://github.com/vtex/checkout-types/blob/b53e8fb/src/index.ts#L370)

___

### OrderFormOpenTextInput

Ƭ **OrderFormOpenTextInput**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `value?` | [`Maybe`](README.md#maybe)<[`Scalars`](README.md#scalars)[``"String"``]\> |

#### Defined in

[index.ts:376](https://github.com/vtex/checkout-types/blob/b53e8fb/src/index.ts#L376)

___

### Payment

Ƭ **Payment**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `__typename?` | ``"Payment"`` |
| `accountId?` | [`Maybe`](README.md#maybe)<[`Scalars`](README.md#scalars)[``"String"``]\> |
| `bin?` | [`Maybe`](README.md#maybe)<[`Scalars`](README.md#scalars)[``"String"``]\> |
| `installments?` | [`Maybe`](README.md#maybe)<[`Scalars`](README.md#scalars)[``"Int"``]\> |
| `paymentSystem?` | [`Maybe`](README.md#maybe)<[`Scalars`](README.md#scalars)[``"String"``]\> |
| `referenceValue?` | [`Maybe`](README.md#maybe)<[`Scalars`](README.md#scalars)[``"Float"``]\> |
| `tokenId?` | [`Maybe`](README.md#maybe)<[`Scalars`](README.md#scalars)[``"String"``]\> |
| `value?` | [`Maybe`](README.md#maybe)<[`Scalars`](README.md#scalars)[``"Float"``]\> |

#### Defined in

[index.ts:380](https://github.com/vtex/checkout-types/blob/b53e8fb/src/index.ts#L380)

___

### PaymentData

Ƭ **PaymentData**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `__typename?` | ``"PaymentData"`` |
| `availableAccounts` | [`AvailableAccount`](README.md#availableaccount)[] |
| `installmentOptions` | [`InstallmentOption`](README.md#installmentoption)[] |
| `isValid` | [`Scalars`](README.md#scalars)[``"Boolean"``] |
| `paymentSystems` | [`PaymentSystem`](README.md#paymentsystem)[] |
| `payments` | [`Payment`](README.md#payment)[] |

#### Defined in

[index.ts:391](https://github.com/vtex/checkout-types/blob/b53e8fb/src/index.ts#L391)

___

### PaymentDataInput

Ƭ **PaymentDataInput**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `payments` | [`PaymentInput`](README.md#paymentinput)[] |

#### Defined in

[index.ts:400](https://github.com/vtex/checkout-types/blob/b53e8fb/src/index.ts#L400)

___

### PaymentInput

Ƭ **PaymentInput**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `accountId?` | [`Maybe`](README.md#maybe)<[`Scalars`](README.md#scalars)[``"String"``]\> |
| `bin?` | [`Maybe`](README.md#maybe)<[`Scalars`](README.md#scalars)[``"String"``]\> |
| `hasDefaultBillingAddress?` | [`Maybe`](README.md#maybe)<[`Scalars`](README.md#scalars)[``"Boolean"``]\> |
| `installments?` | [`Maybe`](README.md#maybe)<[`Scalars`](README.md#scalars)[``"Int"``]\> |
| `installmentsInterestRate?` | [`Maybe`](README.md#maybe)<[`Scalars`](README.md#scalars)[``"Int"``]\> |
| `paymentSystem?` | [`Maybe`](README.md#maybe)<[`Scalars`](README.md#scalars)[``"String"``]\> |
| `referenceValue?` | [`Maybe`](README.md#maybe)<[`Scalars`](README.md#scalars)[``"Int"``]\> |
| `tokenId?` | [`Maybe`](README.md#maybe)<[`Scalars`](README.md#scalars)[``"String"``]\> |
| `value?` | [`Maybe`](README.md#maybe)<[`Scalars`](README.md#scalars)[``"Int"``]\> |

#### Defined in

[index.ts:404](https://github.com/vtex/checkout-types/blob/b53e8fb/src/index.ts#L404)

___

### PaymentSystem

Ƭ **PaymentSystem**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `__typename?` | ``"PaymentSystem"`` |
| `description?` | [`Maybe`](README.md#maybe)<[`Scalars`](README.md#scalars)[``"String"``]\> |
| `dueDate?` | [`Maybe`](README.md#maybe)<[`Scalars`](README.md#scalars)[``"String"``]\> |
| `groupName` | [`Scalars`](README.md#scalars)[``"String"``] |
| `id` | [`Scalars`](README.md#scalars)[``"String"``] |
| `isCustom` | [`Scalars`](README.md#scalars)[``"Boolean"``] |
| `name` | [`Scalars`](README.md#scalars)[``"String"``] |
| `requiresAuthentication?` | [`Maybe`](README.md#maybe)<[`Scalars`](README.md#scalars)[``"Boolean"``]\> |
| `requiresDocument` | [`Scalars`](README.md#scalars)[``"Boolean"``] |
| `stringId` | [`Scalars`](README.md#scalars)[``"String"``] |
| `validator?` | [`Maybe`](README.md#maybe)<[`Validator`](README.md#validator)\> |

#### Defined in

[index.ts:416](https://github.com/vtex/checkout-types/blob/b53e8fb/src/index.ts#L416)

___

### PaymentToken

Ƭ **PaymentToken**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `creditCardToken` | [`Scalars`](README.md#scalars)[``"String"``] |
| `paymentSystem` | [`Scalars`](README.md#scalars)[``"String"``] |

#### Defined in

[index.ts:430](https://github.com/vtex/checkout-types/blob/b53e8fb/src/index.ts#L430)

___

### PickupOption

Ƭ **PickupOption**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `__typename?` | ``"PickupOption"`` |
| `additionalInfo?` | [`Maybe`](README.md#maybe)<[`Scalars`](README.md#scalars)[``"String"``]\> |
| `address` | [`Address`](README.md#address) |
| `businessHours` | [`BusinessHour`](README.md#businesshour)[] |
| `deliveryChannel` | [`Scalars`](README.md#scalars)[``"String"``] |
| `estimate` | [`Scalars`](README.md#scalars)[``"String"``] |
| `friendlyName` | [`Scalars`](README.md#scalars)[``"String"``] |
| `id` | [`Scalars`](README.md#scalars)[``"String"``] |
| `isSelected` | [`Scalars`](README.md#scalars)[``"Boolean"``] |
| `price` | [`Scalars`](README.md#scalars)[``"Int"``] |
| `storeDistance?` | [`Maybe`](README.md#maybe)<[`Scalars`](README.md#scalars)[``"Float"``]\> |
| `transitTime` | [`Scalars`](README.md#scalars)[``"String"``] |

#### Defined in

[index.ts:435](https://github.com/vtex/checkout-types/blob/b53e8fb/src/index.ts#L435)

___

### PriceTag

Ƭ **PriceTag**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `__typename?` | ``"PriceTag"`` |
| `identifier?` | [`Maybe`](README.md#maybe)<[`Scalars`](README.md#scalars)[``"String"``]\> |
| `isPercentual?` | [`Maybe`](README.md#maybe)<[`Scalars`](README.md#scalars)[``"Boolean"``]\> |
| `name?` | [`Maybe`](README.md#maybe)<[`Scalars`](README.md#scalars)[``"String"``]\> |
| `ratesAndBenefitsIdentifier?` | [`Maybe`](README.md#maybe)<[`RatesAndBenefitsIdentifier`](README.md#ratesandbenefitsidentifier)\> |
| `rawValue?` | [`Maybe`](README.md#maybe)<[`Scalars`](README.md#scalars)[``"Float"``]\> |
| `value?` | [`Maybe`](README.md#maybe)<[`Scalars`](README.md#scalars)[``"Int"``]\> |

#### Defined in

[index.ts:450](https://github.com/vtex/checkout-types/blob/b53e8fb/src/index.ts#L450)

___

### RatesAndBenefitsIdentifier

Ƭ **RatesAndBenefitsIdentifier**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `__typename?` | ``"RatesAndBenefitsIdentifier"`` |
| `description?` | [`Maybe`](README.md#maybe)<[`Scalars`](README.md#scalars)[``"String"``]\> |
| `featured?` | [`Maybe`](README.md#maybe)<[`Scalars`](README.md#scalars)[``"Boolean"``]\> |
| `id?` | [`Maybe`](README.md#maybe)<[`Scalars`](README.md#scalars)[``"String"``]\> |
| `matchedParameters?` | [`Maybe`](README.md#maybe)<[`Scalars`](README.md#scalars)[``"MatchedParameters"``]\> |
| `name?` | [`Maybe`](README.md#maybe)<[`Scalars`](README.md#scalars)[``"String"``]\> |

#### Defined in

[index.ts:460](https://github.com/vtex/checkout-types/blob/b53e8fb/src/index.ts#L460)

___

### RemovedOptionItem

Ƭ **RemovedOptionItem**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `__typename?` | ``"RemovedOptionItem"`` |
| `initialQuantity?` | [`Maybe`](README.md#maybe)<[`Scalars`](README.md#scalars)[``"Int"``]\> |
| `name?` | [`Maybe`](README.md#maybe)<[`Scalars`](README.md#scalars)[``"String"``]\> |
| `removedQuantity?` | [`Maybe`](README.md#maybe)<[`Scalars`](README.md#scalars)[``"Int"``]\> |

#### Defined in

[index.ts:469](https://github.com/vtex/checkout-types/blob/b53e8fb/src/index.ts#L469)

___

### SavePaymentTokenPayload

Ƭ **SavePaymentTokenPayload**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `__typename?` | ``"SavePaymentTokenPayload"`` |
| `status?` | [`Maybe`](README.md#maybe)<[`Scalars`](README.md#scalars)[``"String"``]\> |

#### Defined in

[index.ts:476](https://github.com/vtex/checkout-types/blob/b53e8fb/src/index.ts#L476)

___

### Scalars

Ƭ **Scalars**: `Object`

All built-in and custom scalars, mapped to their actual values

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `AttachmentContent` | `any` | - |
| `AttachmentSchema` | `any` | - |
| `Boolean` | `boolean` | - |
| `Float` | `number` | - |
| `ID` | `string` | - |
| `IOSanitizedString` | `any` | - |
| `IOUpload` | `any` | - |
| `InputValues` | `any` | - |
| `Int` | `number` | - |
| `MatchedParameters` | `any` | - |
| `OfferingInfo` | `any` | - |
| `ProductCategoriesObject` | `any` | ProductCategoriesObject is a Record<string, string>, in the following format: { '<categoryNumber>': '<categoryName>' } |
| `String` | `string` | - |
| `Upload` | `any` | - |

#### Defined in

[index.ts:4](https://github.com/vtex/checkout-types/blob/b53e8fb/src/index.ts#L4)

___

### Shipping

Ƭ **Shipping**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `__typename?` | ``"Shipping"`` |
| `availableAddresses?` | [`Maybe`](README.md#maybe)<[`Maybe`](README.md#maybe)<[`Address`](README.md#address)\>[]\> |
| `countries?` | [`Maybe`](README.md#maybe)<[`Maybe`](README.md#maybe)<[`Scalars`](README.md#scalars)[``"String"``]\>[]\> |
| `deliveryOptions` | [`DeliveryOption`](README.md#deliveryoption)[] |
| `isValid` | [`Scalars`](README.md#scalars)[``"Boolean"``] |
| `pickupOptions` | [`PickupOption`](README.md#pickupoption)[] |
| `selectedAddress?` | [`Maybe`](README.md#maybe)<[`Address`](README.md#address)\> |

#### Defined in

[index.ts:481](https://github.com/vtex/checkout-types/blob/b53e8fb/src/index.ts#L481)

___

### ShippingItem

Ƭ **ShippingItem**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `id?` | [`Maybe`](README.md#maybe)<[`Scalars`](README.md#scalars)[``"String"``]\> |
| `quantity?` | [`Maybe`](README.md#maybe)<[`Scalars`](README.md#scalars)[``"String"``]\> |
| `seller?` | [`Maybe`](README.md#maybe)<[`Scalars`](README.md#scalars)[``"String"``]\> |

#### Defined in

[index.ts:491](https://github.com/vtex/checkout-types/blob/b53e8fb/src/index.ts#L491)

___

### SkuSpecification

Ƭ **SkuSpecification**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `__typename?` | ``"SKUSpecification"`` |
| `fieldName?` | [`Maybe`](README.md#maybe)<[`Scalars`](README.md#scalars)[``"String"``]\> |
| `fieldValues` | [`Maybe`](README.md#maybe)<[`Scalars`](README.md#scalars)[``"String"``]\>[] |

#### Defined in

[index.ts:497](https://github.com/vtex/checkout-types/blob/b53e8fb/src/index.ts#L497)

___

### StorePreferencesData

Ƭ **StorePreferencesData**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `__typename?` | ``"StorePreferencesData"`` |
| `countryCode?` | [`Maybe`](README.md#maybe)<[`Scalars`](README.md#scalars)[``"String"``]\> |
| `currencyCode?` | [`Maybe`](README.md#maybe)<[`Scalars`](README.md#scalars)[``"String"``]\> |
| `currencyFormatInfo?` | [`Maybe`](README.md#maybe)<[`CurrencyFormatInfo`](README.md#currencyformatinfo)\> |
| `currencySymbol?` | [`Maybe`](README.md#maybe)<[`Scalars`](README.md#scalars)[``"String"``]\> |
| `timeZone?` | [`Maybe`](README.md#maybe)<[`Scalars`](README.md#scalars)[``"String"``]\> |

#### Defined in

[index.ts:503](https://github.com/vtex/checkout-types/blob/b53e8fb/src/index.ts#L503)

___

### Totalizer

Ƭ **Totalizer**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `__typename?` | ``"Totalizer"`` |
| `id` | [`Scalars`](README.md#scalars)[``"String"``] |
| `name?` | [`Maybe`](README.md#maybe)<[`Scalars`](README.md#scalars)[``"String"``]\> |
| `value` | [`Scalars`](README.md#scalars)[``"Float"``] |

#### Defined in

[index.ts:512](https://github.com/vtex/checkout-types/blob/b53e8fb/src/index.ts#L512)

___

### UserProfile

Ƭ **UserProfile**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `__typename?` | ``"UserProfile"`` |
| `corporateDocument?` | [`Maybe`](README.md#maybe)<[`Scalars`](README.md#scalars)[``"String"``]\> |
| `corporateName?` | [`Maybe`](README.md#maybe)<[`Scalars`](README.md#scalars)[``"String"``]\> |
| `corporatePhone?` | [`Maybe`](README.md#maybe)<[`Scalars`](README.md#scalars)[``"String"``]\> |
| `customerClass?` | [`Maybe`](README.md#maybe)<[`Scalars`](README.md#scalars)[``"String"``]\> |
| `document?` | [`Maybe`](README.md#maybe)<[`Scalars`](README.md#scalars)[``"String"``]\> |
| `documentType?` | [`Maybe`](README.md#maybe)<[`Scalars`](README.md#scalars)[``"String"``]\> |
| `email` | [`Scalars`](README.md#scalars)[``"String"``] |
| `firstName` | [`Scalars`](README.md#scalars)[``"String"``] |
| `isCorporate` | [`Scalars`](README.md#scalars)[``"Boolean"``] |
| `lastName` | [`Scalars`](README.md#scalars)[``"String"``] |
| `phone?` | [`Maybe`](README.md#maybe)<[`Scalars`](README.md#scalars)[``"String"``]\> |
| `profileCompleteOnLoading?` | [`Maybe`](README.md#maybe)<[`Scalars`](README.md#scalars)[``"String"``]\> |
| `profileErrorOnLoading?` | [`Maybe`](README.md#maybe)<[`Scalars`](README.md#scalars)[``"String"``]\> |
| `stateInscription?` | [`Maybe`](README.md#maybe)<[`Scalars`](README.md#scalars)[``"String"``]\> |
| `tradeName?` | [`Maybe`](README.md#maybe)<[`Scalars`](README.md#scalars)[``"String"``]\> |

#### Defined in

[index.ts:519](https://github.com/vtex/checkout-types/blob/b53e8fb/src/index.ts#L519)

___

### UserProfileInput

Ƭ **UserProfileInput**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `corporateDocument?` | [`Maybe`](README.md#maybe)<[`Scalars`](README.md#scalars)[``"String"``]\> |
| `corporateName?` | [`Maybe`](README.md#maybe)<[`Scalars`](README.md#scalars)[``"String"``]\> |
| `document?` | [`Maybe`](README.md#maybe)<[`Scalars`](README.md#scalars)[``"String"``]\> |
| `documentType?` | [`Maybe`](README.md#maybe)<[`Scalars`](README.md#scalars)[``"String"``]\> |
| `email?` | [`Maybe`](README.md#maybe)<[`Scalars`](README.md#scalars)[``"String"``]\> |
| `firstName?` | [`Maybe`](README.md#maybe)<[`Scalars`](README.md#scalars)[``"String"``]\> |
| `isCorporate?` | [`Maybe`](README.md#maybe)<[`Scalars`](README.md#scalars)[``"Boolean"``]\> |
| `lastName?` | [`Maybe`](README.md#maybe)<[`Scalars`](README.md#scalars)[``"String"``]\> |
| `phone?` | [`Maybe`](README.md#maybe)<[`Scalars`](README.md#scalars)[``"String"``]\> |
| `stateInscription?` | [`Maybe`](README.md#maybe)<[`Scalars`](README.md#scalars)[``"String"``]\> |
| `tradeName?` | [`Maybe`](README.md#maybe)<[`Scalars`](README.md#scalars)[``"String"``]\> |

#### Defined in

[index.ts:538](https://github.com/vtex/checkout-types/blob/b53e8fb/src/index.ts#L538)

___

### UserType

Ƭ **UserType**: ``"CALL_CENTER_OPERATOR"`` \| ``"STORE_USER"``

#### Defined in

[index.ts:552](https://github.com/vtex/checkout-types/blob/b53e8fb/src/index.ts#L552)

___

### Validator

Ƭ **Validator**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `__typename?` | ``"Validator"`` |
| `cardCodeMask?` | [`Maybe`](README.md#maybe)<[`Scalars`](README.md#scalars)[``"String"``]\> |
| `cardCodeRegex?` | [`Maybe`](README.md#maybe)<[`Scalars`](README.md#scalars)[``"String"``]\> |
| `mask?` | [`Maybe`](README.md#maybe)<[`Scalars`](README.md#scalars)[``"String"``]\> |
| `regex?` | [`Maybe`](README.md#maybe)<[`Scalars`](README.md#scalars)[``"String"``]\> |
| `useBillingAddress?` | [`Maybe`](README.md#maybe)<[`Scalars`](README.md#scalars)[``"Boolean"``]\> |
| `useCardHolderName?` | [`Maybe`](README.md#maybe)<[`Scalars`](README.md#scalars)[``"Boolean"``]\> |
| `useCvv?` | [`Maybe`](README.md#maybe)<[`Scalars`](README.md#scalars)[``"Boolean"``]\> |
| `useExpirationDate?` | [`Maybe`](README.md#maybe)<[`Scalars`](README.md#scalars)[``"Boolean"``]\> |
| `weights?` | [`Maybe`](README.md#maybe)<[`Maybe`](README.md#maybe)<[`Scalars`](README.md#scalars)[``"Int"``]\>[]\> |

#### Defined in

[index.ts:554](https://github.com/vtex/checkout-types/blob/b53e8fb/src/index.ts#L554)
