import type { Request, Response } from 'express';
import responses from '../../common/responses';
import schemas from './schemas';
import commonSchemas from '../../common/schemas';
import {
	DeletedRecordError,
	InvalidPasswordError,
	NonExistentRecordError,
} from '../../common/errors';
import userRepository from '../repository';
import { Prisma } from '@prisma/client';
import argon2 from 'argon2';

const update = async (req: Request, res: Response) => {
	try {
		const userId = req.session.user?.id;
		if (userId == null) {
			return responses.authErrorResponse(res, 403, 'No user logged in!');
		}
		const bodyValidated = schemas.UserUpdateData.parse(req.body);
		const user = await userRepository.update.profile({
			id: userId,
			...bodyValidated,
		});

		if (user.isErr) {
			if (user.error instanceof NonExistentRecordError) {
				return responses.internalErrorResponse(user.error, res, 404);
			}
			if (user.error instanceof DeletedRecordError) {
				return responses.internalErrorResponse(user.error, res, 400);
			}
			if (user.error instanceof Prisma.PrismaClientKnownRequestError) {
				// Unique constraint violation error
				if (user.error.code === 'P2002') {
					const violatedField: string =
            (user.error.meta?.target as string[] | undefined)?.[0] || '';
					return responses.uniqueViolationErrorResponse(
						user.error,
						res,
						409,
						violatedField
					);
				}
			}
		}

		return res.status(200).send({
			status: 'success',
			data: user.unwrap(),
			message: 'User was successfully updated',
		});
	} catch (e) {
		return responses.handleErrorResponse(e, res);
	}
};

const flipIsBlockedState = async (req: Request, res: Response) => {
	try {
		const paramsValidated = commonSchemas.idParamsSchema.parse(req.params);
		const user = await userRepository.update.flipIsBlockedState({
			...paramsValidated,
		});

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
			message: 'User blocked state was successfully flipped',
		});
	} catch (e) {
		return responses.handleErrorResponse(e, res);
	}
};

const changePassword = async (req: Request, res: Response) => {
	try {
		const userId = req.session.user?.id;
		if (userId == null) {
			return responses.authErrorResponse(res, 403, 'No user logged in!');
		}
		const bodyValidated = schemas.UserUpdatePasswordData.parse(req.body);

		const newHashedPassword = await argon2.hash(bodyValidated.newPassword);
		const user = await userRepository.update.changePassword({
			id: userId,
			newHashedPassword,
			oldPassword: bodyValidated.oldPassword,
		});

		if (user.isErr) {
			if (user.error instanceof NonExistentRecordError) {
				return responses.internalErrorResponse(user.error, res, 404);
			}
			if (user.error instanceof DeletedRecordError) {
				return responses.internalErrorResponse(user.error, res, 400);
			}
			if (user.error instanceof InvalidPasswordError) {
				return responses.authErrorResponse(res, 401, 'Wrong password!');
			}
		}

		return res.status(200).send({
			status: 'success',
			data: user.unwrap(),
			message: 'User password was successfully changed',
		});
	} catch (e) {
		return responses.handleErrorResponse(e, res);
	}
};

export default {
	profile: update,
	flipIsBlockedState,
	password: changePassword,
};
