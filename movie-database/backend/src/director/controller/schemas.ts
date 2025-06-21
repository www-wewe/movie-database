import * as z from 'zod';

const directorBodySchema = z.object({
	name: z.string(),
	birthDate: z.coerce.date(),
	dateOfDeath: z.coerce.date().optional(),
	description: z.string(),
	picture: z.string().optional(),
});

export default {
	directorBodySchema,
};
