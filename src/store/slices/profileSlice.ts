import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import {getProfile, logoutUser} from '@/api'

export interface ProfileState {
  email: string
  name: string
  surname: string
  favorites: string[]
  isLoaded: boolean
  isError: boolean
  isLoggingOut: boolean
  logoutError: string | null
}

const initialState: ProfileState = {
  email: '',
  name: '',
  surname: '',
  favorites: [],
  isLoaded: false,
  isError: false,
  isLoggingOut: false,
  logoutError: null,
}

export const fetchProfile = createAsyncThunk(
  'profile/fetchProfile',
  async () => {
    try {
      const profile = await getProfile()
      if (!profile) {
        throw new Error('Ошибка авторизации')
      }
      return profile
    } catch {
      throw new Error('Не удалось загрузить профиль')
    }
  }
)

export const logout = createAsyncThunk(
  'profile/logout',
  async (_, {rejectWithValue}) => {
    try {
      await logoutUser()
    } catch {
      return rejectWithValue('Ошибка выхода из аккаунта')
    }
  }
)

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProfile.fulfilled, (state, action) => {
      Object.assign(state, action.payload)
      state.isLoaded = true
      state.isError = false
    })
    builder.addCase(fetchProfile.rejected, (state) => {
      state.isError = true
      state.isLoaded = true
    })

    builder.addCase(logout.pending, (state) => {
      state.isLoggingOut = true
      state.logoutError = null
    })
    builder.addCase(logout.fulfilled, () => {
      return initialState
    })
    builder.addCase(logout.rejected, (state, action) => {
      state.isLoggingOut = false
      state.logoutError = action.payload as string
    })
  },
})

export default profileSlice.reducer
