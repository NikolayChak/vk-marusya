import {FC} from 'react'
import {Link} from 'react-router-dom'
import {animated} from 'react-spring'

import './GenreCard.css'
import {AppRouter} from '@/api'

interface GenreCardProps {
  name: string
  img: string
  style?: React.CSSProperties
}

const GenreCard: FC<GenreCardProps> = ({name, img, style}) => {
  return (
    <animated.li className="cards-list__item cards-list__genre" style={style}>
      <Link className="cards-list__link" to={AppRouter.genreDetails.path(name)}>
        <article className="card-form card-form__genre">
          <img className="card-list__img" src={img} alt={`Жанр: ${name}`} />
          <h3 className="item card-form__item">{name}</h3>
        </article>
      </Link>
    </animated.li>
  )
}

export default GenreCard
