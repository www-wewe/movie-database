import prisma from '../../prismaClient';
import { Result } from '@badrap/result';
import { DirectorUpdateData } from '../types/data';
import { DirectorResult } from '../types/return';
import directorRepository from '.';

const update = async (data: DirectorUpdateData): DirectorResult => {
	try {
		return Result.ok(
			await prisma.$transaction(async (transaction) => {
				const director = await directorRepository.read.specificById({ id: data.id });
				if (director.isErr) {
					throw director.error;
				}

				return transaction.director.update({
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
