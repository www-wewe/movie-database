import { Result } from '@badrap/result';
import { User, UserCredentialsData, UserWithoutMovies } from './data';

export type UserResult = Promise<Result<User>>;

export type UserCredentialsResult = Promise<Result<UserCredentialsData>>;

export type UserWithoutMoviesResult = Promise<Result<UserWithoutMovies>>;

export type UserReadAllResult = Promise<Result<UserWithoutMovies[]>>;
