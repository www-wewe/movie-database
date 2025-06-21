import { Result } from '@badrap/result';
import { Category } from './data';

export type CategoryResult = Promise<Result<Category>>;

export type CategoryReadAllResult = Promise<Result<Category[]>>;
