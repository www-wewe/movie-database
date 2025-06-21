import { Result } from '@badrap/result';
import { Movie, MovieWithoutReviews } from './data';

export type MovieResult = Promise<Result<Movie>>;

export type MovieWithoutReviewsResult = Promise<Result<MovieWithoutReviews>>;

export type MovieReadAllResult = Promise<Result<Movie[]>>;
