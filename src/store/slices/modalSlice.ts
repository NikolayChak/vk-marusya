import {createSlice} from '@reduxjs/toolkit'

export interface ModalState {
  value: boolean
}

const initialState: ModalState = {
  value: false,
}

export const modalSlice = createSlice({
  name: 'stateModal',
  initialState,

  reducers: {
    openModal: (state) => {
      state.value = true
    },
    closeModal: (state) => {
      state.value = false
    },
  },
})

export const {openModal, closeModal} = modalSlice.actions

export default modalSlice.reducer
