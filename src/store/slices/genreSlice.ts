import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import {getGenres, getMovieForParams} from '@/api'

export interface GenreState {
  genres: Array<{name: string; image: string}>
  isLoaded: boolean
  isError: boolean
}

const initialState: GenreState = {
  genres: [],
  isLoaded: false,
  isError: false,
}

export const fetchGenres = createAsyncThunk('genres/fetchGenres', async () => {
  try {
    const genres = await getGenres()
    const genresWithImages = await Promise.all(
      genres.map(async (genre) => ({
        name: genre,
        image: (await getMovieForParams('genre', genre))[0].posterUrl,
      }))
    )
    return genresWithImages
  } catch {
    throw new Error('Не удалось загрузить жанры')
  }
})

const genreSlice = createSlice({
  name: 'genres',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchGenres.fulfilled, (state, action) => {
      state.genres = action.payload
      state.isLoaded = true
      state.isError = false
    })
    builder.addCase(fetchGenres.rejected, (state) => {
      state.isError = true
      state.isLoaded = true
    })
  },
})

export default genreSlice.reducer
