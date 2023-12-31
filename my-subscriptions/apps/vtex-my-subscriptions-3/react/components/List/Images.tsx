import React, { FunctionComponent } from 'react'
import { IconCaretLeft, IconCaretRight } from 'vtex.styleguide'

import { CSS } from './utils'
import ProductImage from '../ProductImage'

import './global.css'

const Swiper = window.navigator ? require('react-id-swiper').default : null

interface Props {
  skus: Array<{
    imageUrl: string
    productName: string
  }> | null
}

const iconSize = 17
const caretClassName =
  'pv7 absolute top-50 translate--50y z-2 pointer c-action-primary'

function getParams(imagesLength: number) {
  return {
    containerClass: 'swiper-container',
    navigation:
      imagesLength > 1
        ? {
            disabledClass: `c-disabled`,
            nextEl: '.swiper-caret-next',
            prevEl: '.swiper-caret-prev',
          }
        : {},
    pagination:
      imagesLength > 1
        ? {
            bulletActiveClass:
              'c-action-primary swiper-pagination-bullet-active',
            clickable: true,
            dynamicBullets: true,
            el: '.swiper-pagination',
          }
        : {},
    // eslint-disable-next-line react/display-name
    renderNextButton: () => (
      <span className={`swiper-caret-next pl7 right-1 ${caretClassName}`}>
        <IconCaretRight size={iconSize} />
      </span>
    ),
    // eslint-disable-next-line react/display-name
    renderPrevButton: () => (
      <span className={`swiper-caret-prev pr7 left-1 ${caretClassName}`}>
        <IconCaretLeft size={iconSize} />
      </span>
    ),
    resistanceRatio: imagesLength > 1 ? 0.85 : 0,
  }
}

const SubscriptionImages: FunctionComponent<Props> = ({ skus }) => {
  const params = getParams(skus?.length ?? 0)
  return (
    <div className={CSS.subscriptionImageWrapper}>
      <Swiper {...params}>
        {skus?.map((sku, i) => (
          <div key={i} className="swiper-slide center-all pa6 w-100">
            <ProductImage
              imageUrl={sku?.imageUrl}
              productName={sku?.productName}
            />
          </div>
        ))}
      </Swiper>
    </div>
  )
}

export default SubscriptionImages
