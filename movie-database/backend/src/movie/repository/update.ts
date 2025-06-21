import prisma from '../../prismaClient';
import { Result } from '@badrap/result';
import { MovieUpdateData } from '../types/data';
import { MovieResult } from '../types/return';
import movieRepository from './index';
import directorRepository from '../../director/repository';
import categoryRepository from '../../category/repository';

const update = async (data: MovieUpdateData): MovieResult => {
	try {
		return Result.ok(
			await prisma.$transaction(async (transaction) => {
				const movie = await movieRepository.read.specificById({ id: data.id });
				if (movie.isErr) {
					throw movie.error;
				}

				const director = await directorRepository.read.specificById({
					id: data.directorId,
				});
				if (director.isErr) {
					throw director.error;
				}

				const category = await categoryRepository.read.specificById({
					id: data.categoryId,
				});
				if (category.isErr) {
					throw category.error;
				}

				return transaction.movie.update({
					where: {
						id: data.id,
					},
					data,
					include: {
						category: true,
						director: true,
						reviews: {
							where: {
								deletedAt: null,
							},
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
						},
					},
				});
			})
		);
	} catch (e) {
		return Result.err(e as Error);
	}
};

export default update;
