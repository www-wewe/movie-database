import { Request, Response } from 'express';
import userRepository from '../repository';
import {
	DeletedRecordError,
	NonExistentRecordError,
} from '../../common/errors';
import responses from '../../common/responses';

const getAuthInfo = async (req: Request, res: Response) => {
	try {
		const userId = req.session.user?.id;
		if (userId == null) {
			return responses.authErrorResponse(res, 403, 'No user logged in!');
		}

		const user = await userRepository.read.specificById({ id: userId });

		if (user.isErr) {
			if (user.error instanceof NonExistentRecordError) {
				return responses.internalErrorResponse(user.error, res, 404);
			}
			if (user.error instanceof DeletedRecordError) {
				return responses.internalErrorResponse(user.error, res, 400);
			}
		}

		return res.status(200).send({
			status: 'success',
			data: user.unwrap(),
			message: 'User auth info was successfully listed',
		});
	} catch (e) {
		return responses.handleErrorResponse(e, res);
	}
};

export default getAuthInfo;
