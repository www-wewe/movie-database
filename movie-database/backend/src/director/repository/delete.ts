import prisma from '../../prismaClient';
import { Result } from '@badrap/result';
import { DirectorSpecificByIdData } from '../types/data';
import { DirectorResult } from '../types/return';
import movieRepository from '../../movie/repository';
import {
	CannotBeDeletedRecordError,
} from '../../common/errors';
import directorRepository from '.';

const deleteDirector = async (
	data: DirectorSpecificByIdData
): DirectorResult => {
	try {
		return Result.ok(
			await prisma.$transaction(async (transaction) => {
				const director = await directorRepository.read.specificById({ id: data.id });
				if (director.isErr) {
					throw director.error;
				}

				const directorMovies = await movieRepository.read.allByDirector({
					directorId: data.id,
				});
				if (directorMovies.unwrap().length !== 0) {
					throw new CannotBeDeletedRecordError(
						'Director with movies cannot be deleted!'
					);
				}

				return transaction.director.update({
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

export default deleteDirector;
