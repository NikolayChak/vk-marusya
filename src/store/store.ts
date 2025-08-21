import {configureStore} from '@reduxjs/toolkit'
import profileReducer from './slices/profileSlice'
import modalReducer from './slices/modalSlice'
import genreReducer from './slices/genreSlice'

export const store = configureStore({
  reducer: {
    profile: profileReducer,
    stateModal: modalReducer,
    genres: genreReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
