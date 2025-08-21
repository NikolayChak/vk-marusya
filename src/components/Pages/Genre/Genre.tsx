import {useEffect, useState} from 'react'
import {useQuery} from '@tanstack/react-query'
import {Link} from 'react-router-dom'

import './Genre.css'
import {usePathname} from '@/hooks'
import {Button, Error, Loader} from '@/components/ui'
import {AppRouter, FilmsTypeList, getMovieForParams} from '@/api'
import {MovieCardsList} from '@/components/profile'

const Genre = () => {
  const location = usePathname().split('/')
  const genresName = location[location.length - 1]

  const [allMovies, setAllMovies] = useState<FilmsTypeList>([])
  const [page, setPage] = useState('1')
  const [countMovies, setCountMovies] = useState(10)

  const handleClick = () => {
    const intPage = parseInt(page)
    if (countMovies / intPage === 50) {
      setPage((intPage + 1).toString())
      setCountMovies(countMovies + 10)
    } else {
      setCountMovies(countMovies + 10)
    }
  }

  const {data, isError, isPending, isSuccess, error} = useQuery({
    queryFn: () => getMovieForParams('genre', genresName, page),
    queryKey: [genresName, page],
  })

  useEffect(() => {
    if (isSuccess && data) {
      setAllMovies((prevAllMovies) => [...prevAllMovies, ...data])
    }
  }, [isSuccess, data])

  return (
    <section className="genre-page section-pd">
      <div className="container genre-page__container">
        <Link
          className="title title--mb genre-page__title"
          to={AppRouter.genres.path}
        >
          {genresName}
        </Link>
        {isPending && <Loader />}
        {isError && <Error message={error.message} />}
        <MovieCardsList data={allMovies.slice(0, countMovies)} />
        <div className="genre-page__wrap">
          {allMovies.slice(0, countMovies).length >= 10 && (
            <Button
              name={'Показать ещё'}
              isActive
              onClick={handleClick}
              isLoading={isPending}
            />
          )}
        </div>
      </div>
    </section>
  )
}

export default Genre
