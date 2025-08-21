import {useNavigate} from 'react-router-dom'
import {FC, useEffect, useState} from 'react'
import {
  QueryObserverResult,
  RefetchOptions,
  useMutation,
} from '@tanstack/react-query'

import './DashBoard.css'
import {Change, Heart} from '@/assets/icons'
import {Button} from '@/components/ui'
import {AppRouter, deleteFavorite, postFavorite, queryClient} from '@/api'
import {usePathname, useProfileState, useSetModalState} from '@/hooks'

interface DashBoardButtonsProps {
  id: number
  openVideo: () => void
  refetch?: (options?: RefetchOptions) => Promise<QueryObserverResult>
}

const DashBoardButtons: FC<DashBoardButtonsProps> = ({
  id,
  refetch,
  openVideo,
}) => {
  const {showModal} = useSetModalState()
  const location = usePathname()
  const profile = useProfileState()
  const navigate = useNavigate()

  const [heartState, updateHeartState] = useState(
    profile.favorites.includes(id.toString())
  )

  const likeFilm = useMutation({
    mutationFn: () => postFavorite({id: id}),
    onSuccess() {
      void queryClient.invalidateQueries({queryKey: ['favourites']})
      updateHeartState(true)
    },
  })

  const dislikeFilm = useMutation({
    mutationFn: () => deleteFavorite(id),
    onSuccess() {
      void queryClient.invalidateQueries({queryKey: ['favourites']})
      updateHeartState(false)
    },
  })

  const handleUpdateFavourite = () => {
    if (!profile.name) {
      showModal()
      return
    }
    if (heartState) {
      dislikeFilm.mutate()
    } else likeFilm.mutate()
  }

  useEffect(() => {
    updateHeartState(profile.favorites.includes(id.toString()))
  }, [profile.favorites, id])

  return (
    <div className="button-list">
      <Button name={'Трейлер'} isActive onClick={openVideo} />

      {location === AppRouter.home.path && (
        <Button
          name={'О фильме'}
          onClick={() => navigate(AppRouter.movie.path(id.toString()))}
        />
      )}

      <div className="button-list">
        <Button
          onClick={handleUpdateFavourite}
          isSVG={
            !heartState ? (
              <Heart stroke={'--color-white'} fill={'--transparent'} />
            ) : (
              <Heart
                stroke={'--color-purple-focus'}
                fill={'--color-purple-focus'}
              />
            )
          }
        />

        {location === AppRouter.home.path && (
          <Button
            onClick={() => refetch?.()}
            isSVG={<Change fill={'white'} />}
          />
        )}
        {(dislikeFilm.error || likeFilm.error) && (
          <div className="error-likes">
            {dislikeFilm.error?.message || likeFilm.error?.message}
          </div>
        )}
      </div>
    </div>
  )
}

export default DashBoardButtons
