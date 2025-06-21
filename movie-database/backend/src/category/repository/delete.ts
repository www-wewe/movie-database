import prisma from '../../prismaClient';
import { Result } from '@badrap/result';
import { CategorySpecificByIdData } from '../types/data';
import { CategoryResult } from '../types/return';
import movieRepository from '../../movie/repository';
import {
	CannotBeDeletedRecordError,
} from '../../common/errors';
import categoryRepository from '.';

const deleteCategory = async (
	data: CategorySpecificByIdData
): CategoryResult => {
	try {
		return Result.ok(
			await prisma.$transaction(async (transaction) => {
				const category = await categoryRepository.read.specificById({ id: data.id });
				if (category.isErr) {
					throw category.error;
				}

				const categoryMovies = await movieRepository.read.allByCategory({
					categoryId: data.id,
				});
				if (categoryMovies.unwrap().length !== 0) {
					throw new CannotBeDeletedRecordError(
						'Category with movies cannot be deleted!'
					);
				}

				return transaction.category.update({
					where: {
						id: data.id,
					},
					data: {
						deletedAt: new Date(),
					},
				});
			})
		);
	} catch (e) {
		return Result.err(e as Error);
	}
};

export default deleteCategory;
