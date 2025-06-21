import * as z from 'zod';

const movieBodySchema = z.object({
	title: z.string(),
	originalTitle: z.string(),
	description: z.string(),
	language: z.string(),
	directorId: z.string().uuid(),
	categoryId: z.string().uuid(),
	duration: z.coerce.number(),
	cast: z.string(),
	picture: z.string().optional(),
	releaseDate: z.coerce.date(),
});

const moviesByCategoryParamsSchema = z.object({
	categoryId: z.string().uuid(),
});

const moviesByDirectorParamsSchema = z.object({
	directorId: z.string().uuid(),
});

export default {
	movieBodySchema,
	moviesByCategoryParamsSchema,
	moviesByDirectorParamsSchema,
};
