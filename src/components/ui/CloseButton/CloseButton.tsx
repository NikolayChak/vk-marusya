import {FC, HTMLAttributes} from 'react'

import './CloseButton.css'
import {Close} from '@/assets/icons'

interface CloseButtonProps extends HTMLAttributes<HTMLButtonElement> {
  name: string
  fill?: string
}

const CloseButton: FC<CloseButtonProps> = ({
  name,
  fill = 'black',
  ...props
}) => {
  return (
    <button className={`${name}__close close`} {...props}>
      <Close fill={fill} />
    </button>
  )
}

export default CloseButton
