interface IPleistyProductProps {
    product: IPleistyProduct;
}

interface IPleistyProduct {
    item_stock: string;
    item_cat3: string;
    item_pricenum: string;
    item_id: string;
    item_oldpricestring: string;
    item_discount: string;
    item_cat2: string;
    item_isnew: string;
    item_formatsenzor: string;
    item_pricestring: string;
    item_sku: string;
    item_cat1: string;
    item_imgorig: string;
    item_aparatmonturaobiectiv: string;
    item_oldpricenum: string;
    item_isonsale: string;
    item_brand: string;
    item_title: string;
    item_img: string;
    is_history?: string;
    is_hidden?: string;
    is_selected?: string;
    _item_url: string;
    _ih: string;
}

interface IPleistyGlobalResponse {
    WIDGET_PARAMS?: string;
    curr_item_price_and_class: string;
    host_part: string;
    item_to_rdr: any[];
    request_url: string;
    special_rule: any;
    title: string;
    rec_items: IPleistyProduct[];
}

interface IPleistyWrapperProps {
    widgetId: string;
}

interface IPleistyCarouselProps {
    pleistyProducts: IPleistyProduct[];
    widgetParam?: string;
}

interface IPleistyHistoryNavigationProps {
    pleistyHistoryProducts: IPleistyProduct[];
    handleClickHistoryNavigation: (any) => void;
    children?: JSX.Element;
}

interface Window extends Window {
    dataLayer: any[];
}
  