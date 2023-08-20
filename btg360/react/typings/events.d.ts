export interface PixelMessage extends MessageEvent {
  data:
    | ProductViewData
    | ProductClickData
    | OrderPlacedData
    | PageViewData
    | PageInfoData
    | ProductImpressionData
    | AddToCartData
    | RemoveToCartData
    | CategoryViewData
    | DepartmentViewData;
}

export interface EventData {
  event: string;
  eventName: string;
  currency: string;
}

export interface PageViewData extends EventData {
  event: "pageView";
  eventName: "vtex:pageView";
  pageTitle: string;
  pageUrl: string;
  referrer: string;
}

export interface PageInfoData extends EventData {
  event: "pageInfo";
  eventName: "vtex:pageInfo";
  eventType: string;
  accountName: string;
  pageCategory: string;
  pageDepartment: string;
  pageFacets: string[];
  pageTitle: string;
  pageUrl: string;
}

export interface CategoryViewData extends EventData {
  event: "categoryView";
  eventName: "vtex:categoryView";
  products: Product[];
}

export interface DepartmentViewData extends EventData {
  event: "departmentView";
  eventName: "vtex:departmentView";
  products: Product[];
}

export interface AddToCartData extends EventData {
  event: "addToCart";
  eventName: "vtex:addToCart";
  items: AddToCartProduct[];
}

export interface RemoveToCartData extends EventData {
  event: "removeFromCart";
  eventName: "vtex:removeFromCart";
  items: any[];
}

export interface OrderPlacedData extends Order, EventData {
  event: "orderPlaced";
  eventName: "vtex:orderPlaced";
}

export interface ProductViewData extends EventData {
  event: "productView";
  eventName: "vtex:productView";
  product: Product;
}

export interface ProductClickData extends EventData {
  event: "productClick";
  eventName: "vtex:productClick";
  product: Product;
}

export interface ProductImpressionData extends EventData {
  event: "productImpression";
  eventName: "vtex:productImpression";
  product: Product;
  position: number;
  list: string;
}

export interface Order {
  currency: string;
  accountName: string;
  orderGroup: string;
  salesChannel: string;
  coupon: string;
  visitorType: string;
  visitorContactInfo: string[];
  transactionId: string;
  transactionDate: string;
  transactionAffiliation: string;
  transactionTotal: number;
  transactionShipping: number;
  transactionTax: number;
  transactionCurrency: string;
  transactionPaymentType: PaymentType[];
  transactionShippingMethod: ShippingMethod[];
  transactionProducts: ProductOrder[];
  transactionPayment: {
    id: string;
  };
}

interface PaymentType {
  group: string;
  paymentSystemName: string;
  installments: number;
  value: number;
}

interface ShippingMethod {
  itemId: string;
  selectedSla: string;
}

interface ProductOrder {
  id: string;
  name: string;
  sku: string;
  skuRefId: string;
  skuName: string;
  brand: string;
  brandId: string;
  seller: string;
  sellerId: string;
  category: string;
  categoryId: string;
  categoryTree: string[];
  categoryIdTree: string[];
  originalPrice: number;
  price: number;
  sellingPrice: number;
  tax: number;
  quantity: number;
  components: any[];
  measurementUnit: string;
  unitMultiplier: number;
}

export interface Product {
  brand: string;
  categoryId?: string; // inconsistency
  categories: string[];
  productId: string;
  productName: string;
  selectedSku: {
    itemId: string
  }; // inconsistency
  items: Item[];
  sku: Item;
  [key: string]: any;
}

interface Item {
  itemId: string;
  name: string;
  seller?: Seller;
  [key: string]: any;
}

interface Seller {
  commertialOffer: CommertialOffer;
  AvailableQuantity: number;
  [key: string]: any;
}

interface CommertialOffer {
  Price: number;
  [key: string]: any;
}

interface AddToCartProduct {
  brand: string;
  name: string;
  price: number;
  quantity: number;
  skuId: string;
  variant: string;
  category: string;
}
