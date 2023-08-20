import React from 'react';
// @ts-ignore
import { useCssHandles } from 'vtex.css-handles';
import classNames from 'classnames';

const CSS_HANDLES = [
    'pleisty-history-navigation-container',
    'children-container',
    'pleisty-product-title',
    'pleisty-product-price',
    'image',
    'pleisty-history-ul',
    'pleisty-history-li',
    'pleisty-box-item',
    'pleisty-anchor',
    'pleisty-active'
] as const;

const PleistyHistoryNavigation = (props: IPleistyHistoryNavigationProps) => {
    const handles = useCssHandles(CSS_HANDLES);
    const { pleistyHistoryProducts } = props;

    return (
        <React.Fragment>
            <div className={handles["pleisty-history-navigation-container"]}>
                <ul className={handles["pleisty-history-ul"]}>
                    {pleistyHistoryProducts.map(pleistyHistoryProduct => (
                        <li key={pleistyHistoryProduct.item_id}
                            className={classNames(handles["pleisty-history-li"], pleistyHistoryProduct.is_selected && handles["pleisty-active"])}>
                            <div className={classNames("box-item", handles["pleisty-box-item"])}>
                                <div className="catalog-image">
                                    <a className={handles["pleisty-anchor"]} title={pleistyHistoryProduct.item_title}
                                       onClick={() => props.handleClickHistoryNavigation(pleistyHistoryProduct)}
                                    >
                                        <img className={handles["image"]}
                                             src={pleistyHistoryProduct.item_img}
                                             alt={pleistyHistoryProduct.item_title}/>
                                    </a>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            <div className={handles["children-container"]}>
                {props.children}
            </div>
        </React.Fragment>
    )
}

export default PleistyHistoryNavigation;
