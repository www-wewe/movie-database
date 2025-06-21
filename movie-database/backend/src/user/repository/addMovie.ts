import prisma from '../../prismaClient';
import { Result } from '@badrap/result';
import { UserMovieData } from '../types/data';
import { UserResult } from '../types/return';
import userRepository from '.';
import movieRepository from '../../movie/repository';

const addToFavourites = async (data: UserMovieData): UserResult => {
	try {
		return Result.ok(
			await prisma.$transaction(async (transaction) => {
				const user = await userRepository.read.specificById({
					id: data.userId,
				});
				if (user.isErr) {
					throw user.error;
				}

				const movie = await movieRepository.read.specificById({
					id: data.movieId,
				});
				if (movie.isErr) {
					throw movie.error;
				}

				return transaction.user.update({
					where: {
						id: data.userId,
					},
					data: {
						favourites: {
							connect: { id: movie.unwrap().id },
						},
					},
					select: {
						id: true,
						createdAt: true,
						updatedAt: true,
						deletedAt: true,
						isBlocked: true,
						userName: true,
						avatar: true,
						email: true,
						role: true,
						favourites: {
							where: {
								deletedAt: null,
							},
							include: {
								category: true,
								director: true,
							},
						},
						watchList: {
							where: {
								deletedAt: null,
							},
							include: {
								category: true,
								director: true,
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

const addToWatchList = async (data: UserMovieData): UserResult => {
	try {
		return Result.ok(
			await prisma.$transaction(async (transaction) => {
				const user = await userRepository.read.specificById({
					id: data.userId,
				});
				if (user.isErr) {
					throw user.error;
				}

				const movie = await movieRepository.read.specificById({
					id: data.movieId,
				});
				if (movie.isErr) {
					throw movie.error;
				}

				return transaction.user.update({
					where: {
						id: data.userId,
					},
					data: {
						watchList: {
							connect: { id: movie.unwrap().id },
						},
					},
					select: {
						id: true,
						createdAt: true,
						updatedAt: true,
						deletedAt: true,
						isBlocked: true,
						userName: true,
						avatar: true,
						email: true,
						role: true,
						favourites: {
							where: {
								deletedAt: null,
							},
							include: {
								category: true,
								director: true,
							},
						},
						watchList: {
							where: {
								deletedAt: null,
							},
							include: {
								category: true,
								director: true,
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

export default {
	toFavourites: addToFavourites,
	toWatchList: addToWatchList,
};
