import React from 'react'

import {
  Dropup,
  Delete,
  ArrowBack,
  LiteClose,
  CreditCard,
  LiteEdit,
  LiteLocation,
  MyData,
  MyOrder,
  MyProfile,
  Shipping,
} from '../../Icons'
import { LogoMyCheckout } from '../../Icons/LogoMycheckout'
import globalStyles from '../../../myCheckout-styles.module.css'
import stylesButton from '../../shared/Button/button.css'
import stylesHeader from '../../Header/header.css'
import stylesInfoItem from '../../shared/InfoItem/infoItem.module.css'
import stylesInformationView from '../../UserInfo/InformationView/informationView.module.css'
import stylesItem from '../../Summary/Item/item.css'
import stylesModal from '../../Modal/modal.css'
import stylesSummary from '../../Summary/summary-modules.css'
import stylesTitle from '../../shared/Title/title.css'
import stylesTotals from '../../Summary/Totals/totals.css'
import stylesUserInfo from '../../UserInfo/userInfo-module.css'

export const KuikpayModalPreview = () => {
  return (
    <div className={globalStyles.Checkoutless}>
      <div id="kuikpay-modal" className={stylesModal.modalContainer}>
        <div className={stylesHeader.headerContainer}>
          <div
            className={`${stylesHeader.headerContent} ${stylesHeader.headerBoxShadow}`}
          >
            <div className={stylesHeader.headerFlex}>
              <a>
                <ArrowBack
                  className={`${globalStyles.cursorPointer} ${stylesHeader.headerIcon}`}
                  fill={globalStyles.iconAlternative}
                />
              </a>
            </div>
            <LogoMyCheckout className={stylesHeader.headerLogo} />
            <div
              className={`${stylesHeader.headerIconClose} ${stylesHeader.headerFlex}`}
            >
              <a>
                <LiteClose
                  className={`${globalStyles.cursorPointer} ${stylesHeader.headerIcon}`}
                  background={globalStyles.iconBackground}
                  fill={globalStyles.iconAlternative}
                />
              </a>
            </div>
          </div>
        </div>
        <div className={stylesModal.modalBodyWrapper}>
          <div className={stylesUserInfo.userInfoContainer}>
            <div className={stylesTitle.titleContainer}>
              <div className={stylesTitle.titleContent}>
                <div className={stylesTitle.titleIcon}>
                  <MyData fill={globalStyles.iconAlternativeSecondary} />
                </div>
                <div className={stylesTitle.titlePrimary}>
                  <span>Mis datos</span>
                </div>
              </div>
            </div>
            <div
              className={`${stylesInfoItem.infoItemContainer} ${stylesInformationView.informationViewContent}`}
            >
              <div className={stylesInfoItem.infoItemIcon}>
                <MyProfile
                  fill={globalStyles.iconAlternative}
                  width={16}
                  height={16}
                />
              </div>
              <div className={stylesInfoItem.infoItemContent}>
                juan.galvis@vtex.com.br
              </div>
              <div
                className={`${stylesInfoItem.infoItemContent} ${stylesInformationView.informationViewEdit} ${globalStyles.cursorPointer}`}
              >
                <LiteEdit fill={globalStyles.iconAlternative} />
              </div>
            </div>
            <div
              className={`${stylesInfoItem.infoItemContainer} ${stylesInformationView.informationViewContent}`}
            >
              <div className={stylesInfoItem.infoItemIcon}>
                <LiteLocation
                  fill={globalStyles.iconAlternative}
                  width={18}
                  height={18}
                />
              </div>
              <div className={stylesInfoItem.infoItemContent}>
                Car******************5 Bog********. - BOG********.
              </div>
              <div
                className={`${stylesInfoItem.infoItemContent} ${stylesInformationView.informationViewEdit} ${globalStyles.cursorPointer}`}
              >
                <LiteEdit fill={globalStyles.iconAlternative} />
              </div>
            </div>
            <div
              className={`${stylesInfoItem.infoItemContainer} ${stylesInformationView.informationViewContent}`}
            >
              <div className={stylesInfoItem.infoItemIcon}>
                <Shipping fill={globalStyles.iconAlternative} />
              </div>
              <div className={stylesInfoItem.infoItemContent}>
                Envío Express
              </div>
              <div
                className={`${stylesInfoItem.infoItemContent} ${stylesInformationView.informationViewEdit} ${globalStyles.cursorPointer}`}
              >
                <LiteEdit fill={globalStyles.iconAlternative} />
              </div>
            </div>
            <div
              className={`${stylesInfoItem.infoItemContainer} ${stylesInformationView.informationViewContent}`}
            >
              <div className={stylesInfoItem.infoItemIcon}>
                <CreditCard
                  fill={globalStyles.iconAlternative}
                  width={16}
                  height={16}
                />
              </div>
              <div className={stylesInfoItem.infoItemContent}>
                *** *** *** 1344
              </div>
              <div
                className={`${stylesInfoItem.infoItemContent} ${stylesInformationView.informationViewEdit} ${globalStyles.cursorPointer}`}
              >
                <LiteEdit fill={globalStyles.iconAlternative} />
              </div>
            </div>
            <div className={stylesSummary.summaryContainer}>
              <div
                className={`${stylesTitle.titleContainer} ${stylesSummary.summaryTitle}`}
              >
                <div className={stylesTitle.titleContent}>
                  <div className="_kuikpay-title__titleIcon">
                    <MyOrder
                      fill={globalStyles.iconPrimary}
                      width={24}
                      height={24}
                    />
                  </div>
                  <div className={stylesTitle.titlePrimary}>
                    <span>Mi orden</span>
                  </div>
                </div>
                <a className={stylesSummary.summaryIconCollapsible}>
                  <Dropup fill={globalStyles.iconPrimary} />
                </a>
              </div>
              <div className={stylesSummary.summaryContent}>
                <div className={stylesSummary.summaryItems}>
                  <div
                    className={`${stylesItem.itemContainer} ${globalStyles.borderBottom}`}
                  >
                    <div className={stylesItem.itemContent}>
                      <div className={stylesItem.itemDeleteContainer}>
                        <a>
                          <Delete
                            fill={globalStyles.iconAlternative}
                            background={globalStyles.iconBackground}
                            backgroundSecondary={
                              globalStyles.iconBackgroundSecondary
                            }
                          />
                        </a>
                      </div>
                      <div className={stylesItem.itemImageContainer}>
                        <img
                          width="74"
                          height="74"
                          src="http://amalia.vteximg.com.br/arquivos/ids/158065-300-360/04-suiza-flores_negra-1.jpg?v=637460854554700000"
                          alt="Blusa Suiza Negro flores Talla S - Color Negro flores"
                        />
                      </div>
                      <div className={stylesItem.itemRightContainer}>
                        <div className={stylesItem.itemRightMiddle}>
                          <div className={stylesItem.itemRightMiddleName}>
                            <p>
                              Blusa Suiza Negro flores Talla S - Color Negro
                              flores
                            </p>
                          </div>
                          <p>1 un</p>
                        </div>
                        <div className={stylesItem.itemPriceContainer}>
                          <p className={stylesItem.itemPriceBold}>$58,000</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className={`${stylesItem.itemContainer} ${globalStyles.borderBottom}`}
                  >
                    <div className={stylesItem.itemContent}>
                      <div className={stylesItem.itemDeleteContainer}>
                        <a>
                          <Delete
                            fill={globalStyles.iconAlternative}
                            background={globalStyles.iconBackground}
                            backgroundSecondary={
                              globalStyles.iconBackgroundSecondary
                            }
                          />
                        </a>
                      </div>
                      <div className={stylesItem.itemImageContainer}>
                        <img
                          width="74"
                          height="74"
                          src="http://amalia.vteximg.com.br/arquivos/ids/158061-300-360/02-Suecia-Rayas-colores-1.jpg?v=637460854523970000"
                          alt="Chaleco Suecia Rayas colores Talla XS/S - Color Rayas colores"
                        />
                      </div>
                      <div className={stylesItem.itemRightContainer}>
                        <div className={stylesItem.itemRightMiddle}>
                          <div className={stylesItem.itemRightMiddleName}>
                            <p>
                              Blusa Suiza Negro flores Talla S - Color Negro
                              flores
                            </p>
                          </div>
                          <p>1 un</p>
                        </div>
                        <div className={stylesItem.itemPriceContainer}>
                          <p className={stylesItem.itemPriceBold}>$58,000</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={stylesTotals.totalsContainer}>
                  <div className={stylesTotals.totalsTextOveflow}>
                    <p className={stylesTotals.totalsLabel}>Subtotal</p>
                    <p className={stylesTotals.totalsLabel}>Envío</p>
                    <p className={stylesTotals.totalsLabel}>
                      Impuesto de bolsas plásticas
                    </p>
                    <div className={stylesTotals.totalsDiscounts}></div>
                    <p className={stylesTotals.totalsLabel}>Total</p>
                  </div>
                  <div className={stylesTotals.totalsValues}>
                    <p className={stylesTotals.totalsLabel}>$92,300</p>
                    <p className={stylesTotals.totalsLabel}>$5,000</p>
                    <p className={stylesTotals.totalsLabel}>$200</p>
                    <div className={stylesTotals.totalsDiscounts}></div>
                    <p className={stylesTotals.totalsLabel}>$97,500</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className={`${globalStyles.buyButtonContainer} ${globalStyles.buyButtonContainerFixed}`}
        >
          <div className={globalStyles.w100}>
            <div className={stylesButton.buttonContent}>
              <input
                className={stylesButton.buttonContainer}
                type="button"
                data-secondary="on"
                value="Pagar $97,500 - 2 Und"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
