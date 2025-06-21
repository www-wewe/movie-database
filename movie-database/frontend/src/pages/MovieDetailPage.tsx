import { useState, type FC } from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import { useParams } from 'react-router'
import '../styles/movieDetail.css'
import defaultMoviePicture from '../../public/movie-default-picture.jpg';
import WelcomePage from './WelcomePage/WelcomePage'
import Authorized from '../components/Authorized'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { MoviesApi, UsersApi } from '../services'
import { Movie } from '../models'
import '../styles/movieDetail.css'
import dayjs from 'dayjs'
import useAuth from '../hooks/useAuth'
import { MovieUpdateDialog } from '../components/movie/MovieUpdateDialog'
import Review from '../components/Review'

const MovieDetailPage: FC = () => {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [inFavourites, setInFavourites] = useState<boolean | undefined>(false);
  const [inWatchLater, setInWatchLater] = useState<boolean | undefined>(false);
  const { id } = useParams();
  const { auth } = useAuth();
  const queryClient = useQueryClient();

  const addToWatchListMutation = useMutation(
    (movie: Movie) => UsersApi.addToWatchList(movie.id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['user', user.id]);
        queryClient.invalidateQueries(['movie', movie.id]);
        setInWatchLater(true);
        handleAction(`Movie with id: ${id} successfully added to watch list`);
      },
      onError: (error) => {
        handleAction(`Cannot add movie with id: ${id} to watch list. ${error}`)
      }
    }
  )

  const addToFavouritesMutation = useMutation(
    (movie: Movie) => UsersApi.addToFavourites(movie.id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['user', user.id]);
        queryClient.invalidateQueries(['movie', movie.id]);
        setInFavourites(true);
        handleAction(`Movie with id: ${id} successfully added to favourites`);
      },
      onError: (error) => {
        handleAction(`Cannot add movie with id: ${id} to favourites. ${error}`)
      }
    }
  )

  const removeFromFavouritesMutation = useMutation(
    (movie: Movie) => UsersApi.removeFromFavourites(movie.id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['user', user.id]);
        queryClient.invalidateQueries(['movie', movie.id]);
        setInFavourites(false);
        handleAction(`Movie with id: ${id} successfully removed from favourites`);
      },
      onError: (error) => {
        handleAction(`Cannot remove movie with id: ${id} from favourites. ${error}`)
      }
    }
  )

  const removeFromWatchListMutation = useMutation(
    (movie: Movie) => UsersApi.removeFromWatchList(movie.id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['user', user.id]);
        queryClient.invalidateQueries(['movie', movie.id]);
        setInWatchLater(false);
        handleAction(`Movie with id: ${id} successfully removed from watch list`);
      },
      onError: (error) => {
        handleAction(`Cannot remove movie with id: ${id} from watch list. ${error}`)
      }
    }
  )

  if (!id)
  return <WelcomePage/>;

  const {data, isLoading, isError} = useQuery({
    queryKey: ['movie', id],
    queryFn: () => {
      return MoviesApi.getSingle(id);
    },
    onSuccess: (movie) => {
      setInFavourites(auth?.data.favourites.some( (m) => m.id === movie.data.id));
      setInWatchLater(auth?.data.watchList.some( (m) => m.id === movie.data.id));
    }
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !data || !data.data || !auth || !auth.data) {
    return <WelcomePage />;
  }

  const movie: Movie = data.data;
  const category = movie.category;
  const director = movie.director;
  const moviePicture = movie.picture !== null ? movie.picture : defaultMoviePicture;
  const releaseDate = movie.releaseDate;
  const user = auth.data;

  function handleAddToFavourites() {
    if (inFavourites) {
      removeFromFavouritesMutation.mutate(movie);
    } else {
      addToFavouritesMutation.mutate(movie);
    }
  }

  function handleAddToWatchList() {
    if (inWatchLater) {
      removeFromWatchListMutation.mutate(movie);
    } else {
      addToWatchListMutation.mutate(movie);
    }
  }

  const handleAction = (message: string) => {
    alert(message);
  }

  return (
    <Authorized roles={["ADMIN", "USER"]}>
      <Header />
      <Sidebar />
      <main className='movie-page custom-scrollbar__content'>
        <div className='movie-page__info'>
          <div>
            <img src={moviePicture} alt='Title movie' className='movie-page__picture'/>
          </div>
          <div className='movie-page__info-text'>
            <h1 className='movie-page__title'>{movie.title}</h1>
            <h1 className='movie-page__oTitle'>{movie.originalTitle}</h1>
            {inFavourites}
            {inWatchLater}
          </div>
          <div className='movie-page__buttons'>
            <Authorized roles={["USER"]}>
              <button className='movie-page__button' type='button' onClick={handleAddToFavourites} >{inFavourites ? `Remove from` : `Add to`} favorites</button> 
              <button className='movie-page__button' type='button' onClick={handleAddToWatchList} >{inWatchLater ? `Remove from` : `Add to`} watch later</button>
            </Authorized>
            <Authorized roles={["ADMIN"]}>
              <button className='movie-page__button' type='submit' onClick={() => setIsEditDialogOpen(true)}>Edit Movie</button>
              <MovieUpdateDialog isOpen={isEditDialogOpen} onClose={() => setIsEditDialogOpen(false)} movie={movie}/>
            </Authorized>
          </div>
          <div className='movie-page__people'>
            <h4 className='movie-page__lang'>Original language: {movie.language}</h4>
            <h4 className='movie-page__date'>Release date: {dayjs(releaseDate).format("DD/MM/YYYY")}</h4>
            <h4 className='movie-page__director'>Director: {director?.name}</h4>
            <h4 className='movie-page__cast'>Actors: {movie.cast}</h4>
          </div>
          <div className="movie-detail__desc">
            <h2 className='movie-page__category'>{category?.name}</h2>
            <h4 className='movie-page__desc'>{movie.description}</h4>
          </div>
        </div>
        <Authorized roles={["USER"]}>
          <div className="main-view-reviews">
          Movie reviews: {movie.reviews.length}
            <div className="main-view-reviews-content">
              {movie.reviews.length > 0 && movie.reviews.map((review) => (
                <Review key={review.id} review={review} />
              ))}
              {movie.reviews.length === 0 && <>
                Looks like there are no reviews for this movie yet. Be the first to write one!
              </>}
            </div>
          </div>
          <Footer movie={movie} user={user}/>
        </Authorized>
      </main>
    </Authorized>
  )
}

export default MovieDetailPage
