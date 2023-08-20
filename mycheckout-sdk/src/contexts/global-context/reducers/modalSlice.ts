import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  name: 'modal',
  initialState: {
    isOpen: false,
    isMinimized: false,
  },
  reducers: {
    openModal: (state) => {
      state.isOpen = true
    },
    closeModal: (state) => {
      state.isOpen = false
      state.isMinimized = false
    },
    minimizeModal: (state) => {
      state.isOpen = false
      state.isMinimized = true
    },
    maximizeModal: (state) => {
      state.isOpen = true
      state.isMinimized = false
    },
  },
})

export const { openModal, closeModal, minimizeModal, maximizeModal } =
  slice.actions

export default slice.reducer

export const selectIsModalOpen = (state: any): boolean => state.modal.isOpen
