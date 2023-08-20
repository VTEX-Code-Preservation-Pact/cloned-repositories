import type { ChangeEvent } from 'react'
import React, { useState, useMemo } from 'react'
import { Button, Modal, Input } from 'vtex.styleguide'
import { defineMessages, messages, useIntl } from 'react-intl'

import { Dropdown } from './Dropdown'
import { fonts } from '../../../../constants'
import { Row } from '../Row'
import styles from './styles.css'

const messages = defineMessages({
  fontLabel: { id: 'checkoutless.styleSettings.menu-font' },
  advancedBtnLabel: { id: 'checkoutless.styleSettings.menu-font-advanced-btn' },
  advancedDescription: {
    id: 'checkoutless.styleSettings.menu-font-advanced-description',
  },
  selectBtnLabel: { id: 'checkoutless.button-select' },
})

interface Props {
  value: string
  action: (args: string) => void
}

const fontsExample = '"Gill Sans Extrabol", Helvetica, sans-serif'

export const FontSettings = ({ value, action }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [advanceFont, setAdvanceFont] = useState('')

  const { formatMessage } = useIntl()

  const handleOpenModal = () => setIsModalOpen(true)
  const handleCloseModal = () => setIsModalOpen(false)

  const handleSetFont = () => {
    if (!advanceFont) return
    action(advanceFont)
    handleCloseModal()
  }

  const AdvancedButton = useMemo(() => {
    return (
      <div className={styles.advancedButtonContainer}>
        <Button
          onClick={handleOpenModal}
          variation="secondary"
          size="regular"
          block
        >
          {formatMessage(messages.advancedBtnLabel)}
        </Button>
      </div>
    )
  }, [formatMessage])

  const getFonts = (arrayFonts: string[]) =>
    arrayFonts.map((font, i) => ({
      label: font,
      onClick: () => action(font),
      disabled: i === 0,
    }))

  const options = [
    ...getFonts(fonts.sansSerifFamily),
    ...getFonts(fonts.serifFamily),
  ]

  return (
    <Row label={messages.fontLabel}>
      <>
        <div className={styles.actionMenuContainer}>
          <Dropdown options={options} button={AdvancedButton} value={value} />
        </div>
        <Modal
          title={formatMessage(messages.advancedBtnLabel)}
          centered
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        >
          <div className={styles.modalBody}>
            <p> {formatMessage(messages.advancedDescription)}</p>
            <p
              className={`${styles.modalCode} t-code`}
            >{`{ font-family: ${fontsExample} }`}</p>
            <div className={styles.modalFrom}>
              <div className="mv4">
                <Input
                  value={advanceFont}
                  placeholder={`${fontsExample}`}
                  label="Font-Family"
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setAdvanceFont(e.target.value)
                  }
                />
              </div>

              <div className="mv4">
                <Button
                  variation="primary"
                  size="regular"
                  onClick={handleSetFont}
                >
                  {formatMessage(messages.selectBtnLabel)}
                </Button>
              </div>
            </div>
          </div>
        </Modal>
      </>
    </Row>
  )
}
