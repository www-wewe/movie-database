import { atom } from 'recoil'
import {
  defaultMovieFilterData,
  type MovieFilterData,
} from '../models/movie'
import { Category, Director, type Movie, type User } from '../models'
import { UserFilterData, defaultUserFilterData, UsersPreferences } from '../models/user';
import { DirectorFilterData, defaultDirectorFilterData } from '../models/director';

export const loginAtom = atom<"ADMIN" | "USER" | undefined>({
  key: 'loginAtom',
  default: undefined
})

export const usersAtom = atom<User[]>({
  key: 'usersAtom',
  default: []
})

export const userFilterDataAtom = atom<UserFilterData>({
  key: 'userFilterDataAtom',
  default: defaultUserFilterData,
});

export const moviesAtom = atom<Movie[]>({
  key: 'moviesAtom',
  default: []
})

export const movieFilterDataAtom = atom<MovieFilterData>({
  key: 'movieFilterDataAtom',
  default: defaultMovieFilterData
})

export const usersPreferencesAtom = atom<UsersPreferences>({
  key: 'usersPreferencesAtom',
  default: {
    favourites: new Set<string>(),
    watchList: new Set<string>()
  }
})

export const sortOptionAtom = atom({
  key: 'sortOption',
  default: 'year', // title | originalTitle | year
});

export const categoriesAtom = atom<Category[]>({
  key: 'categoriesAtom',
  default: [],
});

export const directorsAtom = atom<Director[]>({
  key: 'directorsAtom',
  default: [],
});

export const directorFilterDataAtom = atom<DirectorFilterData>({
  key: 'directorFilterDataAtom',
  default: defaultDirectorFilterData,
});
