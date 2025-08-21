import {FC} from 'react'

import './Rainting.css'
import {findRatingStatus} from '@/utilits'

interface RaintingProps {
  tmdbRating: string
  size: string
}

const Raiting: FC<RaintingProps> = ({tmdbRating, size}) => {
  const colorStatus = findRatingStatus(tmdbRating)

  return (
    <div className={`range range--${size} range--${colorStatus}`}>
      {tmdbRating}
    </div>
  )
}

export default Raiting
