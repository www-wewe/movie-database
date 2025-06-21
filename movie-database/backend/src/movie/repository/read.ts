import prisma from '../../prismaClient';
import {Result} from '@badrap/result';
import {MovieAllByCategoryData, MovieAllByDirectorData, MovieSpecificByIdData,} from '../types/data';
import {MovieReadAllResult, MovieResult,} from '../types/return';
import {DeletedRecordError, NonExistentRecordError,} from '../../common/errors';
import categoryRepository from '../../category/repository';
import directorRepository from '../../director/repository';


const readAll = async (): MovieReadAllResult => {
	try {
		return Result.ok(
			await prisma.$transaction(async (transaction) => {
				return transaction.movie.findMany({
					where: {
						deletedAt: null,
					},
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

const readAllByCategory = async (
	data: MovieAllByCategoryData
): MovieReadAllResult => {
	try {
		return Result.ok(
			await prisma.$transaction(async (transaction) => {
				const category = await categoryRepository.read.specificById({
					id: data.categoryId,
				});
				if (category.isErr) {
					throw category.error;
				}

				return transaction.movie.findMany({
					where: {
						deletedAt: null,
						categoryId: data.categoryId,
					},
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

const readAllByDirector = async (
	data: MovieAllByDirectorData
): MovieReadAllResult => {
	try {
		return Result.ok(
			await prisma.$transaction(async (transaction) => {
				const director = await directorRepository.read.specificById({
					id: data.directorId,
				});
				if (director.isErr) {
					throw director.error;
				}

				return transaction.movie.findMany({
					where: {
						deletedAt: null,
						directorId: data.directorId,
					},
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

const readSpecificById = async (
	data: MovieSpecificByIdData
): MovieResult => {
	try {
		return Result.ok(
			await prisma.$transaction(async (transaction) => {
				const movie = await transaction.movie.findUnique({
					where: {
						id: data.id,
					},
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

				if (movie === null) {
					throw new NonExistentRecordError('No movie found!');
				}

				if (movie.deletedAt !== null) {
					throw new DeletedRecordError('The movie has been already deleted!');
				}

				return movie;
			})
		);
	} catch (e) {
		return Result.err(e as Error);
	}
};

export default {
	all: readAll,
	allByCategory: readAllByCategory,
	allByDirector: readAllByDirector,
	specificById: readSpecificById,
};
