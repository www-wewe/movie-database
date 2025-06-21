import type { Request, Response } from 'express';
import responses from '../../common/responses';
import commonSchemas from '../../common/schemas';
import {
	CannotBeDeletedRecordError,
	DeletedRecordError,
	NonExistentRecordError,
} from '../../common/errors';
import directorRepository from '../repository';

const deleteDirector = async (req: Request, res: Response) => {
	try {
		const paramsValidated = commonSchemas.idParamsSchema.parse(req.params);

		const director = await directorRepository.delete(paramsValidated);

		if (director.isErr) {
			if (director.error instanceof NonExistentRecordError) {
				return responses.internalErrorResponse(director.error, res, 404);
			}
			if (director.error instanceof DeletedRecordError) {
				return responses.internalErrorResponse(director.error, res, 400);
			}
			if (director.error instanceof CannotBeDeletedRecordError) {
				return responses.internalErrorResponse(director.error, res, 400);
			}
		}

		return res.status(200).send({
			status: 'success',
			data: director.unwrap(),
			message: 'Director was successfully deleted',
		});
	} catch (e) {
		return responses.handleErrorResponse(e, res);
	}
};

export default deleteDirector;
