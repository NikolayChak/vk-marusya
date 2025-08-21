import {FC} from 'react'
import './SettingElement.css'

interface SettingElementProps {
  name: string
  element?: JSX.Element | string
  className: string
  title: string
}

const SettingElement: FC<SettingElementProps> = ({
  name,
  element,
  className,
  title,
}) => {
  return (
    <div className="info">
      <div className={className}>{element}</div>
      <p className="info__title">{title}</p>
      <p className="info__datas">{name}</p>
    </div>
  )
}

export default SettingElement
