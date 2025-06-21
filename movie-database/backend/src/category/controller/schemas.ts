import * as z from 'zod';

const categoryBodySchema = z.object({
	name: z.string(),
	picture: z.string().optional(),
});

const categoryUpdateBodySchema = z
	.object({
		name: z.string(),
		picture: z.string(),
	})
	.strict()
	.or(
		z
			.object({
				name: z.string(),
			})
			.strict()
	)
	.or(
		z
			.object({
				picture: z.string(),
			})
			.strict()
	);

export default {
	categoryBodySchema,
	categoryUpdateBodySchema,
};
