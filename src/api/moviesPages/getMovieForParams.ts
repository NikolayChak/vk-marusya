import {AxiosError} from 'axios'
import {
  FilmsTypeList,
  instance,
  parseDataForDashBoard,
  RandomMovieType,
} from '@/api'

export async function getMovieForParams(
  key: string,
  value: string,
  page: string = '1'
): Promise<FilmsTypeList> {
  try {
    const url = `/movie?${new URLSearchParams({[key]: value})}&${new URLSearchParams({['page']: page})}`
    const response = await instance.get(url)
    return response.data
  } catch (err: unknown) {
    if (err instanceof AxiosError) {
      throw new Error(`Ошибка: ${err.response?.status || 'Неизвестная ошибка'}`)
    } else {
      throw new Error('Неизвестная ошибка при получении фильмов по параметрам')
    }
  }
}

export async function getMovieForSearch(
  key: string,
  value: string
): Promise<RandomMovieType[]> {
  try {
    const url = `/movie?${new URLSearchParams({[key]: value})}`
    const response = await instance.get(url)
    const correctArr = response.data.map((elem: FilmsTypeList[number]) =>
      parseDataForDashBoard(elem)
    )

    return correctArr.sort(
      (a: {tmdbRating: string}, b: {tmdbRating: string}) =>
        parseFloat(b.tmdbRating) - parseFloat(a.tmdbRating)
    )
  } catch (err: unknown) {
    if (err instanceof AxiosError) {
      throw new Error(`Ошибка: ${err.response?.status || 'Неизвестная ошибка'}`)
    } else {
      throw new Error('Неизвестная ошибка при поиске фильмов')
    }
  }
}
