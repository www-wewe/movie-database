import type { Request, Response } from 'express';
import categoryRepository from '../repository';
import responses from '../../common/responses';
import commonSchemas from '../../common/schemas';
import {
	CannotBeDeletedRecordError,
	DeletedRecordError,
	NonExistentRecordError,
} from '../../common/errors';

const deleteCategory = async (req: Request, res: Response) => {
	try {
		const paramsValidated = commonSchemas.idParamsSchema.parse(req.params);

		const category = await categoryRepository.delete(paramsValidated);

		if (category.isErr) {
			if (category.error instanceof NonExistentRecordError) {
				return responses.internalErrorResponse(category.error, res, 404);
			}
			if (category.error instanceof DeletedRecordError) {
				return responses.internalErrorResponse(category.error, res, 400);
			}
			if (category.error instanceof CannotBeDeletedRecordError) {
				return responses.internalErrorResponse(category.error, res, 400);
			}
		}

		return res.status(200).send({
			status: 'success',
			data: category.unwrap(),
			message: 'Category was successfully deleted',
		});
	} catch (e) {
		return responses.handleErrorResponse(e, res);
	}
};

export default deleteCategory;
