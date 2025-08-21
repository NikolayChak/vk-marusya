import {FC, HTMLAttributes} from 'react'

import './Button.css'
import {Loader} from '@/components/ui'

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  name?: string
  isSVG?: JSX.Element
  type?: 'submit' | 'button'
  isLoading?: boolean
  isActive?: boolean
  classes?: string
}

const Button: FC<ButtonProps> = ({
  name,
  isSVG,
  type,
  isActive,
  isLoading,
  classes,
  ...props
}) => {
  return isSVG ? (
    <button type={type} className={`btn btn__svg ${classes ?? ''}`} {...props}>
      {isSVG}
    </button>
  ) : (
    <button
      type={type}
      className={`btn btn__name ${isActive ? 'btn__active' : ''} ${classes ?? ''}`}
      {...props}
    >
      {isLoading ? <Loader isMini /> : name}
    </button>
  )
}

export default Button
