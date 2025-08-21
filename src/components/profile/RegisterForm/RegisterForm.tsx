import {FC} from 'react'
import {useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import {useMutation} from '@tanstack/react-query'

import {ModalFormProps} from '@/components/profile'
import {Button, InputElement} from '@/components/ui'
import {
  createRegisterForm,
  createRegisterShema,
  registerUser,
  queryClient,
} from '@/api'

const RegisterForm: FC<ModalFormProps> = ({changeMode}) => {
  const {
    register,
    handleSubmit,
    formState: {errors},
    reset,
  } = useForm<createRegisterForm>({
    resolver: zodResolver(createRegisterShema),
  })

  const registerMutation = useMutation({
    mutationFn: registerUser,
    onSuccess() {
      void queryClient.invalidateQueries({queryKey: ['user']})
      reset()
      changeMode('succsess')
    },
  })

  const handleChangeMode = () => {
    changeMode('login')
  }

  return (
    <>
      <h2 className="login__title">Регистрация</h2>
      <form
        className="login__form"
        onSubmit={handleSubmit((data) => {
          registerMutation.mutate(data)
        })}
      >
        <InputElement
          inputProp={{...register('email')}}
          svgName={'email'}
          errorMessage={errors.email?.message}
          placeholder={'sample@domain.ru'}
        />
        <InputElement
          inputProp={{...register('name')}}
          errorMessage={errors.name?.message}
          svgName={'name'}
          placeholder={'Имя'}
        />
        <InputElement
          inputProp={{...register('surname')}}
          errorMessage={errors.surname?.message}
          svgName={'surname'}
          placeholder={'Фамилия'}
        />
        <InputElement
          inputProp={{...register('password')}}
          errorMessage={errors.password?.message}
          svgName={'password'}
          placeholder={'Пароль'}
        />
        <InputElement
          inputProp={{...register('confirm')}}
          errorMessage={errors.confirm?.message}
          svgName={'confirm'}
          placeholder={'Подтвердите пароль'}
        />

        {registerMutation.error && (
          <span className="register--error">
            {registerMutation.error.message}
          </span>
        )}

        <Button
          type="submit"
          isLoading={registerMutation.isPending}
          name={'Создать аккаунт'}
          classes={'btn__active login__btn'}
        />
      </form>

      <Button
        onClick={handleChangeMode}
        name={'У меня есть пароль'}
        classes={'btn__register btn--white'}
      />
    </>
  )
}

export default RegisterForm
