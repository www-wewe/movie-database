import type { Request, Response } from 'express';
import categoryRepository from '../repository';
import responses from '../../common/responses';
import schemas from './schemas';
import {
	DeletedRecordError,
	NonExistentRecordError,
} from '../../common/errors';

const create = async (req: Request, res: Response) => {
	try {
		const bodyValidated = schemas.movieBodySchema.parse(req.body);

		const movie = await categoryRepository.create(bodyValidated);

		if (movie.isErr) {
			if (movie.error instanceof NonExistentRecordError) {
				return responses.internalErrorResponse(movie.error, res, 404);
			}
			if (movie.error instanceof DeletedRecordError) {
				return responses.internalErrorResponse(movie.error, res, 400);
			}
		}

		return res.status(201).send({
			status: 'success',
			data: movie.unwrap(),
			message: 'Movie was successfully created',
		});
	} catch (e) {
		return responses.handleErrorResponse(e, res);
	}
};

export default create;
