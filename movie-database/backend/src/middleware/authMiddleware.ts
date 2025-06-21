import { Request, Response, NextFunction } from 'express';
import { Role } from '@prisma/client';
import responses from '../common/responses';

const auth =
	(...role: Role[]) =>	
		(req: Request, res: Response, next: NextFunction) => {
			if (!req.session?.user) {
				return responses.authErrorResponse(res, 401, 'Unauthorized action!');
			}

			if (req.session?.user.isBlocked) {
				return responses.blockedUserErrorResponse(res);
			}

			if (role.length > 0 && !role.includes(req.session.user.role)) {
				return responses.authErrorResponse(res, 401, 'Forbidden action!');
			}
			next();
		};

export default auth;
