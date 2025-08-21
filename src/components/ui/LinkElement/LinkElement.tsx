import {FC} from 'react'
import {Link, LinkProps} from 'react-router-dom'

import './LinkElement.css'

interface LinkElementProps extends LinkProps {
  title: string
  to: string
  isActive: boolean
  svg?: JSX.Element
}

const LinkElement: FC<LinkElementProps> = ({title, to, isActive, svg}) => {
  return (
    <Link className={`item ${isActive ? 'item--active' : ''}`} to={to}>
      {title}
      {svg}
    </Link>
  )
}

export default LinkElement
