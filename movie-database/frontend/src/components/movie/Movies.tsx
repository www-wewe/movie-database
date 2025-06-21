import { useRecoilValue, useSetRecoilState } from "recoil";
import { movieFilterDataAtom, moviesAtom, sortOptionAtom } from "../../state/atoms";
import { filteredMoviesSelector } from "../../state/selectors";
import Movie from "./Movie";
import { useQuery } from "@tanstack/react-query";
import { MoviesApi } from "../../services";
import { Link } from "react-router-dom";
import Authorized from "../Authorized";
import WelcomePage from "../../pages/WelcomePage/WelcomePage";
import useAuth from "../../hooks/useAuth";

export default function Movies() {
  
    const setMovies = useSetRecoilState(moviesAtom);
    const setSortOption = useSetRecoilState(sortOptionAtom);
    const filterData = useRecoilValue(movieFilterDataAtom);
    const moviesToShow = useRecoilValue(
      filteredMoviesSelector
    );

    const handleSortOptionChange = (e: { target: { value: string | ((currVal: string) => string); }; }) => {
      setSortOption(e.target.value);
    };

    useQuery({
      queryKey: ['movie'],
      queryFn: () => {
          return MoviesApi.getAll();
      },
      onSuccess: (movies) => {
        setMovies(movies.data);
      }
    });

    const {auth} = useAuth();

    if (!auth || !auth.data) {
      return <WelcomePage />
    }

    const user = auth.data;

    const movies = moviesToShow.filter((f) => {
      if (filterData.onlyFavourites && filterData.onlyWatchLater) {
        return user.favourites.some(x => x.title === f.title) && user.watchList.some(x => x.title === f.title);
      } else if (filterData.onlyFavourites) {
        return user.favourites.some(x => x.title === f.title);
      } else if (filterData.onlyWatchLater) {
        return user.watchList.some(x => x.title === f.title);
      } return true;
    })

    return (
      <>
        <Authorized  roles={["ADMIN", "USER"]}>
          {movies.length === 0 ? (
            <div style={{color: "orange", marginBottom: "0.5rem"}}>
              No Movies To Show
            </div>
          ) : (
            <div>
              <p style={{color: "#757575", marginBottom: "0.5rem"}}>
                {movies.length > 1
                  ? 'Showing ' + movies.length + ' Movies'
                  : 'Showing One Movie' }
              </p>
              <div>
                <label className="filter__label" htmlFor="sortOption">Sort By: </label>
                <select id="sortOption" onChange={handleSortOptionChange}>
                  <option value="year">Year</option>
                  <option value="title">Title</option>
                  <option value="originalTitle">Original Title</option>
                </select>
              </div>
              <div className="images">
                {movies.map((movie) => (
                  <div className="images__image-area" key={movie.id}>
                    <Link to={`${movie.id}`}>
                      <Movie source={movie} />
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}
        </Authorized>
      </>
    );
}
