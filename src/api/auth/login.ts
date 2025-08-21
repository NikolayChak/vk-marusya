import {z} from 'zod'
import {AxiosError} from 'axios'

import {instance} from '@/api'

export const createLoginShema = z.object({
  email: z
    .string()
    .regex(
      /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/,
      'Некорректный формат электронной почты'
    ),
  password: z.string().min(8, 'Пароль должен быть не менее 8 символов'),
})

export type createLoginForm = z.infer<typeof createLoginShema>

export async function loginUser(data: createLoginForm): Promise<void> {
  try {
    await instance.post('/auth/login', data)
  } catch (err: unknown) {
    if (err instanceof AxiosError) {
      if (err.response?.status === 400) {
        throw new Error('Неверные авторизационные данные')
      } else {
        throw new Error(
          `Ошибка: ${err.response?.status || 'Неизвестная ошибка'}`
        )
      }
    } else {
      throw new Error('Неизвестная ошибка авторизации')
    }
  }
}
