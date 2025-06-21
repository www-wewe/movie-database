import prisma from '../../prismaClient';
import { Result } from '@badrap/result';
import { MovieSpecificByIdData } from '../types/data';
import { MovieWithoutReviewsResult } from '../types/return';
import movieRepository from './index';

const deleteMovie = async (data: MovieSpecificByIdData): MovieWithoutReviewsResult => {
	try {
		return Result.ok(
			await prisma.$transaction(async (transaction) => {
				const movie = await movieRepository.read.specificById({ id: data.id });
				if (movie.isErr) {
					throw movie.error;
				}

				const deletedAt = new Date();
				return transaction.movie.update({
					where: {
						id: data.id,
					},
					data: {
						deletedAt,
						reviews: {
							updateMany: {
								where: {
									deletedAt: null,
								},
								data: {
									deletedAt,
								},
							},
						},
					},
					include: {
						category: true,
						director: true,
					},
				});
			})
		);
	} catch (e) {
		return Result.err(e as Error);
	}
};

export default deleteMovie;
