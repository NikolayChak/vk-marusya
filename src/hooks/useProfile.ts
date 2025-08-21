import {useDispatch, useSelector} from 'react-redux'
import {RootState, AppDispatch, fetchProfile} from '@/store'

export const useProfileState = () =>
  useSelector((state: RootState) => state.profile)

export const useProfileLoaded = () =>
  useSelector((state: RootState) => state.profile.isLoaded)

export const useFetchProfile = () => {
  const dispatch = useDispatch<AppDispatch>()
  return () => dispatch(fetchProfile())
}
