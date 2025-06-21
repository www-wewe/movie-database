export interface MovieFilterData {
  minDate: Date | null;
  maxDate: Date | null;
  title: string;
  director: string;
  category: string | null; // category id
  onlyFavourites: boolean;
  onlyWatchLater: boolean;
}

export const defaultMovieFilterData: MovieFilterData = {
  minDate: null,
  maxDate: null,
  title: '',
  director: '',
  category: null,
  onlyFavourites: false,
  onlyWatchLater: false,
}

export type MovieForm = {
  title: string;
  originalTitle: string;
  description: string;
  language: string;
  directorId: string;
  categoryId: string;
  duration: number;
  cast: string;
  picture: string;
  releaseDate: Date;
};
