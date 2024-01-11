import { hasSLAs } from './SlasUtils'

describe('', () => {
  it('should return true if an ARRAY of logisticsInfo has Slas', () => {
    const logisticsInfo = [
      {
        slas: [{}],
      },
    ]

    const result = hasSLAs(logisticsInfo)

    expect(result).toEqual(true)
  })

  it('should return true if logisticsInfo has Slas', () => {
    const logisticsInfo = {
      slas: [{}],
    }

    const result = hasSLAs(logisticsInfo)

    expect(result).toEqual(true)
  })

  it('should return true if an array of Slas has slas', () => {
    const slas = [{}]

    const result = hasSLAs(slas)

    expect(result).toEqual(true)
  })

  it('should return false if an array of Slas does NOT have slas', () => {
    const slas = []

    const result = hasSLAs(slas)

    expect(result).toEqual(false)
  })

  it('should return false if logisticsInfo does NOT have slas', () => {
    const logisticsInfo = {
      slas: {},
    }

    const result = hasSLAs(logisticsInfo)

    expect(result).toEqual(false)
  })

  it('should return false if an ARRAY of logisticsInfo does NOT have slas', () => {
    const logisticsInfo = [
      {
        slas: {},
      },
    ]

    const result = hasSLAs(logisticsInfo)

    expect(result).toEqual(false)
  })

  it('should return false if an EMPTY ARRAY is passed', () => {
    const emptyArray = []

    const result = hasSLAs(emptyArray)

    expect(result).toEqual(false)
  })

  it('should return false if an EMPTY object is passed', () => {
    const emptyObject = {}

    const result = hasSLAs(emptyObject)

    expect(result).toEqual(false)
  })

  it('should return false if UNDEFINED is passed', () => {
    const result = hasSLAs()

    expect(result).toEqual(false)
  })
})
