import type { Request, Response } from 'express';
import responses from '../../common/responses';
import commonSchemas from '../../common/schemas';
import {
	DeletedRecordError,
	NonExistentRecordError,
} from '../../common/errors';
import movieRepository from '../repository';
import schemas from './schemas';

const readAll = async (req: Request, res: Response) => {
	try {
		const movies = await movieRepository.read.all();

		return res.status(200).send({
			status: 'success',
			data: movies.unwrap(),
			message: 'Movies were successfully listed',
		});
	} catch (e) {
		console.log(e);
		return responses.handleErrorResponse(e, res);
	}
};

const readAllByCategory = async (req: Request, res: Response) => {
	try {
		const validatedParams = schemas.moviesByCategoryParamsSchema.parse(
			req.params
		);

		const movies = await movieRepository.read.allByCategory(validatedParams);

		if (movies.isErr) {
			if (movies.error instanceof NonExistentRecordError) {
				return responses.internalErrorResponse(movies.error, res, 404);
			}
			if (movies.error instanceof DeletedRecordError) {
				return responses.internalErrorResponse(movies.error, res, 400);
			}
		}

		return res.status(200).send({
			status: 'success',
			data: movies.unwrap(),
			message: 'Movies were successfully listed by category',
		});
	} catch (e) {
		return responses.handleErrorResponse(e, res);
	}
};

const readAllByDirector = async (req: Request, res: Response) => {
	try {
		const validatedParams = schemas.moviesByDirectorParamsSchema.parse(
			req.params
		);

		const movies = await movieRepository.read.allByDirector(validatedParams);

		if (movies.isErr) {
			if (movies.error instanceof NonExistentRecordError) {
				return responses.internalErrorResponse(movies.error, res, 404);
			}
			if (movies.error instanceof DeletedRecordError) {
				return responses.internalErrorResponse(movies.error, res, 400);
			}
		}

		return res.status(200).send({
			status: 'success',
			data: movies.unwrap(),
			message: 'Movies were successfully listed by director',
		});
	} catch (e) {
		return responses.handleErrorResponse(e, res);
	}
};

const readSpecificById = async (req: Request, res: Response) => {
	try {
		const paramsValidated = commonSchemas.idParamsSchema.parse(req.params);

		const movie = await movieRepository.read.specificById(paramsValidated);

		if (movie.isErr) {
			if (movie.error instanceof NonExistentRecordError) {
				return responses.internalErrorResponse(movie.error, res, 404);
			}
			if (movie.error instanceof DeletedRecordError) {
				return responses.internalErrorResponse(movie.error, res, 400);
			}
		}

		return res.status(200).send({
			status: 'success',
			data: movie.unwrap(),
			message: 'Movie was successfully listed',
		});
	} catch (e) {
		return responses.handleErrorResponse(e, res);
	}
};

export default {
	all: readAll,
	specificById: readSpecificById,
	allByCategory: readAllByCategory,
	allByDirector: readAllByDirector,
};
