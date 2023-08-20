export declare type Maybe<T> = T | null;
export declare type Exact<T extends {
    [key: string]: any;
}> = {
    [K in keyof T]: T[K];
};
/** All built-in and custom scalars, mapped to their actual values */
export declare type Scalars = {
    ID: string;
    String: string;
    Boolean: boolean;
    Int: number;
    Float: number;
    AttachmentSchema: any;
    AttachmentContent: any;
    InputValues: any;
    /**
     * ProductCategoriesObject is a Record<string, string>, in the following format:
     * { '<categoryNumber>': '<categoryName>' }
     */
    ProductCategoriesObject: any;
    MatchedParameters: any;
    OfferingInfo: any;
    IOSanitizedString: any;
    IOUpload: any;
    Upload: any;
};
export declare type AddedOptionItem = {
    __typename?: 'AddedOptionItem';
    item?: Maybe<Item>;
    compositionItem?: Maybe<CompositionItem>;
    normalizedQuantity?: Maybe<Scalars['Int']>;
    choiceType?: Maybe<Scalars['String']>;
    extraQuantity?: Maybe<Scalars['Int']>;
};
export declare type Address = {
    __typename?: 'Address';
    addressId?: Maybe<Scalars['ID']>;
    addressType?: Maybe<AddressType>;
    city?: Maybe<Scalars['String']>;
    complement?: Maybe<Scalars['String']>;
    country?: Maybe<Scalars['String']>;
    geoCoordinates?: Maybe<Array<Maybe<Scalars['Float']>>>;
    neighborhood?: Maybe<Scalars['String']>;
    number?: Maybe<Scalars['String']>;
    postalCode?: Maybe<Scalars['String']>;
    receiverName?: Maybe<Scalars['String']>;
    reference?: Maybe<Scalars['String']>;
    state?: Maybe<Scalars['String']>;
    street?: Maybe<Scalars['String']>;
    isDisposable?: Maybe<Scalars['Boolean']>;
};
export declare type AddressInput = {
    addressId?: Maybe<Scalars['ID']>;
    addressType?: Maybe<AddressType>;
    addressQuery?: Maybe<Scalars['String']>;
    city?: Maybe<Scalars['String']>;
    complement?: Maybe<Scalars['String']>;
    country?: Maybe<Scalars['String']>;
    geoCoordinates?: Maybe<Array<Maybe<Scalars['Float']>>>;
    neighborhood?: Maybe<Scalars['String']>;
    number?: Maybe<Scalars['String']>;
    postalCode?: Maybe<Scalars['String']>;
    receiverName?: Maybe<Scalars['String']>;
    reference?: Maybe<Scalars['String']>;
    state?: Maybe<Scalars['String']>;
    street?: Maybe<Scalars['String']>;
    isDisposable?: Maybe<Scalars['Boolean']>;
};
export declare type AddressType = 'residential' | 'commercial' | 'inStore' | 'giftRegistry' | 'pickup' | 'search';
export declare type AssemblyOptionInput = {
    assemblyId: Scalars['String'];
    id?: Maybe<Scalars['ID']>;
    quantity?: Maybe<Scalars['Int']>;
    seller?: Maybe<Scalars['String']>;
    inputValues?: Maybe<Scalars['InputValues']>;
    options?: Maybe<AssemblyOptionInput[]>;
};
export declare type AssemblyOptionItem = {
    __typename?: 'AssemblyOptionItem';
    added: Array<Maybe<AddedOptionItem>>;
    removed: Array<Maybe<RemovedOptionItem>>;
    parentPrice?: Maybe<Scalars['Float']>;
};
export declare type AssemblyOptionType = {
    __typename?: 'AssemblyOptionType';
    assemblyId: Scalars['String'];
    id?: Maybe<Scalars['ID']>;
    quantity?: Maybe<Scalars['Int']>;
    seller?: Maybe<Scalars['String']>;
    inputValues?: Maybe<Scalars['InputValues']>;
    options?: Maybe<AssemblyOptionType[]>;
};
export declare type Attachment = {
    __typename?: 'Attachment';
    name?: Maybe<Scalars['String']>;
    content?: Maybe<Scalars['AttachmentContent']>;
};
export declare type AttachmentOffering = {
    __typename?: 'AttachmentOffering';
    name?: Maybe<Scalars['String']>;
    required?: Maybe<Scalars['Boolean']>;
    schema?: Maybe<Scalars['AttachmentSchema']>;
};
export declare type AvailableAccount = {
    __typename?: 'AvailableAccount';
    accountId: Scalars['String'];
    paymentSystem: Scalars['String'];
    paymentSystemName: Scalars['String'];
    cardNumber: Scalars['String'];
    bin: Scalars['String'];
};
export declare type BundleItemAttachmentInput = {
    itemIndex: Scalars['Int'];
    bundleItemId: Scalars['String'];
    attachmentName: Scalars['String'];
    attachmentContent: Scalars['AttachmentContent'];
};
export declare type BusinessHour = {
    __typename?: 'BusinessHour';
    dayNumber: Scalars['String'];
    closed: Scalars['Boolean'];
    closingTime: Scalars['String'];
    openingTime: Scalars['String'];
};
export declare type CheckoutProfile = {
    __typename?: 'CheckoutProfile';
    userProfileId?: Maybe<Scalars['String']>;
    profileProvider?: Maybe<Scalars['String']>;
    availableAccounts: AvailableAccount[];
    availableAddresses: Address[];
    userProfile?: Maybe<UserProfile>;
};
export declare type ClientData = {
    __typename?: 'ClientData';
    email?: Maybe<Scalars['String']>;
    firstName?: Maybe<Scalars['String']>;
    lastName?: Maybe<Scalars['String']>;
    document?: Maybe<Scalars['String']>;
    documentType?: Maybe<Scalars['String']>;
    phone?: Maybe<Scalars['String']>;
    corporateName?: Maybe<Scalars['String']>;
    tradeName?: Maybe<Scalars['String']>;
    corporateDocument?: Maybe<Scalars['String']>;
    stateInscription?: Maybe<Scalars['String']>;
    corporatePhone?: Maybe<Scalars['String']>;
    isCorporate?: Maybe<Scalars['Boolean']>;
    profileCompleteOnLoading?: Maybe<Scalars['Boolean']>;
    profileErrorOnLoading?: Maybe<Scalars['Boolean']>;
    customerClass?: Maybe<Scalars['String']>;
    isValid: Scalars['Boolean'];
};
export declare type ClientPreferencesData = {
    __typename?: 'ClientPreferencesData';
    locale?: Maybe<Scalars['String']>;
    optInNewsletter?: Maybe<Scalars['Boolean']>;
};
export declare type ClientPreferencesDataInput = {
    optInNewsletter?: Maybe<Scalars['Boolean']>;
    locale?: Maybe<Scalars['String']>;
};
export declare type CompositionItem = {
    __typename?: 'CompositionItem';
    id?: Maybe<Scalars['ID']>;
    minQuantity?: Maybe<Scalars['Int']>;
    maxQuantity?: Maybe<Scalars['Int']>;
    initialQuantity?: Maybe<Scalars['Int']>;
    priceTable?: Maybe<Scalars['String']>;
    seller?: Maybe<Scalars['String']>;
};
export declare type Coupon = {
    __typename?: 'Coupon';
    code?: Maybe<Scalars['String']>;
};
export declare type CurrencyFormatInfo = {
    __typename?: 'CurrencyFormatInfo';
    currencyDecimalDigits?: Maybe<Scalars['Int']>;
    currencyDecimalSeparator?: Maybe<Scalars['String']>;
    currencyGroupSeparator?: Maybe<Scalars['String']>;
    startsWithCurrencySymbol?: Maybe<Scalars['Boolean']>;
};
export declare type DeliveryOption = {
    __typename?: 'DeliveryOption';
    id: Scalars['String'];
    deliveryChannel: Scalars['String'];
    price: Scalars['Int'];
    estimate: Scalars['String'];
    isSelected: Scalars['Boolean'];
};
export declare type ImageUrls = {
    __typename?: 'ImageUrls';
    at1x: Scalars['String'];
    at2x: Scalars['String'];
    at3x: Scalars['String'];
};
export declare type Installment = {
    __typename?: 'Installment';
    count: Scalars['Int'];
    hasInterestRate?: Maybe<Scalars['Boolean']>;
    interestRate?: Maybe<Scalars['Int']>;
    value?: Maybe<Scalars['Float']>;
    total: Scalars['Float'];
};
export declare type InstallmentOption = {
    __typename?: 'InstallmentOption';
    paymentSystem: Scalars['String'];
    bin?: Maybe<Scalars['String']>;
    paymentName?: Maybe<Scalars['String']>;
    paymentGroupName?: Maybe<Scalars['String']>;
    value: Scalars['Float'];
    installments: Installment[];
};
export declare type Item = {
    __typename?: 'Item';
    additionalInfo?: Maybe<ItemAdditionalInfo>;
    assemblyOptions?: Maybe<AssemblyOptionItem>;
    availability?: Maybe<Scalars['String']>;
    attachmentOfferings: AttachmentOffering[];
    attachments: Attachment[];
    bundleItems: Item[];
    detailUrl?: Maybe<Scalars['String']>;
    id: Scalars['ID'];
    imageUrls?: Maybe<ImageUrls>;
    listPrice?: Maybe<Scalars['Float']>;
    manualPrice?: Maybe<Scalars['Float']>;
    measurementUnit?: Maybe<Scalars['String']>;
    name?: Maybe<Scalars['String']>;
    offerings: Offering[];
    options?: Maybe<Array<Maybe<AssemblyOptionType>>>;
    parentAssemblyBinding?: Maybe<Scalars['String']>;
    parentItemIndex?: Maybe<Scalars['Int']>;
    price?: Maybe<Scalars['Float']>;
    productCategories?: Maybe<Scalars['ProductCategoriesObject']>;
    productCategoryIds?: Maybe<Scalars['String']>;
    /** Id of the product. Can be null if included inside bundle items. */
    productId?: Maybe<Scalars['String']>;
    productRefId?: Maybe<Scalars['String']>;
    quantity: Scalars['Float'];
    refId?: Maybe<Scalars['String']>;
    /** Product's seller. Can be null if included inside bundle items. */
    seller?: Maybe<Scalars['String']>;
    sellingPrice?: Maybe<Scalars['Float']>;
    sellingPriceWithAssemblies?: Maybe<Scalars['Float']>;
    skuName?: Maybe<Scalars['String']>;
    skuSpecifications: SkuSpecification[];
    uniqueId: Scalars['String'];
    unitMultiplier?: Maybe<Scalars['Float']>;
    priceTags: PriceTag[];
};
export declare type ItemAdditionalInfo = {
    __typename?: 'ItemAdditionalInfo';
    brandName?: Maybe<Scalars['String']>;
};
export declare type ItemInput = {
    id?: Maybe<Scalars['Int']>;
    index?: Maybe<Scalars['Int']>;
    quantity?: Maybe<Scalars['Float']>;
    seller?: Maybe<Scalars['ID']>;
    uniqueId?: Maybe<Scalars['String']>;
    inputValues?: Maybe<Scalars['InputValues']>;
    options?: Maybe<Array<Maybe<AssemblyOptionInput>>>;
};
export declare type ItemsOrdinationCriteria = 'name' | 'add_time';
export declare type ManualPriceInput = {
    itemIndex: Scalars['Int'];
    price: Scalars['Float'];
};
export declare type MarketingData = {
    __typename?: 'MarketingData';
    utmCampaign?: Maybe<Scalars['String']>;
    utmMedium?: Maybe<Scalars['String']>;
    utmSource?: Maybe<Scalars['String']>;
    utmiCampaign?: Maybe<Scalars['String']>;
    utmiPart?: Maybe<Scalars['String']>;
    utmiPage?: Maybe<Scalars['String']>;
    coupon?: Maybe<Scalars['String']>;
    marketingTags?: Maybe<Array<Scalars['String']>>;
};
export declare type MarketingDataInput = {
    utmCampaign?: Maybe<Scalars['String']>;
    utmMedium?: Maybe<Scalars['String']>;
    utmSource?: Maybe<Scalars['String']>;
    utmiCampaign?: Maybe<Scalars['String']>;
    utmiPart?: Maybe<Scalars['String']>;
    utmiPage?: Maybe<Scalars['String']>;
    coupon?: Maybe<Scalars['String']>;
    marketingTags?: Maybe<Array<Scalars['String']>>;
};
export declare type Message = {
    __typename?: 'Message';
    code?: Maybe<Scalars['String']>;
    status?: Maybe<Scalars['String']>;
    text?: Maybe<Scalars['String']>;
};
export declare type Offering = {
    __typename?: 'Offering';
    id: Scalars['String'];
    name: Scalars['String'];
    price: Scalars['Int'];
    type: Scalars['String'];
    attachmentOfferings: AttachmentOffering[];
};
export declare type OfferingInput = {
    itemIndex: Scalars['Int'];
    offeringId: Scalars['String'];
    offeringInfo?: Maybe<Scalars['OfferingInfo']>;
};
export declare type OpenTextField = {
    __typename?: 'OpenTextField';
    value?: Maybe<Scalars['String']>;
};
export declare type OrderForm = {
    __typename?: 'OrderForm';
    id: Scalars['ID'];
    items: Item[];
    canEditData: Scalars['Boolean'];
    loggedIn: Scalars['Boolean'];
    userProfileId?: Maybe<Scalars['String']>;
    userType?: Maybe<UserType>;
    shipping: Shipping;
    marketingData: MarketingData;
    totalizers: Totalizer[];
    value: Scalars['Float'];
    messages: OrderFormMessages;
    paymentData: PaymentData;
    clientProfileData?: Maybe<ClientData>;
    clientPreferencesData?: Maybe<ClientPreferencesData>;
    allowManualPrice?: Maybe<Scalars['Boolean']>;
    openTextField?: Maybe<OpenTextField>;
    storePreferencesData?: Maybe<StorePreferencesData>;
};
export declare type OrderFormMessages = {
    __typename?: 'OrderFormMessages';
    couponMessages: Message[];
    generalMessages: Message[];
};
export declare type OrderFormOpenTextInput = {
    value?: Maybe<Scalars['String']>;
};
export declare type Payment = {
    __typename?: 'Payment';
    paymentSystem?: Maybe<Scalars['String']>;
    bin?: Maybe<Scalars['String']>;
    accountId?: Maybe<Scalars['String']>;
    tokenId?: Maybe<Scalars['String']>;
    installments?: Maybe<Scalars['Int']>;
    referenceValue?: Maybe<Scalars['Float']>;
    value?: Maybe<Scalars['Float']>;
};
export declare type PaymentData = {
    __typename?: 'PaymentData';
    installmentOptions: InstallmentOption[];
    paymentSystems: PaymentSystem[];
    payments: Payment[];
    availableAccounts: AvailableAccount[];
    isValid: Scalars['Boolean'];
};
export declare type PaymentDataInput = {
    payments: PaymentInput[];
};
export declare type PaymentInput = {
    hasDefaultBillingAddress?: Maybe<Scalars['Boolean']>;
    installmentsInterestRate?: Maybe<Scalars['Int']>;
    paymentSystem?: Maybe<Scalars['String']>;
    bin?: Maybe<Scalars['String']>;
    accountId?: Maybe<Scalars['String']>;
    tokenId?: Maybe<Scalars['String']>;
    installments?: Maybe<Scalars['Int']>;
    referenceValue?: Maybe<Scalars['Int']>;
    value?: Maybe<Scalars['Int']>;
};
export declare type PaymentSystem = {
    __typename?: 'PaymentSystem';
    id: Scalars['String'];
    name: Scalars['String'];
    groupName: Scalars['String'];
    validator?: Maybe<Validator>;
    stringId: Scalars['String'];
    requiresDocument: Scalars['Boolean'];
    isCustom: Scalars['Boolean'];
    description?: Maybe<Scalars['String']>;
    requiresAuthentication?: Maybe<Scalars['Boolean']>;
    dueDate?: Maybe<Scalars['String']>;
};
export declare type PaymentToken = {
    creditCardToken: Scalars['String'];
    paymentSystem: Scalars['String'];
};
export declare type PickupOption = {
    __typename?: 'PickupOption';
    id: Scalars['String'];
    address: Address;
    deliveryChannel: Scalars['String'];
    price: Scalars['Int'];
    estimate: Scalars['String'];
    isSelected: Scalars['Boolean'];
    friendlyName: Scalars['String'];
    additionalInfo?: Maybe<Scalars['String']>;
    storeDistance?: Maybe<Scalars['Float']>;
    transitTime: Scalars['String'];
    businessHours: BusinessHour[];
};
export declare type PriceTag = {
    __typename?: 'PriceTag';
    identifier?: Maybe<Scalars['String']>;
    isPercentual?: Maybe<Scalars['Boolean']>;
    name?: Maybe<Scalars['String']>;
    ratesAndBenefitsIdentifier?: Maybe<RatesAndBenefitsIdentifier>;
    rawValue?: Maybe<Scalars['Float']>;
    value?: Maybe<Scalars['Int']>;
};
export declare type RatesAndBenefitsIdentifier = {
    __typename?: 'RatesAndBenefitsIdentifier';
    description?: Maybe<Scalars['String']>;
    featured?: Maybe<Scalars['Boolean']>;
    id?: Maybe<Scalars['String']>;
    matchedParameters?: Maybe<Scalars['MatchedParameters']>;
    name?: Maybe<Scalars['String']>;
};
export declare type RemovedOptionItem = {
    __typename?: 'RemovedOptionItem';
    initialQuantity?: Maybe<Scalars['Int']>;
    removedQuantity?: Maybe<Scalars['Int']>;
    name?: Maybe<Scalars['String']>;
};
export declare type SavePaymentTokenPayload = {
    __typename?: 'SavePaymentTokenPayload';
    status?: Maybe<Scalars['String']>;
};
export declare type Shipping = {
    __typename?: 'Shipping';
    countries?: Maybe<Array<Maybe<Scalars['String']>>>;
    deliveryOptions: DeliveryOption[];
    pickupOptions: PickupOption[];
    selectedAddress?: Maybe<Address>;
    availableAddresses?: Maybe<Array<Maybe<Address>>>;
    isValid: Scalars['Boolean'];
};
export declare type ShippingItem = {
    id?: Maybe<Scalars['String']>;
    quantity?: Maybe<Scalars['String']>;
    seller?: Maybe<Scalars['String']>;
};
export declare type SkuSpecification = {
    __typename?: 'SKUSpecification';
    fieldName?: Maybe<Scalars['String']>;
    fieldValues: Array<Maybe<Scalars['String']>>;
};
export declare type StorePreferencesData = {
    __typename?: 'StorePreferencesData';
    countryCode?: Maybe<Scalars['String']>;
    currencyCode?: Maybe<Scalars['String']>;
    timeZone?: Maybe<Scalars['String']>;
    currencyFormatInfo?: Maybe<CurrencyFormatInfo>;
    currencySymbol?: Maybe<Scalars['String']>;
};
export declare type Totalizer = {
    __typename?: 'Totalizer';
    id: Scalars['String'];
    name?: Maybe<Scalars['String']>;
    value: Scalars['Float'];
};
export declare type UserProfile = {
    __typename?: 'UserProfile';
    email: Scalars['String'];
    firstName: Scalars['String'];
    lastName: Scalars['String'];
    document?: Maybe<Scalars['String']>;
    documentType?: Maybe<Scalars['String']>;
    phone?: Maybe<Scalars['String']>;
    corporateName?: Maybe<Scalars['String']>;
    tradeName?: Maybe<Scalars['String']>;
    corporateDocument?: Maybe<Scalars['String']>;
    stateInscription?: Maybe<Scalars['String']>;
    corporatePhone?: Maybe<Scalars['String']>;
    isCorporate: Scalars['Boolean'];
    profileCompleteOnLoading?: Maybe<Scalars['String']>;
    profileErrorOnLoading?: Maybe<Scalars['String']>;
    customerClass?: Maybe<Scalars['String']>;
};
export declare type UserProfileInput = {
    email?: Maybe<Scalars['String']>;
    firstName?: Maybe<Scalars['String']>;
    lastName?: Maybe<Scalars['String']>;
    document?: Maybe<Scalars['String']>;
    phone?: Maybe<Scalars['String']>;
    documentType?: Maybe<Scalars['String']>;
    isCorporate?: Maybe<Scalars['Boolean']>;
    corporateName?: Maybe<Scalars['String']>;
    tradeName?: Maybe<Scalars['String']>;
    corporateDocument?: Maybe<Scalars['String']>;
    stateInscription?: Maybe<Scalars['String']>;
};
export declare type UserType = 'CALL_CENTER_OPERATOR' | 'STORE_USER';
export declare type Validator = {
    __typename?: 'Validator';
    regex?: Maybe<Scalars['String']>;
    mask?: Maybe<Scalars['String']>;
    cardCodeRegex?: Maybe<Scalars['String']>;
    cardCodeMask?: Maybe<Scalars['String']>;
    weights?: Maybe<Array<Maybe<Scalars['Int']>>>;
    useCvv?: Maybe<Scalars['Boolean']>;
    useExpirationDate?: Maybe<Scalars['Boolean']>;
    useCardHolderName?: Maybe<Scalars['Boolean']>;
    useBillingAddress?: Maybe<Scalars['Boolean']>;
};
export {};
//# sourceMappingURL=index.d.ts.map