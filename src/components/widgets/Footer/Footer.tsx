import './Footer.css'
import {Odnoklassniki, Telegram, Vkontakte, Youtube} from '@/assets/icons'
import {ItemButton} from '@/components/ui'

const fillColor = '#FFFFFFCC'

export type ButtonObjectType = {
  svg: JSX.Element
  to: string
}

type buttonArrayType = {
  id: string
  data: ButtonObjectType
}

const buttonArray: buttonArrayType[] = [
  {
    id: 'vk',
    data: {
      svg: <Vkontakte fill={fillColor} />,
      to: 'https://vk.com/',
    },
  },
  {
    id: 'ok',
    data: {
      svg: <Odnoklassniki fill={fillColor} />,
      to: 'https://ok.ru/',
    },
  },
  {
    id: 'yt',
    data: {
      svg: <Youtube fill={fillColor} />,
      to: 'https://www.youtube.com/',
    },
  },
  {
    id: 'td',
    data: {
      svg: <Telegram fill={fillColor} />,
      to: 'https://web.telegram.org/k/',
    },
  },
]

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__wrap">
        <div className="container footer__container">
          <ul className="list-reset footer-list">
            {buttonArray.map((elem) => (
              <ItemButton key={elem.id} data={elem.data} />
            ))}
          </ul>
        </div>
      </div>
    </footer>
  )
}

export default Footer
