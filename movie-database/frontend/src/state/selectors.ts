import { selector } from 'recoil'
import {
  moviesAtom,
  movieFilterDataAtom,
  userFilterDataAtom,
  usersAtom,
  sortOptionAtom,
  directorFilterDataAtom,
  directorsAtom
} from './atoms'
import { User, type Movie, Director } from '../models'

export const filteredMoviesSelector = selector<Movie[]>({
  key: 'filteredMoviesSelector',
  get: ({ get }) => {
    const movies = get(moviesAtom)
    const filterData = get(movieFilterDataAtom)
    const sortOption = get(sortOptionAtom);

    if (!movies) {
      return movies
    }

    return movies.filter((movie) => {
      const minDateMatch =
      filterData.minDate != null ? new Date(movie.releaseDate) >= new Date(filterData.minDate) : true;
      const maxDateMatch =
      filterData.maxDate != null ? new Date(movie.releaseDate) <= new Date(filterData.maxDate) : true;
      const categoryMatch =
        filterData.category != null && movie.category != null
          ? movie.category.id.toLowerCase().includes(filterData.category.toLowerCase())
          : true;
      const titleMatch = movie.title
        .toLowerCase()
        .includes(filterData.title.toLowerCase()) || movie.originalTitle
        .toLowerCase()
        .includes(filterData.title.toLowerCase());
      const directorMatch = movie.director.name
        .toLowerCase()
        .includes(filterData.director.toLowerCase());

      return (
        categoryMatch &&
        titleMatch &&
        directorMatch &&
        minDateMatch &&
        maxDateMatch
      );
    }).sort((a, b) => {
      if (sortOption === 'year') {
        if (a.createdAt < b.createdAt) {
          return -1;
        }
        return 1;
      } else if (sortOption === 'title') {
        return a.title.localeCompare(b.title);
      } else {
        return a.originalTitle.localeCompare(b.originalTitle);
      }
    }
    );
  }
})

export const filteredUsersSelector = selector<User[]>({
  key: 'filteredUsersSelector',
  get: ({ get }) => {
    const users = get(usersAtom);
    const filterData = get(userFilterDataAtom);

    if (!users) {
      return users;
    }
    return users.filter((user) => {
      const nameMatch = user.userName
        .toLowerCase()
        .includes(filterData.userName.toLowerCase());
      const emailMatch = user.email
        .toLowerCase()
        .includes(filterData.email.toLowerCase());

      return (
        nameMatch &&
        emailMatch
      );
    });
  },
});

export const filteredDirectorsSelector = selector<Director[]>({
  key: 'filteredDirectorsSelector',
  get: ({ get }) => {
    const directors = get(directorsAtom);
    const filterData = get(directorFilterDataAtom);

    if (!directors) {
      return directors;
    }
    return directors.filter((director) => {
      const nameMatch = director.name
        .toLowerCase()
        .includes(filterData.name.toLowerCase());

      return (
        nameMatch 
      );
    });
  },
});
