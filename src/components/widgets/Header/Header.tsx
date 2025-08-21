import {Link} from 'react-router-dom'
import {useMediaQuery} from 'react-responsive'

import './Header.css'
import logo from '@/assets/img/marusia.svg'
import {AuthModal} from '@/components/widgets'
import {useModal} from '@/hooks'
import {AppRouter} from '@/api'
import MenuIcons from './MenuIcons'
import MenuLinks from './MenuLinks'

const Header = () => {
  const isModalOpen = useModal()
  const isMobile = useMediaQuery({query: '(max-width: 768px)'})

  return (
    <header className="header">
      <div className="header__container container">
        <Link className="logo header__logo" to={AppRouter.home.path}>
          <img className="logo__img" alt="Логотип" src={logo}></img>
        </Link>

        {isMobile ? <MenuIcons /> : <MenuLinks />}
      </div>
      {isModalOpen && <AuthModal />}
    </header>
  )
}

export default Header
