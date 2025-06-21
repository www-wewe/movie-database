import * as z from 'zod';

const idParamsSchema = z.object({
	id: z.string().uuid(),
});

export default {
	idParamsSchema,
};
