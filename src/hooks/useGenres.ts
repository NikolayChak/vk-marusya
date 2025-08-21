import {fetchGenres, RootState, AppDispatch} from '@/store'
import {useDispatch, useSelector} from 'react-redux'

export const useGenres = () =>
  useSelector((state: RootState) => state.genres.genres)

export const useGenresLoaded = () =>
  useSelector((state: RootState) => state.genres.isLoaded)

export const useFetchGenres = () => {
  const dispatch = useDispatch<AppDispatch>()
  return () => dispatch(fetchGenres())
}
