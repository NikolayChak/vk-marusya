import {useState} from 'react'
import {Link} from 'react-router-dom'

import {AppRouter} from '@/api'
import {HeaderInput} from '@/components/profile'
import {useElementClick, useProfileState, useSetModalState} from '@/hooks'
import {Menu, Searchs, User} from '@/assets/icons'

const MenuIcons = () => {
  const [isSearch, setSearch] = useState(false)
  const {name} = useProfileState()
  const {showModal} = useSetModalState()

  const handleOpenSearch = () => {
    setSearch(true)
  }

  const hideModal = () => {
    setSearch(false)
  }

  const ref = useElementClick('backdrop', hideModal)

  return (
    <>
      <ul className="menu-icon">
        <li className="menu-icon__item">
          <Link to={AppRouter.genres.path}>
            <Menu />
          </Link>
        </li>
        <li className="menu-icon__item">
          <button onClick={handleOpenSearch}>
            <Searchs fill="white" />
          </button>
        </li>
        <li className="menu-icon__item">
          {name ? (
            <Link to={AppRouter.profileFavourite.path}>
              <User fill="white" />
            </Link>
          ) : (
            <button onClick={() => !name && showModal()}>
              <User fill="white" />
            </button>
          )}
        </li>
      </ul>
      {isSearch && (
        <div ref={ref} className="backdrop backdrop__search">
          <HeaderInput hideModal={hideModal} />
        </div>
      )}
    </>
  )
}

export default MenuIcons
