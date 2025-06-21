import { MovieWithoutReviews } from '../../movie/types/data';
import { Role } from '@prisma/client';

export type User = {
  id: string;
  createdAt: Date;
  deletedAt?: Date | null;
  isBlocked: boolean;
  userName: string;
  avatar?: string | null;
  email: string;
  role: Role;
  favourites: MovieWithoutReviews[];
  watchList: MovieWithoutReviews[];
};

export type UserCredentialsData = {
  id: string;
  deletedAt?: Date | null;
  userName: string;
  email: string;
  hashedPassword: string;
  isBlocked: boolean;
  role: Role;
};

export type UserWithoutMovies = {
  id: string;
  createdAt: Date;
  deletedAt?: Date | null;
  isBlocked: boolean;
  userName: string;
  avatar?: string | null;
  email: string;
  role: Role;
};

export type UserCreateData = {
  userName: string;
  avatar?: string | null;
  email: string;
  hashedPassword: string;
  role: Role;
};

export type UserReviewData = {
  id: string;
  userName: string;
  email: string;
  avatar?: string | null;
};

export type UserUpdateData = {
  id: string;
} & (
  | {
      userName: string;
      avatar: string;
    }
  | { userName: string }
  | { avatar: string }
);

export type UserSpecificByIdData = {
  id: string;
};

export type UserReadCredentialsData = {
  email: string;
} | {
  id: string;
};

export type ChangePasswordData = {
  id: string;
  newHashedPassword: string;
  oldPassword: string;
};

export type UserMovieData = {
  movieId: string;
  userId: string;
};
