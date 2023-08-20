import React from 'react';
import PleistyWrapper from "./Components/PleistyWrapper";
import { HP_RECOMMENDATIONS_PRODUCTS_WIDGET_ID } from "./utils/constants";


const HomePageRecommendationsForYou = () => {
    return <PleistyWrapper widgetId={HP_RECOMMENDATIONS_PRODUCTS_WIDGET_ID}/>
}

export default HomePageRecommendationsForYou;
