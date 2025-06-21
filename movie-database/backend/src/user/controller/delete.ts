import type { Request, Response } from 'express';
import responses from '../../common/responses';
import {
	DeletedRecordError,
	NonExistentRecordError,
} from '../../common/errors';
import userRepository from '../repository';
import commonSchemas from '../../common/schemas';

const deleteUser = async (req: Request, res: Response) => {
	try {
		const paramsValidated = commonSchemas.idParamsSchema.parse(req.params);
		const user = await userRepository.delete(paramsValidated);

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
			message: 'User was successfully deleted',
		});
	} catch (e) {
		return responses.handleErrorResponse(e, res);
	}
};

export default deleteUser;
