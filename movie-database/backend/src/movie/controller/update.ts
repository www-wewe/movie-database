import type { Request, Response } from 'express';
import responses from '../../common/responses';
import schemas from './schemas';
import commonSchemas from '../../common/schemas';
import {
	DeletedRecordError,
	NonExistentRecordError,
} from '../../common/errors';
import movieRepository from '../repository';

const update = async (req: Request, res: Response) => {
	try {
		const paramsValidated = commonSchemas.idParamsSchema.parse(req.params);
		const bodyValidated = schemas.movieBodySchema.parse(req.body);

		const movie = await movieRepository.update({
			...paramsValidated,
			...bodyValidated,
		});

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
			message: 'Movie was successfully updated',
		});
	} catch (e) {
		return responses.handleErrorResponse(e, res);
	}
};

export default update;
