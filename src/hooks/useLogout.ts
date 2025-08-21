import {AppDispatch, logout, RootState} from '@/store'
import {useDispatch, useSelector, shallowEqual} from 'react-redux'
import {useMemo} from 'react'

export const useLogoutState = () => {
  const {isLoggingOut, logoutError} = useSelector(
    (state: RootState) => ({
      isLoggingOut: state.profile.isLoggingOut,
      logoutError: state.profile.logoutError,
    }),
    shallowEqual
  )

  return useMemo(
    () => ({isLoggingOut, logoutError}),
    [isLoggingOut, logoutError]
  )
}

export const useLogout = () => {
  const dispatch = useDispatch<AppDispatch>()
  return () => dispatch(logout())
}
