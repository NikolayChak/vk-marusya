import {AxiosError} from 'axios'
import {FilmsTypeList, instance} from '@/api'

export async function getFavourites(): Promise<FilmsTypeList> {
  try {
    const response = await instance.get(`/favorites`)
    return response.data
  } catch (err: unknown) {
    if (err instanceof AxiosError) {
      throw new Error(`Ошибка: ${err.response?.status || 'Неизвестная ошибка'}`)
    } else {
      throw new Error('Неизвестная ошибка при получении списка избранного')
    }
  }
}
