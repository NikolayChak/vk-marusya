import {FC} from 'react'
import './Error.css'

interface ErrorProps {
  message: string
}

const Error: FC<ErrorProps> = ({message}) => {
  return (
    <div className="container wrap-error">
      <span className="error">Произошла ошибка {message}</span>
    </div>
  )
}

export default Error
