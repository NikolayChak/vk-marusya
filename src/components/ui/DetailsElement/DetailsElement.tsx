import {FC} from 'react'
import {useMediaQuery} from 'react-responsive'

import './DetailsElement.css'

export interface DetailsElementProps {
  title: string
  description: string
}

const DetailsElement: FC<DetailsElementProps> = ({title, description}) => {
  const isMobile = useMediaQuery({query: '(max-width: 768px)'})

  return (
    <li className="about-list__item elements elements--white">
      <div className="elements__wrapper">
        <span className="elements__title">{title}</span>
        {!isMobile && <p className="dash"></p>}
      </div>
      <span>{description}</span>
    </li>
  )
}

export default DetailsElement
