import { type FC, useState } from 'react'
import MovieFilter from '../components/movie/MovieFilter'
import Movies from '../components/movie/Movies'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import Authorized from '../components/Authorized'
import { MovieCreateDialog } from '../components/movie/MovieCreateDialog'

const MoviesPage: FC = () => {

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  
  return (
    <Authorized roles={["ADMIN", "USER"]}>
      <Header />
      <Sidebar />
      <main className="main-view anim-appear">
        <div className="main-view__header">
            <div className="main-view__title">
            <h2>Movies</h2>
            </div>
        </div>
        
        <div className="main-view__content">
          <MovieFilter/>
          <Authorized roles={["ADMIN"]}>
            <button className="form__button" type='button' onClick={() => setIsCreateDialogOpen(true)}>
              Add New Movie
            </button>
          </Authorized>
          <MovieCreateDialog isOpen={isCreateDialogOpen} onClose={() => setIsCreateDialogOpen(false)} dialogTitle='Create Movie'/>
          <Movies />
        </div>
      </main>
    </Authorized>
  )
}

export default MoviesPage
