import {FC} from 'react'
import {useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import {useMutation} from '@tanstack/react-query'

import {ModalFormProps} from '@/components/profile'
import {Button, InputElement} from '@/components/ui'
import {createLoginForm, createLoginShema, loginUser, queryClient} from '@/api'
import {useFetchProfile, useSetModalState} from '@/hooks'

const LoginForm: FC<ModalFormProps> = ({changeMode}) => {
  const {hideModal} = useSetModalState()
  const fetchProfile = useFetchProfile()

  const {
    register,
    handleSubmit,
    formState: {errors},
    reset,
  } = useForm<createLoginForm>({
    resolver: zodResolver(createLoginShema),
  })

  const registerMutation = useMutation({
    mutationFn: loginUser,
    onSuccess() {
      void queryClient.invalidateQueries({queryKey: ['login', 'user']})
      reset()
      void fetchProfile()
      hideModal()
    },
  })

  const handleChangeMode = () => {
    changeMode('register')
  }

  return (
    <>
      <form
        className="login__form"
        onSubmit={handleSubmit((data) => {
          registerMutation.mutate(data)
        })}
      >
        <InputElement
          inputProp={{...register('email')}}
          errorMessage={errors.email?.message}
          svgName={'email'}
          placeholder={'Электронная почта'}
        />
        <InputElement
          inputProp={{...register('password')}}
          errorMessage={errors.password?.message}
          svgName={'password'}
          placeholder={'Пароль'}
        />

        {registerMutation.error && (
          <span className="register--error">
            {registerMutation.error.message}
          </span>
        )}

        <Button
          type="submit"
          isLoading={registerMutation.isPending}
          name={'Войти'}
          isActive
          classes="login__btn"
        />
      </form>

      <Button
        onClick={handleChangeMode}
        name={'Регистрация'}
        classes={'btn__register btn--white'}
      />
    </>
  )
}

export default LoginForm
