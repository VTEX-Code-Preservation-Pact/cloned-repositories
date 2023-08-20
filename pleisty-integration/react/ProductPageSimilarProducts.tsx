import React from 'react';
import PleistyWrapper from "./Components/PleistyWrapper";
import { PP_SIMILAR_PRODUCTS_WIDGET_ID } from "./utils/constants";


const ProductPageRecentlyViewedProducts = () => {
    return <PleistyWrapper widgetId={PP_SIMILAR_PRODUCTS_WIDGET_ID}/>
}
export default ProductPageRecentlyViewedProducts;
