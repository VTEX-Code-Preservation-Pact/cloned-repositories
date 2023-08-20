/* eslint-disable no-restricted-imports */
import React, { useEffect, useMemo, useState } from 'react'
import { Dropdown, DatePicker } from 'vtex.styleguide'
import { FormattedMessage, useIntl } from 'react-intl'
import { pathOr } from 'ramda'

import styles from '../../styles.css'
import dateIcon from '../../assets/icons/outline-today.svg'
import arrowDown from '../../assets/icons/arrow_down.svg'
import {
  getDateIntoOptionValue,
  formatCurrentDayPicker,
} from '../../utils/utilsStatistics'
import { OptionsMessage } from './OptionsMessage'
import { useStatisticsContext } from './index'

const Filters = () => {
  const intl = useIntl()
  const selectOptions = [
    {
      label: intl.formatMessage({
        id: 'checkoutless.statistics.filter.select',
      }),
      value: '',
    },
    {
      label: intl.formatMessage({ id: 'checkoutless.statistics.filter.today' }),
      value: 'today',
    },
    {
      label: intl.formatMessage({
        id: 'checkoutless.statistics.filter.yesterday',
      }),
      value: 'yesterday',
    },
    {
      label: intl.formatMessage({
        id: 'checkoutless.statistics.filter.lastWeek',
      }),
      value: 'lastWeek',
    },
    {
      label: intl.formatMessage({
        id: 'checkoutless.statistics.filter.lastMonth',
      }),
      value: 'lastMonth',
    },
    {
      label: intl.formatMessage({
        id: 'checkoutless.statistics.filter.person',
      }),
      value: 'person',
    },
  ]

  const {
    filters,
    setFilters,
    onSubmitFilters,
    setChecked: setCompare,
    checked: compare,
    setFirstPicker,
    setSecondPicker,
    setThirdPicker,
    setFourPicker,
    setFirstSelectOption,
    setSecondSelectOption,
  } = useStatisticsContext()

  const [open, setOpen] = useState(false)

  const [optionFirstValue, setOptionFirstValue] = useState('')
  const [initialFirstPicker, setInitialFirstPicker] = useState(new Date())
  const [finalFirstPicker, setFinalFirstPicker] = useState(new Date())

  const [optionSecondValue, setOptionSecondValue] = useState('')
  const [initialSecondPicker, setInitialSecondPicker] = useState(new Date())
  const [finalSecondPicker, setFinalSecondPicker] = useState(new Date())

  const currentDate = useMemo(() => new Date().toLocaleDateString(), [])

  const [onPreviousFrom, setOnPreviousFrom] = useState<any>()
  const [onPreviousUntil, setOnPreviousUntil] = useState<any>()

  const [onSelectedFrom, setOnSelectedFrom] = useState<any>()
  const [onSelectedUntil, setOnSelectedUntil] = useState<any>()

  const onHandleState = () => {
    setOpen(!open)
    setOnPreviousFrom(formatCurrentDayPicker(new Date()))
  }

  useEffect(() => {
    const parse = getDateIntoOptionValue(
      optionSecondValue,
      initialSecondPicker,
      finalSecondPicker
    )

    setOnPreviousFrom(pathOr(new Date(), ['initial'], parse))
    setOnPreviousUntil(pathOr(new Date(), ['final'], parse))
    setFilters({
      ...filters,
      previousFrom: pathOr(new Date(), ['initial'], parse),
      previousUntil: pathOr(new Date(), ['final'], parse),
    })
  }, [optionSecondValue, initialSecondPicker, finalSecondPicker])

  useEffect(() => {
    const parse = getDateIntoOptionValue(
      optionFirstValue,
      initialFirstPicker,
      finalFirstPicker
    )

    setOnSelectedFrom(pathOr(new Date(), ['initial'], parse))
    setOnSelectedUntil(pathOr(new Date(), ['final'], parse))
    setFilters({
      ...filters,
      selectedFrom: pathOr(new Date(), ['initial'], parse),
      selectedUntil: pathOr(new Date(), ['final'], parse),
    })
  }, [optionFirstValue, initialFirstPicker, finalFirstPicker])

  useEffect(() => {
    setFirstPicker(initialFirstPicker)
  }, [initialFirstPicker])

  useEffect(() => {
    setSecondPicker(finalFirstPicker)
  }, [finalFirstPicker])

  useEffect(() => {
    setThirdPicker(initialSecondPicker)
  }, [initialSecondPicker])

  useEffect(() => {
    setFourPicker(finalSecondPicker)
  }, [finalSecondPicker])

  useEffect(() => {
    setFirstSelectOption(optionFirstValue)
  }, [optionFirstValue])

  useEffect(() => {
    setSecondSelectOption(optionSecondValue)
  }, [optionSecondValue])

  return (
    <>
      <div className="flex">
        <img src={dateIcon} alt="date-icon" className={styles.dateIcon} />
        <button onClick={onHandleState} className={styles.btnFilters}>
          {currentDate}
          <img src={arrowDown} alt="arrow-down" className={styles.arrowDown} />
        </button>
      </div>
      <div className={open ? `${styles.containerFilters}` : `${styles.hidden}`}>
        <div>
          <OptionsMessage />
          <div className="mb5">
            <Dropdown
              label={<FormattedMessage id="checkoutless.statistics.period" />}
              size="small"
              options={selectOptions}
              value={optionFirstValue}
              onChange={(e: any) => setOptionFirstValue(e.target.value)}
            />
            {optionFirstValue === 'person' && (
              <div
                className={`${styles.containerDatePicker} ${styles.firstContainerPicker}`}
              >
                <DatePicker
                  size="small"
                  name="initialFirstPicker"
                  value={initialFirstPicker}
                  onChange={(date: any) => setInitialFirstPicker(date)}
                  locale="en-US"
                />
                <div className="mr3 ml3">_</div>
                <DatePicker
                  size="small"
                  name="finalFirstPicker"
                  value={finalFirstPicker}
                  onChange={(date: any) => setFinalFirstPicker(date)}
                  locale="en-US"
                />
              </div>
            )}
          </div>
          <div className="mb5">
            <input
              type="checkbox"
              onChange={() => setCompare(!compare)}
              checked={compare}
              className={styles.checkCompare}
            />
            <span className={`${styles.tagDescription} ${styles.textCompare}`}>
              <FormattedMessage id="checkoutless.statistics.compare" />
            </span>
          </div>
          <div className="mb5">
            <Dropdown
              label={<FormattedMessage id="checkoutless.statistics.period" />}
              size="small"
              disabled={!compare}
              options={selectOptions}
              value={optionSecondValue}
              onChange={(e: any) => setOptionSecondValue(e.target.value)}
            />
            {optionSecondValue === 'person' && (
              <div
                className={`${styles.containerDatePicker} ${styles.secondContainerPicker}`}
              >
                <DatePicker
                  size="small"
                  name="initialSecondPicker"
                  value={initialSecondPicker}
                  onChange={(date: any) => setInitialSecondPicker(date)}
                  locale="en-US"
                />
                <div className="mr3 ml3">_</div>
                <DatePicker
                  size="small"
                  name="finalSecondPicker"
                  value={finalSecondPicker}
                  onChange={(date: any) => setFinalSecondPicker(date)}
                  locale="en-US"
                />
              </div>
            )}
          </div>
        </div>
        <button
          className={styles.btnAccept}
          onClick={() => {
            onSubmitFilters(
              filters.visualization,
              onSelectedFrom,
              onSelectedUntil,
              onPreviousFrom,
              onPreviousUntil
            )
            onHandleState()
          }}
        >
          <FormattedMessage id="checkoutless.statistics.accept" />
        </button>
        <button onClick={onHandleState} className={styles.btnCancel}>
          <FormattedMessage id="checkoutless.statistics.cancel" />
        </button>
      </div>
    </>
  )
}

export default Filters
