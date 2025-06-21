import type { Request, Response } from 'express';
import argon2 from 'argon2';
import responses from '../../common/responses';
import schemas from './schemas';
import userRepository from '../repository';
import { Prisma, Role } from '@prisma/client';

const createUser = async (req: Request, res: Response) => {
	try {
		const bodyValidated = schemas.UserRegisterData.parse(req.body);

		const userHashedPassword = await argon2.hash(bodyValidated.password);

		const dataForRepositoryCreate = {
			userName: bodyValidated.userName,
			email: bodyValidated.email,
			hashedPassword: userHashedPassword,
			avatar: bodyValidated.avatar,
			role: Role.USER
		};

		const user = await userRepository.create(dataForRepositoryCreate);

		if (user.isErr) {
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
			return responses.internalErrorResponse(user.error, res, 500);
		}

		return res.status(201).send({
			status: 'success',
			data: user.unwrap(),
			message: 'User was successfully registered',
		});
	} catch (e) {
		return responses.handleErrorResponse(e, res);
	}
};

const createAdmin = async (req: Request, res: Response) => {
	try {
		const bodyValidated = schemas.UserRegisterData.parse(req.body);

		const userHashedPassword = await argon2.hash(bodyValidated.password);

		const dataForRepositoryCreate = {
			userName: bodyValidated.userName,
			email: bodyValidated.email,
			hashedPassword: userHashedPassword,
			role: Role.ADMIN
		};

		const admin = await userRepository.create(dataForRepositoryCreate);

		if (admin.isErr) {
			if (admin.error instanceof Prisma.PrismaClientKnownRequestError) {
				// Unique constraint violation error
				if (admin.error.code === 'P2002') {
					const violatedField: string =
						(admin.error.meta?.target as string[] | undefined)?.[0] || '';
					return responses.uniqueViolationErrorResponse(
						admin.error,
						res,
						409,
						violatedField
					);
				}
			}
			return responses.internalErrorResponse(admin.error, res, 500);
		}

		return res.status(201).send({
			status: 'success',
			data: admin.unwrap(),
			message: 'Admin was successfully created',
		});
	} catch (e) {
		return responses.handleErrorResponse(e, res);
	}
};

export default {
	user: createUser,
	admin: createAdmin
};
