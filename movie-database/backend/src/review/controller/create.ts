import type { Request, Response } from 'express';
import responses from '../../common/responses';
import schemas from './schemas';
import reviewRepository from '../repository';
import {
	DeletedRecordError,
	NonExistentRecordError,
} from '../../common/errors';

const create = async (req: Request, res: Response) => {
	try {
		const userId = req.session.user?.id;
		if (userId == null) {
			return responses.authErrorResponse(res, 403, 'No user logged in!');
		}
		const paramsValidated = schemas.reviewMovieIdParamsSchema.parse(req.params);
		const bodyValidated = schemas.reviewBodySchema.parse(req.body);

		const review = await reviewRepository.create({
			userId,
			...bodyValidated,
			...paramsValidated,
		});

		if (review.isErr) {
			if (review.error instanceof NonExistentRecordError) {
				return responses.internalErrorResponse(review.error, res, 404);
			}
			if (review.error instanceof DeletedRecordError) {
				return responses.internalErrorResponse(review.error, res, 400);
			}
		}

		return res.status(201).send({
			status: 'success',
			data: review.unwrap(),
			message: 'Review was successfully created',
		});
	} catch (e) {
		return responses.handleErrorResponse(e, res);
	}
};

export default create;
