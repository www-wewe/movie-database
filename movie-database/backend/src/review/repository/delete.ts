import prisma from '../../prismaClient';
import { Result } from '@badrap/result';
import { ReviewSpecificByIdData } from '../types/data';
import { ReviewResult } from '../types/return';
import {
	DeletedRecordError,
	NonExistentRecordError,
	UnauthorizedOwnershipError,
} from '../../common/errors';
import movieRepository from '../../movie/repository';

const deleteReview = async (
	data: ReviewSpecificByIdData
): ReviewResult => {
	try {
		return Result.ok(
			await prisma.$transaction(async (transaction) => {
				const movie = await movieRepository.read.specificById({
					id: data.movieId,
				});
				if (movie.isErr) {
					throw movie.error;
				}

				const review = await transaction.review.findUnique({
					where: {
						id: data.reviewId,
					},
				});

				if (review === null) {
					throw new NonExistentRecordError('No review found!');
				}

				if (review.deletedAt !== null) {
					throw new DeletedRecordError('The review has already been deleted!');
				}

				if (review.userId !== data.userId) {
					throw new UnauthorizedOwnershipError(
						'Review doesn\'t belong to logged user!'
					);
				}

				return transaction.review.update({
					where: {
						id: data.reviewId,
					},
					data: {
						deletedAt: new Date(),
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
				});
			})
		);
	} catch (e) {
		return Result.err(e as Error);
	}
};

export default deleteReview;
