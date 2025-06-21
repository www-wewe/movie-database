import { Category } from '../../category/types/data';
import { Director } from '../../director/types/data';
import { Review } from '../../review/types/data';

export type Movie = {
  id: string;
  createdAt: Date;
  deletedAt?: Date | null;
  title: string;
  originalTitle: string;
  description: string;
  language: string;
  director: Director;
  category: Category;
  duration: number;
  cast: string;
  picture?: string | null;
  releaseDate: Date;
  reviews: Review[];
};

export type MovieWithoutReviews = {
  id: string;
  createdAt: Date;
  deletedAt?: Date | null;
  title: string;
  originalTitle: string;
  description: string;
  language: string;
  director: Director;
  category: Category;
  duration: number;
  cast: string;
  picture?: string | null;
  releaseDate: Date;
};

export type MovieCreateData = {
  title: string;
  originalTitle: string;
  description: string;
  language: string;
  directorId: string;
  categoryId: string;
  duration: number;
  cast: string;
  picture?: string | null;
  releaseDate: Date;
};

export type MovieUpdateData = {
  id: string;
  title: string;
  originalTitle: string;
  description: string;
  language: string;
  directorId: string;
  categoryId: string;
  duration: number;
  cast: string;
  picture?: string | null;
  releaseDate: Date;
};

export type MovieSpecificByIdData = {
  id: string;
};

export type MovieAllByCategoryData = {
  categoryId: string;
};

export type MovieAllByDirectorData = {
  directorId: string;
};
