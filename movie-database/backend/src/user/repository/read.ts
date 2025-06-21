import prisma from '../../prismaClient';
import {Result} from '@badrap/result';
import {UserReadCredentialsData, UserSpecificByIdData} from '../types/data';
import {UserCredentialsResult, UserReadAllResult, UserResult,} from '../types/return';
import {DeletedRecordError, NonExistentRecordError,} from '../../common/errors';

const readAll = async (): UserReadAllResult => {
	try {
		return Result.ok(
			await prisma.$transaction(async (transaction) => {
				return transaction.user.findMany({
					where: {
						deletedAt: null,
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
					}
				});
			})
		);
	} catch (e) {
		return Result.err(e as Error);
	}
};

const readSpecificById = async (
	data: UserSpecificByIdData
): UserResult => {
	try {
		return Result.ok(
			await prisma.$transaction(async (transaction) => {
				const user = await transaction.user.findUnique({
					where: {
						id: data.id,
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
						favourites: {
							include: {
								category: true,
								director: true,
							},
						},
						watchList: {
							include: {
								category: true,
								director: true,
							},
						},
					},
				});

				if (user === null) {
					throw new NonExistentRecordError('No user found!');
				}

				if (user.deletedAt !== null) {
					throw new DeletedRecordError('The user has already been deleted!');
				}

				return user;
			})
		);
	} catch (e) {
		return Result.err(e as Error);
	}
};

const readCredentials = async (
	data: UserReadCredentialsData
): UserCredentialsResult => {
	try {
		return Result.ok(
			await prisma.$transaction(async (transaction) => {
				const filter = 'id' in data ? { id: data.id } : { email: data.email };

				const user = await transaction.user.findUnique({
					where: filter,
					select: {
						id: true,
						deletedAt: true,
						isBlocked: true,
						userName: true,
						email: true,
						hashedPassword: true,
						role: true,
					},
				});

				if (user === null) {
					throw new NonExistentRecordError('No user found!');
				}

				if (user.deletedAt !== null) {
					throw new DeletedRecordError('The user has already been deleted!');
				}

				return user;
			})
		);
	} catch (e) {
		return Result.err(e as Error);
	}
};

export default {
	all: readAll,
	specificById: readSpecificById,
	credentials: readCredentials,
};
