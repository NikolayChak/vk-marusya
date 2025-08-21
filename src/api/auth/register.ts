import {z} from 'zod'
import {AxiosError} from 'axios'

import {instance} from '@/api'

export const createRegisterShema = z
  .object({
    email: z
      .string()
      .regex(
        /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/,
        'Некорректный формат электронной почты'
      ),
    name: z.string().min(5, 'Имя пользователя должно быть не менее 5 символов'),
    surname: z
      .string()
      .min(5, 'Фамилия пользователя должно быть не менее 5 символов'),
    password: z.string().min(8, 'Пароль должен быть не менее 8 символов'),
    confirm: z.string().min(8, 'Пароль должен быть не менее 8 символов'),
  })
  .refine((data) => data.password === data.confirm, {
    message: 'Пароли не совпадают',
    path: ['confirm'],
  })

export type createRegisterForm = z.infer<typeof createRegisterShema>

export async function registerUser(data: createRegisterForm): Promise<void> {
  try {
    await instance.post(`/user`, data)
  } catch (err: unknown) {
    if (err instanceof AxiosError) {
      throw new Error(
        err.response?.data?.error ||
          `Ошибка: ${err.response?.status || 'Неизвестная ошибка'}`
      )
    } else {
      throw new Error('Неизвестная ошибка регистрации')
    }
  }
}
