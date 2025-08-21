import {instance} from '@/api'
import {AxiosError} from 'axios'

export type Genre = string
export type GenresList = Array<Genre>

export async function getGenres(): Promise<GenresList> {
  try {
    const response = await instance.get(`/movie/genres`)
    return response.data
  } catch (err: unknown) {
    if (err instanceof AxiosError) {
      throw new Error(`Ошибка: ${err.response?.status || 'Неизвестная ошибка'}`)
    } else {
      throw new Error('Неизвестная ошибка при получении списка жанров')
    }
  }
}
