import {useParams} from 'react-router-dom'
import {useQuery} from '@tanstack/react-query'

import './Movie.css'
import {getOneMovie, parseDataForDashBoard} from '@/api'
import {Loader, Error, DetailsElement} from '@/components/ui'
import {DashBoard} from '@/components/widgets'
import {prepareDetails} from '@/utilits'

const Movie = () => {
  const param = useParams().id ?? ''

  const {data, isError, isPending, error} = useQuery({
    queryFn: () => getOneMovie(param),
    queryKey: [`/movie/${param}`],
    retry: false,
  })

  if (isError) {
    return <Error message={error.message} />
  }

  if (isPending) {
    return <Loader />
  }

  return (
    <>
      <DashBoard data={parseDataForDashBoard(data)} />
      <section className="about-film">
        <div className="container about-film__container">
          <h3 className="title title__midi title--mb">О фильме</h3>

          <ul className="list-reset about-list">
            {prepareDetails(data).map((elem) => (
              <DetailsElement
                key={crypto.randomUUID()}
                title={elem[0]}
                description={elem[1]}
              />
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}

export default Movie
