import prisma from '../../prismaClient';
import { Result } from '@badrap/result';
import { UserCreateData } from '../types/data';
import { UserWithoutMoviesResult } from '../types/return';

const create = async (data: UserCreateData): UserWithoutMoviesResult => {
	try {
		const user = await prisma.user.create({
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

		return Result.ok(user);
	} catch (e) {
		return Result.err(e as Error);
	}
};

export default create;
