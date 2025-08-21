import {FC, useState} from 'react'
import {QueryObserverResult, RefetchOptions} from '@tanstack/react-query'
import {animated, useTransition} from 'react-spring'

import './DashBoard.css'
import {Raiting} from '@/components/ui'
import {RandomMovieType} from '@/api'
import DashBoardButtons from './DashBoardButtons'
import {useElementClick, usePathname} from '@/hooks'
import {VideoModal} from '@/components/profile'

interface DashBoardViewProps {
  data: RandomMovieType
  refetch?: (options?: RefetchOptions) => Promise<QueryObserverResult>
}

const DashBoard: FC<DashBoardViewProps> = ({data, refetch}) => {
  const location = usePathname()
  const [isVideo, setVideo] = useState(false)
  const ref = useElementClick('backdrop-video', () => setVideo(false))

  const openVideo = () => {
    setVideo(true)
  }

  const closeVideo = () => {
    setVideo(false)
  }

  const transitions = useTransition(data, {
    from: {opacity: 0},
    enter: {opacity: 1},
  })

  return transitions((style) => (
    <>
      <animated.section
        className={`dashboard ${location.startsWith('/movie') ? 'dashboard__movie-page' : ''}`}
        style={style}
      >
        <div className="container dashboard__container">
          <div className="dashboard__left">
            <div className="elements elements--transp dashboard__elements">
              <Raiting tmdbRating={data.tmdbRating} size={'big'} />
              <span>{data.releaseYear}</span>
              <span>{data.genres}</span>
              <span>{data.runtime}</span>
            </div>
            <h2 className="title dashboard__title">{data.title}</h2>
            <p className="dashboard__descr descr">{data.plot}</p>
            <DashBoardButtons
              id={data.id}
              refetch={refetch}
              openVideo={openVideo}
            />
          </div>
          <div className="img-wrapper">
            {data.posterUrl ? (
              <img
                className="dashboard__img"
                alt={data.title}
                src={data.posterUrl}
              />
            ) : (
              <div className="dashboard__img img-not-found">
                <span>Not Found</span>
              </div>
            )}
          </div>
        </div>
      </animated.section>
      {isVideo && (
        <VideoModal
          ref={ref}
          url={data.trailerUrl}
          movieTitle={data.title}
          closeVideo={closeVideo}
        />
      )}
    </>
  ))
}

export default DashBoard
