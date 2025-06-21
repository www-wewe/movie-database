import prisma from '../../prismaClient';
import { Result } from '@badrap/result';
import { DirectorSpecificByIdData } from '../types/data';
import {
	DirectorReadAllResult,
	DirectorResult,
} from '../types/return';
import {
	DeletedRecordError,
	NonExistentRecordError,
} from '../../common/errors';

const readAll = async (): DirectorReadAllResult => {
	try {
		return Result.ok(
			await prisma.$transaction(async (transaction) => {
				return transaction.director.findMany({
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
	data: DirectorSpecificByIdData
): DirectorResult => {
	try {
		return Result.ok(
			await prisma.$transaction(async (transaction) => {
				const director = await transaction.director.findUnique({
					where: {
						id: data.id,
					},
				});

				if (director === null) {
					throw new NonExistentRecordError('No director found!');
				}

				if (director.deletedAt !== null) {
					throw new DeletedRecordError('The director has been deleted!');
				}

				return director;
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
