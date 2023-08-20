declare function fbq(s: string, t: string, o?: any): void;

interface Event extends Event {
  data: any;
}

interface Window extends Window {
  ttConversionOptions: TradeTrackerEvent[];
  __tradetracker: {
    tradeTrackerCampaignID: string;
    tradeTrackerProductID: string;
    tradeTrackerDescrMerchant: string;
    tradeTrackerDescrAffiliate: string;
  };
}

interface TradeTrackerEvent {
  type: "sales";
  quantity: string;
  email: string;
  currency: string;
  campaignID: string;
  productID: string;
  transactionID: string;
  transactionAmount: number;
  descrMerchant: string;
  descrAffiliate: string;
}

interface TradeTrackerEventItemProduct {
  id: string;
  name: string;
  price: string;
  department: string;
  category: string;
  subcategory: string;
  brand: string;
}

interface TradeTrackerEventItemKeyword {
  keyword: string;
}
