import React from 'react'
import { KuikpayButtonPreview } from 'kuikpay-sdk'

import styles from './styles.css'
import { usePayButtonPreview } from '../../../hooks'

export const Pdp = () => {
  const { refPayButton, deviceSelected, value } = usePayButtonPreview()
  const isDesktop = deviceSelected === 'desktop'

  return (
    <div
      className={
        isDesktop ? styles.pdpContainerDesktop : styles.pdpContainerMobile
      }
    >
      {isDesktop && (
        <div className={styles.selectImageContainer}>
          <img
            src="https://personalinteractive.nizza.com/laptop-dorada.jpeg"
            alt="laptop-dorada"
          />
        </div>
      )}
      <div
        className={
          isDesktop
            ? styles.currentImgContainerDesktop
            : styles.currentImgContainerMobile
        }
      >
        <img
          src="https://personalinteractive.nizza.com/laptop-dorada.jpeg"
          alt="laptop-dorada"
        />
      </div>
      <div className={styles.infoContainer}>
        <h5>
          Computador Portátil Gaming 15.6 Intel® Core™ i5-9300H 8GB 256GB SSD
          GTX 1050
        </h5>

        <div className={styles.specificationContainer}>
          <p>Procesador</p>
          <p>Intel® Core™ i5-9300H</p>
        </div>

        <div className={styles.specificationContainer}>
          <p>Memoria del Sistema Ram</p>
          <p>8 GB</p>
        </div>

        <div className={styles.specificationContainer}>
          <p>Tamaño de Pantalla</p>
          <p>15.6 Pulgadas</p>
        </div>

        <div className={styles.payButtonContainer} ref={refPayButton}>
          <div>
            <KuikpayButtonPreview text={value} />
          </div>
        </div>
      </div>
    </div>
  )
}
