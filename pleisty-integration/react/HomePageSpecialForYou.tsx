import React from 'react';
import PleistyWrapper from "./Components/PleistyWrapper";
import { HP_SPECIAL_FOR_YOU_PRODUCTS_WIDGET_ID } from "./utils/constants";


const HomePageRecentlyViewedProducts = () => {
    return <PleistyWrapper widgetId={HP_SPECIAL_FOR_YOU_PRODUCTS_WIDGET_ID}/>
}
export default HomePageRecentlyViewedProducts;
