import prisma from '../../prismaClient';
import { Result } from '@badrap/result';
import { ReviewCreateData } from '../types/data';
import { ReviewResult } from '../types/return';
import movieRepository from '../../movie/repository';
import userRepository from '../../user/repository';

const create = async (data: ReviewCreateData): ReviewResult => {
	try {
		return Result.ok(
			await prisma.$transaction(async (transaction) => {
				const movie = await movieRepository.read.specificById({
					id: data.movieId,
				});
				if (movie.isErr) {
					throw movie.error;
				}

				const user = await userRepository.read.specificById({
					id: data.userId,
				});
				if (user.isErr) {
					throw user.error;
				}

				return transaction.review.create({
					data,
					include: {
						user: {
							select: {
								id: true,
								userName: true,
								email: true,
								avatar: true,
							},
						},
					},
				});
			})
		);
	} catch (e) {
		return Result.err(e as Error);
	}
};

export default create;
