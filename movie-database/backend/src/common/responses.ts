import { ZodError } from 'zod';
import type { Response } from 'express';

const handleErrorResponse = (e: unknown, res: Response) => {
	if (e instanceof ZodError) {
		return res.status(400).send({
			status: 'error',
			data: e,
			error: `Bad request - validation failed: ${e.message}`,
		});
	}

	return res.status(500).send({
		status: 'error',
		data: e,
		error: 'Something went wrong!',
	});
};

const internalErrorResponse = (e: Error, res: Response, code: number) =>
	res.status(code).send({
		status: 'error',
		data: e,
		error: `Internal error: ${e.message}`,
	});

const authErrorResponse = (res: Response, code: number, message: string) =>
	res.status(code).send({
		status: 'error',
		message: message,
	});

const blockedUserErrorResponse = (res: Response) =>
	res.status(403).send({
		status: 'error',
		message: 'User is blocked!',
	});

const logoutSuccessResponse = (res: Response, message: string) =>
	res.status(200).send({
		status: 'success',
		message: message,
	});

const uniqueViolationErrorResponse = (
	e: Error,
	res: Response,
	code: number,
	violatedField: string
) =>
	res.status(code).send({
		status: 'error',
		data: e,
		error: `Unique violation: Value of field '${violatedField}' is already used!`,
	});

export default {
	handleErrorResponse,
	internalErrorResponse,
	authErrorResponse,
	logoutSuccessResponse,
	uniqueViolationErrorResponse,
	blockedUserErrorResponse,
};
