import {Route, Routes, useNavigate} from 'react-router-dom'
import React, {useEffect} from 'react'

import './App.css'
import {Header, Footer} from '@/components/widgets'
import {AppRouter} from '@/api'
import {useFetchProfile, usePathname, useProfileState} from '@/hooks'

const MainPageLazy = React.lazy(() => import('./components/Pages/Main/Main'))
const AllGenresLazy = React.lazy(
  () => import('./components/Pages/AllGenres/AllGenres')
)
const AccountLazy = React.lazy(
  () => import('./components/Pages/Account/Account')
)
const MovieLazy = React.lazy(() => import('./components/Pages/Movie/Movie'))
const GenreLazy = React.lazy(() => import('./components/Pages/Genre/Genre'))
const AccountSettingsLazy = React.lazy(
  () => import('./components/profile/AccountSettings/AccountSettings')
)
const FavouriteMoviesLazy = React.lazy(
  () => import('./components/profile/FavouriteMovies/FavouriteMovie')
)

const App = () => {
  const {name, isLoaded} = useProfileState()
  const location = usePathname()
  const navigate = useNavigate()

  const fetchProfile = useFetchProfile()

  useEffect(() => {
    void fetchProfile()
  }, [])

  useEffect(() => {
    if (isLoaded && !name && location.startsWith('/profile')) {
      navigate(AppRouter.home.path)
    }
  }, [isLoaded, name])

  return (
    <div className="extra-wrapper">
      <Header />
      <main>
        <h1 className="hidden">Онлайн-платформа ВK Маруся</h1>
        <Routes>
          <Route path={AppRouter.home.path} element={<MainPageLazy />} />
          <Route path={AppRouter.genres.path} element={<AllGenresLazy />} />

          <Route path={AppRouter.profile.path} element={<AccountLazy />}>
            <Route
              path={AppRouter.profileFavourite.path}
              element={<FavouriteMoviesLazy />}
            />
            <Route
              path={AppRouter.profileSettings.path}
              element={<AccountSettingsLazy />}
            />
          </Route>
          <Route path={AppRouter.movie.path(':id')} element={<MovieLazy />} />
          <Route
            path={AppRouter.genreDetails.path(':name')}
            element={<GenreLazy />}
          />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
