import type { Request, Response } from 'express';
import responses from '../../common/responses';
import commonSchemas from '../../common/schemas';
import {
	DeletedRecordError,
	NonExistentRecordError,
} from '../../common/errors';
import userRepository from '../repository';

const readAll = async (req: Request, res: Response) => {
	try {
		const users = await userRepository.read.all();

		return res.status(200).send({
			status: 'success',
			data: users.unwrap(),
			message: 'Users were successfully listed',
		});
	} catch (e) {
		return responses.handleErrorResponse(e, res);
	}
};

const readSpecificById = async (req: Request, res: Response) => {
	try {
		const paramsValidated = commonSchemas.idParamsSchema.parse(req.params);

		const user = await userRepository.read.specificById(paramsValidated);

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
			message: 'User was successfully listed',
		});
	} catch (e) {
		return responses.handleErrorResponse(e, res);
	}
};

export default {
	all: readAll,
	specificById: readSpecificById,
};
