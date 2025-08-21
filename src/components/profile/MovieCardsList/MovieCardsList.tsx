import {FC} from 'react'

import './MovieCardsList.css'
import {TopFilmsListType} from '@/api'
import {MovieCard} from '@/components/ui'
import {useListTransitions} from '@/hooks'

interface FilmCardListProps {
  data?: TopFilmsListType
}

const MovieCardsList: FC<FilmCardListProps> = ({data}) => {
  const transitions = useListTransitions(data ?? [], (film) => film.id)

  return (
    <div className="cards-container">
      <ul className="cards-list">
        {transitions((style, elem, _, index) => (
          <MovieCard
            index={index + 1}
            img={elem.posterUrl}
            id={elem.id}
            title={elem.title}
            style={style as unknown as React.CSSProperties}
          />
        ))}
      </ul>
    </div>
  )
}

export default MovieCardsList
