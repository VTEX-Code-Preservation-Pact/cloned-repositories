import React from 'react';
// @ts-ignore
import { FormattedCurrency } from 'vtex.format-currency';
// @ts-ignore
import { useCssHandles } from 'vtex.css-handles'

const CSS_HANDLES = [
    'pleisty-product-container',
    'pleisty-product-img',
    'pleisty-product-title',
    'pleisty-product-anchor',
    'pleisty-product-price',
    'pleisty-product-discount',
    'pleisty-product-old-price'
] as const;

const PleistyProduct = (props: IPleistyProductProps) => {
    const handles = useCssHandles(CSS_HANDLES);
    const { product } = props;

    const oldPrice = parseInt(product.item_oldpricestring, 10);
    const currentPrice = parseInt(product.item_pricestring, 10);
    const discount = currentPrice - oldPrice;
    const isPriceTheSame = currentPrice === oldPrice;

    return (
        <div className={handles["pleisty-product-container"]}>
            <a href={product._item_url} className={handles["pleisty-product-anchor"]}>
                <div>
                    <img
                        className={handles["pleisty-product-img"]}
                        src={product.item_img}
                        alt={product.item_title}/>
                </div>
                <div>
                    <h4 className={handles["pleisty-product-title"]}>
                        <span>{product.item_title}</span>
                    </h4>
                </div>
            </a>
            {!isPriceTheSame ? (
                oldPrice && (
                    <div className={handles["pleisty-product-old-price"]}>
                        <FormattedCurrency value={oldPrice}/>
                    </div>
                )
            ) : null}
            {discount ? (
                discount && (
                    <div className={handles["pleisty-product-discount"]}>
                        <FormattedCurrency
                            value={discount}/>
                    </div>
                )
            ) : null}
            {currentPrice && (
                <div className={handles["pleisty-product-price"]}>
                    <FormattedCurrency value={currentPrice}/>
                </div>
            )}
        </div>
    );
};

export default PleistyProduct;
