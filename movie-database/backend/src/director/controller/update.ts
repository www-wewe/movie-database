import type { Request, Response } from 'express';
import responses from '../../common/responses';
import schemas from './schemas';
import commonSchemas from '../../common/schemas';
import {
	DeletedRecordError,
	NonExistentRecordError,
} from '../../common/errors';
import directorRepository from '../repository';

const update = async (req: Request, res: Response) => {
	try {
		const paramsValidated = commonSchemas.idParamsSchema.parse(req.params);
		const bodyValidated = schemas.directorBodySchema.parse(req.body);

		const director = await directorRepository.update({
			...paramsValidated,
			...bodyValidated,
		});

		if (director.isErr) {
			if (director.error instanceof NonExistentRecordError) {
				return responses.internalErrorResponse(director.error, res, 404);
			}
			if (director.error instanceof DeletedRecordError) {
				return responses.internalErrorResponse(director.error, res, 400);
			}
		}

		return res.status(200).send({
			status: 'success',
			data: director.unwrap(),
			message: 'Director was successfully updated',
		});
	} catch (e) {
		return responses.handleErrorResponse(e, res);
	}
};

export default update;
