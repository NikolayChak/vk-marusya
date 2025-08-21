import {z} from 'zod'
import {AxiosError} from 'axios'

import {instance} from '@/api'

export const createFavoiriteFilmShema = z.object({
  id: z.number(),
})

export type FavouriteFilmType = z.infer<typeof createFavoiriteFilmShema>

export async function postFavorite(data: FavouriteFilmType): Promise<void> {
  try {
    await instance.post(`/favorites`, data)
  } catch (err: unknown) {
    if (err instanceof AxiosError) {
      if (err.response?.status === 400) {
        throw new Error('Неверные данные')
      } else {
        throw new Error(
          `Ошибка: ${err.response?.status || 'Неизвестная ошибка'}`
        )
      }
    } else {
      throw new Error('Неизвестная ошибка при добавлении в избранное')
    }
  }
}
