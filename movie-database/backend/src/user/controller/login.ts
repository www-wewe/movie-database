import type { Request, Response } from 'express';
import responses from '../../common/responses';
import {
	DeletedRecordError,
	NonExistentRecordError,
} from '../../common/errors';
import schemas from './schemas';
import userRepository from '../repository';
import argon2 from 'argon2';
import { Role } from '@prisma/client';

const login = async (req: Request, res: Response) => {
	try {
		const bodyValidated = schemas.UserLoginData.parse(req.body);

		const user = await userRepository.read.credentials({
			email: bodyValidated.email,
		});

		if (user.isErr) {
			if (user.error instanceof NonExistentRecordError) {
				return responses.internalErrorResponse(user.error, res, 404);
			}
			if (user.error instanceof DeletedRecordError) {
				return responses.internalErrorResponse(user.error, res, 400);
			}
		}

		const userResult = user.unwrap();

		if (userResult.isBlocked) {
			throw responses.blockedUserErrorResponse(res);
		}

		const isVerified = await argon2.verify(
			userResult.hashedPassword,
			bodyValidated.password
		);

		if (!isVerified) {
			return responses.authErrorResponse(res, 401, 'Wrong password!');
		}

		const userWithoutPassword = {
			id: userResult.id,
			userName: userResult.userName,
			email: userResult.email,
			role: userResult.role as Role,
			isBlocked: userResult.isBlocked,
		};

		req.session.user = userWithoutPassword;

		return res.status(200).send({
			status: 'success',
			data: userWithoutPassword,
			message: 'User was successfully logged in',
		});
	} catch (e) {
		return responses.handleErrorResponse(e, res);
	}
};

export default login;
