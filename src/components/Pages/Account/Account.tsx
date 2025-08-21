import {Outlet} from 'react-router-dom'
import {useMediaQuery} from 'react-responsive'

import './Account.css'
import {LinkElement} from '@/components/ui'
import {Heart, User} from '@/assets/icons'
import {usePathname} from '@/hooks'
import {AppRouter} from '@/api'

const heart = <Heart stroke={'--color-white'} fill={'--transparent'} />
const user = <User fill={'white'} />

const Account = () => {
  const path = usePathname()
  const isMobile = useMediaQuery({query: '(max-width: 668px)'})

  return (
    <section className="account">
      <div className="container account__container">
        <h2 className="title account__title">Мой аккаунт</h2>
        <div className="account__links">
          <LinkElement
            title={isMobile ? 'Избранное' : 'Избранные фильмы'}
            svg={heart}
            isActive={path.includes('favourite')}
            to={AppRouter.profileFavourite.path}
          />
          <LinkElement
            title={isMobile ? 'Настройки' : 'Настройка аккаунта'}
            svg={user}
            isActive={path.includes('settings')}
            to={AppRouter.profileSettings.path}
          />
        </div>
      </div>
      <Outlet />
    </section>
  )
}

export default Account
