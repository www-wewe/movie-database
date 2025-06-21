import { Navigate, Route, Routes } from 'react-router'
import DirectorDetailPage from './pages/DirectorDetailPage'
import DirectorsPage from './pages/DirectorsPage'
import LoginPage from './pages/LoginPage/LoginPage'
import MovieDetailPage from './pages/MovieDetailPage'
import MoviesPage from './pages/MoviesPage'
import RegisterPage from './pages/RegisterPage/RegisterPage'
import UserDetailPage from './pages/UserDetailPage'
import WelcomePage from './pages/WelcomePage/WelcomePage'
import UsersPage from './pages/UsersPage'
import CategoriesPage from './pages/CategoriesPage'
import { FC } from 'react'


function App () {
  return (
    <Routes>
      <Route path="/registration" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/logout" element={<WelcomePage/>} />
      <Route path="/" element={<WelcomePage />} />

      <Route path="/auth/*" Component={PrivateRoute}/>

      <Route path="*" element={<Navigate to="/" /> } />
    </Routes>
  )
}

const PrivateRoute: FC = () => {

  return <Routes>
    <Route path="movie" element={<MoviesPage />} />

    <Route path="movie/:id" element={<MovieDetailPage />} />

    <Route path="user/:id" element={<UserDetailPage />} />

    <Route path="director" element={<DirectorsPage />} />

    <Route path="director/:id" element={<DirectorDetailPage />} />

    <Route path="user" element={<UsersPage />} />

    <Route path="category" element={<CategoriesPage />} />
  </Routes>
  
}

export default App
