import {AxiosError} from 'axios'
import {instance} from '@/api'

export async function deleteFavorite(id: number): Promise<void> {
  try {
    await instance.delete(`/favorites/${id}`)
  } catch (err: unknown) {
    if (err instanceof AxiosError) {
      throw new Error(`Ошибка: ${err.response?.status || 'Неизвестная ошибка'}`)
    } else {
      throw new Error('Неизвестная ошибка при удалении избранного')
    }
  }
}
