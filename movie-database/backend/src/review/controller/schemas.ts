import * as z from 'zod';

const reviewBodySchema = z.object({
	content: z.string(),
	rating: z.coerce.number(),
});

const reviewMovieIdParamsSchema = z.object({
	movieId: z.string().uuid(),
});

const idsReviewParamsSchema = z.object({
	movieId: z.string().uuid(),
	reviewId: z.string().uuid(),
});

export default {
	reviewBodySchema,
	reviewMovieIdParamsSchema,
	idsReviewParamsSchema,
};
