import {animated} from 'react-spring'
import {useNavigate} from 'react-router-dom'
import {useMemo} from 'react'

import './AccountSettings.css'
import {Button, Error, SettingElement} from '@/components/ui'
import {
  useLogout,
  useLogoutState,
  useListTransitions,
  useProfileState,
} from '@/hooks'
import {Mail} from '@/assets/icons'
import {AppRouter} from '@/api'

const mail = <Mail fill={'white'} />

const AccountSettings = () => {
  const navigate = useNavigate()
  const profile = useProfileState()

  const memoProfile = useMemo(
    () => profile,
    [profile.email, profile.name, profile.surname]
  )

  const transitions = useListTransitions(
    [memoProfile.email],
    () => memoProfile.email
  )

  const logout = useLogout()
  const {isLoggingOut, logoutError} = useLogoutState()

  const handleSubmit = (event: {preventDefault: () => void}) => {
    event.preventDefault()
    void logout()
    navigate(AppRouter.home.path)
  }

  return transitions((style) => (
    <animated.div style={style} className={'container container--set'}>
      <div className="settings title--mb">
        <SettingElement
          name={`${memoProfile.surname} ${memoProfile.name}`}
          element={`${memoProfile.surname[0]}${memoProfile.name[0]}`}
          className="info__name"
          title="Имя Фамилия"
        />
        <SettingElement
          name={memoProfile.email}
          element={mail}
          className="info__mail"
          title="Электронная почта"
        />
      </div>
      <Button
        onClick={handleSubmit}
        isLoading={isLoggingOut}
        name="Выйти из аккаунта"
        isActive
      />
      {logoutError && <Error message={logoutError} />}
    </animated.div>
  ))
}

export default AccountSettings
