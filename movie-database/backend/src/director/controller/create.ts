import type { Request, Response } from 'express';
import responses from '../../common/responses';
import schemas from './schemas';
import directorRepository from '../repository';

const create = async (req: Request, res: Response) => {
	try {
		const bodyValidated = schemas.directorBodySchema.parse(req.body);

		const director = await directorRepository.create(bodyValidated);

		if (director.isErr) {
			return responses.internalErrorResponse(director.error, res, 500);
		}

		return res.status(201).send({
			status: 'success',
			data: director.unwrap(),
			message: 'Director was successfully created',
		});
	} catch (e) {
		return responses.handleErrorResponse(e, res);
	}
};

export default create;
