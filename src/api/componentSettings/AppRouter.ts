export const AppRouter = {
  home: {path: '/'},
  genres: {path: '/genres'},
  profile: {path: '/profile'},
  profileFavourite: {
    path: '/profile/favourite',
  },
  profileSettings: {
    path: '/profile/settings',
  },
  movie: {
    path: (movieId = ':id') => `/movie/${movieId}`,
    additionalPath: '/movie/:id',
  },
  genreDetails: {
    path: (genreName = ':name') => `/genres/${genreName}`,
  },
}
