import { useState, type FC } from 'react'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import Categories from '../components/category/Categories'
import Authorized from '../components/Authorized'
import { CategoryCreateDialog } from '../components/category/CategoryCreateDialog'

const CategoriesPage: FC = () => {

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  return (
    <Authorized roles={["ADMIN", "USER"]}>
      <Header />
      <Sidebar />
      <main className="main-view__category anim-appear custom-scrollbar__content">
        <div className="main-view__header">
            <div className="main-view__title">
              <h2>Categories</h2>
            </div>
        </div>
        <div className="main-view__content">
          <Authorized roles={["ADMIN"]}>
            <button className="form__button" type='button' onClick={() => setIsCreateDialogOpen(true)}>
                Add New Category
            </button>
            <CategoryCreateDialog isOpen={isCreateDialogOpen} onClose={() => setIsCreateDialogOpen(false)}/>
          </Authorized>
          <Categories />
        </div>
      </main>
    </Authorized>
  )
}

export default CategoriesPage
