import React from 'react';
import PleistyProduct from "./PleistyProduct";
// @ts-ignore
import { SliderLayout } from 'vtex.slider-layout';
import {
    ARROW_SIZE,
    FULL_WIDTH,
    INFINITE,
    ITEMS_PER_PAGE,
    NAVIGATION_STEP,
    SHOW_NAVIGATION_ARROWS,
    SHOW_PAGINATION_DOTS,
    USE_PAGINATION
} from "../utils/constants";


const PleistyCarousel = (props: IPleistyCarouselProps) => {

    const { pleistyProducts } = props;
    return (
        <SliderLayout
            key={props.widgetParam}
            totalItems={pleistyProducts?.length}
            infinite={INFINITE}
            itemsPerPage={ITEMS_PER_PAGE}
            navigationStep={NAVIGATION_STEP}
            showNavigationArrows={SHOW_NAVIGATION_ARROWS}
            showPaginationDots={SHOW_PAGINATION_DOTS}
            usePagination={USE_PAGINATION}
            fullWidth={FULL_WIDTH}
            arrowSize={ARROW_SIZE}
        >
            {pleistyProducts.map((pleistyProduct: IPleistyProduct) => (
                <React.Fragment key={pleistyProduct.item_sku}>
                    <PleistyProduct key={pleistyProduct.item_sku} product={pleistyProduct}/>
                </React.Fragment>
            ))}
        </SliderLayout>
    )
}
export default PleistyCarousel;
