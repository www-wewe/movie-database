import prisma from '../../prismaClient';
import { Result } from '@badrap/result';
import { CategoryUpdateData } from '../types/data';
import { CategoryResult } from '../types/return';
import categoryRepository from '.';

const update = async (data: CategoryUpdateData): CategoryResult => {
	try {
		return Result.ok(
			await prisma.$transaction(async (transaction) => {
				const category = await categoryRepository.read.specificById({ id: data.id });
				if (category.isErr) {
					throw category.error;
				}

				return transaction.category.update({
					where: {
						id: data.id,
					},
					data,
				});
			})
		);
	} catch (e) {
		return Result.err(e as Error);
	}
};

export default update;
