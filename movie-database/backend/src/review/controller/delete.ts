import type { Request, Response } from 'express';
import responses from '../../common/responses';
import schemas from './schemas';
import {
	DeletedRecordError,
	NonExistentRecordError,
	UnauthorizedOwnershipError,
} from '../../common/errors';
import reviewRepository from '../repository';

const deleteReview = async (req: Request, res: Response) => {
	try {
		const userId = req.session.user?.id;
		if (userId == null) {
			return responses.authErrorResponse(res, 403, 'No user logged in!');
		}
		const paramsValidated = schemas.idsReviewParamsSchema.parse(req.params);

		const review = await reviewRepository.delete({
			...paramsValidated,
			userId,
		});

		if (review.isErr) {
			if (review.error instanceof NonExistentRecordError) {
				return responses.internalErrorResponse(review.error, res, 404);
			}
			if (review.error instanceof DeletedRecordError) {
				return responses.internalErrorResponse(review.error, res, 400);
			}
			if (review.error instanceof UnauthorizedOwnershipError) {
				return responses.internalErrorResponse(review.error, res, 403);
			}
		}

		return res.status(200).send({
			status: 'success',
			data: review.unwrap(),
			message: 'Review was successfully deleted',
		});
	} catch (e) {
		return responses.handleErrorResponse(e, res);
	}
};

export default deleteReview;
