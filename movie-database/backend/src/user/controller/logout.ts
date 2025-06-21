import type { Request, Response } from 'express';
import responses from '../../common/responses';

const logout = async (req: Request, res: Response) => {
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	req.session.destroy(() => {});
	return responses.logoutSuccessResponse(
		res,
		'User was successfully logged out'
	);
};

export default logout;
