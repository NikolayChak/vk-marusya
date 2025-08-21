import {FC} from 'react'
import {Link} from 'react-router-dom'
import {useMutation} from '@tanstack/react-query'
import {animated} from 'react-spring'

import './MovieCard.css'
import {CloseButton} from '@/components/ui'
import {usePathname} from '@/hooks'
import {AppRouter, deleteFavorite, queryClient} from '@/api'

interface FilmCardProps {
  index?: number
  img: string
  title: string
  id: number
  style?: React.CSSProperties
}

const MovieCard: FC<FilmCardProps> = ({index, img, title, id, style}) => {
  const location = usePathname()
  const path = location.split('/')[1]

  const registerMutation = useMutation({
    mutationFn: () => deleteFavorite(id),
    onSuccess() {
      void queryClient.invalidateQueries({queryKey: ['favourites']})
    },
  })

  const handleDelete = (event: React.MouseEvent | React.KeyboardEvent) => {
    event.stopPropagation()
    registerMutation.mutate()
  }

  return (
    <animated.li
      className={`cards-list__item cards-list__top cards-list__top--${path}`}
      style={style}
    >
      <article className="card-form card-form__top">
        {location === AppRouter.home.path && (
          <div className="index">{index}</div>
        )}

        {img ? (
          <img className="card-list__img" src={img} alt={`Фильм: ${title}`} />
        ) : (
          <div className="card-list__error">
            <span>Not Found</span>
          </div>
        )}

        <Link
          className="card-form__link"
          to={AppRouter.movie.path(id.toString())}
          role="button"
          tabIndex={0}
        />

        {registerMutation.error && (
          <div className="error-delete">{registerMutation.error.message}</div>
        )}

        {path === 'profile' && (
          <CloseButton
            onClick={handleDelete}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleDelete(e)
              }
            }}
            name={'account'}
            tabIndex={0}
          />
        )}
      </article>
    </animated.li>
  )
}

export default MovieCard
