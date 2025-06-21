import prisma from '../../prismaClient';
import { Result } from '@badrap/result';
import {
	ChangePasswordData,
	UserSpecificByIdData,
	UserUpdateData,
} from '../types/data';
import {UserWithoutMoviesResult} from '../types/return';
import {
	InvalidPasswordError,
} from '../../common/errors';
import userRepository from '.';
import argon2 from 'argon2';

const update = async (data: UserUpdateData): UserWithoutMoviesResult => {
	try {
		return Result.ok(
			await prisma.$transaction(async (transaction) => {
				const user = await userRepository.read.specificById({ id: data.id });
				if (user.isErr) {
					throw user.error;
				}

				return transaction.user.update({
					where: {
						id: data.id,
					},
					data,
					select: {
						id: true,
						createdAt: true,
						updatedAt: true,
						deletedAt: true,
						isBlocked: true,
						userName: true,
						avatar: true,
						email: true,
						role: true,
					},
				});
			})
		);
	} catch (e) {
		return Result.err(e as Error);
	}
};

const flipIsBlockedState = async (
	data: UserSpecificByIdData
): UserWithoutMoviesResult => {
	try {
		return Result.ok(
			await prisma.$transaction(async (transaction) => {
				const user = await userRepository.read.specificById({ id: data.id });
				if (user.isErr) {
					throw user.error;
				}

				const newState = !user.unwrap().isBlocked;
				return transaction.user.update({
					where: {
						id: data.id,
					},
					data: {
						isBlocked: newState,
					},
					select: {
						id: true,
						createdAt: true,
						updatedAt: true,
						deletedAt: true,
						isBlocked: true,
						userName: true,
						avatar: true,
						email: true,
						role: true,
					},
				});
			})
		);
	} catch (e) {
		return Result.err(e as Error);
	}
};

const changePassword = async (data: ChangePasswordData): UserWithoutMoviesResult => {
	try {
		return Result.ok(
			await prisma.$transaction(async (transaction) => {
				const user = await userRepository.read.credentials({ id: data.id });
				if (user.isErr) {
					throw user.error;
				}

				const oldPasswordVerified = await argon2.verify(
					user.unwrap().hashedPassword,
					data.oldPassword
				);
				if (!oldPasswordVerified) {
					throw new InvalidPasswordError('Invalid password!');
				}

				return transaction.user.update({
					where: {
						id: data.id,
					},
					data: {
						hashedPassword: data.newHashedPassword,
					},
					select: {
						id: true,
						createdAt: true,
						updatedAt: true,
						deletedAt: true,
						isBlocked: true,
						userName: true,
						avatar: true,
						email: true,
						role: true,
					},
				});
			})
		);
	} catch (e) {
		return Result.err(e as Error);
	}
};

export default {
	profile: update,
	flipIsBlockedState,
	changePassword,
};
