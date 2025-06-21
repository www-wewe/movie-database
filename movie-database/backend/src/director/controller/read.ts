import type { Request, Response } from 'express';
import responses from '../../common/responses';
import commonSchemas from '../../common/schemas';
import {
	DeletedRecordError,
	NonExistentRecordError,
} from '../../common/errors';
import directorRepository from '../repository';

const readAll = async (req: Request, res: Response) => {
	try {
		const directors = await directorRepository.read.all();

		return res.status(200).send({
			status: 'success',
			data: directors.unwrap(),
			message: 'Directors were successfully listed',
		});
	} catch (e) {
		return responses.handleErrorResponse(e, res);
	}
};

const readSpecificById = async (req: Request, res: Response) => {
	try {
		const paramsValidated = commonSchemas.idParamsSchema.parse(req.params);

		const director = await directorRepository.read.specificById(
			paramsValidated
		);

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
			message: 'Director was successfully listed',
		});
	} catch (e) {
		return responses.handleErrorResponse(e, res);
	}
};

export default {
	all: readAll,
	specificById: readSpecificById,
};
