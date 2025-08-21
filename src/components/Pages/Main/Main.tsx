import {useQuery} from '@tanstack/react-query'

import './Main.css'
import {DashBoard} from '@/components/widgets'
import {getRandomFilm, getTop10Movie} from '@/api'
import {Error, Loader} from '@/components/ui'
import {MovieCardsList} from '@/components/profile'

const Main = () => {
  const {
    data: randomData,
    isError: isRandomDataError,
    isPending: isRandomDataPending,
    error: RandomDataError,
    refetch,
  } = useQuery({
    queryFn: () => getRandomFilm(),
    queryKey: ['random'],
    enabled: true,
    refetchOnWindowFocus: false,
  })

  const {
    data: TopMovieData,
    isError: isTopMovieError,
    isPending: isTopMoviePending,
    error: TopMovieError,
  } = useQuery({
    queryFn: () => getTop10Movie(),
    queryKey: ['top10'],
    refetchOnWindowFocus: false,
  })

  if (isRandomDataPending || isTopMoviePending) {
    return <Loader />
  }

  return (
    <>
      {isRandomDataError && <Error message={RandomDataError.message} />}
      {randomData && <DashBoard data={randomData} refetch={refetch} />}

      <section className="topfilms">
        <div className="container topfilms__container">
          <h3 className="title title__midi title--mb">Топ 10 фильмов</h3>
          {isTopMovieError && <Error message={TopMovieError.message} />}
        </div>
        <MovieCardsList data={TopMovieData} />
      </section>
    </>
  )
}

export default Main
