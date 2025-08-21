import {AxiosError} from 'axios'
import {z} from 'zod'

import {instance, FilmsTypeList} from '@/api'

export const TopFilmShema = z.object({
  id: z.number(),
  posterUrl: z
    .string()
    .nullable()
    .transform((val) => {
      return val ? val : ''
    }),
  title: z.string(),
})

export type TopFilmsType = z.infer<typeof TopFilmShema>

export const TopFilmsListType = z.array(TopFilmShema)

export type TopFilmsListType = z.infer<typeof TopFilmsListType>

export async function getTop10Movie(): Promise<TopFilmsListType> {
  try {
    const response = await instance.get(`/movie/top10`)
    return filterForTopFilms(response.data)
  } catch (err: unknown) {
    if (err instanceof AxiosError) {
      throw new Error(`Ошибка: ${err.response?.status || 'Неизвестная ошибка'}`)
    } else {
      throw new Error('Неизвестная ошибка при получении топ-10 фильмов')
    }
  }
}

export function filterForTopFilms(data: FilmsTypeList): TopFilmsListType {
  return data.map((elem) => TopFilmShema.parse(elem))
}
