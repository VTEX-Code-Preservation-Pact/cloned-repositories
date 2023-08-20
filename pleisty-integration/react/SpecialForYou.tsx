import React from 'react';
import PleistyWrapper from "./Components/PleistyWrapper";
import { SPECIAL_FOR_YOU_PRODUCTS_WIDGET_ID } from "./utils/constants";

const SpecialForYou = () => {
    return <PleistyWrapper widgetId={SPECIAL_FOR_YOU_PRODUCTS_WIDGET_ID}/>
}

export default SpecialForYou;
