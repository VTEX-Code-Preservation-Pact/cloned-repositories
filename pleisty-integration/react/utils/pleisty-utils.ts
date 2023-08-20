export const pushPleistyWidgetId = (widgetId: string, callBackFn: (errors, productsResponse) => void) => {
    // @ts-ignore
    const pleistyGlobal = window._pleistyq;
    if (pleistyGlobal) {
        pleistyGlobal.push(['_req_widget_callback', widgetId,
            {
                "_items_cnt": 20,
                "_params": []
            }, callBackFn]);
    }
};

export const pleistyPush = (event: any, objectToPush: any) => {
    // @ts-ignore
    const globalPleisty = window._pleistyq;

    if (globalPleisty) {
        globalPleisty.push([event, objectToPush])
    }
};
