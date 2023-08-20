import { createSlice } from '@reduxjs/toolkit'

export interface CounterSecond {
  second: number
  intervalSetSecond: ReturnType<typeof setInterval>
}

const initialState: CounterSecond = {
  second: 60,
  intervalSetSecond: null,
}

const counter = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    setSecond: (state) => {
      state.second -= 1
    },
    setSecondDirect: (state, action) => {
      state.second = action.payload
    },
    restart: (state) => {
      state.second = 60
    },
    intervalSetSecond: (state, action) => {
      state.intervalSetSecond = action.payload
    },
  },
})

export const { setSecond, restart, setSecondDirect, intervalSetSecond } =
  counter.actions

export default counter.reducer

export const selectSecond = (state: any): number =>
  state.secondAfterEmailReducer.second
export const selectIntervalSetSecond = (state: any): number =>
  state.secondAfterEmailReducer.intervalSetSecond
