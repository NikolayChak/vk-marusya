import {FC} from 'react'

import './SuccessForm.css'
import {ModalStates} from '@/components/widgets'
import {Button} from '@/components/ui'

export interface ModalFormProps {
  changeMode: (a: ModalStates) => void
}

const SuccessForm: FC<ModalFormProps> = ({changeMode}) => {
  const handleClick = () => {
    changeMode('login')
  }

  return (
    <>
      <h2 className="login__title">Регистрация завершена</h2>
      <p className="login__descr">
        Используйте вашу электронную почту для входа
      </p>
      <Button onClick={handleClick} name={'Войти'} isActive />
    </>
  )
}

export default SuccessForm
