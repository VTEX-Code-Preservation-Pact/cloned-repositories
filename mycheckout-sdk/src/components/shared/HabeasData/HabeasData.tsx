import React, { Fragment } from 'react'

// import useFormatMessage from '../../../i18n/useFormatMessage'
import type {
  HabeasDataInformation,
  StoreTermsAndConditionsContent,
} from '../../../interfaces'
import Checkbox from '../Checkbox/Checkbox'
import styles from './habeasData.css'

interface Props {
  habeasData: boolean
  habeasDataConfiguration: HabeasDataInformation
  storeTermsAndConditions: unknown
  storeTermsAndConditionsContent: StoreTermsAndConditionsContent[]
  onCheckboxChange: (id?: string) => void
  onStoreCheckboxChange: (id: string) => void
}

export const HabeasData = ({
  // habeasData,
  // habeasDataConfiguration,
  storeTermsAndConditions,
  storeTermsAndConditionsContent,
  // onCheckboxChange,
  onStoreCheckboxChange,
}: Props) => {
  return (
    <Fragment>
      {/* <div className={styles.habeasDataContainer}>
        <div className={styles.habeasDataCheckbox}>
          <Checkbox
            isSelected={habeasData}
            onCheckboxChange={onCheckboxChange}
          />
        </div>
        <p>
          {useFormatMessage('store/checkoutless.register.habeasData', {
            terms: (
              <a
                className={styles.habeasDataLink}
                href={habeasDataConfiguration?.url}
                target="_blank"
              >
                {useFormatMessage(
                  'store/checkoutless.register.habeasData.terms'
                )}
              </a>
            ),
            privacy: (
              <a>
                {useFormatMessage(
                  'store/checkoutless.register.habeasData.privacy'
                )}
              </a>
            ),
          })}
        </p>
      </div> */}
      {storeTermsAndConditionsContent?.map((storeTermsAndCondition) => {
        return (
          <div
            key={storeTermsAndCondition?.id}
            className={styles.habeasDataContainer}
          >
            <div className={styles.habeasDataCheckbox}>
              <Checkbox
                id={storeTermsAndCondition?.id}
                isSelected={
                  storeTermsAndConditions[storeTermsAndCondition.id]?.isSelected
                }
                onCheckboxChange={onStoreCheckboxChange}
              />
            </div>
            <div
              dangerouslySetInnerHTML={{
                __html: storeTermsAndCondition?.content,
              }}
            ></div>
          </div>
        )
      })}
    </Fragment>
  )
}
