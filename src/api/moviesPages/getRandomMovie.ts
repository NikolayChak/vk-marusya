import {z} from 'zod'
import {AxiosError} from 'axios'

import {FilmType, instance} from '@/api'
import {changeDuration} from '@/utilits'

export const RandomMovieShema = z.object({
  id: z.number(),
  posterUrl: z
    .string()
    .nullable()
    .transform((val) => {
      return val ? val : ''
    }),
  title: z.string(),
  runtime: z.number().transform((val) => changeDuration(val)),
  genres: z
    .string()
    .array()
    .transform((val) => val.join(', ')),
  plot: z.string(),
  releaseYear: z.number(),
  tmdbRating: z.number().transform((val) => val.toFixed(1)),
  trailerUrl: z.string(),
})

export type RandomMovieType = z.infer<typeof RandomMovieShema>

export async function getRandomFilm(): Promise<RandomMovieType> {
  try {
    const response = await instance.get(`/movie/random`)
    return parseDataForDashBoard(response.data)
  } catch (err: unknown) {
    if (err instanceof AxiosError) {
      throw new Error(`Ошибка: ${err.response?.status || 'Неизвестная ошибка'}`)
    } else {
      throw new Error('Неизвестная ошибка при получении случайного фильма')
    }
  }
}

export function parseDataForDashBoard(data: FilmType): RandomMovieType {
  return RandomMovieShema.parse(data)
}
