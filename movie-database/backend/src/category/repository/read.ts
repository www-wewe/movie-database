import prisma from '../../prismaClient';
import { Result } from '@badrap/result';
import { CategorySpecificByIdData } from '../types/data';
import {
	CategoryReadAllResult,
	CategoryResult,
} from '../types/return';
import {
	DeletedRecordError,
	NonExistentRecordError,
} from '../../common/errors';

const readAll = async (): CategoryReadAllResult => {
	try {
		return Result.ok(
			await prisma.$transaction(async (transaction) => {
				return transaction.category.findMany({
					where: {
						deletedAt: null,
					},
				});
			})
		);
	} catch (e) {
		return Result.err(e as Error);
	}
};

const readSpecificById = async (
	data: CategorySpecificByIdData
): CategoryResult => {
	try {
		return Result.ok(
			await prisma.$transaction(async (transaction) => {
				const category = await transaction.category.findUnique({
					where: {
						id: data.id,
					},
				});

				if (category === null) {
					throw new NonExistentRecordError('No category found!');
				}

				if (category.deletedAt !== null) {
					throw new DeletedRecordError('The category has been deleted!');
				}

				return category;
			})
		);
	} catch (e) {
		return Result.err(e as Error);
	}
};

export default {
	all: readAll,
	specificById: readSpecificById,
};
