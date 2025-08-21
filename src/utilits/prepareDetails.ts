import {FilmType, parseOneFilmForDetails} from '@/api'

export interface Details {
  'Язык оригинала': string
  Бюджет: string
  Выручка: string
  Режиссёр: string
  Продакшен: string
  Награды: string
}

export type DetailEntries = [string, string][]

export function prepareDetails(datas: FilmType): DetailEntries {
  const data = parseOneFilmForDetails(datas)

  const aboutArrParse = {
    'Язык оригинала': setDefault(data.language),
    Бюджет: setDefault(data.budget),
    Выручка: setDefault(data.revenue),
    Режиссёр: setDefault(data.director),
    Продакшен: setDefault(data.production),
    Награды: setDefault(data.awardsSummary),
  }
  return Object.entries(aboutArrParse)
}

const setDefault = (elem: string | null) => {
  return !elem ? 'Нет данных' : elem
}
