import React from 'react';
import PleistyWrapper from "./Components/PleistyWrapper";
import { HP_RECENTLY_VIEWED_PRODUCTS_WIDGET_ID } from "./utils/constants";


const HomePageRecentlyViewedProducts = () => {
    return <PleistyWrapper widgetId={HP_RECENTLY_VIEWED_PRODUCTS_WIDGET_ID}/>
}
export default HomePageRecentlyViewedProducts;
