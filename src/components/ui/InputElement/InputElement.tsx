import {FC} from 'react'
import {UseFormRegisterReturn} from 'react-hook-form'

import './InputElement.css'
import {Key, Mail, User} from '@/assets/icons'

interface InputElementProps {
  svgName: string
  placeholder: string
  errorMessage?: string
  inputProp: UseFormRegisterReturn<string>
}

const InputElement: FC<InputElementProps> = ({
  svgName,
  placeholder,
  errorMessage,
  inputProp,
}) => {
  const fill = '#00000066'

  return (
    <div className={`inputs-login inputs-login__${svgName}`}>
      <input
        {...inputProp}
        className={
          !errorMessage
            ? 'inputs-login__field'
            : 'inputs-login__field inputs-login--error'
        }
        type={svgName}
        name={svgName}
        placeholder={placeholder}
      />
      {svgName === 'email' && <Mail fill={fill} />}
      {svgName === 'password' && <Key fill={fill} />}
      {svgName === 'confirm' && <Key fill={fill} />}
      {(svgName === 'name' || svgName === 'surname') && <User fill={fill} />}

      {errorMessage && (
        <span className="inputs-text--error">{errorMessage}</span>
      )}
    </div>
  )
}

export default InputElement
