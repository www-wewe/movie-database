import { useState } from 'react';
import { type Category } from '../../models'
import defaultCategoryPicture from '../../../public/category.jpg'
import { CategoryUpdateDialog } from './CategoryUpdateDialog';
import Authorized from '../Authorized';


export interface CategoryProps {
  source: Category
}

export default function Category ({ source }: CategoryProps) {

  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);

  return (
    <Authorized roles={["ADMIN", "USER"]}>
      <img className="images__image" src={source.picture === null ? defaultCategoryPicture : source.picture} />
      <div className="images__image-label">
        <Authorized roles={["ADMIN"]}>
          <button className="form__button" type='button' onClick={() => setIsUpdateDialogOpen(true)} >
            EDIT
          </button>
        </Authorized>
        {source.name}
      </div>
      <CategoryUpdateDialog isOpen={isUpdateDialogOpen} onClose={() => setIsUpdateDialogOpen(false)} category={source}/>
    </Authorized>
  )
}
