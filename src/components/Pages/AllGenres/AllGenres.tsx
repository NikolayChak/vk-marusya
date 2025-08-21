import {useEffect} from 'react'
import {useSelector} from 'react-redux'

import './AllGenres.css'
import {GenreCard, Loader, Error} from '@/components/ui'
import {
  useFetchGenres,
  useGenres,
  useGenresLoaded,
  useListTransitions,
} from '@/hooks'
import {RootState} from '@/store'

const AllGenres = () => {
  const genres = useGenres()
  const isGenresLoaded = useGenresLoaded()
  const fetchGenres = useFetchGenres()
  const isError = useSelector((state: RootState) => state.genres.isError)
  const transitions = useListTransitions(genres, (genre) => genre.name)

  useEffect(() => {
    if (!isGenresLoaded) {
      void fetchGenres()
    }
  }, [isGenresLoaded, fetchGenres])

  return (
    <section className="genres section-pd">
      <div className="container genres__container">
        <h2 className="title title--mb">Жанры фильмов</h2>
        {!isGenresLoaded && <Loader />}
        {isError && (
          <Error message="Ошибка загрузки жанров. Попробуйте позже." />
        )}

        <ul className="cards-list">
          {transitions((style, elem) => (
            <GenreCard
              key={elem.name}
              name={elem.name}
              img={elem.image}
              style={style as unknown as React.CSSProperties}
            />
          ))}
        </ul>
      </div>
    </section>
  )
}

export default AllGenres
