import {FC} from 'react'
import './Loader.css'

interface LoaderProps {
  isMini?: boolean
}

const Loader: FC<LoaderProps> = ({isMini}) => {
  return (
    <div
      data-testid="loader-wrapper"
      className={`loader-wrapper ${!isMini ? 'loader-wrapper--full' : ''}`}
    >
      <span
        data-testid="loader"
        className={isMini ? `loader loader--mini` : 'loader'}
      ></span>
    </div>
  )
}

export default Loader
