import prisma from '../../prismaClient';
import { Result } from '@badrap/result';
import { UserSpecificByIdData } from '../types/data';
import { UserWithoutMoviesResult } from '../types/return';
import userRepository from '.';

const deleteUser = async (data: UserSpecificByIdData): UserWithoutMoviesResult => {
	try {
		return Result.ok(
			await prisma.$transaction(async (transaction) => {
				const user = await userRepository.read.specificById({
					id: data.id,
				});
				if (user.isErr) {
					throw user.error;
				}

				return transaction.user.update({
					where: {
						id: data.id,
					},
					data: {
						deletedAt: new Date(),
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

export default deleteUser;
