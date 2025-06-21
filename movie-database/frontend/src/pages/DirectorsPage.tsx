import { useState, type FC } from 'react'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import Directors from '../components/director/Directors'
import DirectorsFilter from '../components/director/DirectorsFilter'
import Authorized from '../components/Authorized'
import DirectorCreateDialog from '../components/director/DirectorCreateDialog'

const DirectorsPage: FC = () => {
  
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  return (
    <Authorized roles={["ADMIN", "USER"]}>
      <Header />
      <Sidebar />
      <main className="main-view anim-appear">
        <div className="main-view__header">
            <div className="main-view__title">
            <h2>Directors</h2>
            </div>
        </div>
        <div className="main-view__content">
          <DirectorsFilter/>
          <Authorized roles={["ADMIN"]}>
            <button className="form__button" type='button' onClick={() => setIsCreateDialogOpen(true)}>
              Add New Director
            </button>
            <DirectorCreateDialog isOpen={isCreateDialogOpen} onClose={() => setIsCreateDialogOpen(false)} dialogTitle='Create Director'/>
          </Authorized> 
          <Directors />
        </div>
      </main>
    </Authorized>
  )
}

export default DirectorsPage
