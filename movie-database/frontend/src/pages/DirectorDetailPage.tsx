import { useState, type FC } from 'react'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import { useParams } from 'react-router-dom';
import WelcomePage from './WelcomePage/WelcomePage';
import { useQuery } from '@tanstack/react-query';
import { DirectorsApi } from '../services';
import { Director } from '../models';
import directorDefaultPage from '../../public/director.jpg'
import '../styles/directorDetail.css'
import dayjs from 'dayjs';
import Authorized from '../components/Authorized'
import DirectorUpdateDialog from '../components/director/DirectorUpdateDialog';

const DirectorDetailPage: FC = () => {
  const { id } = useParams();
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);

  const {data, isLoading, isError} = useQuery({
    queryKey: ['director', id],
    queryFn: () => {
      if (!id) {
        return Promise.reject('No id provided');
      }
      return DirectorsApi.getSingle(id);
    }
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !data || !data.data) {
    return <WelcomePage />;
  }

  const director: Director = data.data;
  const birthDate = dayjs(director.birthDate).format("DD/MM/YYYY");

  const deathDate = !director.dateOfDeath ? "Director is still alive" : "Date of death: " + dayjs(director.dateOfDeath).format("DD/MM/YYYY");
  const description = director.description;
  const name = director.name;
  const directorPicture = !director.picture ? directorDefaultPage : director.picture; 

  return (
    <>
    <Authorized roles={["ADMIN", "USER"]}>
      <Header />
      <Sidebar />
      <main className='director-detail anim-appear custom-scrollbar__content'>
        <div className='director-detail__info'>
          <div>
            <img src={directorPicture} alt='Title movie' className='director-detail__picture'/>
          </div>
          <div>
            <h1 className="director-detail__name">{name}</h1>
            <h2 className="director-detail__date">Date of birth: {birthDate}</h2>
            <h2 className="director-detail__date">{deathDate}</h2>
          </div>
          <div className="director-detail__desc">
            <h4 className="director-detail__desc-text">{description}</h4>
          </div>
          <div>
            <Authorized roles={["ADMIN"]}>
              <button className="form__button" type='submit' onClick={() => setIsUpdateDialogOpen(true)} >
                EDIT
             </button>
            <DirectorUpdateDialog isOpen={isUpdateDialogOpen} onClose={() => setIsUpdateDialogOpen(false)} dialogTitle='Edit Director' director={director}/>
          </Authorized>
          </div>
        </div>
      </main>
    </Authorized>
    </>
  )
}

export default DirectorDetailPage
