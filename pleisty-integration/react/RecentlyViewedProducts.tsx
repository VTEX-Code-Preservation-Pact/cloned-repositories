import React from 'react';
import PleistyWrapper from "./Components/PleistyWrapper";
import { RECENTLY_VIEWED_PRODUCTS_WIDGET_ID } from "./utils/constants";


const RecentlyViewedProducts = () => {
    return <PleistyWrapper widgetId={RECENTLY_VIEWED_PRODUCTS_WIDGET_ID}/>
}
export default RecentlyViewedProducts;
