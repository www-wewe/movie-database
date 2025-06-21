import type { Request, Response } from 'express';
import categoryRepository from '../repository';
import responses from '../../common/responses';
import schemas from './schemas';
import { Prisma } from '@prisma/client';

const create = async (req: Request, res: Response) => {
	try {
		const bodyValidated = schemas.categoryBodySchema.parse(req.body);

		const category = await categoryRepository.create(bodyValidated);

		if (category.isErr) {
			if (category.error instanceof Prisma.PrismaClientKnownRequestError) {
				// Unique constraint violation error
				if (category.error.code === 'P2002') {
					const violatedField: string =
            (category.error.meta?.target as string[] | undefined)?.[0] || '';
					return responses.uniqueViolationErrorResponse(
						category.error,
						res,
						409,
						violatedField
					);
				}
			}
			return responses.internalErrorResponse(category.error, res, 500);
		}

		return res.status(201).send({
			status: 'success',
			data: category.unwrap(),
			message: 'Category was successfully created',
		});
	} catch (e) {
		return responses.handleErrorResponse(e, res);
	}
};

export default create;
