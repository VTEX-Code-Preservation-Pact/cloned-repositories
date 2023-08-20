import { renderHook, act } from '@testing-library/react-hooks'

import useTableMeasures, { DesitySizes, Density } from '../useTableMeasures'

describe('Table V2 @ hooks/useTableMeasures spec', () => {
  const TABLE_SIZE = 5
  it('changes density correctly', () => {
    const { result } = renderHook(() => useTableMeasures({ size: TABLE_SIZE }))

    expect(result.current.density).toBe(Density.Regular)
    expect(result.current.rowHeight).toBe(DesitySizes.Regular)

    act(() => {
      result.current.setDensity(Density.Comfortable)
    })

    expect(result.current.density).toBe(Density.Comfortable)
    expect(result.current.rowHeight).toBe(DesitySizes.Comfortable)

    act(() => {
      result.current.setDensity(Density.Compact)
    })

    expect(result.current.density).toBe(Density.Compact)
    expect(result.current.rowHeight).toBe(DesitySizes.Compact)

    act(() => {
      result.current.setDensity(Density.Regular)
    })

    expect(result.current.density).toBe(Density.Regular)
    expect(result.current.rowHeight).toBe(DesitySizes.Regular)
  })

  it('calculates tableHeight correctly', () => {
    const { result } = renderHook(() => useTableMeasures({ size: TABLE_SIZE }))

    expect(result.current.tableHeight).toBe(276 + TABLE_SIZE)

    act(() => {
      result.current.setDensity(Density.Comfortable)
    })

    expect(result.current.tableHeight).toBe(416 + TABLE_SIZE)

    act(() => {
      result.current.setDensity(Density.Compact)
    })

    expect(result.current.tableHeight).toBe(196 + TABLE_SIZE)

    act(() => {
      result.current.setDensity(Density.Regular)
    })

    expect(result.current.tableHeight).toBe(276 + TABLE_SIZE)
  })
})
