import {FC} from 'react'
import {Link} from 'react-router-dom'

import './ModalForInputSearch.css'
import {AppRouter, RandomMovieType} from '@/api'
import {Raiting} from '@/components/ui'

export interface ModalSearchProps {
  data: RandomMovieType[]
  clearInput: () => void
}

const ModalForInputSearch: FC<ModalSearchProps> = ({data, clearInput}) => {
  return (
    <div className="modal-search">
      <ul className="list-reset search-list">
        {data.map((elem) => (
          <li key={elem.id} className="search-list__elem">
            <Link
              onClick={clearInput}
              className="search-list__link"
              to={AppRouter.movie.path(elem.id.toString())}
            >
              {elem.posterUrl ? (
                <img
                  className="search-list__img"
                  src={elem.posterUrl}
                  alt="filmName"
                />
              ) : (
                <div className="search-list__img search-list__img--empty">
                  Not Found
                </div>
              )}

              <div className="search-list__wrapper">
                <div className="details search-list__details">
                  <Raiting tmdbRating={elem.tmdbRating} size={'mini'} />
                  <span className="details__data">{elem.releaseYear}</span>
                  <span className="details__data">{elem.genres}</span>
                  <span className="details__data">{elem.runtime}</span>
                </div>
                <h4 className="details__name">{elem.title}</h4>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ModalForInputSearch
