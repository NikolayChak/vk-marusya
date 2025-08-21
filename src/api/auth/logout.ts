import {AxiosError} from 'axios'
import {instance} from '@/api'

export async function logoutUser(): Promise<void> {
  try {
    await instance.get(`/auth/logout`)
  } catch (err: unknown) {
    if (err instanceof AxiosError) {
      throw new Error(`Ошибка: ${err.response?.status || 'Неизвестная ошибка'}`)
    } else {
      throw new Error('Неизвестная ошибка выхода из аккаунта')
    }
  }
}
