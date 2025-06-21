import prisma from '../../prismaClient';
import { Result } from '@badrap/result';
import { MovieCreateData } from '../types/data';
import { MovieWithoutReviewsResult } from '../types/return';
import directorRepository from '../../director/repository';
import categoryRepository from '../../category/repository';

const create = async (data: MovieCreateData): MovieWithoutReviewsResult => {
	try {
		return Result.ok(
			await prisma.$transaction(async (transaction) => {
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

				return transaction.movie.create({
					data,
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

export default create;
