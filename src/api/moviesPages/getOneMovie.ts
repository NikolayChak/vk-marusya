import {z} from 'zod'
import {AxiosError} from 'axios'

import {FilmType, RandomMovieShema, instance} from '@/api'
import {getLanguageName, convertMoney} from '@/utilits'

export const OneMovieShema = RandomMovieShema.extend({
  id: z.number(),
  language: z.string().transform((val) => getLanguageName(val)),
  budget: z
    .string()
    .transform((val) => convertMoney(val) + ' руб.')
    .nullable(),
  revenue: z
    .string()
    .transform((val) => convertMoney(val) + ' руб.')
    .nullable(),
  director: z.string().nullable(),
  awardsSummary: z.string().nullable(),
  production: z.string().nullable(),
})

export type OneMovieType = z.infer<typeof OneMovieShema>

export async function getOneMovie(id: string): Promise<FilmType> {
  try {
    const response = await instance.get(`/movie/${id}`)
    return response.data
  } catch (err: unknown) {
    if (err instanceof AxiosError) {
      throw new Error(`Ошибка: ${err.response?.status || 'Неизвестная ошибка'}`)
    } else {
      throw new Error('Неизвестная ошибка при получении информации о фильме')
    }
  }
}

export function parseOneFilmForDetails(data: FilmType): OneMovieType {
  return OneMovieShema.parse(data)
}
