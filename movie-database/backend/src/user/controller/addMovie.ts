import type { Request, Response } from 'express';
import responses from '../../common/responses';
import schemas from './schemas';
import {
	DeletedRecordError,
	NonExistentRecordError,
} from '../../common/errors';
import userRepository from '../repository';

const addToFavourites = async (req: Request, res: Response) => {
	try {
		const userId = req.session.user?.id;
		if (userId == null) {
			return responses.authErrorResponse(res, 403, 'No user logged in!');
		}
		const bodyValidated = schemas.UserMovieData.parse(req.body);
		const user = await userRepository.addMovie.toFavourites({
			...bodyValidated,
			userId,
		});

		if (user.isErr) {
			if (user.error instanceof NonExistentRecordError) {
				return responses.internalErrorResponse(user.error, res, 404);
			}
			if (user.error instanceof DeletedRecordError) {
				return responses.internalErrorResponse(user.error, res, 400);
			}
		}

		return res.status(200).send({
			status: 'success',
			data: user.unwrap(),
			message: 'Movie was successfully added to favourites',
		});
	} catch (e) {
		console.log(e);
		return responses.handleErrorResponse(e, res);
	}
};

const addToWatchList = async (req: Request, res: Response) => {
	try {
		const userId = req.session.user?.id;
		if (userId == null) {
			return responses.authErrorResponse(res, 403, 'No user logged in!');
		}
		const bodyValidated = schemas.UserMovieData.parse(req.body);
		const user = await userRepository.addMovie.toWatchList({
			...bodyValidated,
			userId,
		});

		if (user.isErr) {
			if (user.error instanceof NonExistentRecordError) {
				return responses.internalErrorResponse(user.error, res, 404);
			}
			if (user.error instanceof DeletedRecordError) {
				return responses.internalErrorResponse(user.error, res, 400);
			}
		}

		return res.status(200).send({
			status: 'success',
			data: user.unwrap(),
			message: 'Movie was successfully added to watch list',
		});
	} catch (e) {
		return responses.handleErrorResponse(e, res);
	}
};

export default {
	toFavourites: addToFavourites,
	toWatchList: addToWatchList,
};
