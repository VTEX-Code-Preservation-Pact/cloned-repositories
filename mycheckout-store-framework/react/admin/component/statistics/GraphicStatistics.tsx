import React from 'react'
import {
  ResponsiveContainer,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
} from 'recharts'
import { Tag, RadioGroup, Spinner } from 'vtex.styleguide'
import { FormattedMessage } from 'react-intl'

import { useStatisticsContext } from './index'
import { formatCurrentDayPicker } from '../../utils/utilsStatistics'
import styles from '../../styles.css'

const GraphicStatistics = () => {
  const {
    graphicInfo,
    filters,
    setFilters,
    onSubmitFilters,
    checked,
    firstPicker,
    secondPicker,
    thirdPicker,
    fourPicker,
    firstSelectOption,
    secondSelectOption,
    loading,
  } = useStatisticsContext()

  const getFirstPicker = formatCurrentDayPicker(firstPicker)
  const getSecondPicker = formatCurrentDayPicker(secondPicker)
  const getThirdPicker = formatCurrentDayPicker(thirdPicker)
  const getFourPicker = formatCurrentDayPicker(fourPicker)

  return (
    <div>
      <div className={styles.containerGraph}>
        <div className={styles.tagsAndRadioBtns}>
          <div className={styles.containerTags}>
            <span className={`${styles.tagDescription} mt2`}>
              <Tag bgColor="#EB5B2B" color="#fff" />
              {firstSelectOption === 'person' && onSubmitFilters
                ? `${getFirstPicker} | ${getSecondPicker}`
                : `${filters.selectedFrom}`}
            </span>
            {typeof filters.selectedFrom === typeof filters.previousFrom &&
              onSubmitFilters &&
              checked && (
                <span className={`${styles.tagDescription} mt1`}>
                  <Tag bgColor="#284859" color="#fff" />
                  {secondSelectOption === 'person'
                    ? `${getThirdPicker} | ${getFourPicker}`
                    : `${filters.previousFrom}`}
                </span>
              )}
          </div>
          <RadioGroup
            name="period"
            options={[
              {
                value: 'd',
                label: <FormattedMessage id="checkoutless.statistics.day" />,
              },
              {
                value: 'm',
                label: <FormattedMessage id="checkoutless.statistics.month" />,
              },
              {
                value: 'y',
                label: <FormattedMessage id="checkoutless.statistics.year" />,
              },
            ]}
            value={filters?.visualization}
            onChange={(e: any) => {
              setFilters({
                ...filters,
                visualization: e.target.value,
              })
              onSubmitFilters(e.target.value)
            }}
          />
        </div>
        {loading && (
          <div className={styles.containerLoader}>
            <Spinner />
          </div>
        )}
        <div className={styles.chart}>
          <div className={styles.chartContainer}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                width={1000}
                height={500}
                data={graphicInfo}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="use"
                  stroke="#EB5B2B"
                  activeDot={{ r: 8 }}
                />
                <Line type="monotone" dataKey="previous" stroke="#284859" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GraphicStatistics
