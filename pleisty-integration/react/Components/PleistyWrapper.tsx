import React, { useCallback, useEffect, useState } from 'react';
import { pushPleistyWidgetId } from "../utils/pleisty-utils";
import PleistyCarousel from "./PleistyCarousel";
import PleistyHistoryNavigation from "./PleistyHistoryNavigation";
// @ts-ignore
import { useCssHandles } from 'vtex.css-handles'

const CSS_HANDLES = [
    'pleisty-shelf-title',
    'pleisty-title'
] as const;

const PleistyWrapper = (props: IPleistyWrapperProps) => {
    const [pleistyProducts, setPleistyProducts] = useState<IPleistyProduct[]>([]);
    const [pleistyHistoryProducts, setPleistyHistoryProducts] = useState<IPleistyProduct[]>([]);
    const [pleistyGlobal, setPleistyGlobal] = useState<IPleistyGlobalResponse>();
    const isTypeHistory = !!pleistyHistoryProducts.length;
    const handles = useCssHandles(CSS_HANDLES);

    useEffect(() => {
        if (!pleistyProducts.length) {
            handleSetPleistyProductsByWidgetId(props.widgetId);
        }
    }, []);

    const handleClickHistoryNavigation = useCallback((selectedPleistyProduct: IPleistyProduct) => {
        handleSetPleistyProductsByWidgetId(`${props.widgetId}.${selectedPleistyProduct._ih}`);
    }, [props.widgetId]);

    const handleSetPleistyProductsByWidgetId = useCallback((widgetId: string) => {
        pushPleistyWidgetId(widgetId, (errors, response) => {
            if (errors) {
                console.error(errors);
            }
            if (response) {
                const items: IPleistyProduct[] = response.items?.filter((pleistyProduct: IPleistyProduct) => !pleistyProduct.is_history || pleistyProduct.is_selected === "true");
                const global: IPleistyGlobalResponse = response.global;
                setPleistyProducts(items);
                setPleistyGlobal(global);
                const historyProducts = response.items?.filter((pleistyProduct: IPleistyProduct) => pleistyProduct.is_history);
                setPleistyHistoryProducts(historyProducts);
            }
        });
    }, [pleistyProducts]);

    return pleistyProducts.length ? (
        <React.Fragment>
            <div className={handles["pleisty-shelf-title"]}>
                <h5 className={handles["pleisty-title"]}>{isTypeHistory ? "Produse recent vizualizate si recomandari" : pleistyGlobal?.title}</h5>
            </div>
            {isTypeHistory ? (
                <PleistyHistoryNavigation
                    pleistyHistoryProducts={pleistyHistoryProducts}
                    handleClickHistoryNavigation={handleClickHistoryNavigation}
                >
                    <PleistyCarousel widgetParam={pleistyGlobal?.WIDGET_PARAMS} pleistyProducts={pleistyProducts}/>
                </PleistyHistoryNavigation>
            ) : (
                <PleistyCarousel widgetParam={pleistyGlobal?.WIDGET_PARAMS} pleistyProducts={pleistyProducts}/>
            )}
        </React.Fragment>
    ) : null;
}
export default PleistyWrapper;
