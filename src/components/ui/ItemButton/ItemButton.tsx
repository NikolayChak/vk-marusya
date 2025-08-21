import {FC} from 'react'
import {Link} from 'react-router-dom'

import './ItemButton.css'
import {ButtonObjectType} from '@/components/widgets'

interface ItemButtonProps {
  data: ButtonObjectType
}

const ItemButton: FC<ItemButtonProps> = ({data}) => {
  return (
    <li className="footer-list__item">
      <Link className="footer-list__elem" to={data.to} target="_blank">
        {data.svg}
      </Link>
    </li>
  )
}

export default ItemButton
