import type { Request, Response } from 'express';
import categoryRepository from '../repository';
import responses from '../../common/responses';
import schemas from './schemas';
import commonSchemas from '../../common/schemas';
import {
	DeletedRecordError,
	NonExistentRecordError,
} from '../../common/errors';
import { Prisma } from '@prisma/client';

const update = async (req: Request, res: Response) => {
	try {
		const paramsValidated = commonSchemas.idParamsSchema.parse(req.params);
		const bodyValidated = schemas.categoryUpdateBodySchema.parse(req.body);

		const category = await categoryRepository.update({
			...paramsValidated,
			...bodyValidated,
		});

		if (category.isErr) {
			if (category.error instanceof NonExistentRecordError) {
				return responses.internalErrorResponse(category.error, res, 404);
			}
			if (category.error instanceof DeletedRecordError) {
				return responses.internalErrorResponse(category.error, res, 400);
			}
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
		}

		return res.status(200).send({
			status: 'success',
			data: category.unwrap(),
			message: 'Category was successfully updated',
		});
	} catch (e) {
		return responses.handleErrorResponse(e, res);
	}
};

export default update;
