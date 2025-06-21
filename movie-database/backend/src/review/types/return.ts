import { Result } from '@badrap/result';
import { Review } from './data';

export type ReviewResult = Promise<Result<Review>>;
