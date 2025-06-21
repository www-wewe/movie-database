import { Result } from '@badrap/result';
import { Director } from './data';

export type DirectorResult = Promise<Result<Director>>;

export type DirectorReadAllResult = Promise<Result<Director[]>>;
