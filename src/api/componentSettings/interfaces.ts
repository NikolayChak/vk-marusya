export interface FilmType {
  id: number
  title: string
  originalTitle: string
  language: string | null
  releaseYear: number
  releaseDate: string
  genres: Array<string>
  plot: string
  runtime: number
  budget: string | null
  revenue: string | null
  homepage: string
  status: string
  posterUrl: string
  backdropUrl: string
  trailerUrl: string
  trailerYoutubeId: string
  tmdbRating: number
  searchL: string
  keywords: Array<string>
  countriesOfOrigin: Array<string>
  languages: Array<string>
  cast: Array<string>
  director: string | null
  production: string | null
  awardsSummary: string | null
}

export type FilmsTypeList = Array<FilmType>
