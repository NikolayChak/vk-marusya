import {useMediaQuery} from 'react-responsive'

import {AppRouter} from '@/api'
import {HeaderInput} from '@/components/profile'
import {usePathname, useProfileState, useSetModalState} from '@/hooks'
import {LinkElement} from '@/components/ui'

const MenuLinks = () => {
  const path = usePathname()
  const {name} = useProfileState()
  const {showModal} = useSetModalState()
  const isTablet = useMediaQuery({query: '(max-width: 1024px)'})

  return (
    <>
      <div className="header__wrap">
        <nav className="nav header__nav">
          <div className="nav__list">
            {!isTablet && (
              <LinkElement
                title="Главная"
                to={AppRouter.home.path}
                isActive={path === AppRouter.home.path}
              />
            )}

            <LinkElement
              title="Жанры"
              to={AppRouter.genres.path}
              isActive={path === AppRouter.genres.path}
            />
          </div>
        </nav>
        <HeaderInput />
      </div>

      {name ? (
        <LinkElement
          title={name}
          to={AppRouter.profileFavourite.path}
          isActive={path.startsWith(AppRouter.profile.path)}
        />
      ) : (
        <button onClick={() => !name && showModal()} className="item">
          {name ? name : 'Войти'}
        </button>
      )}
    </>
  )
}

export default MenuLinks
